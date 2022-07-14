

<svelte:head>
	<title>my Pages</title>
</svelte:head>
<div>이게 어떻게 동작하는거지</div>
<script>

    import Intro from './Intro.svelte'
    import TestText from './Intro.svelte'
    import Info from './Intro.svelte'
    import Box from './box.svelte'
    import Inner from './Inner.svelte'
    import CustomButton from './CustomButton.svelte'

    const pkg = {
        a:"스벨트",
        b:"간단",
        c:"편리",
        d:"효율적",
    }
    
	let name = 'world';
	let hello = "hell o Wolrd";
    let button = "버튼이얌"
    // let rbtn = document.querySelector('.red')
    // rbtn.style.display="none"



	const myname = "스벨트으"
	
	let one = 1;
	let two = 2;
// 	myname.style.color ="#bababa";
	
	let string ='스벨트<strong>쉬운건가..?</strong>'
	let none = console.log("zz")
	
	let count = 0;
	$:doubled = count * 2;

    let user = {loggedIn : false}
    const toggle = () =>{
        // let btn = document.querySelector('.logout_btn')
        user.loggedIn = ! user.loggedIn;
        if(user.loggedIn){
            alert('로그인을 환영합니다.')
        }else{
            alert('로그아웃 되었습니다.')

        }
    }

    let videoList = [
        {name : '유튜브 강의영상', url : 'https://www.youtube.com/watch?v=b58ox0mqp_I&list=PL5v0w59YqSue9aPueJ15phdPv6lcvWzVy&index=2'},
        {name : '고양이 영상', url : 'https://www.youtube.com/watch?v=vvjumORT8GY'},
        {name : '귀여운 고양이 ', url : 'https://www.youtube.com/watch?v=wfcWTdTchE4'},
    ]

    //이벤트 - on 예제
    let m = {x:0, y:0}


    let input = '';

    // 양방향 바인딩
    let num1 = 1
    let num2 = 2

    // 바인딩 약관
    let yes = false;

    // 생명주기 onMount
    import {onMount} from 'svelte'
    let photos = [];
    let url="https://jsonplaceholder.typicode.com/photos?limit=20"

    onMount(async () =>{
        const res = await fetch()
        photos = await res.json()
    })

    // 생명주기 onDestroy
    import {onDestroy} from 'svelte'
    const onInterval = (callback, milliseconds) =>{
        const interval = setInterval(callback, milliseconds)
        onDestroy(()=> {
            clearInterval(interval)
        })
    }
    let seconds  = 0
    onInterval(() => seconds +=1 ,1000)

        // 생명주기 beforeUpdate,afterUpdate, tick
    import{
        beforeUpdate,
        afterUpdate,
        tick,
    } from 'svelte'

    beforeUpdate(()=>{
        // dom 업데이트가 발생하기 전
        // alert('변경사항이 있습니다.')
    })
    afterUpdate(()=>{
        // dom 업데이트가 발생 후
        // alert('변경사항이 있습니다.')
    })

    const renderAfter = async() =>{
        // dom을 수정하는 코드들
        await tick()
        // dom에 모든것이 업데이트 된 후
    }

    const blue = () =>{
        
    }

	let click

	import { fade, blur, fly, slide, scale, draw } from 'svelte/transition';
	
	let condition = false




</script>
<style>
	.myname{
		color:#55aa55;
	}
	
	.comicText{
		color:purple;
		font-family:'Comic Sans MS', cursive;
		font-size:2rem;
	}
    .center{
        text-align: center;
    }
    .red{
        background-color: #ee5555;
    }
    .blue{
        background-color: #5555ee;
    }
    .mouse_event{
        width: 100%;
        height: 300px;
        background-color: #5555ee;
    }
</style>

<h1>Hello {name}!</h1>
<h1>{hello}!</h1>
<div class="myname">
	나는 {myname}야
</div>
<div>
	{one}+{two} = {one+two + " " +hello}
</div>
<p class="comicText">
	This {name} is Sparta.
	<br>
	그리고 이건 테스트 텍스트야.
</p>
<p>
	{@html string}
	<br>
	{string}
</p>
<p class="center">
	{count}번 클릭, x2는 {doubled}
</p>
<button on:click={()=>count +=1 }>
	{count}번 클릭
</button>
<button on:click={()=> count = 0}>
    클릭 수 리셋하기
</button>


<Intro name2="mypages 안에 직접적은 이름이구요 1번"/>
<div class="red">
    <TestText testText="mypages의 테스트 텍스트입니다. 2번"/>
</div>
<Info {...pkg}/>
<Box>
    <h2><strong>안녕하세요!</strong></h2>
    <p>박스에서 CSS 임포트해온 박스입니다.</p>
</Box>

{#if user.loggedIn}
    <button class="logout_btn" on:click={toggle}>로그아웃</button>
{:else}
    <button on:click={toggle}>로그인</button>
{/if}

<h1> 고양이 유튜브 모음 / each 반복문</h1>
{#each videoList as videoItem, index}
    <li>
        <a  target="_blank"
            href="{videoItem.url}"
        >
            {index +1}:{videoItem.name}
        </a>
    </li>   
{/each}

<div class="mouse_event"
    on:mousemove={
        (event) =>{
            m.x = event.clientX
            m.y = event.clientY
        }
    }
>
    화면상 마우스의 위치는 {m.x} x {m.y}입니다.
</div>

<!-- 이벤트 커스텀 -->
<Inner on:message={
    (event) => {
        alert(event.detail.text)
    }
}/>


<!-- 이벤트 포워딩 예제 -->
<CustomButton on:click={()=>{
    alert('클릭되었어요')
    }
}/>

<!-- 바인딩 -->
<h1>아래 빈칸에 아무거나 입력해보세요.!<br>
    {input}</h1>

<input bind:value={input} placeholder="아무 텍스트나 입력하세요!">

<!-- 양방향 바인딩 -->
<h2>이거 계산기로 딱인데?</h2>
<input type=number bind:value={num1}>
<input type=number bind:value={num2}>
<p>{num1}+{num2} = {num1 + num2}</p>


<!-- 회원가입 약관 -->
<label>
    <input type="checkbox" bind:checked={yes}>
    약관에 동의합니다
</label>
{#if yes}
    <p>약관에  동의하셨습니다.</p>
{:else}
    <p>약관에 동의해 주세요.</p>
{/if}
<button disabled={!yes}>
    회원가입
</button>

<h1>Photo album</h1>
<div class="photos">
    {#each photos as photo}
        <figure>
            <img src={photo.thumbnailUrl} alt={photo.title}>
            <figcaption>{photo.title}</figcaption>
        </figure>
    {:else}
        <p>loading.....</p>
    {/each}
</div>

<p>
    이 페이지가 열리고 {seconds}초가 지났습니다
</p>


<button class="red" class:blue={click} >
    <input type="checkbox" bind:checked={click}/>
    {button}
</button>


<label>
	<input type="checkbox" bind:checked={condition} /> 
	효과 보기
</label>
{#if condition}
	<div transition:fade={{delay:0, duration:500}}>
		transiton 예제
	</div>
{/if}