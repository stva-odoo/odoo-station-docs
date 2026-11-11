<script setup>
import { computed, reactive } from 'vue'
import { useData, withBase } from 'vitepress'
import { useMessages } from '../lib/useMessages.js'

const t = useMessages()
const { localeIndex } = useData()

const questions = ['erasable', 'camera', 'nfc']
const answers = reactive({ erasable: null, camera: null, nfc: null })

const methods = {
  qr: { page: 'qr-code', title: 'useQr', why: 'useQrWhy' },
  nfc: { page: 'nfc', title: 'useNfc', why: 'useNfcWhy' },
  adb: { page: 'adb', title: 'useAdb', why: 'useAdbWhy' },
}

const choice = computed(() => {
  if (answers.erasable === false || answers.nfc === false) return methods.adb
  if (answers.camera) return methods.qr
  if (answers.nfc) return methods.nfc
  return null
})
const asked = computed(() => {
  const answered = questions.filter((key) => answers[key] !== null)
  return choice.value ? answered : questions.slice(0, answered.length + 1)
})

const answer = (key, value) => {
  questions.slice(questions.indexOf(key) + 1).forEach((later) => (answers[later] = null))
  answers[key] = value
}
const link = computed(() => withBase(`${localeIndex.value === 'root' ? '' : `/${localeIndex.value}`}/${choice.value.page}`))
const startOver = () => answer('erasable', null)
</script>

<template>
  <div class="tool chooser">
    <fieldset v-for="key in asked" :key="key">
      <legend>{{ t[key] }}</legend>
      <p v-if="t[`${key}Hint`]" class="hint">{{ t[`${key}Hint`] }}</p>
      <div class="choices">
        <button type="button" class="action" :class="{ secondary: answers[key] !== true }" @click="answer(key, true)">{{ t.yes }}</button>
        <button type="button" class="action" :class="{ secondary: answers[key] !== false }" @click="answer(key, false)">{{ t.no }}</button>
      </div>
    </fieldset>

    <section v-if="choice" class="result">
      <strong>{{ t[choice.title] }}</strong>
      <p class="hint">{{ t[choice.why] }}</p>
      <div class="choices">
        <a class="action" :href="link">{{ t.openGuide }}</a>
        <button type="button" class="action secondary" @click="startOver">{{ t.startOver }}</button>
      </div>
    </section>
  </div>
</template>
