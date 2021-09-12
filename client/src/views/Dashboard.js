import React from 'react';

import { Container } from 'reactstrap';
import Chart from 'components/Chart';
// core dependencies
import Header from 'components/Headers/Header.js';
import TransactionsList from 'components/TransactionList';
import PageWrapper from 'components/PageWrapper';

const Dashboard = (props) => {
  return (
    <PageWrapper>
      <Header />

      <Container className="mt--7" fluid>
        <Chart transactions={TransactionsList} />

        <div className="mt-5">
          <TransactionsList />
        </div>
      </Container>
    </PageWrapper>
  );
};

export default Dashboard;
