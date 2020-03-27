//  banner轮播图
var box = document.getElementById('box');

//获取点击按钮
var next = document.querySelector('.btn .next')
var prev = document.querySelector('.btn .prev');

//设置默认值
var width = 1200;
//设置动画函数
function move(width){
  box.className = 'transition'
  box.style.marginLeft = parseInt(box.style.marginLeft) - width + 'px'
}
//防止上一张动画没有播放完，用户直接点下一张，所以设置条件
//初始可以点击
var canClick = true;
//定义函数
function moveTo(width) {
  //如果可以点击
  if(canClick){
    //执行上面定义的动画函数
    move(width);
    //调用之后直接设定为false，不可点击状态，因为此时动画可能没有执行完
    canClick = false;
    //设置一次性定时器，因为动画设置时间是500毫秒，所以设置一秒以后点击才有效果
    setTimeout( () => {
      canClick = true;
    },900)
  }
}
//添加下一张点击事件
next.onclick = function () {
  //调用函数，
  moveTo(width)
  //因为正常图片只有两张，所以当图片到达第四张的时候，
  if(box.style.marginLeft == '-3600px'){
    //设置定时器，先把box的过渡效果清掉
    setTimeout(() => {
      box.className = '';
      //让图片换成初始的位置
      box.style.marginLeft = '-1200px'
    },500) 
    //因为图片过渡时间为500毫秒，所以让这个过程在动画结束后执行
  }
}
//添加上一张点击事件
prev.onclick = function () {
  moveTo(-width);
  if(box.style.marginLeft == '0px'){
    setTimeout(() => {
      box.className = '';
      box.style.marginLeft = '-2400px'
    },500)
  }
}
//设置自动播放 每隔四秒钟调用一次
var timer;
//当鼠标不在box上的时候，设置定时器，让图片自动播放
box.onmouseout = function () {
  timer = setInterval(() => {
    next.onclick();
  },4000)
}
//当鼠标放在box上的时候，清除定时器
box.onmouseover = function () {
  clearInterval(timer);
}


// 发送ajax请求首页数据
myAjax({
  type : 'get',
  url : '/product/index',
  dataType : 'json',
  success(result) {
    var hot1 = document.querySelectorAll('.hot_con')[0];
    for(var i = 0; i < 8; i++){
      hot1.innerHTML += `
            <li>
              <a href="pro_detail.html?id=${result[i].id}" target="_blank">
                <img src="${result[i].img}">
                <div>
                  <h3>${result[i].title}</h3>
                  <h2>￥${result[i].price}</h2>
                  <p>去微信公众号购买，此款立省
                    <span class="save_money">${result[i].save}</span>元
                  </p>
                </div>
              </a>
            </li>
    `;
    }
    var hot2 = document.querySelectorAll('.hot_con')[1];
    for(var i = 8; i < 16; i++){
      hot2.innerHTML += `
        <li>
          <a href="pro_detail.html?id=${result[i].id}" target="_blank">
            <img src="${result[i].img}">
            <div>
              <h3>${result[i].title}</h3>
              <h2>￥${result[i].price}</h2>
              <p>去微信公众号购买，此款立省
                <span class="save_money">${result[i].save}</span>元
              </p>
            </div>
          </a>
        </li>
      `
    }
  }
})

//新品推荐
myAjax({
  type : 'get',
  url : '/product/new',
  dataType : 'json',
  success(result){
    var new_con = document.querySelector('.new_con').children[0];
    for(var list of result){
      new_con.innerHTML += `
            <li>
  						<a href="pro_detail.html?id=${list.id}">
	  						<img src="${list.img}">
	  						<p>${list.title}</p>
	  					</a>
  						<a href="javascript:;" class="join_cart">加入购物车</a>
  					</li>
      `;
    }
  }
})

//首页文章
myAjax({
  type : 'get',
  url : 'article/new',
  dataType : 'json',
  success(result) {
    var fw_know = document.querySelector('.fw_know').children[0];
    for(var i = 0; i < result.length; i++){
      fw_know.innerHTML += `
              <li>
                <a href="article.html?id=${result[i].id}">
                  <img src="${result[i].img}">
                  <p>${result[i].subject}</p>
                </a>
              </li>
      `;
    }
    for(var j = 0; j < 5; j++){
      fw_know.appendChild(fw_know.children[j].cloneNode(true))
    }
    console.log(fw_know)
    var next_btn = document.querySelector('.next_btn');
    var prev_btn = document.querySelector('.prev_btn');
    var liWidth = 240;
    var liCount = 8
    function move(width){
      fw_know.className = 'transition'
      fw_know.style.marginLeft = parseInt(fw_know.style.marginLeft) - width + 'px'
    }
    //防止上一张动画没有播放完，用户直接点下一张，所以设置条件
    //初始可以点击
    var canClick = true;
    //定义函数
    function moveTo(width) {
      //如果可以点击
      if(canClick){
        //执行上面定义的动画函数
        move(width);
        //调用之后直接设定为false，不可点击状态，因为此时动画可能没有执行完
        canClick = false;
        //设置一次性定时器，因为动画设置时间是500毫秒，所以设置一秒以后点击才有效果
        setTimeout( () => {
          canClick = true;
        },900)
      }
    }
    next_btn.onclick = () => {
      moveTo(liWidth)
      if(fw_know.style.marginLeft == -liWidth * liCount + 'px'){
        setTimeout(() => {
          fw_know.className = '';
          fw_know.style.marginLeft = 0;
        },500)
      }
    }
    prev_btn.onclick = () => {
      if(fw_know.style.marginLeft == '0px'){
        fw_know.className = '';
        fw_know.style.marginLeft = -liWidth * liCount + 'px';
        setTimeout(() => {
          moveTo(-liWidth)
        },600) 
      } else {
        moveTo(-liWidth)
      }
      
    }
  }
})