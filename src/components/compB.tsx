import React from 'react';
import { computeSize } from '@/utils';
const IndexView = () => {
  return <div>文件B大小：{computeSize(4000000)}</div>;
};

export default IndexView;
