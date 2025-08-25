import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const getProducts = () => axios.get(`${API_BASE}/products`);
export const addProduct = (data) => axios.post(`${API_BASE}/products`, data);
export const getvariantsbyCategory = (category_id) => axios.get(`${API_BASE}/api/admin/master/variants-by-categoryId?category_id=${category_id}`);
export const getProductswithvariants = (product_id) => axios.get(`${API_BASE}/api/admin/productsss/get-product-inventory/?id=${product_id}`);
export const getvenderStore =  (product_id="same") => axios.get(`${API_BASE}/api/admin/master/store`)






//==========================================================================
export const getInventory = () => axios.get(`${API_BASE}/api/admin/productsss/get-all-product-inventory`)
