import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

const routes: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} isPrivate/>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
    </Router>
  );
}

export default routes;