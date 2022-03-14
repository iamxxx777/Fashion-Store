import { useRouter } from 'next/router'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { wrapper } from '../../redux/store'

import { getProducts, getProductDetails } from "../../redux/actions/productActions"
import { addToCart } from "../../redux/actions/productActions"


const ProductPage = () => {

    return (
        <div className='product_page'>
            <div className="product_page_container">
                <div className="product_images">
                    <div className="images_container">
                        <Image
                            src="/voxelate.png"
                            width={500}
                            height={500}
                            alt="voxelate blog"
                        />
                    </div>
                </div>
                <div className="product_info">
                    <div className="colors">
                        <button>Red</button>
                        <button>Teal</button>
                        <button>Purple</button>
                    </div>
                    <div className="sizes">
                        <button>L</button>
                        <button>XL</button>
                        <button>XXL</button>
                    </div>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, ab sapiente! Tempore delectus 
                        dolorem architecto minima exercitationem ea, distinctio quos quod, fugiat porro ab quam vel error 
                        ipsa iusto assumenda molestias, in numquam quas iure provident officia cumque dicta. Harum cupiditate saepe reprehenderit obcaecati ab sed libero? Quidem iure, 
                        dolore aliquid doloremque odit delectus quasi aliquam quia cum! Aliquam, blanditiis?
                    </p>
                </div>
                <div className="product_btns">
                    <button>Add to cart</button>
                    <button>Buy now</button>
                </div>
            </div>
        </div>
    )
}




export const getStaticPaths = wrapper.getStaticPaths(async ({store}) => {
    await store.dispatch(getProducts())

    const state = store.getState()

    const { products } = state.products

    const ids = products.map((product) => product._id);

    const paths = ids.map((id) => ({ params: {id: id.toString()} }));

    return {
        paths,
        fallback: false,
    }
})


export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
    
})


export default ProductPage
