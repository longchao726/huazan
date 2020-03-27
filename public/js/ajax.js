function myAjax({type,url,data,dataType,success}) {
  //创建xhr对象
  var xhr = new XMLHttpRequest();
  //如果发送get请求时，带参数，则需要将参数用?链接到url地址结尾
  if(type == 'get' && data !== undefined){
    url += '?' + data;
  }
  //发送请求
  xhr.open(type,url,true);
  //创建事件监听
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200){
      var result = xhr.responseText;
      //如果返回的数据类型是json，则用JSON解析后返回
      if(dataType == 'json'){
        result = JSON.parse(result);
      }
      //返回结果放在回调函数内，调用
      success(result)
    }
  }
  if(type == 'post'){//只有发送的是post请求的时候才需要添加请求头
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
  }
  if(type == 'post' && data !== undefined){//只有发送的请求是post，并且data不为空，才需要把参数放在send中
    xhr.send(data)
  } else {
    xhr.send();
  } 
}