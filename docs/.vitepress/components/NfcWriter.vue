<script setup>
import { ref } from 'vue'
import { nfcContent } from '../lib/generated.js'
import { useMessages } from '../lib/useMessages.js'
import { NFC_MIME_TYPE } from '../lib/provisioning.js'

const t = useMessages()
const supported = 'NDEFReader' in window
const status = ref('')

const write = async () => {
  status.value = t.value.holdTag
  status.value = await new window.NDEFReader()
    .write({ records: [{ recordType: 'mime', mediaType: NFC_MIME_TYPE, data: new TextEncoder().encode(nfcContent.value) }] })
    .then(
      () => t.value.tagWritten,
      (error) => `${t.value.tagFailed} ${error.message}`,
    )
}
</script>

<template>
  <div v-if="supported" class="tool payload">
    <p>{{ t.writeTagIntro }}</p>
    <button class="action" type="button" :disabled="!nfcContent" @click="write">{{ t.writeTag }}</button>
    <p v-if="status" class="hint">{{ status }}</p>
    <p>{{ t.writeTagOtherwise }}</p>
  </div>
</template>
