import React from 'react';
import Styled from 'react';
import {IconHeart} from '../assets/icons'

const Heart = ({isLiked}) => {
    if (isLiked===true) {
        return <IconHeart style={{color:'orange'}}/>
    } else {
        return <IconHeart/>
    }
}

export default Heart