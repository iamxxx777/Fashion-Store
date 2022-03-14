import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ProductCarousel = ({ images, title }) => {
    return (
        <Carousel
            thumbWidth={60}
            showIndicators={false}
            showStatus={false}
        >
            {images.map((image, i) => (
                <div key={i}>
                    <img src={image.url} alt={title} />
                </div>
            ))}
        </Carousel>
    )
};

export default ProductCarousel
