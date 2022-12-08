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
    postAdded : false,
}

//변수로 뺴주면 재활용이 가능 
const ADD_POST = 'ADD_POST'
export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id : '1234',
    content: '데미 데이터.',
    User : {
        id : 1234,
        nickname : '아이디23'
    },  
    Images : [],
    Contents : [],
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case ADD_POST : 
            return {
                ...state,
                mainPosts : [dummyPost, ...state.mainPosts],
                postAdded : true,
            }
        default :
            return state;
    }
}

export default reducer;