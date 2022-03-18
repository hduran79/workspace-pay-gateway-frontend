import React from "react";
import { useField } from "formik";
import { InputField } from "pay-gateway-utility";

function formikInput({ ...props }) {
  const [field, meta] = useField(props);

  return <InputField {...field} {...meta} {...props}></InputField>;
}

export default formikInput;
