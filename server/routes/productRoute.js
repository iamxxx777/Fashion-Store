const router = require("express").Router()
const upload = require("../config/multer")
const { isAuthenticated, isAdmin } = require("../middleware/auth")
const {
    getProducts,
    getCategoryProducts,
    getProduct,
    getTopProducts,
    addProductReview,
    editProduct,
    createProduct,
    deleteProduct
} = require("../controllers/productsController")

router.get('/category', getCategoryProducts)

router.get("/top", getTopProducts)

router.get("/", getProducts)

router.post("/", isAuthenticated, isAdmin, upload.any("images"), createProduct)

router.get("/:id", getProduct)

router.put("/:id", isAuthenticated, isAdmin, upload.any("images"), editProduct)

router.delete("/:id", isAuthenticated, isAdmin, deleteProduct)

router.post("/:id/reviews", isAuthenticated, addProductReview)




module.exports = router