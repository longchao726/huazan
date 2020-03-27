
//获取地址栏中的参数，文章的id
var search = location.search;
var id = search.split('?')[1];
// 文章详情ajax
myAjax({
  type : 'get',
  url : '/article',
  data : id,
  dataType : 'json',
  success(result){
    //获取网页头部title内容
    var title = document.querySelector('title')
    //文章的标题赋值给网页头部的title
    title.innerHTML = `${result.subject}-Rosewin鲜花网`
    var position = document.querySelector('.position');
    console.log(result)
    position.innerHTML = `
    <a href="index.html">首页</a><code>></code><a href="huayu.html">花语大全</a><code>></code><a href="huayu_list.html?id=${result.category_id}">${result.category_name}</a><code>></code>
    ${result.subject}
    `
    var art_left = document.querySelector('.art_left');
    art_left.innerHTML = `
    <h3 class="title">${result.subject}</h3>
    <div class="note">
      类别：<a href="">${result.category_name}</a> 
      <span><i class="fa fa-edit"></i>Rosewin鲜花</span>
      <span><i class="fa fa-calendar"></i>${result.timer}</span>
    </div>
    <div class="con">
       ${result.description}
    </div>
    <div class="clear"></div>
    <div class="prevnext">
      <div>
        上一篇：<a href="">情侣之间道歉送女朋友多少朵花好</a>
      </div>
      <div>
        下一篇：<a href="">给女生道歉送花送什么花好送多少朵合适</a>
      </div>
    `
  }
})

// 文章详情页最新文章最新文章ajax  推荐和热搜暂时先统一
myAjax({
  type : 'get',
  url : '/article/new',
  dataType : 'json',
  success(result){
    console.log(result)
    var rbox_body = document.querySelectorAll('.rbox-body')
    //var category = ['最新文章', 'Rosewin推荐', 'Rosewin热搜'];
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < result.length; j++){
        rbox_body[i].children[0].innerHTML += `
        <li><a href="article.html?id=${result[j].id}">${result[j].subject}</a></li>
        `
      }
    }
  }
})