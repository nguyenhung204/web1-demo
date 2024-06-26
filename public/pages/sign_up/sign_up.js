$(document).ready(function Validate () {
  // Username validation
  $('#username').on('blur', function () {
    var username = $(this).val();
    var regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(username)) {
      $('#us-err').text('Tên người dùng chỉ có thể chứa các ký tự chữ và số.');
    }
    else {
      $('#us-err').text('');
    }
    
  });

  // Email validation
  $('#email').on('blur', function () {
    var email = $(this).val();
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      $('#email-err').text('Vui lòng nhập một địa chỉ email hợp lệ.');
    }
    else {
      $('#email-err').text('');
    }
  });

  // Password validation
  $('#password').on('blur', function () {
    var password = $(this).val();
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(password)) {
      $('#pw-err').text('Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất một chữ cái và một số.');
    } else {
      $('#pw-err').text('');
    }
  });

  // Confirm password validation
  $('#confirm-password').on('blur', function () {
    var confirmPassword = $(this).val();
    var password = $('#password').val();
    if (confirmPassword !== password) {
      $('#cpw-err').text('Mật khẩu xác nhận không khớp.');
    } else {
      $('#cpw-err').text('');
    }
  });
});


function Sign_up(e) {

  e.preventDefault();

  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirm = document.getElementById('confirm-password').value;

  var header = {alg: "HS256", typ: "JWT"};
  var payload = {
    username: username,
    password: password,
    email: email,
    confirm: confirm
  };
  var secret = "diner-sign-up-key";
  var sHeader = JSON.stringify(header);
  var sPayload = JSON.stringify(payload);
  var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, {utf8: secret});
  console.log(sJWT);

  if (localStorage.getItem(username) ) {
    alert('Tên người dùng đã được sử dụng');
    Validate();
    return;
  }
  else{
    localStorage.setItem(username, sJWT);
    alert('Đăng ký thành công')
    window.location.href = '../login/index.html';
  }
  
}


form_signup = document.querySelector('#form-signup');
form_signup.addEventListener('submit', Sign_up);


