import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

/**
 *
 * @param percentage string or number
 * @function
 * @description takes percentage (string or number) as parameter and returns calculated percentage size as number
 * @returns window width
 */

export const getWindowWidth = (percentage: string | number): number => {
  if (typeof percentage === 'number') {
    return SCREEN_WIDTH * (percentage / 100);
  } else {
    return SCREEN_WIDTH * (Number(percentage.replace('%', '')) / 100);
  }
};

/**
 *
 * @param percentage string or number
 * @function
 * @description takes percentage (string or number) as parameter and returns calculated percentage size as number
 * @returns window height
 */

export const getWindowHeight = (percentage: string | number): number => {
  if (typeof percentage === 'number') {
    return SCREEN_HEIGHT * (percentage / 100);
  } else {
    return SCREEN_HEIGHT * (Number(percentage.replace('%', '')) / 100);
  }
};
