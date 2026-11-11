<script setup>
import { useData } from 'vitepress'
import LinkQr from './LinkQr.vue'
import { station } from '../station.js'

const { page, site } = useData()
const url = `${station.siteUrl}${site.value.base}${page.value.relativePath.replace(/\.md$/, '')}`
</script>

<template>
  <div class="tool apk-qr">
    <LinkQr :url="url" />
  </div>
</template>
