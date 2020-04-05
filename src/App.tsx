import React, { Suspense } from 'react';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import DashBoardTabLoader from './Components/DashBoardTabLoader';

const LoginPage = React.lazy(() => import('./Containers/LoginPage'));
const HomePage = React.lazy(() => import('./Containers/HomePage'));

function App(props: any) {
  return (
    <Suspense fallback={<DashBoardTabLoader />}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={LoginPage} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/home' exact component={HomePage} />
          <Route path='' exact render={() => {
            return (
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
              />
            )
          }} />
          <Redirect to='/login' />
        </Switch>
      </BrowserRouter>
    </Suspense >
  );
}

export default App;
