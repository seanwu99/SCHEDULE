
var DateComponent = FC.DateComponent = Component.extend({

	uid: null,
	childrenByUid: null,
	isRTL: false, // frequently accessed options
	nextDayThreshold: null, // "
	dateProfile: null, // hack

	eventRendererClass: null,
	helperRendererClass: null,
	businessHourRendererClass: null,
	fillRendererClass: null,

	eventRenderer: null,
	helperRenderer: null,
	businessHourRenderer: null,
	fillRenderer: null,

	hitsNeededDepth: 0, // necessary because multiple callers might need the same hits

	hasAllDayBusinessHours: false, // TODO: unify with largeUnit and isTimeScale?

	isDatesRendered: false,


	constructor: function() {
		Component.call(this);

		this.uid = String(DateComponent.guid++);
		this.childrenByUid = {};

		this.nextDayThreshold = moment.duration(this.opt('nextDayThreshold'));
		this.isRTL = this.opt('isRTL');

		if (this.fillRendererClass) {
			this.fillRenderer = new this.fillRendererClass(this);
		}

		if (this.eventRendererClass) { // fillRenderer is optional -----v
			this.eventRenderer = new this.eventRendererClass(this, this.fillRenderer);
		}

		if (this.helperRendererClass && this.eventRenderer) {
			this.helperRenderer = new this.helperRendererClass(this, this.eventRenderer);
		}

		if (this.businessHourRendererClass && this.fillRenderer) {
			this.businessHourRenderer = new this.businessHourRendererClass(this, this.fillRenderer);
		}
	},


	addChild: function(child) {
		if (!this.childrenByUid[child.uid]) {
			this.childrenByUid[child.uid] = child;

			return true;
		}

		return false;
	},


	removeChild: function(child) {
		if (this.childrenByUid[child.uid]) {
			delete this.childrenByUid[child.uid];

			return true;
		}

		return false;
	},


	// TODO: only do if isInDom?
	// TODO: make part of Component, along with children/batch-render system?
	updateSize: function(totalHeight, isAuto, isResize) {
		this.callChildren('updateSize', arguments);
	},


	// Options
	// -----------------------------------------------------------------------------------------------------------------


	opt: function(name) {
		return this._getView().opt(name); // default implementation
	},


	publiclyTrigger: function(/**/) {
		var calendar = this._getCalendar();

		return calendar.publiclyTrigger.apply(calendar, arguments);
	},


	hasPublicHandlers: function(/**/) {
		var calendar = this._getCalendar();

		return calendar.hasPublicHandlers.apply(calendar, arguments);
	},


	// Date
	// -----------------------------------------------------------------------------------------------------------------


	executeDateRender: function(dateProfile) {
		this.dateProfile = dateProfile; // for rendering
		this.renderDates(dateProfile);
		this.isDatesRendered = true;
		this.callChildren('executeDateRender', arguments);
	},


	executeDateUnrender: function() { // wrapper
		this.callChildren('executeDateUnrender', arguments);
		this.dateProfile = null;
		this.unrenderDates();
		this.isDatesRendered = false;
	},


	// date-cell content only
	renderDates: function(dateProfile) {
		// subclasses should implement
	},


	// date-cell content only
	unrenderDates: function() {
		// subclasses should override
	},


	// Now-Indicator
	// -----------------------------------------------------------------------------------------------------------------


	// Returns a string unit, like 'second' or 'minute' that defined how often the current time indicator
	// should be refreshed. If something falsy is returned, no time indicator is rendered at all.
	getNowIndicatorUnit: function() {
		// subclasses should implement
	},


	// Renders a current time indicator at the given datetime
	renderNowIndicator: function(date) {
		this.callChildren('renderNowIndicator', arguments);
	},


	// Undoes the rendering actions from renderNowIndicator
	unrenderNowIndicator: function() {
		this.callChildren('unrenderNowIndicator', arguments);
	},


	// Business Hours
	// ---------------------------------------------------------------------------------------------------------------


	renderBusinessHours: function(businessHourGenerator) {
		if (this.businessHourRenderer) {
			this.businessHourRenderer.render(businessHourGenerator);
		}

		this.callChildren('renderBusinessHours', arguments);
	},


	// Unrenders previously-rendered business-hours
	unrenderBusinessHours: function() {
		this.callChildren('unrenderBusinessHours', arguments);

		if (this.businessHourRenderer) {
			this.businessHourRenderer.unrender();
		}
	},


	// Event Displaying
	// -----------------------------------------------------------------------------------------------------------------


	executeEventRender: function(eventsPayload) {
		if (this.eventRenderer) {
			this.eventRenderer.rangeUpdated(); // poorly named now
			this.eventRenderer.render(eventsPayload);
		}
		else if (this.renderEvents) { // legacy
			this.renderEvents(convertEventsPayloadToLegacyArray(eventsPayload));
		}

		this.callChildren('executeEventRender', arguments);
	},


	executeEventUnrender: function() {
		this.callChildren('executeEventUnrender', arguments);

		if (this.eventRenderer) {
			this.eventRenderer.unrender();
		}
		else if (this.destroyEvents) { // legacy
			this.destroyEvents();
		}
	},


	getBusinessHourSegs: function() { // recursive
		var segs = this.getOwnBusinessHourSegs();

		this.iterChildren(function(child) {
			segs.push.apply(segs, child.getBusinessHourSegs());
		});

		return segs;
	},


	getOwnBusinessHourSegs: function() {
		if (this.businessHourRenderer) {
			return this.businessHourRenderer.getSegs();
		}

		return [];
	},


	getEventSegs: function() { // recursive
		var segs = this.getOwnEventSegs();

		this.iterChildren(function(child) {
			segs.push.apply(segs, child.getEventSegs());
		});

		return segs;
	},


	getOwnEventSegs: function() { // just for itself
		if (this.eventRenderer) {
			return this.eventRenderer.getSegs();
		}

		return [];
	},


	// Event Rendering Triggering
	// -----------------------------------------------------------------------------------------------------------------


	triggerAfterEventsRendered: function() {
		this.triggerAfterEventSegsRendered(
			this.getEventSegs()
		);

		this.publiclyTrigger('eventAfterAllRender', {
			context: this,
			args: [ this ]
		});
	},


	triggerAfterEventSegsRendered: function(segs) {
		var _this = this;

		// an optimization, because getEventLegacy is expensive
		if (this.hasPublicHandlers('eventAfterRender')) {
			segs.forEach(function(seg) {
				var legacy;

				if (seg.el) { // necessary?
					legacy = seg.footprint.getEventLegacy();

					_this.publiclyTrigger('eventAfterRender', {
						context: legacy,
						args: [ legacy, seg.el, _this ]
					});
				}
			});
		}
	},


	triggerBeforeEventsDestroyed: function() {
		this.triggerBeforeEventSegsDestroyed(
			this.getEventSegs()
		);
	},


	triggerBeforeEventSegsDestroyed: function(segs) {
		var _this = this;

		if (this.hasPublicHandlers('eventDestroy')) {
			segs.forEach(function(seg) {
				var legacy;

				if (seg.el) { // necessary?
					legacy = seg.footprint.getEventLegacy();

					_this.publiclyTrigger('eventDestroy', {
						context: legacy,
						args: [ legacy, seg.el, _this ]
					});
				}
			});
		}
	},


	// Event Rendering Utils
	// -----------------------------------------------------------------------------------------------------------------


	// Hides all rendered event segments linked to the given event
	// RECURSIVE with subcomponents
	showEventsWithId: function(eventDefId) {

		this.getEventSegs().forEach(function(seg) {
			if (
				seg.footprint.eventDef.id === eventDefId &&
				seg.el // necessary?
			) {
				seg.el.css('visibility', '');
			}
		});

		this.callChildren('showEventsWithId', arguments);
	},


	// Shows all rendered event segments linked to the given event
	// RECURSIVE with subcomponents
	hideEventsWithId: function(eventDefId) {

		this.getEventSegs().forEach(function(seg) {
			if (
				seg.footprint.eventDef.id === eventDefId &&
				seg.el // necessary?
			) {
				seg.el.css('visibility', 'hidden');
			}
		});

		this.callChildren('hideEventsWithId', arguments);
	},


	// Drag-n-Drop Rendering (for both events and external elements)
	// ---------------------------------------------------------------------------------------------------------------


	// Renders a visual indication of a event or external-element drag over the given drop zone.
	// If an external-element, seg will be `null`.
	// Must return elements used for any mock events.
	renderDrag: function(eventFootprints, seg, isTouch) {
		var renderedHelper = false;

		this.iterChildren(function(child) {
			if (child.renderDrag(eventFootprints, seg, isTouch)) {
				renderedHelper = true;
			}
		});

		return renderedHelper;
	},


	// Unrenders a visual indication of an event or external-element being dragged.
	unrenderDrag: function() {
		this.callChildren('unrenderDrag', arguments);
	},


	// Event Resizing
	// ---------------------------------------------------------------------------------------------------------------


	// Renders a visual indication of an event being resized.
	renderEventResize: function(eventFootprints, seg, isTouch) {
		this.callChildren('renderEventResize', arguments);
	},


	// Unrenders a visual indication of an event being resized.
	unrenderEventResize: function() {
		this.callChildren('unrenderEventResize', arguments);
	},


	// Selection
	// ---------------------------------------------------------------------------------------------------------------


	// Renders a visual indication of the selection
	// TODO: rename to `renderSelection` after legacy is gone
	renderSelectionFootprint: function(componentFootprint) {
		this.renderHighlight(componentFootprint);

		this.callChildren('renderSelectionFootprint', arguments);
	},


	// Unrenders a visual indication of selection
	unrenderSelection: function() {
		this.unrenderHighlight();

		this.callChildren('unrenderSelection', arguments);
	},


	// Highlight
	// ---------------------------------------------------------------------------------------------------------------


	// Renders an emphasis on the given date range. Given a span (unzoned start/end and other misc data)
	renderHighlight: function(componentFootprint) {
		if (this.fillRenderer) {
			this.fillRenderer.renderFootprint(
				'highlight',
				componentFootprint,
				{
					getClasses: function() {
						return [ 'fc-highlight' ];
					}
				}
			);
		}

		this.callChildren('renderHighlight', arguments);
	},


	// Unrenders the emphasis on a date range
	unrenderHighlight: function() {
		if (this.fillRenderer) {
			this.fillRenderer.unrender('highlight');
		}

		this.callChildren('unrenderHighlight', arguments);
	},


	// Hit Areas
	// ---------------------------------------------------------------------------------------------------------------
	// just because all DateComponents support this interface
	// doesn't mean they need to have their own internal coord system. they can defer to sub-components.


	hitsNeeded: function() {
		if (!(this.hitsNeededDepth++)) {
			this.prepareHits();
		}

		this.callChildren('hitsNeeded', arguments);
	},


	hitsNotNeeded: function() {
		if (this.hitsNeededDepth && !(--this.hitsNeededDepth)) {
			this.releaseHits();
		}

		this.callChildren('hitsNotNeeded', arguments);
	},


	prepareHits: function() {
		// subclasses can implement
	},


	releaseHits: function() {
		// subclasses can implement
	},


	// Given coordinates from the topleft of the document, return data about the date-related area underneath.
	// Can return an object with arbitrary properties (although top/right/left/bottom are encouraged).
	// Must have a `grid` property, a reference to this current grid. TODO: avoid this
	// The returned object will be processed by getHitFootprint and getHitEl.
	queryHit: function(leftOffset, topOffset) {
		var childrenByUid = this.childrenByUid;
		var uid;
		var hit;

		for (uid in childrenByUid) {
			hit = childrenByUid[uid].queryHit(leftOffset, topOffset);

			if (hit) {
				break;
			}
		}

		return hit;
	},


	getSafeHitFootprint: function(hit) {
		var footprint = this.getHitFootprint(hit);

		if (!this.dateProfile.activeUnzonedRange.containsRange(footprint.unzonedRange)) {
			return null;
		}

		return footprint;
	},


	getHitFootprint: function(hit) {
	},


	// Given position-level information about a date-related area within the grid,
	// should return a jQuery element that best represents it. passed to dayClick callback.
	getHitEl: function(hit) {
	},


	/* Converting eventRange -> eventFootprint
	------------------------------------------------------------------------------------------------------------------*/


	eventRangesToEventFootprints: function(eventRanges) {
		var eventFootprints = [];
		var i;

		for (i = 0; i < eventRanges.length; i++) {
			eventFootprints.push.apply( // append
				eventFootprints,
				this.eventRangeToEventFootprints(eventRanges[i])
			);
		}

		return eventFootprints;
	},


	eventRangeToEventFootprints: function(eventRange) {
		return [ eventRangeToEventFootprint(eventRange) ];
	},


	/* Converting componentFootprint/eventFootprint -> segs
	------------------------------------------------------------------------------------------------------------------*/


	eventFootprintsToSegs: function(eventFootprints) {
		var segs = [];
		var i;

		for (i = 0; i < eventFootprints.length; i++) {
			segs.push.apply(segs,
				this.eventFootprintToSegs(eventFootprints[i])
			);
		}

		return segs;
	},


	// Given an event's span (unzoned start/end and other misc data), and the event itself,
	// slices into segments and attaches event-derived properties to them.
	// eventSpan - { start, end, isStart, isEnd, otherthings... }
	eventFootprintToSegs: function(eventFootprint) {
		var unzonedRange = eventFootprint.componentFootprint.unzonedRange;
		var segs;
		var i, seg;

		segs = this.componentFootprintToSegs(eventFootprint.componentFootprint);

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			if (!unzonedRange.isStart) {
				seg.isStart = false;
			}
			if (!unzonedRange.isEnd) {
				seg.isEnd = false;
			}

			seg.footprint = eventFootprint;
			// TODO: rename to seg.eventFootprint
		}

		return segs;
	},


	componentFootprintToSegs: function(componentFootprint) {
		return [];
	},


	// Utils
	// ---------------------------------------------------------------------------------------------------------------


	callChildren: function(methodName, args) {
		this.iterChildren(function(child) {
			child[methodName].apply(child, args);
		});
	},


	iterChildren: function(func) {
		var childrenByUid = this.childrenByUid;
		var uid;

		for (uid in childrenByUid) {
			func(childrenByUid[uid]);
		}
	},


	_getCalendar: function() { // TODO: strip out. move to generic parent.
		return this.calendar || this.view.calendar;
	},


	_getView: function() { // TODO: strip out. move to generic parent.
		return this.view;
	},


	_getDateProfile: function() {
		return this._getView().get('dateProfile');
	}

});


DateComponent.guid = 0; // TODO: better system for this?


// legacy

function convertEventsPayloadToLegacyArray(eventsPayload) {
	var eventDefId;
	var eventInstances;
	var legacyEvents = [];
	var i;

	for (eventDefId in eventsPayload) {
		eventInstances = eventsPayload[eventDefId].eventInstances;

		for (i = 0; i < eventInstances.length; i++) {
			legacyEvents.push(
				eventInstances[i].toLegacy()
			);
		}
	}

	return legacyEvents;
}
