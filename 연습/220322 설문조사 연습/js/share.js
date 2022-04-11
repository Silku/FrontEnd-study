const url = 'https://willowy-alfajores-9f7c15.netlify.app/'

function setShare(){
    let resultImg = document.querySelector("#resultImg")
    let resultAlt = resultImg.firstElementChild.alt;
    const shareTitle = 'tw\'s 연애 심리테스트 결과';
    const shareDesc = infoList[resultAlt].name;
    const shareImage = url + 'img/image_' + resultAlt + '.png';
    const shareURL = url + 'share/result-' + resultAlt + '.html';

    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: shareTitle,
            description: shareDesc,
            imageUrl: shareImage,
            link: {
            mobileWebUrl: 'shareURL',
            webUrl: 'shareURL', 
            },
        },
        social: {
            likeCount: 10,
            commentCount: 20,
            sharedCount: 30,
        },
        buttons: [
            {
            title: '결과 확인하기',
            link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL,
            },
            },
        ] 
        });

}

