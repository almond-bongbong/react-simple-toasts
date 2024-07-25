import { ReactNode } from 'react';
import { ToastUpdateOptions } from '../type/common';

/**
 * Check if the updateOptions is a ToastUpdateOptions
 * @param updateOptions
 */
export const isToastUpdateOptions = (
  updateOptions: ReactNode | ToastUpdateOptions,
): updateOptions is ToastUpdateOptions => {
  if (updateOptions && typeof updateOptions === 'object') {
    return 'message' in updateOptions || 'duration' in updateOptions || 'loading' in updateOptions;
  }
  return false;
};
