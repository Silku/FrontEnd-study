import shortId from 'shortid'
import produce from 'immer'
import faker from '@faker-js/faker'

export const initialState = {
    /**
    mainPosts : 게시물 내용
    imagePath : 이미지 업로드시 경로
    postAdded : 게시자 추가가 완료 되었을때
     */
    //redux 데이터 구조는 서버개발자랑 잘 의논하고 정해야한다. 대소문자 등등
    mainPosts:[],
    imagePaths : [],
    hasMorePosts : true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading : false,
    addPostDone : false,
    addPostError : null,
    removePostLoading : false,
    removePostDone : false,
    removePostError : null,
    addCommentLoading : false,
    addCommentDone : false,
    addCommentError : null,
    likePostLoading : false,
    likePostDone : false,
    likePostError : null,
    dislikePostLoading : false,
    dislikePostDone : false,
    dislikePostError : null,
    uploadImagesLoading : false,
    uploadImagesDone : false,
    uploadImagesError : null,
}

// export const generateDummyPost = (number) =>  Array(number).fill().map(() => ({
//     id: shortId.generate(),
//     User:{
//         id:shortId.generate(),
//         nickname : faker.name.findName(),
//     },
//     content: faker.lorem.paragraph(),
//     Images : [{
//         src:faker.image.image()
//     },{
//         src:faker.image.image()
//     },
//     {
//         src:faker.image.image()
//     }],
//     Comments : [{
//         User:{
//             id:shortId.generate(),
//             nickname : faker.name.findName(),
//         },
//         content : faker.lorem.sentence(),
//     }] 
// }));

// initialState.mainPosts = initialState.mainPosts.concat(
//     generateDummyPost(10)
// )

//변수로 뺴주면 재활용이 가능 
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'

export const DISLIKE_POST_REQUEST = 'DISLIKE_POST_REQUEST'
export const DISLIKE_POST_SUCCESS = 'DISLIKE_POST_SUCCESS'
export const DISLIKE_POST_FAILURE = 'DISLIKE_POST_FAILURE'

export const REMOVE_IMAGE = 'REMOVE_IMAGE'



export const addPost = (data) =>({
    type: ADD_POST_REQUEST,
    data,
}) 


export const addComment = (data) =>({
    type: ADD_COMMENT_REQUEST,
    data,
}) 

// const dummyPost = (data) => ({
//     id : data.id,
//     content: data.content,
//     User : {
//         id : 1,
//         nickname : '더미아이디'
//     },  
//     Images : [],
//     Comments : [],
// })

// const dummyComment = (data) => ({
//     id : shortId.generate(),
//     content: data,
//     User : {
//         id : 1,
//         nickname : '더미아이디'
//     },  
// })

//immer 쓰는 법 : 기존 state 대신 draft로 사용
const reducer = (state = initialState, action) =>{
    return produce(state, (draft)=>{
        switch(action.type){
            case REMOVE_IMAGE : 
                draft.imagePaths = draft.imagePaths.filter((v ,i) => i !== action.data);
                break;
            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;
            case UPLOAD_IMAGES_SUCCESS:
                draft.imagePaths = action.data
                draft.uploadImagesLoading = false;
                draft.uploadImagesDone = true;
                break;
            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.hasMorePosts = draft.mainPosts.length < 10;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(action.data);
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS : {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Comments.unshift(action.data);
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;

                // console.log(action.data)
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = {...state.mainPosts[postIndex]};
                // post.Comments =[dummyComment(action.data.content),  ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post; 
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentLoading : false,
                //     addCommentDone : true,
                // }
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case LIKE_POST_REQUEST:
                draft.likePostLoading = true;
                draft.likePostDone = false;
                draft.likePostError = null;
                break;
            case LIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v)=>v.id ===action.data.PostId);
                post.Likers.push({id:action.data.Userid})
                draft.likePostLoading = false;
                draft.likePostDone = true;
                break;
            }
            case LIKE_POST_FAILURE:
                draft.likePostLoading = false;
                draft.likePostError = action.error;
                break;
            case DISLIKE_POST_REQUEST:
                draft.dislikePostLoading = true;
                draft.dislikePostDone = false;
                draft.dislikePostError = null;
                break;
            case DISLIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v)=>v.id ===action.data.PostId);
                post.Likers = post.Likers.filter((v)=>v.id !== action.data.Userid)
                draft.dislikePostLoading = false;
                draft.dislikePostDone = true;
                break;
            }
            case DISLIKE_POST_FAILURE:
                draft.dislikePostLoading = false;
                draft.dislikePostError = action.error;
                break;
            default :
                break;
        }
    })
}



export default reducer;