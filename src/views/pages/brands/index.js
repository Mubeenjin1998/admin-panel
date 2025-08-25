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
import AddUser from './Adduser'
import { useAuth } from '../../../hooks/useAuth'
import CommonModal from '../../../components/CommonModal'
import Pagination from '../../../components/Pagination'

const brands = () => {
  const { token } = useAuth()
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddUser, setShowAddUser] = useState(false)
  const [branddata, setBranddata] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [selectedbrands, setSelectedBrands] = useState([]);
  const [page, setPage] = useState(1)   
  const [totalPages, setTotalPages] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (token) {
      fetchbrands()
    }
  }, [token,page,debouncedSearch])

  useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(search);
    setPage(1); 
  }, 500); 

  return () => clearTimeout(handler);
}, [search]);

  const fetchbrands = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/brands`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setBrands(response.data.brands)
      setTotalPages(response.data.totalPages)
      setPage(response.data.page)  
      
    } catch (err) {
      setError('Failed to fetch brands')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBrand = async (brandId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/brands/${brandId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      fetchbrands()
    } catch (err) {
      setError('Failed to delete user')
    }
  }

  const getsingleBrandData = async (brandId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/brands/${brandId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setuserdata(response.data.user);
      setShowAddUser(true);
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
const handleSelectUser = (userId) => {
  setSelectedBrands((prev) =>
    prev.includes(userId)
      ? prev.filter((id) => id !== userId)
      : [...prev, userId]
  );
};

const handleSelectAll = () => {
  if (selectedbrands.length === brands.length) {
    setSelectedBrands([]);
  } else {
    setSelectedBrands
    (brands.map((user) => user._id));
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
      setShowAddUser(true)
    }}
  >
    <CIcon icon={cilPlus} className="me-2" />
    Add New User
  </CButton>

</div>
{showAddUser && (
        <AddUser
          visible={showAddUser}
          onClose={() => setShowAddUser(false)}
          fetchbrands={fetchbrands}
          data={userdata}
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
                <CCol>
                  <strong>User Management</strong>
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
                         cheked={selectedbrands.length === brands.length && brands.length > 0}
                         onChange={handleSelectAll}
                         ></input>
                    </CTableHeaderCell>

                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Created At</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {brands.map((user) => (
                    <CTableRow key={user._id}>
                         <CTableDataCell>
                        <input
                        type="checkbox"
                        checked={selectedbrands.includes(user._id)}
                        onChange={() => handleSelectUser(user._id)}
                            />
                        </CTableDataCell>
                      <CTableDataCell>{user.username}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getBadgeColor(user.role)}>
                          {user.role}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        {new Date(user.createdAt).toLocaleDateString()}
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
                          onClick={() => getsingleuserData(user._id)}
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              {brands.length === 0 && !loading && (
                <div className="text-center mt-4">
                  <p>No brands found</p>
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

export default brands
