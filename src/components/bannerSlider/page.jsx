"use client";  
import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function BannerSlider({data}) {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                autoplay={{
                    delay:2500,
                    disableOnInteraction:false
                }}
                pagination={{
                    clickable:true
                }}
    
                navigation={true}
                modules={[ Autoplay, Pagination, Navigation]}
                className='myswiper flex'
            >
                {data && data.map((item,i)=>{
                    return(
                        <SwiperSlide className='flex' key={i}>
                            <div className="slider-image block" style={{backgroundImage:`url(${item?.src})`,width:`100%`,height:`500px`}}></div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            
        </div>
      )
}

export default BannerSlider;

