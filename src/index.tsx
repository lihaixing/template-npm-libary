import React, { useState } from 'react';
import style from './style.scss';
import CompA from './components/compA';
import closeIcon from './close_new.svg';
let CompB: any;
import('./components/compB').then(res => {
  CompB = res.default;
});
const IndexView = () => {
  const [showB, setShowB] = useState(false);
  return (
    <div className={style.container}>
      template: <span className={style.text}>npm library</span>
      <img src={closeIcon} alt="" />
      <CompA />
      {CompB && showB && <CompB />}
      <button onClick={() => setShowB(true)}>showB</button>
    </div>
  );
};

export default IndexView;
