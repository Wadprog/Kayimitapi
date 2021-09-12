import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Media,
  Jumbotron,
} from 'reactstrap';

function Invoice({ location: { data } }) {
  console.log({ data });

  //   setTimeout(function () {
  //     window.print();
  //   }, 0);
  return (
    <Container fluid>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Media left>
            <Media object src="https://via.placeholder.com/150" />
          </Media>
          <Row>
            <Col></Col>
            <Col>
              <div>office street</div>
              <div>office street</div>
              <div>office street</div>
              <div>office street</div>
            </Col>
          </Row>
          <Jumbotron>
            <h3>
              <b>Invoice#</b> #936988
            </h3>
            <h3>
              <b>Invoice Date:</b> Monday, October 10th, 2015
            </h3>
          </Jumbotron>

          <Row>
            <Col>
              <b>Invoiced To</b>
              <div> Jakob Smith</div>
              <div>Roupark 37</div>
              <div>New York, NY, 2014</div>
              <div>USA</div>
            </Col>
            <Col></Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Invoice;
