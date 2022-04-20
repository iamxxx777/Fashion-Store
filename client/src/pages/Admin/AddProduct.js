import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'

// COMPONENTS
import Loader from '../../components/Loader/Loader'

// MUI COMPONENTS
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'

// MUI ICONS
import SaveIcon from '@mui/icons-material/Save'

// REDUX ACTIONS
import { createProduct, getProductDetails, updateProduct } from '../../redux/actions/productActions'
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../redux/constants/productConstants'

// STYLES
import '../../styles/AddProduct.scss'

const AddProduct = ({ type }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const alert = useAlert()

    const inputRef = useRef(null)
    const buttonRef = useRef(null)
    const editInputRef = useRef(null)
    const editButtonRef = useRef(null)

    // Get new Product state from redux
    const { newProduct, newProductLoading, newProductError } = useSelector((state) => state.newProduct)
    // If used as edit component, get productDetails
    const { productDetails, loading, error } = useSelector((state) => state.productDetails)    
    // ProductUpdate State
    const { productUpdate, loading: updateLoading, error: updateError } = useSelector((state) => state.updateProduct)


    // Add Product States
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [price, setPrice] = useState("")
    const [sizes, setSizes] = useState("")
    const [gender, setGender] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [details, setDetails] = useState("")
    const [images, setImages] = useState({})
    const [productError, setProductError] = useState("")

    // Edit Product States
    const [editName, setEditName] = useState('')
    const [editBrand, setEditBrand] = useState('')
    const [editPrice, setEditPrice] = useState(0)
    const [editSizes, setEditSizes] = useState([])
    const [editGender, setEditGender] = useState('')
    const [editCategory, setEditCategory] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editDetails, setEditDetails] = useState('')
    const [editImages, setEditImages] = useState([])
    const [newImages, setNewImages] = useState([])
    const [editProductError, setEditProductError] = useState("")

    
    // When user clicks on the button, open the input file tag
    const handleAddInput = (e) => {
        e.preventDefault()
        setImages([])
        inputRef.current.click()
    }

    const handleEditInput = (e) => {
        e.preventDefault()
        setNewImages([])
        editInputRef.current.click()
    }


    // Set images to the state
    const handleChange = (e) => {
        const files = Array.from(e.target.files)

        // Check if only images are selected
        const checkType = (data) => {
            var result
            for(let i = 0; i < data.length; i++) {
                if(data[i].type !== "image/jpeg" && data[i].type !== "image/jpg" && data[i].type !== "image/png") {
                    result = false
                    break
                }
                result = true
            }
            return result
        }

        if(!checkType(files)) {
            alert.error('Images should be in JPEG, JPG or PNG format only')
        } else {
            if(type === 'edit') {
                setNewImages(files)
                setEditImages([])
            } else {
                setImages(files)
            }
        }
        
    }


    // Handle form submission for new product
    const handleNewProduct = (e) => {
        e.preventDefault()

        try {
            if(images.length <= 0) {
                alert.error('Please add some images')
            } else {
                var formData = new FormData()

                for(let i = 0; i < images.length; i++) {
                    formData.append('images', images[i])
                }
                
                formData.append('name', name)
                formData.append('description', description)
                formData.append('brand', brand)
                formData.append('price', price)
                formData.append('sizes', sizes)
                formData.append('gender', gender)
                formData.append('category', category)
                formData.append('details', details)

                dispatch(createProduct(formData))
            }
            
        } catch (error) {
            alert.error(error)
        }

    }

    // Handle form submission for new product
    const handleProductEdit = (e) => {
        e.preventDefault()

        try {
            var editFormData = new FormData()
                
            if(newImages) {
                for(let i = 0; i < newImages.length; i++) {
                    editFormData.append('images', newImages[i])
                }
            }
            editFormData.append('name', editName)
            editFormData.append('description', editDescription)
            editFormData.append('brand', editBrand)
            editFormData.append('price', editPrice)
            editFormData.append('sizes', editSizes)
            editFormData.append('gender', editGender)
            editFormData.append('category', editCategory)
            editFormData.append('details', editDetails)

            dispatch(updateProduct(id, editFormData))
        } catch (error) {
            alert.error(error)
        }
    }


    // If product is created or edited successfully push to products page
    useEffect(() => {
        if(newProduct && newProduct.success) {
            dispatch({type: NEW_PRODUCT_RESET})
            history.push('/admin/products')
        } 
        if(productUpdate && productUpdate.success) {
            dispatch({type: UPDATE_PRODUCT_RESET})
            history.push('/admin/products')
        }

        // If error with backend display the error

        if(newProduct && newProduct.message) {
            setProductError(newProduct.message)
        }
        if(productUpdate && productUpdate.message) {
            setEditProductError(productUpdate.message)
        }
    }, [dispatch, newProduct, productUpdate, history])

   

    // If Used as Edit Product Component, fetch product details
    useEffect(() => {
        if(type === 'edit') {
            dispatch(getProductDetails(id))
        }
    }, [dispatch, id, type])

    // Set ProductDetails when component loads
    useEffect(() => {
        if(productDetails) {
            const formattedSizes = productDetails.product?.sizes?.map((size) => {
                return `${size.name}=${size.count}`
            })
        
            const formattedDetails = productDetails.product?.details?.join(". ")

            setEditName(productDetails.product?.name)
            setEditDescription(productDetails.product?.description)
            setEditDetails(formattedDetails)
            setEditPrice(productDetails.product?.price)
            setEditBrand(productDetails.product?.brand)
            setEditGender(productDetails.product?.gender)
            setEditCategory(productDetails.product?.category)
            setEditSizes(formattedSizes)
            setEditImages(productDetails.product?.images)
        }
    }, [productDetails])
    
    if(loading) {
        return <div className='add_product'> <Loader /> </div>
    }

    if(error) {
        return <div className='add_product'> <h2>{error}</h2> </div>
    }


    return (
        <div className='add_product'>
            <div className="container">
                <section className="title">
                    <h1>{type === 'edit' ? 'Edit' : 'Add'} Product</h1>
                    <Link to="/admin/products">Back to Products</Link>
                </section>
                {type === 'add' && 
                    <section className="form">
                        <form onSubmit={handleNewProduct} onChange={() => setProductError("")}>
                            {productError && <p className='error'>{productError}</p>}
                            {newProductError && <p className='error'>{newProductError}</p>}
                            <Grid container rowSpacing={3} columnSpacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth 
                                        required
                                        size="small"
                                        label="Product Name" 
                                        variant="outlined" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth 
                                        required
                                        size="small"
                                        label="Price" 
                                        variant="outlined" 
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="form_control">
                                        <div className="control">
                                            <button ref={buttonRef} onClick={handleAddInput}>Choose Images</button>
                                            <input ref={inputRef} onChange={handleChange} type="file" accept="image/*" multiple name="images" />
                                            {!images.length && <p>Upload images less than 100kb</p>}
                                            {images.length > 0 && <p>{images.length} imgs selected</p>}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        fullWidth
                                        required
                                        multiline
                                        rows={5}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Details: Lists are seperated by fullstop"
                                        fullWidth
                                        multiline
                                        rows={5}
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div className="select">
                                        <label htmlFor="form-category">Category</label>
                                        <select value={category} onChange={(e) => setCategory(e.target.value)} name="category" id="form-category">
                                            <option value="sneakers">Sneakers</option>
                                            <option value="dresses">Dresses</option>
                                            <option value="shirts">Shirts</option>
                                            <option value="trousers">Trousers</option>
                                            <option value="gym">Gym</option>
                                            <option value="jackets and hoodies">Jackets and Hoodies</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div className="select">
                                        <label htmlFor="form-gender">Gender</label>
                                        <select value={gender} onChange={(e) => setGender(e.target.value)} name="gender" id="form-gender">
                                            <option value="for men">For Men</option>
                                            <option value="for women">For Women</option>
                                            <option value="unisex">Unisex</option>
                                        </select>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth 
                                        required
                                        size="small"
                                        label="Brand" 
                                        variant="outlined" 
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth 
                                        required
                                        multiline
                                        rows={5}
                                        label="Sizes: Format M=3, XL=4, 44=2" 
                                        variant="outlined" 
                                        value={sizes}
                                        onChange={(e) => setSizes(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container rowSpacing={3} columnSpacing={4}>
                                <Grid item xs={12} sm={12} sx={{ mt: 3, '& button': { width: "100%", padding: '0.6rem' } }}>
                                    <LoadingButton
                                        endIcon={<SaveIcon />}
                                        loading={newProductLoading}
                                        loadingPosition="end"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Add Product
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </form>
                    </section>
                }
                {type === 'edit' && 
                    <section className="form">
                        <form onSubmit={handleProductEdit} onChange={() => setEditProductError("")}>
                            {updateError && <p className='error'>{updateError}</p>}
                            {editProductError && <p className='error'>{productError}</p>}
                            <Grid container rowSpacing={3} columnSpacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth 
                                        required
                                        size="small"
                                        label="Product Name" 
                                        variant="outlined" 
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth 
                                        required
                                        size="small"
                                        label="Price" 
                                        variant="outlined" 
                                        value={editPrice}
                                        onChange={(e) => setEditPrice(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="form_control">
                                        <div className="control">
                                            <div className="images">
                                                {editImages?.map((img, i) => <img src={img.url} alt={editName} key={i} />)}
                                            </div>
                                            <button ref={editButtonRef} onClick={handleEditInput}>Choose Images</button>
                                            <input ref={editInputRef} onChange={handleChange} type="file" accept="image/*" multiple name="images" />
                                            {newImages.length > 0 && <p>{newImages.length} imgs selected</p>}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        fullWidth
                                        required
                                        multiline
                                        rows={5}
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Details: Lists are seperated by fullstop"
                                        fullWidth
                                        multiline
                                        rows={5}
                                        value={editDetails}
                                        onChange={(e) => setEditDetails(e.target.value)}
                                    />
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <div className="select">
                                        <label htmlFor="edit-category">Category</label>
                                        <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)} name="category" id="edit-category">
                                            <option value="sneakers">Sneakers</option>
                                            <option value="dresses">Dresses</option>
                                            <option value="shirts">Shirts</option>
                                            <option value="trousers">Trousers</option>
                                            <option value="gym">Gym</option>
                                            <option value="jackets and hoodies">Jackets and Hoodies</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div className="select">
                                        <label htmlFor="edit-gender">Gender</label>
                                        <select value={editGender} onChange={(e) => setEditGender(e.target.value)} name="gender" id="edit-gender">
                                            <option value="for men">For Men</option>
                                            <option value="for women">For Women</option>
                                            <option value="unisex">Unisex</option>
                                        </select>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth 
                                        required
                                        size="small"
                                        label="Brand" 
                                        variant="outlined" 
                                        value={editBrand}
                                        onChange={(e) => setEditBrand(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth 
                                        required
                                        multiline
                                        rows={5}
                                        label="Sizes: Format M=3, XL=4, 44=2" 
                                        variant="outlined" 
                                        value={editSizes}
                                        onChange={(e) => setEditSizes(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container rowSpacing={3} columnSpacing={4}>
                                <Grid item xs={12} sm={12} sx={{ mt: 3, '& button': { width: "100%", padding: '0.6rem' } }}>
                                    <LoadingButton
                                        endIcon={<SaveIcon />}
                                        loading={updateLoading}
                                        loadingPosition="end"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Save Product
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </form>
                    </section>
                }
            </div>
        </div>
    )
}

export default AddProduct