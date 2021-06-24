import React, { FunctionComponent, memo } from 'react'

import Styles from './footer-styles.scss'

const Footer: FunctionComponent = () => {
  return <footer className={Styles.footer} />
}

export default memo(Footer)
