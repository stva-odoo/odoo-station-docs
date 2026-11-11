# Troubleshooting

## The device owner command fails {#device-owner-fails}

| The answer contains | Why | What to do |
|---|---|---|
| `already some accounts on the device` | An account is still set up. Android only locks down a device that has none. | [Remove every account](./adb#accounts), then run the command again. To see which ones are left, use the command below. |
| `already several users on the device` | The device has a second user, a guest or a work profile. | Remove them in **Settings › System › Multiple users**. List them with the command below. |
| `already set` | The device already has a device owner. | If you already ran this command, it is done. Otherwise another app manages this device: factory reset it, then use the [QR code](./qr-code). |
| `already has a profile owner` | The device has a work profile. | Remove the work profile in **Settings › Accounts**, then run the command again. |
| `Unknown admin` | Odoo Station is not installed, or it is a different build. | [Install the app](./adb#install-app) and run the command again. |

List the accounts left on the device:

<<< @/snippets/list-accounts.sh

List the users:

<<< @/snippets/list-users.sh

::: tip Nothing helps
A factory reset followed by the [QR code](./qr-code) always works: a freshly reset device has no account.
:::

## The computer does not see the device {#device-not-seen}

| What `adb devices` shows | What to do |
|---|---|
| Nothing under "List of devices attached" | Check that USB debugging is on. Try another cable: some only charge. On Windows, install the USB driver of the manufacturer. |
| `unauthorized` | Look at the device and tap **Allow**. If nothing shows, unplug the cable, tap **Revoke USB debugging authorizations** in the developer options and plug it again. |
| `offline` | Unplug and plug the cable again, or turn Wireless debugging off and on. |
| `adb: command not found` | adb is not installed or the terminal was not reopened. See [Install adb](./adb#install-adb). |

## Wi-Fi pairing fails

| The answer contains | What to do |
|---|---|
| `Failed: Wrong password` or `protocol fault` | The code was not accepted. Codes change each time: read the one on the device and try again. |
| `failed to connect` or `No route to host` | The device and the computer are not on the same Wi-Fi network, or the network blocks devices from talking to each other. Use a USB cable. |
| `Connection refused` | Wrong port. Pairing uses the port of the pairing screen, connecting uses the one of the main Wireless debugging screen. |

## The app does not install

| The answer contains | What to do |
|---|---|
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | Another build of the app is installed. Uninstall it first. |
| `INSTALL_FAILED_VERSION_DOWNGRADE` | A newer version is already installed. Nothing to do. |
| `INSTALL_FAILED_INSUFFICIENT_STORAGE` | Free some space on the device. |
| `No such file or directory` | The terminal is not in the folder of the download. Drag the file into the terminal after `adb install `. |

## The QR code or the NFC tag does nothing

| What you see | What to do |
|---|---|
| Six taps do nothing | The device has no QR code reader in its setup. Use [ADB](./adb). |
| The tag is ignored | Check that the tag is large enough for the content and was written with the right content type. Move it slowly along the back of the device. Otherwise use the [QR code](./qr-code). |
| "Can't set up device" | The app could not be downloaded or its signature did not match. Check the Wi-Fi, then create the QR code again from this site. |

## The device is locked and I forgot the PIN

See [Forgotten admin PIN](./reference#forgotten-pin).
