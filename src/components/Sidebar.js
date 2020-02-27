import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@heetch/flamingo-react';
import { NavigationItemShape } from '../lib/proptypes';
import NavItems from './NavItem';

function Sidebar({ tree }) {
  return (
    <aside>
      <Heading level={2}>Menu</Heading>

      <nav>
        <NavItems items={tree} />
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  tree: PropTypes.arrayOf(NavigationItemShape).isRequired,
};

export default Sidebar;
