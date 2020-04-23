import React from 'react';
import styled from 'styled-components';

const WordCounter = ({wordCount}) => {
return wordCount > 55 ? <ColorRing style={{border:'3px solid green'}}></ColorRing> : wordCount > 0 ? <ColorRing style={{border:'3px solid orange'}}></ColorRing> : <ColorRing style={{border:'3px solid red'}}></ColorRing>
}

const ColorRing = styled.div`
    border-radius: 50%;
    width: 2em;
    height: 2em;
    margin-right: 10px;
    margin-top: 6px;
`

export default WordCounter