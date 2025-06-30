import React from 'react'
import "../scss/notice.scss";
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import Board from './Board';
import "../scss/board.scss";

const Notice = () => {
    return (
        <>
            <div className='wrapbox'>
                <Row>
                    <Col style={{ marginRight: '30px', width: '685px' }}>
                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3">
                            <Tab eventKey="home" title="공지사항">
                                <Board></Board>
                            </Tab>
                            <Tab eventKey="profile" title="자주 묻는 질문" disabled>
                                Tab content for Profile
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col style={{ width: '685px' }}>
                        <div className="number">
                            <div className="callbox">
                                <div className="call">
                                    <img src={process.env.PUBLIC_URL + "../img/call.png"} alt="d" />
                                    <h3>전화문의</h3>
                                </div>
                                <h2><span>파켓 대표전화</span> 031-123-4567</h2>
                                <p><span>통합 콜센터</span> 031-324-4632 <br />
                                    <span>정기권 문의</span> 031-324-4557 <br />
                                    <span>주차 및 정산 문의</span> 031-324-2134
                                </p>
                            </div>
                            <div className="kakaobox">
                                <div className="kakao">
                                    <img src={process.env.PUBLIC_URL + "../img/kakao.png"} alt="k" />
                                    <h3>카톡문의</h3>
                                </div>
                                <div className="ch">
                                    <img src={process.env.PUBLIC_URL + "../img/ch.png"} alt="k" /> <p>카카오톡 : Parket</p>
                                </div>
                                <p><span>INSTAGRAM</span> @parket_kr <br />
                                    <span>네이버 블로그</span> parket <br />
                                    <span>YOUTUBE</span> PARKET
                                </p>

                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Notice