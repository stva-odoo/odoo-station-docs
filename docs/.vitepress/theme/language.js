import { onMounted } from 'vue'
import { useData, useRouter } from 'vitepress'

const STORED = 'odoo-station-docs-language'

export const useBrowserLanguage = () => {
  const { site } = useData()
  const router = useRouter()

  const localeOf = (path) => {
    const first = path.slice(site.value.base.length).split('/')[0]
    return first in site.value.locales ? first : 'root'
  }
  const remember = (path) => localStorage.setItem(STORED, localeOf(path))

  onMounted(() => {
    const path = location.pathname
    const locales = Object.fromEntries(Object.entries(site.value.locales).map(([key, locale]) => [locale.lang, key]))
    const wanted = locales[navigator.languages.map((language) => language.slice(0, 2)).find((language) => language in locales)]
    const firstVisit = localStorage.getItem(STORED) === null
    router.onAfterRouteChange = remember
    if (firstVisit && wanted && wanted !== 'root' && localeOf(path) === 'root') {
      router.go(`${site.value.base}${wanted}/${path.slice(site.value.base.length)}${location.search}${location.hash}`)
    } else {
      remember(path)
    }
  })
}
