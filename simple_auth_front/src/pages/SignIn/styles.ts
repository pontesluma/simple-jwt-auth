import { Form } from '@unform/web';
import styled from 'styled-components';

export const FormContainer = styled(Form)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormButton = styled.button`
  margin-top: 20px;
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  background-color: #ccf;

  transition: background-color 0.3s;

  &:hover {
    background-color: #aaf;
  }

  &:focus {
    outline: none;
  }
`;