// 숫자 배열 만들기 (1, 2, 3, ...)
function makeNumArray(amount) {
  let numArray = new Array(amount);
  for (let i = 0; i < amount; i++) {
    numArray[i] = i;
  }

  return numArray;
}

// 숫자 콤마 추가
function putCommaInNumber(inputNum) {
    let newNum = "";
    inputNum = String(inputNum);

    do{
        if(inputNum.length > 3) {
            newNum = ',' + inputNum.slice(-3) + newNum;
            inputNum = inputNum.slice(0, -3);
        } else {
            newNum = inputNum + newNum;
            inputNum = '';
        } 
    } while(inputNum.length > 0);

    return newNum;
}

// 날짜 출력 형식 (2025년 6월 1일 오전 11시 30분)
function setDateTimeForm(dateInput) {
    let year = dateInput.getFullYear() + '년 ';
    let month = (dateInput.getMonth() + 1) + '월 ';
    let date = dateInput.getDate() + '일 ';
    
    let hour;
    if (dateInput.getHours() >= 12) {
        hour = '오후 ' + dateInput.getHours() + '시 ';
    } else if (dateInput.getHours() == 0){
        hour = '오전 12시 ';
    } else {
        hour = '오전 ' + dateInput.getHours() + '시 ';
    }

    let minute = ' ';
    if (dateInput.getMinutes() > 0) {
        minute = dateInput.getMinutes() + '분 ';
    }

    let dateOutput = year + month + date + hour + minute;
    return dateOutput;
}

// 선택한 값이 없으면 입력, 선택 비활성화 시키기
const setDisableIfEmpty = input => {
    let toDisable =
        input == "" ?
        true : false;
    return toDisable;
};

// 이용 시간 표시 형식
const setResultTimeForm = inputMinute => {
    let inputHour = Math.floor(inputMinute / 60);
    let inputDay = Math.floor(inputHour / 24);

    if (inputMinute % 60 == 0) {
        inputMinute = '';
    } else {
        inputMinute = (inputMinute % 60) + '분 '
    }
    
    if (inputHour % 24 == 0) {
        inputHour = '';
    } else {
        inputHour = (inputHour % 24) + '시간 '
    }

    if (inputDay > 0) {
        inputDay += '일 ';
    } else {
        inputDay = ''
    }

    let timeForm = inputDay + inputHour + inputMinute;
    
    if (timeForm == '') {
        timeForm += '0분';
    }

    return timeForm;
}

// 주차요금 산출
const getResultCost = (inputMinute, usingCharger) => {
    let costOutput = '';

    // 10분 이내 주차, 충전기 미사용
    if (inputMinute <= 10 && !usingCharger) {
        costOutput = '￦ 0 (회차 차량)';

    // 10분 이내 주차하면서 충전기 사용
    } else if (inputMinute <= 10 && usingCharger) {
        costOutput = '￦ 10,000';
    
    // 10분 이상 주차
    } else {
        costOutput = 1000; // 기본 주차 요금 (1시간 기준)
        inputMinute -= 60;

        // 1시간 이상 충전 시 20분당 200원 추가
        if (inputMinute > 0) {
            costOutput += Math.ceil(inputMinute / 20) * 200
        }
        
        // 충전기 사용 시 10,000 원 추가
        if (usingCharger) {
            costOutput += 10000;
        }
        
        costOutput = '￦ ' + putCommaInNumber(costOutput);
    }

    return costOutput;
}

const isExitTimeBeforeEnterTime = (enterHour, enterMinute, exitHour, exitMinute) => {
      let isStrangeTime = false;
      enterHour = Number(enterHour);
      enterMinute = Number(enterMinute);
      exitHour = Number(exitHour);
      exitMinute = Number(exitMinute);

      if (exitHour < enterHour) {
          isStrangeTime = true;
      } else if (exitHour == enterHour && exitMinute < enterMinute) {
          isStrangeTime = true;
      }

      return isStrangeTime;
  }


export {makeNumArray, putCommaInNumber, setDateTimeForm, setDisableIfEmpty, setResultTimeForm, getResultCost, isExitTimeBeforeEnterTime}