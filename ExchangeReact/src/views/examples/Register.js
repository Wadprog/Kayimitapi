// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Container } from 'reactstrap'

import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'

// Core components
import PageWrapper from 'components/PageWrapper'
import { Field, Form, Submit, Currency } from 'components/form'
import { createUser, getCurrentUser } from '../../store/auth'

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required().min(2).label('Email/UserName'),
  firstName: Yup.string().required().min(2).label('Email/UserName'),
  middleName: Yup.string().required().min(2).label('Email/UserName'),
  lastName: Yup.string().required().min(2).label('Email/UserName'),
  password: Yup.string().required().min(4).label('password'),
  establishments: Yup.string().required().label('Establishment'),
  img: Yup.string().url().label('Establishment'),
  test: Yup.number().label('Test'),
})
const Register = () => {
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)
  const handleCreateNewUser = (userDetails) => console.log(userDetails)
  return (
    <PageWrapper>
      <Container fluid>
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <h1 className="text-center mt-4">
              Kayimit<span className="text-muted">Exchange</span>
            </h1>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form
              validationSchema={ValidationSchema}
              initialValues={{
                username: '',
                firstName: '',
                middleName: '',
                lastName: '',
                password: '',
                establishments: '',
                img: '',
                test: 0,
              }}
              onSubmit={(e, v) => {
                console.log({ e, v })
              }}
            >
              <Field
                autoCapitalize="none"
                autoCorrect={false}
                icon="ni ni-hat-3"
                keyboardType="email-address"
                textContentType="text"
                placeholder="Username"
                name="username"
                type="text"
              />
              <Currency
                autoCapitalize="none"
                autoCorrect={false}
                icon="ni ni-hat-3"
                keyboardType="email-address"
                textContentType="text"
                placeholder="Username"
                name="test"
                type="text"
              />

              <Field
                autoCapitalize="none"
                autoCorrect={false}
                icon="ni ni-hat-3"
                keyboardType="email-address"
                textContentType="text"
                placeholder="First Name"
                name="firstName"
                type="text"
              />

              <Field
                autoCapitalize="none"
                autoCorrect={false}
                icon="ni ni-hat-3"
                keyboardType="email-address"
                textContentType="text"
                placeholder="Last Name"
                name="lastName"
                type="text"
              />
              <Field
                autoCapitalize="none"
                autoCorrect={false}
                icon="ni ni-email-83"
                keyboardType="email-address"
                textContentType="text"
                placeholder="Email"
                name="email"
                type="text"
              />
              <Field
                autoCapitalize="none"
                autoCorrect={false}
                icon="ni ni-lock-circle-open"
                keyboardType="email-address"
                textContentType="text"
                placeholder="Password"
                name="password"
                type="password"
              />
              <Field
                autoCapitalize="none"
                autoCorrect={false}
                icon="ni ni-lock-circle-open"
                keyboardType="email-address"
                textContentType="text"
                placeholder="Establishment"
                name="establishments"
                type="text"
              />

              <div className=""></div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">Make an Admin</span>
                    </label>
                  </div>
                </Col>
              </Row>
              <Submit title="Create new user" />
            </Form>
          </CardBody>
        </Card>
      </Container>
    </PageWrapper>
  )
}

export default Register
