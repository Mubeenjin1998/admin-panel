// import React, { useEffect, useState } from 'react';
// import {
//   CContainer,
//   CRow,
//   CCol,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CForm,
//   CFormLabel,
//   CFormInput,
//   CButton,
//   CImage,
//   CBadge
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilTrash, cilCheckCircle, cilPlus } from '@coreui/icons';
// import { getProductswithvariants } from '../../../api/product';
// import { getvenderStore } from '../../../api/product';
// import { useParams } from 'react-router-dom';


// const AddInventory = () => {
//     const { id } = useParams();

//   const [storeName, setStoreName] = useState('');
//   const [storeId, setStoreId] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [gst, setGst] = useState('');
//   const [product,setProduct] = useState({})
//   const [addedStores, setAddedStores] = useState([
//     {
//       storeName: "Alisha's Collection",
//       storeId: 'ASC19845',
//       location: 'Vijay Nagar',
//       availableSize: ['XS', 'S'],
//       colorAvailability: ['#dc3545', '#000000', '#2eb85c'], // Using hex codes for colors
//       quantity: 250,
//       gst: "5%"
//     },
//   ]);

//   const [store,setStore] = useState([])




//   const handleAddStore = () => {
//     if (storeName && storeId && quantity) {
//       const newStore = {
//         storeName,
//         storeId,
//         quantity,
//         gst,
//       };
//       setAddedStores([...addedStores, newStore]);
//       // Reset form fields
//       setStoreName('');
//       setStoreId('');
//       setQuantity('');
//       setGst('');
//     } else {
//       alert('Please fill in at least Store Name, Store ID, and Quantity.');
//     }
//   };
  
//   // Function to handle removing a store variant
//   const handleRemoveStore = (indexToRemove) => {
//     setAddedStores(addedStores.filter((_, index) => index !== indexToRemove));
//   };


//   // Function to handle the final save
//   const handleSaveProduct = () => {
//     // Here you would typically send the product data and the addedStores array to your backend API
//     console.log('Saving Product...');
//     console.log('Product Details:', {
//         productCategory: 'Clothing',
//         productName: 'Shirt',
//         brand: 'Van Heusen',
//         price: '$250',
//         slug: '/RDBSJa1UytM8w&index=12',
//         description: 'Lorem ipsum dolor sit amet consectetur.'
//     });
//     console.log('Inventory Details:', addedStores);
//     alert('Product and inventory details saved! Check the console for the data.');
//   };




//   const fetchProduct = async () => {
//     try {
//       // setLoading(true)
//       // setError("")

//       const result = await getProductswithvariants(id)

//       if (result?.data.success) {
//         setProduct(result.data.product) 
//       } else {
//         // setError(result?.message || "Failed to fetch product")
//       }

//     } catch (err) {
//       console.error("Error fetching product:", err)
//       // setError("Something went wrong")
//     } finally {
//       // setLoading(false)
//     }
//   }

//   const fetchStore = async () => {
//     try {
//       // setLoading(true)
//       // setError("")

//       const result = await getvenderStore(id)

//       if (result?.data.success) {
//         setStore(result.data.stores) 
//       } else {
//         // setError(result?.message || "Failed to fetch product")
//       }

//     } catch (err) {
//       console.error("Error fetching product:", err)
//       // setError("Something went wrong")
//     } finally {
//       // setLoading(false)
//     }
//   }

//   useEffect(()=>{
//     if(id){
//       fetchProduct()
//       fetchStore()
//     }
//   },[id])



//   return (
//     <CContainer lg>
//       <h1 className="my-4">Add Inventory</h1>

//       {/* Product Details Section */}
//       <CCard className="mb-4">
//         <CCardBody>
//                  {product ? (
//   <CRow className="align-items-center">
//     {/* Product Image */}
//     <CCol xs="auto">
//       <CImage rounded src={product.image} width={120} height={120} />

//     </CCol>

//     {/* Product Details */}
//     <CCol>
//       <CRow>
//         <CCol md={6}>
//           <CFormLabel>Product Category</CFormLabel>
//           <p className="fw-bold">{product.category || "N/A"}</p>
//         </CCol>
//         <CCol md={6}>
//           <CFormLabel>Product Name</CFormLabel>
//           <p className="fw-bold">{product.name}</p>
//         </CCol>
//         <CCol md={6}>
//           <CFormLabel>Brand</CFormLabel>
//           <p className="fw-bold">{product.brand || "N/A"}</p>
//         </CCol>
//         <CCol md={6}>
//           <CFormLabel>Price</CFormLabel>
//           <p className="fw-bold">${product.price}</p>
//         </CCol>
//       </CRow>
//     </CCol>

//     {/* Extra Info */}
//     <CCol md={4}>
//       <CFormLabel>Slug</CFormLabel>
//       <p>{product.slug || "N/A"}</p>
//       <CFormLabel>Description</CFormLabel>
//       <p>{product.description || "No description available"}</p>
//     </CCol>
//   </CRow>
// ) : (
//   <h1>Product not found</h1>
// )}

        
//         </CCardBody>
//       </CCard>

//       {/* Display Added Stores Section */}
//       <h2 className="mt-5 mb-3">Stores & Variants Added</h2>
//       {addedStores.map((store, index) => (
//         <CCard key={index} className="mb-3">
//           <CCardBody>
//             <CRow className="align-items-center g-3">
//               <CCol md={2}><CFormLabel>Store Name</CFormLabel><p className="fw-bold">{store.storeName}</p></CCol>
//               <CCol md={2}><CFormLabel>Store ID</CFormLabel><p>{store.storeId}</p></CCol>
//               {store.location && <CCol md={2}><CFormLabel>Location</CFormLabel><p>{store.location}</p></CCol>}

//               {product?.productvariant &&
//   product.productvariant.map((variant, index) => (
//     <CRow key={variant._id} className="mb-3">
//       {variant.attributes.map((attr, i) => (
//         store.availableSize && (
//           <CCol md={2} key={i}>
//             <CFormLabel>{attr.attribute}</CFormLabel>
//             <div>{attr.value}</div>
//           </CCol>
//         )
//       ))}
//     </CRow>
//   ))
// }

//               <CCol md={1}><CFormLabel>Quantity</CFormLabel><p>{store.quantity}</p></CCol>
//               <CCol md={1}><CFormLabel>GST</CFormLabel><p>{store.gst}</p></CCol>
//               <CCol md={1} className="text-end">
//                 <CButton color="danger" variant="ghost" onClick={() => handleRemoveStore(index)}>
//                   <CIcon icon={cilTrash} />
//                 </CButton>
//               </CCol>
//             </CRow>
//           </CCardBody>
//         </CCard>
//       ))}
      
//       {/* Add New Store Variants Section */}
// <CCard className="mt-4">
//   <CCardHeader>
//     <strong>Add New Store Variant</strong>
//   </CCardHeader>
//   <CCardBody>
//     <CForm>
//       <CRow className="g-3 align-items-end">


        
//         {/* Store Dropdown */}
//         <CCol md={4}>
//           <CFormLabel>Select Store</CFormLabel>
//           <select
//             className="form-select"
//             value={storeId}
//             onChange={(e) => {
//               const selectedStoreId = e.target.value;
//               setStoreId(selectedStoreId);
//               const selected = store.find(s => s._id === selectedStoreId);
//               setStoreName(selected ? selected.store_name : "");
//             }}
//           >
//             <option value="">-- Select Store --</option>
//             {store.map((s) => (
//               <option key={s._id} value={s._id}>
//                 {s.store_name}
//               </option>
//             ))}
//           </select>
//         </CCol>

//         {/* Quantity */}
//         <CCol md={2}>
//           <CFormLabel>Quantity</CFormLabel>
//           <CFormInput
//             type="number"
//             placeholder="Enter Quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//         </CCol>

//         {/* Price */}
//         <CCol md={2}>
//           <CFormLabel>Price</CFormLabel>
//           <CFormInput
//             type="number"
//             placeholder="Enter Price"
//             // value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </CCol>

//         {/* GST */}
//         <CCol md={2}>
//           <CFormLabel>GST</CFormLabel>
//           <CFormInput
//             type="text"
//             placeholder="e.g., 5%"
//             value={gst}
//             onChange={(e) => setGst(e.target.value)}
//           />
//         </CCol>

    

//         {/* Add Button */}
//         <CCol md={2}>
//           <CButton
//             color="success"
//             className="w-100 text-white"
//             onClick={handleAddStore}
//           >
//             <CIcon icon={cilPlus} className="me-2" /> Add
//           </CButton>
//         </CCol>
//       </CRow>
//     </CForm>
//   </CCardBody>
// </CCard>


//       {/* Final Action Buttons */}
//       <CRow className="mt-4">
//         <CCol className="d-flex justify-content-end gap-2">
//           <CButton color="secondary" variant="outline">Back</CButton>
//           <CButton color="primary" onClick={handleSaveProduct}>
//             <CIcon icon={cilCheckCircle} className="me-2" />
//             Save Product
//           </CButton>
//         </CCol>
//       </CRow>
//     </CContainer>
//   );
// };

// export default AddInventory;
import React, { useEffect, useState } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CImage,
  CBadge
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilCheckCircle, cilPlus } from '@coreui/icons';
import { getProductswithvariants } from '../../../api/product';
import { getvenderStore } from '../../../api/product';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const AddInventory = () => {
  const { id } = useParams();
  const { token } = useAuth()

  const [storeName, setStoreName] = useState('');
  const [storeId, setStoreId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [gst, setGst] = useState('');
  const [product, setProduct] = useState(null);
  const [store, setStore] = useState([]);
  const [addedStores, setAddedStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAddStore = () => {
    if (!storeName || !storeId || !quantity) {
      alert('Please fill in at least Store Name, Store ID, and Quantity.');
      return;
    }

    const selectedStore = store.find(s => s._id === storeId);
    
    // Handle location properly - convert object to string if needed
    let locationString = '';
    if (selectedStore?.location) {
      if (typeof selectedStore.location === 'object') {
        // If location is an object, extract address or create a readable string
        locationString = selectedStore.location.address || 
                        `${selectedStore.location.type || ''} ${selectedStore.location.coordinates ? `(${selectedStore.location.coordinates.join(', ')})` : ''}`.trim() ||
                        'Location available';
      } else {
        locationString = selectedStore.location;
      }
    }

    const newStore = {
      storeName: storeName,
      storeId: storeId,
      location: locationString,
      quantity: parseInt(quantity),
      price: price ? parseFloat(price) : null,
      discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
      lowStockThreshold: lowStockThreshold ? parseInt(lowStockThreshold) : 10,
      gst: gst || '',
    };

    setAddedStores(prev => [...prev, newStore]);
    
    // Reset form fields
    setStoreName('');
    setStoreId('');
    setQuantity('');
    setPrice('');
    setDiscountedPrice('');
    setLowStockThreshold('10');
    setGst('');
  };
  
  const handleRemoveStore = (indexToRemove) => {
    setAddedStores(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const saveInventoryData = async (payload) => {
    try {
      
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const response = await fetch('http://localhost:5000/api/admin/productsss/add-inventory-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Adjust format if needed (Bearer, Token, etc.)
          // Or if your API expects different format:
          // 'Authorization': token,
          // 'x-auth-token': token,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        } else if (response.status === 403) {
          throw new Error('Access forbidden. You do not have permission to perform this action.');
        } else if (response.status === 404) {
          throw new Error('API endpoint not found.');
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP Error: ${response.status}`);
        }
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleSaveProduct = async () => {
    if (addedStores.length === 0) {
      alert('Please add at least one store inventory before saving.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const hasVariants = product?.productvariant && product.productvariant.length > 0;
      
      const payload = {
        product_id: product?._id || id,
        stores: addedStores.map(store => {
          const storeData = {
            store_id: store.storeId
          };

          if (hasVariants) {
            storeData.base_inventory = {
              quantity: 0,
              reserved_quantity: 0,
              price: 0,
              discounted_price: 0,
              low_stock_threshold: 0,
              is_available: false
            };
            
            storeData.variants = product.productvariant.map(variant => ({
              variant_id: variant._id,
              // sku: `${product.name?.toUpperCase().replace(/\s+/g, '')}-${variant.attributes?.map(attr => attr.value).join('-').toUpperCase()}-${store.storeName?.toUpperCase().replace(/\s+/g, '')}`,
              quantity: store.quantity,
              reserved_quantity: 0,
              price: store.price || product?.price || 0,
              discounted_price: store.discountedPrice || store.price || product?.price || 0,
              low_stock_threshold: store.lowStockThreshold || 5,
              is_available: true
            }));
          } else {
            storeData.base_inventory = {
              quantity: store.quantity,
              reserved_quantity: 0,
              price: store.price || product?.price || 0,
              discounted_price: store.discountedPrice || store.price || product?.price || 0,
              low_stock_threshold: store.lowStockThreshold || 10,
              is_available: true
            };
          }

          return storeData;
        })
      };

      console.log('Saving Product...');
      console.log('Generated Payload:', JSON.stringify(payload, null, 2));

      const result = await saveInventoryData(payload);
      
      console.log('API Response:', result);
      
      if (result.data.success) {
        alert('Product inventory saved successfully!');
        setAddedStores([]);
        setTimeout(() => navigate(`/dashboard/products/`), 2000)
        
      } else {
        throw new Error(result.message || 'Failed to save inventory');
      }
      
    } catch (error) {
      console.error('Error saving inventory:', error);
      setError(error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError('');

      const result = await getProductswithvariants(id);

      if (result?.data?.success) {
        setProduct(result.data.product);
      } else {
        setError(result?.message || 'Failed to fetch product');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Something went wrong while fetching product');
    } finally {
      setLoading(false);
    }
  };

  const fetchStore = async () => {
    try {
      setLoading(true);
      setError('');

      const result = await getvenderStore(id);

      if (result?.data?.success) {
        setStore(result.data.stores);
      } else {
        setError(result?.message || 'Failed to fetch stores');
      }
    } catch (err) {
      console.error('Error fetching stores:', err);
      setError('Something went wrong while fetching stores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchStore();
    }
  }, [id]);

  const renderProductVariants = () => {
    if (!product?.productvariant || product.productvariant.length === 0) {
      return null;
    }

    return (
      <CCol md={12} className="mt-3">
        <CFormLabel>Available Variants</CFormLabel>
        <div className="d-flex flex-wrap gap-2">
          {product.productvariant.map((variant, index) => (
            <CBadge key={variant._id || index} color="info">
              {variant.attributes?.map((attr, i) => (
                <span key={i}>
                  {attr.attribute}: {attr.value}
                  {i < variant.attributes.length - 1 && ', '}
                </span>
              ))}
            </CBadge>
          ))}
        </div>
      </CCol>
    );
  };

  if (loading) {
    return (
      <CContainer lg>
        <div className="text-center mt-5">
          <h3>Loading...</h3>
        </div>
      </CContainer>
    );
  }

  if (error) {
    return (
      <CContainer lg>
        <div className="text-center mt-5">
          <h3 className="text-danger">Error: {error}</h3>
          <CButton color="primary" onClick={() => window.location.reload()}>
            Retry
          </CButton>
        </div>
      </CContainer>
    );
  }

  return (
    <CContainer lg>
      <h1 className="my-4">Add Inventory</h1>

      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Product Details Section */}
      <CCard className="mb-4">
        <CCardBody>
          {product ? (
            <CRow className="align-items-center">
              {/* Product Image */}
              <CCol xs="auto">
                <CImage 
                  rounded 
                  src={product.image || '/placeholder-image.jpg'} 
                  width={120} 
                  height={120}
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </CCol>

              {/* Product Details */}
              <CCol>
                <CRow>
                  <CCol md={6}>
                    <CFormLabel>Product Category</CFormLabel>
                    <p className="fw-bold">{product.category || 'N/A'}</p>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>Product Name</CFormLabel>
                    <p className="fw-bold">{product.name || 'N/A'}</p>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>Brand</CFormLabel>
                    <p className="fw-bold">{product.brand || 'N/A'}</p>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>Price</CFormLabel>
                    <p className="fw-bold">${product.price || 'N/A'}</p>
                  </CCol>
                </CRow>
                {renderProductVariants()}
              </CCol>

              {/* Extra Info */}
              <CCol md={4}>
                <CFormLabel>Slug</CFormLabel>
                <p className="text-muted">{product.slug || 'N/A'}</p>
                <CFormLabel>Description</CFormLabel>
                <p className="text-muted">
                  {product.description || 'No description available'}
                </p>
              </CCol>
            </CRow>
          ) : (
            <div className="text-center">
              <h3>Product not found</h3>
            </div>
          )}
        </CCardBody>
      </CCard>

      {/* Display Added Stores Section */}
      {addedStores.length > 0 && (
        <>
          <h2 className="mt-5 mb-3">Stores & Variants Added</h2>
          {addedStores.map((storeItem, index) => (
            <CCard key={index} className="mb-3">
              <CCardBody>
                <CRow className="align-items-center g-3">
                  <CCol md={3}>
                    <CFormLabel>Store Name</CFormLabel>
                    <p className="fw-bold">{storeItem.storeName}</p>
                  </CCol>
                  <CCol md={2}>
                    <CFormLabel>Store ID</CFormLabel>
                    <p>{storeItem.storeId}</p>
                  </CCol>
                  {storeItem.location && (
                    <CCol md={2}>
                      <CFormLabel>Location</CFormLabel>
                      <p>{typeof storeItem.location === 'object' 
                          ? (storeItem.location.address || 'Location available')
                          : storeItem.location
                      }</p>
                    </CCol>
                  )}
                  <CCol md={1}>
                    <CFormLabel>Quantity</CFormLabel>
                    <p className="fw-bold">{storeItem.quantity}</p>
                  </CCol>
                  {storeItem.price && (
                    <CCol md={1}>
                      <CFormLabel>Price</CFormLabel>
                      <p>${storeItem.price}</p>
                    </CCol>
                  )}
                  <CCol md={1}>
                    <CFormLabel>GST</CFormLabel>
                    <p>{storeItem.gst || 'N/A'}</p>
                  </CCol>
                  <CCol md={1} className="text-end">
                    <CButton 
                      color="danger" 
                      variant="ghost" 
                      onClick={() => handleRemoveStore(index)}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          ))}
        </>
      )}
      
      {/* Add New Store Variants Section */}
      <CCard className="mt-4">
        <CCardHeader>
          <strong>Add New Store Variant</strong>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow className="g-3 align-items-end">
              {/* Store Dropdown */}
              <CCol md={3}>
                <CFormLabel>Select Store</CFormLabel>
                <select
                  className="form-select"
                  value={storeId}
                  onChange={(e) => {
                    const selectedStoreId = e.target.value;
                    setStoreId(selectedStoreId);
                    const selected = store.find(s => s._id === selectedStoreId);
                    setStoreName(selected ? selected.store_name : '');
                  }}
                >
                  <option value="">-- Select Store --</option>
                  {store.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.store_name}
                    </option>
                  ))}
                </select>
              </CCol>

              {/* Quantity */}
              <CCol md={2}>
                <CFormLabel>Quantity</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="0"
                />
              </CCol>

              {/* Price */}
              <CCol md={2}>
                <CFormLabel>Price</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </CCol>

              {/* Discounted Price */}
              <CCol md={2}>
                <CFormLabel>Discounted Price</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Enter Discounted Price"
                  value={discountedPrice}
                  onChange={(e) => setDiscountedPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </CCol>

              {/* Low Stock Threshold */}
              <CCol md={2}>
                <CFormLabel>Low Stock Threshold</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Enter Threshold"
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(e.target.value)}
                  min="1"
                />
              </CCol>

              {/* Add Button */}
              <CCol md={1}>
                <CButton
                  color="success"
                  className="w-100 text-white"
                  onClick={handleAddStore}
                >
                  <CIcon icon={cilPlus} className="me-2" /> Add
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>

      {/* Final Action Buttons */}
      <CRow className="mt-4">
        <CCol className="d-flex justify-content-end gap-2">
          <CButton color="secondary" variant="outline">
            Back
          </CButton>
          <CButton 
            color="primary" 
            onClick={handleSaveProduct}
            disabled={saving || addedStores.length === 0}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              <>
                <CIcon icon={cilCheckCircle} className="me-2" />
                Save Product
              </>
            )}
          </CButton>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddInventory;