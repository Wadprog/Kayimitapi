import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  NavItem,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  CardTitle,
  CardText,
} from 'reactstrap';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'store/auth';

// core components
import UserHeader from 'components/Headers/UserHeader.js';
import PageWrapper from 'components/PageWrapper';
import UserForm from 'components/AppForms/AddUser';

const Profile = ({ userProfile }) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  
  const user = userProfile ? userProfile : currentUser?.data.user;
  const [activeTab, setActiveTab] = useState('1');
  
  // functions 
  const toggle = (tab) => (activeTab !== tab ? setActiveTab(tab) : null);

  return (
    <PageWrapper isLoading={currentUser.loading}>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <img
                      alt={`${user.firstName} avatar`}
                      className="rounded-circle"
                      src={user?.avatar}
                    />
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Transactions</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Establishments</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Since</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>{`${user.firstName} ${user.lastName}`}</h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {`${user?.isAdmin ? 'Has' : 'NO-'} Admin Access`}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      onClick={() => {
                        toggle('1');
                      }}
                    >
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      onClick={() => {
                        toggle('2');
                      }}
                    >
                      Transactions
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      onClick={() => {
                        toggle('3');
                      }}
                    >
                      Timeline
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <h4>{`${user.firstName}'s information`}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <UserForm />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <h4>{`${user.firstName}'s Transactions`}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <Card body>
                          <CardTitle>Special Title Treatment</CardTitle>
                          <CardText>
                            With supporting text below as a natural lead-in to
                            additional content.
                          </CardText>
                          <Button>Go somewhere</Button>
                        </Card>
                      </Col>
                      <Col sm="6">
                        <Card body>
                          <CardTitle>Special Title Treatment</CardTitle>
                          <CardText>
                            With supporting text below as a natural lead-in to
                            additional content.
                          </CardText>
                          <Button>Go somewhere</Button>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col>
                        <h4> {`${user?.firstName}'s Timeline`}</h4>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
};

export default Profile;
