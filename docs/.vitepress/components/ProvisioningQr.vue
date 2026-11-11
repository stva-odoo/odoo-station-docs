<script setup>
import { qrImage } from '../lib/generated.js'
</script>

<template>
  <div class="tool">
    <img v-if="qrImage" class="qr" :src="qrImage" alt="QR code" />
  </div>
</template>
