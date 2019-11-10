import {Dimensions} from 'react-native';

const {width: _viewportWidth, height: _viewportHeight} = Dimensions.get(
  'window',
);

export function wp(percentage: number, orientation: string = 'horizontal') {
  const value =
    (percentage *
      (orientation === 'horizontal' ? _viewportWidth : _viewportHeight)) /
    100;
  return Math.round(value);
}

export const viewportWidth = _viewportWidth;
export const viewportHeight = _viewportHeight;
