import React, { useCallback } from 'react';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { Link, useHistory } from 'react-router-dom';

import { FormContainer, FormButton } from './styles';

interface ISignCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {signIn} = useAuth();
  const history = useHistory();

  const handleSignIn = useCallback(async (data: ISignCredentials) => {
    const user = await signIn(data);

    if (!user.email) {
      console.log('Erro na autenticação')
      return;
    }

    history.push('/');

  }, [history, signIn]);
  
  return (
      <FormContainer onSubmit={handleSignIn}>
        <Input name="email" type="email" placeholder="E-mail"/>
        <Input name="password" type="password" placeholder="Senha"/>
        <FormButton type="submit">Sign in</FormButton>
        <Link style={{marginTop: 20, textDecoration: "none"}} to="/sign-up" >Criar conta</Link>
      </FormContainer>
  );
}

export default SignIn;