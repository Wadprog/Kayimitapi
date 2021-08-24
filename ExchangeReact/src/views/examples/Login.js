import { useSelector, useDispatch } from 'react-redux'
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap'
import * as Yup from 'yup'

// Core components
import PageWrapper from 'components/PageWrapper'
import { Field, Form, Submit } from 'components/form'
import { getCurrentUser, Login } from '../../store/auth'

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required().min(2).label('Email/UserName'),
  password: Yup.string().required().min(4).label('password'),
  establishment: Yup.string().required().label('Establishment'),
})

const LoginScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)
  const handleLogin = (credentials) => dispatch(Login(credentials))
  return (
    <PageWrapper>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <h1 className="mt-3 text-center">
              Kayimit<span className="text-muted">Exchange</span>
            </h1>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form
              validationSchema={ValidationSchema}
              initialValues={{ username: '', password: '', establishment: '' }}
              onSubmit={handleLogin}
            >
              <Field
                autoCapitalize="none"
                autoCorrect={false}
                icon="ni ni-shop"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Establishment"
                name="establishment"
                type="text"
              />

              <Field
                autoCapitalize="none"
                autoCorrect={false}
                icon="ni ni-email-83"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email/username"
                name="username"
                type="text"
                autoComplete="new-email"
              />
              <Field
                autoCapitalize="none"
                autoCorrect={false}
                icon="ni ni-lock-circle-open"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="new-email"
              />

              <Submit title="Login" />
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </PageWrapper>
  )
}

export default LoginScreen
