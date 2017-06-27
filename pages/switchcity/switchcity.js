var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var app = getApp()
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "",
    hotcityList: []
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData({
      city:options.city
    })

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    var that = this;
    var cityList=wx.getStorageSync('cityList');
    that.setData({
      hotcityList:cityList
    })


  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    this.setData({ city: e.currentTarget.dataset.city })
  },
  //选择热门城市
  bindHotCity: function (e) {
  var that = this;

  var pages = getCurrentPages();
  var currPage = pages[pages.length - 1];   //当前页面
  var prevPage = pages[pages.length - 2];  //上一个页面

  //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
  
 prevPage.setData({
    area_id:e.currentTarget.dataset.area_id,
    eventList:[],
    getCityList:[],
    isFromSearch:true,
    p:1
  })

  prevPage.setData({
      city: e.currentTarget.dataset.city,
    })
   prevPage.onShow();
   wx.navigateBack(); 
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  }
})