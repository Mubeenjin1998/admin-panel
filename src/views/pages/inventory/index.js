import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CAlert,
  CSpinner,
  CBadge,
} from '@coreui/react'
import { cilTrash, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useAuth } from '../../../hooks/useAuth'
import { getInventory } from '../../../api/product'

const InventoryIndex = () => {
  const { token } = useAuth()
  const [inventories, setInventories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStores: 0,
    totalStock: 0,
    availableProducts: 0,
  })

  useEffect(() => {
    if (token) {
        console.log("hjnm,m")
      fetchInventories()
    }
  }, [token])

 const fetchInventories = async () => {
    try {
      const response = await getInventory()
      const data = response.data.data || []
      setInventories(data)

      const totalProducts = new Set(data.map((item) => item.product_id._id)).size
      const totalStores = new Set(data.map((item) => item.store_id._id)).size
      const totalStock = data.reduce((acc, item) => acc + item.quantity, 0)
      const availableProducts = data.filter((item) => item.is_available).length

      setStats({ totalProducts, totalStores, totalStock, availableProducts })
    } catch (err) {
      setError('Failed to fetch inventory')
    } finally {
      setLoading(false)
    }
  }


//   if (loading) {
//     return (
//       <div className="text-center my-5">
//         <CSpinner />
//       </div>
//     )
//   }

  return (
    <div>
      {/* Dashboard Summary Boxes */}
        <CRow className="g-4 mb-4">
        <CCol xs={12} sm={6} md={3}>
          <CCard className="shadow">
            <CCardBody className="text-center">
              <h5>Total Products</h5>
              <h3>{stats.totalProducts}</h3>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} sm={6} md={3}>
          <CCard className="shadow">
            <CCardBody className="text-center">
              <h5>Available Products</h5>
              <h3>{stats.availableProducts}</h3>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="g-4 mb-4">
        <CCol xs={12} sm={6} md={3}>
          <CCard className="shadow">
            <CCardBody className="text-center">
              <h5>Total Products</h5>
              <h3>{stats.totalProducts}</h3>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} md={3}>
          <CCard className="shadow">
            <CCardBody className="text-center">
              <h5>Total Stores</h5>
              <h3>{stats.totalStores}</h3>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} md={3}>
          <CCard className="shadow">
            <CCardBody className="text-center">
              <h5>Total Stock</h5>
              <h3>{stats.totalStock}</h3>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} sm={6} md={3}>
          <CCard className="shadow">
            <CCardBody className="text-center">
              <h5>Available Products</h5>
              <h3>{stats.availableProducts}</h3>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Error Alert */}
      {error && (
        <CAlert color="danger" dismissible onClose={() => setError('')}>
          {error}
        </CAlert>
      )}

      {/* Inventory Table */}
      <CCard>
        <CCardHeader>
          <strong>Inventory Management</strong>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Product</CTableHeaderCell>
                <CTableHeaderCell>Store</CTableHeaderCell>
                <CTableHeaderCell>Location</CTableHeaderCell>
                <CTableHeaderCell>Quantity</CTableHeaderCell>
                <CTableHeaderCell>Price</CTableHeaderCell>
                <CTableHeaderCell>Discounted Price</CTableHeaderCell>
                <CTableHeaderCell>Available</CTableHeaderCell>
                <CTableHeaderCell>Created At</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {inventories.map((inv) => (
                <CTableRow key={inv._id}>
                  <CTableDataCell>{inv.product_id?.name}</CTableDataCell>
                  <CTableDataCell>{inv.store_id?.store_name}</CTableDataCell>
                  <CTableDataCell>
                    {inv.store_id?.location?.address?.city},{' '}
                    {inv.store_id?.location?.address?.state}
                  </CTableDataCell>
                  <CTableDataCell>{inv.quantity}</CTableDataCell>
                  <CTableDataCell>₹{inv.price}</CTableDataCell>
                  <CTableDataCell>₹{inv.discounted_price}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={inv.is_available ? 'success' : 'danger'}>
                      {inv.is_available ? 'Yes' : 'No'}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    {new Date(inv.created_at).toLocaleDateString()}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color="warning" size="sm" className="me-2">
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton color="danger" size="sm">
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          {inventories.length === 0 && (
            <div className="text-center mt-4">
              <p>No inventory found</p>
            </div>
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default InventoryIndex
