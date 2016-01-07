//test.js
//链式作用域
var name = 'laruence';
function echo(){
	console.log(name);
	var name = 'eve'
	console.log(name);
	console.log(age);
}
echo();
//undefined
//eve
//Error
var authorName="AAA";
function doSomething(){
	var blogName = "BBB";
	function innerSay(){
		console.log(blogName);
	}
	innerSay();
}
console.log(authorName);//AAA
console.log(blogName);//Error
doSomething();//BBB
innerSay();//Error
//原型继承
var Calculator = function(d,t){
	this.d = d;
	this.t = t;
}
Calculator.prototype = {
	add : function(x,y){
		return x+y;
	},
	subtract:function(x,y){
		return x-y;
	}
}
var c = new Calculator(0,1);
//方式2
//Calculator.prototype = function(){}();
var Calculator = function(d,t){
	this.d = d;
	this.t = t;
}
Calculator.prototype = function(){
	add = function(x,y){
		return x+y;
	}
	subtract = function(x,y){
		return x-y;
	}
	return{
		add:add,
		subtract:subtract
	}
}();
var c = new Calculator(1,2);
c.add(11,3);//???
//分布声明
var BaseCalculator=function(){
	this.d = 2;
};
BaseCalculator.prototype.add=function(x,y){
	return x+y;
};
BaseCalculator.prototype.multiple=function(x,y){
	return x*y;
};
var Calculator = function () {
    this.tax = 5;
};
Calculator.prototype = new BaseCalculator();
/*上面的代码，运行以后，我们
可以看到因为Calculator的原型是指向BaseCalculator的实例上的，
所以可以访问他的decimalDigits属性值，
那如果我不想让Calculator访问BaseCalculator的构造函数里声明的属性值，
那怎么办呢？
这么办：*/
var Calculator = function () {
    this.tax= 5;
};
Calculator.prototype = BaseCalculator.prototype;
//重写
Calculator.prototype.add = function(x,y){
	return x+y+this.tax;
}
call=null;
var call = new Calculator();
console.log(call.add(1,1))
//
//原型链
function Foo() {
    this.value = 42;
}
Foo.prototype = {
    method: function() {}
};
function Bar() {}
// 设置Bar的prototype属性为Foo的实例对象
Bar.prototype = new Foo();
Bar.prototype.foo = 'Hello World';
// 修正Bar.prototype.constructor为Bar本身
Bar.prototype.constructor = Bar;
var test = new Bar() // 创建Bar的一个新实例
//
//
//JavaScript会向上遍历原型链
function foo() {
    this.add = function (x, y) {
        return x + y;
    }
}
foo.prototype.add = function (x, y) {
    return x + y + 10;
}
Object.prototype.subtract = function (x, y) {
    return x - y;
}
var f = new foo();
alert(f.add(1, 2)); //结果是3，而不是13
alert(f.subtract(1, 2)); //结果是-1
/*通过代码运行，我们发现subtract是安装我们所说的向上查找来得到结果的，
但是add方式有点小不同，这也是我想强调的，
就是属性在查找的时候是先查找自身的属性，如果没有再查找原型，
再没有，再往上走，一直插到Object的原型上，所以在某种层面上说，
用 for in语句遍历属性的时候，效率也是个问题
*/
//
//hasOwnProperty
//他能判断一个对象是否包含自定义属性而不是原型链上的属性，
//因为hasOwnProperty是JavaScript中唯一一个处理属性但是不查找原型链的函数。
// 修改Object.prototype
Object.prototype.bar = 1; 
var foo = {goo: undefined};
foo.bar; // 1
'bar' in foo; // true
foo.hasOwnProperty('bar'); // false
foo.hasOwnProperty('goo'); // true
//
//for in loop方法
// 修改 Object.prototype
Object.prototype.bar = 1;
var foo = {moo: 2};
for(var i in foo) {
    console.log(i); // 输出两个属性：bar 和 moo
}
// foo 变量是上例中的
for(var i in foo) {
    if (foo.hasOwnProperty(i)) {
        console.log(i);
    }
}
//
//闭包
//
function show(x) {
            console.log(typeof(x));    // undefined
            console.log(typeof(10));   // number
            console.log(typeof('abc')); // string
            console.log(typeof(true));  // boolean
            console.log(typeof(function () { }));  //function
            console.log(typeof([1, 'a', true]));  //object
            console.log(typeof ({ a: 10, b: 20 }));  //object
            console.log(typeof (null));  //object
            console.log(typeof (new Number(10)));  //object
        }
show();
//
function f1(){
	var n=999;
	function f2(){
		console.log(n); // 999
	}
}
function f1(){
	function f2(){
		var n=999;
	}
	console.log(n); // 999
}
//这就是Javascript语言特有的"链式作用域"结构（chain scope）
//子对象会一级一级地向上寻找所有父对象的变量//接下来马上说闭包
function f1(){
	var n=99;
	function f2(){
		console.log(n);
	}
	return f2;
}
var result=f1();
result();
//闭包中的变量常驻内存
　　function f1(){
　　　　var n=999;
　　　　nAdd=function(){n+=1}
　　　　function f2(){
　　　　　　alert(n);
　　　　}
　　　　return f2;
　　}
　　var result=f1();
　　result(); // 999
　　nAdd();
　　result(); // 1000
//例如
function f1(){
	var n=99;
	function f2(){
		console.log(n++);
	}
	return f2;
}
var result=f1();
result();
result();
result();
//99
//100
//101
//思考题
　　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());
	//要俩括号,因为先返回的是var 匿名=function(){return this.name}
	//要执行想要的需要执行 匿名();所以是getNamefuc()();
//The Window
//
//
　　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());
//闭包问题
//闭包使用场景
//错误方法
  window.onload = function(){
     for(var i=1; i < 4; i++){
        var id = document.getElementById("a" + i);
           id.onclick = function(){
    	        alert(i);//现在都是返回4
           }
     }
  }
 //因为使用了匿名函数id.onclick = function()
 //匿名函数作用域为window相当于全局变量
//
//闭包方法(很官方)
//闭包方法
    var lists = document.getElementsByTagName("li");
    for(var i=0,l=lists.length; i < l; i++){
      lists[i].onclick = function(){
        var t = i;
        return function(){
          alert(t)
        }
      }()
    }
//
//事件代理法(很官方)
//事件代理法
var ul = document.getElementsByTagName("ul")[0];
ul.onclick = function(){
  var e = arguments[0] || window.event,
  target = e.srcElement ? e.srcElement : e.target;
  if(target.nodeName.toLowerCase() == "li"){
    alert(target.id.slice(-1))
  }
}
//
//将暂时变量保留于元素节点上。()
var lists = document.getElementsByTagName("li");
for(var i=0,t=0,el; el = list[i++];){
  el.i = t++
  el.onclick = function(){
    alert(this.i)
  }
}