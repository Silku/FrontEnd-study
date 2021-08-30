//process 객체는 노드에서 항상 사용할 수 있는 객체
//exit:  process 객체안에 포함
process.on('exit', () => {
    console.log('exit 이벤트 발생!');
});

setTimeout(() => {
    console.log('3초 후 시스템 종료');
    process.exit;
}, 3000);