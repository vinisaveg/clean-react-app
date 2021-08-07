import React, { FunctionComponent, memo } from 'react'

import Logo from '../logo/logo'
import Styles from './header-styles.scss'

const Header: FunctionComponent = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />

        <div className={Styles.logoutWrap}>
          <span>vinisaveg</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
