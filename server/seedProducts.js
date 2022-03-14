const connectDB = require("./config/connectDB")
const products = require("./data/products")
const Product = require('./models/product')
const User = require('./models/user')

connectDB()

const populateProducts = async () => {
    try {
        await Product.deleteMany()

        const user = await User.findOne({isAdmin: true})

        const productsData = products.map((product) => {
            return {...product, user: user._id, category: product.category.toLowerCase(), name: product.name.toLowerCase()}
        })

        await Product.insertMany(productsData)

        console.log('files uploaded')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

populateProducts()