import React, { useEffect } from 'react'

const Alert = ({ type, mesg, removeAlert, list}) => {

  useEffect(() => {
    const setcount = setTimeout(() => {
      removeAlert()
    }, 3000)
    return (() => {
      clearTimeout(setcount)
    })
  }, [list] )
  return <p className={`alert alert-${type}`}>{mesg}</p>
}

export default Alert
