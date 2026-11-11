# NFC tag

For a device that is **new or can be factory reset** and has NFC. Write one tag, then tap it on every device to set up: handy for many devices.

::: warning Depends on the device
Reading a setup tag on the welcome screen is up to each manufacturer. If nothing happens when you tap the tag, use the [QR code](./qr-code).
:::

## What you need

- An **NFC tag large enough for the content**: the form shows the size needed. A card, a sticker or a key fob all work.
- An **Android phone or an iPhone with NFC** to write the tag.
- An **NFC writing app** on that phone, for example *NFC Tools*. Not needed with Chrome on Android.

## 1. Open this page on your phone

Scan this QR code with the phone:

<PageQr />

## 2. Fill in the form

Every field is optional.

<ClientOnly>
  <ProvisioningForm output="nfc" />
</ClientOnly>

## 3. Write the tag

<ClientOnly>
  <NfcWriter />
</ClientOnly>

1. Open the NFC writing app.
2. Add a record of type **Data** (custom MIME type).
3. Paste this content type:
   ```
   application/com.android.managedprovisioning
   ```
4. Paste this content as the data:

<ClientOnly>
  <NfcContent />
</ClientOnly>

5. Write the tag: hold it against the back of the phone.

## 4. Tap the tag on the device

1. Factory reset the device if it is not new: **Settings › System › Reset options › Erase all data**.
2. On the welcome screen, hold the tag against the back of the device, where its NFC antenna is.
3. Accept the screens that follow. The device joins the Wi-Fi, downloads Odoo Station and sets it up.

Problems? See [Troubleshooting](./troubleshooting), and the Android documentation: [NFC method](https://developers.google.com/android/management/provision-device#nfc_method).
