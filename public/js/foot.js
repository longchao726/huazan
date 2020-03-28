//引入底部
myAjax({
  url: 'foot.html',
  type: 'get',
  success (result) {
    var footer = document.getElementsByTagName('footer')[0];
    footer.innerHTML = result;
  }
})