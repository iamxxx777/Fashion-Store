const Product = require("../models/product")
const asyncHandler = require("express-async-handler")
const cloudinary = require("../config/cloudinary")
const fs = require("fs")


const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const pageNumber = Number(req.query.pageNumber) || 1
    const sortKey = req.query.sortKey
    const sortValue = req.query.sortValue.toLowerCase() || 'desc'
    const sort =  sortKey ? { [sortKey]: sortValue } : { updatedAt: 'desc' }
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
    let delImages = []

    if(product) {
        // Delete Images from cloudinary
        const destroyer = async (cloudId) => cloudinary.destroy(cloudId)

        const images = product.images
        for(const image of images) {
            if(image.cloudId) {
                const result = await destroyer(image.cloudId)
                delImages.push(result)
            }
        }

        await Product.findByIdAndDelete(id)
        res.json({success: true})
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const data = req.body
    
    let images = [], details

    // Convert Sizes String to Array of Objects
    const sizes = data.sizes.split(",").map((size) => {
        var splitSize = size.split("=")
        return { name: String(splitSize[0]), count: Number(splitSize[1]) }
    })

    // Get the overall items total
    const countInStock = sizes.reduce((total, size) => {
        return total + size.count
    }, 0)

    // Convert Details String to Lists
    if(data.details) {
        details = data.details.split(".")
    }


    // Upload Images
    const uploader = async (path) => cloudinary.uploads(path, 'Store')
    
    if(req.files.length > 0) {
        const files = req.files
        for(const file of files) {
            const { path } = file
            const newImage = await uploader(path)
            images.push(newImage)
            fs.unlinkSync(path)
        }
    }

    // Create Product
    const newProduct = new Product({
        user: req.user._id,
        name: data.name,
        category: data.category,
        description: data.description,
        brand: data.brand,
        gender: data.gender,
        images: images,
        price: data.price,
        details,
        countInStock,
        sizes
    })

    await newProduct.save()
    res.json({ success: true })
})


const editProduct = asyncHandler(async (req, res) => {
    const data = req.body
    const id = req.params.id
    let images = [], delImages = [], details
    

    const product = await Product.findById(id)

    if(!product) {
        res.status(400)
        throw new Error("Product not found")
    }

    // Convert Sizes String to Array of Objects
    const sizes = data.sizes.split(",").map((size) => {
        var splitSize = size.split("=")
        return { name: String(splitSize[0]), count: Number(splitSize[1]) }
    })

    // Get the overall items total
    const countInStock = sizes.reduce((total, size) => {
        return total + size.count
    }, 0)

    // Convert Details String to Lists
    if(data.details) {
        details = data.details.split(".")
    }

    if(req.files.length > 0) {
        // Delete Previous Image from cloudinary
        const destroyer = async (cloudId) => cloudinary.destroy(cloudId)

        const prevImages = product.images
        for(const image of prevImages) {
            if(image.cloudId) {
                const result = await destroyer(image.cloudId)
                delImages.push(result)
            }
        }

        // Upload New Ones
        const uploader = async (path) => cloudinary.uploads(path, 'Store')
        
        const files = req.files
        for(const file of files) {
            const { path } = file
            const newImage = await uploader(path)
            images.push(newImage)
            fs.unlinkSync(path)
        }

        data.images = images
    }

    data.sizes = sizes
    data.details = details
    data.countInStock = countInStock

    Product.findByIdAndUpdate(id, {$set: data}, {new: true}, (err, doc) => {
        if(err) {
          res.status(500)
          throw new Error("Error updating product")
        } else {
            res.json({ success: true });
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
            throw new Error("Already reviewed by user")
        }

        const newReview = { 
            user: req.user._id,
            comment,
            rating: Number(rating),
            date: Date.now()
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
