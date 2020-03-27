login.onclick = function () {
	login.className = 'box_checked';
	register.className = '';
	swiper.style.right = '-326px';
	reg_main.style.height = '380px';
	reg_main.style.transition = '0.5s';
}
function show() {
	login.className = 'box_checked';
	register.className = '';
	swiper.style.right = '-326px';
	reg_main.style.height = '380px';
	swiper.style.transition = 'none';
	reg_main.style.transition = 'none';
}
register.onclick = function () {
	register.className = 'box_checked';
	login.className = '';
	swiper.style.right = '-28px';
	reg_main.style.height = '457px';
	reg_main.style.transition = '0.2s';
}
//切换登录方式
var swicther = false;
login_switch.onclick = function () {
  if(!swicther){
  	stateOpen.style.display = 'none';
  	stateClose.style.display = 'block';
  	swicther = true;
  	login_switch.innerHTML = '使用账号密码登陆';
  	return;
  }
  if(swicther){
    stateOpen.style.display = 'block';
  	stateClose.style.display = 'none';
  	swicther = false;
  	login_switch.innerHTML = '使用手机验证码登陆';
  	return;
  }
}
//验证用户名/手机号
var isUname = false;  //定义一个用户名验证
uname.onblur = function () {
	var hint = uname_msg.children[0]; //获取需要提示的元素
	if(uname.value.length == 0 || uname.value.length != 11){  //检查是否为有效手机号
		uname_msg.style.display = 'block';
		hint.innerHTML = '请输入有效手机号';
		isUname = false;
	} else {
    var xhr = new XMLHttpRequest();    //创建ajax异步对象，检测手机号是否注册
    xhr.onreadystatechange = function () {
    	if(xhr.readyState == 4 && xhr.status == 200){
    		var result = xhr.responseText;
    		if(result == 1){
    			isUname = true;
    		} else {
    			uname_msg.style.display = 'block';
    			hint.innerHTML = '手机号码被占用';
    			isUname = false;
    		}
    	}
    }
    xhr.open('get','/user/register/' + uname.value,true);
		xhr.send();
	}
}
uname.onfocus = function () {   //如果输入有误，再次获取焦点，则清空输入的内容
	uname_msg.style.display = 'none';
	if(!isUname){
    uname.value = '';
	}
}
//创建图形验证码
var code;    //创建全局函数保存验证码
var code1;  
function change() {
	code = '';  //验证码赋值为空字符
	code1 = '';
	//var arr = ['a','b','c','d','e','f','A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'];
	var str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
	for(var i = 0; i < 4; i++) {
		var index = Math.floor(Math.random() * str.length);
		var fs = Math.floor(Math.random() * (30 - 12) + 12);
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		code += '<span style="font-size:' + fs + 'px;color:rgb(' + r + ',' + g + ',' + b + ');">' + str[index] + '<span>';
		code1 += str[index];
	}
  getCode.innerHTML = code;
  log_code.innerHTML = code;
}
getCode.onclick = function () {  //点击换一张，再次调用创建验证码函数
  	change();
  }

//验证图形验证码
var isCode = false;  //定义一个验证码验证
reg_code.onblur = function () {  //失去焦点的时候验证
	var $reg_code = reg_code.value.toUpperCase();  //创建的验证码和用户输入的验证码同时转大写
	var $code1 = code1.toUpperCase();
	var hint = getCode1.children[0];  //获取提示框
	if($reg_code <= 0){
		getCode1.style.display = 'block'; 
		getCode1.style.left = '-55px';
		hint.innerHTML = '请输入验证码';
		isCode = false;
	} else if($reg_code != $code1){
		getCode1.style.display = 'block'; 
		getCode1.style.left = '-55px';
		hint.innerHTML = '验证码不正确';
		change();
		isCode = false;
	} else{
		isCode = true;
	}
}

reg_code.onfocus = function () {
	getCode1.style.display = 'none';
	reg_code.value = '';
}

//创建短信验证码
var key = true;  //定义重新发送验证码的验证
var phone_code;
get_code.onclick = function () {
	phone_code = '';
	if(key){
		key = false;
		get_code.innerHTML = '60s后重新发送';    //点击发送验证码之后创建验证码

    for(var i = 0; i < 4; i++){    //创建验证码
      phone_code += Math.floor(Math.random() * 10);
    } 
    console.log(phone_code);
		var time = 60;
		var timer = setInterval(function () {     //创建定时器，60s后重新发送验证码
      time--;
      get_code.innerHTML = time + 's后重新发送';
      if(time == 0){
      	get_code.innerHTML = '获取短信验证码';
      	key = true;
      	clearInterval(timer);
      }
		},1000)
	} 
}
//验证手机验证码是否正确
var isMsg_code = false;
msg_code.onblur = function () {
	var hint = msgCode.children[0];
	if(msg_code.value == 0){
		msgCode.style.display = 'block';
    hint.innerHTML = '验证码不能为空';
    isMsg_code = false;
	} else if(msg_code.value != phone_code) {
    msgCode.style.display = 'block';
    hint.innerHTML = '验证码不正确';
    isMsg_code = false;
	} else {
		isMsg_code = true;
	}
}
msg_code.onfocus = function () {
	msgCode.style.display = 'none';
}
//验证密码
var isUpwd = false;
upwd.onfocus = function () {
	var hint = check_upwd.children[0];
	check_upwd.style.display = 'block';
	hint.innerHTML = '请输入6位以上数密码';
}
upwd.onblur = function () {
	var hint = check_upwd.children[0];
	if(upwd.value.length == 0){
		check_upwd.style.display = 'block';
		hint.innerHTML = '密码不能为空';
		isUpwd = false;
	} else if(upwd.value.length < 6) {
		check_upwd.style.display = 'block';
		hint.innerHTML = '密码长度不正确';
		isUpwd = false;
	} else {
		check_upwd.style.display = 'none';
		isUpwd = true;
	}
}
//验证再次输入密码是否与上次一致
var isUpwd1 = false;
upwd1.onblur = function () {
	var hint = check_upwd1.children[0];
	if(upwd1.value != upwd.value) {
    check_upwd1.style.display = 'block';
    hint.innerHTML = '密码输入不一致';
    isUpwd1 = false;
	} else {
		check_upwd1.style.display = 'none';
		isUpwd1 = true;
	}
}
//点击注册按钮，依次检测手机号、验证码、手机短信、密码是否全部正确，不正确显示提示框，正确则往数据库提交注册
reg.onclick = function () {
	if(isUname){
		if(isCode){
      if(isMsg_code){
        if(isUpwd){
          if(isUpwd1){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
            	if(xhr.readyState == 4 && xhr.status == 200){
                var result = xhr.responseText;
                if(result = 1){
                	location.href = 'index.html';
                } else {
                	alert('注册失败');
                }
            	}
            } 
            xhr.open('post','user/register',true);
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
            var formdata = `uname=${ uname.value }&upwd=${ upwd.value }&phone=${ uname.value }`;
            xhr.send(formdata);
          } else {
          	check_upwd1.style.display = 'block';
          }
        } else {
        	check_upwd.style.display = 'block';
        }
      } else {
      	msgCode.style.display = 'block';
      }
		} else {
			getCode1.style.display = 'block';
		}
	} else {
		uname_msg.style.display = 'block';
	}
}

//验证用户名密码登陆
var isLog_uname = false;   //验证用户名非空
log_uname.onblur = function () {
   if(log_uname.value.length <= 0){
   	var hint = log_uname_msg.children[0];
   	log_uname_msg.style.display = 'block';
   	hint.innerHTML = '手机号不能为空';
   	isLog_uname = false;
   } else {
   	isLog_uname = true;
   }
}
log_uname.onfocus = function () {
	log_uname_msg.style.display = 'none';
}

var isLog_upwd = false;    //验证秘密非空
log_upwd.onblur = function () {
	if(log_upwd.value.length <= 0){
		var hint = log_upwd_msg.children[0];
		log_upwd_msg.style.display = 'block';
		hint.innerHTML = '密码不能为空';
		isLog_upwd = false;
	} else {
		isLog_upwd = true;
	}
}

//登陆
log.onclick = function () {
	if(isLog_uname){
	  if(isLog_upwd){
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function () {
	    	if(xhr.readyState == 4 && xhr.status == 200){
	    		var result = xhr.responseText;
	    		if(result == 1){
	    			location.href = 'index.html';
	    		} else {
	    			var hint = log_upwd_msg.children[0];
	    			var sj = log_upwd_msg.children[1];
	    			hint.style.top = '-19px';
	    			hint.style.left = '69px';
	    			log_upwd_msg.style.display = 'block';
	    			sj.style.display = 'none';
	    			hint.innerHTML = '用户名或密码错误';
	    			setTimeout(function () {
	            log_upwd_msg.style.display = 'none'; 
	    			},2000);
	    		}
	    	}
	    }
	    xhr.open('get','/user/login/' + log_uname.value + '&' + log_upwd.value,true);
	    xhr.send();
	  } else {
	  	log_upwd_msg.style.display = 'block';
	  }
  } else {
	  log_uname_msg.style.display = 'block';
    }
}
//使用验证码登陆
//验证图形验证码
var isLoginCode = false;
log_getCode.onblur = function () {
  var $log_getCode = log_getCode.value.toUpperCase();  //创建的验证码和用户输入的验证码同时转大写
	var $code1 = code1.toUpperCase();
	var hint = log_getCode1.children[0];  //获取提示框
	if($log_getCode <= 0){
		log_getCode1.style.display = 'block'; 
		log_getCode1.style.left = '-55px';
		hint.innerHTML = '请输入验证码';
		isLoginCode = false;
	} else if($log_getCode != $code1){
		log_getCode1.style.display = 'block'; 
		log_getCode1.style.left = '-55px';
		hint.innerHTML = '验证码不正确';
		change();
		isLoginCode = false;
	} else{
		isLoginCode = true;
	}
}
log_getCode.onfocus = function () {
	log_getCode1.style.display = 'none';
	log_getCode.value = '';
}

//创建登陆短信验证码
var log_key = true;  //定义重新发送验证码的验证
var log_phone_code;
get_code1.onclick = function () {
	log_phone_code = '';
	if(log_key){
		log_key = false;
		get_code1.innerHTML = '60s后重新发送';    //点击发送验证码之后创建验证码

    for(var i = 0; i < 4; i++){    //创建验证码
      log_phone_code += Math.floor(Math.random() * 10);
    } 
    console.log(log_phone_code);
		var time = 60;
		var timer = setInterval(function () {     //创建定时器，60s后重新发送验证码
      time--;
      get_code1.innerHTML = time + 's后重新发送';
      if(time == 0){
      	get_code1.innerHTML = '获取短信验证码';
      	log_key = true;
      	clearInterval(timer);
      }
		},1000)
	} 
}
//验证登陆手机验证码
var isLog_code = false;
msg_code1.onblur = function () {
	var $msg_code1 = msg_code1.value;
	var hint = log_get_Code1.children[0];
	if($msg_code1.length <= 0){
		log_get_Code1.style.display = 'block';
		isLog_code = false;
	} else if($msg_code1 != log_phone_code){
        log_get_Code1.style.display = 'block';
        hint.innerHTML = '验证码不正确';
		isLog_code = false;
	} else {
		isLog_code = true;
		log_get_Code1.style.display = 'none';
	}
}
msg_code1.onfocus = function () {
	log_get_Code1.style.display = 'none';
	msg_code1.value = '';
}
//手机验证码登陆
log1.onclick = function () {
	if(isLog_uname){
    if(isLoginCode){
      if(isLog_code){
         var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function () {
	    	if(xhr.readyState == 4 && xhr.status == 200){
	    		var result = xhr.responseText;
	    		if(result == 1){
	    			location.href = 'user.html';
	    		} else {
	    			var hint = log_get_Code1.children[0];
	    			var sj = log_get_Code1.children[1];
	    			log_get_Code1.style.display = 'block';
	    			sj.style.display = 'none';
	    			hint.style.top = '-19px';
	    			hint.style.left = '69px';
	    			hint.innerHTML = '用户名不存在';
	    			setTimeout(function () {
	    				log_get_Code1.style.display = 'none';
	    				sj.style.display = 'block';
	    				hint.style.top = '-17px';
	    			  hint.style.left = '139px';
	    			  hint.innerHTML = '验证码为空';
	    			  change();
	    			},2000);
	    		}
	    	}
	    }
	    xhr.open('get','/user/phoneLogin/' + log_uname.value,true);
	    xhr.send();
      } else {
      	log_get_Code1.style.display = 'block';
      }
    } else {
    	log_getCode1.style.display = 'block';
    }
	} else {
		log_uname_msg.style.display = 'block';
	}
}