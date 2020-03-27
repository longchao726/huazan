(function () {
  //先获取页面上面上的ul，然后再ul内获取所有的加减按钮
  var ul = document.getElementsByTagName('ul')[0];
  var btns = ul.getElementsByTagName('button');
  //为所有的btn添加点击事件
  for (var btn of btns){
    btn.onclick = function () {
      //获取input元素对象，当按钮点击的时候改变input的value，通过父对象的第二个子元素获取
      var input = this.parentNode.children[1];
      //定义一个变量动态改变input的value
      var count = parseInt(input.value);
      //如果按钮的内容是+，则count加1
      if(this.innerHTML == '+'){
        count++;
      } else if(count > 1){
        //购物车商品数量不能小于1.则如果count大于，则点击-的按钮让count减1
        count--;
      }
      //把修改后的count值实时赋值给input
      input.value = count;
      //获取单价和小计根据input的值，动态改变小计的结果,通过当前点击的按钮获取按钮前后的单价和小计
      var price = this.parentNode.parentNode.previousElementSibling;
      var sub = this.parentNode.parentNode.nextElementSibling;
      //单价前面有中文的￥符号，所以需要用到slice进行切割
      sub.innerHTML = `￥${(parseFloat(price.innerHTML.slice(1)) * count).toFixed(2)}`;
      //调用函数改变total总价
      change();
    }
  }
  var change = function () {
    //获取总价
    var total = document.querySelector('.cbm_pay_price');
    //获取页面上所有选中的商品的小计，相加得出的结果赋值给总价
    var subDivs = document.getElementsByClassName('unitPrice');
    //循环遍历得到每个小计
    //定义一个变量来保存循环得到的结果
    var result = 0;
    for(var subDiv of subDivs){
      //获取小计前父元素的第一个子元素下的选择框
      var cartCheck = subDiv.parentNode.children[0].children[0];
      //如果选择框是选中状态的话，则让小计的结果参与赋值
      if(cartCheck.checked == true){
        result += parseFloat(subDiv.innerHTML.slice(1));
      }
    }
    total.innerHTML = `￥${result.toFixed(2)}`;

    //获取已选择商品的总数量和所有的ul里面input的数量
    var choseNum = document.querySelector('.cbm_choseNum');
    var inputValues = ul.querySelectorAll('.cart_int');
    var value = 0;
    for (var inputValue of inputValues){
      var cartValue = getParent(inputValue,3).children[0].children[0];
      if(cartValue.checked == true){
        value += parseInt(inputValue.value);
      }
    }
    choseNum.innerHTML = value;
  }
  change();

  //修改全选框和选择框，页面上有两个全选框，两个全选框状态一样，如果全选框是选中状态，那么页面中产品前的选择框都要选中
  //获取两个全选框
  var allPro1 = document.getElementById('allPro1');
  var allPro2 = document.getElementById('allPro2');
  //给第一个全选框添加点击事件
  allPro1.onclick = function () {
    //获取ul下产品前所有的选择框
    var proChecks = ul.querySelectorAll('input[type = "checkbox"]');
    //循环遍历得到每一个选择框
    for(var proCheck of proChecks){
      //让每个选择框的选择状态等于全选框的选择状态
      proCheck.checked = this.checked;
    }
    allPro2.checked = this.checked;
    change();
  }
  //第二个选择框同第一个选择框一样的效果
  allPro2.onclick = function () {
    allPro1.checked = this.checked;
    var proChecks = ul.querySelectorAll('input[type = "checkbox"]');
    //循环遍历得到每一个选择框
    for(var proCheck of proChecks){
      //让每个选择框的选择状态等于全选框的选择状态
      proCheck.checked = this.checked;
    }
    change();
  }
  //同时，如果产品前的选择框有一个不是选中的则，上下两个全选框也不能选中，只有全部都选中，上下两个选择框才能选中
  //获取所有的产品前的选择框
  var proChecks = ul.querySelectorAll('input[type = "checkbox"]');
  //循环遍历每个选择框
  for(var proCheck of proChecks){
    //给每个选择框添加点击事件
    proCheck.onclick = function () {
      //用数组的方法every来判断是否都满足要求，满足返回true，不满足返回false
      allPro1.checked = [].every.call(proChecks,(elem) => elem.checked == true);
      allPro2.checked = [].every.call(proChecks,(elem) => elem.checked == true);
      change();
    }
  }
})()