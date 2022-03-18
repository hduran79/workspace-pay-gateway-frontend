import React from "react";
import { useField } from "formik";
import { InputFieldUtility } from "pay-gateway-utility";

function InputField({ ...props }) {
  const [field, meta] = useField(props);
  return (
    <InputFieldUtility field={field} meta={meta} { ... props }></InputFieldUtility>
  );
}

export default InputField;
