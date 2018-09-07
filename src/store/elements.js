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
				      				color:'red',
				      				background: 'green',
				      				left: '153px',
				      				top: '',
				      			},
				      			content:{
						      				mainText: '按钮',
						      			},
				      		},
				      	},
				      	input:[
					      		{
					      			name:'inputbackground',
					      		},
					      		{
					      			name:'inputcolor',
					      		},
					      		{
					      			name:'inputtext',
					      		} 
				      		]
				     },
				     
  		},
  	}
  },
  mutations: {
  }
}