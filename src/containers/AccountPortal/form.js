function checkString(inputString1,inputString2,type) {
  const specialChars = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";
  let hasLowerCase = false;
  let hasUpperCase = false;

  if (type === 1){
    if ( inputString1 !== inputString2 ) {
      return "密碼與確認密碼不符合"
    };
    if (inputString1 == '' || inputString2 == ''){
      return "密碼不能為空白"
    }
  }

  for (let char of inputString1) {
    if (char >= 'a' && char <= 'z') {
      hasLowerCase = true;
    }
    if (char >= 'A' && char <= 'Z') {
      hasUpperCase = true;
    }
  }
  
  if (hasLowerCase && hasUpperCase) {
    let hasSpecialChar = false;
    for (let char of inputString1) {
      if (specialChars.includes(char)) {
        hasSpecialChar = true;
        break;
      }
    }
    if (!hasSpecialChar) {
      return "需要特殊字符";
    }
  } else {
    return "需包含大小寫字母";
  }
  
  if (inputString1.length > 30) {
    return "長度需在30個字符以內";
  }
  
  return true;
}

export default checkString;
