import React, { useEffect } from 'react';

const FormInput = ({ type, name, placeholder, className, value, onChange, untypable, disabled }) => {
  useEffect(() => {
    if (disabled) {
      onChange({ target: { value: '' } }); // pang-clear
    }
  }, [disabled, onChange]);

  const inputProps = {
    type: type,
    id: name,
    name: name,
    placeholder: placeholder,
    className: "p-2.5 w-full",
    value: value,
    onChange: onChange,
    disabled: disabled, //added this for disable handling
    readOnly: untypable, // same as above
  };

  return (
    <div className={className}>
      <label htmlFor={name} className="sr-only">{placeholder}</label>
      <input {...inputProps} />
    </div>
  );
};

export default FormInput;
