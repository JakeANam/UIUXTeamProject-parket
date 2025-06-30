import React, { useState } from 'react'
import '../scss/usage.scss'
import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import LpData from '../data/Lp_data'
import { Link, useNavigate } from 'react-router-dom'

const Usage = () => {
    const [usageData] = useState(LpData);
    const navigate = useNavigate();

    return (
        <div className='usageWrap'>
            <div className="usageTop"></div>
            <div className='minbanner'>
                <img src={process.env.PUBLIC_URL + "/img/minibanner.jpg"} alt="미니배너" />
            </div>

            <div className="usageContentWrap">
                <div className="usageSubMenu">
                    <div className="usageMenu1">
                        <h3>이용내역</h3>
                    </div>

                    <div className="usageMenu2">
                        <Link to={Link} as={'/usage'} style={{ textDecoration: 'none' }}>
                            <p>이용내역 조회</p>
                        </Link>
                    </div>

                    <div className="usageMenu5">
                        <Link to={Link} as={'/usage'} style={{ textDecoration: 'none' }}>
                            <p>이용상세내역</p>
                        </Link>
                    </div>

                </div>

                <div className="contentBoxWrap">
                    <h2>이용내역 조회</h2>

                    <InputGroup style={{ marginBottom: '13px' }}>
                        <Form.Control
                            placeholder="주차장 이름을 입력하세요."
                            aria-label="주차장 이름"
                        />

                        <Button id="usageButton">
                            <span className="material-symbols-outlined usageInputBtn">
                                search
                            </span>
                        </Button>
                    </InputGroup>

                    <div className="contentBox">
                        <Table bordered className='usageTable'>
                            <thead>
                                <tr>
                                    <th>no.</th>
                                    <th>주차장 이름</th>
                                    <th>이용 날짜</th>
                                    <th>금액</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    usageData
                                        .slice()
                                        .sort((a, b) => b.num - a.num)
                                        .map((item) =>

                                            <tr key={item.num}>
                                                <td style={{ color: '#333' }}>
                                                    {item.num}
                                                </td>

                                                <td onClick={() => { navigate('/usage/details/' + item.num) }}>
                                                    {item.title} 주차장
                                                </td>

                                                <td style={{ color: '#333' }}>
                                                    {item.date}
                                                </td>

                                                <td>
                                                    {item.amount?.toLocaleString() ?? '0'}원
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </Table>

                        <div className="usagePage">
                            <Button disabled>이전</Button>
                            <span>1</span>
                            <Button disabled>다음</Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Usage