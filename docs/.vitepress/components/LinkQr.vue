<script setup>
import QRCode from 'qrcode'

const props = defineProps({ url: { type: String, required: true } })

const MARGIN = 4
const { modules } = QRCode.create(props.url, { errorCorrectionLevel: 'M' })
const size = modules.size + 2 * MARGIN
const squares = Array.from(modules.data, (dark, index) =>
  dark ? `M${(index % modules.size) + MARGIN} ${Math.floor(index / modules.size) + MARGIN}h1v1h-1z` : '',
).join('')
</script>

<template>
  <svg class="qr" :viewBox="`0 0 ${size} ${size}`" role="img" :aria-label="url" shape-rendering="crispEdges">
    <rect :width="size" :height="size" fill="#fff" />
    <path :d="squares" fill="#000" />
  </svg>
</template>
