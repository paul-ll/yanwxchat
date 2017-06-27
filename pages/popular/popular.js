var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var amapFile = require('../../dist/amap-wx.js')
var app = getApp()
var city1;
Page({
	data: {
		activeIndex: 0,
		cate:'',
    menus: [],
    p:1,
    distance:[],
    area_id:2,
    pcount:15,
    isFromSearch: true, 
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false , //“没有数据”的变量，默认false，隐藏
    site:1,
    lat:[],
    lon:[],
    listIds:[],
		cityId:[],
		hasMore: true,
		showLoading: true,
		start: 0,
		bannerList:[],
		eventList:[],
    getCityList:[],
		citys:[],
		city:""

	},
onLoad: function (options) {
// 生命周期函数--监听页面加载
var that = this
var orlat;
var orlon;
var city_id;
youyan.getCityList.call(that,config.apiList.getCityList)  
console.log(that.data.eventList)
var cityList=wx.getStorageSync('cityList');
console.log(1)
console.log(cityList)

wx.showNavigationBarLoading()
wx.hideNavigationBarLoading()
	var myAmapFun = new amapFile.AMapWX({key:'b615b3f4ff1e35e90835dc07ad211c34'});
	  myAmapFun.getRegeo({
      success: function(data){
      	console.log(data)
        console.log(data[0].regeocodeData.addressComponent.citycode)
      	orlat = data[0].latitude;
      	orlon = data[0].longitude;
        for(var i=0;i<cityList.length;i++){
          if(cityList[i].city_code == data[0].regeocodeData.addressComponent.citycode ){
              city_id = cityList[i].area_id
              console.log(cityList[i].area_id)
          }
        }
        console.log(23)
        console.log(city_id)
        console.log(24)
       that.setData({
        area_id:city_id,
       	city:data[0].regeocodeData.addressComponent.province,
       })

  //      wx.setNavigationBarTitle({
		// 	title: '我的城市 - ' + that.citys..province
		// })
      },
      fail: function(info){
        wx.navigateTo({
          url: '../switchcity/switchcity?city=北京市'
        })
      }
    })

},
onReady: function () {
// 生命周期函数--监听页面初次渲染完成

},
onShow: function () {

// 生命周期函数--监听页面显示
var that = this;
console.log(that.data.p)
console.log(that.data.eventList)
	youyan.getConcentration.call(that,config.apiList.getConcentration,that.data.area_id,that.data.p,that.data.pcount)
	youyan.getCategory.call(that,config.apiList.getCategory,that.data.area_id)
   	
    wx.getSystemInfo( {
      success: ( res ) => {
        that.setData( {
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })


},
onHide: function () {
// 生命周期函数--监听页面隐藏

},
onUnload: function () {
// 生命周期函数--监听页面卸载

},

tabChange: function (e) {
		console.log(e)
	var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.target.dataset.id
    console.log(id)
    that.setData({
    	cate:id,
      	activeIndex: index
    });
    that.onshow();
  },
   pullDownRefresh: function( e ) {
    this.onShow()
  },
pullUpLoad: function(e) {
		var that = this
    console.log(that.data.p)
		if(!that.data.searchLoadingComplete){  
	      that.setData({  
	        p: that.data.p+1,  //每次触发上拉事件，把searchPageNum+1  
	        isFromSearch: false,  //触发到上拉事件，把isFromSearch设为为false  
	        searchLoading: true   //把"上拉加载"的变量设为false，显示 
	      });  

	     that.onShow();
	    }   
	},
	viewSearch: function(e) {
		var data = e.currentTarget.dataset;
    var hot_search_key = data.hot_search_key;
		wx.navigateTo({
			url: '../search/search?hot_search_key='+JSON.stringify(hot_search_key)
		})
	},
	 selectRankType: function(e) {
	 	console.log(e.currentTarget.dataset.value)
        wx.navigateTo({
    			url: '../switchcity/switchcity?city='+e.currentTarget.dataset.value
    		})
    },
    changeList: function(e){
   
    	
    },
    Rad:function(d){
       return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
    },
    GetDistance:function (lat1,lng1,lat2,lng2){
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(lat2);
        var a = radLat1 - radLat2;
        var  b = this.Rad(lng1) - this.Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s *6378.137 ;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000; //输出为公里
        s = s.toFixed(2); 
        return s;
    },
    viewEnentInfo:function(e){
    	wx.navigateTo({
			url: '../eventInfo/eventInfo?event_id='+e.currentTarget.dataset.event_id
		})
    },
    viewBannerDetail:function(e){
    	 var data = e.currentTarget.dataset
    	wx.navigateTo({
  			url: '../eventInfo/eventInfo?event_id='+data.action_id
  		})
    },
    eventAll:function(e){
      var data = e.currentTarget.dataset
      wx.navigateTo({
        url: '../eventAll/eventAll?cid='+data.cid+'&area_id='+data.area_id+'&list='+JSON.stringify(data.list)
      })
    }
})
