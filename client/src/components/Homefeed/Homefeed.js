import React from 'react';
import Logo from '../Logo'
import Tweet from '../Tweet'
import styled from 'styled-components'
import {CurrentUserContext} from '../CurrentUserContext'
// import { set } from 'date-fns';

function Homefeed() {
    const [tweetInfo, setTweetInfo] = React.useState()
    const [error, setError] = React.useState(false)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')
    const {
        state: {
            currentUser
        },
    } = React.useContext(CurrentUserContext);
    const handleChange = ev => {
        setInputValue(ev.currentTarget.value);
        console.log(inputValue)
    }
    const renderFeed = () => {
        fetch('/API/me/home-feed')
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    setError(true)
                }
            })
            .then(res => {
                setTweetInfo(res)
                setIsLoaded(true)
            })
    }
    React.useEffect (()=>{
        renderFeed()
    }, [])
    if (error) {
        return <LoadingDiv><h1 style={{fontWeight:'bold',fontSize:'large'}}>OOPS! Something went wrong</h1><h3>Please try reloading the page</h3></LoadingDiv>;
    } else if (isLoaded === true) {
        return (
            <Wrapper>
                    <HomeHeader>home</HomeHeader>
                    <InputDiv>
                        <Avi src={currentUser.profile.avatarSrc}/>
                        <StyledForm onSubmit={ev =>{
                            ev.preventDefault();
                            fetch ('/api/tweet', {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    status: inputValue
                                })
                            })
                            .then(res => res.json())
                            .then(res => {
                                setInputValue('')
                                renderFeed()
                            })
                        }}>
                            <StyledInput id='tweetInput' type='text' value={inputValue} placeholder='Write something' onChange={ev => handleChange(ev)}></StyledInput>
                            <PostButton type='submit' onSubmit={()=>console.log('hi')}>Meow</PostButton>
                        </StyledForm>
                    </InputDiv>
                <TweetWrapper>
                    {tweetInfo.tweetIds.map((tweet, index) => {
                        let twit = tweetInfo.tweetsById[tweet]
                        return (
                            <Tweet key={index+1} data={twit}/>
                        )
                    })}
                </TweetWrapper>
            </Wrapper>
        )
    } else {
        return <LoadingDiv><Logo/></LoadingDiv>
    }
};

const InputDiv = styled.div`
    margin-top: 60px;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: auto 50%;
    grid-template-areas:'avi form'
    '. form';
    min-height: 200px;
    height:auto;
    border-bottom: solid 5px lightgrey;
`

const StyledForm = styled.form`
    grid-area: form;
    display: flex;
    flex-direction: column;
`

const StyledInput = styled.textarea`
    outline: none;
    border:none;
    grid-area: input;
    min-height: 60px;
    height:auto;
    font-size: 40px;
    resize: none;
    padding:25px;
    font-family: sans-serif;
    overflow: hidden;
    background: none;
`

const Avi = styled.img`
    border-radius: 50%;
    grid-area: avi;
    height: 54px;
    width: 54px;
    margin: auto;
    margin-left:15px;
`

const PostButton = styled.button`
    border-radius: 25px;
    grid-area: button;
    background-color: purple;
    color: white;
    font-weight: bold;
    font-size: large;
    width: 100px;
    height: 50px;
    box-shadow: none;
    border:none;
    outline: none;
    cursor: pointer;
    margin-left: auto;
    margin-right: 15px;
    margin-bottom: 5px;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const HomeHeader = styled.h1` 
    padding: 20px;
    height: 20px;
    font-weight:bolder;
    width: 100%;
    border-bottom: 1px solid lightgrey;
    position: fixed;
    background-color:white;
    z-index: 1;
`

const LoadingDiv = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
`

const TweetWrapper = styled.div`
`


export default Homefeed;
