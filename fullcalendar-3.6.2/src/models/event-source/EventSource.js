
var EventSource = Class.extend(ParsableModelMixin, {

	calendar: null,

	id: null, // can stay null
	uid: null,
	color: null,
	backgroundColor: null,
	borderColor: null,
	textColor: null,
	className: null, // array
	editable: null,
	startEditable: null,
	durationEditable: null,
	rendering: null,
	overlap: null,
	constraint: null,
	allDayDefault: null,
	eventDataTransform: null, // optional function


	// can we do away with calendar? at least for the abstract?
	// useful for buildEventDef
	constructor: function(calendar) {
		this.calendar = calendar;
		this.className = [];
		this.uid = String(EventSource.uuid++);
	},


	fetch: function(start, end, timezone) {
		// subclasses must implement. must return a promise.
	},


	removeEventDefsById: function(eventDefId) {
		// optional for subclasses to implement
	},


	removeAllEventDefs: function() {
		// optional for subclasses to implement
	},


	/*
	For compairing/matching
	*/
	getPrimitive: function(otherSource) {
		// subclasses must implement
	},


	parseEventDefs: function(rawEventDefs) {
		var i;
		var eventDef;
		var eventDefs = [];

		for (i = 0; i < rawEventDefs.length; i++) {
			eventDef = this.parseEventDef(rawEventDefs[i]);

			if (eventDef) {
				eventDefs.push(eventDef);
			}
		}

		return eventDefs;
	},


	parseEventDef: function(rawInput) {
		var calendarTransform = this.calendar.opt('eventDataTransform');
		var sourceTransform = this.eventDataTransform;

		if (calendarTransform) {
			rawInput = calendarTransform(rawInput);
		}
		if (sourceTransform) {
			rawInput = sourceTransform(rawInput);
		}

		return EventDefParser.parse(rawInput, this);
	},


	applyManualStandardProps: function(rawProps) {

		if (rawProps.id != null) {
			this.id = EventSource.normalizeId(rawProps.id);
		}

		// TODO: converge with EventDef
		if ($.isArray(rawProps.className)) {
			this.className = rawProps.className;
		}
		else if (typeof rawProps.className === 'string') {
			this.className = rawProps.className.split(/\s+/);
		}

		return true;
	}

});


// finish initializing the mixin
EventSource.defineStandardProps = ParsableModelMixin_defineStandardProps;


// IDs
// ---------------------------------------------------------------------------------------------------------------------
// TODO: converge with EventDef


EventSource.uuid = 0;


EventSource.normalizeId = function(id) {
	if (id) {
		return String(id);
	}

	return null;
};


// Parsing
// ---------------------------------------------------------------------------------------------------------------------


EventSource.defineStandardProps({
	// manually process...
	id: false,
	className: false,

	// automatically transfer...
	color: true,
	backgroundColor: true,
	borderColor: true,
	textColor: true,
	editable: true,
	startEditable: true,
	durationEditable: true,
	rendering: true,
	overlap: true,
	constraint: true,
	allDayDefault: true,
	eventDataTransform: true
});


/*
rawInput can be any data type!
*/
EventSource.parse = function(rawInput, calendar) {
	var source = new this(calendar);

	if (typeof rawInput === 'object') {
		if (source.applyProps(rawInput)) {
			return source;
		}
	}

	return false;
};


FC.EventSource = EventSource;
