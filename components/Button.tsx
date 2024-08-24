import { styled } from "nativewind";
import { ReactNode } from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface ButtonProps extends PressableProps {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
}

const variantStyles = {
  default: "rounded-full bg-doia-dark text-white shadow active:bg-doia-dark/90",
  outline: "border border-doia-dark text-doia-dark",
  // primary: "bg-blue-500 text-white",
  // secondary: "bg-white-500 text-black",
};

const sizeStyles = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-12 rounded-md px-6",
  icon: "h-9 w-9",
};

const textStyles = {
  default: "text-white text-base leading-4 ios:pt-1 font-poppins",
  outline: "text-doia-dark text-base leading-4 ios:pt-[3px] font-poppins",
};

const sharedStyle =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300";

function Button({
  children,
  variant = "default",
  size = "default",
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={`${sharedStyle} ${variantStyles[variant]} ${
        sizeStyles[size]
      } ${disabled ? "opacity-50" : ""}  ${className}`}
      disabled={disabled}
      {...props}
    >
      <Text className={`${textStyles[variant]}`}>{children as ReactNode}</Text>
    </Pressable>
  );
}

export default styled(Button, {
  props: {
    variant: true,
    size: true,
  },
});
