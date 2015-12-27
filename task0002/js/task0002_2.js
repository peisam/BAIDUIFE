//task0002_2.js
var p =document.getElementById("p");
//输入
var timeInput = document.getElementById("timeInput");

function countdown(){
	var today = new Date();
	var timeStr = timeInput.value;
	//timeStr = "2015-12-28";
	var yearStr = timeStr[0]+timeStr[1]+timeStr[2]+timeStr[3];
	var monthStr = timeStr[5]+timeStr[6];
	var dayStr = timeStr[8]+timeStr[9];
	//输入值距离1970.01.01的毫秒数
	var inputcount = Date.parse(timeStr);
	//console.log(inputcount);

	//今天
	var todaycount = today.getTime();
	//console.log(todaycount);

	//输入-今天=距离
	//count

	var cms = inputcount - todaycount;
	var ms = 1;
	var s = 1000*ms;
	var min = 60*s;
	var hour = 60*min;
	var day = 24*hour;
	//计算输出值
	//距离天数=parseInt(cms/day)
	rday = parseInt(cms/day);
	cms = cms%day;

	//距离小时=parseInt(cms/hour)
	rhour = parseInt(cms/hour);
	cms = cms%hour;

	//距离分钟=parseInt(cms/min)
	rmin = parseInt(cms/min);
	cms = cms%min;

	//距离秒=parseInt(cms/s)
	rs = parseInt(cms/s);
	cms = cms%s;

	//赋值
	if(rday<0||rhour<0||rmin<0||rs<0)
		p.innerHTML = "已经到啦";
	else if(rday==0&&rhour==0&&rmin==0&&rs==0){
		p.innerHTML = "距离"+yearStr+"年"+monthStr+"月"+dayStr+"日"+"(GMT+0000(CST))"+"还有"
				+rday+"天"+rhour+"小时"+rmin+"分钟"+rs+"秒";
		return;
	}
	else{
		p.innerHTML = "距离"+yearStr+"年"+monthStr+"月"+dayStr+"日"+"(GMT+0000(CST))"+"还有"
				+rday+"天"+rhour+"小时"+rmin+"分钟"+rs+"秒";
		//console.log(p.innerHTML);
		today = null;
		t=setTimeout('countdown()',1000);
	}
}

