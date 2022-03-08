import React from "react";

import styles from "./RegisterInput.module.scss";
const Input: React.FC<any> = ({
  inputError,
  value,
  setValue,
  inputRef,
  LeftIcon,
  RightIcon,
  type,
  label,
  placeholder,
  focus,
  changeInputType,
  rightIconTitle,
}) => {
  return (
    <div className={styles.register__input}>
      <div className={styles.register__input__field}>
        {LeftIcon ? (
          <LeftIcon className={styles.register__input__icon} />
        ) : null}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          autoFocus={focus}
        />
        {RightIcon ? (
          <RightIcon
            title={rightIconTitle}
            className={styles.register__input__field__icon}
            onClick={() => {
              if (inputRef.current.getAttribute("type") === "password") {
                inputRef.current.setAttribute("type", "text");
                changeInputType(true);
              } else {
                inputRef.current.setAttribute("type", "password");
                changeInputType(false);
              }
            }}
          />
        ) : null}
      </div>
      <p>{inputError}</p>
    </div>
  );
};

export default Input;
