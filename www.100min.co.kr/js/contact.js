// 폼 입력값 공백시 오토포커스
const input_name = document.querySelector('#form-field-0056ccb')
const input_email = document.querySelector('#form-field-507e08c')
const input_content = document.querySelector('#form-field-e5d9ab6')
const submit_btn = document.querySelector('#submit_btn')

submit_btn.addEventListener('click', function(event){
    let need_value = [input_name, input_email, input_content]
    for(i=0; i < need_value.length; i++){
        if(need_value[i].value == ""){
            need_value[i].focus()
            need_value[i].scrollIntoView({block : "center"})
        }
    }
})






