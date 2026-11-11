import { station } from '../station.js'

const EXTRA = 'android.app.extra.PROVISIONING_'
export const NFC_MIME_TYPE = 'application/com.android.managedprovisioning'
const NFC_RECORD_OVERHEAD = 54

const text = (value) => (value || '').trim()

export const shellSafe = (value) => text(value).replace(/['"\\$`\s]/g, '')

export const pinProblem = (pin) => text(pin) !== '' && !/^\d{4,}$/.test(text(pin))

export const stationKeys = ({ databaseUrl, pin, stayInApp, alwaysOn }) => ({
  ...(text(databaseUrl) && { database_url: text(databaseUrl) }),
  ...(text(pin) && { pin: text(pin) }),
  ...(stayInApp && { stay_in_app: true }),
  ...(alwaysOn && { always_on: true }),
})

const deviceExtras = ({ locale, timeZone, ssid, wifiPassword }) => ({
  [`${EXTRA}DEVICE_ADMIN_COMPONENT_NAME`]: station.adminReceiver,
  [`${EXTRA}DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION`]: station.apkUrl,
  [`${EXTRA}DEVICE_ADMIN_SIGNATURE_CHECKSUM`]: station.signatureChecksum,
  [`${EXTRA}LEAVE_ALL_SYSTEM_APPS_ENABLED`]: true,
  ...(locale && { [`${EXTRA}LOCALE`]: locale }),
  ...(timeZone && { [`${EXTRA}TIME_ZONE`]: timeZone }),
  ...(text(ssid) && {
    [`${EXTRA}WIFI_SSID`]: text(ssid),
    [`${EXTRA}WIFI_SECURITY_TYPE`]: wifiPassword ? 'WPA' : 'NONE',
    ...(wifiPassword && { [`${EXTRA}WIFI_PASSWORD`]: wifiPassword }),
  }),
})

const withStationKeys = (form, encode) => {
  const keys = stationKeys(form)
  return {
    ...deviceExtras(form),
    ...(Object.keys(keys).length && { [`${EXTRA}ADMIN_EXTRAS_BUNDLE`]: encode(keys) }),
  }
}

export const qrPayload = (form) => JSON.stringify(withStationKeys(form, (keys) => keys), null, 2)

const properties = (entries) =>
  Object.entries(entries)
    .map(([key, value]) => `${key}=${String(value).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/^ /, '\\ ')}`)
    .join('\n')

export const nfcPayload = (form) => properties(withStationKeys(form, properties))

export const nfcTagBytes = (payload) => new TextEncoder().encode(payload).length + NFC_RECORD_OVERHEAD

export const adbCommand = (form) => {
  const extras = Object.entries(stationKeys(form))
    .map(([key, value]) => (value === true ? `--ez ${key} true` : `--es ${key} '${shellSafe(value)}'`))
    .join(' ')
  return `adb shell "am start -n ${station.commandActivity} ${extras}"`
}
