import * as React from 'react';
import * as ReactDOM from 'react-dom';
import View from '../dist';
import '../dist/css/index.css';
// window.addEventListener('error', e => {
//   // prompt user to confirm refresh
//   if (/Loading chunk [\d]+ failed/.test(e.message)) {
//     window.location.reload();
//   }
// });
ReactDOM.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>,
  document.getElementById('root')
);
