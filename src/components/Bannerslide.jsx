import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import "../scss/bannerslide.scss"
import { Button } from 'react-bootstrap';

const Bannerslide = () => {
  return (
    <div className='Bannerslide'>
      <Carousel data-bs-theme="dark" interval={null} >
        <Carousel.Item className='BTNDIS' style={{
          backgroundImage: ` url(${process.env.PUBLIC_URL}/img/banner1.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '250px',
        }}>

          <Button className='MBTN' variant="outline-primary">충전하러가기</Button>
        </Carousel.Item>

        <Carousel.Item style={{
          backgroundImage: ` url(${process.env.PUBLIC_URL}/img/banner2.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '250px',
        }}>
        </Carousel.Item>

        <Carousel.Item style={{
          backgroundImage: ` url(${process.env.PUBLIC_URL}/img/banner3.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '250px',
        }}>



        </Carousel.Item>
      </Carousel>

    </div>
  )
}

export default Bannerslide