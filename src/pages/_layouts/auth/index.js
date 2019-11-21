import React from 'react';
import PropType from 'prop-types';
import { Wrapper, Content } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propType = {
  children: PropType.element.isRequired,
};
