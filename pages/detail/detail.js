var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var util = require('../../util/util')
var app = getApp();
Page({
	data: {
		goods: {},
		current: 0,
		clock: '',
		num:'',
		total_micro_second:'',
		showLoading: true,
		showContent: false
	},
	onLoad: function(options) {

		var that=this;
		var order_id = options.order_id;

		var num = options.num;
		
		youyan.orderDetail.call(that,config.apiList.orderDetail,order_id);
		that.setData({
			num:num
		})		
	},
	onShow: function(e) {
		
		var that = this;
		console.log(that.data.total_micro_second)
			
	
		
	},
	getGoodsById: function(goodsId) {
		var that = this
		// var query = new AV.Query('Goods');
  //       // 生成商品对象
		// query.get(goodsId).then(function (goods) {
		// 	// console.log(goods);
		// 	that.setData({
		// 		goods: goods
		// 	});
		// // 成功获得实例
		// }, function (error) {
		// // 异常处理
		// });
	},
	addCart: function() {
		var that = this;
		// add cart
		// var user = AV.User.current();
		// search if this goods exsit or not.if did exsit then quantity ++ updated cart object;
		// if not, create cart object
		// query cart
		// var query = new AV.Query('Cart');
		// query.equalTo('user', user);
		// query.equalTo('goods', that.data.goods);
		// // if count less then zero
		// query.count().then(function (count) {
		// 	if (count <= 0) {
		// 		// if didn't exsit, then create new one
		// 		var cart = AV.Object('Cart');
		// 		cart.set('user', user);
		// 		cart.set('quantity', 1);
		// 		cart.set('goods', that.data.goods);
		// 		cart.save().then(function(cart){
		// 			that.showCartToast();
		// 		},function(error) {
		// 			console.log(error);
		// 		});
		// 	} else {
		// 		// if exsit, get the cart self
		// 		query.first().then(function(cart){
		// 			// update quantity
		// 			cart.increment('quantity', 1);
		// 			// atom operation
		// 			// cart.fetchWhenSave(true);
		// 			that.showCartToast();
		// 			return cart.save();
		// 		}, function (error) {
		// 			console.log(error);
		// 		});
		// 	}
		// }, function (error) {

		// });

	},
	showCartToast: function () {
		wx.showToast({
			title: '已加入购物车',
			icon: 'success',
			duration: 1000
		});
		wx.navigateTo({
			url: '../../../../../../cart/cart'
		});

	},
	previewImage: function (e) {
		wx.previewImage({
			//从<image>的data-current取到current，得到String类型的url路径
			current: this.data.goods.get('images')[parseInt(e.currentTarget.dataset.current)],
			urls: this.data.goods.get('images') // 需要预览的图片http链接列表
		})
	},
	/* 毫秒级倒计时 */
 count_down:function() {
 	var that=this;
  	// 渲染倒计时时钟
  	that.setData({
  		clock:that.date_format(that.data.total_micro_second)
  	});
  	if (that.data.total_micro_second <= 0) {
  		that.setData({
  			clock:"已经截止"
  		});
  		// timeout则跳出递归
  		return ;
  	}    
  	setTimeout(function(){
    	// 放在最后--
		that.data.total_micro_second -= 1;
		that.count_down();
	}
	,1000)
},

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
 date_format:function(micro_second) {
 	var that = this
  	// 秒数
  	var second = Math.floor(micro_second );
  	// 小时位
  	var hr = Math.floor(second / 3600);
  	// 分钟位
  	var min =that.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  	// 秒位
	var sec = that.fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
	// 毫秒位，保留2位
	var micro_sec = that.fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
	return  min + ":" + sec ;
},

// 位数不足补零
 fill_zero_prefix:function(num) {
	return num < 10 ? "0" + num : num
},
pay_order: function(e) {
	var that = this;
	var data = e.currentTarget.dataset;
	var order_num = data.order_num;
	var pay_type = parseInt(data.pay_type);
	console.log(order_num)
	console.log(pay_type)
 	youyan.orderPay.call(that,config.apiList.orderPay,order_num,pay_type);
 }

});