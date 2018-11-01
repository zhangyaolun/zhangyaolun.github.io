var o = [
	{
		name:'上海',//城市名字
		personalPayment:[
			{name:'养老',value:0,tax:'8.0%'},
			{name:'医疗',value:0,tax:'2.0%'},
			{name:'工伤',value:0,tax:'0.0%'},
			{name:'失业',value:0,tax:'0.5%'},
			{name:'生育',value:0,tax:'0.0%'},
			{name:'公积金',value:0,tax:'7.0%'}
		],
		enterprisePayment:[//企业缴纳
			{name:'养老',value:0,tax:'20%'},
			{name:'医疗',value:0,tax:'9.5%'},
			{name:'工伤',value:0,tax:'0.2%'},
			{name:'失业',value:0,tax:'0.5%'},
			{name:'生育',value:0,tax:'1.0%'},
			{name:'公积金',value:0,tax:'7.0%'}
		],
	}
]

function _ss(val){
	if(parseFloat(val)>20000){
		return '12000.00';
	}else if(parseFloat(val)>15000){
		return '10000.00';
	}else if(parseFloat(val)>10000){
		return '8000.00';
	}else if(parseFloat(val)>5000){
		return '5000.00';
	}else if(parseFloat(val)<=5000){
		return parseFloat(val).toFixed(2);
	}
}
function _sss(val){
	return parseFloat(val)>=21396?'21396.00':parseFloat(val)<4279.00?'4279.00':parseFloat(val).toFixed(2);
}