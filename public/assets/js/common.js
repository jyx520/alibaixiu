$('#logout').on('click', function () {
    var isConfirm = confirm('您真的要退出吗?');
    if (isConfirm) {
        // alert('用户点击了确认按钮');
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function (result) {
                location.herf = 'login.html';
            },
            error: function () {
                alert('退出失败');
            }
        })
    }
});