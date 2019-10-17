// pages/monitor/monitor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isListShow: false,
    latitude: 0,
    longitude: 0
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
    this.mapCtx = wx.createMapContext('myMap')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var thisApp = this
    wx.authorize({
      scope: 'scope.address',
      success: function (e) {
        console.log(e)
        wx.getLocation({
          success: function (res) {
            console.log(res)
            thisApp.setData({
              latitude: res.latitude,
              longitude: res.longitude
            })
          },
        })
      }
    })
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
  vehicleListClick() {
    this.setData({
      isListShow: !this.data.isListShow
    })
  },
  vehicleItemDetailsClick(e) {
    console.log(e)
  },
  vehicleItemMonitorClick(e){
    this.vehicleListClick()
    console.log(e)
  },
  myLocationClick(){
    this.mapCtx.moveToLocation()
  }
})