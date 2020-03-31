import React from 'react';
import './App.css';
import List from './components/List'
import Bookmarks from './components/Bookmarks'
import {
  BrowserRouter,
  Route
} from "react-router-dom";





const App = (props) => {

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Route path='/bookmarks' component={Bookmarks} />
        <Route path='/list' component={List} />
      </div>
    </BrowserRouter>
  )
}


export default App;
