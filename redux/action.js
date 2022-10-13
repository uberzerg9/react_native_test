export const ADD_COMMENT = 'ADD_COMMENT';

let name = '',
    comment = '';

export const addCommentStore = (name, comment) => {
    return {
        type: ADD_COMMENT,
        payload: {
            name: name,
            body: comment
        }
    }
}