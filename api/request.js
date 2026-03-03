import config from '~/config';

const { baseUrl } = config;
const delay = config.isMock ? 500 : 0;

function request(url, method = 'GET', data = {}) {
  const header = {
    'content-type': 'application/json',
  };
  
  // 获取token，有就丢进请求头
  const tokenString = wx.getStorageSync('access_token');
  if (tokenString) {
    header.Authorization = `Bearer ${tokenString}`;
  }
  
  // 打印请求信息（开发环境）
  console.log('=== 发起请求 ===');
  console.log('URL:', baseUrl + url);
  console.log('Method:', method);
  console.log('Data:', data);
  console.log('Headers:', header);
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      data,
      dataType: 'json',
      header,
      success(res) {
        setTimeout(() => {
          console.log('=== 请求成功 ===');
          console.log('Status:', res.statusCode);
          console.log('Response:', res.data);
          
          // HTTP状态码为200才视为成功
          if (res.statusCode === 200) {
            resolve(res);
          } else {
            // 处理401未授权
            if (res.statusCode === 401) {
              console.log('Token失效，跳转登录页');
              wx.removeStorageSync('access_token');
              wx.redirectTo({
                url: '/pages/login/login',
              });
            }
            reject(res);
          }
        }, delay);
      },
      fail(err) {
        setTimeout(() => {
          console.error('=== 请求失败 ===');
          console.error('Error:', err);
          
          // 提供更友好的错误提示
          let errorMsg = '网络请求失败';
          if (err.errMsg) {
            if (err.errMsg.includes('timeout')) {
              errorMsg = '请求超时，请检查网络';
            } else if (err.errMsg.includes('fail')) {
              errorMsg = '网络连接失败，请检查服务器是否启动';
            }
          }
          
          wx.showToast({
            title: errorMsg,
            icon: 'none',
            duration: 2000,
          });
          
          reject(err);
        }, delay);
      },
    });
  });
}

export default request;
