import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchNavigation } from './lib/api';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Alert, Heading } from '@heetch/flamingo-react';
import Sidebar from './components/Sidebar';
import NoMatch from './components/NoMatch';
import ProductsPage from './components/ProductsPage';
import CitiesPage from './components/CitiesPage';

function App() {
  const [navigation, setNavigation] = useState(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchNavigation()
      .then(setNavigation)
      .catch(err => {
        setError(true);
        console.error('Error loading navigation', err);
      });
  }, []);

  if (error) {
    return (
      <div style={{ width: '50%', margin: '0 auto', paddingTop: '100px' }}>
        <Alert type="error">An error occurred while loading the application. Please retry.</Alert>
      </div>
    );
  }

  if (navigation === undefined) {
    return <div className="AppLoader" />;
  }

  return (
    <div className="App">
      <Router>
        <Sidebar tree={navigation.tree} />

        <section>
          <Switch>
            <Route exact path="/">
              <Heading level={1}>Home</Heading>
            </Route>
            <Route path="/products">
              <ProductsPage actions={navigation.actions['/products']} />
            </Route>
            <Route path="/cities/:country">
              <CitiesPage actionsMap={navigation.actions} />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
