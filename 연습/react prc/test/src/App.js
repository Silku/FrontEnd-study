import React, {useRef, useState} from 'react';
import MemberList2 from './MemberList2';
import CreateMember from './CreateMember';

function App(){


	const [inputs, setInputs] = useState({
		userid:'',
		name:'',
	})

	const {userid, name} = inputs

	const onChange = (e) =>{
		const {name, value} = e.target;
		setInputs({
			...inputs,
			[name]:value
		})
	}

	const [member, setMember] = useState([
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
	]);

	const nextIdx = useRef(4);
	const onCreate = () =>{
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
	}

	const onRemove = idx =>{
		//addMember.idx가 매개변수로 일치하지 않는 요소만 추출해서 새로운 배열을 만듬
		setMember(member.filter(addMember => addMember.idx !== idx));
	}





	return (
		<div>
			<CreateMember userid={userid} name={name} onChange={onChange} onCreate={onCreate}/>
			<MemberList2 member={member} onRemove={onRemove}/>
		</div>
	);
}

export default App;
