d3.json("/data/states.json").then(function(_data){
	var t = d3.select('#gallery')
		.selectAll('div.tile')
		.data(_data)
		.enter().append('div')
			.classed('tile',true)
			.attr('class',function(d){ return 'tile ' +d.Code; })
			.style('background-image',function(d){ return 'url("/images/state_' +d.Code +'.png")'; });
	t.exit().remove();
});