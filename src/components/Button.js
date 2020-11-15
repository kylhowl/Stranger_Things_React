import React from 'react'
import { withRouter } from 'react-router-dom'

const Button = ({ text, clickHandler }) => {

    return <button onClick={clickHandler}>{text}</button>

}

export default withRouter(Button)
