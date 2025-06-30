import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../scss/paymentTab.scss';

// 주차장 정보 가져오기
import LpData from '../data/Lp_data';
import parkingPaymentData from '../data/parkingPaymentData';

import { putCommaInNumber, setDateTimeForm, setDisableIfEmpty, getResultCost, setResultTimeForm } from './paymentUtils'

const PaymentForm = () => {
    let [parkingLots, setParkingLots] = useState(LpData); // 주차장 목록
    let [disableParkinglot, setDisableParkinglot] = useState(true); // 주차장 선택 막기
    let [disableInput, setDisableInput] = useState(true); // 입력창(input:text) 막기

    // 선택한 내용: 내용 전달, 초기화에 사용
    const [selectedArea, setSelectedArea] = useState(''); // 지역
    const [selectedParkinglot, setSelectedParkinglot] = useState(''); // 주차장
    const [selectedEnterTime, setSelectedEnterTime] = useState(''); // 입차일시
    const [selectedExitTime, setSelectedExitTime] = useState(''); // 출차일시
    const [writtenCarPlate, setWrittenCarPlate] = useState(''); // 차량번호
    const [usingCharger, setUsingCharger] = useState(false); // 전기차 충전기 사용 여부
    const [resultTime, setResultTime] = useState(''); // 최종 산출 비용
    const [resultCost, setResultCost] = useState(''); // 최종 산출 비용

    // 지역 선택 목록
    let locationOptions = ['경기도 수원시 장안구', '경기도 수원시 팔달구', '경기도 수원시 영통구', '경기도 수원시 권선구'];

    // 차량번호 정규표현 (ex: 12가 3456 or 789힣 6543)
    const carNumRE = new RegExp("^\\d{2,3}[가-힣] \\d{4}$");

    // 지역 선택하면 주차장선택 가능하게 하고 선택 목록 생성
    const bringParkinglotsOnThisArea = area => {
        setSelectedParkinglot('');
        setWrittenCarPlate('');
        setSelectedEnterTime('');
        setSelectedExitTime('');
        setResultCost('');
        setSelectedArea(area);

        // 검색 내용이 비어었으면 검색 초기화하기
        setDisableInput(true);
        setDisableParkinglot(setDisableIfEmpty(area));

        if (area != "") {
            setParkingLots(
                LpData.filter(data => data.address.indexOf(area) >= 0)
            );
        }
    }

    // 주차요금 조회 탭 에서 "조회하기" 버튼 누르면 조회 메세지 표시
    const checkPayment = action => {
        let resultMinute = 0; // 산출된 주차 시간 (분)
        let toShowResult = false; // 결과를 보여주려면 true

        // 지역 선택이 안 되어있다면
        if (selectedArea == "") {
            alert("먼저 지역을 선택해주세요!");

            // 주차장 선택이 안 되어있다면
        } else if (selectedParkinglot == "") {
            alert("주차장을 선택해주세요!");

        } else {
            // 차량 번호 입력이 안 되어있다면
            if (writtenCarPlate == "") {
                alert("차량 번호를 입력해주세요!");
                setSelectedEnterTime('');
                setSelectedExitTime('');

                // 차량 번호 입력을 잘못했다면
            } else if (!carNumRE.test(writtenCarPlate)) {
                alert(
                    "차량 번호를 다시 입력해주세요!\n"
                    + "차량 번호 입력 예: "
                    + "'12가 3456' 혹은 '789힣 6543'"
                );
                setSelectedEnterTime('');
                setSelectedExitTime('');

                // 입력에 문제가 없다면 parkingPaymentData 와 비교
            } else {
                const oneCar = parkingPaymentData.filter(oneCar => oneCar.carPlate == writtenCarPlate);
                // 해당 차량의 입차 기록이 없다면 (parkingPaymentData에서 carPlate 없을 때)
                if (oneCar.length < 1 || selectedParkinglot != oneCar[0].parkinglotId) {
                    alert("해당 차량, " + writtenCarPlate + " 은 입차하지 않았습니다.\n차량 번호를 다시 확인해주세요.")
                    setSelectedEnterTime('');
                    setSelectedExitTime('');

                } else {
                    toShowResult = true;
                    // 입차일시 입출력
                    const enterTime = new Date(oneCar[0].enterTime);
                    setSelectedEnterTime(setDateTimeForm(enterTime));

                    // 출차일시 입출력
                    const currentTime = new Date();
                    setSelectedExitTime(setDateTimeForm(currentTime));

                    resultMinute = Math.floor((currentTime - enterTime) / 60000);
                }
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
                    onChange={
                        event => bringParkinglotsOnThisArea(event.target.value)
                    }
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
                        setWrittenCarPlate('');
                        setSelectedParkinglot(event.target.value);
                        setDisableInput(setDisableIfEmpty(event.target.value));
                        setSelectedEnterTime('');
                        setSelectedExitTime('');
                        setResultCost('');
                    }}
                >
                    <option value="" checked>주차장을 선택해주세요!</option>
                    {parkingLots.map((lot, i) =>
                        <option value={lot.id} key={i}>{lot.title}</option>
                    )}

                </Form.Select>
            </Form.Group>

            <Form.Group className='inputShortLeft'>
                <Form.Label className='paymentLabel'>차량번호</Form.Label>
                <Form.Control
                    type='text'
                    disabled={disableInput}
                    value={writtenCarPlate}
                    onChange={(event) => {
                        setWrittenCarPlate(event.target.value)
                    }}
                />
            </Form.Group>

            <Form.Group className='inputShortRight'>
                <div className="checkboxInput">
                    <Form.Label className='checkboxLabel'>전기차 충전 여부</Form.Label>
                    <Form.Check
                        type='checkbox'
                        className='chargingCar'
                        checked={usingCharger}
                        onChange={() => setUsingCharger(!usingCharger)}
                    />
                    <br />
                    <Form.Label className='checkboxLabel checkboxLabel2' >*충전하시는 분만 체크해주세요</Form.Label>
                </div>
            </Form.Group>

            <Form.Group className='inputShortLeft'>
                <Form.Label className='paymentLabel'>입차일시</Form.Label>
                <Form.Control
                    type='text'
                    readOnly={true}
                    value={selectedEnterTime}
                />
            </Form.Group>

            <Form.Group className='inputShortRight'>
                <Form.Label className='paymentLabel'>출차일시</Form.Label>
                <Form.Control
                    type='text'
                    readOnly={true}
                    value={selectedExitTime}
                />
            </Form.Group>

            {
                resultCost != '' ?
                    <div id="paymentResult">
                        <p className='inputShortLeft'>
                            이용 시간 <span> {setResultTimeForm(resultTime)}</span>
                        </p>

                        <p className='inputShortRight'>
                            예상 요금 <span> {resultCost}</span>
                        </p>
                    </div> : null
            }

            <Button
                className='checkPay'
                onClick={() => checkPayment('payment')}
            >
                조회하기
            </Button>
            <Button className='commitPay'>정산하기</Button>

        </Form>
    )
}

export default PaymentForm