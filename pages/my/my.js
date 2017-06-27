var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var util = require('../../util/util')
var app = getApp();
Page({
  data:{
    gridList: [
      {enName:'coming', zhName:'我的票夹'},
      {enName:'cart', zhName:'我的订单'},
      {enName:'top', zhName:'我的积分'},
      {enName:'favorite', zhName:'收藏'},
      {enName:'history', zhName:'浏览记录'},
      {enName:'shake', zhName:'摇一摇'},
      {enName:'gallery', zhName:'相册'},
      {enName:'setting', zhName:'设置'},
      {enName:'address', zhName:'收货地址'}
    ],
    skin: '',
     winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  
    suid:0,
    uid:'',
    p:1,
    data_arr:[],
    feedlist_arr:[],
    follow:'关注+'
  },
  onLoad:function(option){
    var that = this;
    that.setData({
      suid:option.suid,
    })
  },
  onShow:function(){
    var that = this;
    var uid = wx.getStorageSync('uid');
        that.setData({
          uid:uid
        })

    youyan.getEventList.call(that,config.apiList.getEventList,that.data.suid,that.data.p);
    youyan.getFeedList.call(that,config.apiList.getFeedList,that.data.suid,that.data.p);
    youyan.getUserProfile.call(that,config.apiList.getUserProfile,that.data.uid,that.data.suid);
    // youyan.getAddressList.call(that,config.apiList.getAddressList,that.data.uid);
    
    wx.getStorage({
      key: 'skin',
      success: function(res){
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })
  },
  onPullDownRefresh: function() {
    this.onLoad(function(){
      wx.stopPullDownRefresh()
    })
  },
  // 活动
  auterEvent:function(e){
       var data = e.currentTarget.dataset;
       var event_id = data.event_id;
       wx.redirectTo({
        url: "../eventInfo/eventInfo?event_id="+event_id
      })
  },
  /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },  
  // 粉丝列表
  myFlower:function(e){
     var that = this;
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: "../flowerList/flowerList?suid="+data.suid
    })
  },
  // 关注列表
  myFlowing:function(e){
     var that = this;
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: "../flowingList/flowingList?suid="+data.suid
    })
  },
  // 关注
  doFollow:function(e){
    var that = this;
    var data = e.currentTarget.dataset;
    var value = e.currentTarget.dataset.value.replace(/(^\s*)|(\s*$)/g, "");
      var uid = wx.getStorageSync('uid');
      console.log(uid)
      var parse_uid = parseInt(uid);
       console.log(that.data.suid)
       var parse_suid = parseInt(that.data.suid)
      if(uid == ''){
        wx.navigateTo({
            url: "../login/login"
          })
        that.onShow();
      }else{
        if(value == '关注+'){
          console.log('关注')
            youyan.doFollow.call(that,config.apiList.doFollow,parse_uid,parse_suid);
        }else{
          console.log('取消')
          youyan.unFollow.call(that,config.apiList.unFollow,parse_uid,parse_suid);
        }
        
      }

  },
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  
  }  
})