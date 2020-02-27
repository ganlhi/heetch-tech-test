import { permissionsToNavigation } from './api';

test('can build navigation from permissions', () => {
  const permissions = {
    a: {
      order: 2,
      actions: { show: true },
      children: {
        aa: {
          order: 1,
          actions: { show: true, getItems: { type: 'GET', URL: '/a/aa' } },
          slug: '/aa',
        },
        ab: {
          order: 3,
          actions: { show: true, getItems: { type: 'GET', URL: '/a/ab' } },
          slug: '/ab',
        },
        ac: {
          order: 2,
          actions: { show: true, getItems: { type: 'GET', URL: '/a/ac' } },
          slug: '/ac',
        },
        ad: {
          order: 4,
          actions: { show: false },
          slug: '/ad',
        },
      },
    },
    b: {
      order: 3,
      actions: { show: false },
    },
    c: {
      order: 1,
      actions: { show: true, getItems: { type: 'GET', URL: '/c' } },
      slug: '/c',
    },
  };

  const navigation = permissionsToNavigation(permissions);

  expect(navigation).toEqual({
    tree: [
      { name: 'c', slug: '/c' },
      {
        name: 'a',
        children: [
          { name: 'aa', slug: '/aa' },
          { name: 'ac', slug: '/ac' },
          { name: 'ab', slug: '/ab' },
        ],
      },
    ],
    actions: {
      '/aa': { show: true, getItems: { type: 'GET', URL: '/a/aa' } },
      '/ab': { show: true, getItems: { type: 'GET', URL: '/a/ab' } },
      '/ac': { show: true, getItems: { type: 'GET', URL: '/a/ac' } },
      '/c': { show: true, getItems: { type: 'GET', URL: '/c' } },
    },
  });
});
