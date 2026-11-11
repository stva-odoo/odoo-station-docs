# Référence

## Réglages {#settings}

Le QR code, le tag NFC, la commande adb et un MDM utilisent les mêmes clés.

| Clé | Type | Effet |
|---|---|---|
| `database_url` | texte | Base de données Odoo à laquelle se connecter, par exemple `mycompany.odoo.com`. |
| `kiosk_url` | texte | Ouvre cette page en kiosque, sans se connecter. Sans `database_url`, la base de données est le serveur de cette adresse. Donnez `pin` avec, sinon la personne devant l'appareil choisit le PIN à la première ouverture. |
| `pin` | texte | PIN admin, chiffres uniquement, au moins 4. Les utilisateurs ne peuvent pas quitter une station sans lui. Sur une station staff, le menu admin permet encore de choisir entre le verrouillage sur la station ou dans l'app. |
| `stay_in_app` | oui / non | Les utilisateurs ne peuvent pas non plus quitter l'app. |
| `always_on` | oui / non | Garde Obox actif en arrière-plan. Obox est la partie de l'app qui permet à Odoo d'utiliser les imprimantes et les appareils connectés à cet appareil Android. |
| `exit_station` | oui / non | Quitte la station en cours. Un PIN et un verrou définis avec ces clés sont conservés. |
| `reset` | oui / non | Oublie la station, le PIN, les réglages, les données web et la base de données, désappaire l'appareil d'Odoo, puis applique les autres clés. |

Une clé qui n'est pas donnée laisse la valeur actuelle telle quelle.

## Changer les réglages plus tard

Envoyez les clés avec adb. Les clés texte utilisent `--es`, les clés oui / non utilisent `--ez` :

<<< @/snippets/apply-settings.sh

Quitter la station en cours :

<<< @/snippets/exit-station.sh

Tout oublier :

<<< @/snippets/reset.sh

## PIN admin oublié {#forgotten-pin}

- **Depuis Odoo**, quand l'appareil est appairé : définissez un nouveau PIN dans la configuration qu'Odoo envoie à l'appareil.
- **Depuis un MDM** : envoyez un nouveau `pin`.
- **Depuis un ordinateur**, quand le débogage est encore activé : envoyez un nouveau PIN avec adb.

<<< @/snippets/set-pin.sh

- **En dernier recours** : réinitialisez l'appareil. Tout son contenu est effacé.

## Réinitialiser un appareil verrouillé {#factory-reset}

Quand les paramètres sont inaccessibles, réinitialisez l'appareil avec ses boutons :

1. Éteignez l'appareil.
2. Maintenez les boutons **Marche/Arrêt** et **Volume** jusqu'à l'apparition d'un menu. Les boutons à maintenir dépendent de la marque.
3. Avec les boutons de volume, choisissez **Wipe data/factory reset**. Confirmez avec le bouton Marche/Arrêt.

Consultez le site d'assistance du fabricant pour les boutons exacts. Voir l'aide Android : [Rétablir la configuration d'usine de votre appareil Android](https://support.google.com/android/answer/6088915?hl=fr).

## Ne plus gérer l'appareil

Android ne permet pas de retirer un propriétaire de l'appareil depuis les paramètres. [Réinitialisez](#factory-reset) l'appareil.

## MDM

Odoo Station déclare ces clés comme configuration gérée : `database_url`, `kiosk_url`, `pin`, `stay_in_app`, `always_on`, `exit_station` et `reset`.

Tout MDM Android Enterprise les liste dans les réglages de l'app et les applique à distance. L'effet de chaque clé est décrit dans [Réglages](#settings).

## Détails techniques

| | |
|---|---|
| Package | `com.odoo.mobile.station` |
| Device admin | `com.odoo.mobile.station/com.odoo.station.app.DeviceAdminReceiver` |
| Téléchargement de l'app | `https://download.odoocdn.com/mobile/android/odoo-latest-station-release.apk` |
| Type d'enregistrement NFC | `application/com.android.managedprovisioning` |
| Version minimale d'Android | 10 |
