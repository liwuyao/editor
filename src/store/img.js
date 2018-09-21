export default{
  state: {
  	elmMsg: {
  		'srimage':{
  			htmlHead: "<srimage :imgConfig='",
  			htmlFoot: "'></srimage>",
  			creatMsg:{
				      	name:'srimage',//按钮信息
				      	index: '',
				      	type:'img',
				      	isScale:true,
				      	props:{
				      		msg:{
				      			styles:{
				      				width:'70px',
				      				height:'40px',
				      				left: '153px',
				      				top: '',
				      			},
				      			src:'http://pic.pptbz.com/201506/2015070581208537.JPG'
				      		},
				      	},
				      	input:[
					      		{
					      			name:'inputsize'
					      		},
					      		{
					      			name:'inputimg'
					      		},
					      	]
				     },
				     
  		},
  		'srswiper':{
  			htmlHead: "<srswiper :imgConfig='",
  			htmlFoot: "'></srswiper>",
  			creatMsg:{
				      	name:'srswiper',//按钮信息
				      	index: '',
				      	type:'img',
				      	isScale:false,
				      	props:{
				      		msg:{
				      			styles:{
				      				width:'375px',
				      				height:'200px',
				      				left: '0',
				      				top: '',
				      			},
				      			imgUrls:[
						          {
						            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
						          },
						          {
						            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
						          },
						          {
						            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
						          },
						          {
						            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
						          }
						        ]
				      		},
				      	},
				      	input:[
				      			{
					      			name:'inputswiper'
					      		},
					      	]
				     },
				     
  		},
  	}
  },
  mutations: {
  }
}