<script setup>
import CopyBlock from './CopyBlock.vue'
import { nfcContent } from '../lib/generated.js'
</script>

<template>
  <div class="tool payload">
    <CopyBlock v-if="nfcContent" :text="nfcContent" />
  </div>
</template>
