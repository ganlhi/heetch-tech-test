import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Item } from '@heetch/flamingo-react';
import { NavLink } from 'react-router-dom';
import { NavigationItemShape } from '../lib/proptypes';

/**
 * Multi-level navigation menu
 * @param items Array of navigation items (recursive)
 */
function NavItems({ items }) {
  return items.map(item => <NavItem key={item.name} item={item} />);
}

NavItems.propTypes = {
  items: PropTypes.arrayOf(NavigationItemShape),
};

/**
 * Displays a single navigation item
 * @param name Display name
 * @param slug URL slug to route to
 * @param children Sub-menu items
 */
function NavItem({ item: { name, slug, children } }) {
  const [expanded, setExpanded] = useState(false);

  if (slug) {
    return (
      <Item size="sub" valueIcon={null}>
        <NavLink to={slug} className="f-UiText--content" activeClassName="f-Link">
          {name}
        </NavLink>
      </Item>
    );
  } else {
    return (
      <>
        <Item
          size="sub"
          onClick={() => setExpanded(!expanded)}
          valueIcon={expanded ? 'IconChevronDown' : 'IconChevronRight'}
        >
          {name}
        </Item>
        {expanded && <div style={{ marginLeft: '16px' }}>{children && <NavItems items={children} />}</div>}
      </>
    );
  }
}

NavItem.propTypes = {
  item: NavigationItemShape,
};

export default NavItems;
