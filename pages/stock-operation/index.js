import request from '~/api/request';

Page({
  data: {
    type: 'IN',
    quantity: 1,
    remark: '',
    skuInfo: null,
  },

  onLoad(options) {
    console.log('接收到的参数:', options);
    
    if (options.sku_id && options.name) {
      const skuInfo = {
        sku_id: parseInt(options.sku_id),
        name: decodeURIComponent(options.name),
        material: decodeURIComponent(options.material),
        quantity: parseInt(options.quantity || 0),
      };
      
      console.log('解析后的商品信息:', skuInfo);
      
      this.setData({
        skuInfo: skuInfo,
      });
      
      console.log('设置后的data:', this.data);
    } else {
      console.error('缺少必要参数:', options);
      wx.showToast({
        title: '商品信息缺失',
        icon: 'none',
      });
    }
  },

  onTypeChange(e) {
    console.log('操作类型改变:', e.detail.value);
    this.setData({
      type: e.detail.value,
    });
  },

  onQuantityInput(e) {
    const value = parseInt(e.detail.value) || 1;
    this.setData({
      quantity: value < 1 ? 1 : value,
    });
  },

  increaseQuantity() {
    this.setData({
      quantity: this.data.quantity + 1,
    });
  },

  decreaseQuantity() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1,
      });
    }
  },

  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value,
    });
  },

  async onSubmit() {
    if (!this.data.skuInfo) {
      wx.showToast({
        title: '商品信息错误',
        icon: 'none',
      });
      return;
    }

    console.log('提交数据:', {
      sku_id: this.data.skuInfo.sku_id,
      quantity: this.data.quantity,
      remark: this.data.remark,
      type: this.data.type,
    });

    const path = this.data.type === 'IN' ? '/stock/in' : '/stock/out';
    const params = {
      sku_id: this.data.skuInfo.sku_id,
      quantity: this.data.quantity,
      remark: this.data.remark,
    };

    try {
      await request(path, 'POST', params);
      wx.showToast({
        title: '操作成功',
        icon: 'success',
      });
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    } catch (error) {
      console.error('操作失败:', error);
      wx.showToast({
        title: '操作失败',
        icon: 'none',
      });
    }
  },
});
