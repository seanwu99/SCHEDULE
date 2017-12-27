
var BusinessHourRenderer = FC.BusinessHourRenderer = Class.extend({

	component: null,
	fillRenderer: null,
	segs: null,


	/*
	component implements:
		- eventRangesToEventFootprints
		- eventFootprintsToSegs
	*/
	constructor: function(component, fillRenderer) {
		this.component = component;
		this.fillRenderer = fillRenderer;
	},


	render: function(businessHourGenerator) {
		var component = this.component;
		var unzonedRange = component._getDateProfile().activeUnzonedRange;

		var eventInstanceGroup = businessHourGenerator.buildEventInstanceGroup(
			component.hasAllDayBusinessHours,
			unzonedRange
		);

		var eventFootprints = eventInstanceGroup ?
			component.eventRangesToEventFootprints(
				eventInstanceGroup.sliceRenderRanges(unzonedRange)
			) :
			[];

		this.renderEventFootprints(eventFootprints);
	},


	renderEventFootprints: function(eventFootprints) {
		var segs = this.component.eventFootprintsToSegs(eventFootprints);

		this.renderSegs(segs);
		this.segs = segs;
	},


	renderSegs: function(segs) {
		if (this.fillRenderer) {
			this.fillRenderer.renderSegs('businessHours', segs, {
				getClasses: function(seg) {
					return [ 'fc-nonbusiness', 'fc-bgevent' ];
				}
			});
		}
	},


	unrender: function() {
		if (this.fillRenderer) {
			this.fillRenderer.unrender('businessHours');
		}

		this.segs = null;
	},


	getSegs: function() {
		return this.segs || [];
	}

});
