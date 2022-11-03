


const labels = [
'정서안정',
'외향성',
'원만성',
'불안감',
'우울감',
'만족감'
];

const data = {
    labels: labels,
    datasets: [{
        label: '우울 상태 결과확인',
        data: [40, 35, 45, 20, 30, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
};



const config = {
    type: 'line',
    data: data,
    options: {
        // responsive: false,
        scales : {
            y : {
                ticks : {
                    min : -10,
                    beginAtZero : true,
                    fontSize : 140,
                }
            }
            // y : {
            //     // beginAtZero : true
            //     // grace : 40
            // }
        },
        elements: {
            line: {
                borderWidth: 3
            }
        }
    },
};

const myChart = new Chart(
document.getElementById('myChart'),
config
);