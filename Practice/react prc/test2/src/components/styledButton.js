import React from "react";
import styled, {css} from "styled-components";
import {darken, lighten} from 'polished'


//4단계 유지보수를 위한 분리
const colorStyles = css`
    ${({theme, color}) => {
        const selected = theme.palette[color];
        return css`
            background : ${selected};
            &:hover{
                background: ${lighten(0.1, selected)};
            }
            &:active{
                background: ${darken(0.1, selected)};
            }
        `;
    }}
`;

const sizeStyles = css`
    ${props =>
        props.size === 'large' &&
        css`
            height:3rem;
            font-size:1.25rem;
    `}
    ${props =>
        props.size === 'medium' &&
        css`
            height:2.25rem;
            font-size:1rem;
    `}
    ${props =>
        props.size === 'small' &&
        css`
            height:1.75rem;
            font-size:0.75rem;
    `}
    }
`;

const StyledButtonCSS = styled.button`
    /*공통 스타일*/
    display : inline-block;
    outline : none;
    border : none;
    border-radius: 4px;
    color : white;
    font-weight: bold;
    cursor:pointer;
    padding : 0 1rem;

    /*크기 */
    ${sizeStyles}

    /*색상*/
    ${colorStyles}

    /*마진*/
    & + & {
        margin-left: 1rem;
    }
`;


//3단계 저장용. props
const level3Save = styled.button`
    /*공통 스타일*/
    display : inline-block;
    outline : none;
    border : none;
    border-radius: 4px;
    color : white;
    font-weight: bold;
    cursor:pointer;
    padding : 0 1rem;

    /*크기 */
    height : 2.25rem;
    font-size: 1rem;

    /*색상*/
    ${props => {
        const selected = props.theme.palette[props.color];
        return css`
            background : ${selected};
            &:hover{
                background: ${lighten(0.1, selected)};
            }
            &:active{
                background: ${darken(0.1, selected)};
            }
        `;
    }}

    /*마진*/
    & + & {
        margin-left: 1rem;
    }
`;


//2단계 저장용, ThemeProvider 적용 이전.
const level2Save = styled.button`
    /*공통 스타일*/
    display : inline-block;
    outline : none;
    border : none;
    border-radius: 4px;
    color : white;
    font-weight: bold;
    cursor:pointer;
    padding : 0 1rem;

    /*크기 */
    height : 2.25rem;
    font-size: 1rem;

    /*색상*/
    background : #f08080;
    &:hover{
        background: ${lighten(0.1, '#f08080')};
    }
    &:active{
        background: ${darken(0.1, '#f08080')};
    }

    /*마진*/
    & + & {
        margin-left: 1rem;
    }
`;


//1단계 저장용, polished 적용 이전.
const level1Save = styled.button`
    /*공통 스타일*/
    display : inline-block;
    outline : none;
    border : none;
    border-radius: 4px;
    color : white;
    font-weight: bold;
    cursor:pointer;
    padding : 0 1rem;

    /*크기 */
    height : 2.25rem;
    font-size: 1rem;

    /*색상*/
    background : #f08080;
    &:hover{
        background: #ffa07a;
    }
    &:active{
        background: #fa8072;
    }

    /*마진*/
    & + & {
        margin-left: 1rem;
    }
`

function Button2({ children, ...rest }){
    return <StyledButtonCSS {...rest}>{children}</StyledButtonCSS>
}

//themeProvider 쓸때 default세팅
Button2.defaultProps = {
    color:'blue',
    size:'medium'
}

export default Button2;