import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAlert,
  CSpinner,
  CBadge,
  
  
} from '@coreui/react'
import { cilPlus, cilTrash, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import AddUser from './addProduct'
import { useAuth } from '../../../hooks/useAuth'
import CommonModal from '../../../components/CommonModal'
import Pagination from '../../../components/Pagination'

const products = () => {
  const { token } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddproduct, setshowAddproduct] = useState(false)
  const [productdata, setProductdata] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(1)   
  const [totalPages, setTotalPages] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (token) {
      fetchProducts()
    }
  }, [token,page,debouncedSearch])

  useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(search);
    setPage(1); 
  }, 500); 

  return () => clearTimeout(handler);
}, [search]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/products?page=${page}&search=${encodeURIComponent(debouncedSearch)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setProducts(response.data.products)
      setTotalPages(response.data.totalPages)
      setPage(response.data.page)  
      
    } catch (err) {
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }


  // const handleDeleteUser = async (userId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/admin/products/${userId}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     fetchProducts()
  //   } catch (err) {
  //     setError('Failed to delete user')
  //   }
  // }

  const getsingleProductdetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/products/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProductdata(response.data.product);
      setshowAddproduct(true);
    } catch (err) {
      setError('Failed to fetch user data');
    }
  }

  const getBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'danger'
      case 'user':
        return 'primary'
      default:
        return 'secondary'
    }
  }


//   if (loading) {
//     setTimeout(() => {
//           return (
//       <div className="text-center">
//         <CSpinner />
//       </div>
//     ) 
//     },5000)

//   }else{
//     setLoading(false)
//   }
const handleSelectProducts = (userId) => {
  setSelectedProducts((prev) =>
    prev.includes(userId)
      ? prev.filter((id) => id !== userId)
      : [...prev, userId]
  );
};

const handleSelectAll = () => {
  if (selectedProducts.length === products.length) {
    setSelectedProducts([]);
  } else {
    setSelectedProducts(products.map((product) => product._id));
  }
};
  return (
    <>
<div className="mb-3 d-flex justify-content-between align-items-center" style={{ gap: 8 }}>
  <div className="d-flex align-items-center" style={{ gap: 8 }}>
    <input
      type="text"
      className="form-control w-auto"
      placeholder="Search by username or email"
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{ minWidth: 250 }}
    />

  </div>
  <CButton
    color="primary"
    onClick={() => {
      setuserdata({})
      setshowAddproduct(true)
    }}
  >
    <CIcon icon={cilPlus} className="me-2" />
    Add New Product
  </CButton>
</div>


      {showAddproduct && (
        <AddUser
          visible={showAddproduct}
          onClose={() => setshowAddproduct(false)}
          fetchProducts={fetchProducts}
          data={productdata}
        />
      )}

      <CommonModal
        visible={showDeleteModal}
        title="Confirm Delete"
        onClose={() => setShowDeleteModal(false)}
        footer={
          <>
            <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </CButton>
            <CButton
              color="danger"
              onClick={async () => {
                await handleDeleteUser(deleteUserId)
                setShowDeleteModal(false)
              }}
            >
              Delete
            </CButton>
          </>
        }
      >
        <p>Are you sure you want to delete this user?</p>
      </CommonModal>

      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol className='text-end'>
                  <strong>Product Management</strong>
                </CCol>
                <CCol className="text-end">
                  
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {error && (
                <CAlert color="danger" dismissible onClose={() => setError('')}>
                  {error}
                </CAlert>
              )}

              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>
                        <input
                         type="checkbox" 
                         cheked={selectedProducts.length === products.length && products.length > 0}
                         onChange={handleSelectAll}
                         ></input>
                    </CTableHeaderCell>

                    <CTableHeaderCell>name</CTableHeaderCell>
                    <CTableHeaderCell>Stock</CTableHeaderCell>
                    <CTableHeaderCell>Price</CTableHeaderCell>
                    <CTableHeaderCell>Image</CTableHeaderCell>
                    <CTableHeaderCell>Created At</CTableHeaderCell>

                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {products.map((product) => (
                    console.log(product.imageUrl[0]),
                    <CTableRow key={product._id}>
                         <CTableDataCell>
                        <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleSelectProducts(product._id)}
                            />
                        </CTableDataCell>
                      <CTableDataCell>{product.name}</CTableDataCell>
                      <CTableDataCell>{product.stock}</CTableDataCell>
                      <CTableDataCell>
                          {product.price}
                      </CTableDataCell>
                       <CTableDataCell>
                       <CTableDataCell>
                      <img 
                      src={product.imageUrl[0]} 
                      alt={product.name} 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                     </CTableDataCell>

                      </CTableDataCell>
                      <CTableDataCell>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setDeleteUserId(user._id)
                            setShowDeleteModal(true)
                          }}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                        <CButton
                          color="warning"
                          size="sm"
                          onClick={() => getsingleProductdetails(product._id)}
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              {products.length === 0 && !loading && (
                <div className="text-center mt-4">
                  <p>No products found</p>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
       <div className="d-flex justify-content-center my-4">
  <Pagination
    currentPage={page}
    totalPages={totalPages}
    onPageChange={setPage}
  />
</div>
        
    </>
  )
}

export default products
