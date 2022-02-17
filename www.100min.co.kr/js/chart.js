//  [100min] 차트 

const labels = [
    '2019년 4월',
    '2019년 5월',
    '2019년 6월',
    '2019년 7월',
    '2019년 8월',
    ];

    const data = {
    labels: labels,
    datasets: [{
        label: '백의민족이 줄인 스티로폼 사용량',
        backgroundColor: 'rgb(57,103,145)',
        borderColor: 'rgb(57,103,145)',
        // 데이터
        data: [0, 10, 10, 17, 43],
    }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins : {
                    // 레전드 설정
                    legend : {
                        display: false
                },
            },
            scales : {
                x : {
                },
                y : {
                    //y축 틱제거
                    ticks: {
                        display: false
                        // color : 'rgb(57,103,145)'
                    },
                    grid : {
                        // borderColor : 'rgb(57,103,145)'
                        // borderDash : []
                    }
                }
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );