$.fn.extend({
	autoload:function(url,before,callback,end){		
		// 获取滚动条当前的位置
		function getScrollTop() {
			var scrollTop = 0;
			if (document.documentElement && document.documentElement.scrollTop) {
				scrollTop = document.documentElement.scrollTop;
			} else if (document.body) {
				scrollTop = document.body.scrollTop;
			}
			return scrollTop;
		}

		// 获取当前可是范围的高度
		function getClientHeight() {
			var clientHeight = 0;
			if (document.body.clientHeight && document.documentElement.clientHeight) {
				clientHeight = Math.min(document.body.clientHeight,
						document.documentElement.clientHeight);
			} else {
				clientHeight = Math.max(document.body.clientHeight,
						document.documentElement.clientHeight);
			}
			return clientHeight;
		}

		// 获取文档完整的高度
		function getScrollHeight() {
			return Math.max(document.body.scrollHeight,
					document.documentElement.scrollHeight);
		}

		var target = $(this);
		
		window.onscroll = function(){
			var loadTotal = target.children().length;
			if (getScrollTop() + getClientHeight() >= getScrollHeight()-100) {
				$.ajax({
				    type:'get',
				    data:{act:'loadmore',count:loadTotal},
				    url:url,
				    context:target,
				    async:false,
				    beforeSend:function(){
				    	before();
				    },
				    success:function(o){
				    	if(!o || o.length < 2){
				    		window.onscroll = null;
				    		end();
				    		return;
				    	}
				    	$(this).append(o);
				    	callback(o);
				    }
				});	
			}	
		};
		
	
	}
});
