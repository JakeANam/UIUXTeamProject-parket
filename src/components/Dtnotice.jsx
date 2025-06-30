import React, { useEffect, useState } from 'react'
import "../scss/dtnotice.scss"
import { Accordion, Button } from 'react-bootstrap'
import noticeData from '../data/noticeData';
import { useLocation } from 'react-router-dom';

const Dtnotice = () => {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    let [notice] = useState(noticeData);

    const location = useLocation();
    const openId = location.state?.openId || null;

    const openIndex = notice.findIndex(n => n.id === openId);


    useEffect(() => {
        if (notice.length) {
            setLastPage(Math.ceil(notice.length / 7));
        }
        if (openId !== null && openIndex !== -1) {
            const targetPage = Math.floor(openIndex / 7) + 1;
            setPage(targetPage);
        }
    }, [notice, openId]);

    const startIndex = (page - 1) * 7;
    const endIndex = page * 7;
    const currentPageNotices = notice.slice(startIndex, endIndex);

    const defaultOpenKey =
    openIndex >= startIndex && openIndex < endIndex
    ? (openIndex % 7).toString()
    : null;


    return (
        <>
            <div className="headerbox"></div>
            <div className="minibanner">
                <img src={process.env.PUBLIC_URL + "../img/minibanner.jpg"} alt="minibanenr" />
            </div>

            <div className="dtnoticewrap">

                <div className="leftdtwrap">
                    <div className="leftdt"><h3 className='ntall'>고객센터</h3></div>
                    <div className="leftdt2">
                        <h4>공지사항</h4>
                    </div>
                    <div className="leftdt3">
                        <h4>1:1문의</h4>
                    </div>
                </div>

                {/* 아코디언 */}
                <div className="noticedetail">
                    <h2 className='noticename'>공지사항</h2>
                    <Accordion defaultActiveKey={defaultOpenKey}>
                        {notice.slice((page - 1) * 7, page * 7).map((item, i) => (
                            <Accordion.Item eventKey={i.toString()} key={item.id}>
                                <Accordion.Header><p><span>{item.title}</span>{item.date}</p></Accordion.Header>
                                <Accordion.Body>
                                    <pre>{item.content}</pre>

                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>

                    <div className='btnbox'>
                        <Button className='back' onClick={() => {
                            setPage(page - 1)
                        }} disabled={page === 1}>이전</Button>
                        <span> {page} </span>
                        <Button className='next' onClick={() => {
                            setPage(page + 1)
                        }} disabled={page === lastPage}>다음</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dtnotice