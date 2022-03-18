import React from "react";
import MaskedInput from "react-text-mask";

function InputFieldUtility({ field, meta, ...props }) {
  return (
    <div>
      <div
        className={
          meta.error && meta.touched
            ? `Float-placeholder is-invalid`
            : "Float-placeholder"
        }
      >
        {props.mask ? (
          <MaskedInput {...field} {...props} />
        ) : (
          <input {...field} {...props} />
        )}
        <label htmlFor={props.id}>
          {props.label}
          {props.sublabel ? (
            <span className="u-textMercury"> {props.sublabel}</span>
          ) : null}
          {props.required ? <span className="u-textDarkPink">*</span> : null}
        </label>
      </div>
      <span className="u-block u-textShrink1 u-textRed">
        {meta.error && meta.touched ? meta.error : null}
      </span>
    </div>
  );
}

export default InputFieldUtility;
