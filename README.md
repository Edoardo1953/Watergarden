# Watergarden Management Sàrl — Plateforme de Gestion

Application web pour la société holding de participations luxembourgeoise **Watergarden Management Sàrl**.

---

## 🏛️ Présentation de la Société

- **Dénomination :** Watergarden Management Sàrl
- **Forme :** Société à responsabilité limitée (Holding de participations)
- **Juridiction :** Luxembourg
- **Capital Social :** 261.000,00 € (entièrement souscrit et libéré, 2.610 parts de 100 €)
- **RCS Luxembourg :** B 248910
- **Gérance :** TUBIA Edoardo (Gérant Unique)
- **Comptes Bancaires :** Olky Pay (Luxembourg - EUR) & Revolut Business (EUR/BRL/USD)

---

## 🌴 Participation Étrangère : ArcoIris Ltda (Brésil) & Sombra SPA

- **Filiale Détenue :** ArcoIris Ltda (Brésil - CNPJ 38.921.405/0001-82)
- **Détention :** 85,00 % (Contrôle majoritaire avec associé local minoritaire 15%)
- **Actif d'Hospitality :** **Sombra SPA Resort** (Praia de Pipa, Tibau do Sul, RN, Brésil)
  - 22 unités et chalets de luxe (dont 6 chalets Master avec piscine privée)
  - Centre SPA holistique (8 cabines de soin) & piscine à débordement chauffée
  - Terrain de 14.500 m² en pleine propriété (Matrícula N° 12.485)
  - Valorisation estimée : 2.850.000 € (R$ 16,75M)

---

## 📊 Modules de l'Application

1. **La Société & Cap Table (`index.html`)**
   - Fiche d'identité juridique et gouvernance
   - Registre des associés & Cap Table interactive (style Green Enerbras)
   - Graphique Donut Chart.js de détention du capital
   - Modale plein écran de l'organigramme Luxembourg / Brésil
2. **Comptes Bancaires & Trésorerie (`banca.html`)**
   - Suivi multi-comptes Olky Pay et Revolut Business
   - Grand livre de trésorerie avec filtres par banque, catégorie, recherche
   - Saisie manuelle d'écritures avec sauvegarde locale
3. **Comptabilité PCN (`contabilita.html`)**
   - Bilan Actif (Classes 2 à 5) et Passif (Classes 1 à 4) conforme au PCN Luxembourg
   - Compte de Pertes & Profits (Classes 6 et 7)
   - Balance générale des comptes
4. **Participation ArcoIris & Sombra SPA (`partecipazioni.html`)**
   - Fiche complète de la filiale brésilienne
   - Caractéristiques techniques du resort hôtelier Sombra SPA
   - Indicateurs financiers : ADR, Taux d'occupation, RevPAR, EBITDA
5. **Conformité AML / LBC-FT (`aml.html`)**
   - Registre KYC des associés & souscripteurs
   - Simulateur interactif de score de risque (Loi 12 nov 2004, AED, CSSF)
   - Fiches permanentes KYC et conformité transfrontalière Bacen (RDE-IED)
6. **Documents & Archives (`documenti.html`)**
   - Classement des actes statutaires, extraits RCS/RBE, relevés et contrats

---

## 🚀 Démarrage

Double-cliquer sur le fichier :
```
Avvia Watergarden.bat
```
Ou démarrer le serveur Python :
```bash
python server.py
```
Puis ouvrir l'URL dans le navigateur : `http://localhost:8089/`
