
var ExternalDropping = FC.ExternalDropping = Interaction.extend(ListenerMixin, {

	dragListener: null,
	isDragging: false, // jqui-dragging an external element? boolean


	/*
	component impements:
		- eventRangesToEventFootprints
		- isEventInstanceGroupAllowed
		- isExternalInstanceGroupAllowed
		- renderDrag
		- unrenderDrag
	*/


	end: function() {
		if (this.dragListener) {
			this.dragListener.endInteraction();
		}
	},


	bindToDocument: function() {
		this.listenTo($(document), {
			dragstart: this.handleDragStart, // jqui
			sortstart: this.handleDragStart // jqui
		});
	},


	unbindFromDocument: function() {
		this.stopListeningTo($(document));
	},


	// Called when a jQuery UI drag is initiated anywhere in the DOM
	handleDragStart: function(ev, ui) {
		var el;
		var accept;

		if (this.opt('droppable')) { // only listen if this setting is on
			el = $((ui ? ui.item : null) || ev.target);

			// Test that the dragged element passes the dropAccept selector or filter function.
			// FYI, the default is "*" (matches all)
			accept = this.opt('dropAccept');
			if ($.isFunction(accept) ? accept.call(el[0], el) : el.is(accept)) {
				if (!this.isDragging) { // prevent double-listening if fired twice
					this.listenToExternalDrag(el, ev, ui);
				}
			}
		}
	},


	// Called when a jQuery UI drag starts and it needs to be monitored for dropping
	listenToExternalDrag: function(el, ev, ui) {
		var _this = this;
		var component = this.component;
		var view = this.view;
		var meta = getDraggedElMeta(el); // extra data about event drop, including possible event to create
		var singleEventDef; // a null value signals an unsuccessful drag

		// listener that tracks mouse movement over date-associated pixel regions
		var dragListener = _this.dragListener = new HitDragListener(component, {
			interactionStart: function() {
				_this.isDragging = true;
			},
			hitOver: function(hit) {
				var isAllowed = true;
				var hitFootprint = hit.component.getSafeHitFootprint(hit); // hit might not belong to this grid
				var mutatedEventInstanceGroup;

				if (hitFootprint) {
					singleEventDef = _this.computeExternalDrop(hitFootprint, meta);

					if (singleEventDef) {
						mutatedEventInstanceGroup = new EventInstanceGroup(
							singleEventDef.buildInstances()
						);
						isAllowed = meta.eventProps ? // isEvent?
							component.isEventInstanceGroupAllowed(mutatedEventInstanceGroup) :
							component.isExternalInstanceGroupAllowed(mutatedEventInstanceGroup);
					}
					else {
						isAllowed = false;
					}
				}
				else {
					isAllowed = false;
				}

				if (!isAllowed) {
					singleEventDef = null;
					disableCursor();
				}

				if (singleEventDef) {
					component.renderDrag( // called without a seg parameter
						component.eventRangesToEventFootprints(
							mutatedEventInstanceGroup.sliceRenderRanges(component.dateProfile.renderUnzonedRange, view.calendar)
						)
					);
				}
			},
			hitOut: function() {
				singleEventDef = null; // signal unsuccessful
			},
			hitDone: function() { // Called after a hitOut OR before a dragEnd
				enableCursor();
				component.unrenderDrag();
			},
			interactionEnd: function(ev) {

				if (singleEventDef) { // element was dropped on a valid hit
					view.reportExternalDrop(
						singleEventDef,
						Boolean(meta.eventProps), // isEvent
						Boolean(meta.stick), // isSticky
						el, ev, ui
					);
				}

				_this.isDragging = false;
				_this.dragListener = null;
			}
		});

		dragListener.startDrag(ev); // start listening immediately
	},


	// Given a hit to be dropped upon, and misc data associated with the jqui drag (guaranteed to be a plain object),
	// returns the zoned start/end dates for the event that would result from the hypothetical drop. end might be null.
	// Returning a null value signals an invalid drop hit.
	// DOES NOT consider overlap/constraint.
	// Assumes both footprints are non-open-ended.
	computeExternalDrop: function(componentFootprint, meta) {
		var calendar = this.view.calendar;
		var start = FC.moment.utc(componentFootprint.unzonedRange.startMs).stripZone();
		var end;
		var eventDef;

		if (componentFootprint.isAllDay) {
			// if dropped on an all-day span, and element's metadata specified a time, set it
			if (meta.startTime) {
				start.time(meta.startTime);
			}
			else {
				start.stripTime();
			}
		}

		if (meta.duration) {
			end = start.clone().add(meta.duration);
		}

		start = calendar.applyTimezone(start);

		if (end) {
			end = calendar.applyTimezone(end);
		}

		eventDef = SingleEventDef.parse(
			$.extend({}, meta.eventProps, {
				start: start,
				end: end
			}),
			new EventSource(calendar)
		);

		return eventDef;
	}

});


/* External-Dragging-Element Data
----------------------------------------------------------------------------------------------------------------------*/

// Require all HTML5 data-* attributes used by FullCalendar to have this prefix.
// A value of '' will query attributes like data-event. A value of 'fc' will query attributes like data-fc-event.
FC.dataAttrPrefix = '';

// Given a jQuery element that might represent a dragged FullCalendar event, returns an intermediate data structure
// to be used for Event Object creation.
// A defined `.eventProps`, even when empty, indicates that an event should be created.
function getDraggedElMeta(el) {
	var prefix = FC.dataAttrPrefix;
	var eventProps; // properties for creating the event, not related to date/time
	var startTime; // a Duration
	var duration;
	var stick;

	if (prefix) { prefix += '-'; }
	eventProps = el.data(prefix + 'event') || null;

	if (eventProps) {
		if (typeof eventProps === 'object') {
			eventProps = $.extend({}, eventProps); // make a copy
		}
		else { // something like 1 or true. still signal event creation
			eventProps = {};
		}

		// pluck special-cased date/time properties
		startTime = eventProps.start;
		if (startTime == null) { startTime = eventProps.time; } // accept 'time' as well
		duration = eventProps.duration;
		stick = eventProps.stick;
		delete eventProps.start;
		delete eventProps.time;
		delete eventProps.duration;
		delete eventProps.stick;
	}

	// fallback to standalone attribute values for each of the date/time properties
	if (startTime == null) { startTime = el.data(prefix + 'start'); }
	if (startTime == null) { startTime = el.data(prefix + 'time'); } // accept 'time' as well
	if (duration == null) { duration = el.data(prefix + 'duration'); }
	if (stick == null) { stick = el.data(prefix + 'stick'); }

	// massage into correct data types
	startTime = startTime != null ? moment.duration(startTime) : null;
	duration = duration != null ? moment.duration(duration) : null;
	stick = Boolean(stick);

	return { eventProps: eventProps, startTime: startTime, duration: duration, stick: stick };
}
