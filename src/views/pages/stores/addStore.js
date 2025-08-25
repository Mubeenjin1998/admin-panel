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
  CRow,
  CAlert,
  CSpinner,
  CImage,
  CBadge,
  CProgress,
  CFormSelect,
  CFormCheck,
} from '@coreui/react'
import { cilInbox, cilDescription, cilLocationPin, cilClock, cilUser, cilPhone, cilGlobeAlt, cilImage, cilTrash, cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useAuth } from '../../../hooks/useAuth'
import CommonModal from '../../../components/CommonModal'

const AddStores = ({ visible, onClose, fetchStores, data }) => {
  const { token } = useAuth()
  
  const [formData, setFormData] = useState({
    store_name: data?.store_name || '',
    store_description: data?.store_description || '',
    owner: {
      name: data?.owner?.name || '',
      email: data?.owner?.email || ''
    },
    contact: {
      email: data?.contact?.email || '',
      phone: {
        country_code: data?.contact?.phone?.country_code || '+91',
        number: data?.contact?.phone?.number || ''
      },
      social_media: {
        facebook: data?.contact?.social_media?.facebook || '',
        instagram: data?.contact?.social_media?.instagram || '',
        twitter: data?.contact?.social_media?.twitter || ''
      }
    },
    location: {
      type: 'Point',
      coordinates: data?.location?.coordinates || [72.8777, 19.0760],
      address: {
        city: data?.location?.address?.city || '',
        state: data?.location?.address?.state || '',
        country: data?.location?.address?.country || 'India',
        postal_code: data?.location?.address?.postal_code || ''
      }
    },
    business_hours: data?.business_hours || {
      monday: { open: "09:00", close: "22:00", closed: false },
      tuesday: { open: "09:00", close: "22:00", closed: false },
      wednesday: { open: "09:00", close: "22:00", closed: false },
      thursday: { open: "09:00", close: "22:00", closed: false },
      friday: { open: "09:00", close: "23:00", closed: false },
      saturday: { open: "10:00", close: "23:00", closed: false },
      sunday: { open: "10:00", close: "21:00", closed: false }
    },
    status: data?.status || 'active',
    is_verified: data?.is_verified || false,
    features: data?.features || [],
  })
  
  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [existingImages, setExistingImages] = useState(data?.images_url || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const storeFeatures = [
    'wifi', 'parking', 'wheelchair_accessible', 'delivery', 'takeout', 
    'credit_cards', 'outdoor_seating', 'air_conditioning', 'pet_friendly'
  ]

  useEffect(() => {
    if (data) {
      setFormData({
        store_name: data.store_name || '',
        store_description: data.store_description || '',
        owner: {
          name: data.owner?.name || '',
          email: data.owner?.email || ''
        },
        contact: {
          email: data.contact?.email || '',
          phone: {
            country_code: data.contact?.phone?.country_code || '+91',
            number: data.contact?.phone?.number || ''
          },
          social_media: {
            facebook: data.contact?.social_media?.facebook || '',
            instagram: data.contact?.social_media?.instagram || '',
            twitter: data.contact?.social_media?.twitter || ''
          }
        },
        location: {
          type: 'Point',
          coordinates: data.location?.coordinates || [72.8777, 19.0760],
          address: {
            city: data.location?.address?.city || '',
            state: data.location?.address?.state || '',
            country: data.location?.address?.country || 'India',
            postal_code: data.location?.address?.postal_code || ''
          }
        },
        business_hours: data.business_hours || {
          monday: { open: "09:00", close: "22:00", closed: false },
          tuesday: { open: "09:00", close: "22:00", closed: false },
          wednesday: { open: "09:00", close: "22:00", closed: false },
          thursday: { open: "09:00", close: "22:00", closed: false },
          friday: { open: "09:00", close: "23:00", closed: false },
          saturday: { open: "10:00", close: "23:00", closed: false },
          sunday: { open: "10:00", close: "21:00", closed: false }
        },
        status: data.status || 'active',
        is_verified: data.is_verified || false,
        features: data.features || [],
      })
      setExistingImages(data.images_url || [])
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child, subchild] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: subchild ? {
            ...prev[parent][child],
            [subchild]: value
          } : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    setError('')
  }

  const handleNestedChange = (path, value) => {
    const keys = path.split('.')
    setFormData(prev => {
      const newData = { ...prev }
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const handleBusinessHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      business_hours: {
        ...prev.business_hours,
        [day]: {
          ...prev.business_hours[day],
          [field]: value
        }
      }
    }))
  }

  const handleFeatureChange = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
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

  const handleFileInput = (e) => {
    handleImageChange(e.target.files)
  }

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
    if (!formData.store_name.trim()) {
      setError('Store name is required')
      return false
    }
    if (!formData.store_description.trim()) {
      setError('Store description is required')
      return false
    }
    if (!formData.owner.name.trim()) {
      setError('Owner name is required')
      return false
    }
    if (!formData.owner.email.trim()) {
      setError('Owner email is required')
      return false
    }
    if (!formData.contact.email.trim()) {
      setError('Contact email is required')
      return false
    }
    if (!formData.contact.phone.number.trim()) {
      setError('Contact phone number is required')
      return false
    }
    if (!formData.location.address.city.trim()) {
      setError('City is required')
      return false
    }
    if (!formData.location.address.postal_code.trim()) {
      setError('Postal code is required')
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
      
      // Append all form data
      formDataToSend.append('store_name', formData.store_name)
      formDataToSend.append('store_description', formData.store_description)
      formDataToSend.append('owner', JSON.stringify(formData.owner))
      formDataToSend.append('contact', JSON.stringify(formData.contact))
      formDataToSend.append('location', JSON.stringify(formData.location))
      formDataToSend.append('business_hours', JSON.stringify(formData.business_hours))
      formDataToSend.append('status', formData.status)
      formDataToSend.append('is_verified', formData.is_verified)
      formDataToSend.append('features', JSON.stringify(formData.features))
      
      images.forEach(image => {
        formDataToSend.append('images', image)
      })

      let response
      
      if (data?._id) {
        response = await axios.put(
          `http://localhost:5000/api/admin/master/store/${data._id}`,
          formDataToSend,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        setSuccess(`Store "${formData.store_name}" updated successfully!`)
      } else {
        response = await axios.post(
          'http://localhost:5000/api/admin/master/store',
          formDataToSend,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        setSuccess(`Store "${formData.store_name}" created successfully!`)
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      
      await fetchStores()
      
      setFormData({
        store_name: '',
        store_description: '',
        owner: { name: '', email: '' },
        contact: { 
          email: '', 
          phone: { country_code: '+91', number: '' },
          social_media: { facebook: '', instagram: '', twitter: '' }
        },
        location: {
          type: 'Point',
          coordinates: [72.8777, 19.0760],
          address: { city: '', state: '', country: 'India', postal_code: '' }
        },
        business_hours: {
          monday: { open: "09:00", close: "22:00", closed: false },
          tuesday: { open: "09:00", close: "22:00", closed: false },
          wednesday: { open: "09:00", close: "22:00", closed: false },
          thursday: { open: "09:00", close: "22:00", closed: false },
          friday: { open: "09:00", close: "23:00", closed: false },
          saturday: { open: "10:00", close: "23:00", closed: false },
          sunday: { open: "10:00", close: "21:00", closed: false }
        },
        status: 'active',
        is_verified: false,
        features: [],
      })
      setImages([])
      setPreviewImages([])
      setExistingImages([])
      
      onClose()
      
    } catch (err) {
      console.error('Error submitting store:', err)
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError(data?._id ? 'Failed to update store' : 'Failed to create store')
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
            <h5 className="mb-0">{data?._id ? "Edit Store" : "Add New Store"}</h5>
            <small className="text-muted">
              {data?._id ? "Update store information" : "Create a new store listing"}
            </small>
          </div>
        </div>
      }
      onClose={onClose}
      size="xl"
    >
      <CForm onSubmit={handleSubmit}>
        <CContainer fluid>
          {error && (
            <CAlert 
              color="danger" 
              dismissible 
              onClose={() => setError('')}
              className="d-flex align-items-center gap-2 border-0 shadow-sm mb-4"
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
              className="d-flex align-items-center gap-2 border-0 shadow-sm mb-4"
            >
              <CIcon icon={cilCheckCircle} />
              <span>{success}</span>
            </CAlert>
          )}

          {/* Basic Information */}
          <CCard className="mb-4 border-0 shadow-sm">
            <CCardHeader className="bg-light border-0">
              <div className="d-flex align-items-center gap-2">
                <CIcon icon={cilInbox} className="text-primary" />
                <h6 className="mb-0">Basic Information</h6>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    label="Store Name *"
                    name="store_name"
                    value={formData.store_name}
                    onChange={handleChange}
                    placeholder="Enter store name"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormTextarea
                    label="Store Description *"
                    name="store_description"
                    value={formData.store_description}
                    onChange={handleChange}
                    placeholder="Enter store description"
                    rows={4}
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={12}>
                  <CFormCheck
                    id="is_verified"
                    label="Verified Store"
                    checked={formData.is_verified}
                    onChange={(e) => handleNestedChange('is_verified', e.target.checked)}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          {/* Owner Information */}
          <CCard className="mb-4 border-0 shadow-sm">
            <CCardHeader className="bg-light border-0">
              <div className="d-flex align-items-center gap-2">
                <CIcon icon={cilUser} className="text-primary" />
                <h6 className="mb-0">Owner Information</h6>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <CFormInput
                    label="Owner Name *"
                    name="owner.name"
                    value={formData.owner.name}
                    onChange={handleChange}
                    placeholder="Enter owner name"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Owner Email *"
                    type="email"
                    name="owner.email"
                    value={formData.owner.email}
                    onChange={handleChange}
                    placeholder="Enter owner email"
                    required
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          {/* Contact Information */}
          <CCard className="mb-4 border-0 shadow-sm">
            <CCardHeader className="bg-light border-0">
              <div className="d-flex align-items-center gap-2">
                <CIcon icon={cilPhone} className="text-primary" />
                <h6 className="mb-0">Contact Information</h6>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    label="Contact Email *"
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleChange}
                    placeholder="Enter contact email"
                    required
                  />
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    label="Country Code *"
                    name="contact.phone.country_code"
                    value={formData.contact.phone.country_code}
                    onChange={handleChange}
                    placeholder="+91"
                    required
                  />
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    label="Phone Number *"
                    name="contact.phone.number"
                    value={formData.contact.phone.number}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={4}>
                  <CFormInput
                    label="Facebook"
                    name="contact.social_media.facebook"
                    value={formData.contact.social_media.facebook}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormInput
                    label="Instagram"
                    name="contact.social_media.instagram"
                    value={formData.contact.social_media.instagram}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormInput
                    label="Twitter"
                    name="contact.social_media.twitter"
                    value={formData.contact.social_media.twitter}
                    onChange={handleChange}
                    placeholder="Twitter URL"
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          {/* Location Information */}
          <CCard className="mb-4 border-0 shadow-sm">
            <CCardHeader className="bg-light border-0">
              <div className="d-flex align-items-center gap-2">
                <CIcon icon={cilLocationPin} className="text-primary" />
                <h6 className="mb-0">Location Information</h6>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    label="City *"
                    name="location.address.city"
                    value={formData.location.address.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="State"
                    name="location.address.state"
                    value={formData.location.address.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    label="Country"
                    name="location.address.country"
                    value={formData.location.address.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Postal Code *"
                    name="location.address.postal_code"
                    value={formData.location.address.postal_code}
                    onChange={handleChange}
                    placeholder="Enter postal code"
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6}>
                  <CFormInput
                    label="Latitude"
                    type="number"
                    step="any"
                    value={formData.location.coordinates[1]}
                    onChange={(e) => handleNestedChange('location.coordinates', [formData.location.coordinates[0], parseFloat(e.target.value) || 0])}
                    placeholder="Enter latitude"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    label="Longitude"
                    type="number"
                    step="any"
                    value={formData.location.coordinates[0]}
                    onChange={(e) => handleNestedChange('location.coordinates', [parseFloat(e.target.value) || 0, formData.location.coordinates[1]])}
                    placeholder="Enter longitude"
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          {/* Business Hours */}
          <CCard className="mb-4 border-0 shadow-sm">
            <CCardHeader className="bg-light border-0">
              <div className="d-flex align-items-center gap-2">
                <CIcon icon={cilClock} className="text-primary" />
                <h6 className="mb-0">Business Hours</h6>
              </div>
            </CCardHeader>
            <CCardBody>
              {dayNames.map(day => (
                <CRow key={day} className="mb-3 align-items-center">
                  <CCol md={2}>
                    <label className="form-label text-capitalize fw-bold">{day}</label>
                  </CCol>
                  <CCol md={2}>
                    <CFormCheck
                      label="Closed"
                      checked={formData.business_hours[day]?.closed || false}
                      onChange={(e) => handleBusinessHoursChange(day, 'closed', e.target.checked)}
                    />
                  </CCol>
                  <CCol md={3}>
                    <CFormInput
                      type="time"
                      label="Open Time"
                      value={formData.business_hours[day]?.open || '09:00'}
                      onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                      disabled={formData.business_hours[day]?.closed}
                    />
                  </CCol>
                  <CCol md={3}>
                    <CFormInput
                      type="time"
                      label="Close Time"
                      value={formData.business_hours[day]?.close || '22:00'}
                      onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                      disabled={formData.business_hours[day]?.closed}
                    />
                  </CCol>
                </CRow>
              ))}
            </CCardBody>
          </CCard>

          {/* Features */}
          <CCard className="mb-4 border-0 shadow-sm">
            <CCardHeader className="bg-light border-0">
              <div className="d-flex align-items-center gap-2">
                <CIcon icon={cilDescription} className="text-primary" />
                <h6 className="mb-0">Store Features</h6>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {storeFeatures.map(feature => (
                  <CCol md={4} key={feature} className="mb-2">
                    <CFormCheck
                      id={feature}
                      label={feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureChange(feature)}
                    />
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>

          {/* Image Upload */}
          <CCard className="mb-4 border-0 shadow-sm">
            <CCardHeader className="bg-light border-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <CIcon icon={cilImage} className="text-primary" />
                  <h6 className="mb-0">Store Images</h6>
                </div>
                <CBadge color="info">{totalImages}/5</CBadge>
              </div>
            </CCardHeader>
            <CCardBody>
              <CProgress 
                value={progressPercentage} 
                className="mb-3"
                color={progressPercentage === 100 ? "success" : "primary"}
              />
              
              <div
                className={`border-2 border-dashed rounded p-4 text-center mb-3 ${
                  dragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <CIcon icon={cilImage} size="xl" className="text-muted mb-2" />
                <p className="mb-2">Drag and drop images here, or click to select</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="d-none"
                  id="imageUpload"
                />
                <CButton
                  color="outline-primary"
                  onClick={() => document.getElementById('imageUpload').click()}
                  disabled={totalImages >= 5}
                >
                  Select Images
                </CButton>
                <small className="text-muted d-block mt-2">Maximum 5 images allowed</small>
              </div>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-3">
                  <h6>Existing Images:</h6>
                  <CRow>
                    {existingImages.map((image, index) => (
                      <CCol md={3} key={`existing-${index}`} className="mb-3">
                        <div className="position-relative">
                          <CImage
                            src={image}
                            alt={`Existing ${index + 1}`}
                            className="w-100 rounded"
                            style={{ height: '120px', objectFit: 'cover' }}
                          />
                          <CButton
                            color="danger"
                            size="sm"
                            className="position-absolute top-0 end-0 m-1"
                            onClick={() => removeImage(index, false)}
                          >
                            <CIcon icon={cilTrash} size="sm" />
                          </CButton>
                        </div>
                      </CCol>
                    ))}
                  </CRow>
                </div>
              )}
            </CCardBody>
          </CCard>

          {/* Form Actions */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <CButton 
              color="secondary" 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </CButton>
            <CButton 
              type="submit" 
              color="primary"
              disabled={loading}
              className="d-flex align-items-center gap-2"
            >
              {loading && <CSpinner size="sm" />}
              {loading ? 'Processing...' : (data?._id ? 'Update Store' : 'Create Store')}
            </CButton>
          </div>
        </CContainer>
      </CForm>
    </CommonModal>
  )
}

export default AddStores;

  
     