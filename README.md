# 🚀 Portfolio Développeur Web

Un portfolio moderne, animé et responsive construit en **React** (via CDN) et **Tailwind CSS**.

---

## ✅ Fonctionnalités implémentées

### 🔹 Navbar
- Navbar sticky fixe en haut de page
- Logo + liens de navigation (Accueil, Projets, Compétences, Contact)
- Scroll fluide vers les sections
- Indication de la section active en surbrillance
- Menu hamburger animé sur mobile
- Transition glassmorphism au scroll

### 🔹 Section Hero
- Animation d'effet machine à écrire (typewriter) sur le titre
- Apparition progressive des éléments (fade-in, slide-up)
- Avatar animé avec anneau rotatif dégradé
- Badge de disponibilité
- Boutons CTA (Voir mes projets / Me contacter)
- Statistiques (projets, années d'expérience, etc.)
- Indicateur de scroll animé
- Orbes lumineux décoratifs

### 🔹 Section Projets
- Grille responsive de cartes projets (1-2-3 colonnes)
- Chaque carte contient : image, titre, description, tags technos
- Boutons "Voir le projet" (démo) et "Voir le code" (GitHub) — nouvel onglet
- Filtre par technologie
- Hover avec élévation + ombre bleue
- Apparition au scroll (reveal animation)
- 6 projets placeholder inclus

### 🔹 Section Compétences
- Badge grid avec icône colorée par technologie
- Barres de progression animées au scroll
- Tags supplémentaires (TypeScript, Docker, etc.)
- Fond subtil avec grille de points

### 🔹 Section Contact
- Informations de contact (Email, GitHub, LinkedIn) cliquables
- Carte de disponibilité
- Formulaire complet (Nom, Email, Sujet, Message)
- Validation côté client
- Animation d'envoi + message de succès
- Liens dans un nouvel onglet pour GitHub/LinkedIn

### 🔹 Footer
- Copyright dynamique (année auto)
- Liens réseaux sociaux
- Icônes Font Awesome

### 🔹 UX & Animations
- Scroll fluide global
- Reveal animation (fade-in-up) au scroll avec IntersectionObserver
- Effet hover sur toutes les cartes et boutons
- Bouton "Retour en haut" flottant
- Scrollbar personnalisée bleue
- Design glassmorphism moderne

---

## 📁 Structure du projet

```
index.html          ← Application complète (React + Tailwind CSS)
README.md           ← Documentation
```

## 🔗 URIs / Ancres

| Section      | Ancre         |
|--------------|---------------|
| Accueil      | `#accueil`    |
| Projets      | `#projets`    |
| Compétences  | `#competences`|
| Contact      | `#contact`    |

---

## 🎨 Stack technique

| Technologie     | Rôle                        | Source         |
|-----------------|-----------------------------|----------------|
| React 18        | Composants UI               | unpkg CDN      |
| Tailwind CSS    | Styles utilitaires          | CDN officiel   |
| Font Awesome 6  | Icônes                      | jsDelivr CDN   |
| Google Fonts    | Typographies Inter + Fira   | fonts.google   |
| Babel Standalone| Transpilation JSX           | unpkg CDN      |

---

## 📝 Placeholders à remplacer

Dans `index.html`, recherchez et remplacez :

| Placeholder               | Description                     |
|---------------------------|---------------------------------|
| `Votre Prénom Nom`        | Votre vrai nom                  |
| `votre@email.com`         | Votre adresse email             |
| `votre-username`          | Votre pseudo GitHub             |
| `votre-profil`            | Votre profil LinkedIn           |
| Données `PROJECTS`        | Vos vrais projets               |
| Données `SKILLS`          | Vos vraies compétences + niveaux|
| Images Unsplash           | Captures de vos projets         |
| Stats Hero                | Vos vraies statistiques         |

---

## 🚧 Améliorations possibles

- [ ] Intégrer un vrai service d'envoi d'email (EmailJS, Formspree)
- [ ] Ajouter une page de détail projet avec modal
- [ ] Mode clair / sombre
- [ ] Animation de particules en arrière-plan
- [ ] Section témoignages clients
- [ ] Blog / articles techniques
- [ ] Téléchargement du CV en PDF
- [ ] Internationalisation (FR/EN)

---

## 📱 Responsive

Le site est entièrement adapté à :
- 📱 **Mobile** : layout 1 colonne, menu hamburger
- 📟 **Tablette** : layout 2 colonnes
- 🖥️ **Desktop** : layout 3 colonnes, navigation complète
