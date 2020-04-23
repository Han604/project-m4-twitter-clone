import React from 'react';
import Styled from 'react';
import {IconHeart} from '../assets/icons'

const Heart = ({toggle}) => {
    return toggle === true ? <div style={{color:'red'}}><IconHeart /></div> : <IconHeart/>
}

export default Heart