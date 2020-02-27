import PropTypes from 'prop-types';

export const Actions = PropTypes.shape({
  show: PropTypes.bool,
  getItems: PropTypes.shape({ type: PropTypes.string.isRequired, URL: PropTypes.string.isRequired }),
  updateItem: PropTypes.shape({ type: PropTypes.string.isRequired, URL: PropTypes.string.isRequired }),
  addItem: PropTypes.shape({ type: PropTypes.string.isRequired, URL: PropTypes.string.isRequired }),
});

export const ActionsMap = PropTypes.objectOf(Actions.isRequired);

const NavigationItem = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string,
};

const NavigationItemShape = PropTypes.shape(NavigationItem);
NavigationItem.children = PropTypes.arrayOf(NavigationItemShape);

export { NavigationItemShape };
