import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input
          name="oldPassword"
          type="password"
          placeholder="SENHA ATUAL"
        />
        <Input name="password" type="password" placeholder="NOVA SENHA" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="CONFIRMAR SENHA"
        />

        <button type="submit">ATUALIZAR</button>
      </Form>

      <button type="submit" onClick={handleSignOut}>
        SAIR
      </button>

    </Container>
  );
}
