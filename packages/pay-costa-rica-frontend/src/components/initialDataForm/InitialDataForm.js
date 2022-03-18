import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import emailMask from 'text-mask-addons/dist/emailMask'
import InputField from "../UI/InputField";

const InitialFormSchema = Yup.object().shape({
  email: Yup.string().email("Valor inválido"),
  action: Yup.string().required("Falta completar este campo"),
  amount: Yup.number()
    .min(1, "Ingrese un valor válido")
    .required("Falta completar este campo")
    .transform((o, v) => parseInt(v.replace(/,/g, ''))) 
});

const numberMask = createNumberMask({
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  allowDecimal: true
});

function InitialForm({ onSubmit }) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("/executive/get-balance").then((resp) => {
      setData({ ...resp.data, action: resp.data.balance > 0 ? "T" : "O" });
      setOriginalData({ ...resp.data });
    });
  }, []);

  const handleActionChange = (e) => {
    const { value } = e.target;
    setData({
      ...data,
      balance: value === "T" ? originalData.balance : 0,
      action: value,
    });
  };

  const handleSubmit = (values) => {
    setShowPaymentForm(true);
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={{
        name: data.name,
        identification: data.identification,
        email: data.email,
        action: data.action,
        amount: '' + data.balance,
      }}
      enableReinitialize
      validationSchema={InitialFormSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form noValidate>
          <div className="Grid Grid--withGap Grid--alignCenter u-spaceTop u-text">
            <div className="Grid-cell u-size1of1">
              <InputField
                id="name"
                name="name"
                type="text"
                label="Nombre"
                required
                disabled
              />
            </div>
            <div className="Grid-cell u-md-size1of2 u-sm-size1of1">
              <InputField
                id="identification"
                name="identification"
                type="text"
                label="Identificación"
                required
                disabled
              />
            </div>
            <div className="Grid-cell u-md-size1of2 u-sm-size1of1">
              <InputField
                id="email"
                name="email"
                type="text"
                label="Correo electrónico"
                mask={emailMask}
                disabled={showPaymentForm}
              />
            </div>
            <div className="Grid-cell u-md-size1of2 u-sm-size1of1 u-padBottomNone">
              ¿Qué tipo de pago quieres realizar?
            </div>
            <div className="Grid-cell u-md-size1of2 u-sm-size1of1" />
            <div className="Grid-cell u-md-size1of2 u-sm-size1of1 u-md-padEnds3 u-sm-padEndsNone">
              <div role="group" aria-labelledby="action-radio-group">
                <label className="Toggle" htmlFor="total">
                  <Field
                    id="total"
                    type="radio"
                    name="action"
                    value="T"
                    className="Toggle-state"
                    onChange={handleActionChange}
                    disabled={originalData.balance === 0 || showPaymentForm}
                  />
                  <span className="Toggle-indicator" aria-hidden="true" />
                  <span className="Toggle-text">Pago total</span>
                </label>
                <label className="Toggle u-spaceSides" htmlFor="other">
                  <Field
                    id="other"
                    type="radio"
                    name="action"
                    value="O"
                    className="Toggle-state"
                    onChange={handleActionChange}
                    disabled={showPaymentForm}
                  />
                  <span className="Toggle-indicator" aria-hidden="true" />
                  <span className="Toggle-text">Otro monto</span>
                </label>
              </div>
            </div>
            <div className="Grid-cell u-md-size1of2 u-sm-size1of1">
              <InputField
                id="amount"
                name="amount"
                type="text"
                label="Monto"
                sublabel="(#,###.##)"
                mask={numberMask}
                required
                disabled={values.action === "T" || showPaymentForm}
              />
            </div>
            <div className="Grid-cell">
              <div className="Grid-cell u-textRight">
                <a
                  href="#/form"
                  className="u-padRight u-textUnderline u-cursorPointer"
                >
                  Cancelar pago
                </a>
                <button
                  type="submit"
                  className="Button"
                  disabled={showPaymentForm}
                >
                  Iniciar el pago
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default InitialForm;
