import React from 'react';
import Providers from './src/utils';

import store from './store';
import {Provider} from "react-redux";

const App = () => {



  return <Provider store ={store}><Providers /></Provider> ;
  





}

export default App;
