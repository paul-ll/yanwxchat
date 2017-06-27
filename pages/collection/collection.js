var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
Page({
	data: {
		collection: [],
		type:'event',
		p:1,
		pcount:15,
		hasMore: true,
		showLoading: true,
		start: 0,
		selected:true,
        selected1:false,
        uid:''
	},
	onLoad: function(options) {
		var that = this;
		var uid = options.uid;
		that.setData({
			uid:uid
		})
		
	},
	onShow: function(){
		var that = this;
		youyan.getCollection.call(that, config.apiList.getCollection,that.data.uid,that.data.type,that.data.p, that.data.pcount)
	},
	onPullDownRefresh: function() {
		var that = this
		that.onShow()
		
	},
	onReachBottom: function() {
		var that = this
		// if (!that.data.showLoading) {
		// 	youyan.fetchFilms.call(that, config.apiList.coming, config.city, that.data.start, config.count)
		// }
	},
	enterEvent:function(e){
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../eventInfo/eventInfo?event_id=" + data.event_id
		})
	},
	viewFilmByTag: function(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.navigateTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
		})
	},
	selected:function(e){
		var data = e.currentTarget.dataset;
    	console.log(data.id)
    	console.log(e.target.dataset.current)
		if( e.target.dataset.current === true ) {  
      return false;  

    } else {  
      	this.setData({
            selected1:false,
            selected:true,
            type:data.id
        })
        this.onLoad(data)
    }  


       
    },
    selected1:function(e){
    	var data = e.currentTarget.dataset;
    	console.log(data.id)
    	console.log(e.target.dataset.current)
		if( e.target.dataset.current === true ) {  
      	return false;  

    } else {  
      	this.setData({
            selected:false,
            selected1:true,
            type:data.id
        })
      	this.onLoad(data)
    }  

        
    }
})