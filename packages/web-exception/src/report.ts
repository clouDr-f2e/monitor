import { ReportData } from './types';

/**
 * @file 上报错误动作
 * */
export const defaultReport = (source: ReportData) => {
  console.log('默认上报动作', source);
}
