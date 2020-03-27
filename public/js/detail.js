// 商品详情页数据
var id = location.search.split('=')[1]
myAjax({
  type: 'get',
  data : `id=${id}`,
  url : '/product/detail',
  dataType : 'json',
  success(result){
    //获取网页整个头部的title标题，把产品的标题赋值给网页头部的title
    var title = document.querySelector('title');
    title.innerHTML = `${result.title}-Rosewin鲜花网`;
    
    //详情页显示图片
    var imgs = document.querySelectorAll('.pro_l img');
    for(var img of imgs){
      img.src = result.img
    }
    //商品基本信息
    console.log(result);
    var pro_r = document.querySelector('.pro_r');
    pro_r.innerHTML = `
          <p class="pro_title">
            <a href="pro_detail.html?id=${result.id}" title="${result.title}">${result.title}</a>
          </p>
          <div class="now_price">
            <span class="si_tit">花赞价</span>
            <span class="shop_price">￥<em>${result.price}</em></span>
          </div>
          <div class="summary-item">
            <div class="si_tit">编&nbsp;&nbsp;&nbsp;&nbsp;号</div>
            <div class="si_warp">${result.product_id}</div>
          </div>
          <div class="summary-item">
            <div class="si_tit">材&nbsp;&nbsp;&nbsp;&nbsp;料</div>
            <div class="si_warp">${result.materials}</div>
          </div>
          <div class="summary-item">
            <div class="si_tit">包&nbsp;&nbsp;&nbsp;&nbsp;装</div>
            <div class="si_warp">${result.pack}</div>
          </div>
          <div class="summary-item">
            <div class="si_tit">附&nbsp;&nbsp;&nbsp;&nbsp;赠</div>
            <div class="si_warp">${result.presenter}</div>
          </div>
          <div class="summary-item">
            <div class="si_tit">配&nbsp;&nbsp;&nbsp;&nbsp;送</div>
            <div class="si_warp">${result.distribu}</div>
          </div>
          <div class="summary-item">
            <div class="si_tit">说&nbsp;&nbsp;&nbsp;&nbsp;明</div>
            <div class="si_warp">${result.explains}</div>
          </div>
          <div class="summary-item">
            <div class="si_tit">数&nbsp;&nbsp;&nbsp;&nbsp;量</div>
            <div class="si_warp"><button>-</button><input type="input" value="1"><button>+</button></div>
            <div class="clear"></div>
            <div class="add">
              <button>加入购物车</button>
              <button class="add_buy">即刻购买</button>
            </div>
            <div id="pro_collect" title="加入收藏">
              
            </div>
             <div id="pro_share" title="分享">
               <div class="pro_share_m" id="show_share">
                  <div class="header_sj">
                  </div>
                  <div class="btn_share">
                    <a href="javascript:;" title="分享到微信" id="to_wx"></a>
                    <a href="javascript:;" title="分享到微博" id="to_sina"></a>
                    <a href="javascript:;" title="分享到QQ" id="to_qq"></a>	 
                  </div>
               </div>
            </div>
    `
    //商品详细信息
    var proImg = document.querySelector('.proImg');
    proImg.innerHTML = result.details;


    //分享按钮
    pro_share.onmousemove = function() {
      show_share.style.display = 'block';
    }
    pro_share.onmouseout = function() {
      show_share.style.display = 'none';
    }


//商品数量加减
//获取按钮组和输入框
var btns = document.querySelectorAll('.si_warp button');
//遍历按钮组判断加减
for(var btn of btns) {
  //为每个按钮添加点击事件
  btn.onclick = function () {
    //获取输入框
    var input = this.parentNode.children[1];
    //获取输入框内容转化为整型，因为要计算
    var count = parseInt(input.value); 
    //判断如果按钮的内容是+，则让输入框的内容加一，如果输入框的内容大于0，则可以减少
    if(this.innerHTML == '+'){
      count++;
    } else if(count > 1){
      count--;
    }
    //把得出来的数据复制给输入框
    input.value = count;
  }
}


  }
})



//图片放大镜效果
var box = document.getElementById('pro_big');
	  var smallBox = box.children[0];
	  var bigBox = box.children[1];
	  var smallImage = smallBox.children[0];
	  var mask = smallBox.children[1];
	  var bigImage = bigBox.children[0]; 
       //1.鼠标经过的时候 显示mask和bigBox，当鼠标离开的时候隐藏mask和bigBox
       box.onmouseover = function () {
       	  mask.style.display = 'block';
       	  bigBox.style.display = 'block';
       }
       box.onmouseout = function () {
       	  mask.style.display = 'none';
       	  bigBox.style.display = 'none';
       }
       //2.当鼠标在盒子中移动的时候，让mask和鼠标一起移动
       box.onmousemove = function (e) {
          e = e || window.event;
          //获取鼠标在盒子中的位置，就是maxk的坐标
          var maskX = e.pageX - box.offsetLeft;
          var maskY = e.pageY - box.offsetTop;
          //让鼠标出现在mask的中心点
          maskX = maskX - mask.offsetWidth / 2;
          maskY = maskY - mask.offsetHeight / 2;
          //把mask限制到box中
          maskX = maskX < 0 ? 0 : maskX;
          maskY = maskY < 0 ? 0 : maskY;
          maskX = maskX > box.offsetWidth - mask.offsetWidth ? box.offsetWidth - mask.offsetWidth : maskX;
          maskY = maskY > box.offsetHeight - mask.offsetHeight ? box.offsetHeigth - mask.offsetHeight : maskY;
          mask.style.left = maskX + 'px';
          mask.style.top = maskY + 'px';
          //3.当mask移动的时候，让大图片移动
          //求大图片移动的距离
       //mask移动的距离 / mask最大能够移动的距离 = 大图片移动的距离 / 大图片最大能够移动的距离
       //mask最大能够移动的距离
       var maskMax = box.offsetWidth - mask.offsetWidth;
       var bigImageMax = bigBox.offsetWidth - bigImage.offsetWidth;
       var bigImageX = maskX * (bigImageMax / maskMax);
       var bigImageY = maskY * (bigImageMax / maskMax);
       bigImage.style.left = bigImageX + 'px';
       bigImage.style.top = bigImageY + 'px';
       }



//商品详情页加入购物车隐藏显示功能
//当屏幕移动超过787，则让proTab，处于固定定位状态，固定到屏幕顶部，如果小于787，则恢复在页面位置，
//给页面滚动添加事件
  window.onscroll = function () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //查找class名为proTab元素和proTab_btn元素
    var tab = document.getElementsByClassName('proTab')[0];
    var btns = document.getElementsByClassName('proTab_btn')[0];
    //如果滚动距离大于787，
    if(scrollTop > 787){
      //让按钮组显示
      btns.style.display = 'block';
      //让栏目为固定在屏幕顶部
      tab.className += ' proTab1';
    } else {
      //按钮组隐藏
      btns.style.display = 'none';
      //让栏目恢复原来的样子
      tab.className = 'proTab';
    }
  }


  