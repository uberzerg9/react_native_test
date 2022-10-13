import {SET_USER_NAME, SET_USER_COMMENT, SET_COMMENT_ID, SET_POST_ID} from '../action';

const initialState = {
    postId: 0,
    id: 0,
    name: '',
    body: ''
}

const CommentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return {...state, 
                name: action.payload
            }
        break;
        case SET_USER_COMMENT:
            return {...state, 
                body: action.payload
            }
        break;
        case SET_COMMENT_ID:
            return {...state, 
                id: action.payload
            }
        break;
        case SET_POST_ID:
            return {...state, 
                postId: action.payload
            }
        break;
        default: return state;
    }
}

export default CommentsReducer;