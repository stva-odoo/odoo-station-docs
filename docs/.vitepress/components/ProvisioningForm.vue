<script setup>
import { computed, reactive, watchEffect } from 'vue'
import { useData } from 'vitepress'
import QRCode from 'qrcode'
import CopyBlock from './CopyBlock.vue'
import { LOCALES } from '../lib/locales.js'
import { nfcContent, qrImage } from '../lib/generated.js'
import { useMessages } from '../lib/useMessages.js'
import { adbCommand, nfcPayload, nfcTagBytes, pinProblem, qrPayload, stationKeys } from '../lib/provisioning.js'

const props = defineProps({ output: { type: String, required: true } })
const t = useMessages()
const { lang } = useData()

const zones = Intl.supportedValuesOf?.('timeZone') ?? ['UTC']
const ownZone = Intl.DateTimeFormat().resolvedOptions().timeZone
const androidLocale = (tag) => {
  const { language, region } = new Intl.Locale(tag).maximize()
  return `${language}_${region}`
}
const ownLocale = [...navigator.languages.filter((tag) => tag.startsWith(lang.value)), lang.value]
  .map(androidLocale)
  .find((locale) => LOCALES.some(([code]) => code === locale))

const forDevice = props.output !== 'adb'
const forQr = props.output === 'qr'

const form = reactive({
  databaseUrl: '',
  pin: '',
  stayInApp: false,
  alwaysOn: false,
  ssid: '',
  wifiPassword: '',
  locale: (forQr && ownLocale) || '',
  timeZone: forQr && zones.includes(ownZone) ? ownZone : '',
})

const badPin = computed(() => pinProblem(form.pin))
const payload = computed(() => ({ qr: qrPayload, nfc: nfcPayload, adb: adbCommand })[props.output](form))
const ready = computed(() => !badPin.value && (forDevice || Object.keys(stationKeys(form)).length > 0))
const nfcBytes = computed(() => nfcTagBytes(payload.value))

watchEffect(() => {
  if (props.output === 'nfc') nfcContent.value = ready.value ? payload.value : ''
})
watchEffect(async () => {
  if (forQr) qrImage.value = ready.value ? await QRCode.toDataURL(payload.value, { errorCorrectionLevel: 'M', margin: 4, width: 1024 }) : ''
})
</script>

<template>
  <div class="tool" :class="{ 'two-columns': forDevice }">
    <form autocomplete="off" @submit.prevent>
      <fieldset>
        <legend>{{ t.station }}</legend>
        <label>
          <span>{{ t.databaseUrl }}</span>
          <input v-model="form.databaseUrl" placeholder="mycompany.odoo.com" />
          <small>{{ t.databaseUrlHint }}</small>
        </label>
        <details>
          <summary>{{ t.advanced }}</summary>
          <label class="check"><input v-model="form.stayInApp" type="checkbox" />{{ t.stayInApp }}</label>
          <label class="field">
            <span>{{ t.pin }}</span>
            <input v-model="form.pin" inputmode="numeric" placeholder="1234" :aria-invalid="badPin" />
            <small :class="{ problem: badPin }">{{ badPin ? t.pinProblem : t.pinHint }}</small>
          </label>
          <label class="check"><input v-model="form.alwaysOn" type="checkbox" />{{ t.alwaysOn }}</label>
        </details>
      </fieldset>

      <fieldset v-if="forDevice">
        <legend>{{ t.device }}</legend>
        <label>
          <span>{{ t.ssid }}</span>
          <input v-model="form.ssid" />
          <small>{{ t.ssidHint }}</small>
        </label>
        <label>
          <span>{{ t.wifiPassword }}</span>
          <input v-model="form.wifiPassword" type="password" />
          <small>{{ t.wifiPasswordHint }}</small>
        </label>
        <label>
          <span>{{ t.locale }}</span>
          <select v-model="form.locale">
            <option value="">{{ t.deviceDefault }}</option>
            <option v-for="[code, name] in LOCALES" :key="code" :value="code">{{ name }}</option>
          </select>
        </label>
        <label>
          <span>{{ t.timeZone }}</span>
          <select v-model="form.timeZone">
            <option value="">{{ t.deviceDefault }}</option>
            <option v-for="zone in zones" :key="zone" :value="zone">{{ zone.replaceAll('_', ' ') }}</option>
          </select>
        </label>
      </fieldset>
    </form>

    <section v-if="forDevice" class="result">

      <template v-if="forQr && qrImage">
        <img class="qr" :src="qrImage" alt="QR code" />
        <a class="action" :href="qrImage" download="odoo-station-qr.png">{{ t.downloadQr }}</a>
        <details class="payload">
          <summary>{{ t.showContent }}</summary>
          <CopyBlock :text="payload" />
        </details>
      </template>

      <p v-if="output === 'nfc'" class="hint">{{ t.nfcSize }} {{ nfcBytes }} {{ t.bytes }}</p>

    </section>
    <div v-if="output === 'adb'" class="payload">
      <CopyBlock v-if="ready" :text="payload" />
      <p v-else class="hint">{{ t.nothingToApply }}</p>
    </div>
  </div>
</template>
