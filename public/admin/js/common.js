//禁用进度环
NProgress.configure({ showSpinner: false });

//注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
$(document).ajaxStart(function () {
  //开启进度条
  NProgress.start();
});

$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 300);
});

if(location.href.indexOf("login.html")== -1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function(data){
      if(data.error === 400){
        //说明用户没有登录,跳转到登录页面
        location.herf = "login.html";
      }
    }
  })
}
//侧边栏显示隐藏功能
$(".icon_menu").on("click",function(){
  $(".lt_aside").toggleClass("now");
  $(".lt_mian").toggleClass("now");
  // $(".topbar").toggleClass("now");
});

//二级分类显示隐藏功能
$(".child").prev().on("click",function(){
  $(this).next().slideToggle();
});

// 退出功能
$(".icon_logout").on("click",function(){
  $('#myModal').modal('show');  
  $(".btn_logout").off().on("click",function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function (data) {
        if(data.success){
          location.href="login.html";
        }
      }
    });
  });
});
