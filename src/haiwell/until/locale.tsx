import {Dispatch, SetStateAction, useState} from 'react'
import {useEffect} from 'react'

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
    emitter.onceMessage(
      'returnProjectLang',
      (data: {[key: string]: string}) => {
        let filter: typeof data = {}
        Object.keys(data).forEach((key) => {
          key.indexOf(id) && (filter[key] = data[key])
        })
        setLocale({...window.sysLang})
      }
    )
  }, [emitter, setLocale, id])
}
/**
 * @Author 王健
 * @param { String }                   id   当前图元id
 * @return { {[key: string]: string} } locale 当前图元语言包
 * @description 暂时方案 为了兼容当前组态多语言方案 根据图元id提取配置的多语言信息
 * @Date 2020-09-16 14:03:52 星期三
 */

export const useLocalContext = (id: string) => {
  const [locale, setLocale] = useState<{[key: string]: string}>({Table: '5'})

  LangHandle(id, window._Hai, setLocale)

  return locale
}
