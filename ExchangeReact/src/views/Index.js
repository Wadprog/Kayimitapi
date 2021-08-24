import { useState } from 'react'
// node.js library that concatenates classes (strings)

import Chart from 'chart.js'
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap'

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from 'variables/charts.js'

import Header from 'components/Headers/Header.js'
import TransactionsList from 'components/TransactionList'
const Index = (props) => {
  const [chartExample1Data, setChartExample1Data] = useState('data1')

  if (window.Chart) {
    parseOptions(Chart, chartOptions())
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">
                      Transactions Monthly Reports
                    </h2>
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
                      Overview
                    </h6>
                    <h2 className="mb-0">Transactions Weekly Reports</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="mt-5">
          <TransactionsList />
        </div>
      </Container>
    </>
  )
}

export default Index
