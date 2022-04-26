import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import Product from '../Products/Product'
import PrevButton from '../Slider/PrevButton'
import NextButton from '../Slider/NextButton'

import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import '../../styles/TopProductsSlide.scss'

const TopProductsSlide = ({ products }) => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
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
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false
                }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
                breakpoint: 420,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false
                }
            }
        ],
    }


    return (
        <section className="top_products_slide">
            <div className="top_products_slide_container">
                <div className="top_products_slide_title">
                    <h2>Top Rated</h2>
                    <Link to='/products'><div><span>See All</span> <ArrowRightIcon /></div></Link>
                </div>
                <div className="top_products_slider">
                    <Slider {...settings}>
                        {
                            products?.map((product) => (
                                <Product key={product._id} product={product} />
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default TopProductsSlide;
