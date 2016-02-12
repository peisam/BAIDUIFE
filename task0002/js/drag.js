var left = document.getElementsByClassName("left")[0];
var right = document.getElementsByClassName("right")[0];
var dragger = function Dragger(){
};
dragger.prototype.dragUp = function drapUp(ev){
	var e = ev||window.event;
	var target = e.target||e.srcElement;
	var disX=e.clientX - target.offsetLeft;
	var disY=e.clientY - target.offsetTop;
	target.style.position = "absolute";
	target.setAttribute("class","drag filter");
	document.onmousemove=function(e){
		var e = e||window.event;
		var l = e.clientX - disX;//刚mousedown时l=offsetLeft 随着平移l也变化
		var t = e.clientY - disY;
		if(l>-40 && l<46)
			l=3;
		else if(l>294 && l< 380)
			l=337;
		target.style.left = l + "px";
		target.style.top = t + "px";
	}
	document.onmouseup = function(){
		document.onmousemove = null;
		target.setAttribute("class","drag");
		target.style.position = "static";
		if(parseInt(target.style.left)<100)
			left.appendChild(target);
		else if(parseInt(target.style.left)>300)
			right.appendChild(target);
	}
}
//oo
var d=new dragger;
//事件代理
function init(){
	delegateEvent(left,"span","mousedown",d.dragUp);
	delegateEvent(right,"span","mousedown",d.dragUp);
}
init();
