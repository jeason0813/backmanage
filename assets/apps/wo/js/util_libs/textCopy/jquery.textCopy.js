 /**
 * PHPWind util Library 
 * @Copyright Copyright 2011, phpwind.com
 * @Descript: 复制功能js（li列表或直接复制内容）
 * @Author	: linhao87@gmail.com
 * @Depend	: core.js、jquery.js(1.7 or later)、common.js、dialog.js、zeroClipboard组件，js_root暂时定义在后台foot.htm文件里
 * $Id: textCopy.js 3846 2012-01-13 02:56:43Z hao.lin $
 
 ***************************************************************
 
 * js引用代码：
	var copy_btn = $('a.J_copy_clipboard'); //复制按钮
	if(copy_btn.length) {
		Wind.use('textCopy', 'dialog', function() {
			copy_btn.textCopy();
		});
	}

 * html代码：
 
	复制列表代码(复制按钮添加加data-type="li"属性)：
	<a class="J_copy_clipboard" data-type="li" data-id="J_clipboard_copy1" href="#">复制代码</a>
	<ul id="J_clipboard_copy1">
		<li>代码1</li>
		<li>代码2</li>
	</ul>
	
	直接复制内容：
	<a class="J_copy_clipboard" data-id="J_clipboard_copy3" href="#">复制内容</a>
	<div id="J_clipboard_copy3">内容2</div>
	
 ***************************************************************
 */
;(function ( $, window, document, undefined ) {
    var pluginName = 'textCopy';

	function Plugin(element) {
		this.element = element;
        this.init();
    }
	
    Plugin.prototype.init = function () {
		var element = this.element, get_text_arr;
		
		if($.browser.msie) {
			//ie复制
			
			//点击复制按钮
			element.on('click', function(e){
				e.preventDefault();
				get_text_arr = getTextArr(); //获取复制文本
				
				//判断内容是否为空
				if( get_text_arr === '') {
					Wind.dialog.alert('复制内容为空');
					return false;
				}
				
				//完成复制
				if(window.clipboardData.setData("Text", get_text_arr)) {
					resultTip({
						error : true,
						msg : '复制成功'
					});
				}
				
			});
			
		}else{
			//非ie复制，引入zeroClipboard组件
			Wind.js(js_root+ 'util_libs/textCopy/zeroClipboard/zeroClipboard.js?v=' +js_version, function(){
						
				element.clip = new ZeroClipboard.Client();
				ZeroClipboard.setMoviePath( js_root+'util_libs/textCopy/zeroClipboard/zeroClipboard.swf'); //flash文件地址
				element.clip.glue(element[0]); //flash定位到文字按钮上
				element.clip.setHandCursor( true ); //flash的鼠标手势
						
				//flash被点击，提交复制
				element.clip.addEventListener('mouseDown', function (client) {
					get_text_arr = getTextArr(); //获取复制文本
						
					//判断复制内容是否为空
					if(get_text_arr === '') {
						Wind.dialog.alert('复制内容为空');
						return false;
					}
						
					//开始复制
					element.clip.setText(get_text_arr);
						
					//完成复制
					element.clip.addEventListener('complete', function (client, text) {
						resultTip({
							error : true,
							msg : '复制成功'
						});
					});
						
				});
				
				//鼠标经过文字时以防被点击
				element.on('click', function(e){
					e.preventDefault();
				});
				
			});
			
		}
		
		
		//获取复制的文本
		function getTextArr() {
			var text_arr = [];
			
			if( element.data('type') === 'li' ) {
			
				//复制列表内容，循环存入数组
				$.each( $('#'+element.data('id')+' > li' ), function() {
					text_arr.push($(this).text());

				});
							
			}else{
				//直接复制文本内容
				text_arr.push( $('#'+element.data('id')).text() );			
			}
			
			//返回文本
			return text_arr.join('\r\n');

		}
		
		
    };

	
    $.fn[pluginName] = Wind[pluginName]= function (options ) {
        return this.each(function () {
			new Plugin( $(this) );
        });
    };

})( jQuery, window ,document);
