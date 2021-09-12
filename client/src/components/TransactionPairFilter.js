import { useState } from 'react';
import parseISO from 'date-fns/parseISO';
import { Card, CardHeader, CardBody, Collapse, Row, Col } from 'reactstrap';

// Core dependencies
import useToggle from 'hooks/useToggle';
import DateRangePicker from 'components/DateRangePicker';
import isInRange from 'hooks/isInRange';
import TableCustomer from './TableCustomer';
import TableUser from './TableUser';
import TransactionList from './TransactionList';
const TransactionPairFilter = ({ transactionList, title }) => {
  const [isOpen, toggleOpen] = useToggle(false);
  const [transactions, setTransactions] = useState(transactionList);

  const handleDatesChanges = ({ endDate, startDate }) =>
    setTransactions(
      transactionList.filter((tran) =>
        isInRange(startDate, endDate, parseISO(tran.addedDate))
      )
    );

  const options = {};
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <CardHeader>
        <div className="d-flex justify-content-between">
          <h4>{title}</h4>
          <i
            class={`fas fa-caret-${isOpen ? 'up' : 'down'}`}
            onClick={toggleOpen}
          ></i>
        </div>
      </CardHeader>
      <Collapse isOpen={isOpen}>
        <CardBody>
          <Row>
            <Col>
              <small>{transactions.length}Transactions Relized(s)</small>
              <div>
                {transactions
                  .reduce((acc, curr) => {
                    if (!acc.includes(curr.transactionType))
                      acc.push(curr.transactionType);
                    return acc;
                  }, [])
                  .map((type) => {
                    const total = transactions.reduce((ac, cur) => {
                      if (type === 'Achat') ac = ac + cur.origin;
                      else ac = ac + cur.destination;
                      return ac;
                    }, 0);
                    return (
                      <div>
                        <small>
                          <b>{type}</b>:{total}
                        </small>
                      </div>
                    );
                  })}
              </div>
            </Col>
            <Col sm={{ size: 'auto', offset: 2 }}>
              <DateRangePicker onDatesChanges={handleDatesChanges} />
            </Col>
          </Row>

          <TransactionList renderData={{ data: transactions, title: '' }} />
        </CardBody>
      </Collapse>
    </Card>
  );
};

export default TransactionPairFilter;
