d3.json("data/states.json").then(function(_data){

	var l = d3.select('#lightbox')
		.on('click',function(){ zoom_out(); });
	var l_z = d3.select('#zoomed_tile');
	var nr = d3.select('#no-results');
	
	function update(__data){
		d3.select('#gallery')
			.selectAll('div.tile')
			.data(__data)
			.join(
				function(enter){
					return enter.append('div')
						.classed('tile',true)
						.attr('class',function(d){ return 'tile ' +d.Code; })
						.style('background-image',function(d){ return 'url("images/state_' +d.Code +'.png")'; })
						.on('click',function(e,d){ zoom_in(d); })
						;
				},
				function(update){
					return update
						.attr('class',function(d){ return 'tile ' +d.Code; })
						.style('background-image',function(d){ return 'url("images/state_' +d.Code +'.png")'; })
				}
			);
	}

	function find_states(){
		zoom_out();
		var v = $('#search_box').val().toLowerCase(),
				vdata;
		if(v.length == 0){
			vdata = _data;
		} else{
			vdata = _data.filter(function(d){
				return (d.Code.toLowerCase().startsWith(v) || d.State.toLowerCase().startsWith(v));
			});
		}
		if(vdata.length == 0){ nr.classed('show',true); } else { nr.classed('show',false); }
		update(vdata);
	}

	function zoom_in(_d){
		var url = 'url("images/state_' +_d.Code +'.png")',
				c = 'show '+_d.Code;
		l
			.classed('show',true);
		l_z
			.attr('class',c)
			.style('background-image',url);
	}
	function zoom_out(){
		l
			.classed('show',false)
			.attr('class','');
	}

	update(_data);

  $("#search_box").keyup(function(e){ find_states(); });
});