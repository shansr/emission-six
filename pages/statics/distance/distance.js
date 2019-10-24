// pages/statics/distance/distance.js
import * as echarts from '../../../ec-canvas/echarts'
var thisChart
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart)
  thisChart = chart
  return chart
}
function createOption(name, data) {
  var option = {
    title: {
      text: name,
      left: 'center'
    },
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      position: function (point, params, dom, rect, size) {
        // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
        // 提示框位置
        var x = 0 // x坐标位置

        // 当前鼠标位置
        var pointX = point[0]
        // 外层div大小
        var viewWidth = size.viewSize[0]

        // 提示框大小
        var boxWidth = size.contentSize[0]
        if (boxWidth > pointX) {
          x = 5;
        } else { // 左边放的下
          x = pointX - boxWidth
        }
        return [x, point[1]]
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.values[0],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: data.keys[1],
        type: 'bar',
        barWidth: '50%',
        data: data.values[1]
      }
    ]
  }
  return option
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    isListShow: false,
    myVehicles: [],
    authVehicles: []
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
          var plateNo = e.data.message[0].plateNo
          wx.request({
            url: 'http://localhost:8080/statics/distance/'+ e.data.message[0].vin +'/6',
            success: function (e) {
              console.log(e)
              var option = createOption(plateNo + '日均公里数/Km', e.data.msg)
              thisChart.setOption(option, true)
            }
          })
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
  vehicleListClick() {
    this.setData({
      isListShow: !this.data.isListShow
    })
  },
  vehicleItemClick(e) {
    this.vehicleListClick()
    //console.log(e.currentTarget.dataset.vehicle.vin)
    var plateNo = e.currentTarget.dataset.vehicle.plateNo
    wx.request({
      url: 'http://localhost:8080/statics/distance/' + e.currentTarget.dataset.vehicle.vin + '/6',
      success: function (e) {
        //console.log(e)
        var option = createOption(plateNo +'日均公里数/Km\n', e.data.msg)
        thisChart.setOption(option, true)
      }
    })
  }
})