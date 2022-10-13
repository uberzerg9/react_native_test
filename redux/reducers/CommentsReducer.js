import {ADD_COMMENT} from '../action';

const initialState = {
    comment: []
}

const CommentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            const {name, body} = action.payload;
            return {
                ...state,
                comment: [...state.comment, {name, body}]
            }
            break;
    
        default:
            return state;
            break;
    }
}

export default CommentsReducer;