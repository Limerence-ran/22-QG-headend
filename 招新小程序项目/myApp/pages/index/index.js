// index.js
// 获取应用实例
import {
  NewerInterview
} from '../../utils/request/api'
import PopUp from '../../utils/tools/PopUp'
import socket from '../../utils/tools/websocket'
const app = getApp()
Page({
  data: {
    avatarUrl: app.globalData.avatarUrl, // 头像
    nickName: app.globalData.nickName, // 昵称
    platformToken: '', //token
  },
  /**
   * load生命周期函数
   */
  onLoad() {
    setTimeout(() => {
      this.setData({
        platformToken: wx.getStorageSync('platformToken')
      })
    }, 1000)
  },

  /* @description 登录请求-获取新的token
   */
  login() {
    const that = this;
    wx.login({
      async success(res) {
        if (res.code) {
          try {
            const response = await NewerInterview.login(res.code);
            if (response.code === 200 && response.data) {
              const {
                permissions,
                platformToken
              } = response.data;
              wx.setStorageSync('identity', permissions);
              //把新生端Token存储到本地
              wx.setStorageSync('platformToken', platformToken);
              //把新生端Token注入到全局
              app.globalData.platformToken = platformToken;
              PopUp.Toast(response.message, 1, 2000);
              //把新生端Token注入到当前页面
              that.setData({
                platformToken: platformToken
              })
              //连接websocket
              socket.connect();
            } else {
              // 处理登录失败的情况
              PopUp.Toast('授权失败', 2, 2000);
            }
          } catch (error) {
            // 处理请求失败的情况
            console.error('请求失败:', error);
            PopUp.Toast('请求失败', 2, 2000);
          }
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  /**
   * @description 登陆获取用户昵称
   */
  onNicknameChange(e) {
    if (e.detail.value === "") {
      return
    }
    //token存储本地
    wx.setStorageSync('nickName', e.detail.value);
    setTimeout(() => {
      this.setData({
        nickName: e.detail.value
      })
    }, 1000)
  },

  /**
   * 登录获取用户头像
   * @param {*} e 
   */
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    wx.setStorageSync('avatarUrl', avatarUrl);
    this.setData({
      avatarUrl,
    })
  },

  /**
   * @description home页跳转
   */
  goToHome() {
    setTimeout(() => {
      wx.redirectTo({
        url: '../../packageB/pages/home/home',
      })
    }, 500)
  }
})