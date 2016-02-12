//controller.js
var controller = function Controller()
{
	this.bagFlag = undefined;
	this.childFlag = undefined;
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
	mo.editChildTimming(node,childnode,timming.value)
	mo.editChildDesc(node,childnode,desc.value)
}

//所有的add delete等涉及数组重排操作的均触发保存后重新渲染
//事件
//事件代理
controller.prototype.dg = function()
{
	var inputLeft = list.getElementsByClassName("task");
	var inputCentre = children.getElementsByClassName("task");
	for(var i=0;i<inputLeft.length;i++)
	{
		//代理bagflag获取+children显示
		inputLeft[i].onclick = (function()
		{
			var e = i;
			return function()
			{
				con.getBagFlag(e);
				v.clearCentreRight(e);
				v.showCentre(e);
			};
		})(i);



		//代理Bagx显示
		inputLeft[i].onmouseover = (function()
		{
			var e = i;
			return function(){v.viewBagX(e)};
		})(i);










	}
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
		mo.editBagTopic(0,"ADIA");
		mo.editBagTopic(2,"AMY");
		mo.editChildTopic(0,0,"AVRIL");
		mo.editChildTimming(0,0,"2016.2")
		mo.editChildDesc(0,0,"SONGS")
	}

	console.log(localJSON);
	v.copyBagDiv();
	v.printBag();
	v.copyChildDiv(0);
	v.printChild(0);
	con.dg();
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
}



