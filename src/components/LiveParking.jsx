import React, { useState } from 'react'
import '../scss/garam_LP.scss'
import { Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import LpData from '../data/Lp_data';
import 'swiper/css';

const LiveParking = () => {
    const [Lpdata, setLpData] = useState(LpData);
    const [selectedType, setSelectedType] = useState('공용');

    const changeType = () => {
        if (selectedType === '공용') {
            return {
                image: process.env.PUBLIC_URL + '/img/공용.png',
                bgColor: '#39D5B8',
                derColor: '#14C6A4',
                fontColor: '#14C6A4',
                bgColor2: '#C4F2E8',
            }
        };

        if (selectedType === '여성전용') {
            return {
                image: process.env.PUBLIC_URL + '/img/여성전용.png',
                bgColor: '#FFA6DF',
                derColor: '#FFA6DF',
                fontColor: '#FA70C9',
                bgColor2: '#FFE6F6',
            }
        };

        if (selectedType === '장애인전용') {
            return {
                image: process.env.PUBLIC_URL + '/img/장애인전용.png',
                bgColor: '#FFCD58',
                derColor: '#FFB301',
                fontColor: '#FFB301',
                bgColor2: '#FFEDC4',
            }
        };
    }

    const changeParking = (data) => {
        if (selectedType === '공용') {
            return {
                car: data.parking_car,
                seat: data.parking_seat
            }
        };

        if (selectedType === '여성전용') {
            return {
                car: data.woman_car,
                seat: data.woman_seat
            }
        };

        if (selectedType === '장애인전용') {
            return {
                car: data.abbreviation_car,
                seat: data.abbreviation_seat
            }
        };
    }

    const { image, bgColor, derColor, fontColor, bgColor2 } = changeType();

    return (
        <div className='LiveParking'>
            <h2>실시간 주차 현황</h2>

            <div className="LpBtn">
                <Button 
                className={`LpBtn1 ${selectedType === '공용' ? 'active' : ''}`}
                    onClick={() => setSelectedType('공용')}>
                    공용 주차장
                </Button>

                <Button className={`LpBtn2 ${selectedType === '여성전용' ? 'active' : ''}`}
                    onClick={() => setSelectedType('여성전용')}>
                    여성전용 주차장
                </Button>

                <Button className={`LpBtn3 ${selectedType === '장애인전용' ? 'active' : ''}`}
                    onClick={() => setSelectedType('장애인전용')}>
                    장애인전용 주차장
                </Button>
            </div>


            <div className="LpBigBox">
                <div className="Lp1" style={{ background: bgColor }}>
                    <div className="Lp1FontBox">
                        <h2>{selectedType} <br /> 주차 현황</h2>
                    </div>

                    <img src={image} alt="실시간" />
                </div>

                <div className="LpSlide">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={22}
                        slidesPerGroup={1}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="mySwiper LpSwiper">

                        {
                            Lpdata.map((data, i) => {
                                const { car, seat } = changeParking(data); 

                                return (
                                    <SwiperSlide className="LpSlide" key={i} style={{ border: `2px solid ${derColor}` }}>
                                    <div className="LpSlideBox">
                                        <div className="LpSlideFont">
                                            <h3>{data.title}</h3>
                                            <div className="parking_spot">{data.parking_spot}</div>
                                            <p>{data.address}</p>

                                            <div className="congestion">
                                                <img src={data.congestion.src} alt={data.congestion.name} />
                                                <p>{data.congestion_font}</p>
                                            </div>
                                        </div>

                                        <h3 style={{ color: fontColor }}>
                                            {car}<span>대 가능</span> / {seat}<span>면</span>
                                        </h3>

                                        <div className="electricBigBox">
                                            <div className="electric2">
                                                <img src={process.env.PUBLIC_URL + "/img/전기차.png"} alt="전기차" />

                                                <p>전기차 충전소</p>
                                            </div>


                                            <div className="electricBox" style={{ backgroundColor: bgColor2 }}>
                                                <div className="electricfont">
                                                    <p>급속</p>
                                                    <h5 style={{ color: fontColor }}>{data.electric1}대 / 10대</h5>
                                                </div>

                                                <div className="electricfont">
                                                    <p>완속</p>
                                                    <h5 style={{ color: fontColor }}>{data.electric2}대 / 10대</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                );
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default LiveParking