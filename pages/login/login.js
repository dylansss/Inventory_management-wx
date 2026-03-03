import request from '~/api/request';

Page({
  data: {
    username: '',
    password: '',
    isSubmit: false,
  },

  onLoad() {
    // 检查是否已登录
    const token = wx.getStorageSync('access_token');
    if (token) {
      wx.switchTab({
        url: '/pages/stock/index',
      });
    }
  },

  onUsernameChange(e) {
    this.setData({ username: e.detail.value });
    this.checkSubmit();
  },

  onPasswordChange(e) {
    this.setData({ password: e.detail.value });
    this.checkSubmit();
  },

  checkSubmit() {
    const isSubmit = this.data.username !== '' && this.data.password !== '';
    this.setData({ isSubmit });
  },

  async login() {
    if (!this.data.isSubmit) return;

    wx.showLoading({ title: '登录中...' });

    try {
      // 1. 先进行账号密码登录
      const loginRes = await request('/auth/login', 'POST', {
        username: this.data.username,
        password: this.data.password,
      });
      // const loginRes = {
      //   data: {
      //     token: '11111'
      //   }
      // }
      if (loginRes.data && loginRes.data.token) {
        // 保存token
        wx.setStorageSync('access_token', loginRes.data.token);
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/stock/index',
          });
        }, 1500);
        return
        // 2. 获取微信授权
        wx.getUserProfile({
          desc: '用于绑定微信账号',
          success: async (profileRes) => {
            try {
              // 3. 获取微信登录code
              wx.login({
                success: async (loginCodeRes) => {
                  try {
                    // 4. 绑定微信号
                    await request('/auth/bind-wechat', 'POST', {
                      code: loginCodeRes.code,
                      userInfo: profileRes.userInfo,
                    });

                    wx.hideLoading();
                    wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                    });


                  } catch (error) {
                    console.error('绑定微信失败:', error);
                    // 即使绑定失败也允许登录
                    wx.hideLoading();
                    wx.switchTab({
                      url: '/pages/stock/index',
                    });
                  }
                },
                fail: () => {
                  // 获取code失败也允许登录
                  wx.hideLoading();
                  wx.switchTab({
                    url: '/pages/stock/index',
                  });
                },
              });
            } catch (error) {
              console.error('处理微信授权失败:', error);
              wx.hideLoading();
              wx.switchTab({
                url: '/pages/stock/index',
              });
            }
          },
          fail: () => {
            // 用户拒绝授权，也允许登录
            wx.hideLoading();
            wx.switchTab({
              url: '/pages/stock/index',
            });
          },
        });
      }
    } catch (error) {
      wx.hideLoading();
      console.error('登录失败:', error);
      wx.showToast({
        title: error.data?.message || '登录失败',
        icon: 'none',
      });
    }
  },
});
