
//文章分类列表
var search = location.search;
var id = search.split('=')[1];
myAjax({
  type : 'get',
  url : '/article/list',
  dataType : 'json',
  data : `id=${id}`,
  success(result){
    console.log(result);
    var position = document.querySelector('.position');
    position.innerHTML = `
    <a href="index.html">首页</a><code>></code><a href="huayu.html">花语大全</a><code>></code><a href="">${result.category_name}</a>
    `
    var articles = result.result;
    var list = document.querySelector('.news-list').children[0];
    for(var li of articles){
      list.innerHTML += `
            <li>
							<div class="img">
								<a href="article.html?id=${li.id}"><img src="${li.img}" alt=""></a>
							</div>
							<div class="txt">
								<h4 class="title">
									<a href="article.html?id=${li.id}">${li.subject}</a>
								</h4>
								<p class="body">
									${li.description.substring(12,150)}
								</p>
								<p class="date">${li.timer}</p>
							</div>
							<div class="clear"></div>
						</li>
      `;
    }
  }
})

// 文章详情页最新文章最新文章ajax  推荐和热搜暂时先统一
myAjax({
  type : 'get',
  url : '/article/new',
  dataType : 'json',
  success(result){
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