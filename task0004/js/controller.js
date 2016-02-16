//controller.js
var controller = function Controller()
{
	this.bagFlag = undefined;
	this.childFlag = undefined;
	this.touchFlag = undefined;
}
//mvc
//
//c
//得到bagflag
controller.prototype.getBagFlag = function(node)
{
	this.bagFlag = node;
	console.log("bag="+this.bagFlag);
}

//得到childflag
controller.prototype.getChildFlag = function(node)
{
	this.childFlag = node;
	console.log("child="+this.childFlag);
}

//c传递v至m
//传递bag到JSON
controller.prototype.bagToJSON = function()
{
	var input = list.getElementsByClassName("task");
	for(var i in localJSON)
		mo.editBagTopic(i,input[i].value);
}

//传递child到JSON
controller.prototype.childToJSON = function(node)
{
	var input = children.getElementsByClassName("task");
	for(var i in localJSON[node]["children"])
	{
		mo.editChildTopic(node,i,input[i].value);
	}
}

//传递desc timming到JSON
controller.prototype.contentToJSON = function(node,childnode)
{
	mo.editChildTimming(node,childnode,this.regTimming(timming.value));//加入Timming正则判断
	mo.editChildDesc(node,childnode,desc.value);
}

//所有的add delete等涉及数组重排操作的均触发保存后重新渲染
//事件
//事件代理
controller.prototype.dg = function()
{
	var inputLeft = list.getElementsByClassName("task");
	var inputCentre = children.getElementsByClassName("task");
	var xLeft = list.getElementsByClassName("deleter");
	var xRight = children.getElementsByClassName("deleter");
	//代理判空
	//bagFlag判空
	if(this.bagFlag===undefined)
	{
		console.log("bag=undefined");
		for(var x=0;x<inputCentre.length;x++)
			inputCentre[x].disabled="disabled";
	}
	else
	{
		for(var x=0;x<inputCentre.length;x++)
			inputCentre[x].disabled="";
	}

	//childFlag判空
	if(this.childFlag===undefined)
	{
		console.log("child=undefined");
		timming.disabled="disabled";
		desc.disabled="disabled";
	}
	else
	{
		timming.disabled="";
		desc.disabled="";
	}


	//事件代理部分
	//bag事件代理
	for(var i=0;i<inputLeft.length;i++)
	{
		//代理bagflag获取+children显示
		inputLeft[i].onclick = (function()
		{
			var e = i;
			return function()
			{
				/*con.childFlag=undefined;
				con.getBagFlag(e);
				v.clearCentreRight(e);
				v.showCentre(e);
				//并且重新加载一次代理
				con.dg();
				v.hideBagX(e);
				v.hideChildX(con.bagFlag,e);
				v.viewBagX(e);
				v.spaL();
				v.viewC();*/
				//v.bagCartoon(e);
			};
		})(i);

	}

	//child事件代理
	for(var j=0;j<inputCentre.length;j++)
	{
		//代理childflag获取+timming/desc显示
		inputCentre[j].onclick = (function()
		{
			var e = j;
			return function()
			{
				/*con.getChildFlag(e);
				v.clearContent();
				v.printChildContent(con.bagFlag,e);
				con.dg();
				//v.hideBagX(e);
				v.hideChildX(con.bagFlag,e)
				v.viewChildX(con.bagFlag,e)
				v.viewR();*/
				v.childCartoon(e)
			};
		})(j);

	}

	//bagX事件代理
	for(var k=0;k<xLeft.length;k++)
	{
		xLeft[k].onclick = function(){con.minusBag()};
	}

	//childX事件代理
	for(var l=0;l<xRight.length;l++)
	{
		xRight[l].onclick = function(){con.minusChild()};
	}


	for(var m=0;m<inputLeft.length;m++)
	{
		//
	}

}

//bag闭包组
controller.prototype.bagClosure = function(e)
{
	con.childFlag=undefined;//点击bag后childFlag置空
	con.getBagFlag(e);
	v.clearCentreRight(e);
	v.showCentre(e);
	//并且重新加载一次代理
	con.dg();
	v.hideBagX(e);
	v.hideChildX(con.bagFlag,e);
	v.viewBagX(e);
	v.viewC();
}

//child闭包组
controller.prototype.childClosure = function(e)
{
	con.getChildFlag(e);
	v.clearContent();
	v.printChildContent(con.bagFlag,e);
	con.dg();
	//v.hideBagX(e);
	v.hideChildX(con.bagFlag,e)
	v.viewChildX(con.bagFlag,e)
	v.viewR();
}

//判断长度
controller.prototype.judgeLength = function()
{
	task_Len.innerHTML = "所有任务"+"("+list.getElementsByClassName("task-pa").length+")";
}

//增加bag(JSON+VIEW)
controller.prototype.plusBag = function()
{
	if(this.bagFlag===undefined)
		this.bagFlag = mo.len()-1;//直接置最后一位
	//先增加JSON部分
	mo.insertNewBag(this.bagFlag);
	mo.save();
	//清Flag
	this.childFlag=undefined;
	this.bagFlag++;
	//重加载
	v.refreshBag();
}

//删除bag(JSON+VIEW)
controller.prototype.minusBag = function()
{
	if(this.bagFlag===undefined)
		return false;
	//先增加JSON部分
	mo.removeBag(this.bagFlag);
	mo.save();
	//清Flag
	this.childFlag=undefined;
	this.bagFlag=undefined;
	//重加载
	v.refreshBag();
}


//增加Child(JSON+VIEW)
controller.prototype.plusChild = function()
{
	if(this.bagFlag===undefined)
		return false;
	if(this.childFlag===undefined)
		this.childFlag = mo.childLen(this.bagFlag)-1;//直接置最后一位
	//先增加JSON部分
	mo.insertNewChild(this.bagFlag,this.childFlag);
	mo.save();
	//清childFlag
	this.childFlag++;
	//重加载
	v.refreshChild();
}

//删除Child(JSON+VIEW)
controller.prototype.minusChild = function()
{
	if(this.bagFlag===undefined)
		return false;
	if(this.childFlag===undefined)
		return false;
	//先增加JSON部分
	mo.removeChild(this.bagFlag,this.childFlag);
	mo.save();
	//清childFlag
	this.childFlag=undefined;
	//重加载
	v.refreshChild();
}

controller.prototype.regTimming = function(string)
{
	var reg=/^[2][0][0-9][0-9][-/.][0-1][0-9][-/.][0-3][0-9]$/;
	if(reg.test(string)===false)
		string = "YY-MM-DD";
	return string
}

//touch系事件


controller.prototype.touchMoveBag = function()
{
	if(this.touchFlag ===1)
		return false;
	var num = this.bagFlag;
	var slide = doc.getElementsByClassName("slide")[num];
	console.log(slide);
	slide.setAttribute("class","slide w100");
	this.touchFlag = 1;
}

controller.prototype.touchBackBag = function()
{
	var num = this.bagFlag;
	if(this.touchFlag ===undefined)
		return false;
	var slide = list.getElementsByClassName("slide")[num];
	slide.setAttribute("class","slide");
	this.touchFlag = undefined;
}

controller.prototype.touchMoveChild = function()
{
	var num = this.childFlag;
	if(this.touchFlag ===1)
		return false;
	var slide = children.getElementsByClassName("slide")[num];
	slide.setAttribute("class","slide w100");
	this.touchFlag = 1;
}

controller.prototype.touchBackChild = function()
{
	var num = this.childFlag;
	if(this.touchFlag ===undefined)
		return false;
	var slide = children.getElementsByClassName("slide")[num];
	slide.setAttribute("class","slide");
	this.touchFlag = undefined;
}

controller.prototype.editBag = function()
{
	if(this.bagFlag===undefined)
		return false;
	var target = list.getElementsByTagName("input");
	target[this.bagFlag].focus();
}

controller.prototype.editChild = function()
{
	if(this.bagFlag===undefined)
		return false;
	if(this.childFlag===undefined)
		return false;
	var target = children.getElementsByTagName("input");
	target[this.bagFlag].focus();
}







//oo
var con = new controller();


//test
window.onload=function()
{
	mo.read();
	if(localStorage.length<1){
		localJSON[0]=cloneObject(normalBag);
		mo.insertNewBag(0);
		mo.insertNewBag(0);
		mo.insertNewBag(0);
		mo.insertNewChild(0,0);
		mo.insertNewChild(0,0);
		mo.insertNewChild(0,0);
		mo.editBagTopic(0,"THIS IS TODO");
		mo.editBagTopic(2,"SET YOUR TODO");
		mo.editChildTopic(0,0,"THIS IS YOUR TODO");
		mo.editChildTopic(0,2,"BY@MELO");
		mo.editChildTimming(0,0,"2016.2")
		mo.editChildDesc(0,0,"WRITE YOUR DESCRIBE HERE")
	}

	console.log(localJSON);
	v.copyBagDiv();
	v.printBag();
	con.dg();
	con.judgeLength();
}

doc.onkeyup=function()
{
	con.bagToJSON();
	//
	if(con.bagFlag!==undefined)
		con.childToJSON(con.bagFlag);
	//
	if(con.childFlag!==undefined)
		con.contentToJSON(con.bagFlag,con.childFlag);
	v.changeSave();
}



