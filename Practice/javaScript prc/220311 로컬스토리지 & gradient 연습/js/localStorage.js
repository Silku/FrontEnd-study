// 브라우저 로컬 데이터에 저장하기

// [ ! ] 주요 메서드 3개
// 값 저장하기 --> localStorage.setItem( 'key', value );
// 값 가져오기 --> localStorage.getItem( 'key' );
// 값 삭제하기 --> localStorage.removeItem( 'key' );
// 키(key)를 그대로 놓고 새로운 값을 저장하면 덮어쓰기가 되면서 기존 로컬 데이터 정보가 수정.

window.onkeydown = function (e) {
  //   console.log('물리 키다운');
  // console.log(e.keyCode);
};

window.onload = () => {
  const btnSetLocalData = document.querySelector('.btnSetLocalData');
  const btnGetLocalData = document.querySelector('.btnGetLocalData');
  const btnRemoveLocalData = document.querySelector('.btnRemoveLocalData');
  const input = document.querySelector('input');
  const input2 = document.querySelector('.input2');

  btnSetLocalData.addEventListener('click', function () {
    let inputValue = input.value;
    console.log(inputValue);
    localStorage.setItem('id', inputValue);
  });

  btnGetLocalData.addEventListener('click', function () {
    let getData = localStorage.getItem('id');
    if (!getData) {
      alert('저장된 데이터가 없습니다.');
    } else {
      input2.value = getData;
    }
  });

  btnRemoveLocalData.addEventListener('click', function () {
    // localStorage.removeItem('id');
    localStorage.clear();
    input.value = '';
    input2.value = '';
  });

  const btnGetAjax = document.querySelector('.getAjax');
  btnGetAjax.addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      // .then((response) => console.log(response))
      .then((response) => response.json(), console.log('성공'))
      .then((data) => {
        console.log(data);
        const id = document.createElement('div');
        const title = document.createElement('div');
        const body = document.createElement('div');

        const userInfo = document.getElementById('userInfo');
        for (let i = 0; i < 5; i++) {
          id.textContent = data[i].id;
          title.textContent = data[i].title;
          body.textContent = data[i].body;

          userInfo.appendChild(id);
          userInfo.appendChild(title);
          userInfo.appendChild(body);
        }
      })
      .catch((error) => console.log('error!'));
  });
};
