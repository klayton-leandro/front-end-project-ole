import React from 'react';
import PropType from 'prop-types';

import Header from '~/components/Header';
import { Wrapper } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propType = {
  children: PropType.element.isRequired,
};
