import React, { useState } from 'react'
import { Button, Container, InputGroup, Table } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import "../scss/CommuterPass.scss"

export default function CommuterPass(props) {
  const today = new Date();

  const oneMonthLater = new Date(today);
  oneMonthLater.setMonth(today.getMonth() + 1);

  const twoMonthsLater = new Date(today);
  twoMonthsLater.setMonth(today.getMonth() + 2);
  const twoLater = new Date(today);
  twoLater.setDate(today.getDate() - 2);
  const sevenLater = new Date(today);
  sevenLater.setDate(today.getDate() + 9);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const formatMonthDate = (date) => {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${mm}-${dd}`;
  };

  const startDate = formatDate(oneMonthLater);
  const endDate = formatMonthDate(twoMonthsLater);
  const later = formatDate(twoLater);
  const endlater = formatMonthDate(sevenLater);

  const { LpData2 } = props

  const [searchType, setSearchType] = useState('parking');
  const [searchText, setSearchText] = useState('');
  const [checkedidx, setCheckedindx] = useState(null);  // input checked index
  console.log(checkedidx)

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 필터링된 데이터
  const filteredData = (LpData2 || []).filter(product => {
    if (searchText === '') return true;

    if (searchType === 'address') {
      return product.address.toLowerCase().includes(searchText.toLowerCase());
    } else {
      return product.title.toLowerCase().includes(searchText.toLowerCase());
    }
  });

  // 현재 페이지에 표시할 데이터 범위 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='CommuterPass' style={{ paddingTop: '60px' }}>
      <div className='minbanner'>
        <img src={process.env.PUBLIC_URL + "/img/minibanner.jpg"} alt="미니배너" />
      </div>

      <div className='ConT' style={{ width: '1400px', marginTop: '60px', padding: '0' }}>

        <div className="left">
          <div className="leftdt">
            <h3 className='ntall'>정기권신청</h3>
          </div>
          <div className="leftdt2">
            <h4>신청조회</h4>
          </div>

          <img src={`${process.env.PUBLIC_URL}/img/sidebanner.jpg`} style={{ width: '217px', height: '217px', marginTop: '5px' }} alt="sidebanner" />
        </div>

        <div className='right' style={{ width: '1133px' }}>
          <h2>정기권 조회</h2>

          <div className="BTNG">
            <InputGroup>
              <Form.Control
                aria-label="검색어 입력"
                aria-describedby="basic-addon2"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1); // 검색어 변경 시 페이지 1로 초기화
                }}
              />
              <Button variant="outline-secondary" id="button-addon2">
                <span className="material-symbols-outlined">search</span>
              </Button>
            </InputGroup>
            
            <Form.Select
              aria-label="검색 유형 선택"
              className="custom-select"
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
                setCurrentPage(1); // 검색 유형 변경 시 페이지 1로 초기화
              }}
            >
              <option value="parking">주차장으로 검색하기</option>
              <option value="address">지역으로 검색하기</option>
            </Form.Select>
            
          </div>

          <Table>
            <thead>
              <tr>
                <th>선택</th>
                <th>지역</th>
                <th>주차장명</th>
                <th>종류</th>
                <th>사용기간</th>
                <th>상태</th>
                <th>잔여수량</th>
                <th>접수기간</th>
                <th>신청하기</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((product, index) => (
                  <tr
                    key={index}
                    className={`
    ${checkedidx === index ? 'tractive' : ''}
    ${product.Remaining === 0 ? 'SoldOut' : ''}
  `}
                  >
                    <td><input className='IC' type="radio" name="parking" onChange={(e) => { setCheckedindx(index) }} /></td>
                    <td>{product.address}</td>
                    <td>{product.title}</td>
                    <td>{product.parking_spot}</td>
                    <td>{startDate} ~ {endDate}</td>
                    <td>{product.Remaining === 0 ? '마감' : '접수중'}</td>
                    <td>{product.Remaining}</td>
                    <td>{later} ~ {endlater}</td>
                    <td><Button
                      className="DBTN"
                      style={{ height: '27px', width: '58px', fontSize: '12px'}}
                      onClick={(e) => {
                        e.currentTarget.blur(); // 포커스 제거
                        if (product.Remaining === 0) {
                          alert('마감되었습니다');
                        } else {
                          // 여기에 신청 처리 로직 넣으면 됨
                          console.log('정상 신청 진행');
                        }
                      }
                      }
                    >
                      신청하기
                    </Button></td>
                  </tr>
                ))}

            </tbody>
          </Table>

          {/* 페이지네이션 버튼 */}
          <div style={{ textAlign: 'center', marginTop: '20px' }} className='PNBTN'>
            <Button
              className="PBTN"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ margin: '0 5px', minWidth: '35px' }}
            >
              이전
            </Button>

            {pageNumbers.map(number => (
              <span
                key={number}
                className={`PBTN pagination-btn ${number === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(number)}
                style={{

                  Color: number === currentPage ? '#c5c5c5' : '#f3f3f3',
                  color: '#666'
                }}
              >
                {number}
              </span>
            ))}

            <Button
              className="PBTN"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageNumbers.length))}
              disabled={currentPage === pageNumbers.length}
              style={{ margin: '0 5px', minWidth: '35px' }}
            >
              다음
            </Button>
          </div>

          <ul>
            <h6>환불방법</h6>
            <li>정기권 사용 시작일 이전 : 홈페이지에서 직접 취소가능(정기권 신청 → 신청조회)</li>
            <li>정기권 사용 시작일 이후: 홈페이지에서 신청가능 (정기권 신청→신청조회) , 잔여일 일할계산 금액의 80% 계좌환불</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
