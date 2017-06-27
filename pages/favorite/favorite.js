var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var util = require('../../util/util')

Page({
  data:{
    film_favorite: [],
    person_favorite: [],
    show: 'film_favorite',
    // nullTip: filmNullTip,
    p:1,
    up:1,
     isFromSearch: true, 
      searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false , //“没有数据”的变量，默认false，隐藏
    usearchLoadingComplete: false , //“没有数据”的变量，默认false，隐藏
    pcount:15,
    upcount:15,
    uid:''
  },
  onLoad:function(options){
    var that = this
    var uid = options.uid;
    that.setData({
      uid: uid,
      
    })
   
  },
  onShow:function(){
    var that = this;
 youyan.getUnusedTicketList.call(that,config.apiList.getUnusedTicketList,that.data.uid,that.data.p,that.data.pcount);
    youyan.getUsedTicketList.call(that,config.apiList.getUsedTicketList,that.data.uid,that.data.up,that.data.upcount);
     wx.getSystemInfo( {
      success: ( res ) => {
        that.setData( {
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    wx.stopPullDownRefresh()
  },
  viewgetTicketDetail: function(e) {
		var data = e.currentTarget.dataset
    console.log(data.ticket_id)
		wx.navigateTo({
			url: "../getTicketDetail/getTicketDetail?ticket_id=" + data.ticket_id
		})
  },
  changeViewType: function(e) {
  var data = e.currentTarget.dataset
  

    this.setData({
      show: data.type,
      // nullTip: data.type == 'film_favorite' ? filmNullTip : personNullTip
    })
  },
   pullDownRefresh: function( e ) {
    this.onShow()
  },
pullUpLoad: function(e) {
    var that = this
    console.log(that.data.p)
     console.log(that.data.up)
     if(!that.data.usearchLoadingComplete){  
        that.setData({  
          up: that.data.up+1,  //每次触发上拉事件，把searchPageNum+1  
          isFromSearch: false,  //触发到上拉事件，把isFromSearch设为为false  
          searchLoading: true   //把"上拉加载"的变量设为false，显示 
        });  

       that.onShow();
      }  

    if(!that.data.searchLoadingComplete){  
        that.setData({  
          p: that.data.p+1,  //每次触发上拉事件，把searchPageNum+1  
          isFromSearch: false,  //触发到上拉事件，把isFromSearch设为为false  
          searchLoading: true   //把"上拉加载"的变量设为false，显示 
        });  

       that.onShow();
      }   
  }
})