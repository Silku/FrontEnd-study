// (function () {
//   let faqCont = document.querySelectorAll('.panel-faq-container');
//   console.log(faqCont);
// })();

window.onload = () => {
  let faqCont = document.querySelectorAll('.panel-faq-container');
  console.log(faqCont);
  let faqAnswer = document.querySelectorAll('.panel-faq-answer');
  let btnAllClose = document.querySelector('#btn-all-close');

  for (let i = 0; i < faqCont.length; i++) {
    faqCont[i].addEventListener('click', function () {
      // 클릭시 처리할일
      console.log('컨테이너 클릭' + i);
      //fqa 제목 클릭시 본문이 보이게, active 추가

      faqAnswer[i].classList.toggle('active');

      // faqAnswer[i].classList.remove('active');
    });
  }
  btnAllClose.addEventListener('click', function () {
    console.log('모두닫기');
    for (let i = 0; i < faqAnswer.length; i++) {
      faqAnswer[i].classList.remove('active');
    }
  });
};

/*
    classList 메서드 잠깐정리
    .add() 값추가
    .remove() 값제거
    .item(number) 콜렉션의 인덱스를 이용하여 클래스 반환
    .toggle() 토글링
    .contains() 지정한클래스값이 엘리먼트의 class속성에 있는지 확인 
    .replace( oldClass, newClass ) 존재하는클래스를 새로운클래스로 교체
*/
