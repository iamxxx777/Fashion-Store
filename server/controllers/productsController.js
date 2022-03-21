const Product = require("../models/product")
const asyncHandler = require("express-async-handler")
const cloudinary = require("../config/cloudinary")
const fs = require("fs")


const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const pageNumber = Number(req.query.pageNumber) || 1
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue.toLowerCase() || 'desc'
    const sort =  sortKey ? { [sortKey]: sortValue } : {}
    const keyword = req.query.keyword.toLowerCase() 
        ? {
            name: {
                $regex: req.query.keyword,
                $options: "i"
            },
        } : {}
    const count = await Product.countDocuments({ ...keyword })

    const products = await Product.find({...keyword})
        .sort({...sort})
        .skip(pageSize * (pageNumber - 1))
        .limit(pageSize)

    res.json({
        products,
        pageNumber,
        pages: Math.ceil(count / pageSize),
        count
    })
})


const getCategoryProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const pageNumber = Number(req.query.pageNumber) || 1
    const category = req.query.category.toLowerCase()
    
    const count = await Product.countDocuments({category: category})

    const products = await Product.find({category: category})
        .skip(pageSize * (pageNumber - 1))
        .limit(pageSize)

    res.json({
        products,
        pageNumber,
        pages: Math.ceil(count / pageSize)
    })
})


const getProduct = asyncHandler(async (req, res) => {
    const id = req.params.id

    if(!id) {
        throw new Error("Id is not specified") 
    }

    const product = await Product.findById(id)

    const categoryProducts = await Product.find({category: product.category}).limit(6)
    const brandProducts = await Product.find({brand: product.brand}).limit(6)

    if(!product) {
        res.status(404)
        throw new Error("Product not found")
    } else {
        res.json({
            product,
            brandProducts,
            categoryProducts
        })
    }

})


const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({'ratings': -1})
    const sliced = products.slice(0, 10)

    res.json(sliced)
})


const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)

    if(product) {
        await Product.findByIdAndDelete(id)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const data = req.body
    let images

    const uploader = async (path) => cloudinary.uploads(path, 'Products')

    if(req.files) {
        const files = req.files

        for(const file of files) {
            const { path } = file
            const newImage = await uploader(path)
            images.push(newImage)
            fs.unlinkSync(path)
        }
    }

    const newProduct = new Product({
        user: req.user._id,
        name: data.name,
        category: data.category,
        description: data.description,
        images: images,
        price: data.price,
        reviews: [],
        countInStock: data.countInStock,
        sizes: data.sizes
    })

    await newProduct.save()
    res.json(newProduct)
})


const editProduct = asyncHandler(async (req, res) => {
    let data = req.body
    const id = req.params.id
    let imageUrl

    const product = await Product.findById(id)

    if(!product) {
        res.status(400)
        throw new Error("Product not found")
    }

    if(req.file) {
        await cloudinaryV.uploader.destroy(product.image_url.cloudId)

        const result = await cloudinaryV.uploader.upload(req.file.path);
        if(result.secure_url) {
            imageUrl = {
                url: result.secure_url,
                cloudId: result.public_id
            }
        }
    }

    data.image_url = imageUrl

    Product.findByIdAndUpdate(id, {$set: data}, {new: true}, (err, doc) => {
        if(err) {
          res.status(500)
          throw new Error("Error updating product")
        } else {
            console.log(doc)
            res.json(doc);
        }
    })
})


const addProductReview = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { rating, comment } = req.body

    const product = Product.findById(id)

    if(product) {
        const reviews = product.reviews

        const alreadyReviewed = reviews.find((review) => {
            review.user.toString() === req.user._id.toString()
        })

        if(alreadyReviewed) {
            res.status(400)
            throw new Error("Already reviewed bu user")
        }

        const newReview = { 
            user: req.user._id,
            comment,
            rating: Number(rating)
        }

        product.reviews = [...product.reviews, newReview]

        product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
  
})




module.exports = {
    getProducts,
    getCategoryProducts,
    getProduct,
    getTopProducts,
    deleteProduct,
    createProduct,
    editProduct,
    addProductReview
}