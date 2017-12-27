
/* An abstract class for the "basic" views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.

var BasicView = FC.BasicView = View.extend({

	scroller: null,

	dayGridClass: DayGrid, // class the dayGrid will be instantiated from (overridable by subclasses)
	dayGrid: null, // the main subcomponent that does most of the heavy lifting

	weekNumberWidth: null, // width of all the week-number cells running down the side


	constructor: function() {
		View.apply(this, arguments);

		this.dayGrid = this.instantiateDayGrid();
		this.dayGrid.isRigid = this.hasRigidRows();

		if (this.opt('weekNumbers')) {
			if (this.opt('weekNumbersWithinDays')) {
				this.dayGrid.cellWeekNumbersVisible = true;
				this.dayGrid.colWeekNumbersVisible = false;
			}
			else {
				this.dayGrid.cellWeekNumbersVisible = false;
				this.dayGrid.colWeekNumbersVisible = true;
			};
		}

		this.addChild(this.dayGrid);

		this.scroller = new Scroller({
			overflowX: 'hidden',
			overflowY: 'auto'
		});
	},


	// Generates the DayGrid object this view needs. Draws from this.dayGridClass
	instantiateDayGrid: function() {
		// generate a subclass on the fly with BasicView-specific behavior
		// TODO: cache this subclass
		var subclass = this.dayGridClass.extend(basicDayGridMethods);

		return new subclass(this);
	},


	// Computes the date range that will be rendered.
	buildRenderRange: function(currentUnzonedRange, currentRangeUnit, isRangeAllDay) {
		var renderUnzonedRange = View.prototype.buildRenderRange.apply(this, arguments); // an UnzonedRange
		var start = this.calendar.msToUtcMoment(renderUnzonedRange.startMs, isRangeAllDay);
		var end = this.calendar.msToUtcMoment(renderUnzonedRange.endMs, isRangeAllDay);

		// year and month views should be aligned with weeks. this is already done for week
		if (/^(year|month)$/.test(currentRangeUnit)) {
			start.startOf('week');

			// make end-of-week if not already
			if (end.weekday()) {
				end.add(1, 'week').startOf('week'); // exclusively move backwards
			}
		}

		return new UnzonedRange(start, end);
	},


	executeDateRender: function(dateProfile) {
		this.dayGrid.breakOnWeeks = /year|month|week/.test(dateProfile.currentRangeUnit);

		View.prototype.executeDateRender.apply(this, arguments);
	},


	renderSkeleton: function() {
		var dayGridContainerEl;
		var dayGridEl;

		this.el.addClass('fc-basic-view').html(this.renderSkeletonHtml());

		this.scroller.render();

		dayGridContainerEl = this.scroller.el.addClass('fc-day-grid-container');
		dayGridEl = $('<div class="fc-day-grid" />').appendTo(dayGridContainerEl);

		this.el.find('.fc-body > tr > td').append(dayGridContainerEl);

		this.dayGrid.headContainerEl = this.el.find('.fc-head-container');
		this.dayGrid.setElement(dayGridEl);
	},


	unrenderSkeleton: function() {
		this.dayGrid.removeElement();
		this.scroller.destroy();
	},


	// Builds the HTML skeleton for the view.
	// The day-grid component will render inside of a container defined by this HTML.
	renderSkeletonHtml: function() {
		var theme = this.calendar.theme;

		return '' +
			'<table class="' + theme.getClass('tableGrid') + '">' +
				(this.opt('columnHeader') ?
					'<thead class="fc-head">' +
						'<tr>' +
							'<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
						'</tr>' +
					'</thead>' :
					''
					) +
				'<tbody class="fc-body">' +
					'<tr>' +
						'<td class="' + theme.getClass('widgetContent') + '"></td>' +
					'</tr>' +
				'</tbody>' +
			'</table>';
	},


	// Generates an HTML attribute string for setting the width of the week number column, if it is known
	weekNumberStyleAttr: function() {
		if (this.weekNumberWidth !== null) {
			return 'style="width:' + this.weekNumberWidth + 'px"';
		}
		return '';
	},


	// Determines whether each row should have a constant height
	hasRigidRows: function() {
		var eventLimit = this.opt('eventLimit');

		return eventLimit && typeof eventLimit !== 'number';
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/


	// Refreshes the horizontal dimensions of the view
	updateSize: function(totalHeight, isAuto, isResize) {
		var eventLimit = this.opt('eventLimit');
		var headRowEl = this.dayGrid.headContainerEl.find('.fc-row');
		var scrollerHeight;
		var scrollbarWidths;

		// hack to give the view some height prior to dayGrid's columns being rendered
		// TODO: separate setting height from scroller VS dayGrid.
		if (!this.dayGrid.rowEls) {
			if (!isAuto) {
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scroller.setHeight(scrollerHeight);
			}
			return;
		}

		View.prototype.updateSize.apply(this, arguments);

		if (this.dayGrid.colWeekNumbersVisible) {
			// Make sure all week number cells running down the side have the same width.
			// Record the width for cells created later.
			this.weekNumberWidth = matchCellWidths(
				this.el.find('.fc-week-number')
			);
		}

		// reset all heights to be natural
		this.scroller.clear();
		uncompensateScroll(headRowEl);

		this.dayGrid.removeSegPopover(); // kill the "more" popover if displayed

		// is the event limit a constant level number?
		if (eventLimit && typeof eventLimit === 'number') {
			this.dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
		}

		// distribute the height to the rows
		// (totalHeight is a "recommended" value if isAuto)
		scrollerHeight = this.computeScrollerHeight(totalHeight);
		this.setGridHeight(scrollerHeight, isAuto);

		// is the event limit dynamically calculated?
		if (eventLimit && typeof eventLimit !== 'number') {
			this.dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
		}

		if (!isAuto) { // should we force dimensions of the scroll container?

			this.scroller.setHeight(scrollerHeight);
			scrollbarWidths = this.scroller.getScrollbarWidths();

			if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?

				compensateScroll(headRowEl, scrollbarWidths);

				// doing the scrollbar compensation might have created text overflow which created more height. redo
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scroller.setHeight(scrollerHeight);
			}

			// guarantees the same scrollbar widths
			this.scroller.lockOverflow(scrollbarWidths);
		}
	},


	// given a desired total height of the view, returns what the height of the scroller should be
	computeScrollerHeight: function(totalHeight) {
		return totalHeight -
			subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
	},


	// Sets the height of just the DayGrid component in this view
	setGridHeight: function(height, isAuto) {
		if (isAuto) {
			undistributeHeight(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
		}
		else {
			distributeHeight(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
		}
	},


	/* Scroll
	------------------------------------------------------------------------------------------------------------------*/


	computeInitialDateScroll: function() {
		return { top: 0 };
	},


	queryDateScroll: function() {
		return { top: this.scroller.getScrollTop() };
	},


	applyDateScroll: function(scroll) {
		if (scroll.top !== undefined) {
			this.scroller.setScrollTop(scroll.top);
		}
	}

});


// Methods that will customize the rendering behavior of the BasicView's dayGrid
var basicDayGridMethods = { // not relly methods anymore


	colWeekNumbersVisible: false, // display week numbers along the side?


	// Generates the HTML that will go before the day-of week header cells
	renderHeadIntroHtml: function() {
		var view = this.view;

		if (this.colWeekNumbersVisible) {
			return '' +
				'<th class="fc-week-number ' + view.calendar.theme.getClass('widgetHeader') + '" ' + view.weekNumberStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						htmlEscape(this.opt('weekNumberTitle')) +
					'</span>' +
				'</th>';
		}

		return '';
	},


	// Generates the HTML that will go before content-skeleton cells that display the day/week numbers
	renderNumberIntroHtml: function(row) {
		var view = this.view;
		var weekStart = this.getCellDate(row, 0);

		if (this.colWeekNumbersVisible) {
			return '' +
				'<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '>' +
					view.buildGotoAnchorHtml( // aside from link, important for matchCellWidths
						{ date: weekStart, type: 'week', forceOff: this.colCnt === 1 },
						weekStart.format('w') // inner HTML
					) +
				'</td>';
		}

		return '';
	},


	// Generates the HTML that goes before the day bg cells for each day-row
	renderBgIntroHtml: function() {
		var view = this.view;

		if (this.colWeekNumbersVisible) {
			return '<td class="fc-week-number ' + view.calendar.theme.getClass('widgetContent') + '" ' +
				view.weekNumberStyleAttr() + '></td>';
		}

		return '';
	},


	// Generates the HTML that goes before every other type of row generated by DayGrid.
	// Affects helper-skeleton and highlight-skeleton rows.
	renderIntroHtml: function() {
		var view = this.view;

		if (this.colWeekNumbersVisible) {
			return '<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '></td>';
		}

		return '';
	},


	getIsNumbersVisible: function() {
		return DayGrid.prototype.getIsNumbersVisible.apply(this, arguments) || this.colWeekNumbersVisible;
	}

};
