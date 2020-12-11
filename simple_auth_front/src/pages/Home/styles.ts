import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: #aaaaff;
    font-size: 64px;
  }
`;

export const ButtonDefault = styled.button`
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

export const ListContainer = styled.div`
  margin: 50px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0,0,0, 0.3);
  border-radius: 10px;


  div {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style-type: none;
    list-style-position: inside;
    border-radius: 8px;

    padding: 10px;

    box-shadow: 0 0 10px rgba(0,0,0, 0.3);



  }
`;

export const DeleteButton = styled.button`
  margin-left: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: #fcc;

  color: #900;

  transition: background-color 0.3s;

  &:hover {
    background-color: #faa;
  }

  &:focus {
    outline: none;
  }
`;