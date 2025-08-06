import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    console.log('totalPages:', totalPages, 'currentPage:', currentPage)
  if (totalPages < 1) return null
  console.log("this is call")

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <CPaginationItem
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
        style={{ cursor: 'pointer' }}
      >
        {i}
      </CPaginationItem>
    )
  }

  return (
    <CPagination className="justify-content-center">
      <CPaginationItem
        aria-label="Previous"
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>
      {pages}
      <CPaginationItem
        aria-label="Next"
        disabled={currentPage === totalPages}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  )
}

export default Pagination