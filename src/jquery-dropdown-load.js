$.fn.extend({
	autoload : function(url, before, callback, end) {
		var target = $(this);
		var allowFlag = true;
		
		function load() {
			var loadTotal = target.children().length;
			$.ajax({
				type : 'get',
				data : {
					act : 'loadmore',
					count : loadTotal
				},
				url : url,
				context : target,
				//async : false,
				beforeSend : function() {
					before();
				},
				success : function(o) {
					if (!o || o.length < 2) {
						window.onscroll = null;
						end();
						return;
					}
					setTimeout(function(){
						allowFlag = true;
						target.append(o);
						callback(o);
					},1000);
				}
			});
		}

		$(window).scroll(function(){
			if (allowFlag &&($(document).height() - $(this).scrollTop() - $(this).height()) < 1) {		
				allowFlag = false;
				load();
			}
		});
	}
});
