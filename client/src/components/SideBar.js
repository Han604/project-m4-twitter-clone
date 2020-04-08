import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {COLORS} from '../constants'
import { CurrentUserContext } from './CurrentUserContext'

import {IconHome, IconUser, IconBell, IconMark} from '../assets/icons'

const SideBar = () => {
    const {
        state:{
            currentUser
        }
    } = React.useContext(CurrentUserContext)
    console.log(currentUser)
    return (
        <SideBarDiv>
            <LinkDiv>
                <IconHome/>
                <NavLink exact to='/' activeStyle={{color:`${COLORS.primary}`}}>Home</NavLink>
            </LinkDiv>
            <LinkDiv>
                <IconBell/>
                <NavLink exact to='/notifications' activeStyle={{color:`${COLORS.primary}`}}>Notifications</NavLink>
            </LinkDiv>
            <LinkDiv>
                <IconMark/>
                <NavLink exact to='/bookmarks' activeStyle={{color:`${COLORS.primary}`}}>Bookmarks</NavLink>
            </LinkDiv>
            <LinkDiv>
                <IconUser/>
                <NavLink exact to={`/${currentUser.profile.handle}`} activeStyle={{color:`${COLORS.primary}`}}>Profile</NavLink>
            </LinkDiv>
        </SideBarDiv>
    )
}

const SideBarDiv = styled.div`
    display: flex;
    flex-direction: column;
`
const LinkDiv = styled.div`
    display: inline-block;
    width: fit-content;
    border-radius: 25px;
    height: 50px;
    text-align: left;
    margin: 3px;
    font-weight: bold;
    padding-left:5px;
    padding-right:5px;
    color: black;
    cursor: pointer;

    &:hover{
        background-color: violet;
        color: ${COLORS.primary};
    }

    & a {
        position: relative;
        text-decoration: none;
        top: 10px;
        margin: 5px;
    }

    & a:visited { 
        color: inherit; 
    }

    & svg {
        margin-top:15px;
        margin-left: 5px;
    }
`

export default SideBar