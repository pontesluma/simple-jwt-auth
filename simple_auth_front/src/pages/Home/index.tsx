import React, { useCallback, useEffect, useRef, useState } from 'react';
import {useAuth} from '../../hooks/auth';
import Input from '../../components/Input';

import { Container, ButtonDefault, ListContainer, DeleteButton } from './styles';
import { Form } from '@unform/web';
import api from '../../services/api';
import { FormHandles } from '@unform/core';

const Home: React.FC = () => {
  const {user, signOut} = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [toDoList, setToDoList] = useState<{text: string, id: string}[]>([]);

  const handleAddToDo = useCallback(async (data: {toDo: string}) => {
    if (data.toDo === '') return;
    const response = await api.post('/todo', {todo:data.toDo});
    setToDoList([...toDoList, response.data]);
    formRef.current?.reset();
  }, [toDoList]);

  const handleDeleteItem = useCallback((id: string) => {
    api.delete(`/todo/${id}`).then(() => {
      const aux = toDoList.filter(item => item.id !== id);
      setToDoList(aux);
    });
  }, [toDoList]);

  useEffect(() => {
    const LoadData = async() => {
      const response = await api.get('/todo');
      setToDoList(response.data.todo);
    }
    LoadData();
  }, []);

  return (<Container>
    <h1>Hello, {user.name}!</h1>
    <div>
      <ListContainer>
          {toDoList.map(toDo => (
            <div key={toDo.id}>
              {toDo.text}
              <DeleteButton type="button" onClick={() => handleDeleteItem(toDo.id)}>x</DeleteButton>
            </div>
          ))}
        <Form onSubmit={handleAddToDo} ref={formRef}>
          <Input name="toDo" type="text" placeholder="Crie um novo item"/>
          <ButtonDefault type="submit">+</ButtonDefault>
        </Form>
      </ListContainer>
    </div>
    <ButtonDefault type="button" onClick={signOut}>Sign Out</ButtonDefault>
  </Container>);
}

export default Home;