import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Card from './Card'
import './style/index'

const defaultCard = () => (
  <Card
    title="Default size card"
    extra={<a href="#">More</a>}
    style={{width: 300}}
  >
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
)

const cardWithImg = () => (
  <Card
    style={{width: 300}}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
  >
    <p>Card content</p>
  </Card>
)

storiesOf('Card Component', module)
  .add('Card', defaultCard)
  .add('ImgCard', cardWithImg)
