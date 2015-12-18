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






