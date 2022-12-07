import React from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link'
import {createSelectorHook, useSelector} from 'react-redux'
import {Menu, Input, Row, Col} from 'antd'
import styled from 'styled-components';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';



const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`
const AppLayout = ({children}) => {
    
    // const  isLogIn = useSelector((state) => state.user.isLogIn); // 구조분해하던지 2가지 방법중 하나 사용
    const {isLogIn} = useSelector((state) => state.user);

    return (
        <>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>메인 게시판</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput enterButton />
                </Menu.Item>
                <Menu.Item>
                    <Link href="signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLogIn ? <UserProfile/> : <LoginForm /> }
                </Col>
                <Col xs={24} md={12}>{children}</Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/Silku" target="_blank" rel="noreferrer noopener">Github</a>    
                </Col>
            </Row> 
        </>
    )
}



AppLayout.propTypes = {
    children : PropTypes.node.isRequired
    // 화면에 그릴수 있는 모든게 node, React의 node임
};

export default AppLayout