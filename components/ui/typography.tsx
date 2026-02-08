import { cn } from "@/lib/utils";
import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function TypographyH1({
  className,
  as: Component = "h1",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-foreground font-serif text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH2({
  className,
  as: Component = "h2",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-foreground border-b pb-2 font-serif text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH3({
  className,
  as: Component = "h3",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-foreground font-serif text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH4({
  className,
  as: Component = "h4",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-foreground font-serif text-2xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function TypographyP({
  className,
  as: Component = "p",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "text-foreground font-serif text-lg leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  );
}

export function TypographyLead({
  className,
  as: Component = "p",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "text-foreground font-serif text-xl leading-8",
        className
      )}
      {...props}
    />
  );
}

export function TypographyBlockquote({
  className,
  as: Component = "blockquote",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "text-foreground mt-6 border-l-2 pl-6 font-serif italic",
        className
      )}
      {...props}
    />
  );
}

