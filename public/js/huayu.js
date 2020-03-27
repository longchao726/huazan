// 最新文章轮播图数据
myAjax({
  type : 'get',
  dataType : 'json',
  url : '/article/new',
  success(result){
    console.log(result);
    var art_box = document.getElementById('art_box');
    var ul = art_box.children[0];
    for(var i = 0; i < result.length; i++){
      var res = result[i];
      ul.innerHTML += `
              <li>
                <a href="article.html?id=${res.id}">
                  <img src="${res.img}">
                  <p>${res.subject}</p>
                </a>
              </li>
      `
    }
  }
});

setTimeout(() => {
  (function () {
    //设置文章列表页的轮播图
  var art_box = document.getElementById('art_box')
  //获取需要移动的ul和需要添加点击事件的按钮
  var box = art_box.children[0];
  var next = art_box.children[1].children[0];
  var prev = art_box.children[1].children[1];
  //获取box下li的宽度，为box每次要走的距离
  var width = 300;
  //设置li的个数，
  var liCount = box.children.length;
  //想要达到无缝滚动，还需要复制box里面元素以达到无缝滚动效果
  //整体复制一遍
  //定义函数每次调用函数，整个box移动一定距离
  function move(width) {
    box.className = 'transition'
    box.style.marginLeft = parseInt(box.style.marginLeft) - width + 'px'
  }
  //防止过度运动，定义初始值，在上一个动画没有运行完成，再次点击则不作反应
  var canClick = true;
  function moveTo(width){
    if(canClick){
      canClick = false;
      move(width);
    }
    //在上次动画过度完成后，才可以再次点击
    setTimeout( () => {
      canClick = true;
    },1000)
  }
  //添加点击事件
  
  next.onclick = function () {
    moveTo(width);
    if(box.style.marginLeft == -liCount * width + 'px'){
      setTimeout(() => {
        box.className = '';
        box.style.marginLeft = 0;
      },400)
    }
  }
  prev.onclick = function () {
    moveTo(-width);
    if(box.style.marginLeft == '0px'){
      setTimeout(() => {
        box.className = '';
        box.style.marginLeft = -liCount * width + 'px';
      },400)
    }
  }
  
  }());
},0)


//发送ajax请求文章列表，获取数据
myAjax({
  type : 'get',
  url : '/article/index',
  dataType : 'json',
  success(result){
    var {birthday,apologize,love,knowledge} = result;

    var bir_ul = document.querySelector('.huayu-box .birthday').children[0];
   for(var li of birthday){
     bir_ul.innerHTML += `
          <li>
            <div class="img float_l">
              <a href="article.html?id=${li.id}"><img src="${li.img}"></a>
            </div>
            <div class="txt float_r">
              <h4 class="title"><a href="article.html?id=${li.id}">${li.subject}</a></h4>
              <p class="body">${li.description.substring(12,100)}</p>
              <p class="date">${li.timer}</p>
            </div>
            <div class="clear"></div>
          </li>
     `
   }
   var apo_ul = document.querySelector('.huayu-box .apologize').children[0];
   for(var li of apologize){
     apo_ul.innerHTML += `
          <li>
            <div class="img float_l">
              <a href="article.html?id=${li.id}"><img src="${li.img}"></a>
            </div>
            <div class="txt float_r">
              <h4 class="title"><a href="article.html?id=${li.id}">${li.subject}</a></h4>
              <p class="body">${li.description.substring(12,100)}</p>
              <p class="date">${li.timer}</p>
            </div>
            <div class="clear"></div>
          </li>
     `
   }
   var love_ul = document.querySelector('.huayu-box .love').children[0];
   for(var li of love){
     love_ul.innerHTML += `
            <li>
              <div class="img float_l">
                <a href="article.html?id=${li.id}"><img src="${li.img}"></a>
              </div>
              <div class="txt float_r">
                <h4 class="title"><a href="article.html?id=${li.id}">${li.subject}</a></h4>
                <p class="body">${li.description.substring(12,100)}</p>
                <p class="date">${li.timer}</p>
              </div>
              <div class="clear"></div>
            </li>
     `
   }
   var know_ul = document.querySelector('.huayu-box .knowledge').children[0];
   for(var li of knowledge){
     know_ul.innerHTML += `
            <li>
              <div class="img float_l">
                <a href="article.html?id=${li.id}"><img src="${li.img}"></a>
              </div>
              <div class="txt float_r">
                <h4 class="title"><a href="article.html?id=${li.id}">${li.subject}</a></h4>
                <p class="body">${li.description.substring(12,100)}</p>
                <p class="date">${li.timer}</p>
              </div>
              <div class="clear"></div>
            </li>
     `
   }
  }
})
