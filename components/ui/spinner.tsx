import React from "react";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  color = "#f97215",
}) => {
  const spinnerSize =
    size === "small"
      ? "w-4 h-4 border-2"
      : size === "medium"
      ? "w-8 h-8 border-4"
      : "w-12 h-12 border-4";

  return (
    <div
      className={`${spinnerSize} border-t-transparent border-solid border-${color} rounded-full animate-spin`}
      style={{
        borderTopColor: "transparent",
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: color,
      }}
    />
  );
};

export default Spinner;

// #f97215
