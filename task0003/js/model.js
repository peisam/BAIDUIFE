//TODO.js
var localJSON = {};
var normalChild ={topic:"" , timming:"" , desc:""};
var normalBag ={topic:"" , children:{ 0: cloneObject(normalChild) }}
var model = function Model(){};
//mvc
//
//m
//
//JSON
//
//JSON长度
model.prototype.len = function()
{
	if(!localJSON)
		return false;
	for(var i in localJSON){};
	return parseInt(i)+1;
}

//Children长度
model.prototype.childLen = function(node)
{
	if(!localJSON[node])
		return false;
	for(var i in localJSON[node]["children"]){};
	return parseInt(i)+1;
}

//JSON插入-新-任务包
model.prototype.insertNewBag = function(node)
{
	var len = this.len();
	var temp = {};
	if(node >= len)
		return false
	else if(node === len-1)
	{
		//直接append
		temp = cloneObject(localJSON);
		temp[node+1] = cloneObject(normalBag);
	}
	else
	{
		for(var i=0;i <= node;i++)
		{
			temp[i] = cloneObject(localJSON[i]);
		}
		//插入点
		temp[node+1] = cloneObject(normalBag);
		//后移动一位
		for(var j= node+2;j < len+1;j++){
			temp[j] = cloneObject(localJSON[j-1]);
		}
	}
	//返回给localJSON
	localJSON = temp;
}


//JSON插入-新-孩子
model.prototype.insertNewChild = function(node,childNode)
{
	var len = this.childLen(node);
	var temp = {};
	if(childNode >= len)
		return false;
	else if(childNode === len-1)
	{
		//直接append
		temp = cloneObject(localJSON[node]["children"]);
		temp[childNode+1] = cloneObject(normalChild);
	}
	else
	{
		for(var i=0;i <= childNode;i++)
		{
			temp[i] = cloneObject(localJSON[node]["children"][i]);
		}
		//插入点
		temp[childNode+1] = cloneObject(normalChild);
		//后移动一位
		for(var j= childNode+2;j < len+1;j++){
			temp[j] = cloneObject(localJSON[node]["children"][j-1]);
		}
	}
	//返回给localJSON
	localJSON[node]["children"] = temp;
}

//JSON更改-任务包-标题
model.prototype.editBagTopic = function(num,tpc)
{
	if(!localJSON[num])
		return false;
	localJSON[num]["topic"] = tpc;
}

//JSON更改-孩子-标题
model.prototype.editChildTopic = function(bagnum,childnum,tpc)
{
	if(!localJSON[bagnum])
		return false;
	localJSON[bagnum]["children"][childnum]["topic"] = tpc;
}

//JSON更改-孩子-时间
model.prototype.editChildTimming = function(bagnum,childnum,tm)
{
	if(!localJSON[bagnum])
		return false;
	localJSON[bagnum]["children"][childnum]["timming"] = tm;
}

//JSON更改-孩子-描述
model.prototype.editChildDesc = function(bagnum,childnum,ds)
{
	if(!localJSON[bagnum])
		return false;
	localJSON[bagnum]["children"][childnum]["desc"] = ds;
}

//JSON删除-任务包
model.prototype.removeBag = function(node)
{
	var len = this.len();
	var temp = {};
	//只剩一个node时返回false
	if(len===1)
		return false;
	if(node >= len)
		return false
	else if(node === len-1)
	{
		//直接remove
		for(var i=0;i < len-1;i++)
		{
			temp[i] = cloneObject(localJSON[i])
		}
	}
	else
	{
		for(var i=0;i <= node-1;i++)
		{
			temp[i] = cloneObject(localJSON[i]);
		}
		//剔除点i=node
		//向前移动一位
		for(var j= node;j < len-1 ;j++){
			temp[j] = cloneObject(localJSON[j+1]);
		}
	}
	//返回给localJSON
	localJSON = temp;
}

//JSON删除-孩子
model.prototype.removeChild = function(node,childNode)
{
	var len = this.childLen(node);
	var temp = {};
	//只剩一个node时返回false
	if(len===1)
		return false;
	if(childNode >= len)
		return false;
	else if(childNode === len-1)
	{
		//直接remove
		for(var i=0;i < len-1;i++)
		{
			temp[i] = cloneObject(localJSON[node]["children"][i])
		}
	}
	else
	{
		for(var i=0;i <= childNode-1;i++)
		{
			temp[i] = cloneObject(localJSON[node]["children"][i]);
		}
		//剔除点i=childnode
		//向前移动一位
		for(var j= childNode;j < len-1;j++){
			temp[j] = cloneObject(localJSON[node]["children"][j+1]);
		}
	}
	//返回给localJSON
	localJSON[node]["children"] = temp;
}

//JSON保存至localStorage
model.prototype.save = function()
{
	localStorage.clear();//先清空
	for(var i in localJSON)
	{
		localStorage[i] = JSON.stringify(localJSON[i])
	}
	window.save.innerHTML="SAVED";
	console.log("SAVED");
}

//JSON读取localStorage
model.prototype.read = function()
{
	for(var i in localStorage)
	{
		localJSON[i] = JSON.parse(localStorage[i]);
	}
}

//oo
var mo = new model();
