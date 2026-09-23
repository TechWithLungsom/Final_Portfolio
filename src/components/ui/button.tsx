import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
const styles = cva('button', { variants: { variant: { primary: 'button-primary', outline: 'button-outline' } }, defaultVariants: { variant: 'primary' } });
export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof styles> & { asChild?: boolean }>(({ className, variant, asChild = false, ...props }, ref) => {
 const Comp = asChild ? Slot : 'button';
 return <Comp ref={ref} className={twMerge(clsx(styles({ variant }), className))} {...props}/>;
});
Button.displayName = 'Button';
