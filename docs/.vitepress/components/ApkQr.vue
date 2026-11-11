<script setup>
import LinkQr from './LinkQr.vue'
import { useMessages } from '../lib/useMessages.js'
import { station } from '../station.js'

const t = useMessages()
</script>

<template>
  <figure class="tool apk-qr">
    <LinkQr :url="station.apkUrl" />
    <figcaption class="hint">{{ t.apkQr }}</figcaption>
  </figure>
</template>
