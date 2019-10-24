// pages/monitor/monitor.js
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
    //points: '',
    polylines: [{
      points: [],
      dottedLine: false,
      width: 4,
      color: '#5c95e6ff'
    }],
    markers: [{
      iconPath: '../../images/ic_truck.png',
      callout: {
        display: 'ALWAYS',
        textAlign: 'left',
        padding: 4
      }
    }],
    myVehicles: [],
    authVehicles: [],
    currentVehicle:{},
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
        if(e.data.code == 1){
          thisCtx.setData({
            myVehicles: e.data.message
          })
        }
      }
    })
    wx.request({
      url: 'http://localhost:8080/vehicle/getByAuth/' + userInfo.id,
      success: function (e) {
        if(e.data.code == 1){
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
    var thisCtx = this
    mapCtx = wx.createMapContext('myMap')
    wx.authorize({
      scope: 'scope.address',
      success: function (e) {
        wx.onSocketMessage(function (res) {
          var jsonObj = JSON.parse(res.data);
          //console.log(jsonObj)
          var point = util.transformFromWGSToGCJ(jsonObj.latitude, jsonObj.longitude)
          var content = 
            '车牌号：' + thisCtx.data.currentVehicle.vehicle.plateNo+"\n" + 
            '车速：' + jsonObj.vehicleSpeed.toFixed(2) + ' Km/h\n' +
            '转速：' + jsonObj.engineSpeed.toFixed(2) + ' rpm\n' +
            '总里程：' + jsonObj.totalTrip.toFixed(2) + ' Km\n' +
            '大气压力：' + jsonObj.airPressure.toFixed(2) + ' kPa\n' +
            '冷却液温度：' + jsonObj.coolantTemperature.toFixed(2) + ' ℃\n'

          //thisCtx.data.polyline.points.push(point)
          thisCtx.setData({
            latitude: point.latitude,
            longitude: point.longitude,
            'markers[0].latitude': point.latitude,
            'markers[0].longitude': point.longitude,
            'markers[0].callout.content': content,
            'polylines[0].points': thisCtx.data.polylines[0].points.concat(point)
          })
        }),
          console.log(e)
        wx.getLocation({
          success: function (res) {
            //console.log(res)
            thisCtx.setData({
              latitude: res.latitude,
              longitude: res.longitude
            })
          },
        })
      },fail:function(e){
        wx.navigateTo({
          url: '../setting/setting',
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
    if (this.data.isSocketOpen) {
      wx.closeSocket({
        success: function (e) {
        },
        fail: function (e) {
          //console.log(e)
        }
      })
    }
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
  vehicleItemMonitorClick(e) {
    var thisCtx = this
    console.log(e)
    thisCtx.setData({
      currentVehicle: e.currentTarget.dataset
    })
    this.vehicleListClick()
    if (thisCtx.data.isSocketOpen) {
      wx.closeSocket({
        success: function (e) {
          
         },
        fail: function (e) {
          console.log(e)
        }
      })
    }
    wx.connectSocket({
      url: 'wss://wit.weichai.com:9999/iot/monitor/' + e.currentTarget.dataset.vehicle.vin,
      success: function (e) {
        thisCtx.setData({
          isSocketOpen: true
        })
      }
    })
    thisCtx.setData({
      'polylines[0].points': []
    })
  },
  myLocationClick() {
    var thisCtx = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        thisCtx.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  }, 
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  }
})