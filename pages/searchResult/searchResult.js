var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
Page({
	data: {
		selected:true,
        selected1:false,
        type:'event',
		event: [1,2,3],
		user:[],
		hasMore: true,
		showLoading: true,
		start: 0,
		url: '',
		keyword: ''
	
	},
	onLoad: function() {
		var that = this
		 var event =  wx.getStorageSync('search_event');
    var user =  wx.getStorageSync('search_user');
		that.setData({
			event:event,
			user: user
		})

		
	},
	onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    var that = this;
   



  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
	onPullDownRefresh: function() {
		var that = this
		that.onLoad();
	},
	user_info: function(e) {
		var data = e.currentTarget.dataset
		var uid = data.uid
		wx.redirectTo({
			url: '../my/my?suid='+uid
		})
	},
	research: function(e) {
    var that = this
    var keyword = e.detail.value.keyword
    if (keyword == '') {
      message.show.call(that,{
        content: '请输入内容',
        icon: 'null',
        duration: 1500
      })
      return false
    } else {

      var searchData = wx.getStorageSync('searchData') || []
      searchData.push(keyword)
      
      wx.setStorageSync('searchData', searchData)

      youyan.Event.call(this,config.apiList.Event,keyword);
     youyan.User.call(this,config.apiList.User,keyword);
     
   
      wx.redirectTo({
        url: "../searchResult/searchResult"
      })
    }
  },
	event_info: function(e) {
		var data = e.currentTarget.dataset
		var event_id = data.event_id
		wx.redirectTo({
			url: '../eventInfo/eventInfo?event_id='+event_id
		})
	},
	selected:function(e){
		var data = e.currentTarget.dataset;
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