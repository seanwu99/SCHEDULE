
var TimeGridFillRenderer = FillRenderer.extend({


	attachSegEls: function(type, segs) {
		var timeGrid = this.component;
		var containerEls;

		// TODO: more efficient lookup
		if (type === 'bgEvent') {
			containerEls = timeGrid.bgContainerEls;
		}
		else if (type === 'businessHours') {
			containerEls = timeGrid.businessContainerEls;
		}
		else if (type === 'highlight') {
			containerEls = timeGrid.highlightContainerEls;
		}

		timeGrid.updateSegVerticals(segs);
		timeGrid.attachSegsByCol(timeGrid.groupSegsByCol(segs), containerEls);

		return segs.map(function(seg) {
			return seg.el[0];
		});
	}

});
