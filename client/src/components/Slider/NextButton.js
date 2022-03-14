import React from 'react'
import '../../styles/Slider.scss'

const NextButton = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className} slide_btn`}
            style={{...style, 
                display: "block", 
                right: '-10px',
                zIndex: '2', 
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)'
            }}
            onClick={onClick}
        />
    )
};

export default NextButton;
