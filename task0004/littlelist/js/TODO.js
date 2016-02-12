//TODO.js
var left = document.getElementsByClassName("list")[0];

var viewer = function Viewer(){
	this.flag=localStorage.length-1;
};

viewer.prototype.ku=function ku(){
	for(var i=0;i<document.getElementsByClassName("task").length;i++){
		localStorage[i]=document.getElementsByClassName("task")[i].value;
	}
	m.getmoney();
}
viewer.prototype.ls=function ls(){
	for(var j=0;j<localStorage.length-1;j++){
		this.cp();
	}
	for(var i=0;i<left.getElementsByClassName("task").length;i++){
		if(localStorage[i]){
			console.log("value");
		}
		else{
			localStorage[i]="";
		}
		left.getElementsByClassName("task")[i].value=localStorage[i];
	}
	m.getmoney()
}
viewer.prototype.cp=function cp(){
	if(cn){cn=null;}
	var cn=left.getElementsByClassName("task-pa")[0].cloneNode(true);
	cn.getElementsByClassName("task")[0].value="";
	left.appendChild(cn);
}
viewer.prototype.copy=function copy(){
	if(left.getElementsByClassName("task-pa").length>45)
		return false;
	this.cp();
	this.re();
}
viewer.prototype.insert=function insert(){
	if(left.getElementsByClassName("task-pa").length>45)
		return false;
	if(this.flag > localStorage.length-1)
		this.flag=localStorage.length-1;
	if(cn){cn=null;}
	var cn=left.getElementsByClassName("task-pa")[0].cloneNode(true);
	var flag=left.getElementsByClassName("task-pa")[this.flag];
	cn.getElementsByClassName("task")[0].value="";
	insertAfter(cn,flag);
	this.re();
}
viewer.prototype.dl=function dl(num){
	if(left.getElementsByClassName("task-pa").length<=1)
		return false;
	else if(num==null)
		return false;
	else{
		var taskPa=document.getElementsByClassName("task-pa");
		taskPa[num].parentNode.removeChild(taskPa[num]);
		localStorage.clear();
		this.ku();
	}
	this.re();
}
viewer.prototype.dg=function dg(){
	for(var i in localStorage){
		//
		left.getElementsByTagName("a")[i].onclick = (function(i){
			return function(){v.dl(i)};
		})(i);
		//
		left.getElementsByClassName("task-pa")[i].onmouseover = (function(i){
			return function(){v.hv(i)};
		})(i);
		//
		left.getElementsByClassName("task-pa")[i].onmouseout = (function(i){
			return function(){v.hvoff(i)};
		})(i);
		//
		left.getElementsByClassName("task")[i].onfocus = (function(i){
			return function(){v.getflag(i);};
		})(i);
		//
		/*left.getElementsByClassName("task")[i].onblur = (function(i){
			return function(){v.getflag(localStorage.length-1)};
		})(i);*/
	}	
}
viewer.prototype.re=function re(){
	localStorage.clear();
	this.ku();
	this.len();
	this.dg();
}
viewer.prototype.hv=function hv(num){
	var a = left.getElementsByTagName("a");
	a[num].style.display = "block";
}
viewer.prototype.hvoff=function hvoff(num){
	var a = left.getElementsByTagName("a");
	a[num].style.display = "none";
}
viewer.prototype.len=function len(){
	document.getElementsByClassName("len")[0].innerHTML="任务数量("+localStorage.length+")";
}
viewer.prototype.getflag=function getflag(num){
	this.flag = num;
}
//money
var money = function money(){
	this.money=0;
}
money.prototype.getmoney=function getmoney(){
	this.money=0;
	for(var j=0;j<localStorage.length;j++){
		if(!parseFloat(localStorage[j])){
			continue;
		}
		else if(parseFloat(localStorage[j])){
			this.money+=parseFloat(localStorage[j]);
		}
	}
	console.log(this.money);
	document.getElementById("money").innerHTML = "¥"+this.money;
}

//oo
var v = new viewer;
var m = new money;
//事件代理
function init(){
	v.ls();
	v.len();
	v.dg();
}
init();
document.onkeyup=v.ku;
//


