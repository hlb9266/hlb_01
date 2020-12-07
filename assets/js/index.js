$(function() {
  getUserInfo()
})
var layer = layui.layer
// 给退出绑定点击事件
$('#btnLogout').on('click',function() {
  layer.confirm('确定退出登录吗？',{icon: 3,title: '提示'},
  function(index) {
    localStorage.removeItem('token')
    location.href = '/login.html'
    layer.close(index)
  })
})

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function(res) {
     if(res.status !== 0) {
      //  console.log(res);
       return layui.layer.msg('获取用户信息失败！')
     }
     renderAvatar(res.data)
    }
    // complete: function(res) {
    //   // console.log('执行了 complete 回调');
    //   // console.log(res);
    //   if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     localStorage.removeItem('token')

    //     location.href = '/login.html'
    //   }
    // }
  })
}
// 渲染用户头像
function renderAvatar(user) {
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if(user.user_pic !== null) {
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  } else {  
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}

