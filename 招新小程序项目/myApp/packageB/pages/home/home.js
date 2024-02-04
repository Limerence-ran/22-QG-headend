// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isStop: false, //动画暂停键
    loadingComplete: false, //加载状态
    isFly: false, //火箭起飞状态
    istap: false, //点击状态
    groups: [{
        id: 0,
        group: '工业软件-前端组',
        icon: '../../../utils/svg/web_icon.svg',
        text: '\n\n叹为观止的视觉冲击只是我们的冰山一角',
        url: "../../../utils/svg/web.svg",
        isShow: false
      },
      {
        id: 1,
        group: '工业软件-后台组',
        icon: '../../../utils/svg/sql_icon.svg',
        text: '\n无处不在的数据流量正是我们的崇山峻岭',
        url: "../../../utils/svg/sql.svg",
        isShow: false
      },
      {
        id: 2,
        group: '人工智能组',
        icon: '../../../utils/svg/ai_icon.svg',
        text: '智联世界只是我们的起点\n\n生成未来才是我们的目标',
        url: "../../../utils/svg/ai.svg",
        isShow: false
      },
      {
        id: 3,
        group: '移动组',
        icon: '../../../utils/svg/mobile_icon.svg',
        text: '其实\n\n我们每一天都在发现连接世界的无限可能',
        url: "../../../utils/svg/mobile.svg",
        isShow: false
      },
      {
        id: 4,
        group: '嵌入式组',
        icon: '../../../utils/svg/embedded_icon.svg',
        text: '生逢万物互联的时代\n\n再渺小的你也蕴含着无穷的力量',
        url: "../../../utils/svg/embedded.svg",
        isShow: false
      },
      {
        id: 5,
        group: '设计组',
        icon: '../../../utils/svg/ui_icon.svg',
        text: '作为产品的设计师\n\n我们要让美丽与功能完美融合',
        url: "../../../utils/svg/ui.svg",
        isShow: false
      },
      {
        id: 6,
        group: '图形组',
        icon: '../../../utils/svg/graph_icon.svg',
        text: '你还在想象什么？\n\n快和我们一起\n\n创造身临其境的奇迹吧！',
        url: "../../../utils/svg/graph.svg",
        isShow: false
      }
    ],
  },

  /**
   * view自动上滑函数--监听页面滚动
   */
  viewScroll: function () {
    const that = this;
    wx.createSelectorQuery().selectAll('.group').boundingClientRect(function (rects) {
      if (rects && rects.length > 0) {
        rects.forEach(function (rect, index) {
          if (rect.top < 730) {
            let targets = that.data.groups;
            targets[index].isShow = true;
            that.setData({
              groups: targets
            })
          } else {
            let targets = that.data.groups;
            targets[index].isShow = false;
            that.setData({
              groups: targets
            })
          }
        });
      }
    }).exec();
  },

  /**
   * 页面行为监听事件--页面滚动
   */
  onPageScroll() {
    this.viewScroll()
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 模拟页面加载
    setTimeout(() => {
      this.setData({
        loadingComplete: true
      })
    }, 3100)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {



  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    setTimeout(() => {
      this.viewScroll()
    }, 3000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  /**
   * @description 开启玻璃罩
   */
  handleTap() {
    this.setData({
      istap: true
    })
  },
  /**
   * @description Hub页跳转
   */
  goToHub() {
    //火箭起飞
    this.setData({
      isFly: true
    })
    setTimeout(() => {
      wx.navigateTo({
        url: "../hub/hub",
      })
    }, 1000)
  },

  /**
   * @description 暂停平板动画
   */
  stopAnimation() {
    let status = this.data.isStop
    this.setData({
      isStop: !status
    })
  }
})