import React from 'react';

import {Provider} from 'react-redux';
import {store} from './src/redux/configure-store';
import AppContainer from './src/navigation';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
