import React, {Fragment} from 'react'
import {action} from '@storybook/addon-actions'

import Button from './button'

import './style/index'

export const defaultButton = () => (
  <Button onClick={action('clicked')}> default button </Button>
)

export const buttonWithSize = () => {
  return (
    <Fragment>
      <Button size="lg" style={{marginRight: '10px'}}>
        large button
      </Button>
      <Button size="sm"> small button </Button>
    </Fragment>
  )
}

export const buttonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://google.com">
      link button
    </Button>
  </>
)

export default {title: 'Button', component: Button}
