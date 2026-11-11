import { defineConfig } from 'vitepress'

const languages = {
  root: {
    label: 'English',
    lang: 'en',
    description: 'Set up an Android device as a fully locked Station',
    guide: 'Guide',
    setUp: 'Set up a device',
    choose: 'Choose a method',
    qrCode: 'QR code',
    nfc: 'NFC tag',
    adb: 'ADB (Wi-Fi or USB)',
    help: 'Help',
    troubleshooting: 'Troubleshooting',
    reference: 'Reference',
    outline: 'On this page',
    previous: 'Previous page',
    next: 'Next page',
    lastUpdated: 'Last updated',
    darkMode: 'Appearance',
    returnToTop: 'Return to top',
    menu: 'Menu',
  },
  fr: {
    label: 'Français',
    lang: 'fr',
    description: 'Configurer un appareil Android comme Station entièrement verrouillée',
    guide: 'Guide',
    setUp: 'Configurer un appareil',
    choose: 'Choisir une méthode',
    qrCode: 'QR code',
    nfc: 'Tag NFC',
    adb: 'ADB (Wi-Fi ou USB)',
    help: 'Aide',
    troubleshooting: 'Dépannage',
    reference: 'Référence',
    outline: 'Sur cette page',
    previous: 'Page précédente',
    next: 'Page suivante',
    lastUpdated: 'Mis à jour le',
    darkMode: 'Apparence',
    returnToTop: 'Retour en haut',
    menu: 'Menu',
  },
}

const locale = (key, t) => {
  const base = key === 'root' ? '' : `/${key}`
  return {
    label: t.label,
    lang: t.lang,
    description: t.description,
    themeConfig: {
      nav: [
        { text: t.guide, link: `${base}/choose` },
        { text: t.troubleshooting, link: `${base}/troubleshooting` },
      ],
      sidebar: [
        {
          text: t.setUp,
          items: [
            { text: t.choose, link: `${base}/choose` },
            { text: t.qrCode, link: `${base}/qr-code` },
            { text: t.nfc, link: `${base}/nfc` },
            { text: t.adb, link: `${base}/adb` },
          ],
        },
        {
          text: t.help,
          items: [
            { text: t.troubleshooting, link: `${base}/troubleshooting` },
            { text: t.reference, link: `${base}/reference` },
          ],
        },
      ],
      outline: { level: [2, 3], label: t.outline },
      docFooter: { prev: t.previous, next: t.next },
      lastUpdated: { text: t.lastUpdated },
      darkModeSwitchLabel: t.darkMode,
      returnToTopLabel: t.returnToTop,
      sidebarMenuLabel: t.menu,
    },
  }
}

export default defineConfig({
  title: 'Odoo Station',
  base: '/odoo-station-docs/',
  cleanUrls: true,
  srcExclude: ['**/parts/**'],
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/odoo-station-docs/odoo-station.svg' }]],
  locales: Object.fromEntries(Object.entries(languages).map(([key, t]) => [key, locale(key, t)])),
  themeConfig: {
    logo: '/odoo-station.svg',
    search: {
      provider: 'local',
      options: {
        locales: {
          fr: {
            translations: {
              button: { buttonText: 'Rechercher', buttonAriaLabel: 'Rechercher' },
              modal: {
                noResultsText: 'Aucun résultat pour',
                resetButtonTitle: 'Effacer la recherche',
                footer: { selectText: 'ouvrir', navigateText: 'naviguer', closeText: 'fermer' },
              },
            },
          },
        },
      },
    },
  },
})
