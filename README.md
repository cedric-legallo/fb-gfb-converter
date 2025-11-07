# fb-gfb-converter
Outil de conversion de l'export LaRondeSuisse vers le PowerBI du FB

# Utilisation

## Récupération des données
Récupérer sur [LaRondeSuisse](https://larondesuisse.com/fr/) dans la section Outils l'export CSV

<img width="441" height="206" alt="image" src="https://github.com/user-attachments/assets/ec927b94-9b75-4d48-93ec-c1e6d2d43340" />

Cela vous fournit un fichier nommé GFB-S44-[TIMESTAMP].csv à sauvegarder à la racine du projet

## Conversion pour l'outil interne du FB

 * Ouvrir un terminal avec Node.js à la racine du dossier
 * Lancer la commande : node converter --file=GFB-S44-[TIMESTAMP].csv
 * La commande génère :
   * Un fichier result-gfb-all.csv (pas utilisé pour le moment)
   * Un fichier result-gfb-J[X].csv par journée de championnat déjà jouée (à envoyer à Papatte)
   * Un fichier appariements.txt avec la liste des matchs pour la dernièer journée (à générer après le lancement de la ronde suivante)

## Récupération des stats par journée
 * Télécharger l'export JBB de la journée N-1 et stocker le dans le dossier exports
 * Télécharger l'export JBB de la journée N et stocker le dans le dossier exports
 * Ouvrir un terminal avec Node.js à la racine du dossier
 * Lancer la commande node statJournée -J=N ou N est le numéro de la journée à extraire
 * La commande génère un fichier stat-JN.csv
 * Uploader le fichier dans le drive de Papatte FrancoBowl-Resultat-S44 onglet GFB-Journéees

## Nouveau tour
 * Lancer la nouvelle ronde sur larondesuisse
 * Récupérer les données comme expliqué ci-dessus
 * Convertir les données comme expliqué ci-dessus
 * Publier appariements.txt sur le discord en taggant les coachs @Coachs - GFB
 * Récupérer les stats par journée comme expliqué ci-dessus



