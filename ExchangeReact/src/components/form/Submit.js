import { useFormikContext } from 'formik'

import { Button } from 'reactstrap'

function SubmitBtn({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext()

  return (
    <Button
      color="primary"
      type="button"
      {...otherProps}
      onClick={handleSubmit}
    >
      {title}
    </Button>
  )
}

export default SubmitBtn
