import DefaultTheme from 'vitepress/theme'
import ApkQr from '../components/ApkQr.vue'
import MethodChooser from '../components/MethodChooser.vue'
import NfcContent from '../components/NfcContent.vue'
import NfcWriter from '../components/NfcWriter.vue'
import PageQr from '../components/PageQr.vue'
import PairForm from '../components/PairForm.vue'
import ProvisioningForm from '../components/ProvisioningForm.vue'
import ProvisioningQr from '../components/ProvisioningQr.vue'
import { useBrowserLanguage } from './language.js'
import './style.css'

const components = { ApkQr, MethodChooser, NfcContent, NfcWriter, PageQr, PairForm, ProvisioningForm, ProvisioningQr }

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    Object.entries(components).forEach(([name, component]) => app.component(name, component))
  },
  setup: useBrowserLanguage,
}
