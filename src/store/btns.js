export default{
  state: {
  	elmMsg: {
  		srbutton:{
  			creatMsg:{
  							htmlHead: "<srbutton :btnConfig='",
  			        htmlFoot: "'></srbutton>",
				      	name:'srbutton',//按钮信息
				      	index: '',
				      	type:'btn',
				      	isScale:true,
				      	props:{
				      		msg:{
				      			styles:{
				      				width:'70px',
				      				height:'40px',
				      				color:'#ccc',
				      				background: 'rgba(255,255,255,0)',
				      				left: '153px',
				      				top: '',
				      				'font-size':'14px',
				      				'font-weight':'100',
				      				'font-style': 'normal',
				      				'border-color':'rgba(0,0,0,1)',
				      				'z-index': '0',
				      			},
				      			content:{
						      				name: '按钮',
						      			},
				      		},
				      	},
				      	input:[
					      		{
					      			name:'inputsize'
					      		},
					      		{
					      			name:'inputfont',
					      		},
					      		{
					      			name:'inputcolor',
					      		},
				      		]
				     },
				     
  		},
  	}
  },
  mutations: {
  }
}