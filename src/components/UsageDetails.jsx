import React, { useState } from 'react'
import '../scss/usage.scss'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import LpData from '../data/Lp_data'

const UsageDetails = () => {
    const [details] = useState(LpData);
    const { id } = useParams();

    const detailItem = details.find(item => String(item.num) === id);

    return (
        <div className='usageDetailsWrap'>
            <div className="usageTop"></div>
            <div className='minbanner'>
                <img src={process.env.PUBLIC_URL + "/img/minibanner.jpg"} alt="미니배너" />
            </div>

            <div className="usageContentWrap">
                <div className="usageSubMenu">
                    <div className="usageMenu1">
                        <h3>이용내역</h3>
                    </div>

                    <div className="usageMenu2 usageDetailsMenu2">
                        <Link to={'/usage'} style={{ textDecoration: 'none' }}>
                            <p>이용내역 조회</p>
                        </Link>
                    </div>

                    <div className="usageMenu3 usageDetailsMenu3">
                        <Link to={Link} as={'/usage'} style={{ textDecoration: 'none' }}>
                            <p>이용상세내역</p>
                        </Link>
                    </div>

                    <div className='usageMenu4'></div>
                </div>

                <div className="contentBoxWrap">
                    <h2>이용상세내역</h2>

                    <div className="contentBox usageDetailsBox">
                        <div className="usageDetails1">
                            <div className="usageDetilsFont">
                                <p>{detailItem.date}</p>
                                <h4>주문번호 : {detailItem.orderNum}</h4>
                            </div>

                            <Table bordered className='usageDeiailsTb'>
                                <tbody>
                                    <tr>
                                        <th>총 결제 금액</th>

                                        <td colSpan={4} style={{ borderRight: 'transparent' }}><strong>{detailItem.amount}</strong>원</td>
                                    </tr>

                                    <tr>
                                        <th>총 할인 금액</th>
                                        <td>0원</td>

                                        <th>P포인트 총 사용액</th>
                                        <td style={{ borderRight: 'transparent' }}><span>0</span>원</td>
                                    </tr>

                                    <tr>
                                        <th>실 결제 금액</th>
                                        <td>{detailItem?.amount?.toLocaleString() ?? '0'}원</td>

                                        <th>P포인트 총 적립액</th>
                                        <td style={{ borderRight: 'transparent' }}><span>{Math.floor(detailItem.amount * 0.1).toLocaleString() ?? '0'}</span>원</td>
                                    </tr>

                                    <tr>
                                        <th>결제하신 금액</th>
                                        <td colSpan={4} style={{ borderRight: 'transparent' }}>{detailItem.pay} :  <strong>{detailItem?.amount?.toLocaleString() ?? '0'}</strong>원</td>
                                    </tr>
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <th rowSpan={2}>현금영수증 발행</th>
                                        <td colSpan={3} style={{ borderRight: 'transparent' }}>
                                            <input type="radio" name='receipt'/> 현금영수증 발행 신청

                                            <input type="radio" name='receipt' defaultChecked style={{marginLeft: '10px'}} /> 신청 안함
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} style={{ borderRight: 'transparent' }}>
                                            해당 결제건은 세금계산서 발행이 가능합니다. <br />
                                            세금계산서는 <span>고객센터 &gt; 세금계산서 신청</span> 에서 신청할 수 있습니다. <br />
                                            세금계산서는 현금영수증과 중복발행 할 수 없습니다.
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsageDetails