import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import NewProduct from '../Products/NewProduct'
import PrevButton from '../Slider/PrevButton'
import NextButton from '../Slider/NextButton'

import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import '../../styles/LatestProducts.scss'


const LatestProducts = ({ products }) => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 1500,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false
                }
            },
            {
                breakpoint: 900,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false
                }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
                breakpoint: 470,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false
                }
            }
        ],
    };

    
    return (
        <section className="latest_products">
            <div className="latest_products_container">
                <div className="latest_products_title">
                    <h2>New Arrivals</h2>
                    <Link to='/products'><div><span>See All</span> <ArrowRightIcon /></div></Link>
                </div>
                <div className="latest_products_slider">
                    <Slider {...settings}>
                        {
                            products?.map((product) => (
                                <NewProduct key={product._id} product={product} />
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </section>
    )
};

export default LatestProducts