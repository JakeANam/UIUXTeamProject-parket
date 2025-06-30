import React from 'react'
import "../scss/mainslide.scss"
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Mainslide = () => {
   return (
      <div className='Mainslide' style={{
         backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url(${process.env.PUBLIC_URL}/img/mainimg.png)`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         height: '960px',
         color: 'white',
      }}>
         
         <Container style={{
            textAlign: 'center'

         }}>
            <h1>PARKET</h1>
            <h4>파켓으로 편하게 충전하고 주차하세요!</h4>
            <InputGroup className="mb-4">
               <Form.Control
                  placeholder="search..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
               />
               <Button variant="outline-secondary" id="button-addon2">
                  <span className="material-symbols-outlined">
                     search
                  </span>
               </Button>
            </InputGroup>

            <Button className='MBTN' variant="outline-primary">정산 바로가기</Button>
            <Button className='MBTN' variant="outline-primary"> 정기권 조회 </Button>

         </Container>
      </div>
   )
}

export default Mainslide