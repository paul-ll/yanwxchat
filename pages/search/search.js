var message = require('../../component/message/message')
var youyan  = require('../../comm/script/fetch')
var config  = require('../../comm/script/config')
Page({
  data:{
    hotKeyword: '',
    history_keyword: [],
    event:[],
    user:[]
  },
  onLoad:function(option){
    var that= this;
    var getSearch = wx.getStorageSync('searchData');
    var hot_search_key = JSON.parse(option.hot_search_key);
    console.log(getSearch);
    that.setData({
        history_keyword:getSearch,
        hotKeyword:hot_search_key
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
  search: function(e) {
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
  searchByKeyword: function(e) {
    var that = this
    var keyword = e.currentTarget.dataset.keyword;
     var searchData = wx.getStorageSync('searchData') || []
      searchData.push(keyword)
      
      wx.setStorageSync('searchData', searchData)
    
    youyan.Event.call(that,config.apiList.Event,keyword);
     youyan.User.call(that,config.apiList.User,keyword);
      wx.redirectTo({
        url: "../searchResult/searchResult"
      })
  },
  searchByTag: function(e) {
    var that = this
    var keyword = e.currentTarget.dataset.keyword

     youyan.Event.call(that,config.apiList.Event,keyword);
     youyan.User.call(that,config.apiList.User,keyword);
   
      wx.redirectTo({
        url: "../searchResult/searchResult"
      })
  },
  clearSearchStorage:function(){
      wx.setStorageSync('searchData',[])
      
      wx.redirectTo({
        url: '../search/search'
      })
      // this.onLoad();
      
  }
})