function  getLogin(){
  return new Promise((resolve,reject)=>{
    wx.login({
       success(res){
        if(res.code){
         resolve(res);
        }
      },
      fail(){
        reject();
      }
    })
  })
}

function getHttpRequest(url,json){
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: json,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res);
      },
      fill(e){
        reject(e);
      }
    })
  })
}
module.exports = {
  getLogin:getLogin,
  getHttpRequest:getHttpRequest,
}