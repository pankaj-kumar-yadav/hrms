import { type ComponentPropsWithoutRef } from "react";

function mergeClasses(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

type NavbarRootProps = ComponentPropsWithoutRef<"header">;
type NavbarSlotProps = ComponentPropsWithoutRef<"div">;

function NavbarRoot({ className, ...props }: NavbarRootProps) {
  return (
    <header
      className={mergeClasses(
        "ui:flex ui:w-full ui:items-center ui:justify-between ui:gap-4",
        className,
      )}
      {...props}
    />
  );
}

function NavbarLeft({ className, ...props }: NavbarSlotProps) {
  return (
    <div
      className={mergeClasses(
        "ui:flex ui:min-w-0 ui:items-center ui:gap-3",
        className,
      )}
      {...props}
    />
  );
}

function NavbarMain({ className, ...props }: NavbarSlotProps) {
  return (
    <div
      className={mergeClasses("ui:flex ui:min-w-0 ui:flex-1 ui:items-center", className)}
      {...props}
    />
  );
}

function NavbarRight({ className, ...props }: NavbarSlotProps) {
  return (
    <div
      className={mergeClasses(
        "ui:flex ui:items-center ui:justify-end ui:gap-3",
        className,
      )}
      {...props}
    />
  );
}

type NavbarComponent = typeof NavbarRoot & {
  Left: typeof NavbarLeft;
  Main: typeof NavbarMain;
  Right: typeof NavbarRight;
};

export const Navbar = Object.assign(NavbarRoot, {
  Left: NavbarLeft,
  Main: NavbarMain,
  Right: NavbarRight,
}) as NavbarComponent;
