import React from 'react'

import {configure, addDecorator, addParameters} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: {inline: true, header: false}})
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')]
  const commonComponents = require.context(
    '../src/components',
    true,
    /\.stories\.tsx$/
  )
  const haiwellComponents = require.context(
    '../src/haiwell',
    true,
    /\.stories\.tsx$/
  )
  commonComponents
    .keys()
    .forEach((fname) => allExports.push(commonComponents(fname)))
  haiwellComponents
    .keys()
    .forEach((fname) => allExports.push(haiwellComponents(fname)))
  return allExports
}

// automatically import all files ending in *.stories.js
configure(loaderFn, module)
