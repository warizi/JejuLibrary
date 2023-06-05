const id = document.querySelector('#id');
const pw = document.querySelector('#pw');
const username = document.querySelector('#confirm_username');
const selectYear = document.querySelector('#birth_year');
const selectMonth = document.querySelector('#birth_month');
const selectDay = document.querySelector('#birth_day');
const telFirst = document.querySelector('#tel_first');
const telMiddle = document.querySelector('#tel_middle');
const telLast = document.querySelector('#tel_last');
const emailFirst = document.querySelector('#email_first');
const emailLast = document.querySelector('#email_last');
const confirmPw = document.querySelector('#confirm_pw');
const zonecodeInput = document.querySelector('#sample4_postcode');
const roadAddressInput = document.querySelector('#sample4_roadAddress');
const jibunAddressInput = document.querySelector('#sample4_jibunAddress');
const detailAddressInput = document.querySelector('#sample4_detailAddress');
const extraAddressInput = document.querySelector('#sample4_extraAddress');
const alertText = document.querySelector('#confirm_pw_alert');
const selectEmail = document.querySelector('#select_email');
const genderInputAll = document. querySelectorAll('.gender_radio');
const submit = document.querySelector('#signup-form');

const addressInfo = {
    zonecode: "",
    fullAddress: "",
    roadAddress: "",
    jibunAddress: "", 
    buildingName: "",
    sido: "",
    sigungu: "",
    detail: "",
}
function signupForm () {
    
    submit.addEventListener('submit', (e) => {
        e.preventDefault();
        const phoneNumber = telFirst.value + telMiddle.value + telLast.value;
        const email = emailFirst.value + '@' + emailLast.value;
        const birthDate = new Date(selectYear.value, selectMonth.value, selectDay.value);
    
        //성별이 선택된 radio input의 값을 반환합니다.
        function selectedGender () {
            for (let i = 0; i < genderInputAll.length ; i++ ) {
                if (genderInputAll[i].checked) {
                    return genderInputAll[i].value
                }
            }
        }
        addressInfo.roadAddress = roadAddressInput.value;
        addressInfo.jibunAddress = jibunAddressInput.value;
        addressInfo.detail = detailAddressInput.value;
        const data = {
            userId: id.value,
            userName: username.value,
            password: pw.value,
            phoneNumber: phoneNumber,
            email: email,
            birth: birthDate,
            gender: selectedGender(),
            addressInfo: addressInfo,
        }
        if(id.value.length < 2) {//아이디 글자 수 제한 
            alert('아이디를 확인해주세요.');
            return
        }
        if(pw.value.length < 4) {//패스워드 글자 수 제한
            alert('비밀번호를 확인해 주세요.');
            return
        }
        if(pw.value !== confirmPw.value) {//패스워드 일치 여부 
            alert('비밀번호가 일치하지 않습니다.');
            return
        }
        if(username.value.length === 0) {
            alert('이름을 확인해주세요.');
            return
        }
        if(!Number(selectYear.value) || !Number(selectMonth.value) || !Number(selectDay.value)) {
            alert('생년월일을 확인해주세요.');
            return
        }
        if(telFirst.value.length < 3 || telMiddle.value.length < 4 || telLast.value.length < 4) {
            alert('연락처를 확인해주세요.');
            return
        }
        const emailTest = /^[^\s@]+@[^\s@]+\.[A-Za-z]+$/;
        if(!emailTest.test(emailFirst.value + '@' + emailLast.value)){
            alert('이메일을 확인해주세요.');
            return
        }
        
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
         if(res.status === 201) {
            window.location.href = '/login';
         }
        })
        .catch((err) => {
         console.error(err)
        })
    });
    
    confirmPw.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length === 0) {
            alertText.textContent = "";
        } else if (value === pw.value) {
            alertText.textContent = '비밀번호가 일치합니다.';
            alertText.style.color = 'green';
        } else {
            alertText.textContent = '비밀번호가 일치하지 않습니다.';
            alertText.style.color = 'red';
        }
    });
    
    
    let yearFirst = true;
    let monthFirst = true;
    
    selectYear.addEventListener('focus', () => {
        if(yearFirst) {
            for (let i = 1930; i <= 2023; i++) {
                const yearOption = document.createElement('option');
                yearOption.setAttribute('value', i);
                yearOption.innerText = i;
                selectYear.appendChild(yearOption);
            }
            yearFirst = false;
        }
    });
    
    selectMonth.addEventListener('focus', () => {
        if(monthFirst) {
            for (let i = 1; i <= 12; i++) {
                const monthOption = document.createElement('option');
                monthOption.setAttribute('value', i);
                monthOption.innerText = i;
                selectMonth.appendChild(monthOption);
            }
        }
        monthFirst = false;
    });
    
    selectDay.addEventListener('focus', () => {
        if(selectYear.value !== '출생연도' && selectMonth.value !== '월'){
            let year = selectYear.value;
            let month = selectMonth.value;
            month -= 1;
            const date = new Date(year, month + 1, 1);
            date.setDate(date.getDate() - 1);
            selectDay.innerHTML = `
                <option disabled selected>일</option>
            `;
            for (let i = 1; i <= date.getDate(); i++) {
                const dayOption = document.createElement('option');
                dayOption.setAttribute('value', i);
                dayOption.innerText = i;
                selectDay.appendChild(dayOption);
            }
        }
    });
    
    
    telFirst.addEventListener('keypress', (e) => {
        const keyCode = e.keyCode;
      
      if (keyCode < 48 || keyCode > 57) {
        if (keyCode !== 8) {
          e.preventDefault();
        }
      }
    });
    telFirst.addEventListener('input', (e) => {
        const value = e.target.value;
        if(value.length === 3) {
            telMiddle.focus();
        } else if (value.length > 3) {
            e.target.value = value.substring(0, 3);
            telMiddle.focus();
        }
    });
    telMiddle.addEventListener('keypress', (e) => {
        const keyCode = e.keyCode;
      
      if (keyCode < 48 || keyCode > 57) {
        if (keyCode !== 8) {
          e.preventDefault();
        }
      }
    });
    telMiddle.addEventListener('input', (e) => {
        const value = e.target.value;
        if(value.length === 4) {
            telLast.focus();
        } else if (value.length > 4) {
            e.target.value = value.substring(0, 4);
            telLast.focus();
        }
    });
    telLast.addEventListener('keypress', (e) => {
        const keyCode = e.keyCode;
      
      if (keyCode < 48 || keyCode > 57) {
        if (keyCode !== 8) {
          e.preventDefault();
        }
      }
    });
    telLast.addEventListener('input', (e) => {
        const value = e.target.value;
        if(value.length === 4) {
            telLast.blur();
        } else if (value.length > 4) {
            e.target.value = value.substring(0, 4);
            telLast.blur();
        }
    });
    
    
    selectEmail.addEventListener('change', (e) => {
        const value = e.target.value;
        emailLast.value = value;
    })
    
    
    
    emailLast.addEventListener('input', (e) => {
        const value = e.target.value;
        if(value === "naver.com") {
            selectEmail.value = 'naver.com';
        } else if (value === "hanmail.net") {
            selectEmail.value = 'hanmail.net';
        } else if (value === "gmail.com") {
            selectEmail.value = 'gmail.com';
        } else if (value === 'daum.net') {
            selectEmail.value = 'daum.net';
        } else {
            selectEmail.value = '직접입력';
        }
    })
    
    
}

function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // addressInfo에 넣는 작업
            if(data.buildingName !== "") {
                
            } else {
                addressInfo.buildingName = "확인되지 않음";
            }
            data.buildingName === "" ? addressInfo.buildingName = "확인되지 않음" : addressInfo.buildingName = data.buildingName;
            data.roadAddress === "" ? addressInfo.roadAddress = "확인되지 않음" : addressInfo.roadAddress = data.roadAddress;
            addressInfo.zonecode = data.zonecode;
            addressInfo.fullAddress = data.address;
            addressInfo.jibunAddress = data.jibunAddress;
            addressInfo.sido = data.sido;
            addressInfo.sigungu = data.sigungu;

            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById("sample4_roadAddress").value = roadAddr;
            document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
            
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("sample4_extraAddress").value = extraRoadAddr;
            } else {
                document.getElementById("sample4_extraAddress").value = '';
            }

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else if(data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
}


signupForm();


