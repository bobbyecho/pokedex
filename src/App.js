import React from 'react';
import { store } from '@src/Store';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNavigation from '@navigations/index';

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigation />
      </PaperProvider>
    </Provider>
  );
}

export default App;
