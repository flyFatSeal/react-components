import React from 'react'
import {storiesOf} from '@storybook/react'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 Haiwell 组件库</h1>
        <code>npm install Haiwell --save</code>
      </>
    )
  },
  {info: {disable: true}}
)
