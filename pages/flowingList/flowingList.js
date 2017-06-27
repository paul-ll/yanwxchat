var youyan = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
    data: {
		 suid:'',
		 p:1,
		 pcount:15,
		 cate:2,
		following: [],
		hasMore: true,
		showLoading: true,
		start: 0,
		 isFromSearch: true, 
	    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false , //“没有数据”的变量，默认false，隐藏
    },
    onLoad: function(option) {
		var suid = option.suid

		var that = this
		that.setData({
			suid:suid
		})
	
	},
	onShow:function(){
		var that = this
		youyan.getFollowingList.call(that, config.apiList.getFollowingList, that.data.suid, that.data.p,that.data.pcount)
		
	},
	user_info: function(e) {
		var data = e.currentTarget.dataset
		var uid = data.uid
		wx.redirectTo({
			url: '../my/my?suid='+uid
		})
	},
	onPullDownRefresh: function() {
		var that = this
		that.onShow()
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
	 tabChange: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    });
  }
})