'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';
import { CheckIcon } from '@/components/icons/check-icon';
import FieldError from '@/components/ui/form-fields/field-error';
import FieldHelperText from '@/components/ui/form-fields/field-helper-text';

const inputClasses = {
  base: 'peer disabled:bg-gray-50 disabled:gray-200',
  size: {
    sm: 'h-4 w-4',
    DEFAULT: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    DEFAULT: 'rounded',
    lg: 'rounded-md',
    circle: 'rounded-full',
  },
  variant: {
    outline: {
      base: 'bg-transparent -gray-300 text-gray checked:!bg-red-1000 focus:ring-transparent checked:gray-1000',
      color: {
        DEFAULT: 'hover:enabled:gray-1000',
        primary: 'hover:enabled:primary',
        secondary: 'hover:enabled:secondary',
        danger: 'hover:enabled:red',
        info: 'hover:enabled:blue',
        success: 'hover:enabled:green',
        warning: 'hover:enabled:orange',
      },
    },
    flat: {
      base: '0',
      color: {
        DEFAULT:
          'bg-gray-200/70 hover:enabled:bg-gray-200/90 focus:ring-gray-900/30 checked:!bg-gray-1000',
        primary:
          'bg-primary-lighter/70 hover:enabled:bg-primary-lighter/90 focus:ring-primary/30 checked:!bg-primary-dark',
        secondary:
          'bg-secondary-lighter/70 hover:enabled:bg-secondary-lighter/90 focus:ring-secondary/30 checked:!bg-secondary-dark',
        danger:
          'bg-red-lighter/70 hover:enabled:bg-red-lighter/90 focus:ring-red/30 checked:!bg-red-dark',
        info: 'bg-blue-lighter/70 hover:enabled:bg-blue-lighter/90 focus:ring-blue/30 checked:!bg-blue-dark',
        success:
          'bg-green-lighter/70 hover:enabled:bg-green-lighter/90 focus:ring-green/30 checked:!bg-green-dark',
        warning:
          'bg-orange-lighter/80 hover:enabled:bg-orange-lighter/90 focus:ring-orange/30 checked:!bg-orange-dark',
      },
    },
    active: {
      base: '"" !bg-gray-0',
      color: {
        DEFAULT: 'gray-900 checked:enabled:gray-1000 focus:ring-gray-900/30',
        primary: 'primary checked:enabled:primary focus:ring-primary/30',
        secondary:
          'secondary checked:enabled:secondary focus:ring-secondary/30',
        danger: 'red checked:enabled:red focus:ring-red/30',
        info: 'blue checked:enabled:blue focus:ring-blue/30',
        success: 'green checked:enabled:green focus:ring-green/30',
        warning: 'orange checked:enabled:orange-dark/70 focus:ring-orange/30',
      },
    },
  },
};

const iconClasses = {
  base: 'peer-checked:opacity-100 absolute opacity-0 text-white top-0 left-0',
  color: {
    DEFAULT: 'text-gray-1000',
    primary: 'text-primary-dark',
    secondary: 'text-secondary-dark',
    danger: 'text-red-dark',
    info: 'text-blue-dark',
    success: 'text-green-dark',
    warning: 'text-orange-dark',
  },
};

const labelClasses = {
  size: {
    text: 'text-sm   font-bold text-gray leading-6',
    margin: {
      start: {
        sm: 'mr-1 rtl:ml-1',
        DEFAULT: 'mr-1.5 rtl:ml-1.5',
        lg: 'mr-2 rtl:ml-2',
        xl: 'mr-2 rtl:ml-2',
      },
      end: {
        sm: 'ml-1 rtl:mr-1',
        DEFAULT: 'ml-1.5 rtl:mr-1.5',
        lg: 'ml-2 rtl:mr-2',
        xl: 'ml-2 rtl:mr-2',
      },
    },
  },
};

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: keyof typeof inputClasses.variant;
  size?: keyof typeof inputClasses.size;
  color?: keyof (typeof inputClasses.variant)['outline']['color'];
  rounded?: keyof typeof inputClasses.rounded;
  labelPlacement?: 'start' | 'end';
  disabled?: boolean;
  label?: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  className?: string;
  activeClassName?: string;
  containerClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = 'outline',
      size = 'DEFAULT',
      rounded = 'DEFAULT',
      color = 'DEFAULT',
      labelPlacement = 'end',
      label,
      disabled,
      error,
      helperText,
      className,
      activeClassName,
      containerClassName,
      iconClassName,
      labelClassName,
      inputClassName,
      errorClassName,
      helperClassName,
      ...checkboxProps
    },
    ref,
  ) => {
    return (
      <div className={clsx('flex flex-col', className, activeClassName)}>
        <label
          className={clsx(
            'flex flex-row items-center',
            disabled && 'cursor-not-allowed',
            containerClassName,
          )}
        >
          <div className="relative leading-none">
            <input
              type="checkbox"
              ref={ref}
              disabled={disabled}
              className={clsx(
                inputClasses.base,
                inputClasses.size[size],
                inputClasses.rounded[rounded],
                inputClasses.variant[variant].base,
                inputClasses.variant[variant].color[color],
                inputClassName,
              )}
              {...checkboxProps}
            />
            <CheckIcon
              className={clsx(
                iconClasses.base,
                inputClasses.size[size],
                size === 'sm' && 'top-0.5',
                variant === 'active' && iconClasses.color[color],
                iconClassName,
              )}
            />
          </div>

          {label && (
            <span
              className={clsx(
                labelClasses.size.text,
                labelClasses.size.margin[labelPlacement][size],
                labelPlacement === 'start' && 'order-first',
                labelClassName,
              )}
            >
              {label}
            </span>
          )}
        </label>

        {!error && helperText && (
          <FieldHelperText size={size} className={helperClassName}>
            {helperText}
          </FieldHelperText>
        )}
        {error && (
          <FieldError size={size} error={error} className={errorClassName} />
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
