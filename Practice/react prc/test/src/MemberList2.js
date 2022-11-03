//리액트 배열 다루기2 객체 추가및 삭제 
// CreateMember.js , App.js
import React, {useEffect} from 'react';

const Member = React.memo(function Member({member, onRemove, onToggle}){

    /* 
        deps 파라미터를 생략하면 컴포넌트가 리렌더링될때 마다 호출. 
        ->성능저하가 일어날수 있다.

        useEffect(()=>{
            console.log(member);
        })        

        위처럼 deps파라미터를 생략하면(return과 끝에 배열 빼고) console.log 하나만 넣어서 useEffect를 테스트할 경우, 
        인풋박스에 타이핑 치는거 하나하나 렌더링이 일어남.
    */
    useEffect(()=>{
        console.log('member 설정!')
        console.log(member)
        return () =>{
            console.log('member설정 전..')
            console.log(member)
        };
    }, [member]);



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
})

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

export default React.memo(MemberList2);