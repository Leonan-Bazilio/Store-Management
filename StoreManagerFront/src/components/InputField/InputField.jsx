import { useState } from "react";
import styles from "./InputField.module.css";

const InputField = ({
  type = "text",
  nameAndId,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  const [focused, setFocused] = useState();
  const handleFocus = () => {
    setFocused(true);
  };
  return type !== "textarea" ? (
    <div className={`${styles.divInput}`}>
      <input
        onFocus={handleFocus}
        type={type}
        name={nameAndId}
        id={nameAndId}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${className}`}
      />
      <label
        className={`${styles.label} ${focused ? styles.focused : ""}`}
        htmlFor={nameAndId}
      >
        {placeholder}
      </label>
    </div>
  ) : (
    <textarea
      name={nameAndId}
      id={nameAndId}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${styles.input} ${className}`}
    ></textarea>
  );
};

export default InputField;

/*ajustar onbrur para voltar label ao centro quando nao tiver valor e ajustar div para ter um espaço no top a mais talvez o padding para posicionar a label da forma que quero */
