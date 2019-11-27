import styled from 'styled-components';


export const Container = styled.div`
  max-width: 500px;
  margin: 35px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.7);
        font-size: 12px;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button {
      margin: 5px 0 0;
      height: 25px;
      background: #003366;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 12px;
      transition: background 0.2s;

      &:hover {
        background: #003366;
      }
    }
  }

  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #FFF;
    font-weight: bold;
    color: #000;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: #FFFF;

    }
  }
`;
