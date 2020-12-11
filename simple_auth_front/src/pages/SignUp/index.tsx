import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';

import { FormContainer, FormButton } from './styles';

interface ISignUpCredentials {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const {signUp} = useAuth();

  const handleSignUp = useCallback(async (data: ISignUpCredentials) => {
    // Simpler validation of them all!!
    if (data.email === '' || data.password === '' || data.name === '') {
      console.log('Invalid entry');
      return;
    }

    await signUp(data);
    history.push('/sign-in')
  }, [signUp, history]);

  return (
    <FormContainer onSubmit={handleSignUp}>
      <Input name="name" type="text" placeholder="Nome" />
      <Input name="email" type="email" placeholder="E-mail" />
      <Input name="password" type="password" placeholder="password" />
      <FormButton type="submit">Sign up</FormButton>
      <Link style={{marginTop: 20, textDecoration: "none"}} to="/sign-in" >Sign in</Link>
    </FormContainer>
  );
}

export default SignUp;