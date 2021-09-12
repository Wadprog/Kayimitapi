import {
  Container,
  Progress,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardFooter,
} from 'reactstrap';

import { useState } from 'react';

import AdminForm from 'components/AppForms/Admin';
import EstablishmentForm from 'components/AppForms/Establishment';
import { useDispatch } from 'react-redux';
import { postAccountDetails } from 'store/account';
const Setup = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const title = ['Admin', 'Establishment'];
  const [admin, setAdmin] = useState(null);

  const handleSubmit = (establishment) => {
    console.log({ admin, establishment });
    dispatch(postAccountDetails({ admin, establishment }));
  };
  const Steps = [
    <AdminForm
      setStep={setCurrentStep}
      step={currentStep}
      setAdmin={setAdmin}
    />,
    <EstablishmentForm setStep={setCurrentStep} handleSubmit={handleSubmit} />,
  ];
  return (
    <Container type="fluid">
      <Card>
        <CardHeader className="bg-transparent pb-5 text-center">
          <CardTitle tag="h4">Your first {title[currentStep]}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Step {currentStep + 1}/{Steps.length}
            <Progress value={((currentStep + 1) / Steps.length) * 100} />
          </CardSubtitle>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">{Steps[currentStep]}</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    </Container>
  );
};

export default Setup;
