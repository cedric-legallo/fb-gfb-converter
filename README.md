# fb-gfb-converter
Outil de conversion de l'export LaRondeSuisse vers le PowerBI du FB

# Utilisation

## Récupération des données
Récupérer sur [LaRondeSuisse](https://larondesuisse.com/fr/) dans la section Outils l'export CSV

<img width="441" height="206" alt="image" src="https://github.com/user-attachments/assets/ec927b94-9b75-4d48-93ec-c1e6d2d43340" />

Cela vous fournit un fichier nommé GFB-S44-[TIMESTAMP].csv à sauvegarder à la racine du projet

## Conversion pour l'outil interne du FB

 * Ouvrir un terminal avec Node.js à la racine du dossier
 * Lancer la commande node converter --file=GFB-S44-[TIMESTAMP].csv
 * La commande génère :
   * Un fichier result-gfb-all.csv (pas utilisé pour le moment)
   * Un fichier result-gfb-J[X].csv par journée de championnat déjà jouée (à envoyer à Papatte)
   * Un fichier appariements.txt avec la liste des matchs pour la dernièer journée (à générer après le lancement de la ronde suivante)
