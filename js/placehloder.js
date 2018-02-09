/**
 * Created by Administrator on 2017/12/15 0015.
 * lte ie9 not support placeholder
 */
function PlacehloderObj(){
    var getStyle = function(dom, attr){
        return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
    };

    var createSpan = function(that,elem){
        if(elem.getAttribute('placeholder')&&elem.getAttribute('placeholder') != "") {
            var lineHeight = elem.style.lineHeight;
            var height = elem.offsetHeight;
            var left = elem.offsetLeft;
            var parent = elem.parentNode;
            var padding = getStyle(elem,"paddingLeft");
            console.log((left + parseInt(padding)?parseInt(padding):0) + 'px');
            parent.style.position = 'relative';
            var span = document.createElement('span');
            span.innerHTML = elem.getAttribute('placeholder');
            span.style.color = that.color;
            span.style.fontSize = that.fontSize;
            span.style.lineHeight = height + 'px';
            span.style.display = 'block';
            span.style.height = height + 'px';
            span.style.position = 'absolute';
            span.style.left = (left + parseInt(padding)?parseInt(padding):0) + 'px';
            span.style.top = 0;
            span.style.background = 'transparent';
            parent.appendChild(span);

            elem.onfocus = function() {
                span.style.display = "none";
            };
            elem.onblur = function(){
                if(this.value == ""||!this.value){
                    span.style.display = "block";
                } else {
                    span.style.display = "none";
                }
            }
            span.onclick = function(){
                elem.focus();
            }
        } else return false;
    };

    this.init = function(config) {
        this.color = config.color;
        this.fontSize = config.fontSize;
        this.elems = document.querySelectorAll(config.elem);
        for(var i = 0;i < this.elems.length;i++) {
            createSpan(this,this.elems[i]);
        }
    }
}


