import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ cls, to, children, ...props }) => {
  let className = "button "
  className = cls === "primary" ? className += cls
    : cls === "secondary" ? className += cls
      : cls === "success" ? className += cls
        : cls === "danger" ? className += cls : null

  if (to) {
    return (
      <Link to={to} className={className} {...props}>
        {children}
      </Link>
    )
  } else {
    return (
      <button className={className} {...props}>
        {children}
      </button>
    )
  }
}

export default Button