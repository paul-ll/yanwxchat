var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var util = require('../../util/util')

var app = getApp();

Page({
	isDefault: false,
	formSubmit: function(e,options) {

		// // detail
		var detail = e.detail.value.detail;
		// // realname
		var realname = e.detail.value.realname;
		// // mobile
		var mobile = e.detail.value.mobile;
		// // save address to leanCloud
		var address ={};
		// 如果是编辑地址而不是新增
	
		console.log(detail)
		console.log(realname)

		console.log(mobile)
		console.log(this.data.address_arr.uid)
		console.log(this.data.address_arr.id)
		console.log(this.data.region_id)
		if (this.data.address_arr.id != null) {
			
			if(this.data.province_id != null){
				youyan.modifyAddress.call(this,config.apiList.modifyAddress,this.data.address_arr.id,this.data.address_arr.uid,realname,mobile,this.data.region_id,detail);
			}
			

			
		}else{
			youyan.addAddress.call(this,config.apiList.addAddress,this.data.address_arr.uid,realname,mobile,this.data.region_id,detail);
		}
		// // if isDefault address
		// address.set('isDefault', this.isDefault);
		// address.set('detail', detail);
		// // set province city region
		// address.set('province', this.data.province[this.data.provinceIndex]);
		// address.set('city', this.data.city[this.data.cityIndex]);
		// address.set('region', this.data.region[this.data.regionIndex]);
		// address.set('user', user);
		// address.set('realname', realname);
		// address.set('mobile', mobile);
		var that = this;



		address.province = that.data.provinceName;
		address.city = that.data.cityName;
		address.county = that.data.regionName;
		address.address = detail;
		address.name = realname;
		address.phone = mobile;
		console.log(that.data.address_arr)


		console.log(address)

		// 订单新增地址
		 var page_address = getCurrentPages();
		  var currPage = page_address[page_address.length - 1];   //当前页面
		  var prevPage = page_address[page_address.length - 2];  //上2个页面

		  //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
		
		 var is_default = parseInt(that.data.is_default)
		 console.log(is_default)
		 console.log(that.data.length)
		  if(that.data.length == 0){
				prevPage.setData({
				    address_arr:address,
				    empty_address:false
				  })
			} 
			if(is_default == 1){
				prevPage.setData({
				    address_arr:address,
				    userN:address.name,
    				phoneN:address.phone
				  })
			}

		  
		




		// address.save().then(function (address) {
		// 	console.log(address);
		// 	// that.setData('address', address);
			wx.showToast({
				title: '保存成功',
				duration: 500
			});
	
			setTimeout(function () {
				wx.navigateBack();
			}, 500);
		// }, function (error) {
		// 	console.log(error);
		// };
	},
	data: {
		current: 0,
		address_arr:{},
		province: [],
		province_id:'',
		length:0,
		city: [],
		is_default:0,
		city_id:'',
		region: [],
		region_id:'',
		town: [],
		cityStr:[],
		provinceObjects: [],
		cityObjects: [],
		regionObjects: [],
		townObjects: [],
		areaSelectedStr: '请选择省市区',
		maskVisual: 'hidden',
		version:3.0,
		provinceName: '请选择',
		cityName:'',
		regionName:''

	},
	// getArea: function (pid, cb) {
	// 	var that = this;
	// 	// query area by pid
	// 	var query = new AV.Query('Area');
	// 	query.equalTo('pid', pid);
	// 	query.find().then(function (area) {
	// 		cb(area);
	// 	}, function (err) {
			
	// 	});
	// },
	onLoad: function (options) {
		var that = this;
	
			
		// load province
		// this.getArea(0, function (area) {
		// 	var array = [];
		// 	for (var i = 0; i < area.length; i++) {
		// 		array[i] = area[i].get('name');
		// 	}
		// 	that.setData({
		// 		province: array,
		// 		provinceObjects: area
		// 	});
		// });
		// if isDefault, address is empty
		// this.setDefault();
		// this.cascadePopup();
		that.loadAddress(options);
		// TODO:load default city...
		var array = [];
			// for (var i = 0; i < citylist.cityStr.length; i++) {
			// 	array[i] = citylist.cityStr[i].get('name');
			// }
			// this.setData({
		      
		   
		    // this.setData({
		    //   cityList: city.getCity(this.data.provinceList[this.data.indexProvince])
		    // });
		    // this.setData({
		    //   districtList: city.getArea(this.data.provinceList[this.data.indexProvince], this.data.cityList[this.data.indexCity])
		    // });
		    // addressList = wx.getStorageSync('address').length > 0 ? wx.getStorageSync('address') : [];
	
		
	},
	onShow: function () {
		var that = this;
	youyan.getAreaList.call(that,config.apiList.getAreaList,that.data.version);
			
	},
	loadAddress: function (options) {
		var that = this;
		if (options.id != null) {
		// 	var id = options.id
		// 	var uid = options.uid
		// 	var name = options.name
		// 	var phone = options.phone
		// 	var address = options.address
		// console.log(id)
		// console.log(uid)
		// console.log(name)
		// console.log(phone)
		// console.log(address)
			that.data.address_arr={
				id:options.id,
				uid:options.uid,
				phone:options.phone,
				name:options.name,
				address:options.province+options.city+options.county,
				detail:options.detail,
				area_id:options.area_id
				
				
			}
			console.log(options.length)

			that.setData({
					length:options.length,
					is_default:options.is_default,
					provinceName:options.province,
					cityName:options.city,
					regionName:options.county,
					region_id:options.area_id,
		  			address: that.data.address_arr,
		  			areaSelectedStr:options.province+options.city+options.county
		  		});
		}else{
			that.data.address_arr={
				uid:options.uid
			}
			
			that.setData({
					length:options.length,
		  			address: that.data.address_arr
		  		});
		}
		
		// if (options.objectId != undefined) {
		// 	// 第一个参数是 className，第二个参数是 objectId
		//   	var address = AV.Object.createWithoutData('Address', options.objectId);
		//   	address.fetch().then(function () {
		//   		that.setData({
		//   			address: address,
		//   			areaSelectedStr: address.get('province') + address.get('city') + address.get('region')
		//   		});
		// 	}, function (error) {
		// 	    // 异常处理
		// 	});
		// }
	},
	setDefault: function () {
		var that = this;
		// var user = AV.User.current();
		// if user has no address, set the address for default
		// var query = new AV.Query('Address');
		// query.equalTo('user', user);
		// query.count().then(function (count) {
		// 	if (count <= 0) {
		// 		that.isDefault = true;
		// 	}
		// });
	},
	cascadePopup: function() {
		var animation = wx.createAnimation({
			duration: 500,
			timingFunction: 'ease-in-out',
		});
		this.animation = animation;
		animation.translateY(-285).step();
		
		this.setData({
			animationData: this.animation.export(),
			province:  this.getProvince(),
			maskVisual: 'show'
		});
	},
	cascadeDismiss: function () {
		this.animation.translateY(285).step();
		this.setData({
			animationData: this.animation.export(),
			maskVisual: 'hidden'
		});
	},
 getProvince:function() {
	 var that = this;
    var provinceNames = [];
	var province_arr = [];
	var province_area_id = [];
	console.log(that.data.cityStr)
    for (var i = 0; i < that.data.cityStr.length; i++) {
        province_arr.push(that.data.cityStr[i].name);
		province_area_id.push(that.data.cityStr[i].area_id)
    }
	for(let i=0;i<province_area_id.length;i++){
		provinceNames.push([province_arr[i],province_area_id[i]])
	}
console.log(provinceNames)
    return provinceNames;
},
 getCity:function(province) {
	 var that = this;
    var cityNames = [];
	var city_area_id = [];
	var city_arr=[];
    var cities, i, j;
    for (i = 0; i < that.data.cityStr.length; i++) {
        if (province === that.data.cityStr[i].name) {
            cities = that.data.cityStr[i].city;
            for (j = 0; j < cities.length; j++) {
                city_arr.push(cities[j].name);
				city_area_id.push(cities[j].area_id)
            }
            break;
        }
    }
	for(let i=0;i<city_arr.length;i++){
			cityNames.push([city_arr[i],city_area_id[i]])
		}

    return cityNames;
},
 getArea:function(province, city) {

	 var that = this;
    var areaNames = [];
	var area_area_id = [];
	var area_arr = [];
    var cities,countys, i, j,k;
    for (i = 0; i < that.data.cityStr.length; i++) {
        if (province === that.data.cityStr[i].name) {
            cities = that.data.cityStr[i].city;
            for (j = 0; j < cities.length; j++) {
                if (city === cities[j].name) {
                     countys = cities[j].county;
					for(k = 0; k < countys.length; k++){
						area_arr.push(countys[k].name)
						area_area_id.push(countys[k].area_id)
					}
                    break;
                }
            }
            break;
        }
    }
		for(let i=0;i<area_arr.length;i++){
			areaNames.push([area_arr[i],area_area_id[i]])
		}
	console.log(areaNames)
    return areaNames;
},
	//选择省
	provinceTapped: function(e) {
		var that = this;
    	// 标识当前点击省份，记录其名称与主键id都依赖它
    	var index = e.currentTarget.dataset.index;
		var province_id = e.currentTarget.dataset.id
		console.log(province_id)
    	// current为1，使得页面向左滑动一页至市级列表
    	// provinceIndex是市区数据的标识
    	console.log(index)
    	that.setData({
    		provinceName: that.data.province[index][0],
			province_id:province_id,
    		regionName: '',
    		townName: '',
    		provinceIndex: index,
    		cityIndex: -1,
    		regionIndex: -1,
    		townIndex: -1,
    		region: [],
    		town: []

    	});
    	
    	//provinceObjects是一个LeanCloud对象，通过遍历得到纯字符串数组
    	// getArea方法是访问网络请求数据，网络访问正常则一个回调function(area){}
    	// this.getArea(this.data.provinceObjects[index].get('aid'), function (area) {
    	// 	var array = [];
    	// 	for (var i = 0; i < area.length; i++) {
    	// 		array[i] = area[i].get('name');
    	// 	}
			// city就是wxml中渲染要用到的城市数据，cityObjects是LeanCloud对象，用于县级标识取值
			
			that.setData({
				cityName: '请选择',
				city:that.getCity(that.data.province[index][0]),
				// cityObjects:''
			});
			// 确保生成了数组数据再移动swiper
			that.setData({
				current: 1
			});
		
    },
    //选择市
    cityTapped: function(e) {
    	// 标识当前点击县级，记录其名称与主键id都依赖它
    	var index = e.currentTarget.dataset.index;
		var city_id = e.currentTarget.dataset.id
    	// current为1，使得页面向左滑动一页至市级列表
    	// cityIndex是市区数据的标识
    	this.setData({
    		cityIndex: index,
			city_id:city_id,
    		regionIndex: -1,
    		townIndex: -1,
    		cityName: this.data.city[index][0],
    		regionName: '',
    		townName: '',
    		town: []
    	});
    	var that = this;
    	//cityObjects是一个LeanCloud对象，通过遍历得到纯字符串数组
    	// getArea方法是访问网络请求数据，网络访问正常则一个回调function(area){}
    	// this.getArea(this.data.cityObjects[index].get('aid'), function (area) {
    	// 	var array = [];
    	// 	for (var i = 0; i < area.length; i++) {
    	// 		array[i] = area[i].get('name');
    	// 	}
			// region就是wxml中渲染要用到的城市数据，regionObjects是LeanCloud对象，用于县级标识取值
		
			that.setData({
				regionName: '请选择',
				region: that.getArea(that.data.provinceName, that.data.cityName),
				// regionObjects: area
			});
			// 确保生成了数组数据再移动swiper
			that.setData({
				current: 2
			});
		
    },
    // 选择县
    regionTapped: function(e) {
    	// 标识当前点击镇级，记录其名称与主键id都依赖它
    	var index = e.currentTarget.dataset.index;
		var region_id = e.currentTarget.dataset.id;
		console.log(region_id)
    	// current为1，使得页面向左滑动一页至市级列表
    	// regionIndex是县级数据的标识
    	this.setData({
    		regionIndex: index,
			region_id:region_id,
    		townIndex: -1,
    		regionName: this.data.region[index][0],
    		townName: ''
    	});
    	// var that = this;
    	//townObjects是一个LeanCloud对象，通过遍历得到纯字符串数组
    	// getArea方法是访问网络请求数据，网络访问正常则一个回调function(area){}
   //  	this.getArea(this.data.regionObjects[index].get('aid'), function (area) {
			// // 假如没有镇一级了，关闭悬浮框，并显示地址
			// if (area.length == 0) {
			// 	var areaSelectedStr = that.data.provinceName + that.data.cityName + that.data.regionName;
			// 	that.setData({
			// 		areaSelectedStr: areaSelectedStr
			// 	});
			// 	that.cascadeDismiss();
			// 	return;
			// }
			// var array = [];
			// for (var i = 0; i < area.length; i++) {
			// 	array[i] = area[i].get('name');
			// }
			// region就是wxml中渲染要用到的县级数据，regionObjects是LeanCloud对象，用于县级标识取值
			// that.setData({
			// 	townName: '请选择',
			// 	town: citylist.getArea(citylist.getProvince(), citylist.getCity(that.data.province[index])),
			// 	// townObjects: area
			// });
			// 确保生成了数组数据再移动swiper
			var areaSelectedStr = this.data.provinceName + this.data.cityName + this.data.regionName + this.data.townName;
    	this.setData({
    		areaSelectedStr: areaSelectedStr,
    		provinceName:this.data.provinceName,
    		cityName:this.data.cityName,
    		regionName:this.data.regionName
    	});
    	this.cascadeDismiss();
    },
    //选择镇
    // townTapped: function (e) {
    // 	// 标识当前点击镇级，记录其名称与主键id都依赖它
    // 	var index = e.currentTarget.dataset.index;
    // 	// townIndex是镇级数据的标识
    // 	this.setData({
    // 		townIndex: index,
    // 		townName: this.data.town[index]
    // 	});
    // 	var areaSelectedStr = this.data.provinceName + this.data.cityName + this.data.regionName + this.data.townName;
    // 	this.setData({
    // 		areaSelectedStr: areaSelectedStr
    // 	});
    // 	this.cascadeDismiss();
    // },
    currentChanged: function (e) {
    	// swiper滚动使得current值被动变化，用于高亮标记
    	var current = e.detail.current;
    	this.setData({
    		current: current
    	});
    },
    changeCurrent: function (e) {
    	// 记录点击的标题所在的区级级别
    	var current = e.currentTarget.dataset.current;
    	this.setData({
    		current: current
    	});
    }
})