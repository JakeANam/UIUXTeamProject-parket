import React from 'react'
import { Container } from 'react-bootstrap'
import "../scss/shortcut.scss";

const Shortcut = () => {
  return (
    <>
    <Container>
        <div className="shortbox">
            <div className="short">
                <button>
                    <img src = {process.env.PUBLIC_URL + "../img/park.png"} alt="정기권신청" />
                </button>
                <p>정기권 신청</p>
            </div>
            <div className="short">
                <button>
                    <img src= {process.env.PUBLIC_URL + "../img/card.png"} alt="정기권조회및결제" />
                </button>
                <p>정기권 조회/결제</p>
            </div>
            <div className="short">
                <button>
                    <img src= {process.env.PUBLIC_URL + "../img/detail.png"} alt="이용내역" />
                </button>
                <p>이용내역</p>
            </div>
            <div className="short">
                <button>
                    <img src= {process.env.PUBLIC_URL + "../img/event.png"} alt="제휴이벤트" />
                </button>
                <p>제휴이벤트</p>
            </div>
        </div>
    </Container>
    </>
  )
}

export default Shortcut