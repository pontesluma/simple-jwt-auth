import React from 'react';
import { Redirect, Route as ReactDOMRoute, RouteProps as ReactDomRouteProps } from 'react-router-dom';
import {useAuth} from '../hooks/auth';

interface IRouteProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}


const Route: React.FC<IRouteProps> = ({isPrivate = false, component: Component, ...rest}) => {
  const { user } = useAuth();

  return (<ReactDOMRoute
    {...rest}
    render={({ location }) => {
      return isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: isPrivate ? '/sign-in' : '/',
            state: { from: location },
          }}
        />
      );
    }}
  />);
}

export default Route;