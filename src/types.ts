
/**
 * 基础组件属性
 */
export interface BaseComponentProps {
    /**
     * 样式名称前缀
     */
    prefixCls?: string
    /**
     * 组件的样式类名
     */
    className?: string

    /**
     * 子节点
     */
    children?: import("react").ReactNode;
}