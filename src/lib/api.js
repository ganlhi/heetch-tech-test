const API_BASE_URL = 'https://heetchfrontendtest.now.sh/@ganlhi';

function compareByOrder(a, b) {
  return a.order - b.order;
}

/**
 * Permissions
 */

export function fetchPermissions() {
  return fetch(`${API_BASE_URL}/permissions`).then(res => res.json());
}

/**
 * Navigation
 */

export function fetchNavigation() {
  return fetchPermissions().then(permissionsToNavigation);
}

export function permissionsToNavigation(permissions) {
  return sortPermissions(permissions).reduce(
    (nav, { name, item }) => {
      if (item.actions.show !== true) return nav;

      const slug = item.slug?.replace(/\/$/, '');

      let actions = nav.actions;
      if (typeof slug === 'string' && slug.length > 0) {
        actions = { ...actions, [slug]: item.actions };
      }

      const navItem = {
        name,
        slug,
      };

      if (typeof item.children === 'object') {
        const { tree: childrenTree, actions: childrenActions } = permissionsToNavigation(item.children);
        actions = { ...actions, ...childrenActions };
        navItem.children = childrenTree;
      }

      return { tree: [...nav.tree, navItem], actions };
    },
    { tree: [], actions: {} }
  );
}

function sortPermissions(permissions) {
  return Object.keys(permissions)
    .map(name => ({ name, item: permissions[name] }))
    .sort(({ item: a }, { item: b }) => compareByOrder(a, b));
}

/**
 * Products
 */

export function fetchProducts(url, method) {
  return fetch(url, { method })
    .then(res => res.json())
    .then(({ products }) => Object.values(products).sort(compareByOrder));
}

export function saveProduct(url, method, product) {
  const { id, name, description } = product;
  const completeUrl = !id ? url : url.replace('{id}', id);
  const body = !id ? { name, description } : { name, description, id };

  return fetch(completeUrl, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Cities
 */

export function getCountryCode(actions) {
  if (!actions || !actions.getItems) return undefined;
  const matches = actions.getItems.URL.match(/countryCode=([^&]+)/);
  if (matches && matches.length > 1) {
    return matches[1];
  }
  return undefined;
}

export function fetchCities(url, method) {
  return fetch(url, { method })
    .then(res => res.json())
    .then(({ cities, capital, name }) => ({
      country: name,
      capital,
      cities: Object.values(cities).sort(compareByOrder),
    }));
}

export function saveCity(url, method, countryCode, city) {
  const { id, name, description } = city;
  const completeUrl = !id ? url : url.replace('{id}', id);
  const body = !id ? { name, description, countryCode } : { name, description, countryCode, id };

  return fetch(completeUrl, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
