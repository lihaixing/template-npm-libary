import React from 'react';
import style from './style.scss';
import CompA from './components/compA';
let CompB: any;
import('./components/compB').then(res => {
  CompB = res.default;
});
const IndexView = () => {
  return (
    <div className={style.container}>
      template: <span className={style.text}>npm library</span>
      <CompA />
      {CompB && <CompB />}
    </div>
  );
};

export default IndexView;
