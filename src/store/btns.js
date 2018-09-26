export default{
  state: {
  	elmMsg: {
  		srbutton:{
  			htmlHead: "<srbutton :btnConfig='",
  			htmlFoot: "'></srbutton>",
  			creatMsg:{
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
				      				background: '#409EFF',
				      				left: '153px',
				      				top: '',
				      				'font-size':'14px',
				      				'font-weight':'100',
				      				'font-style': 'normal',
				      				'border-color':'#000'
				      			},
				      			content:{
						      				name: '按钮',
						      			},
				      		},
				      	},
				      	input:[
				      			{
					      			name:'inputname',
					      		},
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