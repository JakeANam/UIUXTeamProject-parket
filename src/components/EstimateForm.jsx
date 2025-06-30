import { useState } from 'react';
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';

// 주차장 정보 가져오기
import LpData from '../data/Lp_data';
import parkingPaymentData from '../data/parkingPaymentData';
import PaymentForm from './PaymentForm';

import { makeNumArray, setDisableIfEmpty, setResultTimeForm, getResultCost, isExitTimeBeforeEnterTime } from './paymentUtils'

const EstimateForm = () => {
  let [parkingLots, setParkingLots] = useState(LpData); // 주차장 목록
  let [disableParkinglot, setDisableParkinglot] = useState(true); // 주차장 선택 막기
  let [disableSelectTime, setDisableSelectTime] = useState(true); // 시간 선택 막기

  // 선택한 내용: 내용 전달, 초기화에 사용
  const [selectedArea, setSelectedArea] = useState(''); // 지역
  const [selectedParkinglot, setSelectedParkinglot] = useState(''); // 주차장
  const [selectedEnterHour, setSelectedEnterHour] = useState(''); // 입차 시간
  const [selectedEnterMinute, setSelectedEnterMinute] = useState(''); // 입차 분
  const [selectedExitHour, setSelectedExitHour] = useState(''); // 출차 시간
  const [selectedExitMinute, setSelectedExitMinute] = useState(''); // 출차 분
  const [usingCharger, setUsingCharger] = useState(false); // 전기차 충전기 사용 여부
  const [resultTime, setResultTime] = useState(''); // 최종 산출 비용
  const [resultCost, setResultCost] = useState(''); // 최종 산출 비용

  // 지역 선택 목록
  let locationOptions = ['경기도 수원시 장안구', '경기도 수원시 팔달구', '경기도 수원시 영통구', '경기도 수원시 권선구'];

  // 시간 목록
  const [hourList] = useState(makeNumArray(24));
  const [minuteList] = useState(makeNumArray(60));
  

  // 지역 선택하면 주차장선택 가능하게 하고 선택 목록 생성
  const bringParkinglotsOnThisArea = area => {
      setSelectedParkinglot('');
      setSelectedEnterHour('');
      setSelectedEnterMinute('');
      setSelectedExitHour('');
      setSelectedExitMinute('');
      setResultCost('');
      setSelectedArea(area);

      // 검색 내용이 비어었으면 검색 초기화하기
      setDisableParkinglot(setDisableIfEmpty(area));
      setDisableSelectTime(true);

      if (area!="") {
          setParkingLots(
              LpData.filter(data => data.address.indexOf(area) >= 0)
          );
      }
  }

  // // 선택한 값이 없으면 입력, 선택 비활성화 시키기
  // const setDisableIfEmpty = input => {
  //     let toDisable =
  //         input == "" ?
  //         true : false;
  //     return toDisable;
  // };

  // 입차시간보다 출차시간이 더 빠르다면 true
  // const isExitTimeBeforeEnterTime = (enterHour, enterMinute, exitHour, exitMinute) => {
  //     let isStrangeTime = false;
  //     enterHour = Number(enterHour);
  //     enterMinute = Number(enterMinute);
  //     exitHour = Number(exitHour);
  //     exitMinute = Number(exitMinute);

  //     if (exitHour < enterHour) {
  //         isStrangeTime = true;
  //     } else if (exitHour == enterHour && exitMinute < enterMinute) {
  //         isStrangeTime = true;
  //     }

  //     return isStrangeTime;
  // }

  // // 이용 시간 표시 형식
  // const setResultTimeForm = inputMinute => {
  //     let inputHour = Math.floor(inputMinute / 60);
  //     let inputDay = Math.floor(inputHour / 24);

  //     if (inputMinute % 60 == 0) {
  //         inputMinute = '';
  //     } else {
  //         inputMinute = (inputMinute % 60) + '분 '
  //     }
      
  //     if (inputHour % 24 == 0) {
  //         inputHour = '';
  //     } else {
  //         inputHour = (inputHour % 24) + '시간 '
  //     }

  //     if (inputDay > 0) {
  //         inputDay += '일 ';
  //     } else {
  //         inputDay = ''
  //     }

  //     let timeForm = inputDay + inputHour + inputMinute;
      
  //     if (timeForm == '') {
  //         timeForm += '0분';
  //     }

  //     return timeForm;
  // }

  // // 주차요금 산출
  // const getResultCost = inputMinute => {
  //     let costOutput = '';

  //     // 10분 이내 주차, 충전기 미사용
  //     if (inputMinute <= 10 && !usingCharger) {
  //         costOutput = '￦ 0 (회차 차량)';

  //     // 10분 이내 주차하면서 충전기 사용
  //     } else if (inputMinute <= 10 && usingCharger) {
  //         costOutput = '￦ 10,000';
      
  //     // 10분 이상 주차
  //     } else {
  //         costOutput = 1000; // 기본 주차 요금 (1시간 기준)
  //         inputMinute -= 60;

  //         // 1시간 이상 충전 시 20분당 200원 추가
  //         if (inputMinute > 0) {
  //             costOutput += Math.ceil(inputMinute / 20) * 200
  //         }
          
  //         // 충전기 사용 시 10,000 원 추가
  //         if (usingCharger) {
  //             costOutput += 10000;
  //         }

  //         costOutput = '￦ ' + putCommaInNumber(costOutput);
  //     }

  //     return costOutput;
  // }

  // 주차요금 조회 탭 에서 "조회하기" 버튼 누르면 조회 메세지 표시
  const checkPayment = action => {
      let resultMinute = 0; // 산출된 주차 시간 (분)
      let toShowResult = false; // 결과를 보여주려면 true

      // 지역 선택이 안 되어있다면
      if (selectedArea == "") {
          alert("먼저 지역을 선택해주세요!");
      
      // 주차장 선택이 안 되어있다면
      } else if (selectedParkinglot=="") {
          alert("주차장을 선택해주세요!");
      
      // 주차 예상 요금 조회 탭에서 
      } else {
          if (selectedEnterHour == '' || selectedEnterMinute == '') {
              alert('입차 시간을 입력해주세요!');
          
          } else if (selectedExitHour == '' || selectedExitMinute == '') {
              alert('출차 시간을 입력해주세요!');
          
          } else if (isExitTimeBeforeEnterTime(selectedEnterHour, selectedEnterMinute, selectedExitHour, selectedExitMinute)) {
              alert('입차 시간이 출차 시간보다 늦습니다. 다시 입력해주세요.')

          } else {
              toShowResult = true;
              let hourgap = (Number(selectedExitHour) - Number(selectedEnterHour)) * 60;
              let minutegap = Number(selectedExitMinute) - Number(selectedEnterMinute);
              resultMinute = hourgap + minutegap;
          }
      }

      // 결과 값이 있다면 표시
      if (toShowResult) {
          setResultTime(resultMinute);
          setResultCost(getResultCost(resultMinute, usingCharger));
      } else {
          setResultTime('')
          setResultCost('');
      }
  }

  return (
    <Form className='paymentForm' onLoad={() => bringParkinglotsOnThisArea('')}>
      <Form.Group className='selectLong'>
        <Form.Label className='paymentLabel'>지역선택</Form.Label>
        <Form.Select
          onChange={(event) => bringParkinglotsOnThisArea(event.target.value)}
          value={selectedArea}
        >
        <option value="">지역을 선택해주세요!</option>
          {locationOptions.map((area, i) => 
            <option value={area} key={i}>{area}</option>  
          )}
        </Form.Select>
      </Form.Group>

      <Form.Group className='selectLong'>
        <Form.Label className='paymentLabel' defaultValue={""}>주차장선택</Form.Label>
        <Form.Select
          disabled={disableParkinglot}
          value={selectedParkinglot}
          onChange={(event) => {
            setSelectedParkinglot(event.target.value);
            setDisableSelectTime(setDisableIfEmpty(event.target.value));
            setSelectedEnterHour('');
            setSelectedEnterMinute('');
            setSelectedExitHour('');
            setSelectedExitMinute('');
            setResultCost('');
          }}
        >
        <option value="" checked>주차장을 선택해주세요!</option>
          {parkingLots.map((lot, i) => 
            <option value={lot.title} key={i}>{lot.title}</option>
          )}

        </Form.Select>
      </Form.Group>

      <Form.Group className='inputShortLeft'>
        <Form.Label className='paymentLabel'>입차일시</Form.Label>
        <div className="timeForm">
        <Form.Select
          className='timeSelect'
          value={selectedEnterHour}
          disabled={disableSelectTime}
          onChange={(event) => {
            setSelectedEnterHour(event.target.value);
            setDisableSelectTime(setDisableIfEmpty(event.target.value));
          }}   
        >
        <option value="" >시간</option>
          {hourList.map((hour, i) => 
            <option value={hour} key={i}>{hour}</option>
          )}
        </Form.Select>
          시
        <Form.Select
          className='timeSelect'
          value={selectedEnterMinute}
          disabled={disableSelectTime}
          onChange={(event) => {
            setSelectedEnterMinute(event.target.value);
          }}
        >
          <option value="" >분</option>
          {minuteList.map((minute, i) => 
            <option value={minute} key={i}>{minute}</option>
          )}
        </Form.Select>
          분
        </div>
      </Form.Group>

      <Form.Group className='inputShortRight'>
        <Form.Label className='paymentLabel'>출차일시</Form.Label>
        <div className="timeForm">
        <Form.Select
          className='timeSelect'
          value={selectedExitHour}
          disabled={disableSelectTime}
          onChange={(event) => {
            setSelectedExitHour(event.target.value);
            setDisableSelectTime(setDisableIfEmpty(event.target.value));
          }}
        >
        <option value="" >시간</option>
          {hourList.map((hour, i) => 
            <option value={hour} key={i}>{hour}</option>
          )}
        </Form.Select>
          시
        <Form.Select
          className='timeSelect'
          value={selectedExitMinute}
          disabled={disableSelectTime}
          onChange={(event) => {
            setSelectedExitMinute(event.target.value);
          }}
        >
        <option value="" >분</option>
        {minuteList.map((minute, i) => 
        <option value={minute} key={i}>{minute}</option>
        )}
        </Form.Select>
        분
        </div>
      </Form.Group>

      <Form.Group className='inputShortLeft'>
        <div className="checkboxInput">
          <Form.Label className='checkboxLabel'>전기차 충전 여부</Form.Label>
          <Form.Check
            type='checkbox'
            className='chargingCar'
            checked={usingCharger}
            onChange={() => setUsingCharger(!usingCharger)}
          /><br/>
          <Form.Label className='checkboxLabel'>*충전하시는 분만 체크해주세요</Form.Label>
        </div>
      </Form.Group>

      <Button
        className='estimatePay'
        onClick={() => checkPayment('estimate')}
      >조회하기</Button>

    {
      resultCost != '' ?
      <div id="paymentResult">
        <p className='inputShortLeft'>
        예상 이용 시간 <span> {setResultTimeForm(resultTime)}</span>
        </p>
        <p className='inputShortRight'>
        예상 요금 <span> {resultCost}</span>
        </p>
      </div>:null
    }
    </Form>
  )
}

export default EstimateForm
