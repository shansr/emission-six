// pages/vehicle/vehicle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myVehicles:[],
    authVehicles:[],
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisCtx = this
    var userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: 'http://localhost:8080/vehicle/getByOwner/' + userInfo.id,
      success: function (e) {
        //console.log(e.data.message)
        if (e.data.code == 1) {
          thisCtx.setData({
            myVehicles: e.data.message
          })
        }
      }
    })
    wx.request({
      url: 'http://localhost:8080/vehicle/getByAuth/' + userInfo.id,
      success: function (e) {
        if (e.data.code == 1) {
          thisCtx.setData({
            authVehicles: e.data.message
          })
        }
      }
    })
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
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  },
  vehicleItemClick(e){
    console.log(e)
    wx.navigateTo({
      url: './details/details?vin='+ e.currentTarget.dataset.vehicle.vin,
    })
  }
})