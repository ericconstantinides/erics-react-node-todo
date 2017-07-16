import React from 'react'

const logout = ({ toggleLogin }) => {
  const handleLogout = () => {
    toggleLogin()
  }
  return (
    <div>
      <button className="btn btn-sm btn-default" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  )
}
export default logout
