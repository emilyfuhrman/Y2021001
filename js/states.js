d3.json("/data/states.json").then(function(_data){
	
	function update(__data){
		d3.select('#gallery')
			.selectAll('div.tile')
			.data(__data)
			.join(
				function(enter){
					return enter.append('div')
						.classed('tile',true)
						.attr('class',function(d){ return 'tile ' +d.Code; })
						.style('background-image',function(d){ return 'url("/images/state_' +d.Code +'.png")'; });
				},
				function(update){debugger;
					return update
						.attr('class',function(d){ return 'tile ' +d.Code; })
						.style('background-image',function(d){ return 'url("/images/state_' +d.Code +'.png")'; })
				}
			);
	}

	function find_states(){
		var v = $('#search_box').val().toLowerCase(),
				vdata;
		if(v.length == 0){
			vdata = _data;
		} else{
			vdata = _data.filter(function(d){
				return (d.Code.toLowerCase().startsWith(v) || d.State.toLowerCase().startsWith(v));
			});
		}
		update(vdata);
	}

	update(_data);

  $("#search_box").keyup(function(e){ find_states(); });
});