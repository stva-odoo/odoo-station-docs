<script setup>
import { ref } from 'vue'
import { useMessages } from '../lib/useMessages.js'

const props = defineProps({ text: { type: String, required: true } })
const t = useMessages()
const status = ref('copy')

const copy = async () => {
  status.value = await navigator.clipboard.writeText(props.text).then(
    () => 'copied',
    () => 'copyFailed',
  )
  setTimeout(() => (status.value = 'copy'), 3000)
}
</script>

<template>
  <pre><code>{{ text }}</code></pre>
  <button class="action secondary" type="button" @click="copy">{{ t[status] }}</button>
</template>
