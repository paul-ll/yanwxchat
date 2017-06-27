var youyan = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
    data: {
    	activeIndex: 0,
    	ticketIndex:[],
    	games_id:'',
    	num:0,
		cate:'',
        filmDetail: {},
        carts: [],
        tickets:[],
        showLoading: true,
		showContent: false,
		site_city:'',
		image:'',
		name:'',
		start_date:'',
		bg:false,
		event_id:'',
		option_date:[],
		address:'',
		active_id:'',
		selectedDate: '',//选中的几月几号
	    selectedWeek: '',//选中的星期几
	    curYear: 2016,//当前年份
	    curMonth: 3,//当前月份
	    daysCountArr: [// 保存各个月份的长度，平年
	      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
	    ],
	    weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	    dateList: [],
	    open:false,
	    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
	    total: 0.00,
	    page:0,
	    time:[]
    },
    onLoad: function(options) {
        var that = this
        var event_id = options.event_id;
        var image = options.image;
        var name = options.name;
        var date = options.date;
        var address = options.address;

		var games_id = wx.getStorageSync('games_id');
		console.log(games_id)
		that.setData({
			games_id:games_id,
			image:image,
			event_id:event_id,
			name:name,
			start_date:date,
			address:address
		})
		
    },
    timeChange: function (e) {
	var that = this;
    var index = e.currentTarget.dataset.index;
    var games_id = e.currentTarget.dataset.games_id;
    var id = e.currentTarget.id
    that.setData({
    	games_id:games_id,
      	activeIndex: index,
      	carts:[]
    });
    youyan.getTicketByGames.call(that, config.apiList.getTicketByGames,that.data.event_id,games_id)
  	console.log(that.data.carts)
  	 that.sum();
  },
	ticketChange:function (e) {
	var that = this;
    var index = e.currentTarget.dataset.index;
    var games_id = e.currentTarget.dataset.games_id;
    var ticket_id = e.currentTarget.dataset.ticket_id;
  
    // var id = e.target.dataset.id
    var id = e.currentTarget.id
    var cart = that.data.carts
    var price_num = that.data.carts[index];
    var ticketIndexs = that.data.ticketIndex

    if(price_num > 0){
    	cart[index]=0;
    	ticketIndexs[index] ='a';
    	that.setData({
	    	carts: cart,
	    	ticketIndex: ticketIndexs
	    });
    }else{
    	cart[index]=1;
    	ticketIndexs[index] =index;
    	that.setData({
	    	carts: cart,
	    	ticketIndex: ticketIndexs
	    });
    }


   that.sum();
  },
	onPullDownRefresh: function() {
		var data = {
			id: this.data.filmDetail.id
		}
		this.onShow();
	},
	
	onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  
  
	onShow: function () {
		var that = this;
		
		youyan.getGamesTicket.call(that, config.apiList.getGamesTicket,that.data.event_id);
		// youyan.getTicketByGames.call(that, config.apiList.getTicketByGames,that.data.event_id,that.data.games_id);
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  getDateList: function (y, mon) {
    var vm = this;
    //如果是否闰年，则2月是29日
    var daysCountArr = this.data.daysCountArr;
     var date_option=vm.data.option_date;
     console.log(date_option)
     console.log(daysCountArr)
    if (y % 4 == 0 && y % 100 != 0) {
      this.data.daysCountArr[1] = 29;
      this.setData({
        daysCountArr: daysCountArr
      });
    }
    //第几个月；下标从0开始实际月份还要再+1  
    var dateList = [];
    // console.log('本月', vm.data.daysCountArr[mon], '天');
    dateList[0] = [];
    var weekIndex = 0;//第几个星期
    for (var i = 0; i < vm.data.daysCountArr[mon]; i++) {
      var week = new Date(y + '-' + vm.p(mon + 1) + '-' + vm.p(i + 1)).getDay();
      dateList[weekIndex].push({
        value: y + '-' + vm.p(mon + 1) + '-' + vm.p(i + 1),
        date: vm.p(i + 1),
        week: week,
        bg:false
      });

      for(var t=0;t<dateList[weekIndex].length;t++){
      	console.log(dateList[weekIndex].length)
      	for(var h=0;h<date_option.length;h++){
	      	if(dateList[weekIndex][t].value==date_option[h]){
	      		console.log(dateList[weekIndex][t])
	      		dateList[weekIndex][t].bg=true;
	      		}
	      	}
      	}

      if (week == 0) {
        weekIndex++;
        dateList[weekIndex] = [];
      }

      	
    }
    vm.setData({
      dateList: dateList
    });

    
  },
  selectDate: function (e) {

  	
    var vm = this;
    var date_ul = vm.data.dateList;
    var event_id =vm.data.event_id;
    var date_arr=vm.data.option_date;
    console.log(date_arr)
    for(var i=0;i<date_arr.length;i++){
    	if(date_arr[i]==e.currentTarget.dataset.date.value){
    		 vm.setData({
		      selectedDate: e.currentTarget.dataset.date.value,
		      selectedWeek: vm.data.weekArr[e.currentTarget.dataset.date.week],
		     carts:[]
		    });
    	}
    }


  
var stringTime = e.currentTarget.dataset.date.value;
var timestamp2 = Date.parse(new Date(stringTime));
timestamp2 = timestamp2 / 1000;

console.log(stringTime + "的时间戳为：" + timestamp2);
    youyan.getGamesTicketByDate.call(vm, config.apiList.getGamesTicketByDate,event_id,timestamp2)
   var games_id=e.currentTarget.dataset.games_id
  // youyan.getTicketByGames.call(vm, config.apiList.getTicketByGames,event_id,games_id)
   	vm.sum();
  },
  preMonth: function () {
    // 上个月
    var vm = this;
    var curYear = vm.data.curYear;
    var curMonth = vm.data.curMonth;
    curYear = curMonth - 1 ? curYear : curYear - 1;
    curMonth = curMonth - 1 ? curMonth - 1 : 12;
    // console.log('上个月', curYear, curMonth);
    vm.setData({
      curYear: curYear,
      curMonth: curMonth
    });

    vm.getDateList(curYear, curMonth - 1);
  },
  nextMonth: function () {
    // 下个月
    var vm = this;
    var curYear = vm.data.curYear;
    var curMonth = vm.data.curMonth;
    curYear = curMonth + 1 == 13 ? curYear + 1 : curYear;
    curMonth = curMonth + 1 == 13 ? 1 : curMonth + 1;
    // console.log('下个月', curYear, curMonth);
    vm.setData({
      curYear: curYear,
      curMonth: curMonth
    });

    vm.getDateList(curYear, curMonth - 1);
  },
   kindToggle: function (e) {
   		this.data.open = ! this.data.open
   		this.setData({
   			open:this.data.open
   		})
   },
  
   //购物车那一块
   bindMinus: function(e) {
   	var that= this
		
		var index = parseInt(e.currentTarget.dataset.index);
		var num = parseInt(this.data.carts[index]);
		 var ticketIndexs = that.data.ticketIndex
		// 自减
		if (num > 0) {
			num --;
		}

		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = that.data.carts;
		carts[index]=num;
		// 按钮可用状态
		var minusStatuses = that.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		if(num > 0){	
	    	ticketIndexs[index] =index;
	    	that.setData({
		    	ticketIndex: ticketIndexs
		    });
	    }else{
	    	ticketIndexs[index] ='a';
	    	that.setData({
		    	ticketIndex: ticketIndexs
		    });
	    }


		that.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
	
		that.sum();
	},
	bindPlus: function(e) {

		var that = this
		var limit_num = parseInt(e.currentTarget.dataset.limit_num)
		var index = parseInt(e.currentTarget.dataset.index);
		var num = parseInt(that.data.carts[index]);
		// 自增
		if(num<limit_num){
			num ++;
		}
		
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
 		var ticketIndexs = that.data.ticketIndex

		if(num > 0){	
	    	ticketIndexs[index] =index;
	    	that.setData({
		    	ticketIndex: ticketIndexs
		    });
	    }else{
	    	ticketIndexs[index] ='a';
	    	that.setData({
		    	ticketIndex: ticketIndexs
		    });
	    }
		// 购物车数据
		var carts = that.data.carts;
		carts[index]=num;
		console.log(carts)
		// 按钮可用状态
		var minusStatuses = that.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		that.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
	
		that.sum();
	},
	// bindManual: function(e) {
	// 	// var index = parseInt(e.currentTarget.dataset.index);
	// 	var add=this.data.filmDetail;
	// 	var num = e.detail.value;
	// 	add.price_high =num;
	// 	// carts[index].set('quantity', num);
	// 	// 将数值与状态写回
	// 	this.setData({
	// 		filmDetail: add
	// 	});
	
	// },
	// bindCheckbox: function(e) {
	// 	/*绑定点击事件，将checkbox样式改变为选中与非选中*/
	// 	//拿到下标值，以在carts作遍历指示用
	// 	var index = parseInt(e.currentTarget.dataset.index);
	// 	//原始的icon状态
	// 	var selected = this.data.carts[index].get('selected');
	// 	var carts = this.data.carts;
	// 	// 对勾选状态取反
	// 	carts[index].set('selected', !selected);
	// 	// 写回经点击修改后的数组
	// 	this.setData({
	// 		carts: carts,
	// 	});
	// 	// update database
	// 	carts[index].save();
	// 	this.sum();
	// },
	bindSelectAll: function() {
		// 环境中目前已选状态
		var selectedAllStatus = this.data.selectedAllStatus;
		// 取反操作
		selectedAllStatus = !selectedAllStatus;
		// 购物车数据，关键是处理selected值
		var carts = this.data.carts;
		// 遍历
		for (var i = 0; i < carts.length; i++) {
			carts[i].set('selected', selectedAllStatus);
			// update selected status to db
			carts[i].save();
		}
		this.setData({
			selectedAllStatus: selectedAllStatus,
			carts: carts,
		});
		this.sum();

	},
	 p:function(s) {
        return s < 10 ? '0' + s: s;
    },
	bindCheckout: function(e) {
		var that = this
		var tickets=e.currentTarget.dataset.tickets;
		var page = e.currentTarget.dataset.page;
		var time = e.currentTarget.dataset.start_date;
		var total = e.currentTarget.dataset.total;
		var image = e.currentTarget.dataset.image;
		var name = e.currentTarget.dataset.name;
		var address = e.currentTarget.dataset.address;
		var carts = e.currentTarget.dataset.carts;
		var event_id = e.currentTarget.dataset.event_id;
		for(var i = 0;i<tickets.length;i++){
			tickets[i].num = carts[i];
		}
		console.log(tickets)
		console.log(carts)
		console.log(total)

		var games_obj = that.data.time[that.data.activeIndex];
		wx.showToast({
			title: '立即购买',
			icon: 'success',
			duration: 1000
		});

		// var data = e.currentTarget.dataset;
		wx.redirectTo({
			url: "../order/order?tickets=" + JSON.stringify(tickets) +"&page="+page+"&total="+total+"&image="+image+"&name="+name+"&address="+address+"&carts="+ JSON.stringify(carts)+"&time="+time+"&event_id="+event_id+"&games_obj="+JSON.stringify(games_obj)
		})

	},
	sum: function() {
		var that = this;
		var carts=that.data.carts;
		var tickets = that.data.tickets;

		// 计算总金额
		var total = 0;
		var page = 0
		for (var i = 0; i < carts.length; i++) {
			
			total += parseFloat(carts[i] * tickets[i].current_price);
			page += parseFloat(carts[i]);
		}
		console.log(total)
		total = total.toFixed(2);
		// 写回经点击修改后的数组
		that.setData({
			page :page,
			total: total
		});
	}
})