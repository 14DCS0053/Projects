import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './pages/homepage';
import cartpage from './pages/cartpage';
import Navigation from './Components/Navigation';
class App extends Component {
render() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navigation/>
      <Switch>
       <Route path='/' exact render={()=><Home name='yasir'/>}/>
       <Route path='/cart' component={cartpage}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}
}

export default App;
