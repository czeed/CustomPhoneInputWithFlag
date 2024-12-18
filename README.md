# Champ de Saisie de Numéro de Téléphone avec Drapeaux et Validation

Ce projet fournit un composant React pour un champ de saisie de numéro de téléphone qui affiche le drapeau du pays ainsi que l'indicatif téléphonique. Le composant permet à l'utilisateur de sélectionner un pays, de saisir un numéro de téléphone, et de valider automatiquement le numéro saisi.

## Fonctionnalités

- Affichage du drapeau du pays avec l'indicatif téléphonique.
- Validation automatique du numéro de téléphone en fonction du pays sélectionné (utilisation de `google-libphonenumber`).
- Intégration de Material UI 5 (`mui5`) pour une interface moderne.
- Prise en charge de plusieurs pays avec `react-international-phone`.
- Gestion des erreurs et affichage dynamique du numéro de téléphone.

## Installation

### 1. Cloner le projet

Clonez le repository dans votre répertoire local avec la commande suivante :

```bash
git clone <url-du-repository>
cd <nom-du-dossier>
```

### 2. Installer les dépendances

Une fois dans le répertoire du projet, installez toutes les dépendances en exécutant :

```bash
npm install
```

### 3. Lancer le serveur de développement

Pour démarrer l'application en mode développement, utilisez la commande suivante :

```bash
npm run dev
```

Cela démarrera le serveur de développement et vous pourrez voir l'application dans votre navigateur à l'adresse suivante : http://localhost:5173 (par défaut).

## Fonctionnement du Composant

Le composant principal du projet est PhoneInputWithFlag, qui combine plusieurs fonctionnalités pour permettre une saisie de numéro de téléphone interactive et validée. Voici les éléments principaux :

### CustomInput

Le composant CustomInput est un champ de saisie de type OutlinedInput de Material UI, avec des fonctionnalités supplémentaires comme la gestion des erreurs, un texte d’espace réservé et une info-bulle lorsque le champ est désactivé.

Props :

    - id : L'ID unique pour l'input.
    - label : Le texte de l'étiquette pour le champ de saisie.
    - customSx : Styles personnalisés.
    - defaultValue, value : Valeur initiale ou contrôlée de l'input.
    - onChange : Fonction pour gérer les changements de valeur.
    - disabled : Si l'input doit être désactivé.
    - disableReason : Raison d’être désactivé (affichée dans une info-bulle).
    - placeholder : Texte d'espace réservé.
    - minRows : Nombre de lignes pour un champ multilignes.
    - required : Indique si l'input est requis.
    - error : Gère l'affichage des erreurs.
    - endAdornment : Élément à ajouter à la fin du champ (ex. icône).
    - type : Le type de l'input (par défaut "text").
    - onCut, onPaste : Événements pour gérer les actions de découpe et de collage.

### PhoneInputWithFlag

Le composant PhoneInputWithFlag gère le champ de saisie de numéro de téléphone avec un sélecteur de pays et un indicatif téléphonique. Il utilise le package react-international-phone pour la gestion des pays et des indicatifs, et la bibliothèque google-libphonenumber pour valider le numéro de téléphone.

Props :

    - label : L'étiquette pour le champ de saisie.
    - defaultValue : La valeur initiale du numéro de téléphone (facultatif).
    - required : Si le champ est requis (facultatif). - disabled : Si le champ est désactivé (facultatif).
    - onChange : Fonction de rappel pour la gestion des changements de numéro de téléphone.

#### Validation du Numéro de Téléphone

Le composant valide le numéro de téléphone en utilisant google-libphonenumber pour s'assurer que le numéro est bien au format valide pour le pays sélectionné. Si le numéro est incorrect, le champ de saisie affiche une bordure rouge pour indiquer une erreur.

## Exemple d'Utilisation

Voici un exemple de code pour utiliser le composant PhoneInputWithFlag dans votre application React :

```jsx
import React, { useState, useCallback } from "react";
import { Typography } from "@mui/material";
import PhoneInputWithFlag from "./components/PhoneInputWithFlag";

function App() {
  const [phone, setPhone] = (useState < string) | (undefined > "");

  const HandlePhoneChange = useCallback((newPhone?: string) => {
    setPhone(newPhone);
  }, []);

  return (
    <>
      <PhoneInputWithFlag label="Téléphone" onChange={HandlePhoneChange} />
      <Typography sx={{ marginTop: "2px" }}>{phone}</Typography>
    </>
  );
}

export default App;
```

## Bibliothèques Utilisées

- Material UI 5 : Utilisé pour la gestion de l'interface utilisateur, avec des composants comme FormControl, InputLabel, OutlinedInput, et Select.
- react-international-phone : Permet la gestion de la saisie de numéro de téléphone international avec les indicatifs et les drapeaux des pays.
- google-libphonenumber : Utilisé pour valider et formater les numéros de téléphone en fonction des standards internationaux.
