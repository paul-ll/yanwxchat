var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var util = require('../../util/util')
var app = getApp();
Page({
	data:{
    uid:0,
	address_arr:[],
	index_id:[],
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
	add: function (e) {
		console.log(this.data.uid)
		wx.navigateTo({
			url: '../add_address/add_address?uid='+this.data.uid
		});
	},
	onShow: function () {
		var that = this;
		console.log(that.data.uid)
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
			address_arr:addressObjects
		})
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
		console.log(data_id)
		console.log(that.data.uid)
		wx.navigateTo({
			url: '../add_address/add_address?id='+data_id+'&uid='+that.data.uid+'&name='+name+'&phone='+phone+'&province='+province+'&city='+city+'&county='+county+'&detail='+detail+'&area_id='+area_id
		});
	},
	delete: function (e) {
		var that = this;
		// 取得下标
		var index = parseInt(e.currentTarget.dataset.index);
		var data_id = parseInt(e.currentTarget.dataset.id);
		// 找到当前地址AVObject对象
		var addressObject =that.data.address_arr;
		// 给出确认提示框
		 
			
		wx.showModal({
			title: '确认',
			content: '要删除这个地址吗？',
			success: function(res) {
				if (res.confirm) {
					// 真正删除对象
			addressObject.splice(index, 1);
			that.setData({
				address_arr:addressObject
			})
			 
				}
			}
		})


		youyan.deleteAddress.call(that,config.apiList.deleteAddress,data_id,that.data.uid);
	
	}

})