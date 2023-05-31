const loginForm = document.querySelector('.login-form');
const idInput = document.querySelector('#id');
const pwInput = document.querySelector('#password');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!idInput.value) {
        alert('아이디를 입력해주세요.');
    } else if(!pwInput.value) {
        alert('비밀번호를 입력해주세요.');
    } else {
        loginForm.submit();
    }
})
