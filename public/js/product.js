//发送ajax获取所有商品
var ul = document.querySelector('.list_main').children[0];
//从地址栏获得查询字符串，
var keyword = location.search.split('?')[1];
var params = {}
location.search.substring(1).split('&').forEach(elem => {
  var [a, b] = elem.split('=');
  params[a] = b;
});
var { page, id, kw } = params;

myAjax({
  type: 'get',
  url: '/product/list',
  data: keyword,
  dataType: 'json',
  success (result) {
    //对象解构，得到产品列表和总数量
    var { products, pageCount, count } = result;
    //页面上显示一共搜索到多少产品
    var res = document.querySelector('.proList_top_r .res');
    res.innerHTML = `${count}个结果`;
    //页码显示
    var num = document.querySelector('.proList_top_r .num');
    var num1 = document.querySelectorAll('.proList_top_r .num')[1];
    //如果页码数大于1.才显示页码
    if (pageCount > 1) {
      for (var i = 1; i <= pageCount; i++) {
        num.innerHTML += `
          <li onclick="change(${i})">${i}</li>
        `;
        if (page == i) {
          num.children[i - 1].className = 'num1';
        }
        num1.innerHTML = num.innerHTML;
      }
    }
    //上一页下一页功能
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var next1 = document.getElementById('next1')
    var prev1 = document.getElementById('prev1')
    if (pageCount == 1) {
      prev.style.display = 'none'
      next.style.display = 'none'
      prev1.style.display = 'none'
      next1.style.display = 'none'
    } else if (page == 1) {
      prev.style.display = 'none';
      next.style.display = 'block';
      prev1.style.display = 'none';
      next1.style.display = 'block';
    } else if (page == pageCount) {
      prev.style.display = 'block'
      next.style.display = 'none'
      num.style.marginLeft = 0;
      prev1.style.display = 'block'
      next1.style.display = 'none'
      num1.style.marginLeft = 0;
    }
    prev.onclick = () => {
      window.open(`pro_list.html?page=${page > 0 && page - 1}`, '_self')
    }
    next.onclick = () => {
      window.open(`pro_list.html?page=${page < pageCount && parseInt(page) + 1}`, '_self')
    }
    prev1.onclick = () => prev.onclick();
    next1.onclick = () => next.onclick();
    //查找的关键字转码
    var highlight = decodeURI(kw);
    for (list of products) {
      //如果在关键字在标题中可以找到，并且关键字不为空
      if (list.title.indexOf(highlight) != -1 && kw != '') {
        //则替换关键字，为关键字标红
        list.title = list.title.replace(highlight, `<span style="color:red">${highlight}</span>`)
      }
      ul.innerHTML += `
        <li>
          <a href="pro_detail.html?id=${list.id}" target="_blank">
            <img src="${list.img}">
            <p class="pro_t">${list.title}</p>
            <div class="pro_price">
              <h2>￥${list.price}</h2>
              <p>去微信公众号购买，此款立省<span>${list.save}</span>元。</p>
            </div>
          </a>
        </li>`
    }
  }
})
//页码改变，发送请求改变
function change (i) {
  var search = location.search.split('=')[0];
  window.open(`pro_list.html?page=${i}`, '_self');
}