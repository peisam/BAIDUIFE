//view.js
var view = function View(){};
var doc = document;
var l = doc.getElementsByClassName("l")[0];
var c = doc.getElementsByClassName("c")[0];
var r = doc.getElementsByClassName("r")[0];
var list = l.getElementsByClassName("list")[0];
var children = c.getElementsByClassName("children")[0];
var bag = list.getElementsByClassName("task-pa")[0];
var child = children.getElementsByClassName("task-pa")[0];
var childTopic = r.getElementsByTagName("input")[0];
var timming = r.getElementsByTagName("input")[1];
var desc = r.getElementsByTagName("textarea")[0];
var task_Len = l.getElementsByClassName("len")[0];
var save = doc.getElementsByClassName("save")[0];
var plusBag = doc.getElementById("plusBag");
var plusChild = doc.getElementById("plusChild");
var modal = doc.getElementsByClassName("modal")[0];
//mvc
//
//v
//
//view
//view复制-任务包-div
view.prototype.copyBagDiv = function()
{
	var len = mo.len();
	var birth =	list.getElementsByClassName("task-pa")[0];
	for(var i=0;i<len-1;i++)
	{
		var node = birth.cloneNode(true);
		node.getElementsByClassName("task")[0].value="";
		node.getElementsByClassName("deleter")[0].style.display="none";
		list.appendChild(node)
	}
}

//view复制-孩子-div
view.prototype.copyChildDiv = function(No)
{
	var len = mo.childLen(No);
	var birth =	children.getElementsByClassName("task-pa")[0];
	for(var i=0;i<len-1;i++)
	{
		var node = birth.cloneNode(true);
		node.getElementsByClassName("task")[0].value="";
		node.getElementsByClassName("deleter")[0].style.display="none";
		children.appendChild(node)
	}
}

//view打印-任务包
view.prototype.printBag = function()
{
	var len = mo.len();
	var input =	list.getElementsByClassName("task");
	for(var i=0;i<len;i++)
	{
		input[i].value = localJSON[i].topic;
	}
}


//view打印-孩子
view.prototype.printChild = function(No)
{
	var len = mo.childLen(No);
	var input =	children.getElementsByClassName("task");
	for(var i=0;i<len;i++)
	{
		input[i].value = localJSON[No]["children"][i].topic;
	}
}


//view打印-孩子-标题-时间-详情
view.prototype.printChildContent = function(node,childnum)
{
	childTopic.value = localJSON[node]["children"][childnum].topic;
	timming.value = localJSON[node]["children"][childnum].timming;
	desc.value = localJSON[node]["children"][childnum].desc;
}

//view显示-任务包-删除按钮
view.prototype.viewBagX = function(node)
{

}


//view隐藏-任务包-删除按钮
view.prototype.hideBagX = function()
{

}


//view显示-孩子-删除按钮
view.prototype.viewChildX = function(node,childnum)
{

}

//view隐藏-孩子-删除按钮
view.prototype.hideChildX = function(node)
{

}

//view清空-任务包
view.prototype.clearBag = function(No)
{
	var input =	list.getElementsByClassName("task-pa");
	var birth =	list.getElementsByClassName("task")[0];
	var len = input.length;
	birth.value = "";
	if(len>=2)
	{
		for(var i=len-1;i>=1;i--)
			list.removeChild(input[i])
	}
}

//view清空-孩子
view.prototype.clearChild = function(No)
{
	var input =	children.getElementsByClassName("task-pa");
	var birth =	children.getElementsByClassName("task")[0];
	var len = input.length;
	birth.value = "";
	if(len>=2)
	{
		for(var i=len-1;i>=1;i--)
			children.removeChild(input[i])
	}
}

//view清空-孩子内容
view.prototype.clearContent = function()
{
	childTopic.value = "";
	timming.value = "";
	desc.value = "";
}

//逻辑组合
//view显示左边=copyBagDiv+printBag
view.prototype.showLeft = function()
{
	this.copyBagDiv();
	this.printBag();
}

//view显示中间=copyChildDiv+printChild
view.prototype.showCentre = function(f)
{
	this.copyChildDiv(f);
	this.printChild(f);
}

//view显示右边直接调用printChildContent

//view清扫中间和右边=clearChild+clearContent
view.prototype.clearCentreRight = function(f)
{
	this.clearChild(f);
	this.clearContent();
	this.childflag = undefined;
}

//save->TO SAVE
view.prototype.changeSave = function()
{
	save.innerHTML = "TO SAVE";
}

//重加载(于删除添加等操作后执行)
//重加载-任务包
view.prototype.refreshBag = function()
{
	//重加载
	v.clearCentreRight();
	v.clearBag();
	v.copyBagDiv();
	v.printBag();
	v.focusFlag();
	con.dg();
	con.judgeLength();
}
//重加载-孩子
view.prototype.refreshChild = function()
{
	//重加载
	v.clearCentreRight();
	v.showCentre(con.bagFlag);
	v.focusFlag();
	con.dg();
	con.judgeLength();
}

view.prototype.focusFlag = function()
{
	var inputLeft = l.getElementsByClassName("task");
	var inputCentre = c.getElementsByClassName("task");
	if(con.bagFlag!==undefined&&con.childFlag===undefined)
		inputLeft[con.bagFlag].focus();
	if(con.bagFlag!==undefined&&con.childFlag!==undefined)
		inputCentre[con.childFlag].focus();
}

//转场
//多页
view.prototype.viewL = function()
{
	l.style.display="block";
	c.style.display="none";
	r.style.display="none";
}

view.prototype.viewC = function()
{
	c.style.display="block";
	l.style.display="none";
	r.style.display="none";
}

view.prototype.viewR = function()
{
	r.style.display="block";
	c.style.display="none";
	l.style.display="none";
}

//单页
view.prototype.spaLeft = function()
{
	modal.setAttribute("class","modal app-rightSide");
	setTimeout("modal.setAttribute('class','modal app-show')",100);
}
view.prototype.spaAnti = function()
{
	modal.setAttribute("class","modal app-antiSide");
	setTimeout("modal.setAttribute('class','modal app-show')",100);
}
view.prototype.spaDis = function()
{
	modal.setAttribute('class','modal app-disappear');
}
//组合
//向左动效+返回任务包闭包
view.prototype.bagCartoon = function(e)
{
	this.spaLeft();
	setTimeout("con.bagClosure("+e+")",500);//返回给点击的事件代理闭包
	setTimeout("v.spaDis()",600);//消逝
}

//向左动效+返回孩子闭包
view.prototype.childCartoon = function(e)
{
	this.spaLeft();
	setTimeout("con.childClosure("+e+")",500);//返回给点击的事件代理闭包
	setTimeout("v.spaDis()",600);//消逝
}

//向右动效+回到主页
view.prototype.menuCartoon = function(e)
{
	this.spaAnti();
	setTimeout("v.viewL()",500);//会主页
	setTimeout("v.spaDis()",600);//消逝
}
//oo
var v = new view();


