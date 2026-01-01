import { createContext, useContext } from 'react'

const LanguageContext = createContext({
  language: 'es',
  setLanguage: () => {}
})

export const LanguageProvider = LanguageContext.Provider

export const useLanguage = () => useContext(LanguageContext)

export default LanguageContext
