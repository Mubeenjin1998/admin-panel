import React, { useState, useRef, useEffect } from 'react';



const CustomMultiSelectDropdown = ({ subcategory, selectedValues = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const renderCheckboxOptions = (categories, level = 0) => {
    return categories.map(cat => (
      <React.Fragment key={cat._id}>
        <div 
          style={{ 
            paddingLeft: `${level * 20}px`, 
            padding: '8px 12px',
            borderBottom: '1px solid #eee',
            backgroundColor: cat.children && cat.children.length > 0 ? '#f8f9fa' : 'white'
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', margin: 0, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selectedValues.includes(cat._id)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...selectedValues, cat._id]);
                } else {
                  onChange(selectedValues.filter(id => id !== cat._id));
                }
              }}
              disabled={cat.children && cat.children.length > 0}
              style={{ marginRight: '8px' }}
            />
            <span style={{
              fontWeight: cat.children && cat.children.length > 0 ? 'bold' : 'normal',
              color: cat.children && cat.children.length > 0 ? '#6c757d' : '#000'
            }}>
              {cat.name}
              {cat.children && cat.children.length > 0 ? ' (Category)' : ''}
            </span>
          </label>
        </div>
        {cat.children && cat.children.length > 0 &&
          renderCheckboxOptions(cat.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div style={{ position: 'relative', minWidth: '200px' }}>
      <div
        className="form-control-lg border-2 rounded-3"
        style={{
          borderColor: '#e3f2fd',
          minWidth: '200px',
          cursor: 'pointer',
          padding: '8px 12px',
          backgroundColor: 'white'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length > 0 
          ? `${selectedValues.length} selected`
          : 'Select Subcategories'
        }
        <span style={{ float: 'right' }}>{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          maxHeight: '300px',
          overflowY: 'auto',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          {renderCheckboxOptions(subcategory)}
        </div>
      )}
    </div>
  );
};

export default  CustomMultiSelectDropdown
