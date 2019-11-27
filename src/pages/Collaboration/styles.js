import styled from 'styled-components';


export const Container = styled.div`
  max-width: 500px;
  margin: 35px auto;
  display: block;
  background-color: #fff;
  input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;
      font-size: 9;
      &::placeholder {
        font-size: 9;
        
      }
    }



   button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #003366;
    font-weight: bold;
    color: #FFF;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    &:hover {
      background: green;
    }
  }
  hr {
      border: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }
  
`;


export const Collaborator = styled.div`
  max-width: 500px;
  margin: 35px auto;
  display: block;
  background-color: #fff;

`;