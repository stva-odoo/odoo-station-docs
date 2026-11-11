# QR code

Pour un appareil **neuf ou qui peut être réinitialisé**. L'appareil installe Odoo Station tout seul et devient entièrement verrouillé. Aucune connexion à un ordinateur.

## 1. Créer le QR code

Tous les champs sont facultatifs : ce que vous laissez vide est demandé sur l'appareil.

<ClientOnly>
  <ProvisioningForm output="qr" />
</ClientOnly>

## 2. Réinitialiser l'appareil

Ignorez cette étape si l'appareil est neuf et affiche son écran de bienvenue.

1. Ouvrez **Paramètres › Système › Options de réinitialisation**.
2. Choisissez **Effacer toutes les données (rétablir la configuration d'usine)** et confirmez.

::: danger Tout le contenu de l'appareil est effacé
Les photos, les apps et les comptes sont supprimés. Pour un appareil qui doit garder ses données, utilisez plutôt [ADB](./adb).
:::

Sur Samsung : **Paramètres › Gestion globale › Réinitialisation › Réinitialiser toutes les données**.

## 3. Scanner le QR code

1. Sur l'écran de bienvenue, celui qui demande la langue, **touchez six fois** au même endroit.
2. Si l'appareil le demande, connectez-le au Wi-Fi pour qu'il télécharge le lecteur de QR code.
3. Scannez le QR code.
4. Acceptez les écrans qui suivent. L'appareil télécharge Odoo Station et le configure.

<ClientOnly>
  <ProvisioningQr />
</ClientOnly>

À la fin, Odoo Station s'ouvre.

## Ça ne fonctionne pas

| Ce que vous voyez | Que faire |
|---|---|
| Rien ne se passe après avoir touché six fois | Touchez une zone vide de l'écran, pas un bouton. Certains appareils n'ont pas de lecteur de QR code : utilisez [ADB](./adb). |
| La caméra s'ouvre mais rien n'est scanné | Augmentez la luminosité de l'écran, agrandissez le QR code, tenez l'appareil à 20 ou 30 cm. |
| « Impossible de configurer l'appareil » ou « Contactez votre administrateur » | L'appareil n'a pas pu télécharger l'app. Vérifiez le nom et le mot de passe du Wi-Fi, et que le réseau accède à internet. |
| L'appareil demande un compte Google | Le QR code n'a pas été scanné sur l'écran de bienvenue. Réinitialisez et recommencez. |

La suite dans [Dépannage](./troubleshooting), et dans la documentation Android : [méthode QR code](https://developers.google.com/android/management/provision-device#qr_code_method) (en anglais).
