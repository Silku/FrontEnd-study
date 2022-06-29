//리액트 배열 다루기2 객체 추가및 삭제 
// CreateMember.js , App.js
import React from 'react';

function Member({member, onRemove}){
    return (
        <div>
            <b>{member.idx}</b> <span>{member.userid} ({member.name})</span>
            <button onClick={()=> onRemove(member.idx)}>삭제</button>
        </div>
    )
}

function MemberList2({member, onRemove}){
    return(
        <div>
            {
                member.map(member =>(
                    <Member member={member} key={member.idx} onRemove={onRemove}/>
                ))
            }
        </div>
    )
}

export default MemberList2;