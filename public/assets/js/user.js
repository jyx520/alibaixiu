// 当表单发生提交行为时
$('#userForm').on('submit', function() { 
    // alert(123);
    // 获取用户在表单中输入的内容并将内容格式化成参数
    // email=zhangsan%40sina.com.cn&nickName=11111&password=11111&status=0&role=admin
    var formData = $(this).serialize();
    // console.log(formData);
    // 向服务器端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData, 
        success: function(result) {
            location.reload();
        }, 
        error: function() {
            alert('用户添加失败!!!')
        }
    })
    // 阻止表单默认提交行为
    return false;
});

// 当用户选择文件的时候
$('#avatar').on('change', function() {
    // 用户选择到的文件
    // console.log(this.files[0]);
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            // console.log(response);
            // 实现头像预览功能
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })    
});

// 向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        // console.log(response);
        
        // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('userTpl', {
            data: response,
        });
        // console.log(html);
        // 将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
});