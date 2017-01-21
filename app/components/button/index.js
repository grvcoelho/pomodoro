import React from 'react'
import styles from './styles.css'

const Button = props => (
  <button className={styles.normal} onClick={props.onClick} {...props}>
    {props.children}
  </button>
)

export default Button
