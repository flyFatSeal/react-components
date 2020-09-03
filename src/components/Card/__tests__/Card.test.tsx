import React from 'react'
import Card from '../index'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Card', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Card>Nice</Card>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
  })
})
