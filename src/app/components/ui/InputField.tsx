import { InputFieldInterface } from "../../utils/types";

export default function InputField({
  type,
  value,
  setFunction,
  style,
  placeholder,
}: InputFieldInterface) {
  return (
    <input
      className={style}
      type={type}
      value={value}
      onChange={(e) => setFunction(e.target.value)}
      placeholder={placeholder}
    />
  );
}
