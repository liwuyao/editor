export default{
  state: {
  	elmMsg: {
  		srtextarea:{
  			htmlHead: "<srtextarea :textConfig='",
  			htmlFoot: "'></srtextarea>",
  			creatMsg:{
				      	name:'srtextarea',//按钮信息
				      	index: '',
				      	type:'text',
				      	isScale:true,
				      	props:{
				      		msg:{
				      			styles:{
				      				width:'100px',
				      				height:'50px',
				      				color:'#ccc',
				      				background: '#FCFCFC',
				      				left: '153px',
				      				top: '',
				      				'font-size':'14px',
				      				'font-weight':'bolder',
				      				'font-style': 'normal',
				      				'border-color':'rgba(255, 255, 255, 0)',
				      				'text-align':'left',
				      				'font-family':'微软雅黑'
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