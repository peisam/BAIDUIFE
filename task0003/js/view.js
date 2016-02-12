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
//mvc
//
//v
//
//view
//view复制-任务包-div
view.prototype.copyBagDiv = function()
{
	var len = mo.len();
	for(var i=0;i<len-1;i++)
	{
		var node = bag.cloneNode(true);
		list.appendChild(node)
	}
}

//view复制-孩子-div
view.prototype.copyChildDiv = function(No)
{
	var len = mo.childLen(No);
	for(var i=0;i<len-1;i++)
	{
		var node = child.cloneNode(true);
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
	var x = list.getElementsByTagName("a");
	x[node].style.display="block";
	for(var i in localJSON)
	{
		if(i!=node)
			x[i].style.display="none";
	}
}

//view显示-孩子-删除按钮
view.prototype.viewChildX = function(node,childnum)
{
	var x = children.getElementsByTagName("a");
	x[childnum].style.display="block";
	for(var i in localJSON[node]["children"])
	{
		if(i!=childnum)
			x[i].style.display="none";
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

//oo
var v = new view();


