export default{
  state: {
  	elmMsg: {
  		srfrom:{
  			htmlHead: "<srbutton :btnConfig='",
  			htmlFoot: "'></srbutton>",
  			creatMsg:{
  							htmlHead: "<srbutton :btnConfig='",
  			        htmlFoot: "'></srbutton>",
				      	name:'srfrom',//按钮信息
				      	index: '',
				      	type:'from',
				      	isScale:false,
				      	props:{
				      		msg:{
				      			styles:{
				      				width:'200px',
				      				height:'200px',
				      				color:'#ccc',
				      				background: '#409EFF',
				      				left: '153px',
				      				top: '',
				      			},
				      			inputs:[
				      				{
					      			name:'demo',
					      			},
				      			]
				      		},
				      	},
				      	input:[
					      		{
					      			name:'inputsize'
					      		},
				      		]
				     },
				     
  		},
  	}
  },
  mutations: {
  	addInput(state,data){
//		for(var item of data){
//			  		state.elmMsg.srfrom.creatMsg.props.msg.inputs.push(item);
//		}
  	}
  }
}