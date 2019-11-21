import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo_red.png';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  username: Yup.string().required('Usuario é obrigatório'),
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('Senha é obrigatória'),
  phone: Yup.string()
    .min(11, 'No mínimo 11 caracteres')
    .required('Telefone é obrigatório'),
  cpf: Yup.string()
    .min(11, 'No mínimo 11 caracteres')
    .required('CPF é obrigatório'),
});

export default function Signup() {
  const dispatch = useDispatch();

  function handleSubmit({ username, email, password, name, phone, cpf }) {
    dispatch(signUpRequest(username, email, password, name, phone, cpf));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="username" placeholder="USUARIO" />
        <Input name="email" type="email" placeholder="SEU E-MAIL" />
        <Input name="password" type="password" placeholder="PASSWORD" />
        <Input name="name" type="name" placeholder="SEU NOME" />
        <Input name="phone" type="phone" placeholder="PHONE" />
        <Input name="cpf" type="cpf" placeholder="CPF" />


        <button type="submit">CRIAR CONTA</button>
        <Link to="/">JÁ TENHO CONTA</Link>
      </Form>
    </>
  );
}
