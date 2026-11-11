# ADB (Wi-Fi ou USB)

Pour un appareil **déjà en service**, ou qui ne peut pas scanner de QR code. Rien n'est effacé. Vous lancez quelques commandes depuis un ordinateur. Les commandes adb sont les mêmes sous Windows, macOS et Linux.

## 1. Installer adb sur l'ordinateur {#install-adb}

`adb` est l'outil Android qui envoie des commandes à un appareil. Ses commandes se tapent dans un terminal :

| Ordinateur | Ouvrir un terminal |
|---|---|
| Windows | Clic droit sur le bouton Démarrer, puis **Terminal** (ou **Windows PowerShell**) |
| macOS | Appuyez sur <kbd>⌘</kbd> <kbd>Espace</kbd>, tapez **Terminal**, puis <kbd>Entrée</kbd> |
| Linux | Appuyez sur <kbd>Ctrl</kbd> <kbd>Alt</kbd> <kbd>T</kbd> |

Installez ensuite adb :

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

Fermez et rouvrez le terminal, puis vérifiez :

```sh
adb version
```

La version doit être 30 ou plus pour le Wi-Fi. Si elle est inférieure, installez adb à la main.

::: details L'installer à la main
Téléchargez les *SDK Platform-Tools* sur [developer.android.com](https://developer.android.com/tools/releases/platform-tools), décompressez le dossier et ouvrez un terminal dedans. Depuis ce dossier, tapez `.\adb` sous Windows et `./adb` sur macOS et Linux, au lieu de `adb`.
:::

## 2. Activer les options pour les développeurs {#developer-options}

1. Ouvrez **Paramètres › À propos de la tablette**, **À propos du téléphone** ou **À propos de l'appareil**. Le nom dépend de l'appareil.
2. Touchez sept fois **Numéro de build**, jusqu'à ce que l'appareil indique que vous êtes développeur.

| Marque | Où toucher sept fois |
|---|---|
| Google Pixel, la plupart des tablettes | Paramètres › À propos de la tablette › Numéro de build |
| Samsung | Paramètres › À propos de la tablette › Informations sur le logiciel › Numéro de version |
| Lenovo | Paramètres › À propos de la tablette › Version du logiciel |
| Xiaomi, Redmi, POCO | Paramètres › À propos du téléphone › Version de l'OS (ou version MIUI) |
| Sunmi, OPPO, Realme, OnePlus | Paramètres › À propos de l'appareil › Version › Numéro de build |

Toujours perdu ? Ouvrez les Paramètres et cherchez « build », ou lisez la documentation Android : [activer les options pour les développeurs](https://developer.android.com/studio/debug/dev-options?hl=fr#enable).

## 3. Connecter l'appareil {#connect}

### En Wi-Fi (recommandé)

Pour Android 11 et suivants. L'appareil et l'ordinateur doivent être sur le même réseau Wi-Fi.

1. Dans **Paramètres › Système › Options pour les développeurs**, activez **Débogage sans fil** et ouvrez-le.
2. Touchez **Associer l'appareil avec un code d'association**. Une fenêtre affiche une adresse et un code à six chiffres. Tapez-les ici et lancez la commande sur l'ordinateur :

<ClientOnly>
  <PairForm step="pair" />
</ClientOnly>

3. La fenêtre se ferme : l'appareil est associé. Tapez l'adresse maintenant affichée sur l'écran **Débogage sans fil** et lancez la commande :

<ClientOnly>
  <PairForm step="connect" />
</ClientOnly>

Plus de détails dans la documentation Android : [se connecter à un appareil en Wi-Fi](https://developer.android.com/tools/adb?hl=fr#connect-to-a-device-over-wi-fi).

### Avec un câble USB

1. Dans **Paramètres › Système › Options pour les développeurs**, activez **Débogage USB**.
2. Branchez l'appareil à l'ordinateur.
3. Sur l'appareil, touchez **Autoriser** quand il demande de faire confiance à cet ordinateur.

### Vérifier la connexion

<<< @/snippets/devices.sh

L'appareil doit apparaître avec la mention `device`. S'il indique `unauthorized` ou si la liste est vide, voir [Dépannage](./troubleshooting#device-not-seen).

## 4. Installer Odoo Station {#install-app}

Ignorez cette étape si l'app est déjà sur l'appareil.

1. Sur l'ordinateur, téléchargez [odoo-latest-station-release.apk](https://download.odoocdn.com/mobile/android/odoo-latest-station-release.apk).
2. Dans le terminal, allez dans le dossier du téléchargement et installez-le :

::: code-group

<<< @/snippets/install-apk-windows.ps1 [Windows]

<<< @/snippets/install-apk.sh [macOS, Linux]

:::

::: details Sans l'ordinateur
Scannez ce QR code avec la caméra de l'appareil, ou tapez le lien de téléchargement dans son navigateur. Ouvrez le fichier téléchargé et autorisez le navigateur à installer des apps quand Android le demande.

<ApkQr />
:::

## 5. Supprimer les comptes {#accounts}

<!--@include: ./parts/no-account.md-->

## 6. Faire d'Odoo Station le propriétaire de l'appareil {#device-owner}

::: warning Impossible à annuler sans effacer l'appareil
Pour qu'Odoo Station ne gère plus l'appareil plus tard, il faudra le réinitialiser.
:::

<<< @/snippets/set-device-owner.sh

La réponse commence par `Success: Device owner set`. L'appareil peut maintenant être entièrement verrouillé.

::: danger La réponse est différente ?
| La réponse contient | Que faire |
|---|---|
| `already some accounts on the device` | Il reste un compte. Revenez à l'[étape 5](#accounts), puis relancez la commande. |
| `already several users on the device` | Supprimez les autres utilisateurs, les invités et le profil professionnel dans **Paramètres › Système › Utilisateurs multiples**. |
| `already set` | Si vous avez déjà lancé cette commande, c'est fait. Sinon, une autre app gère cet appareil : réinitialisez-le, puis utilisez le [QR code](./qr-code). |
| `Unknown admin` | Odoo Station n'est pas installé. Revenez à l'étape 4. |

Tous les cas sont dans [Dépannage](./troubleshooting#device-owner-fails).
:::

## 7. Choisir ce que l'appareil ouvre {#settings}

Facultatif. Remplissez le formulaire et lancez la commande qu'il donne. Vous pouvez aussi le faire sur l'écran de l'appareil.

<ClientOnly>
  <ProvisioningForm output="adb" />
</ClientOnly>

## 8. Désactiver le débogage

Désactivez **Débogage USB** et **Débogage sans fil** dans les options pour les développeurs, pour que personne ne puisse envoyer de commandes à l'appareil.

Notez d'abord le PIN admin. Sans débogage, un PIN oublié peut imposer une [réinitialisation d'usine](./reference#forgotten-pin).
