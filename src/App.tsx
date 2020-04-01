import React, { Suspense } from 'react';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

const LoginPage = React.lazy(() => import('./Containers/LoginPage'));

function App() {
  return (
    <Suspense fallback={<p>Loading....</p>}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={LoginPage} />
          <Redirect to='/login' />
        </Switch>
      </BrowserRouter>
    </Suspense >
  );
}

export default App;
