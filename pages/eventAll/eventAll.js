var youyan = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
    data: {
        personDetail: {},
        eventList:[],
        cid:'',
        area_id:'',
        showLoading: true,
		showContent: false,
		p:1,
		pcount:15,
		tablist:[],
		 isFromSearch: true, 
	    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false , //“没有数据”的变量，默认false，隐藏
    },
    onLoad: function(options) {
        var that = this
        var cid = parseInt(options.cid);
        var area_id = options.area_id;
        var tablist =JSON.parse(options.list);
        console.log(cid)
        that.setData({
        	tablist:tablist,
        	cid:cid,
        	area_id:area_id
        })
		
    },
    onShow:function(){
    	var that = this
    	youyan.getCategoryDetailList.call(that, config.apiList.getCategoryDetailList, that.data.cid,that.data.area_id,that.data.p,that.data.pcount)
    	wx.getSystemInfo( {
	      success: ( res ) => {
	        that.setData( {
	          windowHeight: res.windowHeight,
	          windowWidth: res.windowWidth
	        })
	      }
	    })
    },
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.redirectTo({
		  url: '../filmDetail/filmDetail?id=' + data.id
		})
	},
	pullDownRefresh: function( e ) {
	    this.onShow()
	  },
	pullUpLoad: function(e) {
		var that = this
		if(!that.data.searchLoadingComplete){  
	      that.setData({  
	        p: that.data.p+1,  //每次触发上拉事件，把searchPageNum+1  
	        isFromSearch: false,  //触发到上拉事件，把isFromSearch设为为false  
	        searchLoading: true   //把"上拉加载"的变量设为false，显示 
	      });  

	     that.onShow();
	    }   
	},
	enterEvent: function(e){

		var data = e.currentTarget.dataset;
		wx.redirectTo({
		  url: '../eventInfo/eventInfo?event_id=' + data.event_id
		})
	},
	chickli: function(e){
		var that =this;
		var data = e.currentTarget.dataset;
		var cid= data.cid
		that.setData({
			eventList:[],
        	cid:cid,
        	p:1
        })
		youyan.getCategoryDetailList.call(that, config.apiList.getCategoryDetailList,cid,that.data.area_id,that.data.p,that.data.pcount)
	},
	favoritePerson: function() {
		var that = this
		// 判断原来是否收藏，是则删除，否则添加
		wx.getStorage({
			key: 'person_favorite',
			success: function(res){
				var person_favorite = res.data
				if (that.data.isPersonFavorite) {
					// 删除
					for (var i = 0; i < person_favorite.length; i++) {
						if (person_favorite[i].id == that.data.personDetail.id) {
							person_favorite.splice(i,1)
							that.setData({
								isPersonFavorite: false
							})
						}
					}
					wx.setStorage({
						key: 'person_favorite',
						data: person_favorite,
						success: function(res){
							console.log(res)
							console.log('----设置成功----')
						}
					})
				} else {
					// 添加
					person_favorite.push(that.data.personDetail)
					wx.setStorage({
						key: 'person_favorite',
						data: person_favorite,
						success: function(res){
							that.setData({
								isPersonFavorite: true
							})
						}
					})
				}
			}
		})
	}
})