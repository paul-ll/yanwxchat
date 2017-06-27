var youyan = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
    data: {
    	activeIndex: 0,
		cate:'',
		games_obj:'',
        filmDetail: {},
        // tickets: [],
        tickets:'',
        postage:0,
        event_id:'',
        ship_type_num:1,
        ship_type:'电子票',
        address_arr:'',
        empty_address:false,
        uid:'',
		carts : '',
		page : '',
		time : '',
		total : '',
		all_num:'',
		image : '',
		name : '',
		address : '',
		ticket_arr:'',
		userN:'',
		phoneN:'',
        showLoading: true,
		showContent: false,
		site_city:'',
		active_id:'',
		selectedDate: '',//选中的几月几号
	    selectedWeek: '',//选中的星期几
	    curYear: 2017,//当前年份
	    curMonth: 0,//当前月份
	    ticket_type:[' 电子票 ',' 快递配送 '],
	    addressList: [' 北京 ',' 上海 ',' 广州 '],
		addressIndex: 0
    },
    onLoad: function(options) {
        var that = this
        var tickets = JSON.parse(options.tickets)
        var carts = JSON.parse(options.carts)
		var page = options.page;
		var time = options.time;
		var total = options.total;
		var image = options.image;
		var name = options.name;
		var address = options.address;
		var event_id = options.event_id;
		var games_obj = JSON.parse(options.games_obj);
		console.log(games_obj)
		console.log(carts)
		
		console.log(event_id)
		console.log(time)
        that.setData({
        	games_obj:games_obj,
        	event_id:options.event_id,
        	tickets:tickets,
			carts : carts,
			page : page,
			time : time,
			total : total,
			image : image,
			name : name,
			address : address,
       		showLoading: false,
			showContent: true,
       	})


       	 var uid = wx.getStorageSync('uid');
       	  that.setData({
		   	uid:uid
		   })
       	 youyan.getTicketDelivery.call(that, config.apiList.getTicketDelivery, event_id,uid)
       



		 // var pages = getCurrentPages();
   //      if(pages.length > 1){
   //          //上一个页面实例对象
   //          var prePage = pages[pages.length - 2];
   //          //关键在这里
   //          prePage.onShow()
           
   //      }
       


		
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

  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },


    userNameInput:function(e){
    	 this.setData({
	      userN:e.detail.value
	    })
    },
    phoneNumInput:function(e){
    	this.setData({
	      phoneN:e.detail.value
	    })
    },
    tabChange: function (e) {
	var that = this;
	var money = '';
    var index = e.currentTarget.dataset.index;
    // var id = e.target.dataset.id
    var id = e.currentTarget.id
    var ship_type = e.currentTarget.dataset.value.replace(/(^\s*)|(\s*$)/g, "");
   
 	money = parseFloat(that.data.total)+parseFloat(that.data.ticket_arr.postage)
    that.setData({
    	ship_type:e.currentTarget.dataset.value,
    	activeIndex: index
    });
     if(ship_type == '电子票'){
    	that.setData({
    		userN:"",
    		phoneN:"",
    		ship_type_num:1,
    		all_num:that.data.total,
    		postage:0,
    	})
    }else{
    	that.setData({
    		userN:that.data.address_arr.name,
    		phoneN:that.data.address_arr.phone,
    		ship_type_num:2,
    		all_num:money,
    		postage:parseFloat(that.data.ticket_arr.postage)
    	})
    }
  },
	bindPickerChange: function (e) {
		this.setData({
	    	addressIndex: e.detail.value
	    })
	},
	onPullDownRefresh: function() {
		var data = {
			id: this.data.filmDetail.id
		}
		this.onLoad(data)
	},
	// 修改地址
	address_change:function(e){
		var that = this;
		console.log(that.data.uid)

		wx.navigateTo({
	      url: "../address_init/address_init?uid="+that.data.uid
	    })

	},
	
	
	bindCheckout: function(e) {
		var that = this;

		var data = e.currentTarget.dataset;
		// 正则部分
		console.log(that.data.phoneN)
		var mobile = that.data.phoneN;
		var autr_name = that.data.userN;
		var ship_type = that.data.ship_type.replace(/(^\s*)|(\s*$)/g, "");


		if(ship_type == '电子票'){
			 if (mobile.length == 0) {
		        wx.showToast({
		      title: '请输入手机号！',
		      icon: 'success',
		      duration: 1500
		     })
	   return false;
	  }
	  if (autr_name.length == 0) {
	        wx.showToast({
	      title: '请输入姓名！',
	      icon: 'success',
	      duration: 1500
	     })
	   return false;
	  }
	  if (mobile.length != 11) {
	        wx.showToast({
	      title: '手机号长度有误！',
	      icon: 'success',
	      duration: 1500
	     })
	   return false;
	  }
	  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
	  if (!myreg.test(mobile)) {
	        wx.showToast({
	      title: '手机号有误！',
	      icon: 'success',
	      duration: 1500
	     })
	   return false;
	  }


 // 提交订单

	  


	 var original_price=0;
     var current_price=0;
     var cut_pic=0;
     var page_arr = that.data.carts;
   for(var i=0;i<that.data.tickets.length;i++){
   
   		original_price+=parseFloat(parseFloat(that.data.tickets[i].original_price-0)*parseInt(that.data.tickets[i].num));
   		current_price+=parseFloat(parseFloat(that.data.tickets[i].current_price-0)*parseInt(that.data.tickets[i].num));
   }  

console.log(that.data.tickets)

var event_id = parseInt(that.data.event_id);
console.log(that.data.uid)
var games_id = parseInt(that.data.tickets[0].games_id);
console.log(that.data.name)
console.log(that.data.address)
console.log(that.data.time)

console.log(that.data.games_obj.start_time)
console.log(that.data.games_obj.end_time)
var page = parseInt(that.data.page);
console.log(page)
current_price = current_price.toFixed(2)
var total_up = current_price*100;
console.log(total_up)
var postage_up = parseInt(that.data.postage*100);
console.log(postage_up)
var cut_pic_up =0;
console.log(cut_pic_up)
var all_num_up = parseInt(that.data.all_num*100);
console.log(all_num_up)
var tickets = JSON.stringify(that.data.tickets);
console.log(tickets)
console.log(that.data.ship_type_num)
console.log(that.data.userN)
console.log(that.data.phoneN)

var address_info = (that.data.address_arr.province+that.data.address_arr.city+that.data.address_arr.county+that.data.address_arr.address)



youyan.submitOrder.call(that, config.apiList.submitOrder, event_id, that.data.uid, games_id,that.data.name,that.data.address,that.data.time,that.data.games_obj.start_time,that.data.games_obj.end_time,page,total_up, postage_up, cut_pic_up, all_num_up,tickets,that.data.ship_type_num,that.data.userN,that.data.phoneN,address_info,'1')



wx.showToast({
	title: '立即购买',
	icon: 'success',
	duration: 1000
});


	}else{
		 // 提交订单


	 var original_price=0;
     var current_price=0;
     var cut_pic=0;
     var page_arr = that.data.carts;
     console.log(that.data.carts)
   for(var i=0;i<page_arr.length;i++){
   
   		original_price+=(parseFloat(that.data.tickets[i].original_price)*parseFloat(page_arr[i]));
   		current_price+=(parseFloat(that.data.tickets[i].current_price)*parseFloat(page_arr[i]));
   }  

// cut_pic = original_price - current_price;

var event_id = parseInt(that.data.event_id);
console.log(that.data.uid)
var games_id = parseInt(that.data.tickets[0].games_id);
console.log(that.data.name)
console.log(that.data.address)
console.log(that.data.time)

console.log(that.data.games_obj.start_time)
console.log(that.data.games_obj.end_time)
var page = parseInt(that.data.page);
console.log(page)
var total_up = current_price*100;
console.log(total_up)
var postage_up = parseInt(that.data.postage*100);
console.log(postage_up)
var cut_pic_up =0;
console.log(cut_pic_up)
var all_num_up = parseInt(that.data.all_num*100);
console.log(all_num_up)
var tickets = JSON.stringify(that.data.tickets);
console.log(tickets)
console.log(that.data.ship_type_num)
console.log(that.data.userN)
console.log(that.data.phoneN)

var address_info = (that.data.address_arr.province+that.data.address_arr.city+that.data.address_arr.county+that.data.address_arr.address)



youyan.submitOrder.call(that, config.apiList.submitOrder, event_id, that.data.uid, games_id,that.data.name,that.data.address,that.data.time,that.data.games_obj.start_time,that.data.games_obj.end_time,page,total_up, postage_up, cut_pic_up, all_num_up,tickets,that.data.ship_type_num,that.data.userN,that.data.phoneN,address_info,'1')



wx.showToast({
	title: '立即购买',
	icon: 'success',
	duration: 1000
});
	}

    
		
		// wx.navigateTo({
		// 	// url: '../checkout/checkout?cartIds=' + cartIds + '&amount=' + this.data.total
		// 	url: '../payment/payment'
		// });
	},
	sum: function() {
		var add=this.data.filmDetail;
		var num = this.data.filmDetail.price_high;
		// 计算总金额
		var total = 0;

		total=parseInt(add.price_high)+parseInt(add.price_low);
		// for (var i = 0; i < carts.length; i++) {
		// 	if (carts[i].get('selected')) {
		// 		total += carts[i].get('quantity') * carts[i].get('goods').get('price');
		// 	}
		// }
		// 写回经点击修改后的数组
		this.setData({
			total: total
		});
	}
})