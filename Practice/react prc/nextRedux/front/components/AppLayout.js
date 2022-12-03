import React from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link'
import {Menu, Input, Row, Col} from 'antd'
import App from './menutest';
const AppLayout = ({children}) => {
  return (
    <>
        <Menu mode="horizontal">
            <Menu.Item>
                <Link href=""><a>메인 게시판</a></Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="profile"><a>프로필</a></Link>
            </Menu.Item>
            <Menu.Item>
                <Input.Search enterButton style={{verticalAlign:'middle'}}/>
            </Menu.Item>
            <Menu.Item>
                <Link href="signup"><a>회원가입</a></Link>
            </Menu.Item>
        </Menu>
        <App/>
        <Row gutter={8}>
            <Col xs={24} md={6}>왼쪽</Col>
            <Col xs={24} md={12}>가운데</Col>
            <Col xs={24} md={6}>
                <a href="https://github.com/Silku" target="_blank" rel="noreferrer noopener">Github</a>    
            </Col>
        </Row> 
        {children}
    </>
  )
}



AppLayout.propTypes = {
    children : PropTypes.node.isRequired
    // 화면에 그릴수 있는 모든게 node, React의 node임
};

export default AppLayout