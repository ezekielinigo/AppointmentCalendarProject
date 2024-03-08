const FormInput = ({type, name, placeholder, className, value, onChange}) => (
    <div className={className}>
      <label htmlFor={name} className="sr-only">{placeholder}</label>
      <input type={type} id={name} name={name} placeholder={placeholder} className="p-2.5 w-full" value={value} onChange={onChange} />
    </div>
  );

export default FormInput;