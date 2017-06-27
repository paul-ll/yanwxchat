var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var util = require('../../util/util')
var app = getApp();
Page({
	data:{
    uid:0,
	address_arr:[],
	index_id:[],
	index:0
	// addressObjects:{}
  },
  onLoad: function(options) {
        var that = this
        var uid = options.uid;
        console.log(uid)
        that.setData({
				uid:uid
			})
    },
	add_sit: function (e) {
		var length = this.data.address_arr.length; 
		wx.redirectTo({
			url: '../add_address/add_address?uid='+this.data.uid+'&length='+length
		});
	},
	onShow: function () {
		var that = this;
		console.log(that.data.uid)
		console.log(that.data.address_arr)
	 youyan.getAddressList.call(that,config.apiList.getAddressList,that.data.uid);
	 
	},
	setDefault: function (e) {
		// 设置为默认地址
		var that = this;
		// 取得下标
		var index = parseInt(e.currentTarget.dataset.index);

		var data_id = parseInt(e.currentTarget.dataset.id);
		console.log(data_id)
		
		// 遍历所有地址对象设为非默认
		var addressObjects;
		 addressObjects= that.data.address_arr;
			console.log(addressObjects)
			
		for (var i = 0; i < addressObjects.length; i++) {
			// 判断是否为当前地址，是则传true
			addressObjects[i].is_default=0;
			addressObjects[index].is_default=1;
		
		}
		
		that.setData({
			address_arr:addressObjects,
			index:index
		})

		// 订单提交地址修改
		 var page_address = getCurrentPages();
		  var currPage = page_address[page_address.length - 1];   //当前页面
		  var prevPage = page_address[page_address.length - 2];  //上一个页面

		  //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

		  prevPage.setData({
		    address_arr:addressObjects[index],
		    userN:addressObjects[index].name,
    		phoneN:addressObjects[index].phone
		  })
	
		console.log(addressObjects[index])
		console.log(that.data.uid)
 youyan.setDefaultAddress.call(that,config.apiList.setDefaultAddress,data_id,that.data.uid);

		// 提交网络更新该用户所有的地址
		// AV.Object.saveAll(addressObjects).then(function (addressObjects) {
		//     // 成功同时更新本地数据源
		//     that.setData({
		//     	addressObjects: addressObjects
		//     });
		//     // 设置成功提示
		//     wx.showToast({
  		// 		title: '设置成功',
  		// 		icon: 'success',
  		// 		duration: 2000
  		// 	});
		// }, function (error) {
		//     // 异常处理
		// });
	},
	edit: function (e) {
		var that = this;
		// 取得下标
		console.log(that.data.uid)
		var index = parseInt(e.currentTarget.dataset.index);
		// 取出id值
		var data_id = parseInt(e.currentTarget.dataset.id);
		var name = that.data.address_arr[index].name
		var phone =  that.data.address_arr[index].phone
		var province =that.data.address_arr[index].province
		var city =that.data.address_arr[index].city
		var county = that.data.address_arr[index].county
		var detail = that.data.address_arr[index].address;
		var area_id = that.data.address_arr[index].area_id;
		var is_default = that.data.address_arr[index].is_default;
		var addressObjects;
		 addressObjects= that.data.address_arr;
			var length = that.data.address_arr.length;
	
			// // 订单提交地址修改
			//  var page_address = getCurrentPages();
			//   var currPage = page_address[page_address.length - 1];   //当前页面
			//   var prevPage = page_address[page_address.length - 2];  //上一个页面

			//   //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

			//   prevPage.setData({
			//     address_arr:addressObjects[index]
			//   })
	

		

		wx.redirectTo({
			url: '../add_address/add_address?id='+data_id+'&uid='+that.data.uid+'&name='+name+'&phone='+phone+'&province='+province+'&city='+city+'&county='+county+'&detail='+detail+'&area_id='+area_id+'&is_default='+is_default+'&length='+length
		});
	}


})