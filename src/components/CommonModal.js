// import React from 'react'
// import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

// const CommonModal = ({ visible, title, children, onClose, footer }) => {
//   return (
//    <CModal visible={visible} onClose={onClose} backdrop="static" alignment="center">
//   <CModalHeader onClose={onClose}>
//     <CModalTitle>{title}</CModalTitle>
//   </CModalHeader>
//   <CModalBody>
//     {children}
//   </CModalBody>
//   {footer && (
//     <CModalFooter>
//       {footer}
//     </CModalFooter>
//   )}
// </CModal>
//   )
// }

// export default CommonModal
import React from 'react'
import { 
  CModal, 
  CModalHeader, 
  CModalTitle, 
  CModalBody, 
  CModalFooter, 
  CButton 
} from '@coreui/react'

const CommonModal = ({ 
  visible, 
  title, 
  children, 
  onClose, 
  footer, 
  size = "md", // sm, md, lg, xl
  backdrop = "static",
  alignment = "center",
  scrollable = false,
  fullscreen = false,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = ""
}) => {
  return (
    <CModal 
      visible={visible} 
      onClose={onClose} 
      backdrop={backdrop} 
      alignment={alignment}
      size={size}
      scrollable={scrollable}
      fullscreen={fullscreen}
      className={`modern-modal ${className}`}
    >
      <CModalHeader 
        onClose={onClose}
        className={`border-0 pb-0 ${headerClassName}`}
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          borderRadius: '0.5rem 0.5rem 0 0'
        }}
      >
        <CModalTitle className="fs-5 fw-bold text-dark">
          {title}
        </CModalTitle>
      </CModalHeader>
      
      <CModalBody 
        className={`px-4 py-3 ${bodyClassName}`}
        style={{
          maxHeight: '70vh',
          overflowY: 'auto'
        }}
      >
        {children}
      </CModalBody>
      
      {footer && (
        <CModalFooter 
          className={`border-0 pt-0 ${footerClassName}`}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: '0 0 0.5rem 0.5rem'
          }}
        >
          {footer}
        </CModalFooter>
      )}
      
      <style jsx>{`
        .modern-modal .modal-content {
          border: none;
          border-radius: 1rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .modern-modal .btn-close {
          background-size: 1rem;
          opacity: 0.6;
          transition: all 0.2s ease;
        }
        
        .modern-modal .btn-close:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        
        .modern-modal .modal-header {
          padding: 1.5rem 1.5rem 1rem 1.5rem;
        }
        
        .modern-modal .modal-body {
          padding: 0 1.5rem 1rem 1.5rem;
        }
        
        .modern-modal .modal-footer {
          padding: 1rem 1.5rem 1.5rem 1.5rem;
        }
        
        @media (max-width: 768px) {
          .modern-modal .modal-dialog {
            margin: 1rem;
          }
        }
      `}</style>
    </CModal>
  )
}

export default CommonModal