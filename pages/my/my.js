// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageUrl: "",
    nickName: ""
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
    var thisCtx = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res)
        thisCtx.setData({
          hasUserInfo: true,
          imageUrl: res.data.avatarUrl,
          nickName: res.data.nickName,
        })
      },
    })
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
  getUserInfo() {
    var thisCtx = this
    //获取sessionkey和openid
    wx.login({
      success: function (loginRes) {
        wx.request({
          url: 'http://localhost:8080/wxAuth/getAuthInfo/' + loginRes.code,
          success: function (soRes) {
            //成功获取sessionKey和openid
            wx.getUserInfo({
              //成功获取sessionKey和OpenId
              success: res => {
                //解密数据获取unionId
                wx.request({
                  url: 'http://localhost:8080/wxAuth/decrypt',
                  data: {
                    sessionKey: soRes.data.session_key,
                    data: res.encryptedData,
                    iv: res.iv
                  },
                  success: function (decryptRes) {
                    //解密成功,设置变量与本地存储
                    thisCtx.setData({
                      imageUrl: res.userInfo.avatarUrl,
                      nickName: res.userInfo.nickName,
                    })
                    wx.setStorage({
                      key: 'userInfo',
                      data: res.userInfo,
                      success: function (e) {
                        thisCtx.setData({
                          hasUserInfo: true
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }
})