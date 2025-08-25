
// import React, { useState, useEffect } from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CFormTextarea,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
//   CAlert,
//   CSpinner,
//   CImage,
//   CBadge,
//   CProgress,
//   CFormSelect,
// } from '@coreui/react'
// import { cilInbox, cilDescription, cilDollar, cilGrid, cilImage, cilTrash, cilCheckCircle } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import axios from 'axios'
// import { useAuth } from '../../../hooks/useAuth'
// import CommonModal from '../../../components/CommonModal'

// const AddProduct = ({ visible, onClose, fetchProducts, data }) => {
//   const { token } = useAuth()

//    const [images, setImages] = useState([])
//   const [previewImages, setPreviewImages] = useState([])
//   const [existingImages, setExistingImages] = useState(data?.imageUrl || [])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')
//   const [dragActive, setDragActive] = useState(false)
//   const [categories, setCategories] = useState([])
//   const [subcategory, setSubcategory] = useState([])
//   const [store, setStores] = useState([])
//   const [formData, setFormData] = useState({
//     name: data?.name || '',
//     description: data?.description || '',
//     price: data?.price || '',
//     stock: data?.stock || '',
//     category_id: data.category_id || '',
//     subcategory_id: data.subcategory_id || '',
//     shop_id: data.shop_id || '',
//   })

// const fetchAllcategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/master/categories', {})
//         setCategories(response.data.data || []);

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const fetchAllsubcategories = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/master/get-subcategories/?id=${formData.category_id}`, {})
//       setSubcategory(response.data?.data.subcategories)

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const fetchAllshops = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/master/store`, {})
//       setStores(response.data?.stores)

//     } catch (error) {
//       console.log(error)
//     }
//   }


//  const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//     setError('')
//   }

//   const handleImageChange = (files) => {
//     const fileArray = Array.from(files)
//     if (fileArray.length + images.length + existingImages.length > 5) {
//       setError('Maximum 5 images allowed')
//       return
//     }

//     setImages(prev => [...prev, ...fileArray])

//     const previewUrls = fileArray.map(file => URL.createObjectURL(file))
//     setPreviewImages(prev => [...prev, ...previewUrls])
//   }

//   const handleFileInput = (e) => {
//     handleImageChange(e.target.files)
//   }

//   const handleDrag = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true)
//     } else if (e.type === "dragleave") {
//       setDragActive(false)
//     }
//   }

//   const handleDrop = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setDragActive(false)

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleImageChange(e.dataTransfer.files)
//     }
//   }

//   const removeImage = (index, isExisting = false) => {
//     if (isExisting) {
//       setExistingImages(prev => prev.filter((_, i) => i !== index))
//     } else {
//       setImages(prev => prev.filter((_, i) => i !== index))
//       setPreviewImages(prev => prev.filter((_, i) => i !== index))
//     }
//   }

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError('Product name is required')
//       return false
//     }
//     if (!formData.price || formData.price <= 0) {
//       setError('Valid price is required')
//       return false
//     }
//     if (!formData.stock || formData.stock < 0) {
//       setError('Valid stock quantity is required')
//       return false
//     }
//     if (!data?._id && images.length === 0) {
//       setError('At least one image is required for new products')
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     setLoading(true)
//     setError('')
//     setSuccess('')

//     try {
//       const formDataToSend = new FormData()
//       formDataToSend.append('name', formData.name)
//       formDataToSend.append('description', formData.description)
//       formDataToSend.append('price', formData.price)
//       formDataToSend.append('stock', formData.stock)
//       formDataToSend.append('category_id', formData.category_id)
//       formDataToSend.append('subcategory_id', formData.subcategory_id)
//       formDataToSend.append('store_id', formData.store_id)


//       images.forEach(image => {
//         formDataToSend.append('images', image)
//       })

//       let response

//       if (data?._id) {
//         response = await axios.put(
//           `http://localhost:5000/api/admin/products/${data._id}`,
//           formDataToSend,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//         )
//         setSuccess(`Product "${formData.name}" updated successfully!`)
//       } else {
//         // Create new product
//         response = await axios.post(
//           'http://localhost:5000/api/admin/products',
//           formDataToSend,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//         )
//         setSuccess(`Product "${formData.name}" created successfully!`)
//       }

//       await new Promise(resolve => setTimeout(resolve, 1000))

//       await fetchProducts()

//       setFormData({
//         name: '',
//         description: '',
//         price: '',
//         stock: '',
//       })
//       setImages([])
//       setPreviewImages([])
//       setExistingImages([])

//       onClose()

//     } catch (err) {
//       console.error('Error submitting product:', err)
//       console.error('Error submitting product:', err)
//       if (err.response?.data?.message) {
//         setError(err.response.data.message)
//       } else {
//         setError(data?._id ? 'Failed to update product' : 'Failed to create product')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchAllcategories()
//     fetchAllshops()
//   }, [])

//   useEffect(() => {
//     fetchAllsubcategories()
//   }, [formData.category_id])

   
//   useEffect(() => {
//     if (data) {
//       setFormData({
//         name: data.name || '',
//         description: data.description || '',
//         price: data.price || '',
//         stock: data.stock || '',
//         category_id: data.category_id || '',
//         subcategory_id: data.subcategory_id || '',
//         store_id: data.store_id || '',
//       })
//       setExistingImages(data.imageUrl || [])
//     }
//   }, [data])

//   const totalImages = images.length + existingImages.length
//   const progressPercentage = (totalImages / 5) * 100

//   const renderSubcategoryOptions = (categories, level = 0) => {
//     return categories.map(cat => (
//       <React.Fragment key={cat._id}>
//         <option 
//           value={cat.children && cat.children.length > 0 ? "" : cat._id}
//           disabled={cat.children && cat.children.length > 0}
//           style={{
//             fontWeight: cat.children && cat.children.length > 0 ? 'bold' : 'normal',
//             color: cat.children && cat.children.length > 0 ? '#6c757d' : '#000'
//           }}
//         >
//           {`${'☐ '.repeat(level)}${cat.name}`}
//           {cat.children && cat.children.length > 0 ? ' (Category)' : ''}
//         </option>
//         {cat.children && cat.children.length > 0 &&
//           renderSubcategoryOptions(cat.children, level + 1)}
//       </React.Fragment>
//     ));
//   };
  
//   const renderSelectableOptions = (categories, level = 0) => {
//     let options = [];
    
//     categories.forEach(cat => {
//       if (cat.children && cat.children.length > 0) {
//         options = [...options, ...renderSelectableOptions(cat.children, level + 1)];
//       } else {
//         options.push(
//           <option key={cat._id} value={cat._id}>
//             {`${'— '.repeat(level)}${cat.name}`}
//           </option>
//         );
//       }
//     });
    
//     return options;
//   };

//   return (
//     <CommonModal
//       visible={visible}
//       title={
//         <div className="d-flex align-items-center gap-2">
//           <div className="bg-primary rounded-circle p-2">
//             <CIcon icon={data?._id ? cilCheckCircle : cilInbox} className="text-white" size="lg" />
//           </div>
//           <div>
//             <h5 className="mb-0">{data?._id ? "Edit Product" : "Add New Product"}</h5>
//             <small className="text-muted">
//               {data?._id ? "Update product information" : "Create a new product listing"}
//             </small>
//           </div>
//         </div>
//       }
//       onClose={onClose}
//       size="lg"
//     >
//       <CForm onSubmit={handleSubmit}>
//         <CContainer fluid>
//           {error && (
//             <CAlert
//               color="danger"
//               dismissible
//               onClose={() => setError('')}
//               className="d-flex align-items-center gap-2 border-0 shadow-sm"
//             >
//               <CIcon icon={cilTrash} />
//               <span>{error}</span>
//             </CAlert>
//           )}
//           {success && (
//             <CAlert
//               color="success"
//               dismissible
//               onClose={() => setSuccess('')}
//               className="d-flex align-items-center gap-2 border-0 shadow-sm"
//             >
//               <CIcon icon={cilCheckCircle} />
//               <span>{success}</span>
//             </CAlert>
//           )}

//           <CRow className="g-4">
//             {/* Product Information Section */}
//             <CCol lg={6}>
//               <CCard className="h-100 border-0 shadow-sm">
//                 <CCardHeader className="bg-gradient bg-primary text-white border-0">
//                   <h6 className="mb-0 d-flex align-items-center gap-2">
//                     <CIcon icon={cilInbox} />
//                     Product Information
//                   </h6>
//                 </CCardHeader>
//                 <CCardBody className="p-4">
//                   <div className="mb-4">
//                     <label className="form-label fw-semibold text-dark mb-2">
//                       <CIcon icon={cilInbox} className="me-2 text-primary" />
//                       Product Name
//                     </label>
//                     <CFormInput
//                       type="text"
//                       name="name"
//                       placeholder="Enter product name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       autoFocus
//                       className="form-control-lg border-2 rounded-3"
//                       style={{
//                         borderColor: '#e3f2fd',
//                         transition: 'all 0.3s ease',
//                       }}
//                     />
//                   </div>
//                   {/* Category Dropdown */}
//                   <div className="mb-4">
//                     <label className="form-label fw-semibold text-dark mb-2">
//                       <CIcon icon={cilGrid} className="me-2 text-primary" />
//                       Category
//                     </label>
//                     <CFormSelect
//                       name="category_id"
//                       value={formData.category_id}
//                       onChange={handleChange}
//                       required
//                       className="form-control-lg border-2 rounded-3"
//                       style={{ borderColor: '#e3f2fd' }}
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map(cat => (
//                         <option key={cat._id} value={cat._id}>{cat.name}</option>
//                       ))}
//                     </CFormSelect>
//                   </div>

//                   {/* Subcategory Dropdown */}
//                   <div className="mb-4">
//                     <label className="form-label fw-semibold text-dark mb-2">
//                       <CIcon icon={cilGrid} className="me-2 text-primary" />
//                       Subcategory
//                     </label>
//                     <CFormSelect
//                       name="subcategory_id"
//                       value={formData.subcategory_id}
//                       onChange={handleChange}
//                       required
//                       disabled={!formData.category_id}
//                       className="form-control-lg border-2 rounded-3"
//                       style={{ borderColor: '#e3f2fd' }}
//                     >
//                       <option value="">Select Subcategory</option>
//                        {renderSubcategoryOptions(subcategory)}
//                       {/* {subcategory
//                         .filter(sub => sub.categoryId === formData.category)
//                         .map(sub => (
//                           <option key={sub._id} value={sub._id}>{sub.subcategory_name}</option>
//                         ))} */}
//                     </CFormSelect>
//                   </div>
//                   <div className="mb-4">
//                     <label className="form-label fw-semibold text-dark mb-2">
//                       <CIcon icon={cilGrid} className="me-2 text-primary" />
//                       Store
//                     </label>
//                     <CFormSelect
//                       name="store_id"
//                       value={formData.store_id}
//                       onChange={handleChange}
//                       required
//                       className="form-control-lg border-2 rounded-3"
//                       style={{ borderColor: '#e3f2fd' }}
//                     >
//                       <option value="">Select Shop</option>
//                       {store
//                         .map(sub => (
//                           <option key={sub._id} value={sub._id}>{sub.store_name}</option>
//                         ))}
//                     </CFormSelect>
//                   </div>

//                   {/* Shop Dropdown */}


//                   <div className="mb-4">
//                     <label className="form-label fw-semibold text-dark mb-2">
//                       <CIcon icon={cilDescription} className="me-2 text-primary" />
//                       Description
//                     </label>
//                     <CFormTextarea
//                       name="description"
//                       placeholder="Describe your product features and benefits"
//                       value={formData.description}
//                       onChange={handleChange}
//                       rows={4}
//                       className="border-2 rounded-3"
//                       style={{
//                         borderColor: '#e3f2fd',
//                         transition: 'all 0.3s ease',
//                         resize: 'vertical'
//                       }}
//                     />
//                   </div>

//                   <CRow>
//                     <CCol md={6}>
//                       <div className="mb-4">
//                         <label className="form-label fw-semibold text-dark mb-2">
//                           <CIcon icon={cilDollar} className="me-2 text-success" />
//                           Price
//                         </label>
//                         <CInputGroup>
//                           <CInputGroupText className="bg-success text-white border-success">
//                             $
//                           </CInputGroupText>
//                           <CFormInput
//                             type="number"
//                             name="price"
//                             placeholder="0.00"
//                             value={formData.price}
//                             onChange={handleChange}
//                             required
//                             min="0"
//                             step="0.01"
//                             className="form-control-lg border-2"
//                             style={{ borderColor: '#e8f5e8' }}
//                           />
//                         </CInputGroup>
//                       </div>
//                     </CCol>
//                     <CCol md={6}>
//                       <div className="mb-4">
//                         <label className="form-label fw-semibold text-dark mb-2">
//                           <CIcon icon={cilGrid} className="me-2 text-info" />
//                           Stock
//                         </label>
//                         <CFormInput
//                           type="number"
//                           name="stock"
//                           placeholder="Quantity"
//                           value={formData.stock}
//                           onChange={handleChange}
//                           required
//                           min="0"
//                           className="form-control-lg border-2 rounded-3"
//                           style={{ borderColor: '#e3f2fd' }}
//                         />
//                       </div>
//                     </CCol>
//                   </CRow>
//                 </CCardBody>
//               </CCard>
//             </CCol>

//             {/* Image Upload Section */}
//             <CCol lg={6}>
//               <CCard className="h-100 border-0 shadow-sm">
//                 <CCardHeader className="bg-gradient bg-info text-white border-0 d-flex justify-content-between align-items-center">
//                   <h6 className="mb-0 d-flex align-items-center gap-2">
//                     <CIcon icon={cilImage} />
//                     Product Images
//                   </h6>
//                   <CBadge color={totalImages === 0 ? 'light' : totalImages === 5 ? 'success' : 'primary'}>
//                     {totalImages}/5
//                   </CBadge>
//                 </CCardHeader>
//                 <CCardBody className="p-4">
//                   {/* Progress Bar */}
//                   <div className="mb-3">
//                     <CProgress
//                       value={progressPercentage}
//                       color={progressPercentage === 100 ? 'success' : 'info'}
//                       height={8}
//                       className="rounded-pill"
//                     />
//                     <small className="text-muted mt-1 d-block text-center">
//                       Upload up to 5 high-quality images
//                     </small>
//                   </div>

//                   {/* Drag and Drop Area */}
//                   <div
//                     className={`border-2 border-dashed rounded-4 p-4 text-center mb-4 position-relative overflow-hidden ${dragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-light'
//                       }`}
//                     style={{
//                       minHeight: '120px',
//                       background: dragActive
//                         ? 'linear-gradient(45deg, rgba(0,123,255,0.1), rgba(0,123,255,0.05))'
//                         : 'linear-gradient(45deg, #f8f9fa, #ffffff)',
//                       transition: 'all 0.3s ease',
//                       cursor: totalImages >= 5 ? 'not-allowed' : 'pointer'
//                     }}
//                     onDragEnter={handleDrag}
//                     onDragLeave={handleDrag}
//                     onDragOver={handleDrag}
//                     onDrop={handleDrop}
//                     onClick={() => !loading && totalImages < 5 && document.getElementById('imageInput').click()}
//                   >
//                     <input
//                       id="imageInput"
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={handleFileInput}
//                       disabled={totalImages >= 5}
//                       style={{ display: 'none' }}
//                     />

//                     <div className="d-flex flex-column align-items-center gap-2">
//                       <div className="bg-primary bg-opacity-10 rounded-circle p-3">
//                         <CIcon icon={cilImage} size="xl" className="text-primary" />
//                       </div>
//                       <div>
//                         <p className="mb-1 fw-semibold text-dark">
//                           {totalImages >= 5 ? 'Maximum images reached' : 'Drop images here or click to browse'}
//                         </p>
//                         <small className="text-muted">
//                           JPG, PNG, WebP up to 10MB each
//                         </small>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Image Previews */}
//                   {totalImages > 0 && (
//                     <div className="row g-2">
//                       {existingImages.map((img, index) => (
//                         <div key={`existing-${index}`} className="col-4">
//                           <div className="position-relative group">
//                             <CImage
//                               src={`http://localhost:5000/uploads/${img}`}
//                               alt={`Existing ${index + 1}`}
//                               className="w-100 rounded-3 shadow-sm"
//                               style={{
//                                 height: '80px',
//                                 objectFit: 'cover',
//                                 transition: 'transform 0.2s ease'
//                               }}
//                             />
//                             <button
//                               type="button"
//                               className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-1"
//                               onClick={() => removeImage(index, true)}
//                               style={{
//                                 width: '24px',
//                                 height: '24px',
//                                 fontSize: '10px',
//                                 opacity: '0.9'
//                               }}
//                             >
//                               ×
//                             </button>
//                             <CBadge
//                               color="success"
//                               className="position-absolute bottom-0 start-0 m-1"
//                               style={{ fontSize: '8px' }}
//                             >
//                               Saved
//                             </CBadge>
//                           </div>
//                         </div>
//                       ))}

//                       {/* New Image Previews */}
//                       {previewImages.map((preview, index) => (
//                         <div key={`preview-${index}`} className="col-4">
//                           <div className="position-relative">
//                             <CImage
//                               src={preview}
//                               alt={`Preview ${index + 1}`}
//                               className="w-100 rounded-3 shadow-sm"
//                               style={{
//                                 height: '80px',
//                                 objectFit: 'cover',
//                                 transition: 'transform 0.2s ease'
//                               }}
//                             />
//                             <button
//                               type="button"
//                               className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-1"
//                               onClick={() => removeImage(index)}
//                               style={{
//                                 width: '24px',
//                                 height: '24px',
//                                 fontSize: '10px',
//                                 opacity: '0.9'
//                               }}
//                             >
//                               ×
//                             </button>
//                             <CBadge
//                               color="warning"
//                               className="position-absolute bottom-0 start-0 m-1"
//                               style={{ fontSize: '8px' }}
//                             >
//                               New
//                             </CBadge>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </CCardBody>
//               </CCard>
//             </CCol>
//           </CRow>

//           {/* Submit Button */}
//           <div className="mt-4 d-grid">
//             <CButton
//               type="submit"
//               color="primary"
//               disabled={loading}
//               size="lg"
//               className="py-3 rounded-3 fw-semibold shadow-sm"
//               style={{
//                 background: loading
//                   ? 'linear-gradient(45deg, #6c757d, #adb5bd)'
//                   : 'linear-gradient(45deg, #0d6efd, #6610f2)',
//                 border: 'none',
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               {loading ? (
//                 <div className="d-flex align-items-center justify-content-center gap-2">
//                   <CSpinner size="sm" />
//                   <span>{data?._id ? "Saving Changes..." : "Creating Product..."}</span>
//                 </div>
//               ) : (
//                 <div className="d-flex align-items-center justify-content-center gap-2">
//                   <CIcon icon={data?._id ? cilCheckCircle : cilInbox} />
//                   <span>{data?._id ? "Save Changes" : "Add Product"}</span>
//                 </div>
//               )}
//             </CButton>
//           </div>
//         </CContainer>
//       </CForm>
//     </CommonModal>
//   )
// }


// import React, { useState, useEffect } from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CFormTextarea,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
//   CAlert,
//   CSpinner,
//   CImage,
//   CBadge,
//   CProgress,
//   CFormSelect,
//   CBreadcrumb,
//   CBreadcrumbItem,
// } from '@coreui/react'
// import { cilInbox, cilDescription, cilDollar, cilGrid, cilImage, cilTrash, cilCheckCircle, cilArrowLeft } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import axios from 'axios'
// import { useAuth } from '../../../hooks/useAuth'
// import { useNavigate, useParams } from 'react-router-dom'

// const AddProductPage = () => {
//   const { token } = useAuth()
//   const navigate = useNavigate()
//   const { id } = useParams() // For editing existing products
//   const isEditing = Boolean(id)

//   const [images, setImages] = useState([])
//   const [previewImages, setPreviewImages] = useState([])
//   const [existingImages, setExistingImages] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [fetchingData, setFetchingData] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')
//   const [dragActive, setDragActive] = useState(false)
//   const [categories, setCategories] = useState([])
//   const [subcategory, setSubcategory] = useState([])
//   const [store, setStores] = useState([])
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock: '',
//     category_id: '',
//     subcategory_id: '',
//     shop_id: '',
//   })

//   const fetchAllcategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/master/categories', {})
//       setCategories(response.data.data || []);
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const fetchAllsubcategories = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/master/get-subcategories/?id=${formData.category_id}`, {})
//       setSubcategory(response.data?.data.subcategories)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const fetchAllshops = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/master/store`, {})
//       setStores(response.data?.stores)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const fetchProductData = async () => {
//     if (!id) return
    
//     setFetchingData(true)
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/products/${id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       const productData = response.data.product
//       setFormData({
//         name: productData.name || '',
//         description: productData.description || '',
//         price: productData.price || '',
//         stock: productData.stock || '',
//         category_id: productData.category_id || '',
//         subcategory_id: productData.subcategory_id || '',
//         shop_id: productData.shop_id || '',
//       })
//       setExistingImages(productData.imageUrl || [])
//     } catch (error) {
//       setError('Failed to fetch product data')
//     } finally {
//       setFetchingData(false)
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//     setError('')
//   }

//   const handleImageChange = (files) => {
//     const fileArray = Array.from(files)
//     if (fileArray.length + images.length + existingImages.length > 5) {
//       setError('Maximum 5 images allowed')
//       return
//     }

//     setImages(prev => [...prev, ...fileArray])

//     const previewUrls = fileArray.map(file => URL.createObjectURL(file))
//     setPreviewImages(prev => [...prev, ...previewUrls])
//   }

//   const handleFileInput = (e) => {
//     handleImageChange(e.target.files)
//   }

//   const handleDrag = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true)
//     } else if (e.type === "dragleave") {
//       setDragActive(false)
//     }
//   }

//   const handleDrop = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setDragActive(false)

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleImageChange(e.dataTransfer.files)
//     }
//   }

//   const removeImage = (index, isExisting = false) => {
//     if (isExisting) {
//       setExistingImages(prev => prev.filter((_, i) => i !== index))
//     } else {
//       setImages(prev => prev.filter((_, i) => i !== index))
//       setPreviewImages(prev => prev.filter((_, i) => i !== index))
//     }
//   }

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError('Product name is required')
//       return false
//     }
//     if (!formData.price || formData.price <= 0) {
//       setError('Valid price is required')
//       return false
//     }
//     if (!formData.stock || formData.stock < 0) {
//       setError('Valid stock quantity is required')
//       return false
//     }
//     if (!isEditing && images.length === 0) {
//       setError('At least one image is required for new products')
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     setLoading(true)
//     setError('')
//     setSuccess('')

//     try {
//       const formDataToSend = new FormData()
//       formDataToSend.append('name', formData.name)
//       formDataToSend.append('description', formData.description)
//       formDataToSend.append('price', formData.price)
//       formDataToSend.append('stock', formData.stock)
//       formDataToSend.append('category_id', formData.category_id)
//       formDataToSend.append('subcategory_id', formData.subcategory_id)
//       formDataToSend.append('store_id', formData.store_id)

//       images.forEach(image => {
//         formDataToSend.append('images', image)
//       })

//       let response

//       if (isEditing) {
//         response = await axios.put(
//           `http://localhost:5000/api/admin/products/${id}`,
//           formDataToSend,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//         )
//         setSuccess(`Product "${formData.name}" updated successfully!`)
//       } else {
//         response = await axios.post(
//           'http://localhost:5000/api/admin/products',
//           formDataToSend,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//         )
//         setSuccess(`Product "${formData.name}" created successfully!`)
//       }

//       // Redirect after successful submission
//       setTimeout(() => {
//         navigate('/products')
//       }, 2000)

//     } catch (err) {
//       console.error('Error submitting product:', err)
//       if (err.response?.data?.message) {
//         setError(err.response.data.message)
//       } else {
//         setError(isEditing ? 'Failed to update product' : 'Failed to create product')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchAllcategories()
//     fetchAllshops()
//     if (isEditing) {
//       fetchProductData()
//     }
//   }, [])

//   useEffect(() => {
//     fetchAllsubcategories()
//   }, [formData.category_id])

//   const totalImages = images.length + existingImages.length
//   const progressPercentage = (totalImages / 5) * 100

//   const renderSubcategoryOptions = (categories, level = 0) => {
//     return categories.map(cat => (
//       <React.Fragment key={cat._id}>
//         <option 
//           value={cat.children && cat.children.length > 0 ? "" : cat._id}
//           disabled={cat.children && cat.children.length > 0}
//           style={{
//             fontWeight: cat.children && cat.children.length > 0 ? 'bold' : 'normal',
//             color: cat.children && cat.children.length > 0 ? '#6c757d' : '#000'
//           }}
//         >
//           {`${'☐ '.repeat(level)}${cat.name}`}
//           {cat.children && cat.children.length > 0 ? ' (Category)' : ''}
//         </option>
//         {cat.children && cat.children.length > 0 &&
//           renderSubcategoryOptions(cat.children, level + 1)}
//       </React.Fragment>
//     ));
//   };

//   if (fetchingData) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
//         <CSpinner size="lg" />
//       </div>
//     )
//   }

//   return (
//     <CContainer fluid>
  
//       {/* Page Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4" style={{back}}>
//         <div className="d-flex align-items-center gap-3">
          
//           <div>
//             <h4 className="mb-0 d-flex align-items-center gap-2">
//               <div className="bg-primary rounded-circle p-2">
//                 <CIcon icon={isEditing ? cilCheckCircle : cilInbox} className="text-white" size="lg" />
//               </div>
//               {isEditing ? "Edit Product" : "Add New Product"}
//             </h4>
//             <small className="text-muted">
//               {isEditing ? "Update product information" : "Create a new product listing"}
//             </small>
//           </div>
//         </div>
//       </div>

//       <CForm onSubmit={handleSubmit}>
//         {error && (
//           <CAlert
//             color="danger"
//             dismissible
//             onClose={() => setError('')}
//             className="d-flex align-items-center gap-2 border-0 shadow-sm mb-4"
//           >
//             <CIcon icon={cilTrash} />
//             <span>{error}</span>
//           </CAlert>
//         )}
//         {success && (
//           <CAlert
//             color="success"
//             dismissible
//             onClose={() => setSuccess('')}
//             className="d-flex align-items-center gap-2 border-0 shadow-sm mb-4"
//           >
//             <CIcon icon={cilCheckCircle} />
//             <span>{success}</span>
//           </CAlert>
//         )}

//         <CRow className="g-4">
//           {/* Product Information Section */}
//           <CCol lg={6}>
//             <CCard className="h-100 border-0 shadow-sm">
//               <CCardHeader className="bg-gradient bg-primary text-white border-0">
//                 <h6 className="mb-0 d-flex align-items-center gap-2">
//                   <CIcon icon={cilInbox} />
//                   Product Information
//                 </h6>
//               </CCardHeader>
//               <CCardBody className="p-4">
//                 <div className="mb-4">
//                   <label className="form-label fw-semibold text-dark mb-2">
//                     <CIcon icon={cilInbox} className="me-2 text-primary" />
//                     Product Name
//                   </label>
//                   <CFormInput
//                     type="text"
//                     name="name"
//                     placeholder="Enter product name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     autoFocus
//                     className="form-control-lg border-2 rounded-3"
//                     style={{
//                       borderColor: '#e3f2fd',
//                       transition: 'all 0.3s ease',
//                     }}
//                   />
//                 </div>

//                 {/* Category Dropdown */}
//                 <div className="mb-4">
//                   <label className="form-label fw-semibold text-dark mb-2">
//                     <CIcon icon={cilGrid} className="me-2 text-primary" />
//                     Category
//                   </label>
//                   <CFormSelect
//                     name="category_id"
//                     value={formData.category_id}
//                     onChange={handleChange}
//                     required
//                     className="form-control-lg border-2 rounded-3"
//                     style={{ borderColor: '#e3f2fd' }}
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map(cat => (
//                       <option key={cat._id} value={cat._id}>{cat.name}</option>
//                     ))}
//                   </CFormSelect>
//                 </div>

//                 {/* Subcategory Dropdown */}
//                 <div className="mb-4">
//                   <label className="form-label fw-semibold text-dark mb-2">
//                     <CIcon icon={cilGrid} className="me-2 text-primary" />
//                     Subcategory
//                   </label>
//                   <CFormSelect
//                     name="subcategory_id"
//                     value={formData.subcategory_id}
//                     onChange={handleChange}
//                     required
//                     disabled={!formData.category_id}
//                     className="form-control-lg border-2 rounded-3"
//                     style={{ borderColor: '#e3f2fd' }}
//                   >
//                     <option value="">Select Subcategory</option>
//                     {renderSubcategoryOptions(subcategory)}
//                   </CFormSelect>
//                 </div>

//                 <div className="mb-4">
//                   <label className="form-label fw-semibold text-dark mb-2">
//                     <CIcon icon={cilGrid} className="me-2 text-primary" />
//                     Store
//                   </label>
//                   <CFormSelect
//                     name="store_id"
//                     value={formData.store_id}
//                     onChange={handleChange}
//                     required
//                     className="form-control-lg border-2 rounded-3"
//                     style={{ borderColor: '#e3f2fd' }}
//                   >
//                     <option value="">Select Shop</option>
//                     {store.map(sub => (
//                       <option key={sub._id} value={sub._id}>{sub.store_name}</option>
//                     ))}
//                   </CFormSelect>
//                 </div>

//                 <div className="mb-4">
//                   <label className="form-label fw-semibold text-dark mb-2">
//                     <CIcon icon={cilDescription} className="me-2 text-primary" />
//                     Description
//                   </label>
//                   <CFormTextarea
//                     name="description"
//                     placeholder="Describe your product features and benefits"
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows={4}
//                     className="border-2 rounded-3"
//                     style={{
//                       borderColor: '#e3f2fd',
//                       transition: 'all 0.3s ease',
//                       resize: 'vertical'
//                     }}
//                   />
//                 </div>

//                 <CRow>
//                   <CCol md={6}>
//                     <div className="mb-4">
//                       <label className="form-label fw-semibold text-dark mb-2">
//                         <CIcon icon={cilDollar} className="me-2 text-success" />
//                         Price
//                       </label>
//                       <CInputGroup>
//                         <CInputGroupText className="bg-success text-white border-success">
//                           $
//                         </CInputGroupText>
//                         <CFormInput
//                           type="number"
//                           name="price"
//                           placeholder="0.00"
//                           value={formData.price}
//                           onChange={handleChange}
//                           required
//                           min="0"
//                           step="0.01"
//                           className="form-control-lg border-2"
//                           style={{ borderColor: '#e8f5e8' }}
//                         />
//                       </CInputGroup>
//                     </div>
//                   </CCol>
//                   <CCol md={6}>
//                     <div className="mb-4">
//                       <label className="form-label fw-semibold text-dark mb-2">
//                         <CIcon icon={cilGrid} className="me-2 text-info" />
//                         Stock
//                       </label>
//                       <CFormInput
//                         type="number"
//                         name="stock"
//                         placeholder="Quantity"
//                         value={formData.stock}
//                         onChange={handleChange}
//                         required
//                         min="0"
//                         className="form-control-lg border-2 rounded-3"
//                         style={{ borderColor: '#e3f2fd' }}
//                       />
//                     </div>
//                   </CCol>
//                 </CRow>
//               </CCardBody>
//             </CCard>
//           </CCol>

//           {/* Image Upload Section */}
//           <CCol lg={6}>
//             <CCard className="h-100 border-0 shadow-sm">
//               <CCardHeader className="bg-gradient bg-info text-white border-0 d-flex justify-content-between align-items-center">
//                 <h6 className="mb-0 d-flex align-items-center gap-2">
//                   <CIcon icon={cilImage} />
//                   Product Images
//                 </h6>
//                 <CBadge color={totalImages === 0 ? 'light' : totalImages === 5 ? 'success' : 'primary'}>
//                   {totalImages}/5
//                 </CBadge>
//               </CCardHeader>
//               <CCardBody className="p-4">
//                 {/* Progress Bar */}
//                 <div className="mb-3">
//                   <CProgress
//                     value={progressPercentage}
//                     color={progressPercentage === 100 ? 'success' : 'info'}
//                     height={8}
//                     className="rounded-pill"
//                   />
//                   <small className="text-muted mt-1 d-block text-center">
//                     Upload up to 5 high-quality images
//                   </small>
//                 </div>

//                 {/* Drag and Drop Area */}
//                 <div
//                   className={`border-2 border-dashed rounded-4 p-4 text-center mb-4 position-relative overflow-hidden ${dragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-light'
//                     }`}
//                   style={{
//                     minHeight: '120px',
//                     background: dragActive
//                       ? 'linear-gradient(45deg, rgba(0,123,255,0.1), rgba(0,123,255,0.05))'
//                       : 'linear-gradient(45deg, #f8f9fa, #ffffff)',
//                     transition: 'all 0.3s ease',
//                     cursor: totalImages >= 5 ? 'not-allowed' : 'pointer'
//                   }}
//                   onDragEnter={handleDrag}
//                   onDragLeave={handleDrag}
//                   onDragOver={handleDrag}
//                   onDrop={handleDrop}
//                   onClick={() => !loading && totalImages < 5 && document.getElementById('imageInput').click()}
//                 >
//                   <input
//                     id="imageInput"
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleFileInput}
//                     disabled={totalImages >= 5}
//                     style={{ display: 'none' }}
//                   />

//                   <div className="d-flex flex-column align-items-center gap-2">
//                     <div className="bg-primary bg-opacity-10 rounded-circle p-3">
//                       <CIcon icon={cilImage} size="xl" className="text-primary" />
//                     </div>
//                     <div>
//                       <p className="mb-1 fw-semibold text-dark">
//                         {totalImages >= 5 ? 'Maximum images reached' : 'Drop images here or click to browse'}
//                       </p>
//                       <small className="text-muted">
//                         JPG, PNG, WebP up to 10MB each
//                       </small>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Image Previews */}
//                 {totalImages > 0 && (
//                   <div className="row g-2">
//                     {existingImages.map((img, index) => (
//                       <div key={`existing-${index}`} className="col-4">
//                         <div className="position-relative group">
//                           <CImage
//                             src={`http://localhost:5000/uploads/${img}`}
//                             alt={`Existing ${index + 1}`}
//                             className="w-100 rounded-3 shadow-sm"
//                             style={{
//                               height: '80px',
//                               objectFit: 'cover',
//                               transition: 'transform 0.2s ease'
//                             }}
//                           />
//                           <button
//                             type="button"
//                             className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-1"
//                             onClick={() => removeImage(index, true)}
//                             style={{
//                               width: '24px',
//                               height: '24px',
//                               fontSize: '10px',
//                               opacity: '0.9'
//                             }}
//                           >
//                             ×
//                           </button>
//                           <CBadge
//                             color="success"
//                             className="position-absolute bottom-0 start-0 m-1"
//                             style={{ fontSize: '8px' }}
//                           >
//                             Saved
//                           </CBadge>
//                         </div>
//                       </div>
//                     ))}

//                     {/* New Image Previews */}
//                     {previewImages.map((preview, index) => (
//                       <div key={`preview-${index}`} className="col-4">
//                         <div className="position-relative">
//                           <CImage
//                             src={preview}
//                             alt={`Preview ${index + 1}`}
//                             className="w-100 rounded-3 shadow-sm"
//                             style={{
//                               height: '80px',
//                               objectFit: 'cover',
//                               transition: 'transform 0.2s ease'
//                             }}
//                           />
//                           <button
//                             type="button"
//                             className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-1"
//                             onClick={() => removeImage(index)}
//                             style={{
//                               width: '24px',
//                               height: '24px',
//                               fontSize: '10px',
//                               opacity: '0.9'
//                             }}
//                           >
//                             ×
//                           </button>
//                           <CBadge
//                             color="warning"
//                             className="position-absolute bottom-0 start-0 m-1"
//                             style={{ fontSize: '8px' }}
//                           >
//                             New
//                           </CBadge>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>

//         {/* Submit Button */}
//         <div className="mt-4 d-flex gap-3 justify-content-end">
//           <CButton
//             type="button"
//             color="secondary"
//             onClick={() => navigate('/products')}
//             size="lg"
//             className="px-4"
//           >
//             Cancel
//           </CButton>
//           <CButton
//             type="submit"
//             color="primary"
//             disabled={loading}
//             size="lg"
//             className="px-4 fw-semibold"
//             style={{
//               background: loading
//                 ? 'linear-gradient(45deg, #6c757d, #adb5bd)'
//                 : 'linear-gradient(45deg, #0d6efd, #6610f2)',
//               border: 'none',
//               transition: 'all 0.3s ease'
//             }}
//           >
//             {loading ? (
//               <div className="d-flex align-items-center gap-2">
//                 <CSpinner size="sm" />
//                 <span>{isEditing ? "Saving Changes..." : "Creating Product..."}</span>
//               </div>
//             ) : (
//               <div className="d-flex align-items-center gap-2">
//                 <CIcon icon={isEditing ? cilCheckCircle : cilInbox} />
//                 <span>{isEditing ? "Save Changes" : "Add Product"}</span>
//               </div>
//             )}
//           </CButton>
//         </div>
//       </CForm>
//     </CContainer>
//   )
// }

// export default AddProductPage
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CSpinner,
  CImage,
  CBadge,
  CProgress,
  CFormSelect,
  CFormCheck, 
} from '@coreui/react'
import { cilInbox, cilDescription, cilDollar, cilGrid, cilImage, cilTrash, cilCheckCircle, cilPlus, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import { getvariantsbyCategory } from '../../../api/product'

const AddProductPage = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)
  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(isEditing)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [categories, setCategories] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const [store, setStores] = useState([])
  const [variants,setVariants] = useState([])
  const [selectedVariations, setSelectedVariations] = useState([]);
  const [sku,setSku] = useState("")
  const [variant_name,setVariant_name] = useState("")



  console.log(selectedVariations,'======================================simple==========================')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    subcategory_id: '',
    shop_id: '',
    variant:{
      attributes:selectedVariations
    }

  })

  const [hasVariations, setHasVariations] = useState(false);
  const [sizes, setSizes] = useState(['']); 
  const [colors, setColors] = useState(['']); 

  console.log(selectedVariations)
  console.log(formData)

  const fetchVariants = async () => {
    console.log(formData.category_id)
  try {
   const response = await getvariantsbyCategory(formData.category_id);
   setVariants(response.data.data)
    console.log("Variants:", response);


  } catch (error) {
    console.error("Error fetching variants:", error);
  }
};

const handleCheckboxChange = (attributeId, valueId, isChecked) => {
  setSelectedVariations((prev) => {
    if (isChecked) {
      return [...prev, { attribute_id: attributeId, value_id: valueId }];
    } else {
      return prev.filter(
        (item) =>
          !(item.attribute_id === attributeId && item.value_id === valueId)
      );
    }
  });
};




  
  const fetchAllcategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/master/categories', {})
      setCategories(response.data.data || []);
    } catch (error) {
      console.log(error)
      setError('Failed to fetch categories.');
    }
  }

  const fetchAllsubcategories = async () => {
    if (!formData.category_id) {
        setSubcategory([]);
        return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/master/get-subcategories/?id=${formData.category_id}`, {})
      setSubcategory(response.data?.data.subcategories || [])
    } catch (error) {
      console.log(error)
      setError('Failed to fetch subcategories.');
    }
  }

  const fetchAllshops = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/master/store`, {})
      setStores(response.data?.stores || [])
    } catch (error) {
      console.log(error)
      setError('Failed to fetch stores.');
    }
  }

  const fetchProductData = async () => {
    if (!id) return
    
    setFetchingData(true)
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/products/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const productData = response.data.product
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price || '',
        stock: productData.stock || '',
        category_id: productData.category_id || '',
        subcategory_id: productData.subcategory_id || '',
        shop_id: productData.shop_id || '',
      })
      setExistingImages(productData.imageUrl || [])
      if (productData.variations) {
        setHasVariations(true);
        setSizes(productData.variations.sizes || ['']);
        setColors(productData.variations.colors || ['']);
      }
    } catch (error) {
      setError('Failed to fetch product data')
    } finally {
      setFetchingData(false)
    }
  }



  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleImageChange = (files) => {
    const fileArray = Array.from(files)
    if (fileArray.length + images.length + existingImages.length > 5) {
      setError('Maximum 5 images allowed')
      return
    }
    setImages(prev => [...prev, ...fileArray])
    const previewUrls = fileArray.map(file => URL.createObjectURL(file))
    setPreviewImages(prev => [...prev, ...previewUrls])
  }

  const handleFileInput = (e) => handleImageChange(e.target.files)

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleImageChange(e.dataTransfer.files);
  }

  const removeImage = (index, isExisting = false) => {
    if (isExisting) setExistingImages(prev => prev.filter((_, i) => i !== index));
    else {
      setImages(prev => prev.filter((_, i) => i !== index));
      setPreviewImages(prev => prev.filter((_, i) => i !== index));
    }
  }




  const validateForm = () => {
    if (!formData.name.trim()) { setError('Product name is required'); return false; }
    if (!formData.price || formData.price <= 0) { setError('Valid price is required'); return false; }
    if (formData.stock === '' || formData.stock < 0) { setError('Valid stock quantity is required'); return false; }
    if (!isEditing && images.length === 0 && existingImages.length === 0) { setError('At least one image is required'); return false; }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('price', formData.price)
      formDataToSend.append('stock', formData.stock)
      formDataToSend.append('category_id', formData.category_id)
      formDataToSend.append('subcategory_id', formData.subcategory_id)
      formDataToSend.append('store_id', formData.shop_id)
      // formDataToSend.append('variant'),selectedVariations)

          if (hasVariations && selectedVariations.length > 0) {
      formDataToSend.append(
        'variant',
        JSON.stringify({
          sku: sku,
          variant_name: variant_name,
          attributes:selectedVariations
        })
      )
    }

      images.forEach(image => formDataToSend.append('images', image))

      // if (hasVariations) {
      //   const filteredSizes = sizes.filter(s => s.trim() !== '');
      //   const filteredColors = colors.filter(c => c.trim() !== '');
      //   formDataToSend.append('hasVariations', true);
      //   formDataToSend.append('variations', JSON.stringify({ sizes: filteredSizes, colors: filteredColors }));
      // }

      // if (isEditing) {
      //   await axios.put(`http://localhost:5000/api/admin/products/${id}`, formDataToSend, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }})
      //   setSuccess(`Product "${formData.name}" updated successfully!`)
      // } else {
      //   await axios.post('http://localhost:5000/api/admin/products', formDataToSend, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }})
      //   setSuccess(`Product "${formData.name}" created successfully!`)
      // }

      if (isEditing) {
  const response = await axios.put(
    `http://localhost:5000/api/admin/products/${id}`,
    formDataToSend,
    { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
  )

  setSuccess(`Product "${formData.name}" updated successfully!`)

  // Navigate with updated product id
  setTimeout(() => navigate(`/dashboard/products/add-inventory/${response.data.product._id}`), 2000)

} else {
  const response = await axios.post(
    'http://localhost:5000/api/admin/products',
    formDataToSend,
    { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
  )

  setSuccess(`Product "${formData.name}" created successfully!`)

  // Navigate with new product id
  setTimeout(() => navigate(`/dashboard/products/add-inventory/${response.data.product._id}`), 2000)
}


      // setTimeout(() => navigate('/dashboard/products/add-inventory'), 2000)
      

    } catch (err) {
      console.error('Error submitting product:', err)
      setError(err.response?.data?.message || (isEditing ? 'Failed to update product' : 'Failed to create product'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllcategories();
    fetchAllshops();
    if (isEditing) fetchProductData();
  }, [isEditing, id, token])

  useEffect(() => {
    if(formData.category_id) fetchAllsubcategories();
  }, [formData.category_id])

  const totalImages = images.length + existingImages.length
  const progressPercentage = (totalImages / 5) * 100

  const renderSubcategoryOptions = (categories, level = 0) => {
    return categories.map(cat => (
      <React.Fragment key={cat._id}>
        <option value={cat._id} style={{ paddingLeft: `${level * 20}px` }}>{cat.name}</option>
        {cat.children && cat.children.length > 0 && renderSubcategoryOptions(cat.children, level + 1)}
      </React.Fragment>
    ));
  };

  if (fetchingData) {
    return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}><CSpinner size="lg" /></div>
  }

  return (
    <CContainer fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
          {/* Header */}
          <div>
            <h4 className="mb-0 d-flex align-items-center gap-2">
              <div className="bg-primary rounded-circle p-2"><CIcon icon={isEditing ? cilCheckCircle : cilInbox} className="text-white" size="lg" /></div>
              {isEditing ? "Edit Product" : "Add New Product"}
            </h4>
            <small className="text-muted">{isEditing ? "Update product information" : "Create a new product listing"}</small>
          </div>
      </div>
      <CForm onSubmit={handleSubmit}>
        {error && <CAlert color="danger" dismissible onClose={() => setError('')} className="d-flex align-items-center gap-2 shadow-sm mb-4"><CIcon icon={cilTrash} /><span>{error}</span></CAlert>}
        {success && <CAlert color="success" dismissible onClose={() => setSuccess('')} className="d-flex align-items-center gap-2 shadow-sm mb-4"><CIcon icon={cilCheckCircle} /><span>{success}</span></CAlert>}

        <CRow className="g-4">
          <CCol lg={7}>
            <CCard className="h-100 border-0 shadow-sm">
                <CCardHeader className="bg-gradient bg-light text-dark border-0">
                    <h6 className="mb-0 d-flex align-items-center gap-2"><CIcon icon={cilInbox} />Product Information</h6>
                </CCardHeader>
                <CCardBody className="p-4">
                  <div className="mb-4"><label className="form-label fw-semibold">Product Name</label><CFormInput type="text" name="name" placeholder="Enter product name" value={formData.name} onChange={handleChange} required autoFocus className="form-control-lg"/></div>
                  <CRow>
                    <CCol md={6} className="mb-4"><label className="form-label fw-semibold">Category</label><CFormSelect name="category_id" value={formData.category_id} onChange={handleChange} required className="form-control-lg"><option value="">Select Category</option>{categories.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}</CFormSelect></CCol>
                    <CCol md={6} className="mb-4"><label className="form-label fw-semibold">Subcategory</label><CFormSelect name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} required disabled={!formData.category_id} className="form-control-lg"><option value="">Select Subcategory</option>{renderSubcategoryOptions(subcategory)}</CFormSelect></CCol>
                  </CRow>
                  <div className="mb-4"><label className="form-label fw-semibold">Store</label><CFormSelect name="shop_id" value={formData.shop_id} onChange={handleChange} required className="form-control-lg"><option value="">Select Shop</option>{store.map(s => (<option key={s._id} value={s._id}>{s.store_name}</option>))}</CFormSelect></div>
                  <div className="mb-4"><label className="form-label fw-semibold">Description</label><CFormTextarea name="description" placeholder="Describe your product" value={formData.description} onChange={handleChange} rows={5} /></div>
                  <CRow>
                    <CCol md={6} className="mb-4"><label className="form-label fw-semibold">Price</label><CInputGroup><CInputGroupText className="bg-light">$</CInputGroupText><CFormInput type="number" name="price" placeholder="0.00" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="form-control-lg" /></CInputGroup></CCol>
                    <CCol md={6} className="mb-4"><label className="form-label fw-semibold">Stock</label><CFormInput type="number" name="stock" placeholder="Quantity" value={formData.stock} onChange={handleChange} required min="0" className="form-control-lg" /></CCol>
                  </CRow>
                </CCardBody>
            </CCard>
          </CCol>

          <CCol lg={5}>
            <CCard className="border-0 shadow-sm mb-4">
                <CCardHeader className="bg-gradient bg-light text-dark border-0 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 d-flex align-items-center gap-2"><CIcon icon={cilImage} />Product Images</h6>
                    <CBadge color={totalImages === 5 ? 'success' : 'primary'}>{totalImages}/5</CBadge>
                </CCardHeader>
                <CCardBody className="p-4">
                    <div className="mb-3"><CProgress value={progressPercentage} color={progressPercentage === 100 ? 'success' : 'info'} height={8} className="rounded-pill" /><small className="text-muted mt-1 d-block text-center">Upload up to 5 images</small></div>
                    <div className={`border-2 border-dashed rounded-4 p-4 text-center mb-4 ${dragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-light'}`} style={{ minHeight: '150px', transition: 'all 0.3s ease', cursor: totalImages >= 5 ? 'not-allowed' : 'pointer' }} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => !loading && totalImages < 5 && document.getElementById('imageInput').click()}>
                        <input id="imageInput" type="file" multiple accept="image/*" onChange={handleFileInput} disabled={totalImages >= 5} style={{ display: 'none' }} />
                        <div className="d-flex flex-column align-items-center gap-2"><div className="bg-primary bg-opacity-10 rounded-circle p-3"><CIcon icon={cilImage} size="xl" className="text-primary" /></div><p className="mb-1 fw-semibold text-dark">{totalImages >= 5 ? 'Maximum images reached' : 'Drop or click to upload'}</p><small className="text-muted">JPG, PNG, WebP</small></div>
                    </div>
                    {totalImages > 0 && (<div className="row g-2">{existingImages.map((img, index) => (<div key={`existing-${index}`} className="col-4"><div className="position-relative"><CImage src={`http://localhost:5000/uploads/${img}`} alt={`Img ${index + 1}`} className="w-100 rounded-3 shadow-sm" style={{ height: '80px', objectFit: 'cover' }} /><CButton color="danger" size="sm" className="position-absolute top-0 end-0 m-1 rounded-circle p-0" onClick={() => removeImage(index, true)} style={{ width: '24px', height: '24px' }}>×</CButton><CBadge color="success" className="position-absolute bottom-0 start-0 m-1" style={{ fontSize: '8px' }}>Saved</CBadge></div></div>))}{previewImages.map((preview, index) => (<div key={`preview-${index}`} className="col-4"><div className="position-relative"><CImage src={preview} alt={`Preview ${index + 1}`} className="w-100 rounded-3 shadow-sm" style={{ height: '80px', objectFit: 'cover' }} /><CButton color="danger" size="sm" className="position-absolute top-0 end-0 m-1 rounded-circle p-0" onClick={() => removeImage(index)} style={{ width: '24px', height: '24px' }}>×</CButton><CBadge color="warning" className="position-absolute bottom-0 start-0 m-1" style={{ fontSize: '8px' }}>New</CBadge></div></div>))}</div>)}
                </CCardBody>
            </CCard>
            
            <CCard className="border-0 shadow-sm">
                <CCardHeader className="bg-gradient bg-light text-dark border-0">
                    <h6 className="mb-0">Variations</h6>
                </CCardHeader>
                <CCardBody className="p-4">
                    <CFormCheck id="hasVariationsCheck" label="This product has variations" checked={hasVariations}
                    //  onChange={(e) => setHasVariations(e.target.checked)}

                      onChange={async (e) => {
          const checked = e.target.checked;
          setHasVariations(checked);

          if (checked) {
            await fetchVariants();
          }
        }}
                    
      />{hasVariations && (
  <div className="mt-4">
{variants.length > 0 && (
  <>
    <div className="mb-4">
      <label className="form-label fw-semibold">SKU</label>
      <CFormInput
        type="text"
        name="sku"
        placeholder="sku"
        value={sku}
        onChange={(e)=>setSku(e.target.value)}
        required
        autoFocus
        className="form-control-lg"
      />
    </div>

    <div className="mb-4">
      <label className="form-label fw-semibold">variant name</label>
      <CFormInput
        type="text"
        name="variant_name"
        placeholder="variant name"
        value={variant_name}
        onChange={(e)=>setVariant_name(e.target.value)}
        required
        autoFocus
        className="form-control-lg"
      />
    </div>
  </>
)}



    {variants.length > 0 ? (
      
      variants.map((attribute) => (
        <div className="mb-4" key={attribute._id}>

          <label className="form-label fw-semibold">
            {attribute.display_name}
          </label>
          <div className="p-3 border rounded bg-light">
            <div className="d-flex flex-wrap gap-3">
              {attribute.attributeValues.map((val) => (
                <CFormCheck
                  key={val._id}
                  type="checkbox"
                  id={`check-${attribute._id}-${val._id}`}
                  value={val._id}
                  label={val.value}
                 checked={
                  selectedVariations.some(
                  (item) => item.attribute_id === attribute._id && item.value_id === val._id
                  )
                }
                  onChange={(e) =>
                    handleCheckboxChange(attribute._id, val._id, e.target.checked)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-muted">
        No variations found for the selected category.
      </div>
    )}
  </div>
)}


                </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <div className="mt-4 d-flex gap-3 justify-content-end">
          <CButton type="button" color="secondary" onClick={() => navigate('/products')} size="lg" className="px-5">Cancel</CButton>
          <CButton type="submit" color="primary" disabled={loading} size="lg" className="px-5 fw-semibold">
            {loading ? (<><CSpinner size="sm" /><span>{isEditing ? " Saving..." : " Creating..."}</span></>) : (<><CIcon icon={isEditing ? cilCheckCircle : cilInbox} /><span>{isEditing ? " Save Changes" : "Next"}</span></>)}
          </CButton>
        </div>
      </CForm>
    </CContainer>
  )
}

export default AddProductPage