//리액트 배열 다루기
import React from 'react';

function Member({member}){
    return (
        <div>
            <b>{member.idx} </b>
            <span>{member.userid} ({member.name})</span>
        </div>
    )
}

function MemberList(){
    const member = [
        {
            idx:1,
            userid:'apple',
            name:'사과'
        },
        {
            idx:2,
            userid:'banana',
            name:'바나나'
        },
        {
            idx:3,
            userid:'watermelon',
            name:'수박'
        }
    ]
    return(
        <div>
            <div>
                {/* <Member member={member[0]}/>
                <Member member={member[1]}/>
                <Member member={member[2]}/> */}

                {/* key={member.idx}..... key값을 안넣어주면 화면은 뜨는데 문법오류로 콘솔에러남 */}
                {
                    member.map(member =>(
                        <Member member={member} key={member.idx}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MemberList;