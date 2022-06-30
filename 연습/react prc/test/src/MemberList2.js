//리액트 배열 다루기2 객체 추가및 삭제 
// CreateMember.js , App.js
import React from 'react';

function Member({member, onRemove, onToggle}){
    return (
        <div>
            <b>{member.idx}</b>
            <span 
            style={{
                cursor:'pointer',
                color:member.active ? 'red':'black'
            }} 
            onClick={() => onToggle(member.idx)}>
                {member.userid} ({member.name})
            </span>
            <button onClick={()=> onRemove(member.idx)}>삭제</button>
        </div>
    )
}

function MemberList2({member, onRemove, onToggle}){
    return(
        <div>
            {
                member.map(member =>(
                    <Member member={member} key={member.idx} onRemove={onRemove} onToggle={onToggle}/>
                ))
            }
        </div>
    )
}

export default MemberList2;