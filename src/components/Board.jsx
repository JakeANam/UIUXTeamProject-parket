import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import noticeData from '../data/noticeData';
import { useNavigate } from 'react-router-dom';

const Board = () => {
    let [notice] = useState(noticeData);
    const navigate = useNavigate();

    return (
        <>
            <Table className='tablebox' size="sm">
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {notice.slice(0, 4).map((item, i) => (
                        <tr key={item.id} onClick={() => {
                            navigate('/notice', { state: { openId: item.id } });
                        }} style={{ cursor: 'pointer' }}>
                            <td>{item.title}</td>
                            <td className='datetd'>{item.date}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
            <div className="tbbtnbox">
                <button onClick={() => { navigate('/notice') }}>
                    <p>
                        더보기
                        <span className="material-icons">chevron_right</span>
                    </p>
                </button>
            </div>
        </>

    )
}

export default Board