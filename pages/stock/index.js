import request from '~/api/request';

Page({
  data: {
    keyword: '',
    list: [],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: false,
  },

  onLoad() {
    this.checkLogin();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        value: 'stock',
      });
    }
    this.loadData();
  },

  checkLogin() {
    const token = wx.getStorageSync('access_token');
    if (!token) {
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
  },

  onKeywordInput(e) {
    this.setData({
      keyword: e.detail.value,
    });
  },

  onSearch() {
    this.setData({ page: 1 });
    this.loadData();
  },

  async loadData() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    try {
      const res = await request('/stock', 'GET', {
        keyword: this.data.keyword,
        page: this.data.page,
        pageSize: 1000,
      });
      if (res.data) {
        this.setData({
          list: res.data.list || [],
          total: res.data.total || 0,
        });
      }
    } catch (error) {
      console.error('加载库存失败:', error);
      wx.showToast({
        title: '加载失败',
        icon: 'none',
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  onOperation(e) {
    const item = e.currentTarget.dataset.item;
    console.log('点击的商品:', item);
    
    if (!item || !item.sku_id) {
      wx.showToast({
        title: '商品信息错误',
        icon: 'none',
      });
      return;
    }
    
    wx.navigateTo({
      url: `/pages/stock-operation/index?sku_id=${item.sku_id}&name=${encodeURIComponent(item.name)}&quantity=${item.quantity}&material=${encodeURIComponent(item.material)}`,
    });
  },

  onPullDownRefresh() {
    this.setData({ page: 1 });
    this.loadData().then(() => {
      wx.stopPullDownRefresh();
    });
  },
});
