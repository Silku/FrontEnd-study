//EX1 APP.JS 참조
import React, {useRef, useState, useMemo, useCallback} from 'react';
import MemberList2 from './MemberList2';
import CreateMember from './CreateMember';

function countMember(member){
	console.log('멤버를 세는중..')
	return member.filter(member => member.active).length;
}

function App(){


	const [inputs, setInputs] = useState({
		userid:'',
		name:'',
	})

	const {userid, name} = inputs
	// onChange useCallback , deps에 [inputs] 등록
	const onChange = useCallback((e) =>{
		const {name, value} = e.target;
		setInputs({
			...inputs,
			[name]:value
		})
	},[inputs]);

	const [member, setMember] = useState([
        {
            idx:1,
            userid:'apple',
            name:'사과',
			active:false
        },
        {
            idx:2,
            userid:'banana',
            name:'바나나',
			active:false
        },
        {
            idx:3,
            userid:'watermelon',
            name:'수박',
			active:false
        }
	]);

	const nextIdx = useRef(4);
	// onCreate useCallback , deps에 [member, userid, name] 등록
	const onCreate = useCallback(() =>{
		const addMember = {
			idx: nextIdx.current,
			userid,
			name
		}
		
		setMember([...member, addMember])

		setInputs({
			userid:'',
			name:''
		})
		nextIdx.current +=1
	},[member, userid, name]);

	// onRemove useCallback , deps에 [member] 등록
	const onRemove = useCallback(idx =>{
		//addMember.idx가 매개변수로 일치하지 않는 요소만 추출해서 새로운 배열을 만듬
		setMember(member.filter(addMember => addMember.idx !== idx));
	},[member])

	// onToggle useCallback , deps에 [member] 등록
	const onToggle = useCallback(idx =>{
		 setMember(
			member.map(member => 
				member.idx === idx? {...member, active : !member.active} : member
				)
		 );
	},[member])

	const count = useMemo(() => countMember(member), [member]);

	return (
		<div>
			<CreateMember userid={userid} name={name} onChange={onChange} onCreate={onCreate}/>
			<MemberList2 member={member} onRemove={onRemove} onToggle={onToggle}/>
			<p>선택된 사용자 수 : {count}</p>
		</div>
	);
}

export default App;
