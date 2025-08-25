import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebarShow: true, 
  },
  reducers: {
    setSidebar: (state, action) => {
      state.sidebarShow = action.payload; 
    },
    toggleSidebar: (state) => {
      state.sidebarShow = !state.sidebarShow; 
    },
  },
});

export const { setSidebar, toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
