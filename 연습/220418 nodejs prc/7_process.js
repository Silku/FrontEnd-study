//process 객체 : 노드에서 항상 사용할 수 있는 객체
//exit
process.on('exit', () => {
  console.log('exit 이벤트 발생');
});

setTimeout(() => {
  console.log('프로그램 종료');
  process.exit;
}, 2000);
