import { useState } from 'react';
import { Container } from 'reactstrap';

// Core dependencies
import { useSelector } from 'react-redux';
import Header from 'components/Headers/SimpleHeader';
import { transactions as trans } from 'store/transaction';
import TransactionPairFilter from 'components/TransactionPairFilter';

function DataAnalysis() {
  const allTransactions = useSelector(trans);

  const category = allTransactions?.data?.reduce((acc, current) => {
    console.log(Array.isArray(acc));
    if (!acc.includes(current.rateId)) acc.push(current.rateId);
    console.log(acc);
    return acc;
  }, []);

  console.log({ category });
  return (
    <>
      <Header />

      <Container fluid className="mt-7">
        {allTransactions?.data
          ?.reduce((acc, current) => {
            console.log(Array.isArray(acc));
            if (!acc.includes(current.rateId)) acc.push(current.rateId);
            console.log(acc);
            return acc;
          }, [])
          .map((a) => {
            const transactions = allTransactions?.data?.filter(
              (trans) => trans.rateId === a
            );
            const title = '';
            return (
              <TransactionPairFilter
                transactionList={transactions}
                title={a}
                key={a}
              />
            );
          })}
      </Container>
    </>
  );
}

export default DataAnalysis;
