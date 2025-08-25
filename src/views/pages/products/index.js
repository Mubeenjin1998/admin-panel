// import React, { useState, useEffect } from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CAlert,
//   CSpinner,
//   CBadge,
//   CFormSelect,
  
  
// } from '@coreui/react'
// import { cilPlus, cilTrash, cilPencil } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import axios from 'axios'
// import AddUser from './addProduct'
// import { useAuth } from '../../../hooks/useAuth'
// import CommonModal from '../../../components/CommonModal'
// import Pagination from '../../../components/Pagination'

// const products = () => {
//   const { token } = useAuth()
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [showAddproduct, setshowAddproduct] = useState(false)
//   const [productdata, setProductdata] = useState({})
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [deleteUserId, setDeleteUserId] = useState(null)
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [page, setPage] = useState(1)   
//   const [totalPages, setTotalPages] = useState(1)
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const [search, setSearch] = useState('');
//   const [categories, setCategories] = useState([])
//   const [subcategory, setSubcategory] = useState([])
//   const [store, setStores] = useState([])
//   const [category_id, setCategoryId] = useState('')
//   const [subcategory_id, setSubcategoryId] = useState('')
//   const [store_id, setStoreId] = useState('')

//   const clearFilters = () => {
//   setCategoryId('');
//   setSubcategoryId('');
//   setStoreId('');
//   setSearch('');
//   setDebouncedSearch('');
//   setPage(1);
// };

// const fetchAllcategories = async () => {
//     try{
//       const response = await axios.get('http://localhost:5000/api/admin/master/categories', {})
//       console.log(response.data?.data,'================================')
//       setCategories(response.data?.data)

//     }catch(error){
//         console.log(error)
//     }
//   }

//     const fetchAllsubcategories = async () => {
//     try{
//       const response = await axios.get(`http://localhost:5000/api/admin/master/get-subcategories/?id=${category_id}`, {})

//       console.log(response.data?.data.subcategories)
//       setSubcategory(response.data?.data.subcategories)

//     }catch(error){
//         console.log(error)
//     }
//   }

//     const fetchAllshops = async () => {
//     try{
//       const response = await axios.get(`http://localhost:5000/api/admin/master/store`, {})
//       console.log(response.data?.stores)
//       setStores(response.data?.stores)

//     }catch(error){
//         console.log(error)
//     }
//   }

//     useEffect(()=>{
//       fetchAllcategories()
//       fetchAllshops(  )
  
//     },[])
  
//     useEffect(()=>{
//       fetchAllsubcategories()
  
//     },[category_id])
  
//   useEffect(() => {
//     if (token) {
//       fetchProducts()
//     }
//   }, [token,page,debouncedSearch,category_id,subcategory_id,store_id])

//   useEffect(() => {
//   const handler = setTimeout(() => {
//     setDebouncedSearch(search);
//     setPage(1); 
//   }, 500); 

//   return () => clearTimeout(handler);
// }, [search]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/products?page=${page}&search=${encodeURIComponent(debouncedSearch)}&category_id=${category_id}&subcategory_id=${subcategory_id}&store_id=${store_id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       setProducts(response.data.products)
//       setTotalPages(response.data.totalPages)
//       setPage(response.data.page)  
      
//     } catch (err) {
//       setError('Failed to fetch products')
//     } finally {
//       setLoading(false)
//     }
//   }


//   const handleDeleteProduct = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/products/${productId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       fetchProducts()
//     } catch (err) {
//       setError('Failed to delete user')
//     }
//   }

//   const getsingleProductdetails = async (productId) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/products/${productId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       setProductdata(response.data.product);
//       setshowAddproduct(true);
//     } catch (err) {
//       setError('Failed to fetch user data');
//     }
//   }

//   const getBadgeColor = (role) => {
//     switch (role) {
//       case 'admin':
//         return 'danger'
//       case 'user':
//         return 'primary'
//       default:
//         return 'secondary'
//     }
//   }


// //   if (loading) {
// //     setTimeout(() => {
// //           return (
// //       <div className="text-center">
// //         <CSpinner />
// //       </div>
// //     ) 
// //     },5000)

// //   }else{
// //     setLoading(false)
// //   }
// const handleSelectProducts = (userId) => {
//   setSelectedProducts((prev) =>
//     prev.includes(userId)
//       ? prev.filter((id) => id !== userId)
//       : [...prev, userId]
//   );
// };

// const handleSelectAll = () => {
//   if (selectedProducts.length === products.length) {
//     setSelectedProducts([]);
//   } else {
//     setSelectedProducts(products.map((product) => product._id));
//   }
// };

// const renderSubcategoryOptions = (categories, level = 0) => {
//   return categories.map(cat => (
//     <React.Fragment key={cat._id}>
//       <option 
//         value={cat.children && cat.children.length > 0 ? "" : cat._id}
//         disabled={cat.children && cat.children.length > 0}
//         style={{
//           fontWeight: cat.children && cat.children.length > 0 ? 'bold' : 'normal',
//           color: cat.children && cat.children.length > 0 ? '#6c757d' : '#000'
//         }}
//       >
//         {`${'☐ '.repeat(level)}${cat.name}`}
//         {cat.children && cat.children.length > 0 ? ' (Category)' : ''}
//       </option>
//       {cat.children && cat.children.length > 0 &&
//         renderSubcategoryOptions(cat.children, level + 1)}
//     </React.Fragment>
//   ));
// };

// const renderSelectableOptions = (categories, level = 0) => {
//   let options = [];
  
//   categories.forEach(cat => {
//     if (cat.children && cat.children.length > 0) {
//       options = [...options, ...renderSelectableOptions(cat.children, level + 1)];
//     } else {
//       options.push(
//         <option key={cat._id} value={cat._id}>
//           {`${'— '.repeat(level)}${cat.name}`}
//         </option>
//       );
//     }
//   });
  
//   return options;
// };

// return (
//     <>
//   <div className="mb-3 d-flex justify-content-between align-items-center" style={{ gap: '4px' }}>
//     <div className="d-flex align-items-end">
//     <CButton
//     color="primary"
//     onClick={() => {
//       setProductdata({});
//       setshowAddproduct(true);
//     }}
//     className="d-flex align-items-center me-2"
//     style={{ whiteSpace: 'nowrap' }}
//   >
//     <CIcon icon={cilPlus} className="me-2" />
//     Add New Product
//   </CButton>

//   <CButton
//     color="secondary"
//     variant="outline"
//     onClick={clearFilters}
//     style={{ whiteSpace: 'nowrap' }}
//   >
//     Clear Filters
//   </CButton>
// </div>


//   <div className='d-flex'>
//   <div className="d-flex align-items-center" style={{ gap: '8px' }}>
//     <input
//       type="text"
//       className="form-control"
//       placeholder="Search by username or email"
//       value={search}
//       onChange={e => setSearch(e.target.value)}
//       style={{ minWidth: '250px', width: '250px' }}
//     />
//   </div>

//   <div className="d-flex flex-column">
   
//     <CFormSelect
//       name="category_id"
//       value={category_id}
//       onChange={(e)=>setCategoryId(e.target.value)}
//       required
//       className="form-control-lg border-2 rounded-3"
//       style={{ 
//         borderColor: '#e3f2fd',
//         minWidth: '200px'
//       }}
//     >
//       <option value="">Select Category</option>
//       {categories.map(cat => (
//         <option key={cat._id} value={cat._id}>{cat.name}</option>
//       ))}
//     </CFormSelect>
//   </div>
//    <div className="d-flex flex-column">
   
//     <CFormSelect
//       name="subcategory_id"
//       value={subcategory_id}
//       onChange={(e)=>setSubcategoryId(e.target.value)}
//       required
//       className="form-control-lg border-2 rounded-3"
//       style={{ 
//         borderColor: '#e3f2fd',
//         minWidth: '200px'
//       }}
//     >
//       <option value="">Select Category</option>
//             {renderSubcategoryOptions(subcategory)}

//       {/* {subcategory.map(cat => (
//         <option key={cat._id} value={cat._id}>{cat.name}</option>
//       ))} */}
//     </CFormSelect>
    
//   </div>
//    <div className="d-flex flex-column">
   
//     <CFormSelect
//       name="store_id"
//       value={store_id}
//       onChange={(e)=>setStoreId(e.target.value)}
//       required
//       className="form-control-lg border-2 rounded-3"
//       style={{ 
//         borderColor: '#e3f2fd',
//         minWidth: '200px'
//       }}
//     >
//       <option value="">Select Category</option>
//       {store.map(cat => (
//         <option key={cat._id} value={cat._id}>{cat.store_name}</option>
//       ))}
//     </CFormSelect>
//   </div>
//   </div>

//   <div className="d-flex align-items-end">
//     <CButton
//       color="primary"
//       onClick={() => {
//         setProductdata({})
//         setshowAddproduct(true)
//       }}
//       className="d-flex align-items-center"
//       style={{ whiteSpace: 'nowrap' }}
//     >
//       <CIcon icon={cilPlus} className="me-2" />
//       Add New Product
//     </CButton>
//   </div>
// </div>
    
//     {showAddproduct && (
//         <AddUser
//           visible={showAddproduct}
//           onClose={() => setshowAddproduct(false)}
//           fetchProducts={fetchProducts}
//           data={productdata}
//         />
//       )}

//       <CommonModal
//         visible={showDeleteModal}
//         title="Confirm Delete"
//         onClose={() => setShowDeleteModal(false)}
//         footer={
//           <>
//             <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
//               Cancel
//             </CButton>
//             <CButton
//               color="danger"
//               onClick={async () => {
//                 await handleDeleteProduct(deleteUserId)
//                 setShowDeleteModal(false)
//               }}
//             >
//               Delete
//             </CButton>
//           </>
//         }
//       >
//         <p>Are you sure you want to delete this user?</p>
//       </CommonModal>

//       <CRow>
//         <CCol xs={12}>
//           <CCard>
//             <CCardHeader>
//               <CRow>
//                 <CCol className='text-end'>
//                   <strong>Product Management</strong>
//                 </CCol>
//                 <CCol className="text-end">
                  
//                 </CCol>
//               </CRow>
//             </CCardHeader>
//             <CCardBody>
//               {error && (
//                 <CAlert color="danger" dismissible onClose={() => setError('')}>
//                   {error}
//                 </CAlert>
//               )}

//               <CTable hover responsive>
//                 <CTableHead>
//                   <CTableRow>
//                     <CTableHeaderCell>
//                         <input
//                          type="checkbox" 
//                          cheked={selectedProducts.length === products.length && products.length > 0}
//                          onChange={handleSelectAll}
//                          ></input>
//                     </CTableHeaderCell>

//                     <CTableHeaderCell>name</CTableHeaderCell>
//                     <CTableHeaderCell>Stock</CTableHeaderCell>
//                     <CTableHeaderCell>Price</CTableHeaderCell>
//                     <CTableHeaderCell>Image</CTableHeaderCell>
//                     <CTableHeaderCell>Created At</CTableHeaderCell>

//                     <CTableHeaderCell>Actions</CTableHeaderCell>
//                   </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                   {products.map((product) => (
//                     console.log(product.imageUrl[0]),
//                     <CTableRow key={product._id}>
//                          <CTableDataCell>
//                         <input
//                         type="checkbox"
//                         checked={selectedProducts.includes(product._id)}
//                         onChange={() => handleSelectProducts(product._id)}
//                             />
//                         </CTableDataCell>
//                       <CTableDataCell>{product.name}</CTableDataCell>
//                       <CTableDataCell>{product.stock}</CTableDataCell>
//                       <CTableDataCell>
//                           {product.price}
//                       </CTableDataCell>
//                        <CTableDataCell>
//                        <CTableDataCell>
//                       <img 
//                       src={product.imageUrl[0]} 
//                       alt={product.name} 
//                       style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                       />
//                      </CTableDataCell>

//                       </CTableDataCell>
//                       <CTableDataCell>
//                         {new Date(product.createdAt).toLocaleDateString()}
//                       </CTableDataCell>
//                       <CTableDataCell>
//                         <CButton
//                           color="danger"
//                           size="sm"
//                           className="me-2"
//                           onClick={() => {
//                             setDeleteUserId(product._id)
//                             setShowDeleteModal(true)
//                           }}
//                         >
//                           <CIcon icon={cilTrash} />
//                         </CButton>
//                         <CButton
//                           color="warning"
//                           size="sm"
//                           onClick={() => getsingleProductdetails(product._id)}
//                         >
//                           <CIcon icon={cilPencil} />
//                         </CButton>
//                       </CTableDataCell>
//                     </CTableRow>
//                   ))}
//                 </CTableBody>
//               </CTable>

//               {products.length === 0 && !loading && (
//                 <div className="text-center mt-4">
//                   <p>No products found</p>
//                 </div>
//               )}
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//        <div className="d-flex justify-content-center my-4">
//   <Pagination
//     currentPage={page}
//     totalPages={totalPages}
//     onPageChange={setPage}
//   />
// </div>
        
//     </>
//   )
// }

// export default products
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
  CFormSelect,
} from '@coreui/react'
import { cilPlus, cilTrash, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import CommonModal from '../../../components/CommonModal'
import Pagination from '../../../components/Pagination'

const Products = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(1)   
  const [totalPages, setTotalPages] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const [store, setStores] = useState([])
  const [category_id, setCategoryId] = useState('')
  const [subcategory_id, setSubcategoryId] = useState('')
  const [store_id, setStoreId] = useState('')

  const clearFilters = () => {
    setCategoryId('');
    setSubcategoryId('');
    setStoreId('');
    setSearch('');
    setDebouncedSearch('');
    setPage(1);
  };

  const fetchAllcategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/master/categories', {})
      console.log(response.data?.data,'================================')
      setCategories(response.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllsubcategories = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/master/get-subcategories/?id=${category_id}`, {})
      console.log(response.data?.data.subcategories)
      setSubcategory(response.data?.data.subcategories)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllshops = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/master/store`, {})
      console.log(response.data?.stores)
      setStores(response.data?.stores)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllcategories()
    fetchAllshops()
  }, [])

  useEffect(() => {
    fetchAllsubcategories()
  }, [category_id])

  useEffect(() => {
    if (token) {
      fetchProducts()
    }
  }, [token, page, debouncedSearch, category_id, subcategory_id, store_id])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 500); 

    return () => clearTimeout(handler);
  }, [search]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/products?page=${page}&search=${encodeURIComponent(debouncedSearch)}&category_id=${category_id}&subcategory_id=${subcategory_id}&store_id=${store_id}`, {
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

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      fetchProducts()
    } catch (err) {
      setError('Failed to delete product')
    }
  }

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

  const renderSubcategoryOptions = (categories, level = 0) => {
    return categories.map(cat => (
      <React.Fragment key={cat._id}>
        <option 
          value={cat.children && cat.children.length > 0 ? "" : cat._id}
          disabled={cat.children && cat.children.length > 0}
          style={{
            fontWeight: cat.children && cat.children.length > 0 ? 'bold' : 'normal',
            color: cat.children && cat.children.length > 0 ? '#6c757d' : '#000'
          }}
        >
          {`${'☐ '.repeat(level)}${cat.name}`}
          {cat.children && cat.children.length > 0 ? ' (Category)' : ''}
        </option>
        {cat.children && cat.children.length > 0 &&
          renderSubcategoryOptions(cat.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center" style={{ gap: '4px' }}>
        <div className="d-flex align-items-end">
          <CButton
            color="primary"
            onClick={() => navigate('/dashboard/products/add')}
            className="d-flex align-items-center me-2"
            style={{ whiteSpace: 'nowrap' }}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Add New Product
          </CButton>

          <CButton
            color="secondary"
            variant="outline"
            onClick={clearFilters}
            style={{ whiteSpace: 'nowrap' }}
          >
            Clear Filters
          </CButton>
        </div>

        <div className='d-flex'>
          <div className="d-flex align-items-center" style={{ gap: '8px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by product name"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ minWidth: '250px', width: '250px' }}
            />
          </div>

          <div className="d-flex flex-column">
            <CFormSelect
              name="category_id"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              className="form-control-lg border-2 rounded-3"
              style={{ 
                borderColor: '#e3f2fd',
                minWidth: '200px'
              }}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </CFormSelect>
          </div>

          <div className="d-flex flex-column">
            <CFormSelect
              name="subcategory_id"
              value={subcategory_id}
              onChange={(e) => setSubcategoryId(e.target.value)}
              className="form-control-lg border-2 rounded-3"
              style={{ 
                borderColor: '#e3f2fd',
                minWidth: '200px'
              }}
            >
              <option value="">Select Subcategory</option>
              {renderSubcategoryOptions(subcategory)}
            </CFormSelect>
          </div>

          <div className="d-flex flex-column">
            <CFormSelect
              name="store_id"
              value={store_id}
              onChange={(e) => setStoreId(e.target.value)}
              className="form-control-lg border-2 rounded-3"
              style={{ 
                borderColor: '#e3f2fd',
                minWidth: '200px'
              }}
            >
              <option value="">Select Store</option>
              {store.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.store_name}</option>
              ))}
            </CFormSelect>
          </div>
        </div>
      </div>
    
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
                await handleDeleteProduct(deleteUserId)
                setShowDeleteModal(false)
              }}
            >
              Delete
            </CButton>
          </>
        }
      >
        <p>Are you sure you want to delete this product?</p>
      </CommonModal>

      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol>
                  <strong>Product Management</strong>
                </CCol>
                <CCol className="text-end">
                  <CButton
                    color="primary"
                    onClick={() => navigate('/dashboard/products/add')}
                    className="d-flex align-items-center"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <CIcon icon={cilPlus} className="me-2" />
                    Add New Product
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {error && (
                <CAlert color="danger" dismissible onClose={() => setError('')}>
                  {error}
                </CAlert>
              )}

              {loading ? (
                <div className="text-center py-4">
                  <CSpinner size="lg" />
                  <p className="mt-2">Loading products...</p>
                </div>
              ) : (
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>
                        <input
                          type="checkbox" 
                          checked={selectedProducts.length === products.length && products.length > 0}
                          onChange={handleSelectAll}
                        />
                      </CTableHeaderCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Stock</CTableHeaderCell>
                      <CTableHeaderCell>Price</CTableHeaderCell>
                      <CTableHeaderCell>Image</CTableHeaderCell>
                      <CTableHeaderCell>Created At</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {products.map((product) => (
                      <CTableRow key={product._id}>
                        <CTableDataCell>
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product._id)}
                            onChange={() => handleSelectProducts(product._id)}
                          />
                        </CTableDataCell>
                        <CTableDataCell>{product.name}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}>
                            {product.stock}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>${product.price}</CTableDataCell>
                        <CTableDataCell>
                          {product.imageUrl && product.imageUrl.length > 0 && (
                            <img 
                              src={product.imageUrl[0]} 
                              alt={product.name} 
                              style={{ 
                                width: '50px', 
                                height: '50px', 
                                objectFit: 'cover',
                                borderRadius: '4px'
                              }}
                            />
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {new Date(product.createdAt).toLocaleDateString()}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex gap-2">
                            <CButton
                              color="warning"
                              size="sm"
                              onClick={() => navigate(`/products/edit/${product._id}`)}
                              title="Edit Product"
                            >
                              <CIcon icon={cilPencil} />
                            </CButton>
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={() => {
                                setDeleteUserId(product._id)
                                setShowDeleteModal(true)
                              }}
                              title="Delete Product"
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}

              {products.length === 0 && !loading && (
                <div className="text-center mt-4">
                  <p>No products found</p>
                  <CButton
                    color="primary"
                    onClick={() => navigate('/products/add')}
                  >
                    <CIcon icon={cilPlus} className="me-2" />
                    Add Your First Product
                  </CButton>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
      {totalPages > 1 && (
        <div className="d-flex justify-content-center my-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </>
  )
}

export default Products
