import React, { FunctionComponent } from 'react'

import { Footer, Icon } from '@/presentation/components'
import { Header, IconName } from '@/presentation/components/'
import Styles from './survey-list-styles.scss'

const SurveyList: FunctionComponent = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>

        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
              <time>
                <span className={Styles.day}>08</span>
                <span className={Styles.month}>07</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>

          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.iconWrap} iconName={IconName.thumbDown} />
              <time>
                <span className={Styles.day}>08</span>
                <span className={Styles.month}>07</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
