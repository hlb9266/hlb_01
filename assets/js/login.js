$(function () {

  // 1. 点击 去注册账号 的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 2. 点击 去登录 的链接
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 3. 从 layui 中获取 form 对象
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (value !== pwd) {
        return '俩次密码不一致！'
      }
    }
  })

  // 4. 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功！请登录')
      $('#link_login').click()
    })
  })

  // 5. 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        console.log(res.token);
        localStorage.setItem('token',res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })

})




