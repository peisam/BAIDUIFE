//util.js
function isArray(arr){
	return (arr instanceof Array);
}

function isFunction(fn){
	return (typeof fn === "function");
}

//深拷贝
function cloneObject(src){
	var newsrc;
	if(isArray(src)||typeof(src)=="object"){
		if(isArray(src))
			newsrc = [];//拷贝数组就存储为数组
		else
			newsrc = {};//拷贝对象就存储为对象

		for(var i in src){
			newsrc[i]=cloneObject(src[i]);//逐个存放在新的数组变量/对象数据
		}

	}
	else{
		newsrc = src;//数值字符串布尔等类型就直接赋值
	}
	return newsrc;//其他情况直接浅拷贝
}

//数组去重
function uniqArray(arr){
	var newarr=[];
	newarr[0] = arr[0];
	var l=1;
	for(var i in arr){
		for(var j in newarr){
			if(arr[i] != newarr[j] && j < l-1)
				continue;//跳出当次循环
			if(arr[i] == newarr[j])
				break;//跳出整个循环
			else if(arr[i]!=newarr[j]&& j>= l-1)
				l++;
			newarr[l-1]=arr[i];
		}
	}
	return newarr;
}

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str){
	var newstr="";
	var shortstr="";
	var isStart = 0;
    for(var i in str){
    	if(str[i]==" "&& isStart==0)
    		continue;
    	else if(str[i]==" " && isStart==1){
    		shortstr+= str[i];
    	}
    	else
    	{
    		newstr+= shortstr;
    		shortstr = "";
    		newstr+= str[i];
    		isStart=1;
    	}
    }
    return newstr;
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
	var newstr="";
	var shortstr="";
    for(var i in str){
    	if(str[i]==" ")
    		continue;
    	else
    	{
    		newstr+= str[i];
    	}
    }
    return newstr;
}
//实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++){
        fn(arr[i], i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj){
	var i = 0;
	for(var attr in obj){
		i++;
	}
	return i;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /^[0-9a-z_-]+@[a-z0-9]+\.[a-z]{2,4}$/;
    return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg=/^[1][0-9]{10}$/g;
    return reg.test(phone);
}

//为element增加一个样式名为newClassName的新样式
function addClass(element,newClassName){
	var oldclass = element.getAttribute("class");
	finalClassName = oldclass +" "+newClassName;
	element.setAttribute("class",finalClassName);
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (element.className == "") {
        return false;
    }else {
        var allOldName = element.className;
        var newClassName = allOldName.replace(eval('/' + oldClassName + '/'), "").replace(/^\s+|\s+$/,"");
        element.className = newClassName;
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if(element.parentNode==siblingNode.parentNode)
    	return true;
    else
    	return false;
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element){
    if(!element)
        return false;
    else{
        var pos={};
        pos.offsetLeft = element.offsetLeft;
        pos.offsetTop = element.offsetTop;
        return pos;
    }
}

// 实现一个简单的Query
function $(selector) {
    if(selector.search(/\s+/g) == -1){
        var firstChart=selector.charAt(0);
        switch(firstChart)
        {
            case "#":
                var newstr=selector.replace(firstChart,"");
                return document.getElementById(newstr);
                break;
            case ".":
                var newstr=selector.replace(firstChart,"");
                return document.getElementsByClassName(newstr);
                break;
            //case "["
            //todo
            //todo
            default:
                return document.getElementsByTagName(selector);
        }
    }
    //else
    //todo
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener){
        element.addEventListener(event,listener,false);//所以jQuery是冒泡的不是捕获的
    }
    else if(element.attachEvent){
        element.attachEvent("on"+event,listener);
    }
    else{
        element["on"+event] = listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(listener){
        if(element.removeEventListener){
            element.removeEventListener(event,listener,false);
        }
        else if(element.detachEvent){
            element.detachEvent("on"+event,listener);
        }
        else{
            element["on"+event] = null;
        }
    }
    else{
        return;
    }
}

// 实现对click事件的绑定
function addClickEvent(element,listener){
    if(element.addEventListener){
        element.addEventListener("click",listener,false);
    }
    else if(element.attachEvent){
        element.attachEvent("onclick",listener);
    }
    else{
        element.onclick = listener;
    }
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    if(element.addEventListener){
        element.addEventListener("keydown",function(ev){
            var oEvent = ev||event;
            if(oEvent.ketCode == 13){
                listener();
            }
        },false);
    }
    else if(element.attachEvent){
        element.attachEvent("onkeyup",function(ev){
            var oEvent = ev||event;
            if(oEvent.keyCode == 13){
                listener();
            }
        });
    }
    else{
        element.onkeyup = function(ev){
            var oEvent = ev || event;
            if(oEvent.ketCode == 13){
                listener();
            }
        };
    }
}

$.enter = function addEnterEvent(element, listener) {

    if (element.addEventListener) {
        element.addEventListener("keydown", function (ev) {
            var oEvent = ev || event;
            if (oEvent.keyCode == 13) {
                listener();
            }
        }, false);
    }else if (element.attachEvent) {
        element.attachEvent("onkeyup", function (ev) {
            var oEvent = ev || event;
            if (oEvent.keyCode == 13) {
                listener();
            }
        });
    }else {
        element.onkeyup = function (ev) {
            var oEvent = ev || event;
            if (oEvent.keyCode == 13) {
                listener();
            }
        };
    }
}

$.on = function(element,event,listener){
    addEvent(element,event,listener);
}
$.un = function(element,event,listener){
    removeEvent(element,event,listener);
};
$.click = function(element,listener){
    addClickEvent(element,listener);
}
$.enter = function(element,listener){
    addEnterEvent(element,listener);
}

//事件代理
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function(e){
        e = e || window.event;
        var target = e.srcElement ? e.srcElement : e.target;
        //对标签进行代理
        if (tag.indexOf(".") === -1) {
            var targetName = target.nodeName.toLowerCase();
            if (targetName === tag) {
                listener(e);
            }
        }
        //对类进行代理
        else {
            var targetClassName = target.className;
            var className = tag.replace(".", "");
            if (targetClassName.indexOf(className) !== -1) {
                listener(e);
            }
        }
    });
}


//为IE浏览器，返回-1或者版本号
function isIE () {
    if (window.ActiveXObject === undefined) return -1;
    if (!document.querySelector) return 7;
    if (!document.addEventListener) return 8;
    if (!window.atob) return 9;
    if (!document.__proto__) return 10;
    return 11;
}

//chrome的cookie无法设置
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + "=" +  encodeURIComponent(cookieValue) + 
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(cookieName) { 
    var arr, reg = new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURIComponent(arr[2]); 
    else 
        return null; 
} 
//$.delegate = delegateEvent;
/*
6.1 任务描述

学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：

// 
function ajax(url, options) {
    // your implement
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);
options是一个对象，里面可以包括的参数为：

type: post或者get，可以有一个默认值
data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
onsuccess: 成功时的调用函数
onfail: 失败时的调用函数
*/


//xhr
function createAJAX(){
    var xhr = null;

    if(XMLHttpRequest)
        xhr = new XMLHttpRequest();
    else if(ActiveXObject)
        xhr = new ActiveXObject("Microsoft.XMLHTTP")

    return xhr;
}

var ajax = function(url,options){
    //初始化type并设置默认值
    var type = options.type;
    if(options.type = null)
        type = "get";

    //data参数可选
    var data = options.data;

    //url参数，必填
    var url = url;
    if(type == "get"||type=="GET")
        var url = url + "?" + data;
    
    //datatype参数可选
    var dataType = options.dataType;

    //回调函数
    var success = options.success;//options.success本身就是定义了的回调函数
    //dataType参数可选，默认为text
    if(dataType == null)
        dataType = "text";

    // 创建ajax引擎对象
    var xhr = createAJAX();

    // 打开
    xhr.open(type,url,true);

    // 发送
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200){//服务器状态响应完成并且页面可打开
            if(dataType=="text"||dataType=="TEXT"){
                if(success!=null)
                    success(xhr.responseText,xhr);
            }
            else if(dataType=="xml"||dataType=="XML"){
                if(success!=null)
                    success(xhr.responseXML,xhr);
            }
            else if(dataType=="json"||dataType=="JSON"){
                if(success!=null)
                    success(eval("("+xhr.responseText+")"),xhr);//JSON格式转换为js对象
            }
        }
    };
    if (type == "GET" || type == "get") {
        xhr.send();
    } else if (type == "POST" || type == "post") {
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
}
//
function insertAfter(newEl, targetEl) 
{ 
    var parentEl = targetEl.parentNode; 
    if(parentEl.lastChild == targetEl) 
    { 
        parentEl.appendChild(newEl); 
    }
    else 
    { 
        parentEl.insertBefore(newEl,targetEl.nextSibling); 
    } 
} 


