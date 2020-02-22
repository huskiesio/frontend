import React from 'react';
import './styles/main.scss';

const App = ({ Component, pageProps }: {Component: React.ComponentType, pageProps: any}) => {
  return <Component {...pageProps} />
}

export default App;
