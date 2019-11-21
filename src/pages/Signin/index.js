import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/Logotipo-branco.png';

export default function Signin() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ cpf, password }) {
    dispatch(signInRequest(cpf, password));
  }

  return (
    <>
      <img src={logo}  style={{width: '250px'}} alt="Ole consignado" />

      <Form  onSubmit={handleSubmit}>
        <Input name="cpf" type="cpf" placeholder="CPF" />
        <Input name="password" type="password" placeholder="SENHA" />

        <button type="submit">{loading ? 'Carregando...' : 'ENTRAR'}</button>
     
      </Form>
    </>
  );
}
