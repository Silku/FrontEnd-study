import React from 'react'
import propTypes from 'prop-types'
import {List,Button,Card } from 'antd'
import { StopTwoTone } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user'
import { followingList } from '../pages/profile'


const FollowList = ({header, data, onClickMore, loading}) => {
    const dispatch = useDispatch();
    const onUnFollow = (id) => () =>{
        if(header === followingList){
            dispatch({
                type:UNFOLLOW_REQUEST,
                data: id,
            });
        }
        dispatch({
            type:REMOVE_FOLLOWER_REQUEST,
            data: id,
        });
    };

    return (
        <List
            style={{marginBottom:'20px'}}
            grid={{gutter:4, xs:2, md:3}}
            size="small"
            header={<div>{header}</div>}
            loadMore={
                <div style={{textAlign:'center', margin:'10px 0'}}>
                <Button onClick={onClickMore} loading={loading}>더보기</Button>
                </div>}
            bordered
            dataSource={data}
            renderItem={(item)=>(
                <List.Item style={{marginTop:'20px', textAlign:'center', color:'red'}}>
                    <Card actions={[<StopTwoTone key="stop" onClick={onUnFollow(item.id)}/>]}>
                        <Card.Meta description={item.nickname}/>
                        <Card.Meta description={item.age ? item.age+'세' : ''}/>
                    </Card>
                </List.Item>
            )}
        >
        </List>
    )
}

FollowList.propTypes = {
    header:propTypes.string.isRequired,
    data:propTypes.array.isRequired,
    onClickMore:propTypes.func.isRequired,
    loadMore:propTypes.bool.isRequired,
}

export default FollowList
