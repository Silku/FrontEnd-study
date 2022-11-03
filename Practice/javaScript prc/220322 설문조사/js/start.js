const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult() {
  // max(...) ...은 전개구문, 선택한 배열을 펼쳐줌
  // =>결과적으로  배열의 최대값을 갖는 인덱스를 반환하게 됨
  console.log(select);
  var result = select.indexOf(Math.max(...select));
  console.log(result)
  return result;
  /* data.js  변경, 알고리즘 변경
  let poin tArray = [
    { name: 'mouse', value: 0, key: '0' },
    { name: 'cow', value: 0, key: '1' },
    { name: 'tiger', value: 0, key: '2' },
    { name: 'rabbit', value: 0, key: '3' },
    { name: 'dragon', value: 0, key: '4' },
    { name: 'snake', value: 0, key: '5' },
    { name: 'horse', value: 0, key: '6' },
    { name: 'sheep', value: 0, key: '7' },
    { name: 'monkey', value: 0, key: '8' },
    { name: 'chicken', value: 0, key: '9' },
    { name: 'dog', value: 0, key: '10' },
    { name: 'pig', value: 0, key: '11' },
  ];
  for (let i = 0; i < endPoint; i++) {
    var target = qnaList[i].a[select[i]];
    for (let j = 0; j < target.type.length; j++) {
      for (let k = 0; k < pointArray.length; k++) {
        if (target.type[j] === pointArray[k].name) {
          pointArray[k].value += 1;
        }
      }
    }
  }
  */

  // sort compareFunction(a,b)
  // => 0을 기준으로 0보다 작다면 a가 먼저옴
  // => 0을 기준으로 0보다 크다면 b가 먼저옴
  /*
  var resultArray = pointArray.sort(function (a, b) {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });
  console.log(resultArray);
  let resultword = resultArray[0].key;
  return resultword;
  */
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultName');
  resultName.innerHTML = infoList[point].name;
  
  var resultImg = document.createElement('img')
  const imgDiv = document.querySelector('#resultImg');
  var imgUrl = 'img/image_' + point + '.png';
  // var imgUrl = 'img/image_0.jpg';
  resultImg.src = imgUrl;
  resultImg.alt = point;
  resultImg.classList.add('img-fliud')
  imgDiv.appendChild(resultImg);
  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;

}
function goResult() {
  qna.style.WebkitAnimation = 'fadeOut 1s';
  qna.style.animation = 'fadeOut 1s';

  setTimeout(() => {
    result.style.WebkitAnimation = 'fadeIn 1s';
    result.style.animation = 'fadeIn 1s';
    setTimeout(() => {
      qna.style.display = 'none';
      result.style.display = 'block';
    }, 450);
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
  console.log(select);
  setResult();
  // calResult();
}
function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector('.answerBox');
  let answer = document.createElement('Button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');
  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener(
    'click',
    function () {
      let children = document.querySelectorAll('.answerList');
      for (let i = 0; i < children.length; i++) {
        children[i].disabled = true;
        children[i].style.animation = 'fadeOut 0.5s';
      }
      setTimeout(() => {
        var target = qnaList[qIdx].a[idx].type;
        for (let i = 0; i < target.length; i++) {
          select[target[i]] += 1;
        }
        for (let i = 0; i < children.length; i++) {
          children[i].style.display = 'none';
        }
        goNext(++qIdx);
      }, 450);
    },
    false
  );
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  let status = document.querySelector('.statusBar');
  status.style.width = (100 / endPoint) * (qIdx + 1) + '%';
}

begin = () => {
  main.style.WebkitAnimation = 'fadeOut 1s';
  main.style.animation = 'fadeOut 1s';

  setTimeout(() => {
    qna.style.WebkitAnimation = 'fadeIn 1s';
    qna.style.animation = 'fadeIn 1s';
    setTimeout(() => {
      main.style.display = 'none';
      qna.style.display = 'block';
    }, 450);
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
};
