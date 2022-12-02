import React from 'react'
import PropTypes from 'prop-types';

const AppLayout = ({children}) => {
  return (
    <>
        <div>공통메뉴</div>
        {children}
    </>
  )
}

AppLayout.propTypes = {
    children : PropTypes.node.isRequired
    // 화면에 그릴수 있는 모든게 node, React의 node임
};

export default AppLayout