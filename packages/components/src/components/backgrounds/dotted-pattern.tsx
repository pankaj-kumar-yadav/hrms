import { type CSSProperties } from "react";

type DottedPatternProps = {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  gap?: number;
  backgroundColor?: string;
  style?: CSSProperties;
};

export function DottedPattern({
  className,
  dotColor = "#e3e0ea",
  dotSize = 1,
  gap = 11,
  backgroundColor = "transparent",
  style,
}: DottedPatternProps) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        backgroundColor,
        backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        ...style,
      }}
    />
  );
}
