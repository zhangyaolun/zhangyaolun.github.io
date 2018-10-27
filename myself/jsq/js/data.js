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
/*pension:'8.0%',//养老
medical:'2.0%',//医疗
workinjury:'0.0%',//工伤
unemployment:'0.5%',//失业
birth:'0.0%',//生育
fund:'7.0%',//公积金*/



/*app.title = '嵌套环形图';

option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: [0, '30%'],
            label: {
                normal: {
                    color:['#333'],
                    formatter: '{b}\n{c}',
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            color:['#fff'],
            data:[
                {value:335, name:'单位总支出'}
            ]
        },
        {
            name:'访问来源',
            type:'pie',
            radius: ['35%', '50%'],
            label: {
                normal: {
                    formatter: '{b|{b} }{c} ',
                    color:['#333'],
                    rich: {
                        b: {
                            color:[''],
                            fontSize: 16,
                            lineHeight: 33
                        }
                    }
                }
            },
            data:[
                {value:335, name:'直达'},
                {value:10, name:'111'},
                {value:310, name:'邮件营销'},
                {value:10, name:'222'},
                {value:234, name:'联盟广告'},
                 {value:10, name:'333'},
            ],
            color:['#9bc3f6','rgba(0,0,0,0)','#9dbadc','rgba(0,0,0,0)','#333','rgba(0,0,0,0)']
        }
    ]
};*/