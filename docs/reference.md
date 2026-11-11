# Reference

## Settings {#settings}

The QR code, the NFC tag, the adb command and an MDM all use the same keys.

| Key | Type | Effect |
|---|---|---|
| `database_url` | text | Odoo database to connect to, for instance `mycompany.odoo.com`. |
| `kiosk_url` | text | Opens this page as a kiosk, without signing in. Without `database_url`, the database is the server of this address. Give `pin` with it, otherwise the person in front of the device chooses the PIN at the first opening. |
| `pin` | text | Admin PIN, digits only, at least 4. Users cannot leave a station without it. On a staff station, the admin menu still chooses between locking to the station or in the app. |
| `stay_in_app` | yes / no | Users cannot leave the app either. |
| `always_on` | yes / no | Keeps Obox running in the background. Obox is the part of the app that lets Odoo use the printers and devices connected to this Android device. |
| `exit_station` | yes / no | Leaves the current station. A PIN and a lock set with these keys are kept. |
| `reset` | yes / no | Forgets the station, the PIN, the settings, the web data and the database, unpairs the device from Odoo, then applies the other keys. |

A key that is not given leaves the current value as it is.

## Change the settings later

Send the keys with adb. Text keys use `--es`, yes / no keys use `--ez`:

<<< @/snippets/apply-settings.sh

Leave the current station:

<<< @/snippets/exit-station.sh

Forget everything:

<<< @/snippets/reset.sh

## Forgotten admin PIN {#forgotten-pin}

- **From Odoo**, when the device is paired: set a new PIN in the configuration Odoo sends to the device.
- **From an MDM**: send a new `pin`.
- **From a computer**, when debugging is still on: send a new PIN with adb.

<<< @/snippets/set-pin.sh

- **Last resort**: factory reset the device. Everything on it is erased.

## Factory reset a locked device {#factory-reset}

When the settings cannot be opened, reset the device with its buttons:

1. Turn the device off.
2. Hold the **Power** and **Volume** buttons until a menu shows. The buttons to hold depend on the brand.
3. With the volume buttons, choose **Wipe data/factory reset**. Confirm with the power button.

Check the support site of the manufacturer for the exact buttons. See the Android help: [Reset your Android device to factory settings](https://support.google.com/android/answer/6088915).

## Stop managing the device

Android does not let a device owner be removed from the settings. [Factory reset](#factory-reset) the device.

## MDM

Odoo Station declares these keys as managed configuration: `database_url`, `kiosk_url`, `pin`, `stay_in_app`, `always_on`, `exit_station` and `reset`.

Any Android Enterprise MDM lists them in the settings of the app and applies them remotely. What each key does is in [Settings](#settings).

## Technical details

| | |
|---|---|
| Package | `com.odoo.mobile.station` |
| Device admin | `com.odoo.mobile.station/com.odoo.station.app.DeviceAdminReceiver` |
| App download | `https://download.odoocdn.com/mobile/android/odoo-latest-station-release.apk` |
| NFC record type | `application/com.android.managedprovisioning` |
| Minimum Android version | 10 |
