// pages/obd/obd.js
var mapCtx
var util = require('../../utils/WSCoordinate.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isListShow: false,
    latitude: 0,
    longitude: 0,
    isSocketOpen: false,
    myVehicles: [],
    authVehicles: [],
    currentVehicle: {},
    obd: {},
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisCtx = this
    var userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: 'https://wit.weichai.com/vehicle/getByOwner/' + userInfo.id,
      success: function (e) {
        if (e.data.code == 1) {
          thisCtx.setData({
            myVehicles: e.data.message
          })
          wx.request({
            url: 'https://wit.weichai.com/obd/get/' + thisCtx.data.myVehicles[0].vin + "/6",
            success: function (ee) {
              if (ee.data.code == 1) {
                thisCtx.setData({
                  obd: ee.data.msg
                })
              } else{
                thisCtx.setData({
                  obd: {}
                })
              }
            }
          })
        }
      }
    })
    wx.request({
      url: 'https://wit.weichai.com/vehicle/getByAuth/' + userInfo.id,
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
  onReady: function () { },

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
  vehicleListClick() {
    this.setData({
      isListShow: !this.data.isListShow
    })
  },
  vehicleItemClick(e) {
    //console.log(e.currentTarget.dataset.vehicle.vin)
    var thisCtx = this
    this.vehicleListClick()
    wx.request({
      url: 'https://wit.weichai.com/obd/get/' + e.currentTarget.dataset.vehicle.vin + "/6",
      success: function (ee) {
        //console.log(ee.data.msg)
        if (ee.data.code == 1) {
          thisCtx.setData({
            obd: ee.data.msg
          })
        } else {
          thisCtx.setData({
            obd: {}
          })
        }
        //console.log(thisCtx.data.obd)
      }
    })
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  }
})