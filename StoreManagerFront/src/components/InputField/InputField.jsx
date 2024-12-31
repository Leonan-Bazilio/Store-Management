import styles from "./InputField.module.css";

const InputField = ({
  type = "text",
  nameAndId,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return type !== "textarea" ? (
    <input
      type={type}
      name={nameAndId}
      id={nameAndId}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${styles.input} ${className}`}
    />
  ) : (
    <textarea
      name={nameAndId}
      id={nameAndId}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${styles.input} ${className}`}
    ></textarea>
  ); // basicamente gambiarra pois não queria fazer separado para textarea sendo que vou utilizar ele so uma vez( ou solução tecnica alternativa)
};

export default InputField;
