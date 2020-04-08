import React from 'react'

export const CurrentUserContext = React.createContext();

const loadingState = {
    currentUser: null,
    status: 'loading'
}

function reducer(state, action) {
    switch (action.type) {
        case 'loading-state':{
            return{
                ...state,
            }
        }
        case 'mount-user':{
            return{
                currentUser: action,
                status: 'idle'
            }
        }
    
        default:
            throw new Error('Unrecognized');
    }
}

export const CurrentUserProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, loadingState);
    const setLoadingState = () => {
        dispatch({
            type:'loading-state'
        })
    }
    const mountingUser = data => {
        dispatch({
            ...data,
            type: 'mount-user'
        })
    }
    return(
        <CurrentUserContext.Provider
            value = {{
                state,
                actions: {
                    setLoadingState,
                    mountingUser
                }
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    )
}