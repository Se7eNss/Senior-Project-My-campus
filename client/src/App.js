import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import PageRender from './components/utils/PageRender';
import Notify from './components/notify/Notify';
import {useSelector,useDispatch} from 'react-redux'
import { Cookies } from 'react-cookie';
import { getUser, login } from './redux/actions/authAction';
import { useEffect } from 'react';
import Profile from './components/Profile';

function App() {
  const {auth} = useSelector(state=>state)
  const cookie = new Cookies();
  const token = cookie.get('token');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])
  
  return (
    <Router>
      <Notify/>
      <div className="App">
        <Routes>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/:page" element={<PageRender/>} />
          <Route path="/:page/:id" element={<PageRender/>} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
