import React, { useState } from 'react'
import '../scss/PaymentDetail.scss';
import '../scss/paymentTab.scss';
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PaymentForm from '../components/PaymentForm'
import EstimateForm from '../components/EstimateForm'

const PaymentDetail = () => {
    const [paymentKey, setPaymentKey] = useState('payment');

    return (
        <div className='usageWrap'>
            <div className="usageTop"></div>
            <div className='minbanner'>
                <img src={process.env.PUBLIC_URL + "/img/minibanner.jpg"} alt="미니배너" />
            </div>

            <div className="usageContentWrap">
                <div className="usageSubMenu">
                    <div className="usageMenu1">
                        <h3>주차정산</h3>
                    </div>

                    <div className={paymentKey == "payment"?
                            "usageMenu2":"usageMenu3"
                        }
                        onClick={() => setPaymentKey('payment')}>
                        <Link to={Link} as={'/PaymentDetail'} style={{ textDecoration: 'none' }}>
                            <p>주차 요금 조회 / 정산</p>
                        </Link>
                    </div>

                    <div  className={paymentKey == "estimate"?
                            "usageMenu2":"usageMenu3"
                        }
                        onClick={() => setPaymentKey('estimate')}>
                        <Link to={Link} as={'/PaymentDetail'} style={{ textDecoration: 'none' }}>
                            <p>주차 예상 요금 조회</p>
                        </Link>
                    </div>

                    <div className="usageMenu4"></div>
                </div>

                <div className="contentBoxWrap">
                    <h2>주차 요금 조회</h2>

                    <div className="contentBox">
                        {paymentKey == "payment"?
                            <PaymentForm/>:null
                        }
                        {paymentKey == "estimate"?
                            <EstimateForm/>:null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetail