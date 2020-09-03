import * as React from 'react'

export type SizeType = 'small' | 'middle' | 'large' | undefined

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
  direction?: 'ltr' | 'rtl'
  space?: {
    size?: SizeType | number
  }
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  // We provide a default function for Context without provider
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    return suffixCls ? `haiwell-${suffixCls}` : 'haiwell'
  },
})
