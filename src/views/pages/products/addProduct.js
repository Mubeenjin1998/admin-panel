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
// } from '@coreui/react'
// // import {  cilDollar, cilDescription, cilBox } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import axios from 'axios'
// import { useAuth } from '../../../hooks/useAuth'
// import CommonModal from '../../../components/CommonModal'

// const AddProduct = ({ visible, onClose, fetchProducts, data }) => {
//   const { token } = useAuth()
  
//   const [formData, setFormData] = useState({
//     name: data?.name || '',
//     description: data?.description || '',
//     price: data?.price || '',
//     stock: data?.stock || '',
//   })
//   const [images, setImages] = useState([])
//   const [previewImages, setPreviewImages] = useState([])
//   const [existingImages, setExistingImages] = useState(data?.imageUrl || [])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   useEffect(() => {
//     if (data) {
//       setFormData({
//         name: data.name || '',
//         description: data.description || '',
//         price: data.price || '',
//         stock: data.stock || '',
//       })
//       setExistingImages(data.imageUrl || [])
//     }
//   }, [data])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//     setError('')
//   }

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files)
//     if (files.length + images.length + existingImages.length > 5) {
//       setError('Maximum 5 images allowed')
//       return
//     }
    
//     setImages(prev => [...prev, ...files])
    
//     // Create preview URLs
//     const previewUrls = files.map(file => URL.createObjectURL(file))
//     setPreviewImages(prev => [...prev, ...previewUrls])
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
//     let response

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
//       images.forEach(image => {
//         formDataToSend.append('images', image)
//       })

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
      
//       await fetchProducts()
//       onClose()
      
//       setFormData({
//         name: '',
//         description: '',
//         price: '',
//         stock: '',
//       })
//       setImages([])
//       setPreviewImages([])
//       setExistingImages([])

//     } catch (err) {
//       if (err.response?.data?.message) {
//         setError(err.response.data.message)
//       } else {
//         setError(data?._id ? 'Failed to update product' : 'Failed to create product')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <CommonModal
//       visible={visible}
//       title={data?._id ? "Edit Product" : "Add New Product"}
//       onClose={onClose}
//     >
//       <CForm onSubmit={handleSubmit}>
//         <CRow>
//           <CCol md={12}>
//             {error && (
//               <CAlert color="danger" dismissible onClose={() => setError('')}>
//                 {error}
//               </CAlert>
//             )}
//             {success && (
//               <CAlert color="success" dismissible onClose={() => setSuccess('')}>
//                 {success}
//               </CAlert>
//             )}

//             <CInputGroup className="mb-3">
//               <CInputGroupText>
//                 {/* <CIcon icon={cilBox} /> */}
//               </CInputGroupText>
//               <CFormInput
//                 type="text"
//                 name="name"
//                 placeholder="Product Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 autoFocus
//               />
//             </CInputGroup>

//             <CInputGroup className="mb-3">
//               <CInputGroupText>
//                 {/* <CIcon icon={cilDescription} /> */}
//               </CInputGroupText>
//               <CFormTextarea
//                 name="description"
//                 placeholder="Product Description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={3}
//               />
//             </CInputGroup>

//             <CInputGroup className="mb-3">
//               <CInputGroupText>
//                 {/* <CIcon icon={cilDollar} /> */}
//               </CInputGroupText>
//               <CFormInput
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//                 min="0"
//                 step="0.01"
//               />
//             </CInputGroup>

//             <CInputGroup className="mb-3">
//               <CInputGroupText>
//                 {/* <CIcon icon={cilBox} /> */}
//               </CInputGroupText>
//               <CFormInput
//                 type="number"
//                 name="stock"
//                 placeholder="Stock Quantity"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 required
//                 min="0"
//               />
//             </CInputGroup>

//             {/* Image Upload Section */}
//             <div className="mb-3">
//               <label className="form-label">Product Images</label>
//               <CFormInput
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 disabled={images.length + existingImages.length >= 5}
//               />
//               <small className="text-muted">
//                 You can upload up to 5 images. Current: {images.length + existingImages.length}/5
//               </small>
//             </div>

//             {/* Image Previews */}
//             <div className="mb-3">
//               <div className="d-flex flex-wrap gap-2">
//                 {/* Existing Images */}
//                 {existingImages.map((img, index) => (
//                   <div key={`existing-${index}`} className="position-relative">
//                     <CImage
//                       src={`http://localhost:5000/uploads/${img}`}
//                       alt={`Existing ${index + 1}`}
//                       width={100}
//                       height={100}
//                       className="rounded"
//                       style={{ objectFit: 'cover' }}
//                     />
//                     <button
//                       type="button"
//                       className="btn-close position-absolute top-0 end-0"
//                       onClick={() => removeImage(index, true)}
//                     />
//                   </div>
//                 ))}
                
//                 {/* New Image Previews */}
//                 {previewImages.map((preview, index) => (
//                   <div key={`preview-${index}`} className="position-relative">
//                     <CImage
//                       src={preview}
//                       alt={`Preview ${index + 1}`}
//                       width={100}
//                       height={100}
//                       className="rounded"
//                       style={{ objectFit: 'cover' }}
//                     />
//                     <button
//                       type="button"
//                       className="btn-close position-absolute top-0 end-0"
//                       onClick={() => removeImage(index)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="d-grid gap-2">
//               <CButton
//                 type="submit"
//                 color="primary"
//                 disabled={loading}
//                 size="lg"
//               >
//                 {loading ? (
//                   <>
//                     <CSpinner size="sm" className="me-2" />
//                     {data?._id ? "Saving..." : "Creating Product..."}
//                   </>
//                 ) : (
//                   data?._id ? "Save Changes" : "Add Product"
//                 )}
//               </CButton>
//             </div>
//           </CCol>
//         </CRow>
//       </CForm>
//     </CommonModal>
//   )
// }

// export default AddProduct
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
} from '@coreui/react'
import { cilInbox, cilDescription, cilDollar, cilGrid, cilImage, cilTrash, cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useAuth } from '../../../hooks/useAuth'
import CommonModal from '../../../components/CommonModal'

const AddProduct = ({ visible, onClose, fetchProducts, data }) => {
  console.log(fetchProducts)
  const { token } = useAuth()
  
  const [formData, setFormData] = useState({
    name: data?.name || '',
    description: data?.description || '',
    price: data?.price || '',
    stock: data?.stock || '',
  })
  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [existingImages, setExistingImages] = useState(data?.imageUrl || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        description: data.description || '',
        price: data.price || '',
        stock: data.stock || '',
      })
      setExistingImages(data.imageUrl || [])
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleImageChange = (files) => {
    const fileArray = Array.from(files)
    if (fileArray.length + images.length + existingImages.length > 5) {
      setError('Maximum 5 images allowed')
      return
    }
    
    setImages(prev => [...prev, ...fileArray])
    
    // Create preview URLs
    const previewUrls = fileArray.map(file => URL.createObjectURL(file))
    setPreviewImages(prev => [...prev, ...previewUrls])
  }

  const handleFileInput = (e) => {
    handleImageChange(e.target.files)
  }

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files)
    }
  }

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages(prev => prev.filter((_, i) => i !== index))
    } else {
      setImages(prev => prev.filter((_, i) => i !== index))
      setPreviewImages(prev => prev.filter((_, i) => i !== index))
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Product name is required')
      return false
    }
    if (!formData.price || formData.price <= 0) {
      setError('Valid price is required')
      return false
    }
    if (!formData.stock || formData.stock < 0) {
      setError('Valid stock quantity is required')
      return false
    }
    if (!data?._id && images.length === 0) {
      setError('At least one image is required for new products')
      return false
    }
    return true
  }

 const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!validateForm()) {
    return
  }

  setLoading(true)
  setError('')
  setSuccess('')

  try {
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('price', formData.price)
    formDataToSend.append('stock', formData.stock)
    
    images.forEach(image => {
      formDataToSend.append('images', image)
    })

    let response
    
    if (data?._id) {
      // Update existing product
      response = await axios.put(
        `http://localhost:5000/api/admin/products/${data._id}`,
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      setSuccess(`Product "${formData.name}" updated successfully!`)
    } else {
      // Create new product
      response = await axios.post(
        'http://localhost:5000/api/admin/products',
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      setSuccess(`Product "${formData.name}" created successfully!`)
    }

    // Wait a moment for the success message to be visible
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Refresh the products list
    await fetchProducts()
    
    // Reset form data
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
    })
    setImages([])
    setPreviewImages([])
    setExistingImages([])
    
    // Close modal after successful operation
    onClose()
    
  } catch (err) {
    console.error('Error submitting product:', err)
    console.error('Error submitting product:', err)
    if (err.response?.data?.message) {
      setError(err.response.data.message)
    } else {
      setError(data?._id ? 'Failed to update product' : 'Failed to create product')
    }
  } finally {
    setLoading(false)
  }
}

  const totalImages = images.length + existingImages.length
  const progressPercentage = (totalImages / 5) * 100

  return (
    <CommonModal
      visible={visible}
      title={
        <div className="d-flex align-items-center gap-2">
          <div className="bg-primary rounded-circle p-2">
            <CIcon icon={data?._id ? cilCheckCircle : cilInbox} className="text-white" size="lg" />
          </div>
          <div>
            <h5 className="mb-0">{data?._id ? "Edit Product" : "Add New Product"}</h5>
            <small className="text-muted">
              {data?._id ? "Update product information" : "Create a new product listing"}
            </small>
          </div>
        </div>
      }
      onClose={onClose}
      size="lg"
    >
      <CForm onSubmit={handleSubmit}>
        <CContainer fluid>
          {error && (
            <CAlert 
              color="danger" 
              dismissible 
              onClose={() => setError('')}
              className="d-flex align-items-center gap-2 border-0 shadow-sm"
            >
              <CIcon icon={cilTrash} />
              <span>{error}</span>
            </CAlert>
          )}
          {success && (
            <CAlert 
              color="success" 
              dismissible 
              onClose={() => setSuccess('')}
              className="d-flex align-items-center gap-2 border-0 shadow-sm"
            >
              <CIcon icon={cilCheckCircle} />
              <span>{success}</span>
            </CAlert>
          )}

          <CRow className="g-4">
            {/* Product Information Section */}
            <CCol lg={6}>
              <CCard className="h-100 border-0 shadow-sm">
                <CCardHeader className="bg-gradient bg-primary text-white border-0">
                  <h6 className="mb-0 d-flex align-items-center gap-2">
                    <CIcon icon={cilInbox} />
                    Product Information
                  </h6>
                </CCardHeader>
                <CCardBody className="p-4">
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark mb-2">
                      <CIcon icon={cilInbox} className="me-2 text-primary" />
                      Product Name
                    </label>
                    <CFormInput
                      type="text"
                      name="name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoFocus
                      className="form-control-lg border-2 rounded-3"
                      style={{
                        borderColor: '#e3f2fd',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark mb-2">
                      <CIcon icon={cilDescription} className="me-2 text-primary" />
                      Description
                    </label>
                    <CFormTextarea
                      name="description"
                      placeholder="Describe your product features and benefits"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="border-2 rounded-3"
                      style={{
                        borderColor: '#e3f2fd',
                        transition: 'all 0.3s ease',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-4">
                        <label className="form-label fw-semibold text-dark mb-2">
                          <CIcon icon={cilDollar} className="me-2 text-success" />
                          Price
                        </label>
                        <CInputGroup>
                          <CInputGroupText className="bg-success text-white border-success">
                            $
                          </CInputGroupText>
                          <CFormInput
                            type="number"
                            name="price"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="form-control-lg border-2"
                            style={{ borderColor: '#e8f5e8' }}
                          />
                        </CInputGroup>
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-4">
                        <label className="form-label fw-semibold text-dark mb-2">
                          <CIcon icon={cilGrid} className="me-2 text-info" />
                          Stock
                        </label>
                        <CFormInput
                          type="number"
                          name="stock"
                          placeholder="Quantity"
                          value={formData.stock}
                          onChange={handleChange}
                          required
                          min="0"
                          className="form-control-lg border-2 rounded-3"
                          style={{ borderColor: '#e3f2fd' }}
                        />
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>

            {/* Image Upload Section */}
            <CCol lg={6}>
              <CCard className="h-100 border-0 shadow-sm">
                <CCardHeader className="bg-gradient bg-info text-white border-0 d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 d-flex align-items-center gap-2">
                    <CIcon icon={cilImage} />
                    Product Images
                  </h6>
                  <CBadge color={totalImages === 0 ? 'light' : totalImages === 5 ? 'success' : 'primary'}>
                    {totalImages}/5
                  </CBadge>
                </CCardHeader>
                <CCardBody className="p-4">
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <CProgress 
                      value={progressPercentage} 
                      color={progressPercentage === 100 ? 'success' : 'info'}
                      height={8}
                      className="rounded-pill"
                    />
                    <small className="text-muted mt-1 d-block text-center">
                      Upload up to 5 high-quality images
                    </small>
                  </div>

                  {/* Drag and Drop Area */}
                  <div
                    className={`border-2 border-dashed rounded-4 p-4 text-center mb-4 position-relative overflow-hidden ${
                      dragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-light'
                    }`}
                    style={{
                      minHeight: '120px',
                      background: dragActive 
                        ? 'linear-gradient(45deg, rgba(0,123,255,0.1), rgba(0,123,255,0.05))' 
                        : 'linear-gradient(45deg, #f8f9fa, #ffffff)',
                      transition: 'all 0.3s ease',
                      cursor: totalImages >= 5 ? 'not-allowed' : 'pointer'
                    }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => !loading && totalImages < 5 && document.getElementById('imageInput').click()}
                  >
                    <input
                      id="imageInput"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileInput}
                      disabled={totalImages >= 5}
                      style={{ display: 'none' }}
                    />
                    
                    <div className="d-flex flex-column align-items-center gap-2">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                        <CIcon icon={cilImage} size="xl" className="text-primary" />
                      </div>
                      <div>
                        <p className="mb-1 fw-semibold text-dark">
                          {totalImages >= 5 ? 'Maximum images reached' : 'Drop images here or click to browse'}
                        </p>
                        <small className="text-muted">
                          JPG, PNG, WebP up to 10MB each
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {totalImages > 0 && (
                    <div className="row g-2">
                      {existingImages.map((img, index) => (
                        <div key={`existing-${index}`} className="col-4">
                          <div className="position-relative group">
                            <CImage
                              src={`http://localhost:5000/uploads/${img}`}
                              alt={`Existing ${index + 1}`}
                              className="w-100 rounded-3 shadow-sm"
                              style={{ 
                                height: '80px', 
                                objectFit: 'cover',
                                transition: 'transform 0.2s ease'
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-1"
                              onClick={() => removeImage(index, true)}
                              style={{ 
                                width: '24px', 
                                height: '24px',
                                fontSize: '10px',
                                opacity: '0.9'
                              }}
                            >
                              ×
                            </button>
                            <CBadge 
                              color="success" 
                              className="position-absolute bottom-0 start-0 m-1"
                              style={{ fontSize: '8px' }}
                            >
                              Saved
                            </CBadge>
                          </div>
                        </div>
                      ))}
                      
                      {/* New Image Previews */}
                      {previewImages.map((preview, index) => (
                        <div key={`preview-${index}`} className="col-4">
                          <div className="position-relative">
                            <CImage
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-100 rounded-3 shadow-sm"
                              style={{ 
                                height: '80px', 
                                objectFit: 'cover',
                                transition: 'transform 0.2s ease'
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-1"
                              onClick={() => removeImage(index)}
                              style={{ 
                                width: '24px', 
                                height: '24px',
                                fontSize: '10px',
                                opacity: '0.9'
                              }}
                            >
                              ×
                            </button>
                            <CBadge 
                              color="warning" 
                              className="position-absolute bottom-0 start-0 m-1"
                              style={{ fontSize: '8px' }}
                            >
                              New
                            </CBadge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          {/* Submit Button */}
          <div className="mt-4 d-grid">
            <CButton
              type="submit"
              color="primary"
              disabled={loading}
              size="lg"
              className="py-3 rounded-3 fw-semibold shadow-sm"
              style={{
                background: loading 
                  ? 'linear-gradient(45deg, #6c757d, #adb5bd)' 
                  : 'linear-gradient(45deg, #0d6efd, #6610f2)',
                border: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <CSpinner size="sm" />
                  <span>{data?._id ? "Saving Changes..." : "Creating Product..."}</span>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <CIcon icon={data?._id ? cilCheckCircle : cilInbox} />
                  <span>{data?._id ? "Save Changes" : "Add Product"}</span>
                </div>
              )}
            </CButton>
          </div>
        </CContainer>
      </CForm>
    </CommonModal>
  )
}

export default AddProduct
