//引入头部
myAjax({
  url: 'head.html',
  type: 'get',
  success (result) {
    var header = document.getElementsByTagName('header')[0];
    header.innerHTML = result;
    //头部搜索框功能
    var search = document.querySelector('.header_search');
    var input = search.children[0];
    var btn = search.children[1];
    btn.onclick = () => {
      if (input.value == '') {
        window.open('/pro_list.html?page=1', '_self');
      } else {
        window.open('/pro_list.html?kw=' + input.value + '&page=1', '_self')
      }
    }
    window.onkeyup = e => {
      if (e.keyCode == 13) {
        btn.onclick();
      }
    }
  }
});



