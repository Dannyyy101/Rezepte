import PropTypes from "prop-types";
import { CSSProperties } from "react";

interface NumberInputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  customStyle?: string;
  value: number;
  handleChange: (result: number) => void;
}

export default function NumberInputField({
  customStyle,
  value,
  handleChange,
}: NumberInputFieldProps) {
  const defaultStyle = "border-border border";
  return (
    <input
      type="number"
      value={value === 0 ? "" : value}
      className={`${
        customStyle ? customStyle : defaultStyle
      } min-w10 min-h-4 pl-1 focus:outline-none`}
      onChange={(e) => handleChange(parseInt(e.target.value))}
    />
  );
}
