import React from 'react'
import styled from 'styled-components'

import {
    useHistory,
    NavLink
} from 'react-router-dom'

import Heart from './Heart'

import { IconRetweet, IconMessage, IconShare } from '../assets/icons'

const Tweet = (tweet) => {
    const [toggle, setToggle] = React.useState(false)
    
    let {id, timestamp, status, media, retweetFrom, author, isLiked, isRetweeted, numLikes, numRetweets} = tweet.data;
    let history = useHistory();
    
    const userClick = (ev) => {
        history.push(`/${author.handle}`)
        ev.stopPropagation()
    }
    const userEnter = ev => {
        if (ev.key === 'Enter') {
            history.push(`/${author.handle}`)
        }
    }
    const tweetClick = () => {
        history.push(`/tweet/${id}`)
    }

    const clickHeart = ev => {
        if (isLiked) {
            isLiked = false;
            numLikes -= 1;
            setToggle(false)
        } else {
            isLiked = true;
            numLikes += 1;
            setToggle(true)
        }
        ev.stopPropagation()
    }
    return (
        <Wrapper onClick={tweetClick}>
            <Avi aria-label='View User' onKeyPress={ev=>userEnter(ev)} onClick={ev=>userClick(ev)}  tabIndex='0' src={author.avatarSrc} alt={'Avatar'}/>
            <TweetInfo>
                {retweetFrom ? <p style={{color:'grey', margin:'2.5px'}}><IconRetweet/> by {retweetFrom.handle}</p> : null}
                <div style={{display:'flex'}}>
                    <div aria-label='View User' onKeyPress={ev=>userEnter(ev)} onClick={(ev)=> {userClick(ev)}} tabIndex='0' style={{fontWeight:'bold', marginRight:'10px', cursor:'pointer'}}>{author.displayName}</div>
                    <div aria-label='View User' onKeyPress={ev=>userEnter(ev)} onClick={(ev)=> {userClick(ev)}} tabIndex='0' style={{color:'grey', marginRight:'10px', cursor:'pointer'}}>@{author.handle}</div>
                    <div>{timestamp}</div>
                </div>
            </TweetInfo>
            <TweetBody>
                {status}
                <MediaWrapper>
                    {media.length ? (
                        <TweetImg style={{borderRadius: '25px'}}src={media[0].url} alt={media.type}/>
                    ): null}
                </MediaWrapper>
            </TweetBody>
            <TweetFooter>
                <div><FooterButton><IconMessage/></FooterButton></div>
                <div style={{display:'flex'}}>{numLikes > 0 ? {numLikes} : null}<FooterButton onClick={ev=>clickHeart(ev)}><Heart toggle={toggle}/></FooterButton></div>
                <div style={{display:'flex'}}>{numRetweets > 0 ? <div>{numRetweets}</div> : null}<FooterButton><IconRetweet /></FooterButton></div>
                <div><FooterButton><IconShare/></FooterButton></div>
            </TweetFooter>
        </Wrapper>
    )
}

const FooterButton = styled.button`
    border: none;
    border-radius: 50%;
    height: 36px;
    width: 36px;
    outline: none;
    background-color:white;
    cursor: pointer;

    &svg:hover {
        color: purple;
    }

    &:hover{
        background-color:hsl(258deg, 100%, 50%);
    }
`

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: auto 10% auto 20px;
    grid-template-areas: 'avi user'
    'avi body'
    '. body'
    '. footer';
    margin-bottom: 30px;
    border-top: 1px solid lightgrey;
    padding: 5px;
`

const TweetBody = styled.div`
    margin-top: 5px;
    grid-area: body;
    height: 100%;
`

const TweetInfo = styled.div`
    grid-area: user;
    height:100%;
`

const Avi = styled.img`
    grid-area: avi;
    border-radius: 50%;
    height:54px;
    width:54px;
    margin:auto;
    z-index: 3;
`

const TweetFooter = styled.div`
    grid-area: footer;
    height: 100%;
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    margin-left: 5px;
    margin-top: 5px;
`

const MediaWrapper = styled.div`
    height: 100%;
    width: 100%;
    margin-top: 5px;
    `

const TweetImg = styled.img`
    width: 80%;
    position: relative;
    object-fit:cover;
    min-height: 200px;
    max-height: 400px;
    margin-bottom: 5px;
`



export default Tweet;