import { computed } from 'vue'
import { useData } from 'vitepress'
import { messagesFor } from './messages.js'

export const useMessages = () => {
  const { lang } = useData()
  return computed(() => messagesFor(lang.value))
}
