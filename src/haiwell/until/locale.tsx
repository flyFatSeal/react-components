import {Dispatch, SetStateAction, useState} from 'react'
import {useEffect} from 'react'
import muckLang from './lang'

const LangHandle = (
  id: string,
  emitter: Hai,
  setLocale: Dispatch<
    SetStateAction<{
      [key: string]: string
    }>
  >
) => {
  useEffect(() => {
    emitter.onceMessage('returnProjectLang', (data: any) => {
      let filter: typeof data = {}
      Object.keys(data).forEach((key) => {
        key.indexOf(id) && (filter[key] = data[key])
      })
      setLocale({...window.sysLang})
    })
  }, [emitter, setLocale, id])
}
/**
 * @Author 王健
 * @param { String }                   id   当前图元id
 * @return { any } locale 当前图元语言包
 * @description 暂时方案 为了兼容当前组态多语言方案 根据图元id提取配置的多语言信息
 * @Date 2020-09-16 14:03:52 星期三
 */

export const useLocalContext = (id: string) => {
  const [locale, setLocale] = useState<any>(muckLang)

  LangHandle(
    id,
    {
      onceMessage: (
        name: 'returnProjectLang',
        fn: (...args: any[]) => any,
        cover?: boolean
      ) => {},
    } as Hai,
    setLocale
  )

  return locale
}
