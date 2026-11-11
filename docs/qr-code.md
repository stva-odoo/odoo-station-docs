# QR code

For a device that is **new or can be factory reset**. The device installs Odoo Station by itself and becomes fully locked. No computer connection needed.

## 1. Create the QR code

Every field is optional: what you leave empty is asked on the device.

<ClientOnly>
  <ProvisioningForm output="qr" />
</ClientOnly>

## 2. Factory reset the device

Skip this step if the device is new and shows its welcome screen.

1. Open **Settings › System › Reset options**.
2. Choose **Erase all data (factory reset)** and confirm.

::: danger Everything on the device is erased
Photos, apps and accounts are removed. For a device that must keep its data, use [ADB](./adb) instead.
:::

On Samsung: **Settings › General management › Reset › Factory data reset**.

## 3. Scan the QR code

1. On the welcome screen, the one asking for a language, **tap six times** in the same place.
2. If the device asks for it, connect to Wi-Fi so it can download the QR code reader.
3. Scan the QR code.
4. Accept the screens that follow. The device downloads Odoo Station and sets it up.

<ClientOnly>
  <ProvisioningQr />
</ClientOnly>

When the setup is over, Odoo Station opens.

## It does not work

| What you see | What to do |
|---|---|
| Nothing happens after six taps | Tap on an empty part of the screen, not on a button. Some devices have no QR code reader: use [ADB](./adb). |
| The camera opens but nothing is scanned | Raise the screen brightness, enlarge the QR code, hold the device 20 to 30 cm away. |
| "Can't set up device" or "Contact your IT admin" | The device could not download the app. Check the Wi-Fi name and password, and that the network reaches the internet. |
| The device asks for a Google account | The QR code was not scanned on the welcome screen. Factory reset and start again. |

More in [Troubleshooting](./troubleshooting), and in the Android documentation: [QR code method](https://developers.google.com/android/management/provision-device#qr_code_method).
