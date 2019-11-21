import React from 'react';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {useSelector} from 'react-redux';

// import Notifications from '~/components/Notifications';

import logo from '~/assets/logo_hea.png';

import { Container, Content, Profile } from './styles';

export default function Header() {

  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="oleConsignado" />
          <Link to="/dashboard">SOLUÇÃO CORRESPONDENTE</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <Link to="/dashboard">HOME</Link>
            </div>
            {
              profile.admin === true && ( 
                <>
                <div>
                <Link to="/collaborator">ADICIONAR COLABORADOR</Link>
                </div>
                
                </>
              )
            }
            <div>
                <Link to="/profile">MEU PERFIL</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
