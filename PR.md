Technical and architectural choices
===================================

Technologies used
-----------------

For this project, ReactJS 16 is used, along with React Router. The components are implemented as function components and use React Hooks to provide state management and side effects.

The correctness of data structures passed between components is ensured by PropTypes.

The UI is built with [@heetch/flamingo-react](https://github.com/heetch/flamingo).

Another possible choice I considered for types correctness is TypeScript, as I am used to work with this technology. But in this case I chose to leave it aside because I have never used it with React and I was concerned it would slow me down too much to perform the assignment in the time allowed. Plus it was a good opportunity to try to model as much as I could with PropTypes.

Data workflow in the application
--------------------------------

The central piece of data the application uses is the response of the `permissions` API. It is used to provide two types of information:

-   The structure of the multi-level navigation, and all the URLs the user can navigate to
-   The data needed to perform API queries in each page displayed to the user (read, add and update operations)

Therefore, my first concern was to process this API response to extract these two information and format them in a way they would be easy to use for the intended purposes.

This meant building a recursive array of navigation items, which is passed to the `Sidebar` component to build the application menu. This array is ordered as instructed, and contains only the visible items.

It also meant building a map between URL slugs and the actions permitted: for each slug, the object containing the URLs and HTTP methods for each API operation is stored, then it is retrieved by the corresponding page (`ProductsPage` and `CitiesPage`) to perform the requests.

As these data are mandatory to do anything meaningful in the application, only a loading spinner is shown to the user as long as it is not available.

Code architecture
-----------------

After a first "naive" version of each part of the application (products and cities), I refactored the code to extract common pieces into more generic components. The structure and basic logic of these two pages is very similar, the only difference being what information is displayed in the list of items. So I created the `WithActions` component which handles all the logic regarding the following:

-   checking the user is allowed to see the current page
-   displaying a loading spinner while the data is loading
-   displaying an error message if the loading fails
-   delegating the rendering of the list to a specific component
-   handling the add/edit workflow, as the same data is editable in both cases (name and description)

For this last part, a second generic component is used: `EditPanel`. It is implemented as a side panel, visible when creating a new item or updating an existing one. The form it contains is the same in both cases, and displays a spinner while the data is sent to the API and an error message if the write operation fails.

Testing
-------

I didn't have the time to cover everything I wanted with automated tests, mainly because I was lacking experience with the testing library for React components. That said, I tried to highlight some important aspects to be tested:

-   The utilities functions in `lib/api.js`, mainly the ones performing some complex processing. In particular the processing of the response of the `permissions` API, described in *Data workflow in the application*.
-   The different *loading state*, *normal state* and *error state* of several components.
-   The consequences of non permitted actions on the UI, like not showing the *Add* button if creating a new item is not permitted.

I would also have liked to test the consequences of succeeding and failing requests to the API, using a tool like [jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock).

Future improvements
-------------------

The error handling is pretty basic here, and a lot could be done to provide a better user experience. For instance, we could implement auto-retry of requests failing for non explicit reasons (network errors, timeouts, etc...).

The initial loading of `permissions`, blocking the application while it is not done, could greatly benefit from a caching strategy, maybe using the ServiceWorker.

In terms of UX, the lengthy multi-level menu for continents and countries could be replaced by a search feature based on autocomplete fields. A map used to select the country by clicking on it could also be considered.
