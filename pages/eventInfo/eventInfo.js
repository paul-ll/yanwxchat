var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var util = require('../../util/util')

Page({
  data:{
    eventInfo: [],
    collect:false,
    uid:0,
    type:'event',
    arr_uesr:[],
    now_data:0,
    event_id:'',
    isFold:true,
    event_start_date:0,
   event_end_date:0
    
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this
 
    var event_id= options.event_id;
    that.setData({
      event_id:event_id
    })

     youyan.getEventDetail.call(that,config.apiList.getEventDetail,that.data.event_id);

    
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function (e) {
    // 生命周期函数--监听页面显示
    var that = this;
    
  

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  
  collectionTag: function(e) {
    var that = this
    // 判断原来是否收藏，是则删除，否则添加
    var data = e.currentTarget.dataset;
    var event_id = parseInt(data.event_id)
    var uid = wx.getStorageSync('uid');
    if(uid == ''){
     wx.navigateTo({
      url: "../login/login"
      })
    }else{
    if(data.value){
      that.setData({
        collect:false
      })
      youyan.channelCollection.call(that,config.apiList.channelCollection,event_id,uid,that.data.type)
        
      }else{
        that.setData({
            collect:true
          })
        youyan.addCollection.call(that,config.apiList.addCollection,event_id,uid,that.data.type)
      }
  }
        
    
  },
  flodFn:function(){
    var that=this
    that.setData({
       isFold:!that.data.isFold 
    });
  },
  // 时间戳转换
  js_strto_time:function(str_time){
  var new_str = str_time.replace(/:/g,"-");
  new_str = new_str.replace(/ /g,"-");
  var arr = new_str.split("-");
  var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
  return datum.getTime()/1000;

},
  mayLike:function(e){
    var data = e.currentTarget.dataset;
    var event_id = parseInt(data.row_id)
    wx.navigateTo({
      url: "../eventInfo/eventInfo?event_id=" +event_id
    })

  },
  view_people:function(e){
    var data = e.currentTarget.dataset;
    var uid = data.uid
    wx.redirectTo({
      url: '../my/my?suid='+uid
    })
  },
  bindCheckout : function(e){
     var uid = wx.getStorageSync('uid');
     if(uid == ''){
        wx.navigateTo({
          url: "../login/login"
        })
     }else{


      var data = e.currentTarget.dataset;
      console.log(data.event_id)
      wx.navigateTo({
        url: "../shop/shop?event_id=" + data.event_id+"&image="+data.image+"&name="+data.name+"&address="+data.address+"&date="+data.date
      })
       wx.showToast({
        title: '立即购买',
        icon: 'success',
        duration: 1000
      });
     }
    

    
  },
})