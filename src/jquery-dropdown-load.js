$.fn.extend({
	autoload : function(url, before, callback, end) {
		var target = $(this);
		$(window).scroll(
				function() {
					if (($(document).height() - $(this).scrollTop() - $(this)
							.height()) < 50) {
						var loadTotal = target.children().length;
						$.ajax({
							type : 'get',
							data : {
								act : 'loadmore',
								count : loadTotal
							},
							url : url,
							context : target,
							async : false,
							beforeSend : function() {
								before();
							},
							success : function(o) {
								if (!o || o.length < 2) {
									window.onscroll = null;
									end();
									return;
								}
								$(this).append(o);
								callback(o);
							}
						});
					}
				});
	}
});
