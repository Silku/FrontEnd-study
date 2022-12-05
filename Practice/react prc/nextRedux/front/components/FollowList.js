import React from 'react'
import propTypes from 'prop-types'
import {List,Button,Card } from 'antd'
import { StopTwoTone } from '@ant-design/icons'

const FollowList = ({header, data}) => {
    return (
        <List
            style={{marginBottom:'20px'}}
            grid={{gutter:4, xs:2, md:3}}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={{textAlign:'center', margin:'10px 0'}}><Button>더보기</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item)=>(
                <List.Item style={{marginTop:'20px', textAlign:'center', color:'red'}}>
                    <Card actions={[<StopTwoTone key="stop"/>]}>
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
    data:propTypes.array.isRequired
}

export default FollowList
