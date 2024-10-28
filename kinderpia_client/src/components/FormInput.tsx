import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  register: UseFormRegister<any>;
  requiredMessage: string;
  regexMessage?: string;
  regex?: RegExp;
  placeholder?: string;
  clearInput: () => void;
  error?: string;
  showPasswordToggle?: () => void;
  eyeIconClass?: string;
  isPassword?: boolean;
}

const FormInput: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  register,
  requiredMessage,
  regexMessage,
  regex,
  placeholder,
  clearInput,
  error,
  showPasswordToggle,
  eyeIconClass,
  isPassword,
}) => {
  return (
    <div className="input-wrap">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, {
          required: requiredMessage,
          ...(regex && regexMessage
            ? {
                pattern: {
                  value: regex,
                  message: regexMessage,
                },
              }
            : {}),
        })}
        placeholder={placeholder}
        aria-required="true" // 필수 입력 필드임을 명시
        aria-invalid={!!error} // 에러 여부를 명시
        aria-describedby={`${id}-error`} // 에러 메시지와 연결
        onFocus={(e) => {
          const labelElem = e.target.previousElementSibling;
          if (labelElem && !e.target.value) {
            labelElem.classList.add('shrink');
          }
        }}
        onBlur={(e) => {
          const labelElem = e.target.previousElementSibling;
          if (labelElem && !e.target.value) {
            labelElem.classList.remove('shrink');
          }
        }}
      />
      {isPassword && (
        <>
          <span
            className={`${eyeIconClass} eye-icon`}
            onClick={showPasswordToggle}
            tabIndex={0}
            role="button"
            aria-label={
              type === 'password' ? '비밀번호 보이기' : '비밀번호 숨기기'
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (showPasswordToggle) {
                  showPasswordToggle(); // Enter로 비밀번호 보이기
                }
              }
            }}
          ></span>
        </>
      )}
      <span
        className="xi-close-circle eraser-icon"
        onClick={clearInput}
        tabIndex={0}
        role="button" // 버튼역할 명시
        aria-label={`${label} 지우기`} // 스크린리더를 위한 설명
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            clearInput(); // Enter키로 지우기
          }
        }}
      ></span>
      {error && (
        <div className="errmsg-box" id={`${id}-error`} role="alert">
          <span className="err-msg">{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormInput;
