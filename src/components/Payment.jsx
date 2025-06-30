import React from 'react'
import { useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

// 주차장 정보 가져오기
import LpData from '../data/Lp_data';
import parkingPaymentData from '../data/parkingPaymentData';
import PaymentForm from './PaymentForm';
import EstimateForm from './EstimateForm';

const Payment = () => {
    const [key, setKey] = useState('payment');

    return (
        <Container id='payment'>
            <h2 className='subtitle'>주차 요금 조회</h2>
            <Tabs
                activeKey={key}
                onSelect={(k) => {
                setKey(k);
                // bringParkinglotsOnThisArea('');
            }}
                justify={true}
                className='paymentTabs'
                variant='pills'
            >
                {/* 주차 요금 조회 / 정산 */}
                <Tab  
                    eventKey="payment"
                    title="주차 요금 조회 / 정산"
                    className='paymentTab'
                >
                    <Row>
                    <Col className='paymentForm'>
                        <PaymentForm key={key}/>
                    </Col>

                    <Col className='paymentBanner'>
                        <div className='bannerBox'>

                        </div>
                    </Col>
                    </Row>
                    
                </Tab>

                {/* 주차 예상 요금 조회 */}
                <Tab
                    eventKey="estimate"
                    title="주차 예상 요금 조회"
                    className='paymentTab'
                >
                    <Row>
                    <Col sm={8} className='paymentForm'>
                        <EstimateForm key={key}/>
                    </Col>

                    <Col sm={4} className='paymentBanner'>
                        <div className='bannerBox'>

                        </div>
                    </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default Payment