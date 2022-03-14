import '../../styles/Slider.scss'

const PrevButton = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className} slide_btn`}
            style={{...style, 
                display: "block", 
                left: '-10px', 
                zIndex: '2',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)'
            }}
            onClick={onClick}
        />
    )
}

export default PrevButton;
