import React from 'react';
import './app.css'
import Logo from '../src/components/Logo'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import SideBar from './components/SideBar'
import Bookmarks from './components/Bookmarks/Bookmarks'
import Homefeed from './components/Homefeed/Homefeed'
import Notifications from './components/Notifications/Notifications'
import Profile from './components/Profile/Profile'
import TweetDetails from './components/TweetDetails/TweetDetails'
import styled from 'styled-components'
import { CurrentUserContext } from './components/CurrentUserContext'

function App() {
  const [error, setError] = React.useState(false);
  const {
    state: {
      // currentUser,
      status
    },
    actions: {
      setLoadingState,
      mountingUser
    }
  } = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setLoadingState()
    fetch('/API/me/profile')
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        setError(true)
      }
    })
    .then(data => mountingUser(data))
  },[])
  if (status !== 'loading') {
    return (
    <>
      <Router>
        <FormatDiv>
          <div>
            <SideBarDiv>
              <Logo></Logo>  
              <SideBar/>
            </SideBarDiv>
          </div>
          <Switch>
            <Route exact path='/'><Homefeed/></Route>
            <Route exact path='/notifications'><Notifications/></Route>
            <Route exact path='/bookmarks'><Bookmarks/></Route>
            <Route exact path='/tweet/:tweetId'><TweetDetails/></Route>
            <Route exact path='/:profileId'><Profile/></Route>
          </Switch>
          <RightBarDiv></RightBarDiv>
        </FormatDiv>
      </Router>
    </>
    )
  } else if (error) {
    return (
      <div>
        <h1>Something went wrong, please reload the page and try again</h1>
      </div>
    )
  } else {
    return (
      <LoadingDiv>
        <Logo height={100} width={100}/>
      </LoadingDiv>
    )
  }

  };

const FormatDiv = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;
  margin-left: 25px;
`

const LoadingDiv = styled.div`
  width: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SideBarDiv = styled.div`
  border-right: 1px solid lightgrey;
  padding-top: 10px;
  height: 100%;
`

const RightBarDiv = styled.div`
  border-left:1px solid lightgrey;
  z-index: 2;
  background-color: white;
`

export default App;
