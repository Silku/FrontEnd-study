import styled, { createGlobalStyle } from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'

export const Overlay = styled.div`
    /* display: none; */
    position: fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`
export const Header = styled.header`
    position: relative;
    height : 44px;
    background-color: #fff;
    padding:0;
    text-align: center;
    
    /* 자식스타일 선택 & 띄워쓰기 유의 */
    & h1{
        margin: 0;
        font-size: 24px;
        color:#333;
        line-height: 44px; 
    }
    
`
export const CloseBtn = styled(CloseOutlined)`
    position: absolute;
    top:0;
    right: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
`

export const SlickWrapper = styled.div`
    height: calc(100%-44px);
    background: #090909;
`
export const ImgWrapper = styled.div`
    padding :32px;
    text-align: center;

    & img{
        margin:0 auto;
        max-height: 750px;
    }
`
export const Indicator = styled.div`
    text-align: center;
    & > div{
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #313131;
        display: inline-block;
        text-align: center;
        color: white;
        font-size: 15px;
    }
`
export const Global = createGlobalStyle`
    .slick-slide {
        display: inline-block;
    }
`
