import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import * as Yup from 'yup';

// Core components
import PageWrapper from 'components/PageWrapper';
import { Field, Form, Submit, Select } from 'components/form';
import { getCurrentUser, Login } from 'store/auth';
import { getEstablishments, establishmentList } from 'store/establishment';

import { getAccountDetails, accountDetails } from 'store/account';

import Setup from './Setup';

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required().min(2).label('Email/UserName'),
  password: Yup.string().required().min(4).label('password'),
  establishment: Yup.string().required().label('Establishment'),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(getCurrentUser);

  const establishments = useSelector(establishmentList);
  useEffect(() => dispatch(getEstablishments()), [dispatch]);

  const handleLogin = (credentials) => dispatch(Login(credentials));
  return(
  <PageWrapper isLoading={auth.loading || establishments.loading}>
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
            initialValues={{
              username: '',
              password: '',
              establishment: '',
            }}
            onSubmit={handleLogin}
          >
            <Select
              icon="ni ni-shop"
              placeholder=" Assign Establishments"
              name="establishment"
              options={establishments.list.map((establishment) => ({
                label: establishment.city,
                value: establishment._id,
              }))}
            />
            {/* <Field
                autoFocus
                autoCapitalize="none"
                icon="ni ni-shop"
                placeholder="Establishment"
                name="establishment"
                type="text"
              /> */}

            <Field
              autoCapitalize="none"
              icon="ni ni-email-83"
              placeholder="Email/username"
              name="username"
              type="text"
              autoComplete="new-email"
            />
            <Field
              autoCapitalize="none"
              autoCorrect="false"
              icon="ni ni-lock-circle-open"
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
  </PageWrapper>)
};

export default LoginScreen;
