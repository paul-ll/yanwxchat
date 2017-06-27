/*
备注
city: 城市（在程序载入时获取一次）
count: 返回结果数量
baiduAK: 百度地图AK
apiList: api列表
hotKeyword: 搜索页热门关键词关键词
hotTag: 搜索页热门类型
bannerList: 首页（热映页）轮播图列表列表
skinList: “我的”页面背景列表
shakeSound: 摇一摇音效地址（带url表示远程地址）
shakeWelcomeImg: 摇一摇欢迎图片
*/
var url = 'http://139.196.214.241:8093';
var base_url = 'https://hiyouyan.com/appapi/v3/'

module.exports = {
    city: '',
    count: 20,
    apiList: {
        popular: 'https://api.douban.com/v2/movie/in_theaters',
        coming: 'https://api.douban.com/v2/movie/coming_soon',
        top: 'https://api.douban.com/v2/movie/top250',
        search: {
            byKeyword: 'https://api.douban.com/v2/movie/search?q=', 
            byTag: 'https://api.douban.com/v2/movie/search?tag='
        },
        /*根据版本号获取城市列表*/
        getAreaList: base_url+'event/getAreaList',
        /*活动详情页*/
        getEventDetail: base_url+'event/getEventDetail',
        /*活动咨询页*/
        getQuestionList: base_url+'question/getQuestionList',
        /*活动收藏列表页*/
        getCollectionList: base_url+'collection/getCollectionList',
        /*选择活动场次和票种页面*/
        getGamesTicket: base_url+'event/getGamesTicket',
        /*根据日期获取场次和票种*/
        getGamesTicketByDate: base_url+'event/getGamesTicketByDate',
        /*根据场次ID获取票种列表*/
        getTicketByGames: base_url+'event/getTicketByGames',
        /*获取活动取票方式*/
        getTicketDelivery: base_url+'event/getTicketDelivery',
        // 个人主页--获取用户参与活动列表
        getEventList: base_url+'account/getEventList',
        // 个人主页--获取用户参与盐场列表
        getFeedList: base_url+'account/getFeedList',
        // 我的收货地址列表
        getAddressList: base_url+'account/getAddressList',
        // 个人主页--获取用户基本资料
        getUserProfile: base_url+'account/getUserProfile',
        // 设置默认收货地址
        setDefaultAddress: base_url+'account/setDefaultAddress',
        // 修改收货地址
        modifyAddress: base_url+'account/modifyAddress',
        // 添加收货地址
        addAddress: base_url+'account/addAddress',
        // 删除我的收货地址
        deleteAddress: base_url+'account/deleteAddress',
        // 我的订单列表
        orderList: base_url+'order/orderList',
        // 订单详情
        orderDetail: base_url+'order/orderDetail',
        // 我的票夹列表【未使用】
        getUnusedTicketList: base_url+'ticket/getUnusedTicketList',
        // 我的票夹列表【已使用】
        getUsedTicketList: base_url+'ticket/getUsedTicketList',
        // 获取我的电子票详情
        getTicketDetail: base_url+'ticket/getTicketDetail',
        // 我的收藏
        getCollection: base_url+'account/getCollection',
        // 主页--城市列表
        getCityList: base_url+'index/getCityList',
        // 主页--轮播图、活动分类
        getCategory: base_url+'index/getCategory',
        // 主页--精选列表
        getConcentration: base_url+'index/getConcentration',
        // 盐场-添加收藏
        addCollection: base_url+'feed/addCollection',
        // 盐场-取消收藏
        channelCollection: base_url+'feed/channelCollection',
        // 获取活动场次和票种
        getGamesTicket: base_url+'event/getGamesTicket',
        // 获取活动取票方式
        getTicketDelivery: base_url+'event/getTicketDelivery',
        // 提交订单
        submitOrder: base_url+'order/submitOrder',
        // 支付订单
        orderPay: base_url+'order/orderPay',
        // 活动搜索
        Event: base_url+'search/Event',
        // 用户搜索
        User: base_url+'search/User',
        // 登录
        loginByPhone: base_url+'passport/loginByPhone',
        // 发送验证码
        sendSmsCode: base_url+'passport/sendSmsCode',
        // 注册
        doRegister: base_url+'register/doRegister',
        // 第三方授权方式注册和登录
        loginByThird: base_url+'passport/loginByThird',
        // 添加关注
        doFollow: base_url+'follow/doFollow',
        // 取消关注
        unFollow: base_url+'follow/unFollow',
        // 获取用户关注列表
        getFollowingList: base_url+'follow/getFollowingList',
        // 获取用户粉丝列表
        getFollowerList: base_url+'follow/getFollowerList',
        // 所属分类活动列表
        getCategoryDetailList: base_url+'index/getCategoryDetailList',







        search_list: base_url+'https://iyouyan.com.cn/appapi/v2/act/search',
        active_info: base_url+'https://iyouyan.com.cn/appapi/v2/act/detail '
    },
    hotKeyword: ['有言','凤凰','领客' ],
    hotTag: ['动作', '喜剧', '爱情', '悬疑'],
    bannerList: [
        {type:'film', id: '26683290', imgUrl: url + '/cdn/images/banner_1.jpg'},
        {type:'film', id: '25793398', imgUrl: url + '/cdn/images/banner_2.jpg'},
        {type:'film', id: '26630781', imgUrl: url + '/cdn/images/banner_3.jpg'},
        {type:'film', id: '26415200', imgUrl: url + '/cdn/images/banner_4.jpg'},
        {type:'film', id: '3025375', imgUrl: url + '/cdn/images/banner_5.jpg'}
    ],
    skinList: [
        {title: '公路', imgUrl: url + '/cdn/images/user_bg_1.jpg'},
        {title: '黑夜森林', imgUrl: url + '/cdn/images/user_bg_2.jpg'},
        {title: '鱼与水', imgUrl: url + '/cdn/images/user_bg_3.jpg'},
        {title: '山之剪影', imgUrl: url + '/cdn/images/user_bg_4.jpg'},
        {title: '火山', imgUrl: url + '/cdn/images/user_bg_5.jpg'},
        {title: '科技', imgUrl: url + '/cdn/images/user_bg_6.jpg'},
        {title: '沙漠', imgUrl: url + '/cdn/images/user_bg_7.jpg'},
        {title: '叶子', imgUrl: url + '/cdn/images/user_bg_8.jpg'},
        {title: '早餐', imgUrl: url + '/cdn/images/user_bg_9.jpg'},
        {title: '英伦骑车', imgUrl: url + '/cdn/images/user_bg_10.jpg'},
        {title: '草原', imgUrl: url + '/cdn/images/user_bg_11.jpg'},
        {title: '城市', imgUrl: url + '/cdn/images/user_bg_12.jpg'}
    ],
    shakeSound: {
        startUrl: url + '/cdn/sound/shake.mp3',
        start: '',
        completeUrl: url + '/cdn/sound/shakeComplete.wav',
        complete: ''
    },
    shakeWelcomeImg: url + '/cdn/images/shake_welcome.png'
}