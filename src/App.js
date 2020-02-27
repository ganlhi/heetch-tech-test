import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchNavigation } from './lib/api';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Heading } from '@heetch/flamingo-react';
import Sidebar from './components/Sidebar';
import NoMatch from './components/NoMatch';

function App() {
  const [navigation, setNavigation] = useState(undefined);

  useEffect(() => {
    fetchNavigation().then(setNavigation);
  }, []);

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
              <Heading level={1}>Products</Heading>
            </Route>
            <Route path="/cities/:country">
              <Heading level={1}>Cities</Heading>
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
