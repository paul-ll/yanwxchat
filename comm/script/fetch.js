var config = require('./config.js')
var message = require('../../component/message/message')
var amapFile = require('../../dist/amap-wx.js')
var util = require('../../util/util')
var app = getApp()
var WxParse = require('../../dist/wxParse');
//获取城市活动
  function search_list(url,site,page,pageLen,cate){
       var that = this
   
    var objlist=[];
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { site: site,page:page,pageLen:pageLen,cate:cate}), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data)
        for (var obj  of res.data.data){
          objlist.push(obj) 
      }
      console.log(objlist)
       // that.setData({
       //      films:objlist,
       //      showLoading: false,
       //      hasMore: false,
       //    })

      }
    })
  }
// 登录
  function loginByPhone(url,login,password){
     var that = this
   
    var objlist=[];
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form({ 
        login: login,
        password:password
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data)
       wx.setStorageSync('user', res.data);//存储userInfo
       wx.setStorageSync('uid', res.data.data.uid);//存储uid
       wx.setStorageSync('suid', res.data.data.uid);//存储suid

  
 
   wx.navigateBack(); 

      }
    })
  }

  // 发送验证码
 function sendSmsCode(url,phone){
    var that = this
   
  
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form({ 
        phone: phone
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data)
       
       that.setData({
           code_id:res.data.data.session_id
          })

      }
    })
 }

 // 注册
function doRegister(url,phone,reg_code,password,code_id){
    var that = this
    wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form({ 
        phone: phone,
        reg_code: reg_code,
        password: password,
        code_id: code_id
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){

     wx.setStorageSync('user', res.data);//存储userInfo
       wx.setStorageSync('uid', res.data.data.uid);//存储uid
       wx.setStorageSync('suid', res.data.data.uid);//存储suid
   wx.navigateBack(); 

      }
    })

}

// 第三方授权方式注册和登录
function loginByThird(url,platform,openid,access_token){
  var that = this
    wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form({ 
        platform: platform,
        openid: openid,
        access_token: access_token
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data)
       
       // that.setData({
       //      films:objlist,
       //      showLoading: false,
       //      hasMore: false,
       //    })

      }
    })
  
}

//获取城市
  function city1(url){
    var id = [];
    var city=[];
    var that = this
     wx.request({
        url: url,
      method: 'GET', 
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
     
      for (var obj  of res.data.data){
       
          city.push(obj.name) 
          id.push(obj.id)
      }
        that.setData({
            citys:city,
            cityId:id
          })
      }
     })
  }
// 主页--城市列表
  function getCityList(url){
          var that = this
    var listName = [];
    
     wx.request({
        url: url,
      method: 'GET', 

      success: function(res){
        wx.setStorageSync('cityList', res.data.data.city);//存储城市列表  
      that.setData({
        getCityList:res.data.data.city,
      })
      }
    })
  }


  // 主页--轮播图、活动分类
    function getCategory(url,area_id){
      var that = this
      var listName = [];
      
       wx.request({
          url: url,
        method: 'GET', 
        data:{area_id: area_id},
        success: function(res){
        console.log(res.data.data)
        that.setData({
          bannerList:res.data.data,
           showLoading: false,
            hasMore: false,
        })
        }
      })

    }


    // 主页--精选列表
    function getConcentration(url,area_id,p,pcount){
      var that = this
      var listName ;
      var lat = [] ;
      var lon = [];
      var orlat;
      var orlon;
      var disarr=[];
       
      var myAmapFun = new amapFile.AMapWX({key:'b615b3f4ff1e35e90835dc07ad211c34'});
       wx.request({
          url: url,
        method: 'GET', 
        data:({
          area_id: area_id,
          p:p,
          pcount:pcount
        }),
        success: function(res){

       if(res.data.data.selection.length > 0){
       var eventList = [];
          console.log(that.data.eventList)
           
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
        that.data.isFromSearch ? eventList=res.data.data.selection : eventList=that.data.eventList.concat(res.data.data.selection)  
        console.log(eventList)
         listName = eventList;
        for(var i =0;i<listName.length;i++){
          lat.push(listName[i].lat);
          lon.push(listName[i].lon)

        }
         myAmapFun.getRegeo({
        success: function(data){
           
          console.log(data)
          orlat = data[0].latitude;
          orlon = data[0].longitude;
          for(var k=0;k<lat.length;k++){
           that.GetDistance(orlat,orlon,lat[k],lon[k]);
           disarr.push(that.GetDistance(orlat,orlon,lat[k],lon[k]))

        }
        console.log(disarr)
        that.setData({
          distance:disarr
         })
        },
        fail: function(info){
          wx.showModal({title:info.errMsg})
        }
      })
        
      //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
        that.setData({
          eventList:eventList,
          lat:lat,
          lon:lon,
          showLoading: false,
          hasMore: false,
          searchLoading: false   //把"上拉加载"的变量设为false，显示 
        })
     }else{  
            that.setData({  
              searchLoadingComplete: true, //把“没有数据”设为true，显示  
              searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
            });  
          }  
        }
      })
    }



/*根据版本号获取城市列表*/
      function getAreaList(url,version){
           var that = this
    var listName = [];
    
     wx.request({
        url: url,
      method: 'GET', 
      data: { version: version }, 
      header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-type": "application/json",
      "system" : "android",
      "version" : "3.0"
      },
      success: function(res){
      
      that.setData({
        cityStr :res.data.data.area
      })
      }
    })
   }

  //活动详情页
  function getEventDetail(url,event_id){
    var that = this
    var listName = [];
       var collectArr;
        var arr_list=[];
     wx.request({
        url: url,
      method: 'GET', 
      data: { event_id: event_id }, 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        var uid = wx.getStorageSync('uid');
        console.log(res.data)

        if(res.data.error_code != 0){
            wx.showToast({
              title: res.data.error_msg,
              icon: 'loading',
              duration: 1000,
              success:function(){
                wx.navigateBack()
              }
            });

            
        }else{

        
          collectArr=res.data.data.collection;

        for(var i = 0;i<collectArr.user.length;i++){
            arr_list.push(collectArr.user[i].uid)
           if(collectArr.user[i].uid==uid){
              that.setData({
                collect:true
              })
           }
          }

    var now_date_time=util.getDate()+' '+util.getTime()
    var now_data=parseInt(that.js_strto_time(now_date_time));
    console.log(now_data)
    that.setData({
      now_date:now_data
    })

    // var event_start_date = res.data.data.event.start_date+' '+res.data.data.event.start_time
    //  var event_start_date_ticket=that.js_strto_time(event_start_date);
    // var event_end_date = res.data.data.event.end_date+' '+res.data.data.event.end_time
    //   var event_end_date_ticket=that.js_strto_time(event_end_date);
    //   console.log(event_start_date_ticket)
    //   console.log(event_end_date_ticket)

     
    //  wx.setStorage({
    //   key: 'eventHtml',
    //   data: res.data.data.event,
    //   success: function(res) {
    //     console.log(res)
    //   }
    // })
    //   wx.getStorage({
    //   //获取数据的key
    //   key: 'eventHtml',
    //   success: function(res) {
    //     console.log(res)
    //     var eventHtml =res.data; 
    //     console.log(eventHtml)
    //     var event_content = eventHtml.event_content;
    //     var event_notice = eventHtml.event_notice;
       
    //     var article = event_content
    //     var event_notice = event_notice
    //     WxParse.wxParse('article', 'html', article, that, 5);
    //     WxParse.wxParse('div', 'html', event_notice, that, 5);
    //        },
    //   /**
    //    * 失败会调用
    //    */
    //   fail: function(res) {
    //     console.log(res)
    //   }
    // })

      var event_content = res.data.data.event.event_content;
        var event_notice = res.data.data.event.event_notice;
       
        var article = event_content
        var event_notice = event_notice
        WxParse.wxParse('article', 'html', article, that, 5);
        WxParse.wxParse('div', 'html', event_notice, that, 5);

     
       that.setData({
            event_start_date:parseInt(res.data.data.event.start_date_time),
            event_end_date:parseInt(res.data.data.event.end_date_time),
            arr_uesr:arr_list,
            eventInfo:res.data.data,
            showLoading: false,
            hasMore: false,
           
          })
    
 
      }

      }
    })
   
  }

  // 所属分类活动列表
  function getCategoryDetailList(url,cid,area_id,p,pcount){
      var that = this
    var listName = [];
    
     wx.request({
        url: url,
      method: 'GET', 
      data: {
       cid: cid,
       area_id: area_id,
       p: p,
       pcount: pcount,
       }, 
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
       "Content-type": "application/json",
      },
      success: function(res){
         if(res.data.data.event.length > 0){
       
          var eventList = [];  
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
         that.data.isFromSearch ? eventList=res.data.data.event : eventList=that.data.eventList.concat(res.data.data.event)  
        console.log(eventList)
         that.setData({
          eventList:eventList,
          showLoading: false,
          hasMore: false,
          searchLoading: false   //把"上拉加载"的变量设为false，显示 
        })
     }else{  
            that.setData({  
              searchLoadingComplete: true, //把“没有数据”设为true，显示  
              searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
            });  
          }  

      
      // that.setData({
      //   cityStr :res.data.data.area
      // })
      }
    })
  }


  // 盐场-添加收藏
   function addCollection(url,sid,uid,type){
        var that = this;
     
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { 
        
        uid:uid,
        sid: sid ,
        type:type
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data.data)
      
        }
      
     
     
    })

   }

   // 盐场-取消收藏
       function channelCollection(url,sid,uid,type){
        var that = this;
     
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { 
        
        uid:uid,
        sid: sid ,
        type:type
      }), 
      header: {
         "Content-Type":"application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data.data)
      
        }
    })

   }

   // 添加关注
  function doFollow(url,uid,suid){
    var that = this;
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { 
        uid:uid,
        suid: suid
      }), 
      header: {
        "Content-type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data.data)
        that.setData({
          follow:"取消关注"
        })
      
        }
    })

  }

  // 取消关注
  function unFollow(url,uid,suid){
    var that = this;
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { 
        uid:uid,
        suid: suid
      }), 
      header: {
        "Content-type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data.data)
        that.setData({
          follow:"关注+"
        })
      
        }
    })
  }


  // 获取用户关注列表
  function getFollowingList(url,suid,p,pcount){
     var that = this
    var listName = [];
    
     wx.request({
        url: url,
      method: 'GET', 
      data: {
       suid: suid,
       p: p,
       pcount: pcount,
       }, 
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
       "Content-type": "application/json",
      },
      success: function(res){
      console.log(res.data.data.following)

      if(res.data.data.following.length > 0){  
        var followList = [];  
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
        that.data.isFromSearch ? followList=res.data.data.following : followList=that.data.following.concat(res.data.data.following)  
        console.log(followList)
        that.setData({  
          following:followList,
          searchLoading: false   //把"上拉加载"的变量设为false，显示 
        });  
      //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
      }else{  
        that.setData({  
          searchLoadingComplete: true, //把“没有数据”设为true，显示  
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
        });  
      }  



     
      }
    })

  }

  // 获取用户粉丝列表
    function getFollowerList(url,suid,p,pcount){
      var that = this
    var listName = [];
    
     wx.request({
        url: url,
      method: 'GET', 
      data: {
       suid: suid,
       p: p,
       pcount: pcount,
       }, 
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
       "Content-type": "application/json",
      },
      success: function(res){
      console.log(res.data.data.follower)
       if(res.data.data.follower.length > 0){  
        var followingList = [];  
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
        that.data.isFromSearch ? followingList=res.data.data.follower : followingList=that.data.follower.concat(res.data.data.follower)  
        console.log(followingList)
        that.setData({  
          follower:followingList,
          searchLoading: false   //把"上拉加载"的变量设为false，显示 
        });  
      //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
      }else{  
        that.setData({  
          searchLoadingComplete: true, //把“没有数据”设为true，显示  
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
        });  
      }  





     
      }
    })
    }

    // 获取活动场次和票种
     function getGamesTicket(url,event_id){
         var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'GET', 
      data: ({ 
        event_id: event_id 
      }), 
       header: {
        "Content-Type": "application/x-www-form-urlencoded",
       "Content-type": "application/json",
       "system" : "android",
       "version" : "2.0"
      },
      success: function(res){
        var today = new Date();//当前时间 
        var y=[] ;//年  
        var mon=[] ;//月  
        var d=[] ;//日  
        var s=[];
        var arr_date=[];
        
        var data_arr=res.data.data.date;
        for(var i=0;i<data_arr.length;i++){
            y.push(data_arr[i].year);
             mon.push(data_arr[i].month);
            d.push(data_arr[i].day);
        }
        for(var j=0;j<y.length;j++){
          s.push(y[j]+'-'+that.p(mon[j]))  
        }
        for(var k=0;k<d.length;k++){

            for(var n=0;n<d[k].length;n++){
              arr_date.push(s[k]+'-'+that.p(d[k][n]))
            }
           
          }
      var mon_num=parseInt(that.p(mon[0]));
      var year_num = parseInt(y[0]);

 var now_time = new Date(arr_date[0]);//星期 
 var u = now_time.getDay()
       that.setData({
            option_date:arr_date,
            selectedDate:arr_date[0],
            curMonth: mon_num,
            curYear:year_num,
            selectedWeek: that.data.weekArr[u],
            showLoading: false,
             showContent: true
          })

         
       that.getDateList(y[0],mon[0]-1);


  var first_monday  = arr_date[0];





  var stringTime = first_monday;
  var timestamp2 = Date.parse(new Date(stringTime));
  timestamp2 = timestamp2 / 1000;

     getGamesTicketByDate.call(that, config.apiList.getGamesTicketByDate,that.data.event_id,timestamp2)


     
      }
    })
     }

  // 根据日期获取场次和票种
  function getGamesTicketByDate(url,event_id,date){
       var that = this
    var listName = [];
       var collectArr;
        var arr_list=[];
     wx.request({
        url: url,
      method: 'GET', 
      data: { 
        event_id: event_id,
        date: date 
      }, 
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-type": "application/json"
      },
      success: function(res){
      console.log(res.data.data);
      if(res.data.data != undefined){
         console.log(res.data.data.games[0].games_id);
      wx.setStorageSync('games_id',res.data.data.games[0].games_id);
        that.setData({
          time:res.data.data.games,
          games_id:res.data.data.games[0].games_id
        })

getTicketByGames.call(that, config.apiList.getTicketByGames,event_id,res.data.data.games[0].games_id)


      }
     
      }
    })
  }
/*根据场次ID获取票种列表*/
  function getTicketByGames(url,event_id,games_id){
      var that = this
    var listName = [];
       var collectArr;
        var arr_list=[];
      wx.request({
        url: url,
      method: 'GET', 
      data: { 
        event_id: event_id,
        games_id: games_id 
      }, 
      success: function(res){
       console.log(res.data.data);
      for(var i=0;i<res.data.data.ticket.length;i++){
          listName.push(0);
       }
      for(var n=0;n<res.data.data.ticket;n++){
          arr_list.push(a);
        }
       that.setData({
          carts:listName,
          ticketIndex:arr_list,
          tickets:res.data.data.ticket
      
        })
      
 
      }
    })

  }

  // 获取活动取票方式
  function getTicketDelivery(url,event_id,uid){
    var that = this
    var money = '';
      wx.request({
        url: url,
      method: 'GET', 
      data: { 
        event_id: event_id,
        uid: uid 
      }, 
      success: function(res){
       console.log(res.data.data);
        money = parseFloat(that.data.total)+parseFloat(res.data.data.postage)
       that.setData({
          ticket_arr:res.data.data,
          postage:parseFloat(res.data.data.postage),
          address_arr:res.data.data.address
        })
       if(res.data.data.examine_ticket_type ==2){
          that.setData({
            ship_type:'快递配送',
            all_num:money,
          })
       }else{
         that.setData({
            all_num:that.data.total,
            postage:0
          })
       }

       if (typeof res.data.data.address === "object" && !(res.data.data.address instanceof Array)){  
    var hasProp = false;  
    for (var prop in res.data.data.address){  
        hasProp = true;  
        break;  
    }  
    if (hasProp){  
        res.data.data.address = [res.data.data.address];  
        that.setData({
          empty_address:false
        })
    }else{  
        that.setData({
          empty_address:true
        })
 
    }  
}  


      }
    })
  }


  // 提交订单
  function submitOrder(url,event_id,uid,games_id,event_name,event_address,date,start_time,end_time,num,total,freight,discount,disbursements,ticket,examine_type,consignee,contact_phone,shipping_address,pay_type){
       var that = this
   message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: ({ 
        event_id: event_id ,
        uid:uid,
        games_id: games_id ,
        event_name:event_name,
        event_address: event_address ,
        date:date,
        start_time: start_time ,
        end_time:end_time,
        num: num ,
        total:total,
        freight: freight ,
        discount:discount,
        disbursements: disbursements ,
        ticket:ticket,
        examine_type: examine_type ,
        consignee:consignee,
        contact_phone: contact_phone ,
        shipping_address:shipping_address,
        pay_type:pay_type
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res)
        var obj = res.data.data;
        var d = app.globalData;
        console.log(d.appid)

        wx.login({
      success: function(res) {
        if (res.code) {
          console.log(res.code)
          //发起网络请求
      //    wx.requestPayment({
      //     'appId' : d.appid,
      //     'timeStamp': (obj.timestamp).toString(),
      //     'nonceStr': obj.noncestr,
      //     'package': 'prepay_id='+obj.prepayid,
      //     'signType': 'MD5',
      //     'paySign': obj.sign,
      //   'success':function(res){
      //     console.log(res);
      //     console.log('success');
      //   },
      //   'fail':function(res){
      //     console.log(res);
      //     console.log('fail');
      //   },
      //   'complete': function(res){
      //     console.log(res);console.log('complete');
      //   }
      // });

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });


        

      }
    })
    
  }


// 支付订单
function orderPay(url,order_num,pay_type){
  var that = this
  // message.hide.call(that)
  //    wx.request({
  //       url: url,
  //     method: 'POST', 
  //     data: util.json2Form({ 
  //       order_num: order_num,
  //       pay_type:pay_type
  //     }), 
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     success: function(res){
  //       console.log(res.data.data)
  //      // that.setData({
  //      //      filmDetail:res.data.data,
  //      //      showLoading: false,
  //      //       showContent: true
  //      //    })
  //       wx.stopPullDownRefresh()
  //     typeof cb == 'function' && cb(res.data)
  //     }
  //   })
    
}

//通过id获取活动详情
  function getActiveinfo(url,id,site,cb){
    var that = this
   message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { site: site ,id:id}), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data.data)
       that.setData({
            filmDetail:res.data.data,
            showLoading: false,
             showContent: true
          })
        wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
      }
    })
     console.log(this.data.filmDetail)
  }

//通过分类来获取相应城市活动
  function getClass_active(url,cate,site,page,pageLen){
    var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { 
        site: site ,
        id:id,
        cate:cate,
        page:page,
        pageLen:pageLen
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data.data)
       // that.setData({
       //      filmDetail:res.data.data,
       //      showLoading: false,
       //       showContent: true
       //    })
     
      }
    })
     console.log(this.data.filmDetail)
  }

// 个人主页--获取用户参与活动列表
  function getEventList(url,suid,p){
     var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'GET', 
      data: ({ 
        suid: suid ,
        p:p
      }), 
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function(res){
        console.log(res.data.data)
       that.setData({
            data_arr:res.data.data.event,
            showLoading: false,
             showContent: true
          })
     
      }
    })
  }
 // 个人主页--获取用户参与盐场列表
function getFeedList(url,suid,p){
   var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'GET', 
      data: ({ 
        suid: suid ,
        p:p
      }), 
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function(res){
        console.log(res.data.data)
       that.setData({
            feedlist_arr:res.data.data.feed,
            showLoading: false,
             showContent: true
          })
     
      }
    })
}

// 获取用户收货地址列表
function getAddressList(url,uid){
      var arr=[]
      var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'GET', 
      data: ({ 
        uid: uid 
      }), 
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function(res){
        console.log(res.data.data.address)
        for(var i=0;i<res.data.data.address.length;i++){
          arr.push(res.data.data.address[i].is_default);
        }
        console.log(arr)
       that.setData({
            address_arr:res.data.data.address,
            showLoading: false,
             showContent: true,
             index_id:arr
          })
     
      }
    })
}

 // 添加收货地址
  function addAddress(url,uid,name,phone,area_id,address){
           var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { 
        uid: uid ,
        name:name,
        phone:phone,
        area_id:area_id,
        address:address
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data.data)
       // that.setData({
       //      filmDetail:res.data.data,
       //      showLoading: false,
       //       showContent: true
       //    })
     
      }
    })
  }


// 设置默认收货地址
function setDefaultAddress(url,id,uid){
     var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { 
        id:id,
        uid: uid ,
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
     
        // 设置成功提示
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 2000
        });
     
      }
    })
  }
  // 删除我的收货地址
   function deleteAddress(url,id,uid){
      var that = this;
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { 
        id:id,
        uid: uid,
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
     // 删除成功提示
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            });
       
     
      }
    })
   }


  // 我的订单列表
   function orderList(url,uid,p,pcount){
        var that = this
        var order_arr=[];
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'GET', 
      data: ({ 
        uid: uid ,
        p:p,
        pcount:pcount
      }), 
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function(res){

       
      if(res.data.data.order.length > 0){  
        var searchList = [];  
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
        that.data.isFromSearch ? searchList=res.data.data.order : searchList=that.data.orders.concat(res.data.data.order)  
        console.log(searchList)
        that.setData({  
          orders:searchList,
          searchLoading: false   //把"上拉加载"的变量设为false，显示 
        });  
      //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
      }else{  
        that.setData({  
          searchLoadingComplete: true, //把“没有数据”设为true，显示  
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
        });  
      }  






        console.log(res.data.data)
      
     
      }
    })
   }

   // 订单详情
    function orderDetail(url,order_id){
      var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'GET', 
      data: ({ 
        order_id: order_id 
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
       console.log(res.data.data)
       console.log(parseInt(res.data.data.order.expire)-parseInt(res.data.data.order.now))
       that.setData({
            total_micro_second:parseInt(res.data.data.order.expire)-parseInt(res.data.data.order.now),
            goods:res.data.data,
            showLoading: false,
             showContent: true
          })
       that.count_down();
        wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
     
      }
    })

      }


// 我的票夹列表【未使用】
      function getUnusedTicketList(url,uid,p,pcount){
         var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'GET', 
      data: ({ 
        uid: uid ,
        p:p,
        pcount:pcount
      }), 
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function(res){
        if(res.data.data.ticket.length > 0){  
        var searchList = [];  
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
        that.data.isFromSearch ? searchList=res.data.data.ticket : searchList=that.data.film_favorite.concat(res.data.data.ticket)  
        that.setData({  
          film_favorite:searchList,
            showLoading: false,
             showContent: true,
          searchLoading: false   //把"上拉加载"的变量设为false，显示 
        });  
      //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
      }else{  
        that.setData({  
          searchLoadingComplete: true, //把“没有数据”设为true，显示  
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
        });  
      }  




     
      }
    })
      }

// 我的票夹列表【已使用】
    function getUsedTicketList(url,uid,up,upcount){
    var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'GET', 
      data: ({ 
        uid: uid ,
        up:up,
        upcount:upcount
      }), 
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function(res){
        console.log(res.data.data)
        if(res.data.data.ticket.length > 0){  
        var searchList = [];  
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
        that.data.isFromSearch ? searchList=res.data.data.ticket : searchList=that.data.film_favorite.concat(res.data.data.ticket)  
        that.setData({  
          film_favorite:searchList,
            showLoading: false,
             showContent: true,
          searchLoading: false   //把"上拉加载"的变量设为false，显示 
        });  
      //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
      }else{  
        that.setData({  
          usearchLoadingComplete: true, //把“没有数据”设为true，显示  
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
        });  
      }  


       that.setData({
            person_favorite:res.data.data,
            showLoading: false,
             showContent: true
          })
     
      }
    })
    }

  // 获取我的电子票详情
    function getTicketDetail (url,ticket_id){
    var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'GET', 
      data: ({ 
        ticket_id: ticket_id 
      }), 
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function(res){
        console.log(res.data.data)
       that.setData({
            getTicketDetail:res.data.data,
            showLoading: false,
             showContent: true
          })
     
      }
    })
    }


    // 我的收藏
    function getCollection(url,uid,type,p,pcount){
       var that = this
    message.hide.call(that)
     wx.request({
      url: url,
      method: 'GET', 
      data: ({ 
        uid:uid,
        type:type,
        p:p,
        pcount: pcount 
      }), 
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function(res){
        console.log(res.data.data)
       that.setData({
            collection:res.data.data,
            showLoading: false,
             showContent: true
          })
     
      }
    })

    }


// 个人主页--获取用户基本资料
   function getUserProfile(url,uid,suid){
       var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'GET', 
      data: ({ 
        uid: uid ,
        suid: suid
      }), 
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function(res){
        console.log(res.data.data)
        if(res.data.data !=undefined){
          if(res.data.data.follow_status=='0'){
            that.setData({
              follow:'关注+'
            })
          }else{
            that.setData({
              follow:'取消关注'
            })
          }
        }
        

       that.setData({
            myInfo_arr:res.data.data,
            showLoading: false,
             showContent: true
          })
     
      }
    })
   }


   // 修改收货地址
  function modifyAddress(url,id,uid,name,phone,area_id,address){
        var that = this
    message.hide.call(that)
     wx.request({
        url: url,
      method: 'POST', 
      data: util.json2Form( { 
         id:id,
        uid: uid ,
        name:name,
        phone:phone,
        area_id:area_id,
        address:address
      }), 
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        console.log(res.data.data)
       // that.setData({
       //      filmDetail:res.data.data,
       //      showLoading: false,
       //       showContent: true
       //    })
     
      }
    })
  
  }


// 活动搜索
function Event(url, search_key){
  var that = this
  message.hide.call(that)
  var url = decodeURIComponent(url)

    wx.request({
      url: url,
      data: {
      search_key:search_key
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        console.log(res.data.data)
        
        wx.setStorageSync('search_event', res.data.data.event);//存储搜索活动
         wx.setNavigationBarTitle({
              title: search_key
          })
        // if(res.data.subjects.length === 0){
        //   that.setData({
        //     hasMore: false,
        //     showLoading: false
        //   })
        // }else{
        //   that.setData({
        //     films: that.data.films.concat(res.data.subjects),
        //     start: that.data.start + res.data.subjects.length,
        //     showLoading: false
        //   })
        //   wx.setNavigationBarTitle({
        //       title: keyword
        //   })
        // }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
      }
    })
  
}


// 用户搜索
function User(url, search_key){
    var that = this
  message.hide.call(that)
  var url = decodeURIComponent(url)
 
    wx.request({
      url: url,
      data: {
       search_key:search_key
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        console.log(res.data)
        wx.setStorageSync('search_user', res.data.data.user);//存储搜索用户
         
        // if(res.data.subjects.length === 0){
        //   that.setData({
        //     hasMore: false,
        //     showLoading: false
        //   })
        // }else{
        //   that.setData({
        //     films: that.data.films.concat(res.data.subjects),
        //     start: that.data.start + res.data.subjects.length,
        //     showLoading: false
        //   })
        //   wx.setNavigationBarTitle({
        //       title: keyword
        //   })
        // }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
      }
    })
  
}
// 搜索（关键词或者类型）
function search(url, keyword, start, count, cb){
  var that = this
  message.hide.call(that)
  var url = decodeURIComponent(url)
  if (that.data.hasMore) {
    wx.request({
      url: url + keyword,
      data: {
        start: start,
        count: count
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        if(res.data.subjects.length === 0){
          that.setData({
            hasMore: false,
            showLoading: false
          })
        }else{
          that.setData({
            films: that.data.films.concat(res.data.subjects),
            start: that.data.start + res.data.subjects.length,
            showLoading: false
          })
          wx.setNavigationBarTitle({
              title: keyword
          })
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
      }
    })
  }
}


module.exports = {
  getEventList:getEventList,
  getClass_active:getClass_active,
  getActiveinfo:getActiveinfo,
  search_list:search_list,
  getEventDetail:getEventDetail,
  city1:city1,
  modifyAddress:modifyAddress,
  getFeedList:getFeedList,
  getAddressList:getAddressList,
  getUserProfile:getUserProfile,
  setDefaultAddress:setDefaultAddress,
  getAreaList:getAreaList,
  addAddress:addAddress,
  deleteAddress:deleteAddress,
  orderList:orderList,
  orderDetail:orderDetail,
  getUnusedTicketList:getUnusedTicketList,
  getUsedTicketList:getUsedTicketList,
  getTicketDetail:getTicketDetail,
  getCollection:getCollection,
  getCityList:getCityList,
  getCategory:getCategory,
  getConcentration:getConcentration,
  addCollection:addCollection,
  channelCollection:channelCollection,
  getGamesTicket:getGamesTicket,
  getGamesTicketByDate:getGamesTicketByDate,
  getTicketByGames:getTicketByGames,
  getTicketDelivery:getTicketDelivery,
  submitOrder:submitOrder,
  loginByPhone:loginByPhone,
  sendSmsCode:sendSmsCode,
  doRegister:doRegister,
  loginByThird:loginByThird,
  orderPay:orderPay,
  Event:Event,
  User:User,
  doFollow:doFollow,
  unFollow:unFollow,
  getCategoryDetailList:getCategoryDetailList,
  getFollowingList:getFollowingList,
  getFollowerList:getFollowerList,



  // fetchFilms: fetchFilms,
  // fetchFilmDetail: fetchFilmDetail,
 // fetchPersonDetail: fetchPersonDetail,
  search: search
}