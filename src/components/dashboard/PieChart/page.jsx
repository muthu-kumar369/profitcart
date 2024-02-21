import React, { useState } from 'react'
import { PieChart, pieChartDefaultProps } from 'react-minimal-pie-chart';


// link for documentaion of chart
// https://toomuchdesign.github.io/react-minimal-pie-chart/index.html?path=/story/pie-chart--full-option
function PieChartComponent({ data }) {
    const [shiftSize, setShiftSize] = useState(6)
    const [indexValue, setIndexValue] = useState(0);

    const handleClick = (value) => {
        console.log(value);
        if(value==indexValue){
            console.log("I am in");
            setIndexValue(data.length+1);
            setShiftSize(0);
        }
        setShiftSize(6);
        setIndexValue(value)
    }
    return (
        <section className="pie-chart w-full md:w-1/2 border border-emerald-800 rounded-sm bg-gray-50 p-4">
            <p className="title uppercase text-center font-bold text-xl py-4 text-emerald-900">Pie chart analysis</p>
            <div className='lg:flex'>
                <div className='w-full'>
                    <div>
                        <PieChart
                            className='lg:w-9/12 text-white cursor-pointer mx-auto py-4'
                            data={data}
                            lineWidth={70}
                            paddingAngle={3}
                            radius={pieChartDefaultProps.radius - shiftSize}
                            segmentsShift={(index) => (index === indexValue ? shiftSize : 0)}
                            label={({ dataEntry }) => `${dataEntry.value==1 ? 0: dataEntry.value} `}
                            labelStyle={(index) => ({
                                fill: "white",
                                fontSize: '5px',
                                fontFamily: 'sans-serif',
                                fontWeight: "bold",
                            })}
                            labelPosition={60}
                            animate={true}
                            animationDuration={1000}
                            animationEasing='ease-in-out'
                            onClick={(e, index) => {
                                handleClick(index)
                            }}
                        />
                    </div>
                </div>
                <div className="label align-middle my-auto lg:w-1/4 mx-auto w-3/4">
                    {data && data.map((item, index) => {
                        return (
                            <div className='flex items-center'>
                                <p className="dot w-3 h-3 cursor-pointer" style={{ backgroundColor: `${item?.color}` }} onClick={()=>handleClick(index)}></p>
                                <p className="title ml-5">{item?.title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <p className="value uppercase font-bold text-center text-lg text-emerald-900 py-4">{data[indexValue].title} Prodcuts count : {data[indexValue].value}</p>
        </section>
    )
}

export default PieChartComponent