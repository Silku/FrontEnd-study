import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'


const PostCardContent = ({postData}) => {
    
    /*
    정규식 해설
    .+ 뒤에 오는 모든 문자열 선택   
    [^\s] 스페이스를 제외
    [^\s#] 스페이스뒤
    split쓸때 ()포함관계
    */
    return (
        <>
            {postData.split(/(#[^\s#]+)/g).map((v, i)=>{
                if(v.match(/(#[^\s#]+)/)){
                    // slice(1) 앞에 #을 떼도록
                    return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
                }
                return v
            })}
        </>
    )
}

PostCardContent.PropTypes ={
    postData : PropTypes.string.isRequired
}


export default PostCardContent