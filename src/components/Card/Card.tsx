import React, {FC, useContext} from 'react'
import SizeContext from '../config-provider/SizeContext'
import {ConfigContext} from '../config-provider/context'
import classNames from 'classnames'

export type CardType = 'inner'
export type CardSize = 'default' | 'small'

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**设置 className 前缀 */
  prefixCls?: string
  /** 卡片标题*/
  title?: React.ReactNode
  /** 右侧方自定义节点*/
  extra?: React.ReactNode
  /** 是否有边框*/
  bordered?: boolean
  /** 头部样式*/
  headStyle?: React.CSSProperties
  /** 内容区域自定义样式*/
  bodyStyle?: React.CSSProperties

  style?: React.CSSProperties
  /** 当卡片内容还在加载中时，可以用 loading 展示一个占位*/
  loading?: boolean
  /** 鼠标移过时可浮起*/
  hoverable?: boolean
  children?: React.ReactNode
  id?: string
  /** 类名*/
  className?: string
  /** 卡片大小*/
  size?: CardSize
  /** 卡片类型，可设置为 inner 或 不设置*/
  type?: CardType
  /** 卡片封面*/
  cover?: React.ReactNode
  /** 卡片操作组，位置在卡片底部*/
  actions?: React.ReactNode[]
}

function getAction(actions: React.ReactNode[]) {
  const actionList = actions.map((action, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li style={{width: `${100 / actions.length}%`}} key={`action-${index}`}>
      <span>{action}</span>
    </li>
  ))
  return actionList
}

const Card: FC<CardProps> = (props) => {
  // 获取默认样式名 和size 全局context
  const {getPrefixCls, direction} = useContext(ConfigContext)
  const size = React.useContext(SizeContext)

  const {
    prefixCls: customizePrefixCls,
    className,
    extra,
    headStyle = {},
    bodyStyle = {},
    title,
    loading,
    bordered = true,
    size: customizeSize,
    type,
    cover,
    actions,
    hoverable,
    children,
    ...others
  } = props

  const prefixCls = getPrefixCls('card', customizePrefixCls)
  const loadingBlockStyle =
    bodyStyle.padding === 0 || bodyStyle.padding === '0px'
      ? {padding: 24}
      : undefined

  const loadingBlock = (
    <div className={`${prefixCls}-loading-content`} style={loadingBlockStyle}>
      loading
    </div>
  )

  let head: React.ReactNode

  if (title || extra) {
    head = (
      <div className={`${prefixCls}-head`} style={headStyle}>
        <div className={`${prefixCls}-head-wrapper`}>
          {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
          {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
        </div>
      </div>
    )
  }
  const coverDom = cover ? (
    <div className={`${prefixCls}-cover`}>{cover}</div>
  ) : null
  const body = (
    <div className={`${prefixCls}-body`} style={bodyStyle}>
      {loading ? loadingBlock : children}
    </div>
  )
  const actionDom =
    actions && actions.length ? (
      <ul className={`${prefixCls}-actions`}>{getAction(actions)}</ul>
    ) : null
  const divProps = others
  const mergedSize = customizeSize || size
  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-bordered`]: bordered,
    [`${prefixCls}-hoverable`]: hoverable,
    [`${prefixCls}-${mergedSize}`]: mergedSize,
    [`${prefixCls}-type-${type}`]: !!type,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  })

  return (
    <div {...divProps} className={classString}>
      {head}
      {coverDom}
      {body}
      {actionDom}
    </div>
  )
}

export default Card
