import { useState } from "react";
import styles from "./InputField.module.css";

const InputField = ({
  type = "text",
  nameAndId,
  textLabel,
  value,
  onChange,
  className = "",
  divClassName = "",
}) => {
  const [focused, setFocused] = useState();
  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div
      className={`${
        type !== "textarea" ? styles.divInput : styles.divTextarea
      } ${divClassName}`}
    >
      {type !== "textarea" ? (
        <input
          onFocus={handleFocus}
          type={type}
          name={nameAndId}
          id={nameAndId}
          placeholder=""
          value={value}
          onChange={onChange}
          className={`${styles.input} ${className}`}
        />
      ) : (
        <textarea
          name={nameAndId}
          id={nameAndId}
          placeholder=""
          value={value}
          onChange={onChange}
          className={`${styles.input} ${className}`}
        ></textarea>
      )}
      <label
        className={`${styles.label} ${focused ? styles.focused : ""}`}
        htmlFor={nameAndId}
      >
        {textLabel}
      </label>
    </div>
  );
};

export default InputField;
