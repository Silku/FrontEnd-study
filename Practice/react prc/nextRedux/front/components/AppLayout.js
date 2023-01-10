import React, { useCallback } from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link'
import {createSelectorHook, useSelector} from 'react-redux'
import {Menu, Input, Row, Col} from 'antd'
import styled from 'styled-components';
import { useRouter } from 'next/router';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';




const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`
const AppLayout = ({children}) => {
    const router = useRouter();
    const [searchInput, onChangeSearchInput] = useInput('');
    // const  isLogIn = useSelector((state) => state.user.isLogIn); // 구조분해하던지 2가지 방법중 하나 사용
    const {user} = useSelector((state) => state.user);

    const onSearch = useCallback(() => {
        router.push(`/hashtag/${searchInput}`);
    }, [searchInput]);
    
    return (
        <>
            <Menu 
            mode="horizontal"
            selectedKeys={[router.pathname]}
            items={[
                { label: <Link href="/"><a>메인 게시판</a></Link>, key: '/' },
                { label: <Link href="/profile"><a>프로필</a></Link>, key: '/profile' },
                { label: <SearchInput 
                    enterButton
                    value={searchInput}
                    onChange={onChangeSearchInput}
                    onSearch={onSearch}/>, key: '/search'},
                { label: <Link href="/signup"><a>회원가입</a></Link>, key : '/signup'},
            ]}
            />
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {user ? <UserProfile/> : <LoginForm /> }
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