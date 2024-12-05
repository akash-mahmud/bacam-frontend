import clsx from 'clsx';
import Slider from 'rc-slider';
import type { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';

const classes = {
  base: '[&>.rc-slider-rail]:bg-gray-200 [&>.rc-slider-handle]:opacity-100 [&>.rc-slider-handle-dragging]:none [&>.rc-slider-handle-dragging]:ring-4',
  size: {
    sm: '[&>.rc-slider-rail]:h-0.5 [&>.rc-slider-track]:h-0.5 [&>.rc-slider-handle]:h-3 [&>.rc-slider-handle]:w-3 [&>.rc-slider-handle]:[3px]',
    DEFAULT:
      '[&>.rc-slider-rail]:h-1 [&>.rc-slider-track]:h-1 [&>.rc-slider-handle]:h-4 [&>.rc-slider-handle]:w-4 [&>.rc-slider-handle]:4 [&>.rc-slider-handle]:-mt-1.5',
    lg: '[&>.rc-slider-rail]:h-2 [&>.rc-slider-track]:h-2 [&>.rc-slider-handle]:h-5 [&>.rc-slider-handle]:w-5 [&>.rc-slider-handle]:[5px] [&>.rc-slider-handle]:-mt-1.5',
    xl: '[&>.rc-slider-rail]:h-3 [&>.rc-slider-track]:h-3 [&>.rc-slider-handle]:h-6 [&>.rc-slider-handle]:w-6 [&>.rc-slider-handle]:[6px] [&>.rc-slider-handle]:-mt-1.5',
  },
  color: {
    DEFAULT:
      '[&>.rc-slider-track]:bg-primaryBg [&>.rc-slider-handle]:gray-1000 [&>.rc-slider-handle]:hover:gray-1000 [&>.rc-slider-handle-dragging]:gray-1000 [&>.rc-slider-handle-dragging]:ring-gray-400/60 [&>.rc-slider-step>.rc-slider-dot-active]:gray-1000',
    primary:
      '[&>.rc-slider-track]:bg-primaryBg [&>.rc-slider-handle]:primary-dark [&>.rc-slider-handle]:hover:primary-dark [&>.rc-slider-handle-dragging]:primary-dark [&>.rc-slider-handle-dragging]:ring-primary-light/40 [&>.rc-slider-step>.rc-slider-dot-active]:primary-dark',
    secondary:
      '[&>.rc-slider-track]:bg-secondary [&>.rc-slider-handle]:secondary-dark [&>.rc-slider-handle]:hover:secondary-dark [&>.rc-slider-handle-dragging]:secondary-dark [&>.rc-slider-handle-dragging]:ring-secondary-light/40 [&>.rc-slider-step>.rc-slider-dot-active]:secondary-dark',
    danger:
      '[&>.rc-slider-track]:bg-red [&>.rc-slider-handle]:red-dark [&>.rc-slider-handle]:hover:red-dark [&>.rc-slider-handle-dragging]:red-dark [&>.rc-slider-handle-dragging]:ring-red-light/40 [&>.rc-slider-step>.rc-slider-dot-active]:red-dark',
    info: '[&>.rc-slider-track]:bg-blue [&>.rc-slider-handle]:blue-dark [&>.rc-slider-handle]:hover:blue-dark [&>.rc-slider-handle-dragging]:blue-dark [&>.rc-slider-handle-dragging]:ring-blue-light/40 [&>.rc-slider-step>.rc-slider-dot-active]:blue-dark',
    success:
      '[&>.rc-slider-track]:bg-green [&>.rc-slider-handle]:green-dark [&>.rc-slider-handle]:hover:green-dark [&>.rc-slider-handle-dragging]:green-dark [&>.rc-slider-handle-dragging]:ring-green-light/50 [&>.rc-slider-step>.rc-slider-dot-active]:green-dark',
    warning:
      '[&>.rc-slider-track]:bg-orange [&>.rc-slider-handle]:orange-dark [&>.rc-slider-handle]:hover:orange-dark [&>.rc-slider-handle-dragging]:orange-dark [&>.rc-slider-handle-dragging]:ring-orange-light/60 [&>.rc-slider-step>.rc-slider-dot-active]:orange-dark',
  },
};

export interface RangeSliderProps extends SliderProps {
  /** Sizes of the component are: */
  size?: keyof typeof classes.size;
  /** Change slider color */
  color?: keyof typeof classes.color;
}

const RangeSlider = ({
  size = 'DEFAULT',
  color = 'DEFAULT',
  className,
  ...props
}: RangeSliderProps) => (
  <Slider
    className={clsx(
      classes.base,
      classes.size[size],
      classes.color[color],
      className,
    )}
    {...props}
  />
);

RangeSlider.displayName = 'RangeSlider';
export default RangeSlider;
