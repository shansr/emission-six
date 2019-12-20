//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    functions: [{
      title: '车辆',
      subtitle: '您名下所有车辆，掌握爱车信息',
      image: '../../images/ic_vehicle.png',
      url: '../../pages/vehicle/vehicle'
    }, {
      title: '里程统计',
      subtitle: '日里程统计，掌握您爱车的运营状况',
      image: '../../images/ic_distance.png',
        url: '../../pages/statics/distance/distance'
    },
    {
      title: '油耗统计',
      subtitle: '日油耗统计，掌握爱车油耗，经济省钱',
      image: '../../images/ic_fuel.png',
      url: '../../pages/statics/fuelConsumption/fuelConsumption'
    },
    {
      title: '速度统计',
      subtitle: '日均速度统计，掌握您的驾驶行为',
      image: '../../images/ic_speed.png',
      url: '../../pages/statics/speed/speed'
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  faultClick: function () {
    //console.log("Hello")
   
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        wx.navigateTo({
          url: '../../pages/obd/obd'
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '您未登录，请先登录',
          icon: 'none'
        })
      }
    })
  },
  monitorClick: function () {
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        wx.navigateTo({
          url: '../../pages/monitor/monitor'
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '您未登录，请先登录',
          icon: 'none'
        })
      }
    })
    
  },
  functionItemClick(e) {
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '您未登录，请先登录',
          icon: 'none'
        })
      }
    })
  }
})