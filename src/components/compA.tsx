import React from 'react';
import { computeSize } from '@/utils';
const IndexView = () => {
  return <div>文件A大小：{computeSize(2000000)}</div>;
};

export default IndexView;
