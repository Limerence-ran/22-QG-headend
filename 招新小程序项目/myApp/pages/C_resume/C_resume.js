
import Toast from '@vant/weapp/toast/toast';
import { NewerInterview} from '../../utils/request/api';//接口
import { checkForm } from "../../utils/tools/checkForm";//方法
import Dialog from '@vant/weapp/dialog/dialog';





Page({
  /**
   * 页面的初始数据
   */
  data: {
    arraySex: ['男', '女'],
    indexSex: 0,
    arrayDir: ['前端组', '后台组','移动组','人工智能组','嵌入式组','图形组','设计组'],
    indexDir: 0,
     arrayAcademy: ['计算机学院', '自动化学院', '信息工程学院', '物理与光电工程学院', '外国语学院', '机电工程学院', '土木与交通工程学院', '轻工化工学院', '材料与能源学院', '管理学院', '环境科学与工程学院', '艺术与设计学院', '法学院', '继续教育学院', '数学与统计学院', '马克思主义学院', '建筑与城市规划学院', '经济与贸易学院', '生物医药学院', '集成电路学院', '国际教育学院', '生态环境与资源学院', '先进制造学院'],
     indexAcademy:0,
    arrayMajor: ['是', '否'],
    indexMajor: 0,
    showPickerPop: false,
    name:"",
    english: "",
    age: "",
    club: "",
    dormitory: "",
    motto: "",
    studentId: "",
    phone: "",
    rank: "",
    class: "",
    cExperiment: "",
    cTheory: "",
    formSubmitted: false, // 控制表单是否已经提交
    loading:false,
     // 检查表单对象
     checkClass: {},
  },

  // 公共函数，用于更改选择器的值
  changePickerValue(value, key) {
    const data = {};
    data[key] = value;
    data.showPickerPop = false;
    this.setData(data);
  },

  bindPickerChangeSex: function(e) {
    this.changePickerValue(e.detail.value, 'indexSex');
  },

  bindPickerChangeDir: function(e) {
    this.changePickerValue(e.detail.value, 'indexDir');
  },

  bindPickerChangeMajor: function(e) {
    this.changePickerValue(e.detail.value, 'indexMajor');
  },
  bindPickerChangeAcademy:function(e) {
    this.changePickerValue(e.detail.value, 'indexAcademy');
  },
  showPicker: function() {
    this.setData({
      showPickerPop: true
    })
  },
 
    
  checkEmpty: function(){
   
      let nameVal = this.data.name.trim();
      let ageVal = this.data.age.trim();
      let studentIdVal = this.data.studentId.trim();
      let classVal = this.data.class.trim();
      let phoneVal = this.data.phone.trim();
      let rankVal = this.data.rank.trim();
      let { checkClass } = this.data;
      if (!nameVal) {
        wx.showToast({
          title: '请输入姓名',
          icon: 'none'
        });
        return false;
      };
      if (!checkClass.chinese(nameVal)) {
        wx.showToast({
          title: '姓名格式不正确，请检查',
          icon: 'none'
        });
        return false;
      };
      
        if (!ageVal) {
          wx.showToast({
            title: '请输入年龄',
            icon: 'none'
          });
          return false;
        };
        if (!checkClass.age(ageVal)) {
          wx.showToast({
            title: '年龄格式不正确，请检查',
            icon: 'none'
          });
          return false;
        };

          if (!studentIdVal) {
            wx.showToast({
              title: '请输入学号',
              icon: 'none'
            });
            return false;
          };
          if (!checkClass.numberNum(studentIdVal)) {
            wx.showToast({
              title: '学号格式不正确，请检查',
              icon: 'none'
            });
            return false;
          };
            if (!classVal) {
              wx.showToast({
                title: '请输入专业班级',
                icon: 'none'
              });
              return false;
            };
            // if (!checkClass.chinese(classVal)) {
            //   wx.showToast({
            //     title: '专业班级格式不正确，请检查',
            //     icon: 'none'
            //   });
            //   return false;
            // };

            if (!phoneVal) {
              wx.showToast({
                title: '请输入手机号',
                icon: 'none'
              });
              return false;
            };
            if (!checkClass.numberPhone(phoneVal)) {
              wx.showToast({
                title: '手机号格式不正确，请检查',
                icon: 'none'
              });
              return false;
            };

              if (!rankVal) {
                wx.showToast({
                  title: '请输入绩点',
                  icon: 'none'
                });
                return false;
              };
              if (!checkClass.numberGpa(rankVal)) {
                wx.showToast({
                  title: '绩点格式不正确，请检查',
                  icon: 'none'
                });
                return false;
              };
              return true; // 验证通过，返回true
  },
 
  formSubmit: async function (e) {
    const data = {
      name: e.detail.value.name,
      english: e.detail.value.english ,
      age: e.detail.value.age,
      club: e.detail.value.club,
      dormitory: e.detail.value.dormitory,
      motto: e.detail.value.motto,
      studentId: e.detail.value.studentId,
      phone: e.detail.value.phone,
      rank: e.detail.value.rank,
      class: e.detail.value.class,
      cExperiment: e.detail.value.cExperiment,
      cTheory: e.detail.value.cTheory,
      gender: this.data.arraySex[this.data.indexSex],
      flunk: this.data.arrayMajor[this.data.indexMajor],
      intention: this.data.arrayDir[this.data.indexDir],
      college:this.data.arrayAcademy[this.data.indexAcademy]
    };
    
    this.setData({ loading: true });
   this.setData({ formSubmitted: true,...data });
  let isEmpty = this.checkEmpty();

  if(isEmpty){
    const beforeClose = (action) =>
    new Promise((resolve) => {
    setTimeout(() => {
      if (action === 'confirm') {
        resolve(true);
      } else {
        // 拦截取消操作
        resolve(false);
      }
    }, 1000);
  });
    Dialog.confirm({
      message: '确认提交报名表了吗？',
      beforeClose
    });
  }
   
  // try {
    console.log('data',data);
  // const response = await NewerInterview.submitInfo(data);
  //   if (response.code === 200&&(result!=false)) {
  //  setTimeout(() => {
  //   this.setData({ formSubmitted: true, loading: false,...data });
  //   Toast.success('提交成功');
  // }, 3000);
  //    setTimeout(() => {
  //     wx.navigateTo({
  //       url: '/pages/home/home'
  //     });
  //    }, 6000);
  //   } else { 
  //     wx.showToast({
  //       title: '报名失败',
  //       icon: 'none'
  //     });
  //   }
  // } catch (error) {
  //   // 处理请求失败的情况
  //   console.error('请求失败:', error);
  //   wx.showToast({
  //     title: '请求失败',
  //     icon: 'none'
  //   });
  // }

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '报名QG工作室'
    });
    let checkClass = new checkForm();
    this.setData({ checkClass });
  
  
   
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
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})