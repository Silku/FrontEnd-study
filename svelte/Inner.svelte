<script>
    import{createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();
</script>

<button 
on:click={()=>{
                        dispatch('message',{
                            text:"안녕! 난 얼럿메세지야 디스패쳐로 매개변수가 커스텀되었지 멋지지 않니 ?"
                        })
                    }
                }
>클릭하면 안녕이라고 말합니다.</button>