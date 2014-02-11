(function($) {
    /**
     * 高亮显示当前链接元素[现在还得基于Jquery]
     * 
     * <code>
     * //HTML部分:
     * <div class="navmenu">
         * <ul>
             * <li><a href="link1">link1</a></li>
             * <li><a href="link2">link2</a></li>
             * <li><a href="link3">link3</a></li>
         * </ul>
     * </div>
     * //JS部分：
     *  HHJsLib('.navmenu ul li').highLightElement('active', 0);
     * </code>
     *
     * @param string findDom 查找的当前元素
     * @param string currentClass 当前选中的样式名
     * @param string level 相对于当前查到元素的层级关系，往下是-N, 往上是+N
     * @param string callback 对找到的目标附加的函数调用
     *
     * @return void
     */
     HHJsLib.highLightElement    = function(currentClass, level, callback) {
        var url         = window.location.href;
        var nowHref     = url.substring(url.lastIndexOf('/') + 1);//拿到当前访问的页面及查询内容
        if(typeof nowHref == 'undefined' || nowHref == '') {
            return true;
        }
        this.$target.each(function() {
            var curHref     = jQuery(this).children('a').attr('href');
            if(typeof curHref != 'undefined' && curHref != '') {
                if(curHref == url || curHref == nowHref) {
                    var targetDom = curTargetDom = $(this);
                    if(level < 0) {
                        for(var i = 0; i > level; i --) {
                            targetDom    = jQuery(targetDom).children('a'); 
                        }
                    } else if(level > 0) {
                        for(var i = 0; i < level; i ++) {
                            targetDom    = jQuery(targetDom).parent(); 
                        }
                    }
                    if(typeof callback != 'undefined') {
                        callback(targetDom, curTargetDom[0]);
                    }
                    jQuery(targetDom[0]).addClass(currentClass);
                    
                    return false;
                }
            }
        });
    };
})(jQuery);
