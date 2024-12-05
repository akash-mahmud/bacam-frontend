/** This is our base component every components must be extend it. */
import {
  space,
  borders,
  borderColor,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  display,
  fontSize,
  flex,
  order,
  alignSelf,
  color,
  compose,
} from 'styled-system';

export const themed = (key) => (props) => props.theme[key];

export const base = compose(
  () => ({ boxSizing: 'box' }),
  space,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  borders,
  borderColor,
  display,
);

base.propTypes = {
  ...display.propTypes,
  ...space.propTypes,
  ...borders.propTypes,
  ...borderColor.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes,
};
