export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_COMMENT = 'SET_USER_COMMENT';
export const SET_COMMENT_ID = 'SET_COMMENT_ID';
export const SET_POST_ID = 'SET_POST_ID'

export const setUserName = (name) => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        payload: {
            name
        }
    })
}

export const setUserComment = (body) => dispatch => {
    dispatch({
        type: SET_USER_COMMENT,
        payload: {
            body
        }
    })
}

export const setCommentId = (id) => dispatch => {
    dispatch({
        type: SET_COMMENT_ID,
        payload: {
            id
        }
    })
}

export const setPostId = (postId) => dispatch => {
    dispatch({
        type: SET_POST_ID,
        payload: {
            postId
        }
    })
}