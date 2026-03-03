Component({
  data: {
    value: '',
    list: [
      {
        icon: 'layers',
        value: 'stock',
        label: '库存',
      },
      {
        icon: 'chart-bar',
        value: 'chart',
        label: '视图',
      },
    ],
  },
  
  lifetimes: {
    ready() {
      const pages = getCurrentPages();
      const curPage = pages[pages.length - 1];
      if (curPage) {
        const nameRe = /pages\/(\w+)\/index/.exec(curPage.route);
        if (nameRe === null) return;
        if (nameRe[1] && nameRe) {
          this.setData({
            value: nameRe[1],
          });
        }
      }
    },
  },
  
  methods: {
    handleChange(e) {
      const { value } = e.detail;
      wx.switchTab({ url: `/pages/${value}/index` });
    },
  },
});
