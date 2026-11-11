# Dépannage

## La commande device owner échoue {#device-owner-fails}

| La réponse contient | Pourquoi | Que faire |
|---|---|---|
| `already some accounts on the device` | Un compte est encore configuré. Android ne verrouille qu'un appareil qui n'en a aucun. | [Supprimez tous les comptes](./adb#accounts), puis relancez la commande. Pour voir ceux qui restent, utilisez la commande ci-dessous. |
| `already several users on the device` | L'appareil a un second utilisateur, un invité ou un profil professionnel. | Supprimez-les dans **Paramètres › Système › Utilisateurs multiples**. Listez-les avec la commande ci-dessous. |
| `already set` | L'appareil a déjà un propriétaire. | Si vous avez déjà lancé cette commande, c'est fait. Sinon, une autre app gère cet appareil : réinitialisez-le, puis utilisez le [QR code](./qr-code). |
| `already has a profile owner` | L'appareil a un profil professionnel. | Supprimez le profil professionnel dans **Paramètres › Comptes**, puis relancez la commande. |
| `Unknown admin` | Odoo Station n'est pas installé, ou c'est une autre version de l'app. | [Installez l'app](./adb#install-app) et relancez la commande. |

Lister les comptes restés sur l'appareil :

<<< @/snippets/list-accounts.sh

Lister les utilisateurs :

<<< @/snippets/list-users.sh

::: tip Rien n'y fait
Une réinitialisation d'usine suivie du [QR code](./qr-code) fonctionne toujours : un appareil fraîchement réinitialisé n'a aucun compte.
:::

## L'ordinateur ne voit pas l'appareil {#device-not-seen}

| Ce qu'affiche `adb devices` | Que faire |
|---|---|
| Rien sous « List of devices attached » | Vérifiez que le débogage USB est activé. Essayez un autre câble : certains ne font que charger. Sous Windows, installez le pilote USB du fabricant. |
| `unauthorized` | Regardez l'appareil et touchez **Autoriser**. Si rien ne s'affiche, débranchez le câble, touchez **Révoquer les autorisations de débogage USB** dans les options pour les développeurs et rebranchez. |
| `offline` | Débranchez et rebranchez le câble, ou désactivez puis réactivez le débogage sans fil. |
| `adb: command not found` | adb n'est pas installé ou le terminal n'a pas été rouvert. Voir [Installer adb](./adb#install-adb). |

## L'association Wi-Fi échoue

| La réponse contient | Que faire |
|---|---|
| `Failed: Wrong password` ou `protocol fault` | Le code n'a pas été accepté. Les codes changent à chaque fois : relisez celui de l'appareil et réessayez. |
| `failed to connect` ou `No route to host` | L'appareil et l'ordinateur ne sont pas sur le même réseau Wi-Fi, ou le réseau empêche les appareils de se parler. Utilisez un câble USB. |
| `Connection refused` | Mauvais port. L'association utilise le port de l'écran d'association, la connexion celui de l'écran principal Débogage sans fil. |

## L'app ne s'installe pas

| La réponse contient | Que faire |
|---|---|
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | Une autre version de l'app est installée. Désinstallez-la d'abord. |
| `INSTALL_FAILED_VERSION_DOWNGRADE` | Une version plus récente est déjà installée. Rien à faire. |
| `INSTALL_FAILED_INSUFFICIENT_STORAGE` | Libérez de l'espace sur l'appareil. |
| `No such file or directory` | Le terminal n'est pas dans le dossier du téléchargement. Glissez le fichier dans le terminal après `adb install `. |

## Le QR code ou le tag NFC ne fait rien

| Ce que vous voyez | Que faire |
|---|---|
| Rien ne se passe après avoir touché six fois | L'appareil n'a pas de lecteur de QR code dans son assistant. Utilisez [ADB](./adb). |
| Le tag est ignoré | Vérifiez que le tag est assez grand pour le contenu et qu'il a été écrit avec le bon type de contenu. Déplacez-le lentement le long de l'arrière de l'appareil. Sinon, utilisez le [QR code](./qr-code). |
| « Impossible de configurer l'appareil » | L'app n'a pas pu être téléchargée ou sa signature ne correspondait pas. Vérifiez le Wi-Fi, puis recréez le QR code depuis ce site. |

## L'appareil est verrouillé et j'ai oublié le PIN

Voir [PIN admin oublié](./reference#forgotten-pin).
