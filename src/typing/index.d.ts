interface Window {
  _locale: {[key: string]: string}
  hai: Hai
  sysLang: {
    [key: string]: string
  }
  /** 蜂鸣器*/
  Common: {
    Bee: () => void
  }
  socket: any
}

interface HaiElement extends HTMLElement {
  /** 获取节点的属性 */
  GetAttr(name: string): string
  GetAttrBool(name: string): boolean
  GetAttrInt(attr: string): number
  GetWinId(): string
  ClickId: string
}

interface Hai {
  define(fn: (exports: (name: string, obj: any) => void) => void): void
  define(
    depends: string[],
    fn: (exports: (name: string, obj: any) => void) => void
  ): void
  parseToDOM(str: string): HTMLElement
  use(key: string, callback: () => void)
  each(obj: {[k: string]: any}, callback: (key: string, value: any) => void)
  onceMessage(
    name: 'returnProjectLang',
    fn: (...args: any[]) => any,
    cover?: boolean
  )
  onMessage(
    name: 'returnProjectLang',
    fn: (...args: any[]) => any,
    cover?: boolean
  )
  offMessage(name: string, fn: (...args: any[]) => any)
}
