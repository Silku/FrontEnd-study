import shortId from 'shortid'

export const initialState = {
    /**
    mainPosts : 게시물 내용
    imagePath : 이미지 업로드시 경로
    postAdded : 게시자 추가가 완료 되었을때
     */
    //redux 데이터 구조는 서버개발자랑 잘 의논하고 정해야한다. 대소문자 등등
    mainPosts:[{
        id:11,
        User:{
            id:11,
            nickname : 'tang'
        },
        content: '첫 게시글 #해시태그 #Next Board',
        Images : [{
            src : 'https://cdn.pixabay.com/photo/2013/07/12/17/49/landscape-152502__340.png'
        },{ 
            src : 'https://cdn.pixabay.com/photo/2018/01/31/16/12/beach-3121393__340.png'
        },{
            src : 'https://cdn.pixabay.com/photo/2017/11/06/08/45/greeting-card-2923054__340.jpg'
        }],
        Comments: [{
            User : {
                nickname : 'nickname',
            },
            content : '안녕하세요',
        },{
            User : {
                nickname : 'onetwo',
            },
            content : '반가워요~',
        }],        
    }],
    imagePaths : [],
    addPostLoading : false,
    addPostDone : false,
    addPostError : null,
    addCommentLoading : false,
    addCommentDone : false,
    addCommentError : null,
}

//변수로 뺴주면 재활용이 가능 
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPost = (data) =>({
    type: ADD_POST_REQUEST,
    data,
}) 


export const addComment = (data) =>({
    type: ADD_COMMENT_REQUEST,
    data,
}) 

const dummyPost = (data) => ({
    id : shortId.generate(),
    content: data,
    User : {
        id : 1,
        nickname : '더미아이디'
    },  
    Images : [],
    Comments : [],
})

const dummyComment = (data) => ({
    id : shortId.generate(),
    content: data,
    User : {
        id : 1,
        nickname : '더미아이디'
    },  
})



const reducer = (state=initialState, action) =>{
    switch(action.type){
        case ADD_POST_REQUEST :
            return {
                ...state,
                addPostLoading : true,
                addPostDone : false,
                addPostError : null,
            }
        case ADD_POST_SUCCESS : 
            return {
                ...state,
                mainPosts : [dummyPost(action.data), ...state.mainPosts],
                addPostLoading : false,
                addPostDone : true,
            }
        case ADD_POST_FAILURE :
            return {
                ...state,
                addPostLoading : false,
                addPostError : action.error,
            }
        case ADD_COMMENT_REQUEST :
            return {
                ...state,
                addCommentLoading : true,
                addCommentDone : false,
                addCommentError : null,
            }
        case ADD_COMMENT_SUCCESS : {
            console.log(action.data)
            const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
            const post = {...state.mainPosts[postIndex]};
            post.Comments =[dummyComment(action.data.content),  ...post, Comments];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post; 
            return {
                ...state,
                mainPosts,
                addCommentLoading : false,
                addCommentDone : true,
            }
        }
        case ADD_COMMENT_FAILURE :
            return {
                ...state,
                addCommentLoading : false,
                addCommentError : action.error,
            }
        default :
            return state;
    }
}

export default reducer;