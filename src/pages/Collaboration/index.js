import React from 'react';
import { useDispatch } from 'react-redux';


import { Form, Input } from '@rocketseat/unform';


import { Container, Collaborator } from './styles';

import { signUpCollaboration } from '~/store/modules/auth/actions';
import { MdCenterFocusStrong } from 'react-icons/md';

export default function Profile() {

  const dispatch = useDispatch();

  function handleSubmit({name, password, email, cpf, phone}) {
    dispatch(signUpCollaboration(name, password, email, cpf, phone));
  }
return (
    <Container>
      < hr />
      <h1 style={{color:"#000", fontSize: 19, textAlign: 'center' }}>ADICIONAR UM NOVO COLABORADOR</h1>
        <Collaborator>
          
        <Form className="px-4 py-3"  onSubmit={handleSubmit} >
        
          <Input type="name" name="name" className="form-control"  placeholder="Nome" />
          <Input type="password" name="password" className="form-control" placeholder="Senha" />
          <Input type="email"  name="email" className="form-control" placeholder="E-mail" />
          <Input type="cpf" name="cpf" className="form-control"  placeholder="CPF"/>
          <Input type="phone" name="phone" className="form-control" placeholder="11-99999-9999" />
       
        <button type="submit">REGISTRAR</button>
        </Form>
        </Collaborator>
   
    </Container>
  );
}