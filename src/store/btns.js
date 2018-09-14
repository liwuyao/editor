export default{
  state: {
  	elmMsg: {
  		vbutton:{
  			htmlHead: "<vbutton :styles='",
  			htmlFoot: "'></vbutton>",
  			creatMsg:{
				      	name:'vbutton',//按钮信息
				      	index: '',
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
				      				'font-weight':'bolder',
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