import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import Chart from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from 'variables/charts.js';

function MyChart({ transactions }) {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState('data1');

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data('data' + index);
  };
  return (
    <Row>
      <Col className="mb-5 mb-xl-0" xl="8">
        <Card className="bg-gradient-default shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h6 className="text-uppercase text-light ls-1 mb-1">
                  Overview
                </h6>
                <h2 className="text-white mb-0">Sales value</h2>
              </div>
              <div className="col">
                <Nav className="justify-content-end" pills>
                  <NavItem>
                    <NavLink
                      className={classnames('py-2 px-3', {
                        active: activeNav === 1,
                      })}
                      href="#pablo"
                      onClick={(e) => toggleNavs(e, 1)}
                    >
                      <span className="d-none d-md-block">Month</span>
                      <span className="d-md-none">M</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames('py-2 px-3', {
                        active: activeNav === 2,
                      })}
                      data-toggle="tab"
                      href="#pablo"
                      onClick={(e) => toggleNavs(e, 2)}
                    >
                      <span className="d-none d-md-block">Week</span>
                      <span className="d-md-none">W</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Row>
          </CardHeader>
          <CardBody>
            {/* Chart */}
            <div className="chart">
              <Line
                data={chartExample1[chartExample1Data]}
                options={chartExample1.options}
                getDatasetAtEvent={(e) => console.log(e)}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xl="4">
        <Card className="shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h6 className="text-uppercase text-muted ls-1 mb-1">
                  Performance
                </h6>
                <h2 className="mb-0">Total orders</h2>
              </div>
            </Row>
          </CardHeader>
          <CardBody>
            {/* Chart */}
            <div className="chart">
              <Bar data={chartExample2.data} options={chartExample2.options} />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default MyChart;
