function TableCustomer({ rowData }) {
  return (
    <div>
      <h5
        className={`text-bold text-${rowData?.customer ? 'success' : 'danger'}`}
      >
        {rowData?.customer ? rowData?.customer?.firstName : 'Anonymous'}
      </h5>
    </div>
  )
}

export default TableCustomer
