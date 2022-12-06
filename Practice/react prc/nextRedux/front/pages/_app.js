import React from 'react'
import Proptypes from 'prop-types'
import Head from 'next/head'
// import 'antd/dist/antd.css'
import wrapper from '../store/configureStore'

const NextBoard = ({Component}) => {
  return (
    <>
        <Head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Next Board</title>
        </Head>
        <Component/>
    </>
  )
}

NextBoard.Proptypes = {
    component : Proptypes.elementType.isRequired,
}


export default wrapper.withRedux(NextBoard)