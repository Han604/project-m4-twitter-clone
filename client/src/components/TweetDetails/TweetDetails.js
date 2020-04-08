import React from 'react';
import Logo from '../Logo';
import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import { IconHeart, IconRetweet, IconMessage, IconShare } from '../../assets/icons'

const TweetDetails = () => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [tweetInfo, setTweetInfo] = React.useState()
    const [isError, setIsError] = React.useState(false)
    const {tweetId} = useParams()
    const renderTweet = () => {
        fetch(`/API/tweet/${tweetId}`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                setIsError(true)
            }
        })
        .then(res => {
            setTweetInfo(res)
            setIsLoaded(true)
        })
    }
    React.useEffect (() => {
        renderTweet()
    }, [])
    console.log(tweetInfo, 'info')
    if (isLoaded === true) {
        return (
            <TweetWrapper >
                <HomeHeader>Tweet</HomeHeader>
                <div style={{padding:'30px'}}>
                    <div style={{display:'flex'}}>
                        <Avi src={tweetInfo.tweet.author.avatarSrc} alt={'Avatar'}/>
                        <TweetInfo>
                            {tweetInfo.tweet.retweetFrom ? <p style={{color:'grey', margin:'2.5px'}}><IconRetweet/> by {tweetInfo.tweet.retweetFrom.displayName}</p> : null}
                            <div>
                                <div style={{fontWeight:'bold', marginRight:'10px', cursor:'pointer'}}>{tweetInfo.tweet.author.displayName}</div>
                                <div style={{color:'grey', marginRight:'10px', cursor:'pointer'}}>@{tweetInfo.tweet.author.handle}</div>
                            </div>
                        </TweetInfo>
                    </div>
                        <TweetBody>
                            {tweetInfo.tweet.status}
                            <MediaWrapper>
                                {tweetInfo.tweet.media.length ? (
                                    <TweetImg style={{borderRadius: '25px'}}src={tweetInfo.tweet.media[0].url} alt={tweetInfo.tweet.media.type}/>
                                ): null}
                            </MediaWrapper>
                        <div style={{display:'flex'}}>{tweetInfo.tweet.timestamp} <div style={{color:'grey', marginLeft:'5px'}}>Sent from Critter web app</div></div>
                        </TweetBody>
                        <TweetFooter>
                            <div><FooterButton><IconMessage/></FooterButton></div>
                            <div style={{display:'flex'}}>{tweetInfo.tweet.numLikes > 0 ? <div>{tweetInfo.tweet.numLikes}</div> : null}<FooterButton><IconHeart/></FooterButton></div>
                            <div style={{display:'flex'}}>{tweetInfo.tweet.numRetweets > 0 ? <div>{tweetInfo.tweet.numRetweets}</div> : null}<FooterButton><IconRetweet /></FooterButton></div>
                            <div><FooterButton><IconShare/></FooterButton></div>
                        </TweetFooter>
                    </div>
                </TweetWrapper>
        )
    } else if ( isError === true) {
        return <LoadingDiv><h1 style={{fontWeight:'bold',fontSize:'large'}}>OOPS! Something went wrong</h1><h3>Please try reloading the page</h3></LoadingDiv>;
    } else {
        return (
            <LoadingDiv><Logo/></LoadingDiv>
        )
    }
}

export default TweetDetails

const TweetWrapper = styled.div`
`

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

const TweetFooter = styled.div`
    height: 100%;
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    margin-left: 5px;
    margin-top: 5px;
    width: 100%;
    align-items: center;
    justify-items: center;
`

const MediaWrapper = styled.div`
    height: 100%;
    width: 100%;
    margin-top: 5px;
    `

const TweetImg = styled.img`
    width: 100%;
    position: relative;
    object-fit:cover;
    min-height: 200px;
    max-height: 400px;
    margin-bottom: 5px;
`

const TweetInfo = styled.div`
    margin-top:60px;
`

const Avi = styled.img`
    border-radius: 50%;
    height:54px;
    width:54px;
    margin-top:60px;
    margin-right: 10px;
`

const TweetBody = styled.div`
    margin-top: 5px;
    grid-area: body;
    height: 100%;
`

const LoadingDiv = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
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