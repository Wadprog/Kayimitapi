function FormError({ error, visible }) {
  if (!visible || !error) return null
  return <small className="text-danger">{error}</small>
}

export default FormError
