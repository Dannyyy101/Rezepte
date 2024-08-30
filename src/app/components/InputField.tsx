import { InputFieldInterface } from "../utils/types";

export default function InputField({
  type,
  value,
  setFunction,
  style,
  placeholder,
}: InputFieldInterface) {
  return (
    <input
      className="w-full h-10 text-text pl-2 pr-2 focus: outline-none border-primary border-2 bg-background"
      type={type}
      value={value}
      onChange={(e) => setFunction(e.target.value)}
      placeholder={placeholder}
    />
  );
}
