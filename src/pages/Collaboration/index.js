import React from 'react';
import { useDispatch } from 'react-redux';


import { Form, Input } from '@rocketseat/unform';


import { Container } from './styles';

import { signUpCollaboration } from '~/store/modules/auth/actions';

export default function Profile() {

  const dispatch = useDispatch();

  function handleSubmit({name, password, email, cpf, phone}) {
    dispatch(signUpCollaboration(name, password, email, cpf, phone));
  }
return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light">
          <h5 style={{color:"#000", fontSize: 12}}>ADICIONAR UM NOVO COLABORADOR</h5>
        <Form className="px-4 py-3"  onSubmit={handleSubmit} >
        
          <Input type="name" name="name" className="form-control"  placeholder="Nome" />
          <Input type="password" name="password" className="form-control" placeholder="Senha" />
          <Input type="email"  name="email" className="form-control" placeholder="E-mail" />
          <Input type="cpf" name="cpf" className="form-control"  placeholder="CPF"/>
          <Input type="phone" name="phone" className="form-control" placeholder="11-99999-9999" />
       
        <button type="submit">REGISTRAR</button>
        </Form>
        </ol>
      </nav>
    </Container>
  );
}