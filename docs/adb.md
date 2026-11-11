# ADB (Wi-Fi or USB)

For a device that is **already in use**, or that cannot scan a QR code. Nothing is erased. You run a few commands from a computer. The adb commands are the same on Windows, macOS and Linux.

## 1. Install adb on the computer {#install-adb}

`adb` is the Android tool that sends commands to a device. You type its commands in a terminal:

| Computer | Open a terminal |
|---|---|
| Windows | Right-click the Start button, then **Terminal** (or **Windows PowerShell**) |
| macOS | Press <kbd>⌘</kbd> <kbd>Space</kbd>, type **Terminal**, press <kbd>Enter</kbd> |
| Linux | Press <kbd>Ctrl</kbd> <kbd>Alt</kbd> <kbd>T</kbd> |

Then install adb:

::: code-group

```powershell [Windows]
winget install Google.PlatformTools
```

```sh [macOS]
brew install android-platform-tools
```

```sh [Linux (Debian, Ubuntu)]
sudo apt install adb
```

```sh [Linux (Fedora)]
sudo dnf install android-tools
```

:::

Close and reopen the terminal, then check:

```sh
adb version
```

The version must be 30 or more for Wi-Fi. If it is lower, install adb by hand.

::: details Install it by hand
Download the *SDK Platform-Tools* from [developer.android.com](https://developer.android.com/tools/releases/platform-tools), unzip the folder, and open a terminal in it. From that folder, type `.\adb` on Windows and `./adb` on macOS and Linux, instead of `adb`.
:::

## 2. Turn on developer options on the device {#developer-options}

1. Open **Settings › About tablet**, **About phone** or **About device**. The name depends on the device.
2. Tap **Build number** seven times, until the device says you are a developer.

| Brand | Where to tap seven times |
|---|---|
| Google Pixel, most tablets | Settings › About tablet › Build number |
| Samsung | Settings › About tablet › Software information › Build number |
| Lenovo | Settings › About tablet › Software version |
| Xiaomi, Redmi, POCO | Settings › About phone › OS version (or MIUI version) |
| Sunmi, OPPO, Realme, OnePlus | Settings › About device › Version › Build number |

Still lost? Open Settings and search for "build", or read the Android documentation: [Enable developer options](https://developer.android.com/studio/debug/dev-options#enable).

## 3. Connect the device {#connect}

### Over Wi-Fi (preferred)

For Android 11 and later. The device and the computer must be on the same Wi-Fi network.

1. In **Settings › System › Developer options**, turn on **Wireless debugging** and open it.
2. Tap **Pair device with pairing code**. A window shows an address and a six-digit code. Type them here and run the command on the computer:

<ClientOnly>
  <PairForm step="pair" />
</ClientOnly>

3. The window closes: the device is paired. Type the address now shown on the **Wireless debugging** screen and run the command:

<ClientOnly>
  <PairForm step="connect" />
</ClientOnly>

More in the Android documentation: [Connect to a device over Wi-Fi](https://developer.android.com/tools/adb#connect-to-a-device-over-wi-fi).

### With a USB cable

1. In **Settings › System › Developer options**, turn on **USB debugging**.
2. Plug the device into the computer.
3. On the device, tap **Allow** when it asks to trust this computer.

### Check the connection

<<< @/snippets/devices.sh

The device must be listed as `device`. If it says `unauthorized` or the list is empty, see [Troubleshooting](./troubleshooting#device-not-seen).

## 4. Install Odoo Station {#install-app}

Skip this step if the app is already on the device.

1. On the computer, download [odoo-latest-station-release.apk](https://download.odoocdn.com/mobile/android/odoo-latest-station-release.apk).
2. In the terminal, go to the folder of the download and install it:

::: code-group

<<< @/snippets/install-apk-windows.ps1 [Windows]

<<< @/snippets/install-apk.sh [macOS, Linux]

:::

::: details Without the computer
Scan this QR code with the camera of the device, or type the download link in its browser. Open the downloaded file and allow the browser to install apps when Android asks.

<ApkQr />
:::

## 5. Remove the accounts {#accounts}

<!--@include: ./parts/no-account.md-->

## 6. Make Odoo Station the device owner {#device-owner}

::: warning This cannot be undone without erasing the device
To stop Odoo Station from managing the device later, the device must be factory reset.
:::

<<< @/snippets/set-device-owner.sh

The answer starts with `Success: Device owner set`. The device can now be fully locked.

::: danger It answered something else?
| The answer contains | What to do |
|---|---|
| `already some accounts on the device` | An account is still there. Go back to [step 5](#accounts), then run the command again. |
| `already several users on the device` | Remove the other users, guests and the work profile in **Settings › System › Multiple users**. |
| `already set` | If you already ran this command, it is done. Otherwise another app manages this device: factory reset it, then use the [QR code](./qr-code). |
| `Unknown admin` | Odoo Station is not installed. Go back to step 4. |

All the cases are in [Troubleshooting](./troubleshooting#device-owner-fails).
:::

## 7. Choose what the device opens {#settings}

Optional. Fill in the form and run the command it gives. You can also do this on the screen of the device.

<ClientOnly>
  <ProvisioningForm output="adb" />
</ClientOnly>

## 8. Turn off debugging

Turn off **USB debugging** and **Wireless debugging** in the developer options, so nobody can send commands to the device.

Write down the admin PIN first. With debugging off, a forgotten PIN can mean a [factory reset](./reference#forgotten-pin).
