import React from 'react';
import { useParams } from 'react-router-dom'
import Logo from '../Logo'
import styled from 'styled-components';
import { CurrentUserContext } from '../CurrentUserContext'
import {IconCalendar} from '../../assets/icons'
import {IconPin} from '../../assets/icons'
import ProfileFeed from '../ProfileFeed/ProfileFeed'


function Profile() {
    const [ isLoaded, setIsLoaded ] = React.useState(false);
    const [ profileInfo, setProfileInfo ] = React.useState(null)
    const { profileId } = useParams()

    const {
        state: {
            currentUser
        }
    } = React.useContext(CurrentUserContext);
    console.log(profileInfo, 'Info')
    console.log(currentUser, 'CurrentUser')

    React.useEffect(() => {
        fetch(`/api/${profileId}/profile`)
        .then (res => res.json())
        .then (res => {
            console.log(res)
            setProfileInfo(res)
            setIsLoaded(true)
        })
    }, [])
    if(isLoaded === true) {
        return (
                <div>
                    <Banner src={profileInfo.profile.bannerSrc} alt='banner'/>                
                    <Avi src={profileInfo.profile.avatarSrc} alt='avatar'/>
                    <div style={{padding:'15px', marginTop:'50px'}}>
                        <FollowButton>{profileInfo.profile.handle === currentUser.profile.handle ? 'Edit Profile' : profileInfo.profile.isBeingFollowedByYou === true ? 'Unfollow' : 'Follow' }</FollowButton>
                        <DisplayName>{profileInfo.profile.displayName}</DisplayName>
                        <HandleDiv>
                            <Handle>
                                @{profileInfo.profile.handle}
                            </Handle>
                            <FollowsYou>
                                {profileInfo.profile.handle === currentUser.profile.handle ? null : profileInfo.profile.isFollowingYou ? 'Follows You' : null}
                            </FollowsYou>
                        </HandleDiv>
                        <Bio>
                            {profileInfo.profile.bio}
                        </Bio>
                        <LocationDiv>
                            <div style={{marginRight: '5px'}}>
                                <IconPin/> {profileInfo.profile.location}
                            </div>
                            <div>
                                <IconCalendar /> {profileInfo.profile.joined}
                            </div>
                        </LocationDiv>
                        <div style={{display:'flex', marginTop: '10px'}}>
                            <div style={{marginRight:'10px', display: 'flex'}}>
                                <Number>{profileInfo.profile.numFollowing}</Number> Following
                            </div>
                            <div style={{display: 'flex'}}>
                                <Number>{profileInfo.profile.numFollowers}</Number> Followers
                            </div>
                        </div>
                    </div>
                        <ButtonDiv>
                            <ProfileButton>Tweets</ProfileButton>
                            <ProfileButton>Media</ProfileButton>
                            <ProfileButton>Likes</ProfileButton>
                        </ButtonDiv>
                        <ProfileFeed handle={profileInfo.profile.handle}/>
                </div>
        )
    } else {
        return <Logo/>
    }
};


const ButtonDiv = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`

const ProfileButton = styled.button`
    border: none;
    color: grey;
    outline: none;
    background-color: white;
    border-bottom: 1px solid lightgrey;
    cursor: pointer;
    height: 50px;
    font-weight: bold;
    
    &:hover{
        background-color: lightgrey;
    }
    &:active{
        border-bottom: 2px solid purple;
        color: purple;
        font-weight: 700;
    }
`

const Number = styled.div`
    font-weight: bold;
    margin-right: 5px;
`

const LocationDiv = styled.div`
    font-size:small;
    display: flex;
    color: darkgrey; 
`

const Bio = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`

const DisplayName = styled.div`
    font-weight: bolder;
`
const HandleDiv = styled.div`
    display: flex;
    color: darkgray;
    margin-right: 5px;
    margin-top:5px;
`

const Handle = styled.div`
    font-size: small;
    margin-right: 5px;
`

const FollowsYou = styled.div`
    font-size: small;
    background-color: lightgrey;
`

const Banner = styled.img`
    width: 100%;
    max-height: 200px;
    object-fit:cover;
`

const Avi = styled.img`
    border-radius: 50%;
    position: absolute;
    border: 3px solid white;
    height: 150px;
    width: 150px;
    left: 23%;
    top: 125px;
`

const FollowButton = styled.button`
    color: purple;
    background-color: white;
    border: 3px solid purple;
    outline: none;
    border-radius: 25px;
    position:relative;
    left: 80%;
    top: 25px;
    height: 40px;
    width: auto;
    min-width: 100px;
    font-weight:bolder;
    cursor: pointer;

    &:hover {
        background-color:violet;
    }
`

export default Profile;
