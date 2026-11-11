<script setup>
import { computed, reactive } from 'vue'
import CopyBlock from './CopyBlock.vue'
import { useMessages } from '../lib/useMessages.js'
import { shellSafe } from '../lib/provisioning.js'

const props = defineProps({ step: { type: String, required: true } })
const t = useMessages()

const steps = {
  pair: [
    { key: 'address', label: 'pairAddress', placeholder: '192.168.1.50:37123' },
    { key: 'code', label: 'pairCode', placeholder: '123456' },
  ],
  connect: [{ key: 'address', label: 'connectAddress', placeholder: '192.168.1.50:41235' }],
}
const fields = steps[props.step]
const form = reactive({ address: '', code: '' })
const values = computed(() => fields.map(({ key }) => shellSafe(form[key])))
const ready = computed(() => values.value.every(Boolean))
</script>

<template>
  <div class="tool">
    <form autocomplete="off" @submit.prevent>
      <fieldset>
        <label v-for="field in fields" :key="field.key">
          <span>{{ t[field.label] }}</span>
          <input v-model="form[field.key]" :placeholder="field.placeholder" />
        </label>
      </fieldset>
    </form>
    <div class="payload">
      <CopyBlock v-if="ready" :text="`adb ${step} ${values.join(' ')}`" />
      <p v-else class="hint">{{ t.pairIncomplete }}</p>
    </div>
  </div>
</template>
