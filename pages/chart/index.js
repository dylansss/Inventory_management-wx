import request from '~/api/request';

Page({
  data: {
    chartData: [],
    maxQuantity: 0,
  },

  onLoad() {
    this.checkLogin();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        value: 'chart',
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

  async loadData() {
    try {
      const res = await request('/stock', 'GET', {
        page: 1,
        pageSize: 999,
      });
      
      if (res.data && res.data.list) {
        // 按照库存数量从大到小排序
        const list = res.data.list.sort((a, b) => b.quantity - a.quantity);
        const maxQuantity = Math.max(...list.map(item => item.quantity), 1);
        
        const colors = [
          '#0052d9', '#0034b5', '#00a870', '#2ba471', 
          '#eca918', '#ed7b2f', '#e34d59', '#834ec2',
          '#4992ff', '#44d7b6', '#ffc400', '#ff6b6b'
        ];
        
        const chartData = list.map((item, index) => ({
          ...item,
          percentage: (item.quantity / maxQuantity) * 100,
          color: colors[index % colors.length],
        }));
        
        console.log('排序后的数据:', chartData);
        
        this.setData({
          chartData,
          maxQuantity,
        });
      }
    } catch (error) {
      console.error('加载数据失败:', error);
      wx.showToast({
        title: '加载失败',
        icon: 'none',
      });
    }
  },

  onPullDownRefresh() {
    this.loadData().then(() => {
      wx.stopPullDownRefresh();
    });
  },
});
