
Calendar.mixin({

	el: null,
	contentEl: null,
	suggestedViewHeight: null,
	ignoreUpdateViewSize: 0,
	freezeContentHeightDepth: 0,
	windowResizeProxy: null,


	render: function() {
		if (!this.contentEl) {
			this.initialRender();
		}
		else if (this.elementVisible()) {
			// mainly for the public API
			this.calcSize();
			this.renderView();
		}
	},


	initialRender: function() {
		var _this = this;
		var el = this.el;

		el.addClass('fc');

		// event delegation for nav links
		el.on('click.fc', 'a[data-goto]', function(ev) {
			var anchorEl = $(this);
			var gotoOptions = anchorEl.data('goto'); // will automatically parse JSON
			var date = _this.moment(gotoOptions.date);
			var viewType = gotoOptions.type;

			// property like "navLinkDayClick". might be a string or a function
			var customAction = _this.view.opt('navLink' + capitaliseFirstLetter(viewType) + 'Click');

			if (typeof customAction === 'function') {
				customAction(date, ev);
			}
			else {
				if (typeof customAction === 'string') {
					viewType = customAction;
				}
				_this.zoomTo(date, viewType);
			}
		});

		// called immediately, and upon option change
		this.optionsModel.watch('settingTheme', [ '?theme', '?themeSystem' ], function(opts) {
			var themeClass = ThemeRegistry.getThemeClass(opts.themeSystem || opts.theme);
			var theme = new themeClass(_this.optionsModel);
			var widgetClass = theme.getClass('widget');

			_this.theme = theme;

			if (widgetClass) {
				el.addClass(widgetClass);
			}
		}, function() {
			var widgetClass = _this.theme.getClass('widget');

			_this.theme = null;

			if (widgetClass) {
				el.removeClass(widgetClass);
			}
		});

		this.optionsModel.watch('settingBusinessHourGenerator', [ '?businessHours' ], function(deps) {
			_this.businessHourGenerator = new BusinessHourGenerator(deps.businessHours, _this);

			if (_this.view) {
				_this.view.set('businessHourGenerator', _this.businessHourGenerator);
			}
		}, function() {
			_this.businessHourGenerator = null;
		});

		// called immediately, and upon option change.
		// HACK: locale often affects isRTL, so we explicitly listen to that too.
		this.optionsModel.watch('applyingDirClasses', [ '?isRTL', '?locale' ], function(opts) {
			el.toggleClass('fc-ltr', !opts.isRTL);
			el.toggleClass('fc-rtl', opts.isRTL);
		});

		this.contentEl = $("<div class='fc-view-container'/>").prependTo(el);

		this.initToolbars();
		this.renderHeader();
		this.renderFooter();
		this.renderView(this.opt('defaultView'));

		if (this.opt('handleWindowResize')) {
			$(window).resize(
				this.windowResizeProxy = debounce( // prevents rapid calls
					this.windowResize.bind(this),
					this.opt('windowResizeDelay')
				)
			);
		}
	},


	destroy: function() {
		if (this.view) {
			this.clearView();
		}

		this.toolbarsManager.proxyCall('removeElement');
		this.contentEl.remove();
		this.el.removeClass('fc fc-ltr fc-rtl');

		// removes theme-related root className
		this.optionsModel.unwatch('settingTheme');
		this.optionsModel.unwatch('settingBusinessHourGenerator');

		this.el.off('.fc'); // unbind nav link handlers

		if (this.windowResizeProxy) {
			$(window).unbind('resize', this.windowResizeProxy);
			this.windowResizeProxy = null;
		}

		GlobalEmitter.unneeded();
	},


	elementVisible: function() {
		return this.el.is(':visible');
	},


	// Render Queue
	// -----------------------------------------------------------------------------------------------------------------


	bindViewHandlers: function(view) {
		var _this = this;

		view.watch('titleForCalendar', [ 'title' ], function(deps) { // TODO: better system
			if (view === _this.view) { // hack
				_this.setToolbarsTitle(deps.title);
			}
		});

		view.watch('dateProfileForCalendar', [ 'dateProfile' ], function(deps) {
			if (view === _this.view) { // hack
				_this.currentDate = deps.dateProfile.date; // might have been constrained by view dates
				_this.updateToolbarButtons(deps.dateProfile);
			}
		});
	},


	unbindViewHandlers: function(view) {
		view.unwatch('titleForCalendar');
		view.unwatch('dateProfileForCalendar');
	},


	// View Rendering
	// -----------------------------------------------------------------------------------


	// Renders a view because of a date change, view-type change, or for the first time.
	// If not given a viewType, keep the current view but render different dates.
	// Accepts an optional scroll state to restore to.
	renderView: function(viewType) {
		var oldView = this.view;
		var newView;

		this.freezeContentHeight();

		if (oldView && viewType && oldView.type !== viewType) {
			this.clearView();
		}

		// if viewType changed, or the view was never created, create a fresh view
		if (!this.view && viewType) {
			newView = this.view =
				this.viewsByType[viewType] ||
				(this.viewsByType[viewType] = this.instantiateView(viewType));

			this.bindViewHandlers(newView);

			newView.setElement(
				$("<div class='fc-view fc-" + viewType + "-view' />").appendTo(this.contentEl)
			);

			this.toolbarsManager.proxyCall('activateButton', viewType);
		}

		if (this.view) {

			// prevent unnecessary change firing
			if (this.view.get('businessHourGenerator') !== this.businessHourGenerator) {
				this.view.set('businessHourGenerator', this.businessHourGenerator);
			}

			this.view.setDate(this.currentDate);
		}

		this.thawContentHeight();
	},


	// Unrenders the current view and reflects this change in the Header.
	// Unregsiters the `view`, but does not remove from viewByType hash.
	clearView: function() {
		var currentView = this.view;

		this.toolbarsManager.proxyCall('deactivateButton', currentView.type);

		this.unbindViewHandlers(currentView);

		currentView.removeElement();
		currentView.unsetDate(); // so bindViewHandlers doesn't fire with old values next time

		this.view = null;
	},


	// Destroys the view, including the view object. Then, re-instantiates it and renders it.
	// Maintains the same scroll state.
	// TODO: maintain any other user-manipulated state.
	reinitView: function() {
		var oldView = this.view;
		var scroll = oldView.queryScroll(); // wouldn't be so complicated if Calendar owned the scroll
		this.freezeContentHeight();

		this.clearView();
		this.calcSize();
		this.renderView(oldView.type); // needs the type to freshly render

		this.view.applyScroll(scroll);
		this.thawContentHeight();
	},


	// Resizing
	// -----------------------------------------------------------------------------------


	getSuggestedViewHeight: function() {
		if (this.suggestedViewHeight === null) {
			this.calcSize();
		}
		return this.suggestedViewHeight;
	},


	isHeightAuto: function() {
		return this.opt('contentHeight') === 'auto' || this.opt('height') === 'auto';
	},


	updateViewSize: function(isResize) {
		var view = this.view;
		var scroll;

		if (!this.ignoreUpdateViewSize && view) {

			if (isResize) {
				this.calcSize();
				scroll = view.queryScroll();
			}

			this.ignoreUpdateViewSize++;

			view.updateSize(
				this.getSuggestedViewHeight(),
				this.isHeightAuto(),
				isResize
			);

			this.ignoreUpdateViewSize--;

			if (isResize) {
				view.applyScroll(scroll);
			}

			return true; // signal success
		}
	},


	calcSize: function() {
		if (this.elementVisible()) {
			this._calcSize();
		}
	},


	_calcSize: function() { // assumes elementVisible
		var contentHeightInput = this.opt('contentHeight');
		var heightInput = this.opt('height');

		if (typeof contentHeightInput === 'number') { // exists and not 'auto'
			this.suggestedViewHeight = contentHeightInput;
		}
		else if (typeof contentHeightInput === 'function') { // exists and is a function
			this.suggestedViewHeight = contentHeightInput();
		}
		else if (typeof heightInput === 'number') { // exists and not 'auto'
			this.suggestedViewHeight = heightInput - this.queryToolbarsHeight();
		}
		else if (typeof heightInput === 'function') { // exists and is a function
			this.suggestedViewHeight = heightInput() - this.queryToolbarsHeight();
		}
		else if (heightInput === 'parent') { // set to height of parent element
			this.suggestedViewHeight = this.el.parent().height() - this.queryToolbarsHeight();
		}
		else {
			this.suggestedViewHeight = Math.round(
				this.contentEl.width() /
				Math.max(this.opt('aspectRatio'), .5)
			);
		}
	},


	windowResize: function(ev) {
		if (
			ev.target === window && // so we don't process jqui "resize" events that have bubbled up
			this.view &&
			this.view.isDatesRendered
		) {
			if (this.updateViewSize(true)) { // isResize=true, returns true on success
				this.publiclyTrigger('windowResize', [ this.view ]);
			}
		}
	},


	/* Height "Freezing"
	-----------------------------------------------------------------------------*/


	freezeContentHeight: function() {
		if (!(this.freezeContentHeightDepth++)) {
			this.forceFreezeContentHeight();
		}
	},


	forceFreezeContentHeight: function() {
		this.contentEl.css({
			width: '100%',
			height: this.contentEl.height(),
			overflow: 'hidden'
		});
	},


	thawContentHeight: function() {
		this.freezeContentHeightDepth--;

		// always bring back to natural height
		this.contentEl.css({
			width: '',
			height: '',
			overflow: ''
		});

		// but if there are future thaws, re-freeze
		if (this.freezeContentHeightDepth) {
			this.forceFreezeContentHeight();
		}
	}

});
