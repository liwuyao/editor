export default{
  state: {
  	elmMsg: {
  		srtext:{
  			creatMsg:{
  							htmlHead: "<srtext :textConfig='",
  			        htmlFoot: "'></srtext>",
				      	name:'srtext',//按钮信息
				      	index: '',
				      	type:'text',
				      	isScale:true,
				      	props:{
				      		msg:{
				      			styles:{
				      				width:'100px',
				      				height:'50px',
				      				color:'#000000',
				      				background: 'rgba(255,255,255,0)',
				      				left: '153px',
				      				top: '',
				      				'font-size':'14px',
				      				'font-weight':'100',
				      				'font-style': 'normal',
				      				'border-color':'rgba(255,255,255,0)',
				      				'text-align':'left',
				      				'font-family':'微软雅黑',
				      				'line-height':'14px',
				      			},
				      			content:{
						      				mainText: '我是文本',
						      			},
				      		},
				      	},
				      	input:[
					      		{
					      			name:'inputfont',
					      		},
					      		{
					      			name:'inputcolor',
					      		},
					      		{
					      			name:'inputsize'
					      		},
					      		{
					      			name:'inputtext',
					      		},
				      		]
				     },
				     
  		},
  	}
  },
  mutations: {
  }
}