var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var util = require('../../util/util')
var app = getApp();
Page({
  data:{
    skin: '',
     winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  
    suid:0,
    uid:0,
    p:1,
    data_arr:[],
    feedlist_arr:[],
    myInfo_arr:{},
  },
  onLoad:function(cb){
    var that = this

    // 检测是否存在用户信息
   
    typeof cb == 'function' && cb()
  },
  onShow:function(){
    var that = this;
    var user = wx.getStorageSync('user');
    console.log(user.data)
    var uid = wx.getStorageSync('uid');
    var suid = wx.getStorageSync('suid');
that.setData({
          userInfo: user.data,
          uid:uid
      })

    youyan.getUserProfile.call(that,config.apiList.getUserProfile,uid,suid);

    
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
  viewSkin: function() {
		wx.navigateTo({
			url: "../skin/skin"
		})
  },
 
  /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },  
  active_into:function(){
var uid = wx.getStorageSync('uid');
console.log(uid)
if(uid == ''){
  wx.navigateTo({
      url: "../login/login"
    })
}else{
  wx.navigateTo({
      url: "../my/my?suid="+uid
    })
}

  },
  addressInto:function(){
   var uid = wx.getStorageSync('uid');
console.log(uid)
if(uid == ''){
  wx.navigateTo({
      url: "../login/login"
    })
}else{
  wx.navigateTo({
      url: "../address/address?uid="+uid
    })
}
    	
  },
   listInto:function(){
     var uid = wx.getStorageSync('uid');
  if(uid == ''){
     wx.navigateTo({
      url: "../login/login"
    })
  }else{
    wx.navigateTo({
      url: "../list/list?uid="+uid
    })
  }

   
  },
  ticketInto:function(){
    var uid = wx.getStorageSync('uid');
  if(uid == ''){
     wx.navigateTo({
      url: "../login/login"
    })
  }else{
    wx.navigateTo({
      url: "../favorite/favorite?uid="+uid
    })
  }
    
  },
  collectionInto:function(e){
  var uid = wx.getStorageSync('uid');
  if(uid == ''){
     wx.navigateTo({
      url: "../login/login"
    })
  }else{
    wx.navigateTo({
      url: "../collection/collection?uid="+uid
    })
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