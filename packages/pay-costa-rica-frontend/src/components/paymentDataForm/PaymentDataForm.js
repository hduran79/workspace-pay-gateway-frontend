import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Card from "react-credit-cards";
import { InputField } from "pay-gateway-utility";

Yup.addMethod(Yup.string, "creditCardMonth", function (errorMessage) {
  return this.test(`test-card-month`, errorMessage, function (value) {
    const { path, createError } = this;
    const currentDate = value ? value.split("/") : "";
    const currentYear = parseInt(
      new Date().getFullYear().toString().slice(2),
      10
    );

    return (
      (value &&
        value.length === 5 &&
        currentDate[0] &&
        currentDate[1] &&
        currentDate[0] > 0 &&
        currentDate[0] < 13 &&
        currentDate[1] >= currentYear &&
        currentDate[1] < currentYear + 11) ||
      createError({ path, message: errorMessage })
    );
  });
});

const PayFormSchema = Yup.object().shape({
  number: Yup.number()
    .required("Falta completar este campo")
    .typeError("Verifica la información ingresada"),
  expiry: Yup.string()
    .required("Falta completar este campo")
    .creditCardMonth("Ingrese una fecha válida"),
  cvc: Yup.number()
    .required("Falta completar este campo")
    .typeError("Verifica la información ingresada"),
});

const creditCardMask = (input) =>
  validateFormat(
    input,
    15,
    [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      /\d/,
    ],
    [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ]
  );
const expiryMask = [/[0-9]/, /\d/, "/", /\d/, /\d/];
const cvcMask = (input) =>
  validateFormat(input, 3, [/\d/, /\d/, /\d/], [/\d/, /\d/, /\d/, /\d/]);

const validateFormat = (input, condition, op1, op2) => {
  const numbers = input.match(/\d/g);
  let length = 0;

  if (numbers) {
    length = numbers.join("").length;
  }

  if (length === condition) {
    return op1;
  } else {
    return op2;
  }
};

function PayForm({ initialData, onSubmit }) {
  const [focus, setFocus] = useState("");

  const handleFocusCode = (e) => {
    setFocus(e.target.name);
  };

  const handleSubmit = (values) => {
    values.number = values.number.replace(/ /g, "");
    values.expiry = values.expiry.replace("/", "");
    onSubmit(values);
  };

  const cardConfig = {
    labels: { valid: "FECHA EXP." },
    placeholders: { name: "NOMBRE DE LA TARJETA" },
  };

  return (
    <Formik
      initialValues={{
        number: "",
        expiry: "",
        cvc: "",
      }}
      validationSchema={PayFormSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <>
          <Form noValidate>
            <div className="Grid Grid--withGap Grid--alignCenter u-spaceTop u-text">
              <div className="Grid-cell u-md-size1of2 u-sm-size1of1">
                <div className="u-spaceBottom">
                  <p className="u-textBold">Nombre</p>
                  <p>{initialData.name}</p>
                </div>
                <div className="u-spaceBottom">
                  <p className="u-textBold">Identificación</p>
                  <p>{initialData.identification}</p>
                </div>
                <div className="u-spaceBottom">
                  <p className="u-textBold">Email</p>
                  <p>{initialData.email}</p>
                </div>
                <div>
                  <p className="u-textBold">Valor</p>
                  <p>₡{initialData.amount}</p>
                </div>
              </div>

              <div className="Grid-cell u-md-size1of2 u-sm-size1of1">
                <Card
                  name=""
                  number={values.number}
                  expiry={values.expiry}
                  cvc={values.cvc}
                  focused={focus}
                  locale={cardConfig.labels}
                  placeholders={cardConfig.placeholders}
                />
              </div>
              <div className="Grid-cell u-size1of1">
                <InputField
                  id="number"
                  name="number"
                  type="text"
                  label="Número de la tarjeta"
                  mask={creditCardMask}
                  required
                  onFocus={handleFocusCode}
                />
              </div>
              <div className="Grid-cell u-md-size1of2 u-sm-size1of1">
                <InputField
                  id="expiry"
                  name="expiry"
                  type="text"
                  label="Fecha de vencimiento"
                  sublabel="(MM/YY)"
                  mask={expiryMask}
                  required
                  onFocus={handleFocusCode}
                />
              </div>
              <div className="Grid-cell u-md-size1of2 u-sm-size1of1">
                <InputField
                  id="cvc"
                  name="cvc"
                  type="text"
                  label="Código de seguridad"
                  sublabel="(CVV)"
                  mask={cvcMask}
                  required
                  onFocus={handleFocusCode}
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
                  <button type="submit" className="Button">
                    Pagar
                  </button>
                </div>
              </div>
            </div>
          </Form>
          {/* <section class="Modal js-Modal " id="help-modal" aria-hidden="true">
            <div class="Modal-overlay" tabindex="-1" data-a11y-dialog-hide></div>
            <div class="Modal-dialog Modal-dialog--wide" role="dialog" aria-labelledby="help-modal-title">
              <div class="Modal-document" role="document">
                <div class="Modal-header">
                  <button class="Modal-close" data-a11y-dialog-hide>
                    <svg width="26" height="26" viewBox="0 0 26 26" focusable="false" role="presentation" class="Icon Icon--block u-textGrow1">
                      <g transform="rotate(45,13,13)">
                        <line x1="13" y1="2" x2="13" y2="24" fill="none" stroke-width="4" />
                        <line x1="2" y1="13" x2="24" y2="13" fill="none" stroke-width="4" />
                      </g>
                    </svg>
                    <span class="u-hiddenVisually">Close this dialog window</span>
                  </button>
                  <h1 class="Modal-title" id="demo-wide-modal-title">
                    Wide Modal
                  </h1>
                </div>
                <div class="Modal-main">
                  <div class="Modal-content u-staggerItems1">
                    <p>Oja uk noh hamup livewa fora ig efovo turhi bib rifakode kihdokko rojamo wic wiv tu nuca wezokbig. Fah hacofzen baed wit mes mi geji piata muc zis jaw gek.</p>
                    <p>Gufo fizof epuza zet wekawa igo une liz iw hahol cadawsof naf jolgel eropa lejnulgof. Ri vocowa lugi imafapa adtumud hamruru gid opuas migne nimeftet az raru nufsadgu gesodi ejpohvo divuwna tuwe goc.</p>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </>
      )}
    </Formik>
  );
}

export default PayForm;
