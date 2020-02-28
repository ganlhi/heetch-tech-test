import PropTypes from 'prop-types';

/**
 * Actions permitted for a given slug
 */

export const Actions = PropTypes.shape({
  show: PropTypes.bool,
  getItems: PropTypes.shape({ type: PropTypes.string.isRequired, URL: PropTypes.string.isRequired }),
  updateItem: PropTypes.shape({ type: PropTypes.string.isRequired, URL: PropTypes.string.isRequired }),
  addItem: PropTypes.shape({ type: PropTypes.string.isRequired, URL: PropTypes.string.isRequired }),
});

export const ActionsMap = PropTypes.objectOf(Actions.isRequired);

/**
 * Navigation menu items
 */

const NavigationItem = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string,
};

const NavigationItemShape = PropTypes.shape(NavigationItem);
NavigationItem.children = PropTypes.arrayOf(NavigationItemShape);

export { NavigationItemShape };

/**
 * Products
 */

export const Product = PropTypes.shape({
  id: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  status: PropTypes.string,
});
