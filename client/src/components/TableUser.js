function TableUser({ rowData }) {
  return (
    <div
      style={{ width: 35, height: 35, borderRadius: 20 }}
      className={`d-flex flex-column justify-content-center  align-items-center bg-${
        rowData?.user?.isActive ? 'success' : 'danger'
      }`}
    >
      <h5 className="text-white mt-2">
        {rowData?.user?.firstName[0].toUpperCase()}{' '}
        {rowData?.user?.lastName[0].toUpperCase()}
      </h5>
    </div>
  )
}

export default TableUser
