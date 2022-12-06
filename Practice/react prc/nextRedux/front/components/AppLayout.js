import React, {useState} from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link'
import {Menu, Input, Row, Col} from 'antd'
import styled from 'styled-components';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';



const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`
const AppLayout = ({children}) => {
    const [isLogIn, setIsLogIn ] = useState(false);
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
                    {isLogIn ? <UserProfile setIsLogIn={setIsLogIn}/> : <LoginForm setIsLogIn={setIsLogIn}/> }
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