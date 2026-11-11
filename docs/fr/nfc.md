# Tag NFC

Pour un appareil **neuf ou qui peut être réinitialisé** et équipé du NFC. Écrivez un tag, puis approchez-le de chaque appareil à configurer : pratique pour beaucoup d'appareils.

::: warning Dépend de l'appareil
La lecture d'un tag de configuration sur l'écran de bienvenue dépend de chaque fabricant. S'il ne se passe rien quand vous approchez le tag, utilisez le [QR code](./qr-code).
:::

## Ce qu'il vous faut

- Un **tag NFC assez grand pour le contenu** : le formulaire affiche la taille nécessaire. Une carte, un autocollant ou un porte-clés conviennent.
- Un **téléphone Android ou un iPhone avec NFC** pour écrire le tag.
- Une **app d'écriture NFC** sur ce téléphone, par exemple *NFC Tools*. Inutile avec Chrome sur Android.

## 1. Ouvrir cette page sur votre téléphone

Scannez ce QR code avec le téléphone :

<PageQr />

## 2. Remplir le formulaire

Tous les champs sont facultatifs.

<ClientOnly>
  <ProvisioningForm output="nfc" />
</ClientOnly>

## 3. Écrire le tag

<ClientOnly>
  <NfcWriter />
</ClientOnly>

1. Ouvrez l'app d'écriture NFC.
2. Ajoutez un enregistrement de type **Données** (type MIME personnalisé).
3. Collez ce type de contenu :
   ```
   application/com.android.managedprovisioning
   ```
4. Collez ce contenu comme données :

<ClientOnly>
  <NfcContent />
</ClientOnly>

5. Écrivez le tag : tenez-le contre l'arrière du téléphone.

## 4. Approcher le tag de l'appareil

1. Réinitialisez l'appareil s'il n'est pas neuf : **Paramètres › Système › Options de réinitialisation › Effacer toutes les données**.
2. Sur l'écran de bienvenue, tenez le tag contre l'arrière de l'appareil, là où se trouve son antenne NFC.
3. Acceptez les écrans qui suivent. L'appareil rejoint le Wi-Fi, télécharge Odoo Station et le configure.

Un problème ? Voir [Dépannage](./troubleshooting), et la documentation Android : [méthode NFC](https://developers.google.com/android/management/provision-device#nfc_method) (en anglais).
