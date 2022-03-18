import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InitialDataForm from "./initialDataForm/InitialDataForm";
import PaymentDataForm from "./paymentDataForm/PaymentDataForm";


function PayForm() {
  let navigate = useNavigate();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [paymentData, setPaymentData] = useState({});

  const handleSubmitInitialData = (data) => {
    setShowPaymentForm(true);
    setInitialData(data);
    setPaymentData({ email: data.email, amount: data.amount.replace(",", "") });
  };

  const handleSubmitPaymentData = (values) => {
    const data = { ...paymentData, ...values };
    axios.post("/executive/make-payment", data).then((resp) => {
      navigate(`/response/${resp.data}`);
    });
  };

  return (
    <>
      {!showPaymentForm ? (
         <InitialDataForm onSubmit={handleSubmitInitialData} />
      ) : (
        <PaymentDataForm initialData={initialData} onSubmit={handleSubmitPaymentData} />
      )}
    </>
  );
}

export default PayForm;
