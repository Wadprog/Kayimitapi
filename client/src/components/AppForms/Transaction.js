/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Label, Input } from 'reactstrap';

// Core components
import { Submit, Currency, Field } from '../form';
import { postTransaction } from 'store/transaction';
import { customersList } from 'store/customers';
import { rates, getRates } from 'store/rates';

// CONSTANT FOR TRANSACTIONS TYPES
const _SELL = 'Vente',
  _BUY = 'Achat';

const Transactions = () => {
  const dispatch = useDispatch();
  const rxs = useSelector(rates);
  const ctx = useSelector(customersList);

  useEffect(() => dispatch(getRates()), []);
  const [rateList, setRateList] = useState([]);
  useEffect(() => {
    const newRateList = rxs?.data?.map((rate) => {
      const { _id, buyingValue, sellingValue, buyingLabel, sellingLabel } =
        rate;
      const buyPair = {
        _id,
        label: `${buyingLabel} To ${sellingLabel}`,
        Value: _BUY,
        rate: buyingValue,
      };

      const sellPair = {
        _id,
        label: `${sellingLabel} To ${buyingLabel}`,
        Value: _SELL,
        rate: sellingValue,
      };

      return [buyPair, sellPair];
    });

    setRateList(newRateList.flat());
  }, []);

  const [selectedRate, setSelectedRate] = useState(null);

  const handleSubmit = (formData, formEvents) => {
    let [originLabel, destinationLabel] = selectedRate?.label.split('To');
    const rateId = selectedRate._id;
    originLabel = originLabel.trim();
    destinationLabel = destinationLabel.trim();
    const rateLabel =
      formData.transactionType === _SELL ? originLabel : destinationLabel;
    let data = {
      ...formData,
      originLabel,
      destinationLabel,
      rateLabel,
      rateId,
    };

    if (ctx?.selectedCustomer)
      data = { ...formData, customer: ctx?.selectedCustomer?._id };
    formEvents.resetForm();
    return dispatch(postTransaction(data));
    return console.log({ data });
  };
  const calculateChangeValue = (transactionDetails) => {
    const { transactionType, xChangeRate, origin } = transactionDetails;

    if (!transactionType || !xChangeRate || !origin) return 0;
    if (transactionType === _SELL) return xChangeRate * origin;
    return origin / xChangeRate;
  };

  return (
    <Formik
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
      initialValues={{
        origin: 0,
        xChangeRate: 0,
        transactionType: null,
      }}
    >
      {(props) => (
        <>
          <Row>
            <Col>
              <Input
                type="select"
                onChange={(e) => {
                  const selected = rateList?.find(
                    (rate) => rate.label === e.target.value
                  );
                  props.setFieldValue('xChangeRate', selected.rate);
                  props.setFieldValue('transactionType', selected.Value);
                  setSelectedRate(selected);
                }}
              >
                {rateList?.map((rate) => (
                  <option key={rate.label} value={rate.label}>
                    {rate.label}
                  </option>
                ))}
              </Input>
            </Col>

            <Col>
              <Field
                placeholder="Rate"
                name="xChangeRate"
                disabled={selectedRate ? false : true}
                icon="fas fa-dollar-sign"
                appendText=".00"
                className="text-right"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Currency
                label={selectedRate?.label.split('To')[0]}
                placeholder="Initial amount"
                name="origin"
                disabled={selectedRate ? false : true}
              />
            </Col>
            <Col>
              {selectedRate && (
                <Label>{selectedRate?.label.split('To')[1]}</Label>
              )}
              <div className=" border border-success bg-primary pl-3 py-0 form-control pt-2 rounded text-white text-bold">
                <Currency
                  className="text-bold"
                  value={calculateChangeValue(props.values)}
                  displayType={'text'}
                  //name="ToAmount"
                  name="destination"
                  symbol={selectedRate?.label.split('To')[1]}
                />
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              {selectedRate && (
                <Field
                  readOnly
                  className="border-0 text-bold"
                  name="originLabel"
                  type="text"
                  value={selectedRate?.label.split('To')[0]}
                />
              )}
            </Col>
            <Col>
              {selectedRate && (
                <Field
                  readOnly
                  className="border-0 text-bold p-0 m-0 my-0"
                  name="destinationLabel"
                  type="text"
                  value={selectedRate?.label.split('To')[1]}
                />
              )}
            </Col>
          </Row> */}
          <Submit title="Save Transaction" />
        </>
      )}
    </Formik>
  );
};

export default Transactions;

const ValidationSchema = Yup.object().shape({
  origin: Yup.number().required().label('*Amount To Change*'),
  xChangeRate: Yup.number().required().label('*Change Rate*'),
  transactionType: Yup.string().required().label('Transaction Type'),
});
