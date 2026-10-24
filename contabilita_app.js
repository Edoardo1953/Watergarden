/**
 * Watergarden Management Sàrl - Logique Comptable PCN & Multi-Année / Comparateur
 * Années supportées : 2024 (Déposé), 2025 (Déposé), 2026 (YTD Octobre 2026)
 * Modes :
 * 1. Vue par Année Individuelle (2024, 2025, 2026 YTD)
 * 2. Comparateur Personnalisé entre deux années au choix (ex: 2025 vs 2026 YTD, 2024 vs 2025, 2024 vs 2026 YTD)
 */

let comptaMode = 'single'; // 'single' ou 'comparatif'
let selectedSingleYear = '2025';
let compareYear1 = '2024';
let compareYear2 = '2025';
let currentActiveComptaTab = 'bilan';

function formatCurrency(val) {
    if (val === null || val === undefined || isNaN(val)) return "0,00 €";
    const num = Number(val);
    const parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",") + " €";
}

function formatPercent(val) {
    if (val === null || val === undefined || isNaN(val)) return "-";
    const num = Number(val);
    const sign = num > 0 ? "+" : "";
    return `${sign}${num.toFixed(2).replace('.', ',')} %`;
}

function formatNumber(val) {
    if (val === null || val === undefined || isNaN(val)) return "0";
    const num = Number(val);
    const parts = Math.round(num).toString().split('.');
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// -------------------------------------------------------------
// BASE DE DONNÉES DES COMPOSITIONS DÉTAILLÉES (DRILLDOWN)
// -------------------------------------------------------------
const COMPTA_DRILLDOWN_DB = {
    // ACTIF
    "actif_frais_etab": [
        { ref: "203", desc: "Frais d'augmentation de capital et diverses opérations (Valeur brute)", tiers: "Notaire & Greffe RCSL", val_2024: 10318.71, val_2025: 10318.71, val_2026: 10318.71, note: "Valeur brute immobilisée (RCS B 149.151)" },
        { ref: "2039", desc: "Amortissements cumulés des frais de constitution et opérations", tiers: "Amortissement comptable linéaire", val_2024: -6259.93, val_2025: -7978.96, val_2026: -9698.00, note: "VNC résiduelle : 2024: 4.058,78 € • 2025: 2.339,75 € • 2026: 620,72 €" }
    ],
    "actif_parts_arcoiris": [
        { ref: "2310000", desc: "Parts sociales 1.088.404.400 quotas dans ArcoIris Ltda (99,0896%)", tiers: "ArcoIris Ltda (Brésil)", val_2024: 5657646.49, val_2025: 5657646.49, val_2026: 5657646.49, note: "Participation de contrôle 99,09% • Titulaire Resort Sombra e Água Fresca (Praia de Pipa)" }
    ],
    "actif_prets_arcoiris": [
        { ref: "232100002", desc: "Prêt participatif 7% ArcoIris (Tranche 2.7M BRL) - Sergio Vandi", tiers: "Sergio Vandi", val_2024: 48212.05, val_2025: 48212.05, val_2026: 48212.05, note: "Financement expansion hôtelière 7% l'an" },
        { ref: "232100003", desc: "Prêt participatif 7% ArcoIris (Tranche 2.7M BRL) - Jean-Pierre Murgia", tiers: "Jean-Pierre Murgia", val_2024: 3374.84, val_2025: 3374.84, val_2026: 3374.84, note: "Financement expansion hôtelière 7% l'an" },
        { ref: "232100004", desc: "Prêt participatif 7% ArcoIris (Tranche 2.7M BRL) - Stefano Bosi", tiers: "Stefano Bosi", val_2024: 38569.64, val_2025: 38569.64, val_2026: 38569.64, note: "Financement expansion hôtelière 7% l'an" },
        { ref: "232100005", desc: "Prêt participatif 7% ArcoIris (Tranche 2.7M BRL) - Marco Canton", tiers: "Marco Canton", val_2024: 28927.23, val_2025: 28927.23, val_2026: 28927.23, note: "Financement expansion hôtelière 7% l'an" },
        { ref: "232100006", desc: "Prêt participatif 7% ArcoIris (Tranche 2.7M BRL) - Susik Hemawiti", tiers: "Susik Hemawiti", val_2024: 11088.77, val_2025: 11088.77, val_2026: 11088.77, note: "Financement expansion hôtelière 7% l'an" },
        { ref: "232100007", desc: "Prêt participatif 7% ArcoIris (Tranche 2.7M BRL) - Marco Sterzi", tiers: "Marco Sterzi", val_2024: 65568.38, val_2025: 65568.38, val_2026: 65568.38, note: "Financement expansion hôtelière 7% l'an" },
        { ref: "232100008", desc: "Prêt participatif 7% ArcoIris (Tranche 2.7M BRL) - Giorgio Vignolle", tiers: "Giorgio Vignolle", val_2024: 26516.63, val_2025: 26516.63, val_2026: 26516.63, note: "Financement expansion hôtelière 7% l'an" },
        { ref: "232100009", desc: "Prêt participatif 7% ArcoIris (Tranche 2.7M BRL) - Edoardo Tubia", tiers: "Edoardo Tubia", val_2024: 70871.71, val_2025: 70871.71, val_2026: 70871.71, note: "Financement expansion hôtelière 7% l'an" },
        { ref: "232100010", desc: "Prêt participatif 7% ArcoIris (Tranche 2.7M BRL) - Enrico Tubia", tiers: "Enrico Tubia", val_2024: 28927.23, val_2025: 28927.23, val_2026: 28927.23, note: "Financement expansion hôtelière 7% l'an" },
        { ref: "232100011", desc: "Prêt participatif 7% ArcoIris (Tranche 2.7M BRL) - Glenelg SA", tiers: "Glenelg SA", val_2024: 96424.09, val_2025: 96424.09, val_2026: 96424.09, note: "Financement expansion hôtelière 7% l'an" },
        { ref: "232200001", desc: "Prêt participatif 7% ArcoIris (Tranche 589k BRL) - Giorgio Vignolle", tiers: "Giorgio Vignolle", val_2024: 29826.31, val_2025: 29826.31, val_2026: 29826.31, note: "Financement complémentaire 589.720 BRL" },
        { ref: "232200002", desc: "Prêt participatif 7% ArcoIris (Tranche 589k BRL) - Edoardo Tubia", tiers: "Edoardo Tubia", val_2024: 100000.00, val_2025: 100000.00, val_2026: 100000.00, note: "Financement complémentaire 589.720 BRL" }
    ],
    "actif_creances_court_terme": [
        { ref: "41112502", desc: "Intérêts courus prêt ArcoIris 7% - Sergio Vandi (S.V.)", tiers: "Sergio Vandi", val_2024: 11502.94, val_2025: 14886.12, val_2026: 14886.12, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112503", desc: "Intérêts courus prêt ArcoIris 7% - Jean-Pierre Murgia (J-P.M.)", tiers: "Jean-Pierre Murgia", val_2024: 805.21, val_2025: 1042.03, val_2026: 1042.03, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112504", desc: "Intérêts courus prêt ArcoIris 7% - Stefano Bosi (S.B.)", tiers: "Stefano Bosi", val_2024: 9202.35, val_2025: 11908.90, val_2026: 11908.90, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112505", desc: "Intérêts courus prêt ArcoIris 7% - Marco Canton (M.C.)", tiers: "Marco Canton", val_2024: 6901.76, val_2025: 8931.67, val_2026: 8931.67, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112506", desc: "Intérêts courus prêt ArcoIris 7% - Susik Hemawiti (S.H.)", tiers: "Susik Hemawiti", val_2024: 2645.68, val_2025: 3423.81, val_2026: 3423.81, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112507", desc: "Intérêts courus prêt ArcoIris 7% - Marco Sterzi (M.S.)", tiers: "Marco Sterzi", val_2024: 15643.99, val_2025: 20245.13, val_2026: 20245.13, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112508", desc: "Intérêts courus prêt ArcoIris 7% - Giorgio Vignolle (G.V.)", tiers: "Giorgio Vignolle", val_2024: 11593.58, val_2025: 14927.88, val_2026: 14927.88, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112509", desc: "Intérêts courus prêt ArcoIris 7% - Edoardo Tubia (Ed.T.)", tiers: "Edoardo Tubia", val_2024: 34568.09, val_2025: 44481.81, val_2026: 44481.81, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112510", desc: "Intérêts courus prêt ArcoIris 7% - Enrico Tubia (En.T.)", tiers: "Enrico Tubia", val_2024: 6901.76, val_2025: 8931.67, val_2026: 8931.67, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112511", desc: "Intérêts courus prêt ArcoIris 7% - Glenelg Participations SA", tiers: "Glenelg SA", val_2024: 23005.87, val_2025: 29772.26, val_2026: 29772.26, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "42143", desc: "Créance fiscale Impôt sur la Fortune (ACD Luxembourg)", tiers: "Admin. Contributions Directes (ACD)", val_2024: 4815.00, val_2025: 4815.00, val_2026: 7222.50, note: "Acomptes versés / créance d'impôt SOPARFI" }
    ],
    "actif_creances_long_terme": [
        { ref: "42288", desc: "Créance à plus d'un an (> 1 an) - Franco Toscano (100.000 BRL)", tiers: "Franco Toscano", val_2024: 30000.00, val_2025: 30000.00, val_2026: 30000.00, note: "Autre créance à long terme (> 1 an) - prêt 100.000 BRL" }
    ],
    "actif_creances_fiscales": [
        { ref: "41112502", desc: "Intérêts courus prêt ArcoIris 7% - Sergio Vandi (S.V.)", tiers: "Sergio Vandi", val_2024: 11502.94, val_2025: 14886.12, val_2026: 14886.12, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112503", desc: "Intérêts courus prêt ArcoIris 7% - Jean-Pierre Murgia (J-P.M.)", tiers: "Jean-Pierre Murgia", val_2024: 805.21, val_2025: 1042.03, val_2026: 1042.03, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112504", desc: "Intérêts courus prêt ArcoIris 7% - Stefano Bosi (S.B.)", tiers: "Stefano Bosi", val_2024: 9202.35, val_2025: 11908.90, val_2026: 11908.90, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112505", desc: "Intérêts courus prêt ArcoIris 7% - Marco Canton (M.C.)", tiers: "Marco Canton", val_2024: 6901.76, val_2025: 8931.67, val_2026: 8931.67, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112506", desc: "Intérêts courus prêt ArcoIris 7% - Susik Hemawiti (S.H.)", tiers: "Susik Hemawiti", val_2024: 2645.68, val_2025: 3423.81, val_2026: 3423.81, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112507", desc: "Intérêts courus prêt ArcoIris 7% - Marco Sterzi (M.S.)", tiers: "Marco Sterzi", val_2024: 15643.99, val_2025: 20245.13, val_2026: 20245.13, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112508", desc: "Intérêts courus prêt ArcoIris 7% - Giorgio Vignolle (G.V.)", tiers: "Giorgio Vignolle", val_2024: 11593.58, val_2025: 14927.88, val_2026: 14927.88, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112509", desc: "Intérêts courus prêt ArcoIris 7% - Edoardo Tubia (Ed.T.)", tiers: "Edoardo Tubia", val_2024: 34568.09, val_2025: 44481.81, val_2026: 44481.81, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112510", desc: "Intérêts courus prêt ArcoIris 7% - Enrico Tubia (En.T.)", tiers: "Enrico Tubia", val_2024: 6901.76, val_2025: 8931.67, val_2026: 8931.67, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "41112511", desc: "Intérêts courus prêt ArcoIris 7% - Glenelg Participations SA", tiers: "Glenelg SA", val_2024: 23005.87, val_2025: 29772.26, val_2026: 29772.26, note: "Créance d'intérêts échue à court terme (durée <= 1 an)" },
        { ref: "42143", desc: "Créance fiscale Impôt sur la Fortune (ACD Luxembourg)", tiers: "Admin. Contributions Directes (ACD)", val_2024: 4815.00, val_2025: 4815.00, val_2026: 7222.50, note: "Acomptes versés / créance d'impôt SOPARFI" },
        { ref: "42288", desc: "Créance à plus d'un an (> 1 an) - Franco Toscano (100.000 BRL)", tiers: "Franco Toscano", val_2024: 30000.00, val_2025: 30000.00, val_2026: 30000.00, note: "Autre créance à long terme (> 1 an) - prêt 100.000 BRL" }
    ],
    "actif_banque_olky": [
        { ref: "5131000", desc: "Solde Compte Courant Olky Pay EUR (LU54 6060 0020 0000 3393)", tiers: "Olky Pay Luxembourg", val_2024: 31888.53, val_2025: 19156.88, val_2026: 11440.97, note: "Relevé bancaire officiel eCDF & extraits" },
        { ref: "5132000", desc: "Solde Compte Courant Revolut Business EUR (LT92 3250 0340 9644 5618)", tiers: "Revolut Bank UAB", val_2024: 0.00, val_2025: 0.00, val_2026: 652.25, note: "Compte ouvert en mars 2026 (Revolut Bank UAB)" }
    ],

    // PASSIF
    "passif_capital_social": [
        { ref: "1010001", desc: "Capital Classe A (151.461 actions) - Enrico Tubia", tiers: "Enrico Tubia", val_2024: 302922.00, val_2025: 302922.00, val_2026: 302922.00, note: "6,98% du capital total • Droits de vote ordinaires" },
        { ref: "1010002", desc: "Capital Classe A (151.461 actions) - Alfonso Belardi", tiers: "Alfonso Belardi", val_2024: 302922.00, val_2025: 302922.00, val_2026: 302922.00, note: "6,98% du capital total • Droits de vote ordinaires" },
        { ref: "1010003", desc: "Capital Classe A (151.461 actions) - Stefano Bosi", tiers: "Stefano Bosi", val_2024: 302922.00, val_2025: 302922.00, val_2026: 302922.00, note: "6,98% du capital total • Droits de vote ordinaires" },
        { ref: "1010004", desc: "Capital Classe A (151.461 actions) - Marco Canton", tiers: "Marco Canton", val_2024: 302922.00, val_2025: 302922.00, val_2026: 302922.00, note: "6,98% du capital total • Droits de vote ordinaires" },
        { ref: "1010005", desc: "Capital Classe A (302.933 actions) - Glenelg SA", tiers: "Glenelg SA", val_2024: 605866.00, val_2025: 605866.00, val_2026: 605866.00, note: "13,95% du capital total • Droits de vote ordinaires" },
        { ref: "1010006", desc: "Capital Classe A (147.915 actions) - Susik Hemawiti", tiers: "Susik Hemawiti", val_2024: 295830.00, val_2025: 295830.00, val_2026: 295830.00, note: "6,81% du capital total • Droits de vote ordinaires" },
        { ref: "1010007", desc: "Capital Classe A (151.461 actions) - Jean-Pierre Murgia", tiers: "Jean-Pierre Murgia", val_2024: 302922.00, val_2025: 302922.00, val_2026: 302922.00, note: "6,98% du capital total • Droits de vote ordinaires" },
        { ref: "1010008", desc: "Capital Classe A (75.733 actions) - Marco Sterzi", tiers: "Marco Sterzi", val_2024: 151466.00, val_2025: 151466.00, val_2026: 151466.00, note: "3,49% du capital total • Administrateur" },
        { ref: "1010009", desc: "Capital Classe A (151.461 actions) - Edoardo Tubia", tiers: "Edoardo Tubia", val_2024: 302922.00, val_2025: 302922.00, val_2026: 302922.00, note: "6,98% du capital total • Administrateur délégué" },
        { ref: "1010010", desc: "Capital Classe A (151.461 actions) - Sergio Vandi", tiers: "Sergio Vandi", val_2024: 302922.00, val_2025: 302922.00, val_2026: 302922.00, note: "6,98% du capital total • Droits de vote ordinaires" },
        { ref: "1010011", desc: "Capital Classe A (75.733 actions) - Giorgio Vignolle", tiers: "Giorgio Vignolle", val_2024: 151466.00, val_2025: 151466.00, val_2026: 151466.00, note: "3,49% du capital total • Droits de vote ordinaires" },
        { ref: "1010051", desc: "Capital Classe B (67.701 actions) - Marylène Alix", tiers: "Marylène Alix", val_2024: 135402.00, val_2025: 135402.00, val_2026: 135402.00, note: "Actions de préférence sans droit de vote" },
        { ref: "1010052", desc: "Capital Classe B (106.250 actions) - MMM Finance Sàrl", tiers: "MMM Finance Sàrl", val_2024: 212500.00, val_2025: 212500.00, val_2026: 212500.00, note: "Actions de préférence sans droit de vote" },
        { ref: "1010053", desc: "Capital Classe B (180.220 actions) - Salvatore Desiderio", tiers: "Salvatore Desiderio", val_2024: 360440.00, val_2025: 360440.00, val_2026: 360440.00, note: "Actions de préférence sans droit de vote" },
        { ref: "1010054", desc: "Capital Classe B (73.805 actions) - Enrico Tubia", tiers: "Enrico Tubia", val_2024: 147610.00, val_2025: 147610.00, val_2026: 147610.00, note: "Actions de préférence sans droit de vote" },
        { ref: "1010055", desc: "Capital Classe B (40.401 actions) - Marco Sterzi", tiers: "Marco Sterzi", val_2024: 80802.00, val_2025: 80802.00, val_2026: 80802.00, note: "Actions de préférence sans droit de vote" },
        { ref: "1010056", desc: "Capital Classe B (40.402 actions) - Adonella Cristina Sterzi", tiers: "Adonella Sterzi", val_2024: 80804.00, val_2025: 80804.00, val_2026: 80804.00, note: "Actions de préférence sans droit de vote" }
    ],
    "passif_prime_emission": [
        { ref: "1120000", desc: "Prime d'apport fusion Classe A (Valorisation quotas ArcoIris)", tiers: "Associés Classe A", val_2024: 850000.00, val_2025: 850000.00, val_2026: 850000.00, note: "Prime statutaire d'apport en nature" },
        { ref: "1120100", desc: "Prime d'émission souscripteurs Classe B", tiers: "Investisseurs Classe B", val_2024: 294389.88, val_2025: 294389.88, val_2026: 294389.88, note: "Prime d'émission statutaire" }
    ],
    "passif_report_nouveau": [
        { ref: "141100", desc: "Pertes reportées antérieures (Report à nouveau eCDF)", tiers: "Exercices précédents", val_2024: -87384.44, val_2025: -87384.44, val_2026: -149786.10, note: "Solde historique des pertes cumulées" },
        { ref: "141200", desc: "Affectation du résultat de l'exercice précédent approuvée en AGO", tiers: "AGO d'approbation", val_2024: 0.00, val_2025: -62401.66, val_2026: -3720.51, note: "Affectation perte 2024 / 2025 au report à nouveau" }
    ],
    "passif_resultat_net": [
        { ref: "142000", desc: "Résultat net comptable certifié de l'exercice", tiers: "Watergarden Management Sàrl", val_2024: -62401.88, val_2025: -3720.51, val_2026: 14929.62, note: "2024: -62.401,88 € • 2025: -3.720,51 € • 2026 YTD: +14.929,62 €" }
    ],
    "passif_fournisseurs": [
        { ref: "44112", desc: "Fournisseurs - Factures non parvenues (ESSEDI Partners SA & Révision)", tiers: "ESSEDI Partners SA", val_2024: 6840.68, val_2025: 6844.53, val_2026: 6844.53, note: "Domiciliation, assistance fiduciaire et dépôt eCDF" }
    ],
    "passif_arcoiris_ct": [
        { ref: "45118", desc: "Dettes envers filiale ArcoIris Ltda (durée <= 1 an)", tiers: "ArcoIris Ltda (Brésil)", val_2024: 2023.25, val_2025: 2023.25, val_2026: 2023.25, note: "Compte courant commercial et régularisations" }
    ],
    "passif_primes_associes": [
        { ref: "452180001", desc: "Prime statutaire associée - Sergio Vandi (S.V.)", tiers: "Sergio Vandi", val_2024: 7944.70, val_2025: 10312.93, val_2026: 10312.93, note: "Prime statutaire échue (durée <= 1 an)" },
        { ref: "452180002", desc: "Prime statutaire associée - Jean-Pierre Murgia (J-P.M.)", tiers: "Jean-Pierre Murgia", val_2024: 556.14, val_2025: 721.92, val_2026: 721.92, note: "Prime statutaire échue (durée <= 1 an)" },
        { ref: "452180003", desc: "Prime statutaire associée - Stefano Bosi (S.B.)", tiers: "Stefano Bosi", val_2024: 6355.76, val_2025: 8250.34, val_2026: 8250.34, note: "Prime statutaire échue (durée <= 1 an)" },
        { ref: "452180004", desc: "Prime statutaire associée - Marco Canton (M.C.)", tiers: "Marco Canton", val_2024: 4766.82, val_2025: 6187.76, val_2026: 6187.76, note: "Prime statutaire échue (durée <= 1 an)" },
        { ref: "452180005", desc: "Prime statutaire associée - Susik Hemawiti (S.H.)", tiers: "Susik Hemawiti", val_2024: 1827.28, val_2025: 2371.97, val_2026: 2371.97, note: "Prime statutaire échue (durée <= 1 an)" },
        { ref: "452180006", desc: "Prime statutaire associée - Marco Sterzi (M.S.)", tiers: "Marco Sterzi", val_2024: 10804.79, val_2025: 14025.58, val_2026: 14025.58, note: "Prime statutaire échue (durée <= 1 an)" },
        { ref: "452180007", desc: "Prime statutaire associée - Giorgio Vignolle (G.V.)", tiers: "Giorgio Vignolle", val_2024: 8056.45, val_2025: 10390.46, val_2026: 10390.46, note: "Prime statutaire échue (durée <= 1 an)" },
        { ref: "452180008", desc: "Prime statutaire associée - Edoardo Tubia (Ed.T.)", tiers: "Edoardo Tubia", val_2024: 24039.84, val_2025: 30979.45, val_2026: 30979.45, note: "Prime statutaire échue (durée <= 1 an)" },
        { ref: "452180009", desc: "Prime statutaire associée - Enrico Tubia (En.T.)", tiers: "Enrico Tubia", val_2024: 4766.82, val_2025: 6187.76, val_2026: 6187.76, note: "Prime statutaire échue (durée <= 1 an)" },
        { ref: "452180010", desc: "Prime statutaire associée - Glenelg Participations SA", tiers: "Glenelg SA", val_2024: 15889.40, val_2025: 20625.86, val_2026: 20625.86, note: "Prime statutaire échue (durée <= 1 an)" }
    ],
    "passif_dettes_fiscales": [
        { ref: "461232", desc: "Impôt sur la Fortune (IF / Net Wealth Tax) - ACD Luxembourg", tiers: "ACD Luxembourg", val_2024: 4815.00, val_2025: 4815.00, val_2026: 4815.00, note: "Dette fiscale provisionnée (durée <= 1 an)" }
    ],
    "passif_avances_bloquees": [
        { ref: "4713000", desc: "Autres dettes <= 1 an - Dirigeants & Administrateurs - Edoardo Tubia", tiers: "Edoardo Tubia", val_2024: 70038.94, val_2025: 70038.94, val_2026: 70038.94, note: "Avances d'administration et compte courant" },
        { ref: "4713005", desc: "Autres dettes <= 1 an - Fusion LRD - Edoardo Tubia", tiers: "Edoardo Tubia", val_2024: 35636.12, val_2025: 35636.12, val_2026: 35636.12, note: "Quote-part issue de la fusion LRD" },
        { ref: "4713006", desc: "Autres dettes <= 1 an - Fusion LRD - Marco Sterzi", tiers: "Marco Sterzi", val_2024: 27605.05, val_2025: 27605.05, val_2026: 27605.05, note: "Quote-part issue de la fusion LRD" }
    ],
    "passif_dettes_fusion_lrd": [
        { ref: "4522200", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Alfonso Belardi", tiers: "Alfonso Belardi", val_2024: 19170.00, val_2025: 19170.00, val_2026: 19170.00, note: "Dette à plus d'un an (> 1 an)" },
        { ref: "4522201", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Sergio Vandi", tiers: "Sergio Vandi", val_2024: 20957.95, val_2025: 20957.95, val_2026: 20957.95, note: "Dette fusion LRD (> 1 an)" },
        { ref: "45222010", desc: "Dettes > 1 an - Part prêt ArcoIris 2.700.000 BRL - Sergio Vandi", tiers: "Sergio Vandi", val_2024: 48212.05, val_2025: 48212.05, val_2026: 48212.05, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "4522202", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Jean-Pierre Murgia", tiers: "Jean-Pierre Murgia", val_2024: 19295.16, val_2025: 19295.16, val_2026: 19295.16, note: "Dette fusion LRD (> 1 an)" },
        { ref: "45222020", desc: "Dettes > 1 an - Part prêt ArcoIris 2.700.000 BRL - Jean-Pierre Murgia", tiers: "Jean-Pierre Murgia", val_2024: 3374.84, val_2025: 3374.84, val_2026: 3374.84, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "4522203", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Stefano Bosi", tiers: "Stefano Bosi", val_2024: 20600.36, val_2025: 20600.36, val_2026: 20600.36, note: "Dette fusion LRD (> 1 an)" },
        { ref: "45222030", desc: "Dettes > 1 an - Part prêt ArcoIris 2.700.000 BRL - Stefano Bosi", tiers: "Stefano Bosi", val_2024: 38569.64, val_2025: 38569.64, val_2026: 38569.64, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "4522204", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Marco Canton", tiers: "Marco Canton", val_2024: 20242.77, val_2025: 20242.77, val_2026: 20242.77, note: "Dette fusion LRD (> 1 an)" },
        { ref: "45222040", desc: "Dettes > 1 an - Part prêt ArcoIris 2.700.000 BRL - Marco Canton", tiers: "Marco Canton", val_2024: 28927.23, val_2025: 28927.23, val_2026: 28927.23, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "4522205", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Susik Hemawiti", tiers: "Susik Hemawiti", val_2024: 19581.23, val_2025: 19581.23, val_2026: 19581.23, note: "Dette fusion LRD (> 1 an)" },
        { ref: "45222050", desc: "Dettes > 1 an - Part prêt ArcoIris 2.700.000 BRL - Susik Hemawiti", tiers: "Susik Hemawiti", val_2024: 11088.77, val_2025: 11088.77, val_2026: 11088.77, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "4522206", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Giorgio Vignolle", tiers: "Giorgio Vignolle", val_2024: 10563.37, val_2025: 10563.37, val_2026: 10563.37, note: "Dette fusion LRD (> 1 an)" },
        { ref: "45222060", desc: "Dettes > 1 an - Part prêt ArcoIris 2.700.000 BRL - Giorgio Vignolle", tiers: "Giorgio Vignolle", val_2024: 26516.63, val_2025: 26516.63, val_2026: 26516.63, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "45222061", desc: "Dettes > 1 an - Part prêt ArcoIris 589.720 BRL - Giorgio Vignolle", tiers: "Giorgio Vignolle", val_2024: 29826.31, val_2025: 29826.31, val_2026: 29826.31, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "4522207", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Marco Sterzi", tiers: "Marco Sterzi", val_2024: 12011.62, val_2025: 12011.62, val_2026: 12011.62, note: "Dette fusion LRD (> 1 an)" },
        { ref: "45222070", desc: "Dettes > 1 an - Part prêt ArcoIris 2.700.000 BRL - Marco Sterzi", tiers: "Marco Sterzi", val_2024: 65568.38, val_2025: 65568.38, val_2026: 65568.38, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "4522208", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Glenelg SA", tiers: "Glenelg SA", val_2024: 41905.91, val_2025: 41905.91, val_2026: 41905.91, note: "Dette fusion LRD (> 1 an)" },
        { ref: "45222080", desc: "Dettes > 1 an - Part prêt ArcoIris 2.700.000 BRL - Glenelg SA", tiers: "Glenelg SA", val_2024: 96424.09, val_2025: 96424.09, val_2026: 96424.09, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "4522209", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Enrico Tubia", tiers: "Enrico Tubia", val_2024: 20242.77, val_2025: 20242.77, val_2026: 20242.77, note: "Dette fusion LRD (> 1 an)" },
        { ref: "45222090", desc: "Dettes > 1 an - Part prêt ArcoIris 2.700.000 BRL - Enrico Tubia", tiers: "Enrico Tubia", val_2024: 28927.23, val_2025: 28927.23, val_2026: 28927.23, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "4522210", desc: "Dettes > 1 an envers associés liés - Fusion LRD - Edoardo Tubia", tiers: "Edoardo Tubia", val_2024: 21798.29, val_2025: 21798.29, val_2026: 21798.29, note: "Dette fusion LRD (> 1 an)" },
        { ref: "45222100", desc: "Dettes > 1 an - Part prêt ArcoIris 2.700.000 BRL - Edoardo Tubia", tiers: "Edoardo Tubia", val_2024: 70871.71, val_2025: 70871.71, val_2026: 70871.71, note: "Quote-part prêt filiale (> 1 an)" },
        { ref: "45222101", desc: "Dettes > 1 an - Part prêt ArcoIris 589.720 BRL - Edoardo Tubia", tiers: "Edoardo Tubia", val_2024: 100000.00, val_2025: 100000.00, val_2026: 100000.00, note: "Quote-part prêt filiale (> 1 an)" }
    ],

    // PERTES & PROFITS (P&L)
    "pp_charges_externes": [
        { ref: "613482", desc: "Frais de domiciliation siège social (26, Bd Royal c/o ESSEDI - Fatt. 2025317)", tiers: "ESSEDI Partners SA", val_2024: 368.77, val_2025: 368.78, val_2026: 0.00, note: "Convention domiciliation (imponibile 315,19 € + TVA 17% 53,58 €)" },
        { ref: "61333", desc: "Frais bancaires Olky Pay & Revolut Business", tiers: "Olky & Revolut", val_2024: 439.80, val_2025: 368.77, val_2026: 448.38, note: "Commissions de tenue de compte & flux" },
        { ref: "61348", desc: "Services comptables et administratifs (ESSEDI - Fatt. 2025317)", tiers: "ESSEDI Partners SA", val_2024: 6146.16, val_2025: 6146.16, val_2026: 5773.48, note: "Services comptables & fiduciaire (imponibile 5.253,13 € + TVA 17% 893,02 €)" },
        { ref: "613481", desc: "Frais de Bureau (ESSEDI - Fatt. 2025317)", tiers: "ESSEDI Partners SA", val_2024: 0.00, val_2025: 325.75, val_2026: 0.00, note: "Frais de bureau & fournitures (imponibile 278,42 € + TVA 17% 47,32 €)" },
        { ref: "61514", desc: "Cadeaux à la clientèle (Gifts to customers)", tiers: "Fournisseur Cadeaux", val_2024: 0.00, val_2025: 350.00, val_2026: 0.00, note: "Marketing et cadeaux d'affaires (OLKY-2025-133 & 134: 250 € + 100 €)" },
        { ref: "618700", desc: "Cotisations professionnelles Chambre de Commerce", tiers: "Chambre de Commerce Lux", val_2024: 350.00, val_2025: 350.00, val_2026: 350.00, note: "Cotisation annuelle légale" },
        { ref: "618800", desc: "Frais administratifs et publications officielles RCSL", tiers: "LBR / RCSL", val_2024: 325.75, val_2025: 3.84, val_2026: 24.40, note: "Extraits et dépôts statutaires" }
    ],
    "pp_amortissements": [
        { ref: "631101", desc: "Me Joëlle BADEN - Frais et débours de fusion LRD (TTC 3.892,39 €)", tiers: "Me Joëlle Baden", val_2024: 665.37, val_2025: 665.37, val_2026: 499.03, note: "Valeur brute : 3.326,83 € • Amortissement linéaire sur 5 ans (17/12/2021 au 16/12/2026)" },
        { ref: "631102", desc: "ESSEDI PARTNERS SA - Honoraires et assistance technique fusion LRD (TTC 2.925,00 €)", tiers: "ESSEDI Partners SA", val_2024: 500.00, val_2025: 500.00, val_2026: 375.00, note: "Valeur brute : 2.500,00 € • Amortissement linéaire sur 5 ans (17/12/2021 au 16/12/2026)" },
        { ref: "631103", desc: "Me SCHAEFFER n° 2200954 - Frais augmentation de capital 2022", tiers: "Me Schaeffer", val_2024: 12.51, val_2025: 12.51, val_2026: 9.38, note: "Valeur brute : 62,55 € • Amortissement linéaire sur 5 ans (07/03/2022 au 06/03/2027)" },
        { ref: "631104", desc: "Me Joëlle BADEN facture n° 59 - Augmentation de capital Classe B", tiers: "Me Joëlle Baden", val_2024: 241.15, val_2025: 241.15, val_2026: 180.86, note: "Valeur brute : 1.205,75 € • Amortissement linéaire sur 5 ans (20/12/2022 au 19/12/2027)" },
        { ref: "631105", desc: "ESSEDI PARTNERS SA - Assistance juridique augmentation de capital 2023 (TTC 1.740,00 €)", tiers: "ESSEDI Partners SA", val_2024: 300.00, val_2025: 300.00, val_2026: 225.00, note: "Valeur brute : 1.500,00 € • Amortissement linéaire sur 5 ans (07/06/2023 au 07/06/2028)" }
    ],
    "pp_other_operating": [
        { ref: "648100", desc: "Interessi di mora su Impôt Fortune (Administration des Contributions Directes)", tiers: "Admin. Contributions Directes (ACD)", val_2024: 0.00, val_2025: 7.20, val_2026: 0.00, note: "Poste 8 Bilan eCDF • Amendes, sanctions et pénalités (Opération bancaire 21/08/2025)" }
    ],
    "pp_produits_financiers": [
        { ref: "7554101", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 589k BRL) - Giorgio Vignolle", tiers: "ArcoIris Ltda (Brésil)", val_2024: 1689.88, val_2025: 1473.55, val_2026: 1105.16, note: "Tranche 29.826,31 € (135.482 BRL) • Intérêts cumulés tous exercices : 6.740,51 € (Bilan 41112508)" },
        { ref: "7554102", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 589k BRL) - Edoardo Tubia", tiers: "ArcoIris Ltda (Brésil)", val_2024: 5665.73, val_2025: 4940.43, val_2026: 3705.32, note: "Tranche 100.000,00 € (454.238 BRL) • Intérêts cumulés tous exercices : 22.599,21 € (Bilan 41112509)" },
        { ref: "7554103", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 2.7M BRL) - Sergio Vandi", tiers: "ArcoIris Ltda (Brésil)", val_2024: 3388.83, val_2025: 3383.19, val_2026: 2537.39, note: "Tranche 48.212,05 € (311.060 BRL) • Intérêts cumulés tous exercices : 14.886,12 € (Bilan 41112502)" },
        { ref: "7554104", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 2.7M BRL) - Jean-Pierre Murgia", tiers: "ArcoIris Ltda (Brésil)", val_2024: 237.22, val_2025: 236.82, val_2026: 177.62, note: "Tranche 3.374,84 € (21.774 BRL) • Intérêts cumulés tous exercices : 1.042,03 € (Bilan 41112503)" },
        { ref: "7554105", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 2.7M BRL) - Stefano Bosi", tiers: "ArcoIris Ltda (Brésil)", val_2024: 2711.06, val_2025: 2706.55, val_2026: 2029.91, note: "Tranche 38.569,64 € (248.848 BRL) • Intérêts cumulés tous exercices : 11.908,90 € (Bilan 41112504)" },
        { ref: "7554106", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 2.7M BRL) - Marco Canton", tiers: "ArcoIris Ltda (Brésil)", val_2024: 2033.30, val_2025: 2029.91, val_2026: 1522.43, note: "Tranche 28.927,23 € (186.636 BRL) • Intérêts cumulés tous exercices : 8.931,67 € (Bilan 41112505)" },
        { ref: "7554107", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 2.7M BRL) - Susik Hemawiti", tiers: "ArcoIris Ltda (Brésil)", val_2024: 779.43, val_2025: 778.13, val_2026: 583.60, note: "Tranche 11.088,77 € (71.544 BRL) • Intérêts cumulés tous exercices : 3.423,81 € (Bilan 41112506)" },
        { ref: "7554108", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 2.7M BRL) - Marco Sterzi", tiers: "ArcoIris Ltda (Brésil)", val_2024: 4608.80, val_2025: 4601.13, val_2026: 3450.85, note: "Tranche 65.568,38 € (423.041 BRL) • Intérêts cumulés tous exercices : 20.245,13 € (Bilan 41112507)" },
        { ref: "7554109", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 2.7M BRL) - Giorgio Vignolle", tiers: "ArcoIris Ltda (Brésil)", val_2024: 1863.85, val_2025: 1860.76, val_2026: 1395.57, note: "Tranche 26.516,63 € (171.083 BRL) • Intérêts cumulés tous exercices : 8.187,37 € (Bilan 41112508)" },
        { ref: "7554110", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 2.7M BRL) - Edoardo Tubia", tiers: "ArcoIris Ltda (Brésil)", val_2024: 4981.58, val_2025: 4973.30, val_2026: 3729.98, note: "Tranche 70.871,71 € (457.258 BRL) • Intérêts cumulés tous exercices : 21.882,60 € (Bilan 41112509)" },
        { ref: "7554111", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 2.7M BRL) - Enrico Tubia", tiers: "ArcoIris Ltda (Brésil)", val_2024: 2033.30, val_2025: 2029.91, val_2026: 1522.43, note: "Tranche 28.927,23 € (186.636 BRL) • Intérêts cumulés tous exercices : 8.931,67 € (Bilan 41112510)" },
        { ref: "7554112", desc: "Intérêts prêts participatifs 7% ArcoIris (Tranche 2.7M BRL) - Glenelg Participations SA", tiers: "ArcoIris Ltda (Brésil)", val_2024: 6777.65, val_2025: 6766.37, val_2026: 5074.78, note: "Tranche 96.424,09 € (622.120 BRL) • Intérêts cumulés tous exercices : 29.772,25 € (Bilan 41112511)" }
    ],
    "pp_charges_financieres": [
        { ref: "6554200", desc: "Alfonso Belardi - Aucun prêt consenti (Fusion LRD uniquement)", tiers: "Alfonso Belardi", val_2024: 0.00, val_2025: 0.00, val_2026: 0.00, note: "Associé Classe A (Fusion LRD sans prêt participatif ArcoIris)" },
        { ref: "6554201", desc: "Prime statutaire 70% intérêts filiale ArcoIris - Sergio Vandi (S.V.)", tiers: "Sergio Vandi", val_2024: 2372.18, val_2025: 2368.23, val_2026: 152.68, note: "Quote-part annuelle 70% sur prêt 48.212,05 € (311k BRL) • Compte bilan lié : 452180001" },
        { ref: "6554202", desc: "Prime statutaire 70% intérêts filiale ArcoIris - Jean-Pierre Murgia (J-P.M.)", tiers: "Jean-Pierre Murgia", val_2024: 166.05, val_2025: 165.78, val_2026: 10.69, note: "Quote-part annuelle 70% sur prêt 3.374,84 € (21,7k BRL) • Compte bilan lié : 452180002" },
        { ref: "6554203", desc: "Prime statutaire 70% intérêts filiale ArcoIris - Stefano Bosi (S.B.)", tiers: "Stefano Bosi", val_2024: 1897.74, val_2025: 1894.58, val_2026: 122.14, note: "Quote-part annuelle 70% sur prêt 38.569,64 € (248,8k BRL) • Compte bilan lié : 452180003" },
        { ref: "6554204", desc: "Prime statutaire 70% intérêts filiale ArcoIris - Marco Canton (M.C.)", tiers: "Marco Canton", val_2024: 1423.31, val_2025: 1420.94, val_2026: 91.61, note: "Quote-part annuelle 70% sur prêt 28.927,23 € (186,6k BRL) • Compte bilan lié : 452180004" },
        { ref: "6554205", desc: "Prime statutaire 70% intérêts filiale ArcoIris - Susik Hemawiti (S.H.)", tiers: "Susik Hemawiti", val_2024: 545.60, val_2025: 544.69, val_2026: 35.11, note: "Quote-part annuelle 70% sur prêt 11.088,77 € (71,5k BRL) • Compte bilan lié : 452180005" },
        { ref: "6554206", desc: "Prime statutaire 70% intérêts filiale ArcoIris - Marco Sterzi (M.S.)", tiers: "Marco Sterzi", val_2024: 3226.16, val_2025: 3220.79, val_2026: 207.64, note: "Quote-part annuelle 70% sur prêt 65.568,38 € (423k BRL) • Compte bilan lié : 452180006" },
        { ref: "6554207", desc: "Prime statutaire 70% intérêts filiale ArcoIris - Giorgio Vignolle (G.V.)", tiers: "Giorgio Vignolle", val_2024: 2487.61, val_2025: 2334.01, val_2026: 150.48, note: "Quote-part annuelle 70% sur prêt 26.516,63 € + 29.826,31 € • Compte bilan lié : 452180007" },
        { ref: "6554208", desc: "Prime statutaire 70% intérêts filiale ArcoIris - Edoardo Tubia (Ed.T.)", tiers: "Edoardo Tubia", val_2024: 7453.12, val_2025: 6939.61, val_2026: 447.41, note: "Quote-part annuelle 70% sur prêt 70.871,71 € + 100.000,00 € • Compte bilan lié : 452180008" },
        { ref: "6554209", desc: "Prime statutaire 70% intérêts filiale ArcoIris - Enrico Tubia (En.T.)", tiers: "Enrico Tubia", val_2024: 1423.31, val_2025: 1420.94, val_2026: 91.61, note: "Quote-part annuelle 70% sur prêt 28.927,23 € (186,6k BRL) • Compte bilan lié : 452180009" },
        { ref: "6554210", desc: "Prime statutaire 70% intérêts filiale ArcoIris - Glenelg Participations SA", tiers: "Glenelg SA", val_2024: 4744.36, val_2025: 4736.46, val_2026: 305.39, note: "Quote-part annuelle 70% sur prêt 96.424,09 € (622k BRL) • Compte bilan lié : 452180010" },
        { ref: "6554299", desc: "Rattrapage primes statutaires exercices antérieurs (2022: 28.827,49 € + 2023: 30.441,09 €)", tiers: "Admin / Clôture 2024", val_2024: 59268.56, val_2025: 0.00, val_2026: 0.00, note: "Comptabilisation en 2024 des primes 2022 et 2023 en un seul exercice (Total eCDF 2024 = 85.008,00 €)" }
    ],
    "pp_impots": [
        { ref: "681100", desc: "Impôt sur la Fortune (IF / Net Wealth Tax) SOPARFI", tiers: "ACD Luxembourg", val_2024: 4815.00, val_2025: 4815.00, val_2026: 2407.50, note: "Taxe annuelle forfaitaire (2 acomptes 2026 YTD)" }
    ],
    "pp_resultat_net": [
        { ref: "142000", desc: "Synthèse officielle des Produits et Charges de l'exercice", tiers: "Résultat net comptable", val_2024: -62401.88, val_2025: -3720.51, val_2026: 14929.62, note: "Redressement vers un résultat positif en 2026 YTD" }
    ],

    // BALANCE DES COMPTES CLÉS (AVEC DRILLDOWN NIVEAU 2 ET NIVEAU 3)
    "bal_101000": [
        {
            ref: "101100",
            desc: "Capital souscrit Actions Classe A (1.662.541 actions à 2,00 €)",
            tiers: "11 Associés Classe A (Droits de vote ordinaires)",
            val_2024: 3325082.00,
            val_2025: 3325082.00,
            val_2026: 3325082.00,
            note: "100,00% de la Classe A • 76,57% du Capital Total",
            sub_title: "Composition nominative des 11 associés de la Classe A (Niveau 3) :",
            sub_type: "partners",
            sub_items: [
                { id: "SH-01", name: "BELARDI Alfonso", res: "Luxembourg", shares: 151461, pct_class: 9.1102, pct_tot: 6.98, val: 302922.00, vote: "6,98%" },
                { id: "SH-02", name: "VANDI Sergio", res: "Luxembourg", shares: 151461, pct_class: 9.1102, pct_tot: 6.98, val: 302922.00, vote: "6,98%" },
                { id: "SH-03", name: "MURGIA Jean-Pierre", res: "Luxembourg", shares: 151461, pct_class: 9.1102, pct_tot: 6.98, val: 302922.00, vote: "6,98%" },
                { id: "SH-04", name: "BOSI Giannino Stefano", res: "Italie", shares: 151461, pct_class: 9.1102, pct_tot: 6.98, val: 302922.00, vote: "6,98%" },
                { id: "SH-05", name: "CANTON Marco", res: "Italie", shares: 151461, pct_class: 9.1102, pct_tot: 6.98, val: 302922.00, vote: "6,98%" },
                { id: "SH-06", name: "HEMAWITI Susik", res: "Indonésie", shares: 147915, pct_class: 8.8969, pct_tot: 6.81, val: 295830.00, vote: "6,81%" },
                { id: "SH-07", name: "VIGNOLLE Giorgio", res: "Luxembourg (Admin)", shares: 75733, pct_class: 4.5553, pct_tot: 3.49, val: 151466.00, vote: "3,49%" },
                { id: "SH-08", name: "STERZI Marco", res: "Luxembourg (Admin)", shares: 75733, pct_class: 4.5553, pct_tot: 3.49, val: 151466.00, vote: "3,49%" },
                { id: "SH-09", name: "TUBIA Edoardo", res: "Luxembourg (Admin)", shares: 151461, pct_class: 9.1102, pct_tot: 6.98, val: 302922.00, vote: "6,98%" },
                { id: "SH-10", name: "TUBIA Enrico", res: "Hong Kong", shares: 151461, pct_class: 9.1102, pct_tot: 6.98, val: 302922.00, vote: "6,98%" },
                { id: "SH-11", name: "GLENELG SA", res: "Luxembourg (B.E. Toscano)", shares: 302933, pct_class: 18.2211, pct_tot: 13.95, val: 605866.00, vote: "13,95%" }
            ]
        },
        {
            ref: "101200",
            desc: "Capital souscrit Actions Classe B (508.779 actions à 2,00 €)",
            tiers: "4 Associés Classe B (Actions de préférence)",
            val_2024: 1017558.00,
            val_2025: 1017558.00,
            val_2026: 1017558.00,
            note: "100,00% de la Classe B • 23,43% du Capital Total (Sans droit de vote)",
            sub_title: "Composition nominative des 4 associés de la Classe B (Niveau 3) :",
            sub_type: "partners",
            sub_items: [
                { id: "SH-12", name: "ALIX Marylène", res: "Luxembourg", shares: 67701, pct_class: 13.3066, pct_tot: 3.12, val: 135402.00, vote: "Sans vote (Préférence)" },
                { id: "SH-13", name: "STERZI Adonella", res: "Italie", shares: 40402, pct_class: 7.9410, pct_tot: 1.86, val: 80804.00, vote: "Sans vote (Préférence)" },
                { id: "SH-14", name: "STERZI Donatella", res: "Italie", shares: 67337, pct_class: 13.2350, pct_tot: 3.10, val: 134674.00, vote: "Sans vote (Préférence)" },
                { id: "SH-15", name: "GLENELG SA", res: "Luxembourg (B.E. Toscano)", shares: 333339, pct_class: 65.5174, pct_tot: 15.35, val: 666678.00, vote: "Sans vote (Préférence)" }
            ]
        }
    ],
    "bal_112000": [
        {
            ref: "112100",
            desc: "Prime d'apport historique valorisation ArcoIris",
            tiers: "Apport en nature quotas sociaux",
            val_2024: 850000.00,
            val_2025: 850000.00,
            val_2026: 850000.00,
            note: "Prime statutaire d'apport en nature",
            sub_title: "Détail de l'acte d'apport et valorisation (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "APP-01", desc: "Apport en nature de 1.088.404.400 quotas sociaux ArcoIris Ltda (Brésil)", tiers: "Associés apporteurs", val_2024: 850000.00, val_2025: 850000.00, val_2026: 850000.00, note: "Survaleur d'apport nette intégrée en capitaux propres (RCS B 149.151)" },
                { ref: "APP-02", desc: "Réserve d'apport statutaire bloquée non distribuable", tiers: "Capitaux propres", val_2024: 850000.00, val_2025: 850000.00, val_2026: 850000.00, note: "Conforme art. 72-1 loi 1915 sociétés" }
            ]
        },
        {
            ref: "112200",
            desc: "Prime d'émission souscripteurs investisseurs Classe B",
            tiers: "4 Investisseurs Classe B",
            val_2024: 294389.88,
            val_2025: 294389.88,
            val_2026: 294389.88,
            note: "Prime d'émission statutaire (0,5786 € par action)",
            sub_title: "Répartition de la prime d'émission par souscripteur (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "PE-01", desc: "Glenelg SA : Prime sur 333.339 actions Classe B souscrites", tiers: "Glenelg SA", val_2024: 192870.22, val_2025: 192870.22, val_2026: 192870.22, note: "65,52% de la prime Classe B (0,5786 €/act.)" },
                { ref: "PE-02", desc: "Alix Marylène : Prime sur 67.701 actions Classe B souscrites", tiers: "Alix Marylène", val_2024: 39171.43, val_2025: 39171.43, val_2026: 39171.43, note: "13,31% de la prime Classe B (0,5786 €/act.)" },
                { ref: "PE-03", desc: "Sterzi Donatella : Prime sur 67.337 actions Classe B souscrites", tiers: "Sterzi Donatella", val_2024: 38960.84, val_2025: 38960.84, val_2026: 38960.84, note: "13,23% de la prime Classe B (0,5786 €/act.)" },
                { ref: "PE-04", desc: "Sterzi Adonella : Prime sur 40.402 actions Classe B souscrites", tiers: "Sterzi Adonella", val_2024: 23387.39, val_2025: 23387.39, val_2026: 23387.39, note: "7,94% de la prime Classe B (0,5786 €/act.)" }
            ]
        }
    ],
    "bal_201000": [
        {
            ref: "201100",
            desc: "Frais de constitution et d'actes initiaux (Valeur brute)",
            tiers: "Étude Notariée & Greffe RCSL",
            val_2024: 8595.14,
            val_2025: 8595.14,
            val_2026: 8595.14,
            note: "Valeur brute historique immobilisée",
            sub_title: "Composition brute des frais d'établissement (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "FE-01", desc: "Acte notarié de constitution et frais de publication Mémorial C", tiers: "Notaire Luxembourg", val_2024: 4200.00, val_2025: 4200.00, val_2026: 4200.00, note: "Frais légaux de constitution" },
                { ref: "FE-02", desc: "Honoraires juridiques et structuration des classes d'actions A & B", tiers: "Conseil juridique", val_2024: 3195.14, val_2025: 3195.14, val_2026: 3195.14, note: "Pacte d'actionnaires et statuts coordonnés" },
                { ref: "FE-03", desc: "Droits d'enregistrement et immatriculation LBR / eCDF", tiers: "Administration fiscale", val_2024: 1200.00, val_2025: 1200.00, val_2026: 1200.00, note: "Enregistrement officiel" }
            ]
        },
        {
            ref: "201900",
            desc: "Amortissements cumulés des frais d'établissement (20% l'an)",
            tiers: "Amortissement linéaire 5 ans",
            val_2024: -4536.36,
            val_2025: -6255.39,
            val_2026: -7974.42,
            note: "Dotation annuelle 1.719,03 € (Valeur nette 2025 : 2.339,75 €)",
            sub_title: "Tableau d'amortissement pluriannuel (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "AMO-24", desc: "Amortissement cumulé au 31/12/2024 (Valeur nette résiduelle: 4.058,78 €)", tiers: "Comptabilité PCN", val_2024: -4536.36, val_2025: -4536.36, val_2026: -4536.36, note: "Amortissements antérieurs certifiés" },
                { ref: "AMO-25", desc: "Dotation d'amortissement de l'exercice 2025 (Valeur nette: 2.339,75 €)", tiers: "Comptabilité PCN", val_2024: 0.00, val_2025: -1719.03, val_2026: -1719.03, note: "Écriture 657100 / 201900 déposée eCDF" },
                { ref: "AMO-26", desc: "Dotation estimée exercice 2026 YTD (Valeur nette au 31/12/2026: 620,72 €)", tiers: "Comptabilité PCN", val_2024: 0.00, val_2025: 0.00, val_2026: -1719.03, note: "Dernière annuité avant amortissement total" }
            ]
        }
    ],
    "bal_2310000": [
        {
            ref: "231001",
            desc: "Parts sociales 1.088.404.400 quotas dans ArcoIris Ltda (99,0896%)",
            tiers: "ArcoIris Ltda (Brésil)",
            val_2024: 5657646.49,
            val_2025: 5657646.49,
            val_2026: 5657646.49,
            note: "Propriétaire exclusif du Resort Sombra SPA",
            sub_title: "Décomposition des actifs sous-jacents Arco-Íris Ltda (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "PART-01", desc: "Capital social filiale : 1.088.404.400 quotas sociaux détenus (CNPJ 06.036.746/0001-31)", tiers: "ArcoIris Ltda", val_2024: 2150000.00, val_2025: 2150000.00, val_2026: 2150000.00, note: "Participation de contrôle 99,0896%" },
                { ref: "PART-02", desc: "Actif foncier titré : Terrain de 14.500 m² à Praia de Pipa (Matrícula N° 12.485)", tiers: "Cartório Tibau do Sul", val_2024: 1850000.00, val_2025: 1850000.00, val_2026: 1850000.00, note: "Titre de pleine propriété foncière sans hypothèque" },
                { ref: "PART-03", desc: "Complexe hôtelier 5★ : Resort Sombra e Água Fresca (22 suites falaise, centre thalasso, piscines)", tiers: "Exploitation hôtelière", val_2024: 1657646.49, val_2025: 1657646.49, val_2026: 1657646.49, note: "Licence d'opération environnementale IDEMA N° 2024/098-RN" }
            ]
        }
    ],
    "bal_2321000": [
        {
            ref: "232100",
            desc: "Prêts participatifs filiale ArcoIris 7% (Tranches 2.7M BRL et 589k BRL)",
            tiers: "ArcoIris Ltda (Brésil)",
            val_2024: 548306.88,
            val_2025: 548306.88,
            val_2026: 548306.88,
            note: "Financement expansion hôtelière (Taux conventionnel 7,00% l'an)",
            sub_title: "Décomposition nominative des prêts filiale par associé prêteur (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "232100002", desc: "Prêt participatif 7% (Tranche 2.7M BRL) - Sergio Vandi", tiers: "Sergio Vandi", val_2024: 48212.05, val_2025: 48212.05, val_2026: 48212.05, note: "Prêt participatif 7%" },
                { ref: "232100003", desc: "Prêt participatif 7% (Tranche 2.7M BRL) - Jean-Pierre Murgia", tiers: "Jean-Pierre Murgia", val_2024: 3374.84, val_2025: 3374.84, val_2026: 3374.84, note: "Prêt participatif 7%" },
                { ref: "232100004", desc: "Prêt participatif 7% (Tranche 2.7M BRL) - Stefano Bosi", tiers: "Stefano Bosi", val_2024: 38569.64, val_2025: 38569.64, val_2026: 38569.64, note: "Prêt participatif 7%" },
                { ref: "232100005", desc: "Prêt participatif 7% (Tranche 2.7M BRL) - Marco Canton", tiers: "Marco Canton", val_2024: 28927.23, val_2025: 28927.23, val_2026: 28927.23, note: "Prêt participatif 7%" },
                { ref: "232100006", desc: "Prêt participatif 7% (Tranche 2.7M BRL) - Susik Hemawiti", tiers: "Susik Hemawiti", val_2024: 11088.77, val_2025: 11088.77, val_2026: 11088.77, note: "Prêt participatif 7%" },
                { ref: "232100007", desc: "Prêt participatif 7% (Tranche 2.7M BRL) - Marco Sterzi", tiers: "Marco Sterzi", val_2024: 65568.38, val_2025: 65568.38, val_2026: 65568.38, note: "Prêt participatif 7%" },
                { ref: "232100008", desc: "Prêt participatif 7% (Tranche 2.7M BRL) - Giorgio Vignolle", tiers: "Giorgio Vignolle", val_2024: 26516.63, val_2025: 26516.63, val_2026: 26516.63, note: "Prêt participatif 7%" },
                { ref: "232100009", desc: "Prêt participatif 7% (Tranche 2.7M BRL) - Edoardo Tubia", tiers: "Edoardo Tubia", val_2024: 70871.71, val_2025: 70871.71, val_2026: 70871.71, note: "Prêt participatif 7%" },
                { ref: "232100010", desc: "Prêt participatif 7% (Tranche 2.7M BRL) - Enrico Tubia", tiers: "Enrico Tubia", val_2024: 28927.23, val_2025: 28927.23, val_2026: 28927.23, note: "Prêt participatif 7%" },
                { ref: "232100011", desc: "Prêt participatif 7% (Tranche 2.7M BRL) - Glenelg SA", tiers: "Glenelg SA", val_2024: 96424.09, val_2025: 96424.09, val_2026: 96424.09, note: "Prêt participatif 7%" },
                { ref: "232200001", desc: "Prêt participatif 7% (Tranche 589k BRL) - Giorgio Vignolle", tiers: "Giorgio Vignolle", val_2024: 29826.31, val_2025: 29826.31, val_2026: 29826.31, note: "Tranche complémentaire 589.720 BRL" },
                { ref: "232200002", desc: "Prêt participatif 7% (Tranche 589k BRL) - Edoardo Tubia", tiers: "Edoardo Tubia", val_2024: 100000.00, val_2025: 100000.00, val_2026: 100000.00, note: "Tranche complémentaire 589.720 BRL" }
            ]
        }
    ],
    "bal_411100": [
        {
            ref: "4111250",
            desc: "Créances d'intérêts courus sur prêts filiale ArcoIris 7% rattachées aux Associés (durée <= 1 an)",
            tiers: "10 Associés Prêteurs / ArcoIris Ltda",
            val_2024: 122771.23,
            val_2025: 158551.28,
            val_2026: 158551.28,
            note: "Intérêts conventionnels 7% sur prêts participatifs (BRL 2.7M & 589k) dus par filiale",
            sub_title: "Ventilation nominative des créances d'intérêts par associé (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "41112502", desc: "Sergio Vandi (S.V.) - Intérêts courus prêt ArcoIris 7%", tiers: "Sergio Vandi", val_2024: 11502.94, val_2025: 14886.12, val_2026: 14886.12, note: "Prêt participatif quote-part S.V." },
                { ref: "41112503", desc: "Jean-Pierre Murgia (J-P.M.) - Intérêts courus prêt ArcoIris 7%", tiers: "Jean-Pierre Murgia", val_2024: 805.21, val_2025: 1042.03, val_2026: 1042.03, note: "Prêt participatif quote-part J-P.M." },
                { ref: "41112504", desc: "Stefano Bosi (S.B.) - Intérêts courus prêt ArcoIris 7%", tiers: "Stefano Bosi", val_2024: 9202.35, val_2025: 11908.90, val_2026: 11908.90, note: "Prêt participatif quote-part S.B." },
                { ref: "41112505", desc: "Marco Canton (M.C.) - Intérêts courus prêt ArcoIris 7%", tiers: "Marco Canton", val_2024: 6901.76, val_2025: 8931.67, val_2026: 8931.67, note: "Prêt participatif quote-part M.C." },
                { ref: "41112506", desc: "Susik Hemawiti (S.H.) - Intérêts courus prêt ArcoIris 7%", tiers: "Susik Hemawiti", val_2024: 2645.68, val_2025: 3423.81, val_2026: 3423.81, note: "Prêt participatif quote-part S.H." },
                { ref: "41112507", desc: "Marco Sterzi (M.S.) - Intérêts courus prêt ArcoIris 7%", tiers: "Marco Sterzi", val_2024: 15643.99, val_2025: 20245.13, val_2026: 20245.13, note: "Prêt participatif quote-part M.S." },
                { ref: "41112508", desc: "Giorgio Vignolle (G.V.) - Intérêts courus prêt ArcoIris 7%", tiers: "Giorgio Vignolle", val_2024: 11593.58, val_2025: 14927.88, val_2026: 14927.88, note: "Prêt participatif quote-part G.V." },
                { ref: "41112509", desc: "Edoardo Tubia (Ed.T.) - Intérêts courus prêt ArcoIris 7%", tiers: "Edoardo Tubia", val_2024: 34568.09, val_2025: 44481.81, val_2026: 44481.81, note: "Prêt participatif quote-part Ed.T." },
                { ref: "41112510", desc: "Enrico Tubia (En.T.) - Intérêts courus prêt ArcoIris 7%", tiers: "Enrico Tubia", val_2024: 6901.76, val_2025: 8931.67, val_2026: 8931.67, note: "Prêt participatif quote-part En.T." },
                { ref: "41112511", desc: "Glenelg Participations SA - Intérêts courus prêt ArcoIris 7%", tiers: "Glenelg SA", val_2024: 23005.87, val_2025: 29772.26, val_2026: 29772.26, note: "Prêt participatif quote-part Glenelg" }
            ]
        },
        {
            ref: "42143",
            desc: "Créance fiscale Impôt sur la Fortune (ACD Luxembourg)",
            tiers: "Administration des Contributions Directes (ACD)",
            val_2024: 4815.00,
            val_2025: 4815.00,
            val_2026: 7222.50,
            note: "Acomptes forfaitaires IF payés d'avance",
            sub_title: "Détail de la créance fiscale IF (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "IF-NWT", desc: "Acomptes provisionnels payés Impôt sur la Fortune", tiers: "ACD Luxembourg", val_2024: 4815.00, val_2025: 4815.00, val_2026: 7222.50, note: "Tarif annuel légal SOPARFI" }
            ]
        },
        {
            ref: "42288",
            desc: "Créances diverses à plus d'un an (> 1 an) - Franco Toscano (100.000 BRL)",
            tiers: "Franco Toscano",
            val_2024: 30000.00,
            val_2025: 30000.00,
            val_2026: 30000.00,
            note: "Créance immobilisée à plus d'un an - Convention de prêt 100.000 BRL",
            sub_title: "Détail de la créance à plus d'un an (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "PRET-FT", desc: "Prêt à long terme 100.000 BRL consenti à Franco Toscano", tiers: "Franco Toscano", val_2024: 30000.00, val_2025: 30000.00, val_2026: 30000.00, note: "Convention de prêt à terme échu > 1 an" }
            ]
        }
    ],
    "bal_5131000": [
        {
            ref: "513101",
            desc: "Compte principal Olky Pay EUR (LU54 6060 0020 0000 3393)",
            tiers: "Olky Payment Services S.A.",
            val_2024: 31888.53,
            val_2025: 19156.88,
            val_2026: 11440.97,
            note: "Disponibilités certifiées au bilan officiel",
            sub_title: "Décomposition des soldes d'exercice Olky Pay (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "BNK-01", desc: "Solde certifié au 31/12/2024 (Dépôt eCDF officiel)", tiers: "Olky Pay", val_2024: 31888.53, val_2025: 31888.53, val_2026: 31888.53, note: "Relevé N° 12/2024 certifié" },
                { ref: "BNK-02", desc: "Flux nets d'exploitation et encaissement intérêts 2025", tiers: "Opérations courantes", val_2024: 0.00, val_2025: -12731.65, val_2026: -12731.65, note: "Intérêts perçus (+35,7k€) - Frais fiduciaire & impôts (-48,5k€)" },
                { ref: "BNK-03", desc: "Solde certifié au 31/12/2025 (Dépôt eCDF officiel)", tiers: "Olky Pay", val_2024: 0.00, val_2025: 19156.88, val_2026: 19156.88, note: "Solde de clôture 2025 certifié" },
                { ref: "BNK-04", desc: "Solde disponible opérationnel YTD au 09/10/2026", tiers: "Olky Pay", val_2024: 0.00, val_2025: 0.00, val_2026: 11440.97, note: "Solde courant temps réel" }
            ]
        },
        {
            ref: "513201",
            desc: "Compte Revolut Business EUR (LT92 3250 0340 9644 5618)",
            tiers: "Revolut Bank UAB",
            val_2024: 0.00,
            val_2025: 0.00,
            val_2026: 652.25,
            note: "Avoirs disponibles opérationnels Revolut",
            sub_title: "Détail du compte Revolut Business (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "REV-01", desc: "Compte courant d'exploitation EUR ouvert en 2026", tiers: "Revolut Bank UAB", val_2024: 0.00, val_2025: 0.00, val_2026: 652.25, note: "Trésorerie d'appoint et paiements multidevises" }
            ]
        }
    ],
    "bal_45222": [
        {
            ref: "45222",
            desc: "Dettes > 1 an envers associés liés (Fusion absorption LRD & prêts ArcoIris)",
            tiers: "11 Associés liés",
            val_2024: 774676.31,
            val_2025: 774676.31,
            val_2026: 774676.31,
            note: "Dettes à long terme (> 1 an) issues de la fusion LRD et conventions de prêts",
            sub_title: "Répartition nominative des dettes par associé (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "4522200", desc: "Alfonso Belardi : Dette fusion LRD (> 1 an)", tiers: "Alfonso Belardi", val_2024: 19170.00, val_2025: 19170.00, val_2026: 19170.00, note: "Dette à plus d'un an (> 1 an)" },
                { ref: "4522201", desc: "Sergio Vandi : Dette fusion LRD + part prêt Arco 2.7M BRL", tiers: "Sergio Vandi", val_2024: 69170.00, val_2025: 69170.00, val_2026: 69170.00, note: "20.957,95 € fusion + 48.212,05 € prêt" },
                { ref: "4522202", desc: "Jean-Pierre Murgia : Dette fusion LRD + part prêt Arco 2.7M BRL", tiers: "Jean-Pierre Murgia", val_2024: 22670.00, val_2025: 22670.00, val_2026: 22670.00, note: "19.295,16 € fusion + 3.374,84 € prêt" },
                { ref: "4522203", desc: "Stefano Bosi : Dette fusion LRD + part prêt Arco 2.7M BRL", tiers: "Stefano Bosi", val_2024: 59170.00, val_2025: 59170.00, val_2026: 59170.00, note: "20.600,36 € fusion + 38.569,64 € prêt" },
                { ref: "4522204", desc: "Marco Canton : Dette fusion LRD + part prêt Arco 2.7M BRL", tiers: "Marco Canton", val_2024: 49170.00, val_2025: 49170.00, val_2026: 49170.00, note: "20.242,77 € fusion + 28.927,23 € prêt" },
                { ref: "4522205", desc: "Susik Hemawiti : Dette fusion LRD + part prêt Arco 2.7M BRL", tiers: "Susik Hemawiti", val_2024: 30670.00, val_2025: 30670.00, val_2026: 30670.00, note: "19.581,23 € fusion + 11.088,77 € prêt" },
                { ref: "4522206", desc: "Giorgio Vignolle : Dette fusion LRD + parts prêts 2.7M & 589k BRL", tiers: "Giorgio Vignolle", val_2024: 66906.31, val_2025: 66906.31, val_2026: 66906.31, note: "10.563,37 € + 26.516,63 € + 29.826,31 €" },
                { ref: "4522207", desc: "Marco Sterzi : Dette fusion LRD + part prêt Arco 2.7M BRL", tiers: "Marco Sterzi", val_2024: 77580.00, val_2025: 77580.00, val_2026: 77580.00, note: "12.011,62 € fusion + 65.568,38 € prêt" },
                { ref: "4522208", desc: "Glenelg SA : Dette fusion LRD + part prêt Arco 2.7M BRL", tiers: "Glenelg SA", val_2024: 138330.00, val_2025: 138330.00, val_2026: 138330.00, note: "41.905,91 € fusion + 96.424,09 € prêt" },
                { ref: "4522209", desc: "Enrico Tubia : Dette fusion LRD + part prêt Arco 2.7M BRL", tiers: "Enrico Tubia", val_2024: 49170.00, val_2025: 49170.00, val_2026: 49170.00, note: "20.242,77 € fusion + 28.927,23 € prêt" },
                { ref: "4522210", desc: "Edoardo Tubia : Dette fusion LRD + parts prêts 2.7M & 589k BRL", tiers: "Edoardo Tubia", val_2024: 192670.00, val_2025: 192670.00, val_2026: 192670.00, note: "21.798,29 € + 70.871,71 € + 100.000,00 €" }
            ]
        }
    ],
    "bal_421100": [
        {
            ref: "47130",
            desc: "Engagements et rémunérations envers administrateurs et dirigeants (durée <= 1 an)",
            tiers: "Collège des Administrateurs",
            val_2024: 133280.11,
            val_2025: 133280.11,
            val_2026: 133280.11,
            note: "Dettes court terme / comptes courants d'administration et fusion LRD",
            sub_title: "Répartition individuelle par administrateur (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "4713000", desc: "Edoardo TUBIA : Avances d'administration et compte courant", tiers: "Edoardo Tubia", val_2024: 70038.94, val_2025: 70038.94, val_2026: 70038.94, note: "Gérance et direction générale" },
                { ref: "4713005", desc: "Edoardo TUBIA : Dette à court terme issue de la fusion LRD", tiers: "Edoardo Tubia", val_2024: 35636.12, val_2025: 35636.12, val_2026: 35636.12, note: "Régularisation fusion LRD" },
                { ref: "4713006", desc: "Marco STERZI : Dette à court terme issue de la fusion LRD", tiers: "Marco Sterzi", val_2024: 27605.05, val_2025: 27605.05, val_2026: 27605.05, note: "Régularisation fusion LRD" }
            ]
        }
    ],
    "bal_421300": [
        {
            ref: "45218",
            desc: "Dettes primes statutaires associées (durée <= 1 an)",
            tiers: "10 Associés bénéficiaires",
            val_2024: 85008.00,
            val_2025: 110054.03,
            val_2026: 110054.03,
            note: "Primes contractuelles échues dues aux associés",
            sub_title: "Décomposition nominative des primes par associé (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "452180001", desc: "Sergio Vandi (S.V.) : Prime statutaire associée", tiers: "Sergio Vandi", val_2024: 7944.70, val_2025: 10312.93, val_2026: 10312.93, note: "Prime statutaire échue" },
                { ref: "452180002", desc: "Jean-Pierre Murgia (J-P.M.) : Prime statutaire associée", tiers: "Jean-Pierre Murgia", val_2024: 556.14, val_2025: 721.92, val_2026: 721.92, note: "Prime statutaire échue" },
                { ref: "452180003", desc: "Stefano Bosi (S.B.) : Prime statutaire associée", tiers: "Stefano Bosi", val_2024: 6355.76, val_2025: 8250.34, val_2026: 8250.34, note: "Prime statutaire échue" },
                { ref: "452180004", desc: "Marco Canton (M.C.) : Prime statutaire associée", tiers: "Marco Canton", val_2024: 4766.82, val_2025: 6187.76, val_2026: 6187.76, note: "Prime statutaire échue" },
                { ref: "452180005", desc: "Susik Hemawiti (S.H.) : Prime statutaire associée", tiers: "Susik Hemawiti", val_2024: 1827.28, val_2025: 2371.97, val_2026: 2371.97, note: "Prime statutaire échue" },
                { ref: "452180006", desc: "Marco Sterzi (M.S.) : Prime statutaire associée", tiers: "Marco Sterzi", val_2024: 10804.79, val_2025: 14025.58, val_2026: 14025.58, note: "Prime statutaire échue" },
                { ref: "452180007", desc: "Giorgio Vignolle (G.V.) : Prime statutaire associée", tiers: "Giorgio Vignolle", val_2024: 8056.45, val_2025: 10390.46, val_2026: 10390.46, note: "Prime statutaire échue" },
                { ref: "452180008", desc: "Edoardo Tubia (Ed.T.) : Prime statutaire associée", tiers: "Edoardo Tubia", val_2024: 24039.84, val_2025: 30979.45, val_2026: 30979.45, note: "Prime statutaire échue" },
                { ref: "452180009", desc: "Enrico Tubia (En.T.) : Prime statutaire associée", tiers: "Enrico Tubia", val_2024: 4766.82, val_2025: 6187.76, val_2026: 6187.76, note: "Prime statutaire échue" },
                { ref: "452180010", desc: "Glenelg SA : Prime statutaire associée", tiers: "Glenelg SA", val_2024: 15889.40, val_2025: 20625.86, val_2026: 20625.86, note: "Prime statutaire échue" }
            ]
        }
    ],
    "bal_141000": [
        {
            ref: "141100",
            desc: "Report à nouveau débiteur (Pertes nettes cumulées antérieures)",
            tiers: "Capitaux propres",
            val_2024: -87384.44,
            val_2025: -149786.10,
            val_2026: -153506.61,
            note: "Imputation des résultats d'exercices clos",
            sub_title: "Historique d'imputation des résultats au report à nouveau (Niveau 3) :",
            sub_type: "records",
            sub_items: [
                { ref: "RAN-HIST", desc: "Pertes reportées antérieures à l'exercice 2024", tiers: "Exercices précédents", val_2024: -87384.44, val_2025: -87384.44, val_2026: -87384.44, note: "Solde d'ouverture eCDF 2024" },
                { ref: "RAN-2024", desc: "Affectation de la perte de l'exercice 2024 (-62.401,88 €)", tiers: "AGO du 26/05/2025", val_2024: 0.00, val_2025: -62401.88, val_2026: -62401.88, note: "Solde reporté au 31/12/2025 : -149.786,10 €" },
                { ref: "RAN-2025", desc: "Affectation de la perte de l'exercice 2025 (-3.720,51 €)", tiers: "AGO du 11/05/2026", val_2024: 0.00, val_2025: 0.00, val_2026: -3720.51, note: "Solde reporté en 2026 : -153.506,61 €" }
            ]
        }
    ]
};

// -------------------------------------------------------------
// LOGIQUE DE DRILLDOWN / ACCORDION DÉROULANT (MULTI-NIVEAUX)
// -------------------------------------------------------------
function toggleComptaDrilldown(id) {
    const detailRow = document.getElementById(`detail-${id}`);
    const parentRow = document.getElementById(`row-${id}`);
    const chev = document.getElementById(`chev-${id}`);
    if (!detailRow || !parentRow) return;

    const isVisible = detailRow.style.display !== 'none';
    if (isVisible) {
        detailRow.style.display = 'none';
        parentRow.classList.remove('expanded');
        if (chev) chev.style.transform = 'rotate(0deg)';
    } else {
        detailRow.style.display = 'table-row';
        parentRow.classList.add('expanded');
        if (chev) chev.style.transform = 'rotate(90deg)';
    }
}

function toggleComptaSubDrilldown(subId) {
    const subDetailRow = document.getElementById(`subdetail-${subId}`);
    const subParentRow = document.getElementById(`subrow-${subId}`);
    const chev = document.getElementById(`subchev-${subId}`);
    if (!subDetailRow) return;

    const isVisible = subDetailRow.style.display !== 'none';
    if (isVisible) {
        subDetailRow.style.display = 'none';
        if (subParentRow) subParentRow.classList.remove('expanded');
        if (chev) chev.style.transform = 'rotate(0deg)';
    } else {
        subDetailRow.style.display = 'table-row';
        if (subParentRow) subParentRow.classList.add('expanded');
        if (chev) chev.style.transform = 'rotate(90deg)';
    }
}

let currentBilanLevel = 1;

function setBilanLevel(level, btn) {
    currentBilanLevel = level;
    document.querySelectorAll('#btn-bilan-level-1, #btn-bilan-level-2').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    } else {
        const targetBtn = document.getElementById(`btn-bilan-level-${level}`);
        if (targetBtn) targetBtn.classList.add('active');
    }

    toggleAllBilanDrilldown(level === 2);
}

function toggleAllBilanDrilldown(expand) {
    currentBilanLevel = expand ? 2 : 1;
    const btn1 = document.getElementById('btn-bilan-level-1');
    const btn2 = document.getElementById('btn-bilan-level-2');
    if (btn1 && btn2) {
        if (expand) {
            btn1.classList.remove('active');
            btn2.classList.add('active');
        } else {
            btn1.classList.add('active');
            btn2.classList.remove('active');
        }
    }

    const detailRows = document.querySelectorAll('#tab-bilan .compta-detail-row');
    const parentRows = document.querySelectorAll('#tab-bilan .compta-interactive-row');
    const chevrons = document.querySelectorAll('#tab-bilan .compta-chevron');

    detailRows.forEach(r => r.style.display = expand ? 'table-row' : 'none');
    parentRows.forEach(r => expand ? r.classList.add('expanded') : r.classList.remove('expanded'));
    chevrons.forEach(c => c.style.transform = expand ? 'rotate(90deg)' : 'rotate(0deg)');

    if (!expand) {
        const subDetailRows = document.querySelectorAll('#tab-bilan .compta-sub-detail-row');
        const subParentRows = document.querySelectorAll('#tab-bilan .compta-sub-drill-row');
        const subChevrons = document.querySelectorAll('#tab-bilan .compta-sub-chevron');
        subDetailRows.forEach(r => r.style.display = 'none');
        subParentRows.forEach(r => r.classList.remove('expanded'));
        subChevrons.forEach(c => c.style.transform = 'rotate(0deg)');
    }
}

function toggleBilanSection(section, expand) {
    const tableId = section === 'actif' ? 'actif-tbody-comp' : 'passif-tbody-comp';
    const detailRows = document.querySelectorAll(`#${tableId} .compta-detail-row`);
    const parentRows = document.querySelectorAll(`#${tableId} .compta-interactive-row`);
    const chevrons = document.querySelectorAll(`#${tableId} .compta-chevron`);

    detailRows.forEach(r => r.style.display = expand ? 'table-row' : 'none');
    parentRows.forEach(r => expand ? r.classList.add('expanded') : r.classList.remove('expanded'));
    chevrons.forEach(c => c.style.transform = expand ? 'rotate(90deg)' : 'rotate(0deg)');
}

function expandAllBalanceDrilldown(expand) {
    const detailRows = document.querySelectorAll('#tab-balance .compta-detail-row');
    const parentRows = document.querySelectorAll('#tab-balance .compta-interactive-row');
    const chevrons = document.querySelectorAll('#tab-balance .compta-chevron');
    const subDetailRows = document.querySelectorAll('#tab-balance .compta-sub-detail-row');
    const subParentRows = document.querySelectorAll('#tab-balance .compta-sub-drill-row');
    const subChevrons = document.querySelectorAll('#tab-balance .compta-sub-chevron');

    detailRows.forEach(r => r.style.display = expand ? 'table-row' : 'none');
    parentRows.forEach(r => expand ? r.classList.add('expanded') : r.classList.remove('expanded'));
    chevrons.forEach(c => c.style.transform = expand ? 'rotate(90deg)' : 'rotate(0deg)');

    subDetailRows.forEach(r => r.style.display = expand ? 'table-row' : 'none');
    subParentRows.forEach(r => expand ? r.classList.add('expanded') : r.classList.remove('expanded'));
    subChevrons.forEach(c => c.style.transform = expand ? 'rotate(90deg)' : 'rotate(0deg)');
}

function renderLevel3Table(item, isComp) {
    if (!item.sub_items || item.sub_items.length === 0) return '';

    if (item.sub_type === 'partners') {
        const totalShares = item.sub_items.reduce((s, p) => s + (p.shares || 0), 0);
        const totalVal = item.sub_items.reduce((s, p) => s + (p.val || 0), 0);
        const totalPctClass = item.sub_items.reduce((s, p) => s + (p.pct_class || 0), 0);
        const totalPctTot = item.sub_items.reduce((s, p) => s + (p.pct_tot || 0), 0);

        return `
            <table class="compta-level3-table">
                <thead>
                    <tr>
                        <th style="width: 45px;">#</th>
                        <th>Actionnaire / Associé & Résidence</th>
                        <th class="text-right" style="width: 110px;">Actions Détenues</th>
                        <th class="text-right" style="width: 95px;">% Classe</th>
                        <th class="text-right" style="width: 95px;">% Total Cap.</th>
                        <th class="text-right" style="width: 130px;">Valeur Nominale (€)</th>
                        <th class="text-center" style="width: 130px;">Droits de Vote</th>
                    </tr>
                </thead>
                <tbody>
                    ${item.sub_items.map((p, idx) => `
                        <tr>
                            <td style="color: var(--text-muted); font-family: monospace;">${p.id || (idx + 1)}</td>
                            <td>
                                <strong style="color: var(--text-main); font-size: 0.77rem;">${p.name}</strong>
                                <span style="color: var(--text-muted); font-size: 0.69rem; margin-left: 0.35rem;">(${p.res})</span>
                            </td>
                            <td class="text-right text-cyan" style="font-family: 'JetBrains Mono', monospace; font-weight: 700;">${formatNumber(p.shares)}</td>
                            <td class="text-right text-emerald" style="font-family: 'JetBrains Mono', monospace; font-weight: 700;">${p.pct_class.toFixed(4)} %</td>
                            <td class="text-right" style="font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">${p.pct_tot.toFixed(2)} %</td>
                            <td class="text-right text-bold" style="font-family: 'JetBrains Mono', monospace;">${formatCurrency(p.val)}</td>
                            <td class="text-center" style="font-size: 0.71rem;">${p.vote}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot style="background: rgba(0,0,0,0.3); font-weight: 800; border-top: 1px solid var(--border-color);">
                    <tr>
                        <td colspan="2" style="text-align: right; color: #34d399;">TOTAL COMPOSITION NOMINATIVE :</td>
                        <td class="text-right text-cyan" style="font-family: 'JetBrains Mono', monospace;">${formatNumber(totalShares)} act.</td>
                        <td class="text-right text-emerald" style="font-family: 'JetBrains Mono', monospace;">${totalPctClass.toFixed(4)} %</td>
                        <td class="text-right" style="font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">${totalPctTot.toFixed(2)} %</td>
                        <td class="text-right" style="font-family: 'JetBrains Mono', monospace; color: var(--text-main);">${formatCurrency(totalVal)}</td>
                        <td class="text-center"><span class="badge badge-success">100% Conforme</span></td>
                    </tr>
                </tfoot>
            </table>
        `;
    }

    // Default 'records' sub-table
    let headThs = isComp ? `
        <th class="text-right" style="width: 125px;">Solde ${compareYear1}</th>
        <th class="text-right" style="width: 125px;">Solde ${compareYear2}</th>
        <th class="text-right" style="width: 105px;">Variation</th>
    ` : `
        <th class="text-right" style="width: 140px;">Montant ${selectedSingleYear}</th>
    `;

    return `
        <table class="compta-level3-table">
            <thead>
                <tr>
                    <th style="width: 105px; min-width: 105px; white-space: nowrap;">Réf.</th>
                    <th style="padding-left: 0.85rem;">Poste Analytique / Justificatif Élémentaire</th>
                    <th style="width: 180px;">Tiers / Contrepartie</th>
                    ${headThs}
                </tr>
            </thead>
            <tbody>
                ${item.sub_items.map(sub => {
                    const sv1 = sub[`val_${compareYear1}`] || 0;
                    const sv2 = sub[`val_${compareYear2}`] || 0;
                    const sdiff = sv2 - sv1;
                    const svSingle = sub[`val_${selectedSingleYear}`] || 0;

                    if (isComp) {
                        return `
                            <tr>
                                <td style="white-space: nowrap;"><code>${sub.ref}</code></td>
                                <td style="padding-left: 0.85rem;">
                                    <div style="font-weight: 600; color: var(--text-main); font-size: 0.76rem;">${sub.desc}</div>
                                    ${sub.note ? `<div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.15rem;">${sub.note}</div>` : ''}
                                </td>
                                <td style="color: var(--text-muted); font-size: 0.72rem;">${sub.tiers || '-'}</td>
                                <td class="text-right" style="font-family: 'JetBrains Mono', monospace;">${formatCurrency(sv1)}</td>
                                <td class="text-right text-bold text-cyan" style="font-family: 'JetBrains Mono', monospace;">${formatCurrency(sv2)}</td>
                                <td class="text-right" style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: ${sdiff < 0 ? '#f43f5e' : (sdiff > 0 ? '#34d399' : 'inherit')};">${formatCurrency(sdiff)}</td>
                            </tr>
                        `;
                    } else {
                        return `
                            <tr>
                                <td style="white-space: nowrap;"><code>${sub.ref}</code></td>
                                <td style="padding-left: 0.85rem;">
                                    <div style="font-weight: 600; color: var(--text-main); font-size: 0.76rem;">${sub.desc}</div>
                                    ${sub.note ? `<div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.15rem;">${sub.note}</div>` : ''}
                                </td>
                                <td style="color: var(--text-muted); font-size: 0.72rem;">${sub.tiers || '-'}</td>
                                <td class="text-right text-bold text-cyan" style="font-family: 'JetBrains Mono', monospace;">${formatCurrency(svSingle)}</td>
                            </tr>
                        `;
                    }
                }).join('')}
            </tbody>
        </table>
    `;
}

function renderDrilldownRow(id, title, items) {
    if (!items || items.length === 0) return '';
    const isComp = comptaMode === 'comparatif';

    let headerThs = '';
    if (isComp) {
        headerThs = `
            <th class="text-right" style="width: 120px;">${compareYear1}</th>
            <th class="text-right" style="width: 120px;">${compareYear2}</th>
            <th class="text-right" style="width: 100px;">${typeof t === 'function' ? t('th_ecart') : 'Écart'}</th>
        `;
    } else {
        headerThs = `
            <th class="text-right" style="width: 140px;">${typeof t === 'function' ? t('th_montant') : 'Montant'} ${selectedSingleYear}</th>
        `;
    }

    return `
        <tr class="compta-detail-row" id="detail-${id}" style="display: none;">
            <td colspan="${isComp ? 5 : 4}" style="padding: 0; background: transparent; border: none;">
                <div class="compta-drilldown-box">
                    <div class="compta-drilldown-header">
                        <span><i class="fa-solid fa-layer-group text-emerald"></i> ${typeof t === 'function' ? t('compta_drill_header') : 'Composition détaillée :'} <strong>${title}</strong></span>
                        <span class="badge badge-neutral" style="font-size: 0.72rem;">${items.length} ${typeof t === 'function' ? t('compta_drill_items_count') : 'écritures / postes élémentaires'}</span>
                    </div>
                    <div class="compta-drilldown-scroll">
                        <table class="compta-sub-table">
                            <thead>
                                <tr>
                                    <th style="width: 120px; min-width: 120px; white-space: nowrap;">${typeof t === 'function' ? t('compta_drill_date_ref') : 'Date / Réf'}</th>
                                    <th style="padding-left: 1rem;">${typeof t === 'function' ? t('compta_drill_intitule') : "Intitulé de l'écriture / Justificatif"}</th>
                                    <th style="width: 180px;">${typeof t === 'function' ? t('compta_drill_tiers') : 'Tiers / Contrepartie'}</th>
                                    ${headerThs}
                                </tr>
                            </thead>
                            <tbody>
                                ${items.map(it => {
                                    const v1 = it[`val_${compareYear1}`] || 0;
                                    const v2 = it[`val_${compareYear2}`] || 0;
                                    const diff = v2 - v1;
                                    const vSingle = it[`val_${selectedSingleYear}`] || 0;
                                    const hasSub = it.sub_items && it.sub_items.length > 0;
                                    const subId = `${id}-${(it.ref || 'sub').replace(/[^a-zA-Z0-9]/g, '_')}`;

                                    let rowHtml = '';
                                    if (isComp) {
                                        rowHtml = `
                                            <tr class="${hasSub ? 'compta-sub-drill-row' : ''}" id="subrow-${subId}" ${hasSub ? `onclick="event.stopPropagation(); toggleComptaSubDrilldown('${subId}')" title="Cliquer pour afficher la composition (Niveau 3)"` : ''}>
                                                <td style="white-space: nowrap; width: 120px; min-width: 120px; vertical-align: middle;">
                                                    <div style="display: inline-flex; align-items: center; gap: 0.35rem;">
                                                        ${hasSub ? `<i class="fa-solid fa-chevron-right compta-sub-chevron" id="subchev-${subId}"></i>` : ''}
                                                        <code>${it.ref || '-'}</code>
                                                    </div>
                                                </td>
                                                <td style="padding-left: 1rem;">
                                                    <div style="font-weight: 600; display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
                                                        <span>${it.desc}</span>
                                                        ${hasSub ? `
                                                            <span class="badge" style="background: rgba(2, 132, 199, 0.2); color: #38bdf8; font-size: 0.67rem; padding: 0.15rem 0.45rem;">
                                                                <i class="fa-solid fa-sitemap"></i> ${it.sub_items.length} ${it.sub_type === 'partners' ? 'associés' : 'postes'} (Niveau 3)
                                                            </span>
                                                        ` : ''}
                                                    </div>
                                                    ${it.note ? `<div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.15rem;">${it.note}</div>` : ''}
                                                </td>
                                                <td style="color: var(--text-muted); font-size: 0.75rem;">${it.tiers || '-'}</td>
                                                <td class="text-right" style="font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;">${formatCurrency(v1)}</td>
                                                <td class="text-right text-bold" style="font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;">${formatCurrency(v2)}</td>
                                                <td class="text-right" style="font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: ${diff < 0 ? '#f43f5e' : (diff > 0 ? '#34d399' : 'inherit')};">${formatCurrency(diff)}</td>
                                            </tr>
                                        `;
                                    } else {
                                        rowHtml = `
                                            <tr class="${hasSub ? 'compta-sub-drill-row' : ''}" id="subrow-${subId}" ${hasSub ? `onclick="event.stopPropagation(); toggleComptaSubDrilldown('${subId}')" title="Cliquer pour afficher la composition (Niveau 3)"` : ''}>
                                                <td style="white-space: nowrap; width: 120px; min-width: 120px; vertical-align: middle;">
                                                    <div style="display: inline-flex; align-items: center; gap: 0.35rem;">
                                                        ${hasSub ? `<i class="fa-solid fa-chevron-right compta-sub-chevron" id="subchev-${subId}"></i>` : ''}
                                                        <code>${it.ref || '-'}</code>
                                                    </div>
                                                </td>
                                                <td style="padding-left: 1rem;">
                                                    <div style="font-weight: 600; display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
                                                        <span>${it.desc}</span>
                                                        ${hasSub ? `
                                                            <span class="badge" style="background: rgba(2, 132, 199, 0.2); color: #38bdf8; font-size: 0.67rem; padding: 0.15rem 0.45rem;">
                                                                <i class="fa-solid fa-sitemap"></i> ${it.sub_items.length} ${it.sub_type === 'partners' ? 'associés' : 'postes'} (Niveau 3)
                                                            </span>
                                                        ` : ''}
                                                    </div>
                                                    ${it.note ? `<div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.15rem;">${it.note}</div>` : ''}
                                                </td>
                                                <td style="color: var(--text-muted); font-size: 0.75rem;">${it.tiers || '-'}</td>
                                                <td class="text-right text-bold" style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #38bdf8;">${formatCurrency(vSingle)}</td>
                                            </tr>
                                        `;
                                    }

                                    if (hasSub) {
                                        rowHtml += `
                                            <tr class="compta-sub-detail-row" id="subdetail-${subId}" style="display: none;">
                                                <td colspan="${isComp ? 6 : 4}" style="padding: 0; background: transparent; border: none;">
                                                    <div class="compta-level3-box">
                                                        <div class="compta-level3-header">
                                                            <span><i class="fa-solid fa-folder-tree text-cyan"></i> ${it.sub_title || 'Composition détaillée (Niveau 3) :'}</span>
                                                            <span class="badge badge-info" style="font-size: 0.68rem;">Niveau 3 • Grand Livre Analytique</span>
                                                        </div>
                                                        ${renderLevel3Table(it, isComp)}
                                                    </div>
                                                </td>
                                            </tr>
                                        `;
                                    }

                                    return rowHtml;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </td>
        </tr>
    `;
}

// -------------------------------------------------------------
// GESTION DU MODE (ANNÉE UNIQUE vs COMPARATIF)
// -------------------------------------------------------------
function setComptaMode(mode, btn) {
    comptaMode = mode;
    document.querySelectorAll('.view-mode-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const singleBar = document.getElementById('compta-single-bar');
    const compBar = document.getElementById('compta-compare-bar');

    if (mode === 'single') {
        if (singleBar) singleBar.style.display = 'flex';
        if (compBar) compBar.style.display = 'none';
    } else {
        if (singleBar) singleBar.style.display = 'none';
        if (compBar) compBar.style.display = 'flex';
    }

    renderAllComptaViews();
}

function selectSingleYear(year, btn) {
    selectedSingleYear = year;
    document.querySelectorAll('.year-pill-single').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    renderAllComptaViews();
}

function applyCompareYears() {
    const y1 = document.getElementById('compare-year-1')?.value || '2024';
    const y2 = document.getElementById('compare-year-2')?.value || '2025';

    if (y1 === y2) {
        alert("Veuillez sélectionner deux années différentes pour la comparaison.");
        return;
    }

    compareYear1 = y1;
    compareYear2 = y2;
    renderAllComptaViews();
}

// -------------------------------------------------------------
// MISE À JOUR DES KPIS
// -------------------------------------------------------------
function updateComptaKPIs() {
    const dataByYear = window.WATERGARDEN_DATA?.accounting_by_year;
    if (!dataByYear) return;

    const kpiActif = document.getElementById('kpi-total-actif');
    const kpiPassif = document.getElementById('kpi-total-passif');
    const kpiResultat = document.getElementById('kpi-resultat-net');

    const subActif = document.getElementById('kpi-sub-actif');
    const subPassif = document.getElementById('kpi-sub-passif');
    const subResultat = document.getElementById('kpi-sub-resultat');

    if (comptaMode === 'single') {
        const yData = dataByYear[selectedSingleYear];
        if (!yData) return;

        if (kpiActif) kpiActif.textContent = formatCurrency(yData.actif.total_actif);
        if (kpiPassif) kpiPassif.textContent = formatCurrency(yData.passif.capitaux_propres_total);
        if (kpiResultat) {
            kpiResultat.textContent = formatCurrency(yData.pp.resultat_net);
            kpiResultat.style.color = yData.pp.resultat_net >= 0 ? '#10b981' : '#f43f5e';
        }

        const tag = yData.is_ytd ? ' (YTD 2026 en cours)' : ' (Exercice clos)';
        if (subActif) subActif.textContent = `Année ${selectedSingleYear}${tag}`;
        if (subPassif) subPassif.textContent = `Capital 4.342.640 € + Primes & réserves`;
        if (subResultat) subResultat.textContent = yData.is_ytd ? 'Résultat net pro-rata YTD' : (yData.pp.resultat_net >= 0 ? 'Bénéfice net' : 'Perte nette de l\'exercice');

    } else {
        const d1 = dataByYear[compareYear1];
        const d2 = dataByYear[compareYear2];
        if (!d1 || !d2) return;

        if (kpiActif) kpiActif.textContent = formatCurrency(d2.actif.total_actif);
        if (kpiPassif) kpiPassif.textContent = formatCurrency(d2.passif.capitaux_propres_total);
        if (kpiResultat) {
            kpiResultat.textContent = formatCurrency(d2.pp.resultat_net);
            kpiResultat.style.color = d2.pp.resultat_net >= 0 ? '#10b981' : '#f43f5e';
        }

        const diffActif = d2.actif.total_actif - d1.actif.total_actif;
        const diffRes = d2.pp.resultat_net - d1.pp.resultat_net;

        if (subActif) subActif.textContent = `vs ${compareYear1} (${formatCurrency(d1.actif.total_actif)} • ${diffActif >= 0 ? '+' : ''}${formatCurrency(diffActif)})`;
        if (subPassif) subPassif.textContent = `Écart vs ${compareYear1} : ${formatCurrency(d2.passif.capitaux_propres_total - d1.passif.capitaux_propres_total)}`;
        if (subResultat) subResultat.textContent = `vs ${compareYear1} (${formatCurrency(d1.pp.resultat_net)} • Écart: ${diffRes >= 0 ? '+' : ''}${formatCurrency(diffRes)})`;
    }
}

// -------------------------------------------------------------
// RENDU DE L'ACTIF
// -------------------------------------------------------------
function renderActifTable() {
    const thead = document.getElementById('actif-table-head');
    const tbody = document.getElementById('actif-tbody-comp');
    const tfoot = document.getElementById('actif-table-foot');
    const dataByYear = window.WATERGARDEN_DATA?.accounting_by_year;
    if (!tbody || !dataByYear) return;

    const isComp = comptaMode === 'comparatif';
    const y1 = compareYear1;
    const y2 = compareYear2;
    const sy = selectedSingleYear;

    const d1 = dataByYear[y1]?.actif;
    const d2 = dataByYear[y2]?.actif;
    const ds = dataByYear[sy]?.actif;

    // Header
    if (thead) {
        if (isComp) {
            thead.innerHTML = `
                <tr>
                    <th style="width: 125px; min-width: 125px; white-space: nowrap;">${typeof t === 'function' ? t('th_compte') : 'Compte'}</th>
                    <th style="padding-left: 1.25rem;">${typeof t === 'function' ? t('th_poste_intitule') : 'Poste & Intitulé Officiel'}</th>
                    <th class="text-right col-year" style="width: 125px;">${y1}</th>
                    <th class="text-right col-year" style="width: 125px;">${y2}</th>
                    <th class="text-right col-year" style="width: 110px;">${typeof t === 'function' ? t('th_ecart') : 'Écart'}</th>
                </tr>
            `;
        } else {
            thead.innerHTML = `
                <tr>
                    <th style="width: 125px; min-width: 125px; white-space: nowrap;">${typeof t === 'function' ? t('th_compte') : 'Compte'}</th>
                    <th style="padding-left: 1.25rem;">${typeof t === 'function' ? t('th_poste_intitule') : 'Poste & Intitulé Officiel'}</th>
                    <th class="text-right col-year" style="width: 160px;">${typeof t === 'function' ? t('th_exercice') : 'Exercice'} ${sy}</th>
                </tr>
            `;
        }
    }

    // Helper row generator
    const makeRow = (id, code, label, sublabel, val1, val2, valSingle, drillKey) => {
        if (isComp) {
            const diff = val2 - val1;
            const diffColor = diff > 0 ? '#34d399' : (diff < 0 ? '#f43f5e' : 'var(--text-muted)');
            return `
                <tr class="compta-interactive-row" id="row-${id}" onclick="toggleComptaDrilldown('${id}')" title="Cliquer pour afficher la composition">
                    <td style="white-space: nowrap; width: 125px; min-width: 125px; vertical-align: middle;">
                        <div style="display: inline-flex; align-items: center; gap: 0.45rem;">
                            <i class="fa-solid fa-chevron-right compta-chevron" id="chev-${id}"></i>
                            <code>${code}</code>
                        </div>
                    </td>
                    <td style="padding-left: 1.25rem;">
                        <strong>${label}</strong>
                        ${sublabel ? `<div style="font-size: 0.72rem; color: var(--text-muted);">${sublabel}</div>` : ''}
                    </td>
                    <td class="text-right col-year">${formatCurrency(val1)}</td>
                    <td class="text-right col-year text-emerald text-bold">${formatCurrency(val2)}</td>
                    <td class="text-right col-year" style="color: ${diffColor}; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${formatCurrency(diff)}</td>
                </tr>
                ${drillKey ? renderDrilldownRow(id, label, COMPTA_DRILLDOWN_DB[drillKey]) : ''}
            `;
        } else {
            return `
                <tr class="compta-interactive-row" id="row-${id}" onclick="toggleComptaDrilldown('${id}')" title="Cliquer pour afficher la composition">
                    <td style="white-space: nowrap; width: 125px; min-width: 125px; vertical-align: middle;">
                        <div style="display: inline-flex; align-items: center; gap: 0.45rem;">
                            <i class="fa-solid fa-chevron-right compta-chevron" id="chev-${id}"></i>
                            <code>${code}</code>
                        </div>
                    </td>
                    <td style="padding-left: 1.25rem;">
                        <strong>${label}</strong>
                        ${sublabel ? `<div style="font-size: 0.72rem; color: var(--text-muted);">${sublabel}</div>` : ''}
                    </td>
                    <td class="text-right col-year text-emerald text-bold">${formatCurrency(valSingle)}</td>
                </tr>
                ${drillKey ? renderDrilldownRow(id, label, COMPTA_DRILLDOWN_DB[drillKey]) : ''}
            `;
        }
    };

    // Body
    tbody.innerHTML = `
        ${makeRow('actif-frais-etab', '203', 'Frais d\'établissement & augmentation capital', 'VNC après amortissements cumulés', d1?.formation_expenses, d2?.formation_expenses, ds?.formation_expenses, 'actif_frais_etab')}

        <!-- Group C.III -->
        <tr style="background: rgba(16, 185, 129, 0.08); font-weight: 700;">
            <td colspan="2"><strong style="color: #34d399;">C.III. IMMOBILISATIONS FINANCIÈRES (ARCO IRIS)</strong></td>
            ${isComp ? `
                <td class="text-right col-year text-bold">${formatCurrency(d1?.financial_assets_total)}</td>
                <td class="text-right col-year text-emerald text-bold">${formatCurrency(d2?.financial_assets_total)}</td>
                <td class="text-right col-year text-muted">-</td>
            ` : `
                <td class="text-right col-year text-emerald text-bold">${formatCurrency(ds?.financial_assets_total)}</td>
            `}
        </tr>

        ${makeRow('actif-parts-arcoiris', '2310000', 'Parts dans entreprises liées : ARCO IRIS', 'Détention de 99,09% dans ArcoIris Ltda (Brésil) - Sombra SPA', d1?.financial_assets_parts, d2?.financial_assets_parts, ds?.financial_assets_parts, 'actif_parts_arcoiris')}
        ${makeRow('actif-prets-arcoiris', '2321000', 'Prêts & créances rattachées : ARCO IRIS (7%)', 'Prêts participatifs rémunérés à 7% annuel (BRL)', d1?.financial_assets_prets, d2?.financial_assets_prets, ds?.financial_assets_prets, 'actif_prets_arcoiris')}

        <!-- Group D. ACTIF CIRCULANT -->
        <tr style="background: rgba(2, 132, 199, 0.08); font-weight: 700;">
            <td colspan="2"><strong style="color: #38bdf8;">D. ACTIF CIRCULANT</strong></td>
            ${isComp ? `
                <td class="text-right col-year text-bold">${formatCurrency(d1?.current_assets_total)}</td>
                <td class="text-right col-year text-cyan text-bold">${formatCurrency(d2?.current_assets_total)}</td>
                <td class="text-right col-year" style="color: ${d2?.current_assets_total - d1?.current_assets_total >= 0 ? '#34d399' : '#f43f5e'}; font-weight: 700;">${formatCurrency(d2?.current_assets_total - d1?.current_assets_total)}</td>
            ` : `
                <td class="text-right col-year text-cyan text-bold">${formatCurrency(ds?.current_assets_total)}</td>
            `}
        </tr>

        <!-- Subgroup D.II Créances (Debtors) -->
        <tr style="background: rgba(2, 132, 199, 0.04); font-weight: 700;">
            <td colspan="2" style="padding-left: 14px;"><strong style="color: #0284c7;">D.II. CRÉANCES (DEBTORS)</strong></td>
            ${isComp ? `
                <td class="text-right col-year text-bold">${formatCurrency(d1?.creances_fiscales)}</td>
                <td class="text-right col-year text-cyan text-bold">${formatCurrency(d2?.creances_fiscales)}</td>
                <td class="text-right col-year" style="color: ${d2?.creances_fiscales - d1?.creances_fiscales >= 0 ? '#34d399' : '#f43f5e'}; font-weight: 700;">${formatCurrency(d2?.creances_fiscales - d1?.creances_fiscales)}</td>
            ` : `
                <td class="text-right col-year text-cyan text-bold">${formatCurrency(ds?.creances_fiscales)}</td>
            `}
        </tr>

        ${makeRow('actif-creances-ct', '41 / 421', 'a) dont la durée résiduelle est ≤ 1 an (Créances court terme)', 'Intérêts filiale rattachés aux associés (10 comptes 41112) + ACD IF (42143)', d1?.creances_court_terme, d2?.creances_court_terme, ds?.creances_court_terme, 'actif_creances_court_terme')}
        ${makeRow('actif-creances-lt', '42288', 'b) dont la durée résiduelle est > 1 an (Créances long terme)', 'Créance de prêt consenti à Franco Toscano (100.000 BRL)', d1?.creances_long_terme, d2?.creances_long_terme, ds?.creances_long_terme, 'actif_creances_long_terme')}

        <!-- Subgroup D.IV Avoirs en banques -->
        <tr style="background: rgba(2, 132, 199, 0.04); font-weight: 700;">
            <td colspan="2" style="padding-left: 14px;"><strong style="color: #0284c7;">D.IV. AVOIRS EN BANQUES ET EN CAISSE</strong></td>
            ${isComp ? `
                <td class="text-right col-year text-bold">${formatCurrency(d1?.banque)}</td>
                <td class="text-right col-year text-cyan text-bold">${formatCurrency(d2?.banque)}</td>
                <td class="text-right col-year" style="color: ${d2?.banque - d1?.banque >= 0 ? '#34d399' : '#f43f5e'}; font-weight: 700;">${formatCurrency(d2?.banque - d1?.banque)}</td>
            ` : `
                <td class="text-right col-year text-cyan text-bold">${formatCurrency(ds?.banque)}</td>
            `}
        </tr>

        ${makeRow('actif-banque-olky', '513', 'Avoirs en banques & comptes courants', 'Olky Pay Luxembourg EUR + Revolut Business EUR', d1?.banque, d2?.banque, ds?.banque, 'actif_banque_olky')}
    `;

    // Footer
    if (tfoot) {
        if (isComp) {
            const diffTot = d2?.total_actif - d1?.total_actif;
            tfoot.innerHTML = `
                <tr style="background: rgba(16, 185, 129, 0.15); font-weight: 800; font-size: 0.95rem;">
                    <td colspan="2">${typeof t === 'function' ? t('compta_total_general_actif') : 'TOTAL GÉNÉRAL ACTIF :'}</td>
                    <td class="text-right col-year">${formatCurrency(d1?.total_actif)}</td>
                    <td class="text-right col-year text-emerald">${formatCurrency(d2?.total_actif)}</td>
                    <td class="text-right col-year" style="color: ${diffTot >= 0 ? '#34d399' : '#f43f5e'}; font-family: 'JetBrains Mono', monospace;">${diffTot >= 0 ? '+' : ''}${formatCurrency(diffTot)}</td>
                </tr>
            `;
        } else {
            tfoot.innerHTML = `
                <tr style="background: rgba(16, 185, 129, 0.15); font-weight: 800; font-size: 0.95rem;">
                    <td colspan="2">${typeof t === 'function' ? t('compta_total_general_actif') : 'TOTAL GÉNÉRAL ACTIF :'} (${sy}) :</td>
                    <td class="text-right col-year text-emerald">${formatCurrency(ds?.total_actif)}</td>
                </tr>
            `;
        }
    }

    if (currentBilanLevel === 2) {
        toggleBilanSection('actif', true);
    }
}

// -------------------------------------------------------------
// RENDU DU PASSIF
// -------------------------------------------------------------
function renderPassifTable() {
    const thead = document.getElementById('passif-table-head');
    const tbody = document.getElementById('passif-tbody-comp');
    const tfoot = document.getElementById('passif-table-foot');
    const dataByYear = window.WATERGARDEN_DATA?.accounting_by_year;
    if (!tbody || !dataByYear) return;

    const isComp = comptaMode === 'comparatif';
    const y1 = compareYear1;
    const y2 = compareYear2;
    const sy = selectedSingleYear;

    const d1 = dataByYear[y1]?.passif;
    const d2 = dataByYear[y2]?.passif;
    const ds = dataByYear[sy]?.passif;

    // Header
    if (thead) {
        if (isComp) {
            thead.innerHTML = `
                <tr>
                    <th style="width: 125px; min-width: 125px; white-space: nowrap;">${typeof t === 'function' ? t('th_compte') : 'Compte'}</th>
                    <th style="padding-left: 1.25rem;">${typeof t === 'function' ? t('th_poste_intitule') : 'Poste & Intitulé Officiel'}</th>
                    <th class="text-right col-year" style="width: 125px;">${y1}</th>
                    <th class="text-right col-year" style="width: 125px;">${y2}</th>
                    <th class="text-right col-year" style="width: 110px;">${typeof t === 'function' ? t('th_ecart') : 'Écart'}</th>
                </tr>
            `;
        } else {
            thead.innerHTML = `
                <tr>
                    <th style="width: 125px; min-width: 125px; white-space: nowrap;">${typeof t === 'function' ? t('th_compte') : 'Compte'}</th>
                    <th style="padding-left: 1.25rem;">${typeof t === 'function' ? t('th_poste_intitule') : 'Poste & Intitulé Officiel'}</th>
                    <th class="text-right col-year" style="width: 160px;">${typeof t === 'function' ? t('th_exercice') : 'Exercice'} ${sy}</th>
                </tr>
            `;
        }
    }

    const makeRow = (id, code, label, sublabel, val1, val2, valSingle, drillKey) => {
        if (isComp) {
            const diff = val2 - val1;
            const diffColor = diff > 0 ? '#38bdf8' : (diff < 0 ? '#f43f5e' : 'var(--text-muted)');
            return `
                <tr class="compta-interactive-row" id="row-${id}" onclick="toggleComptaDrilldown('${id}')" title="Cliquer pour afficher la composition">
                    <td style="white-space: nowrap; width: 125px; min-width: 125px; vertical-align: middle;">
                        <div style="display: inline-flex; align-items: center; gap: 0.45rem;">
                            <i class="fa-solid fa-chevron-right compta-chevron" id="chev-${id}"></i>
                            <code>${code}</code>
                        </div>
                    </td>
                    <td style="padding-left: 1.25rem;">
                        <strong>${label}</strong>
                        ${sublabel ? `<div style="font-size: 0.72rem; color: var(--text-muted);">${sublabel}</div>` : ''}
                    </td>
                    <td class="text-right col-year">${formatCurrency(val1)}</td>
                    <td class="text-right col-year text-blue text-bold">${formatCurrency(val2)}</td>
                    <td class="text-right col-year" style="color: ${diffColor}; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${formatCurrency(diff)}</td>
                </tr>
                ${drillKey ? renderDrilldownRow(id, label, COMPTA_DRILLDOWN_DB[drillKey]) : ''}
            `;
        } else {
            return `
                <tr class="compta-interactive-row" id="row-${id}" onclick="toggleComptaDrilldown('${id}')" title="Cliquer pour afficher la composition">
                    <td style="white-space: nowrap; width: 125px; min-width: 125px; vertical-align: middle;">
                        <div style="display: inline-flex; align-items: center; gap: 0.45rem;">
                            <i class="fa-solid fa-chevron-right compta-chevron" id="chev-${id}"></i>
                            <code>${code}</code>
                        </div>
                    </td>
                    <td style="padding-left: 1.25rem;">
                        <strong>${label}</strong>
                        ${sublabel ? `<div style="font-size: 0.72rem; color: var(--text-muted);">${sublabel}</div>` : ''}
                    </td>
                    <td class="text-right col-year text-blue text-bold">${formatCurrency(valSingle)}</td>
                </tr>
                ${drillKey ? renderDrilldownRow(id, label, COMPTA_DRILLDOWN_DB[drillKey]) : ''}
            `;
        }
    };

    tbody.innerHTML = `
        <!-- Group A. Capitaux Propres -->
        <tr style="background: rgba(2, 132, 199, 0.08); font-weight: 700;">
            <td colspan="2"><strong style="color: #38bdf8;">A. CAPITAUX PROPRES & RÉSERVES</strong></td>
            ${isComp ? `
                <td class="text-right col-year text-bold">${formatCurrency(d1?.capitaux_propres_total)}</td>
                <td class="text-right col-year text-blue text-bold">${formatCurrency(d2?.capitaux_propres_total)}</td>
                <td class="text-right col-year" style="color: #38bdf8;">${formatCurrency(d2?.capitaux_propres_total - d1?.capitaux_propres_total)}</td>
            ` : `
                <td class="text-right col-year text-blue text-bold">${formatCurrency(ds?.capitaux_propres_total)}</td>
            `}
        </tr>

        ${makeRow('passif-capital-social', '101000', 'Capital souscrit (Classes A & B)', '2.171.320 actions à 2,00 €', d1?.capital_social, d2?.capital_social, ds?.capital_social, 'passif_capital_social')}
        ${makeRow('passif-prime-emission', '112000', 'Primes d\'émission & d\'apport', 'Prime d\'apport filiale ArcoIris et émission classe B', d1?.prime_emission, d2?.prime_emission, ds?.prime_emission, 'passif_prime_emission')}
        ${makeRow('passif-report-nouveau', '141000', 'Résultats reportés (Report à nouveau)', 'Report à nouveau des exercices antérieurs', d1?.report_nouveau, d2?.report_nouveau, ds?.report_nouveau, 'passif_report_nouveau')}
        ${makeRow('passif-resultat-net', '142000', 'Résultat net de l\'exercice', 'Résultat net certifié ou estimation YTD', d1?.resultat_net, d2?.resultat_net, ds?.resultat_net, 'passif_resultat_net')}

        <!-- Group C. DETTES (CREDITORS) -->
        <tr style="background: rgba(245, 158, 11, 0.08); font-weight: 700;">
            <td colspan="2"><strong style="color: #f59e0b;">C. DETTES (CREDITORS)</strong></td>
            ${isComp ? `
                <td class="text-right col-year text-bold">${formatCurrency(d1?.total_dettes)}</td>
                <td class="text-right col-year text-amber text-bold">${formatCurrency(d2?.total_dettes)}</td>
                <td class="text-right col-year" style="color: #f59e0b;">${formatCurrency(d2?.total_dettes - d1?.total_dettes)}</td>
            ` : `
                <td class="text-right col-year text-amber text-bold">${formatCurrency(ds?.total_dettes)}</td>
            `}
        </tr>

        <!-- Subgroup C. a) dont la durée résiduelle est <= 1 an -->
        <tr style="background: rgba(245, 158, 11, 0.04); font-weight: 700;">
            <td colspan="2" style="padding-left: 14px;"><strong style="color: #d97706;">a) dont la durée résiduelle est ≤ 1 an (Dettes à court terme)</strong></td>
            ${isComp ? `
                <td class="text-right col-year text-bold">${formatCurrency(d1?.dettes_court_terme_total)}</td>
                <td class="text-right col-year text-amber text-bold">${formatCurrency(d2?.dettes_court_terme_total)}</td>
                <td class="text-right col-year" style="color: #f59e0b;">${formatCurrency(d2?.dettes_court_terme_total - d1?.dettes_court_terme_total)}</td>
            ` : `
                <td class="text-right col-year text-amber text-bold">${formatCurrency(ds?.dettes_court_terme_total)}</td>
            `}
        </tr>

        ${makeRow('passif-fournisseurs', '44112', 'Dettes fournisseurs & factures à recevoir', 'ESSEDI Partners et révision comptable', d1?.dettes_fournisseurs, d2?.dettes_fournisseurs, ds?.dettes_fournisseurs, 'passif_fournisseurs')}
        ${makeRow('passif-arcoiris-ct', '45118', 'Dettes envers ArcoIris Ltda (court terme)', 'Compte courant d\'exploitation avec la filiale', d1?.dettes_arcoiris, d2?.dettes_arcoiris, ds?.dettes_arcoiris, 'passif_arcoiris_ct')}
        ${makeRow('passif-primes-associes', '45218', 'Dettes primes envers associés fondateurs & investisseurs', 'Primes statutaires échues (10 comptes associés 452180001 - 452180010)', d1?.dettes_primes_associes, d2?.dettes_primes_associes, ds?.dettes_primes_associes, 'passif_primes_associes')}
        ${makeRow('passif-dettes-fiscales', '46123', 'Dettes fiscales & impôt fortune', 'Provision Impôt sur la Fortune NWT (ACD Luxembourg)', d1?.dettes_fiscales, d2?.dettes_fiscales, ds?.dettes_fiscales, 'passif_dettes_fiscales')}
        ${makeRow('passif-administrateurs', '47130', 'Dettes envers administrateurs (Tubia & Sterzi)', 'Avances de frais et quote-part fusion LRD administrateurs', d1?.dettes_administrateurs, d2?.dettes_administrateurs, ds?.dettes_administrateurs, 'passif_avances_bloquees')}

        <!-- Subgroup C. b) dont la durée résiduelle est > 1 an -->
        <tr style="background: rgba(245, 158, 11, 0.04); font-weight: 700;">
            <td colspan="2" style="padding-left: 14px;"><strong style="color: #d97706;">b) dont la durée résiduelle est > 1 an (Dettes à plus d'un an)</strong></td>
            ${isComp ? `
                <td class="text-right col-year text-bold">${formatCurrency(d1?.dettes_long_terme)}</td>
                <td class="text-right col-year text-amber text-bold">${formatCurrency(d2?.dettes_long_terme)}</td>
                <td class="text-right col-year text-muted">-</td>
            ` : `
                <td class="text-right col-year text-amber text-bold">${formatCurrency(ds?.dettes_long_terme)}</td>
            `}
        </tr>

        ${makeRow('passif-emprunts-lt', '45222', 'Emprunts obligataires & avances fusion LRD (> 1 an)', 'Prêts consentis par les 11 associés fusion LRD / ArcoIris (23 sous-comptes)', d1?.dettes_long_terme, d2?.dettes_long_terme, ds?.dettes_long_terme, 'passif_dettes_fusion_lrd')}
    `;

    if (tfoot) {
        if (isComp) {
            const diffTot = d2?.total_passif - d1?.total_passif;
            tfoot.innerHTML = `
                <tr style="background: rgba(2, 132, 199, 0.15); font-weight: 800; font-size: 0.95rem;">
                    <td colspan="2">${typeof t === 'function' ? t('compta_total_general_passif') : 'TOTAL GÉNÉRAL PASSIF :'}</td>
                    <td class="text-right col-year">${formatCurrency(d1?.total_passif)}</td>
                    <td class="text-right col-year text-blue">${formatCurrency(d2?.total_passif)}</td>
                    <td class="text-right col-year" style="color: ${diffTot >= 0 ? '#38bdf8' : '#f43f5e'}; font-family: 'JetBrains Mono', monospace;">${diffTot >= 0 ? '+' : ''}${formatCurrency(diffTot)}</td>
                </tr>
            `;
        } else {
            tfoot.innerHTML = `
                <tr style="background: rgba(2, 132, 199, 0.15); font-weight: 800; font-size: 0.95rem;">
                    <td colspan="2">${typeof t === 'function' ? t('compta_total_general_passif') : 'TOTAL GÉNÉRAL PASSIF :'} (${sy}) :</td>
                    <td class="text-right col-year text-blue">${formatCurrency(ds?.total_passif)}</td>
                </tr>
            `;
        }
    }

    if (currentBilanLevel === 2) {
        toggleBilanSection('passif', true);
    }
}

// -------------------------------------------------------------
// RENDU DE PERTES & PROFITS (P&L) - SEZIONI CONTRAPPOSTE & PAREGGIO
// -------------------------------------------------------------
function buildPnLItemCard(item) {
    const drillItems = COMPTA_DRILLDOWN_DB[item.drillKey] || [];
    const isProd = item.isProd;
    const isComp = comptaMode === 'comparatif';

    const countLabel = drillItems.length > 0 
        ? `<span class="count-pill"><i class="fa-solid fa-${isProd ? 'file-invoice-dollar' : 'receipt'}"></i> ${drillItems.length} ${drillItems.length === 1 ? (isProd ? 'convenzione' : 'scrittura') : (isProd ? 'convenzioni' : 'scritture')}</span>`
        : '';

    let rightAmountHtml = '';
    if (isComp) {
        const diff = item.val2 - item.val1;
        let diffColor = '#34d399';
        let diffBg = 'rgba(16, 185, 129, 0.15)';
        if (isProd) {
            if (diff < 0) { diffColor = '#f43f5e'; diffBg = 'rgba(244, 63, 94, 0.15)'; }
        } else {
            if (diff > 0) { diffColor = '#f43f5e'; diffBg = 'rgba(244, 63, 94, 0.15)'; }
        }
        const diffSign = diff > 0 ? '+' : '';

        rightAmountHtml = `
            <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap; justify-content: flex-end;">
                <span style="font-size: 0.78rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">${compareYear1}: ${formatCurrency(item.val1)}</span>
                <span style="font-weight: 700; font-size: 0.88rem; font-family: 'JetBrains Mono', monospace; color: ${isProd ? '#34d399' : '#f43f5e'};">${compareYear2}: ${formatCurrency(item.val2)}</span>
                <span class="badge" style="background: ${diffBg}; color: ${diffColor}; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 700;">${diffSign}${formatCurrency(diff)}</span>
            </div>
        `;
    } else {
        rightAmountHtml = `
            <span style="font-weight: 700; font-size: 0.95rem; font-family: 'JetBrains Mono', monospace; color: ${isProd ? '#34d399' : '#f43f5e'};">${formatCurrency(item.valSingle)}</span>
        `;
    }

    // Drilldown table
    let drillTableHtml = '';
    if (drillItems.length > 0) {
        let ths = '';
        if (isComp) {
            ths = `
                <th class="text-right" style="width: 110px;">${compareYear1}</th>
                <th class="text-right" style="width: 110px;">${compareYear2}</th>
                <th class="text-right" style="width: 95px;">${typeof t === 'function' ? t('th_ecart') : 'Écart'}</th>
            `;
        } else {
            ths = `
                <th class="text-right" style="width: 130px;">${typeof t === 'function' ? t('th_exercice') : 'Exercice'} ${selectedSingleYear}</th>
            `;
        }

        const rows = drillItems.map(it => {
            const v1 = it[`val_${compareYear1}`] || 0;
            const v2 = it[`val_${compareYear2}`] || 0;
            const diff = v2 - v1;
            const vSingle = it[`val_${selectedSingleYear}`] || 0;

            let valTds = '';
            if (isComp) {
                let dColor = diff < 0 ? '#34d399' : (diff > 0 ? '#f43f5e' : 'inherit');
                if (isProd) {
                    dColor = diff > 0 ? '#34d399' : (diff < 0 ? '#f43f5e' : 'inherit');
                }
                valTds = `
                    <td class="text-right" style="font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;">${formatCurrency(v1)}</td>
                    <td class="text-right text-bold" style="font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: ${isProd ? '#34d399' : '#f43f5e'};">${formatCurrency(v2)}</td>
                    <td class="text-right" style="font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: ${dColor}; font-weight: 700;">${diff > 0 ? '+' : ''}${formatCurrency(diff)}</td>
                `;
            } else {
                valTds = `
                    <td class="text-right text-bold" style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: ${isProd ? '#34d399' : '#f43f5e'};">${formatCurrency(vSingle)}</td>
                `;
            }

            return `
                <tr>
                    <td style="white-space: nowrap;"><code>${it.ref || '-'}</code></td>
                    <td>
                        <div style="font-weight: 600; color: var(--text-main); font-size: 0.78rem;">${it.desc}</div>
                        ${it.note ? `<div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">${it.note}</div>` : ''}
                    </td>
                    <td style="color: var(--text-muted); font-size: 0.74rem; white-space: nowrap;">${it.tiers || '-'}</td>
                    ${valTds}
                </tr>
            `;
        }).join('');

        drillTableHtml = `
            <div style="overflow-x: auto;">
                <table class="compta-sub-table">
                    <thead>
                        <tr>
                            <th style="width: 75px;">PCN</th>
                            <th>${typeof t === 'function' ? t('compta_drill_intitule') : "Intitulé de l'écriture / Justificatif"}</th>
                            <th style="width: 150px;">${typeof t === 'function' ? t('compta_drill_tiers') : 'Tiers / Contrepartie'}</th>
                            ${ths}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        drillTableHtml = `<p style="color: var(--text-muted); font-size: 0.8rem; padding: 0.5rem 0;">Nessun dettaglio disponibile.</p>`;
    }

    return `
        <div class="pnl-accordion-group">
            <div class="pnl-interactive-row ${!isProd ? 'charge-row' : ''}" id="pnl-header-${item.id}" onclick="togglePnLItem('${item.id}')">
                <div style="display: flex; align-items: center; gap: 0.45rem; flex: 1; min-width: 0;">
                    <i class="fa-solid fa-chevron-right pnl-chevron" id="pnl-chev-${item.id}"></i>
                    <div style="min-width: 0;">
                        <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                            <strong style="color: var(--text-main); font-size: 0.88rem;">${item.code} - ${item.label}</strong>
                            ${countLabel}
                        </div>
                        <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 0.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.detail}</div>
                    </div>
                </div>
                ${rightAmountHtml}
            </div>
            <div class="pnl-detail-container" id="pnl-detail-${item.id}">
                ${drillTableHtml}
            </div>
        </div>
    `;
}

function togglePnLItem(itemId) {
    const header = document.getElementById(`pnl-header-${itemId}`);
    const detail = document.getElementById(`pnl-detail-${itemId}`);
    if (!header || !detail) return;

    const isExpanded = header.classList.contains('expanded');
    if (isExpanded) {
        header.classList.remove('expanded');
        detail.classList.remove('expanded');
    } else {
        header.classList.add('expanded');
        detail.classList.add('expanded');
    }
}

function toggleAllPnLSection(containerId, expand) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const groups = container.querySelectorAll('.pnl-accordion-group');
    groups.forEach(g => {
        const header = g.querySelector('.pnl-interactive-row');
        const detail = g.querySelector('.pnl-detail-container');
        if (header && detail) {
            if (expand) {
                header.classList.add('expanded');
                detail.classList.add('expanded');
            } else {
                header.classList.remove('expanded');
                detail.classList.remove('expanded');
            }
        }
    });
}

let currentPnLLevel = 1;

function setPnLLevel(level, btn) {
    currentPnLLevel = level;
    document.querySelectorAll('#btn-pnl-level-1, #btn-pnl-level-2').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    } else {
        const targetBtn = document.getElementById(`btn-pnl-level-${level}`);
        if (targetBtn) targetBtn.classList.add('active');
    }
    toggleAllPnLSection('pnl-produits-container', level === 2);
    toggleAllPnLSection('pnl-charges-container', level === 2);
}

window.togglePnLItem = togglePnLItem;
window.toggleAllPnLSection = toggleAllPnLSection;
window.setPnLLevel = setPnLLevel;

function renderPPTable() {
    const produitsContainer = document.getElementById('pnl-produits-container');
    const chargesContainer = document.getElementById('pnl-charges-container');
    const totProdEl = document.getElementById('total-produits-val');
    const totChgEl = document.getElementById('total-charges-val');
    const netResultEl = document.getElementById('pnl-net-result-val');
    const netResultTitleEl = document.getElementById('pnl-net-result-title');
    const netResultSubEl = document.getElementById('pnl-net-result-sub');
    const netResultDetailEl = document.getElementById('pnl-net-result-detail');
    const pareggioBadgeEl = document.getElementById('pnl-pareggio-badge');

    const dataByYear = window.WATERGARDEN_DATA?.accounting_by_year;
    if (!produitsContainer || !chargesContainer || !dataByYear) return;

    const isComp = comptaMode === 'comparatif';
    const y1 = compareYear1;
    const y2 = compareYear2;
    const sy = selectedSingleYear;

    const d1 = dataByYear[y1]?.pp;
    const d2 = dataByYear[y2]?.pp;
    const ds = dataByYear[sy]?.pp;

    const produitsList = [
        {
            id: "pp-produits-fin",
            code: "755",
            label: "Produits financiers : Intérêts perçus sur prêts filiale (7%)",
            detail: "Convention 7% prêts participatifs ArcoIris Ltda (BRL 2.7M)",
            drillKey: "pp_produits_financiers",
            val1: Math.abs(d1?.produits_financiers || 0),
            val2: Math.abs(d2?.produits_financiers || 0),
            valSingle: Math.abs(ds?.produits_financiers || 0),
            isProd: true
        }
    ];

    const chargesList = [
        {
            id: "pp-charges-ext",
            code: "61",
            label: "Autres charges externes (frais bancaires, fiduciaire, siège)",
            detail: "Domiciliation ESSEDI, frais bancaires Olky/Revolut, fiduciaire eCDF, cotisations CC & RCSL",
            drillKey: "pp_charges_externes",
            val1: Math.abs(d1?.charges_externes || 0),
            val2: Math.abs(d2?.charges_externes || 0),
            valSingle: Math.abs(ds?.charges_externes || 0),
            isProd: false
        },
        {
            id: "pp-amortissements",
            code: "631",
            label: "Dotations aux amortissements sur frais d'établissement",
            detail: "Dotation annuelle linéaire sur 5 ans (PCN eCDF)",
            drillKey: "pp_amortissements",
            val1: Math.abs(d1?.amortissements || 0),
            val2: Math.abs(d2?.amortissements || 0),
            valSingle: Math.abs(ds?.amortissements || 0),
            isProd: false
        },
        {
            id: "pp-other-operating",
            code: "6481",
            label: "Autres charges d'exploitation (Amendes, sanctions et pénalités)",
            detail: "Amendes, sanctions et intérêts de retard fiscaux ACD (Poste 8 eCDF)",
            drillKey: "pp_other_operating",
            val1: Math.abs(d1?.other_operating_expenses || 0),
            val2: Math.abs(d2?.other_operating_expenses || 0),
            valSingle: Math.abs(ds?.other_operating_expenses || 0),
            isProd: false
        },
        {
            id: "pp-charges-fin",
            code: "655",
            label: "Charges financières : Intérêts servis sur emprunts associés",
            detail: "Primes statutaires 70% sur prêts filiale (détail par associé LOAN OUT)",
            drillKey: "pp_charges_financieres",
            val1: Math.abs(d1?.charges_financieres || 0),
            val2: Math.abs(d2?.charges_financieres || 0),
            valSingle: Math.abs(ds?.charges_financieres || 0),
            isProd: false
        },
        {
            id: "pp-impots",
            code: "681",
            label: "Impôts sur la fortune (Net Wealth Tax / IF)",
            detail: "Impôt sur la Fortune annuel forfaitaire SOPARFI (ACD Luxembourg)",
            drillKey: "pp_impots",
            val1: Math.abs(d1?.impots || 0),
            val2: Math.abs(d2?.impots || 0),
            valSingle: Math.abs(ds?.impots || 0),
            isProd: false
        }
    ];

    // Render cards
    produitsContainer.innerHTML = produitsList.map(p => buildPnLItemCard(p)).join('');
    chargesContainer.innerHTML = chargesList.map(c => buildPnLItemCard(c)).join('');

    // Totals
    const totProdSingle = produitsList.reduce((acc, p) => acc + p.valSingle, 0);
    const totChgSingle = chargesList.reduce((acc, c) => acc + c.valSingle, 0);
    const netResultSingle = totProdSingle - totChgSingle;

    const totProd1 = produitsList.reduce((acc, p) => acc + p.val1, 0);
    const totProd2 = produitsList.reduce((acc, p) => acc + p.val2, 0);
    const diffProd = totProd2 - totProd1;

    const totChg1 = chargesList.reduce((acc, c) => acc + c.val1, 0);
    const totChg2 = chargesList.reduce((acc, c) => acc + c.val2, 0);
    const diffChg = totChg2 - totChg1;

    const netResult1 = totProd1 - totChg1;
    const netResult2 = totProd2 - totChg2;
    const diffNet = netResult2 - netResult1;

    if (isComp) {
        if (totProdEl) {
            totProdEl.innerHTML = `
                <span style="font-size: 0.85rem; color: var(--text-muted); margin-right: 0.4rem;">${y1}: ${formatCurrency(totProd1)}</span>
                <span style="color: #34d399; font-weight: 800;">${y2}: ${formatCurrency(totProd2)}</span>
                <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.72rem; margin-left: 0.4rem;">${diffProd >= 0 ? '+' : ''}${formatCurrency(diffProd)}</span>
            `;
        }
        if (totChgEl) {
            totChgEl.innerHTML = `
                <span style="font-size: 0.85rem; color: var(--text-muted); margin-right: 0.4rem;">${y1}: ${formatCurrency(totChg1)}</span>
                <span style="color: #f43f5e; font-weight: 800;">${y2}: ${formatCurrency(totChg2)}</span>
                <span class="badge" style="background: ${diffChg <= 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)'}; color: ${diffChg <= 0 ? '#34d399' : '#f43f5e'}; font-size: 0.72rem; margin-left: 0.4rem;">${diffChg >= 0 ? '+' : ''}${formatCurrency(diffChg)}</span>
            `;
        }

        if (netResultTitleEl) {
            netResultTitleEl.textContent = `RÉSULTAT NET COMPTABLE COMPARATIF (${y1} vs ${y2})`;
        }
        if (pareggioBadgeEl) {
            pareggioBadgeEl.innerHTML = `<i class="fa-solid fa-scale-balanced"></i> PAREGGIO QUADRATO (0,00 €)`;
        }
        if (netResultSubEl) {
            netResultSubEl.innerHTML = `Quadratura a pareggio verificata su entrambi gli esercizi: [${y1}: Charges ${formatCurrency(totChg1)} + Résultat ${formatCurrency(netResult1)} = ${formatCurrency(totProd1)}] • [${y2}: Charges ${formatCurrency(totChg2)} + Résultat ${formatCurrency(netResult2)} = ${formatCurrency(totProd2)}]`;
        }
        if (netResultEl) {
            netResultEl.innerHTML = `
                <div style="display: flex; gap: 1.25rem; align-items: baseline; justify-content: flex-end; flex-wrap: wrap;">
                    <div>
                        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${y1}</span>
                        <span style="font-size: 1.2rem; font-weight: 700; color: ${netResult1 >= 0 ? '#10b981' : '#f43f5e'}; font-family: 'JetBrains Mono', monospace;">${formatCurrency(netResult1)}</span>
                    </div>
                    <div>
                        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${y2}</span>
                        <span style="font-size: 1.65rem; font-weight: 800; color: ${netResult2 >= 0 ? '#10b981' : '#f43f5e'}; font-family: 'JetBrains Mono', monospace;">${formatCurrency(netResult2)}</span>
                    </div>
                    <div>
                        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">Variation</span>
                        <span style="font-size: 1.2rem; font-weight: 700; color: ${diffNet >= 0 ? '#10b981' : '#f43f5e'}; font-family: 'JetBrains Mono', monospace;">${diffNet >= 0 ? '+' : ''}${formatCurrency(diffNet)}</span>
                    </div>
                </div>
            `;
        }
        if (netResultDetailEl) {
            netResultDetailEl.textContent = `Écart de variation nette: ${diffNet >= 0 ? '+' : ''}${formatCurrency(diffNet)} • Solde de pareggio: 0,00 €`;
        }

    } else {
        if (totProdEl) totProdEl.textContent = formatCurrency(totProdSingle);
        if (totChgEl) totChgEl.textContent = formatCurrency(totChgSingle);

        if (netResultTitleEl) {
            netResultTitleEl.textContent = `${typeof t === 'function' ? t('net_accounting_result') : 'RÉSULTAT NET COMPTABLE DE L\'EXERCICE'} (${sy})`;
        }
        if (pareggioBadgeEl) {
            pareggioBadgeEl.innerHTML = `<i class="fa-solid fa-scale-balanced"></i> ${typeof t === 'function' ? t('badge_pareggiato') : 'PAREGGIATO'} (0,00 €)`;
        }
        if (netResultSubEl) {
            netResultSubEl.innerHTML = `Solde Produits (${formatCurrency(totProdSingle)}) moins Charges (${formatCurrency(totChgSingle)}) • Pareggio: Charges (${formatCurrency(totChgSingle)}) + Résultat Net (${formatCurrency(netResultSingle)}) = Produits (${formatCurrency(totProdSingle)})`;
        }
        if (netResultEl) {
            netResultEl.textContent = formatCurrency(netResultSingle);
            netResultEl.style.color = netResultSingle >= 0 ? '#10b981' : '#f43f5e';
        }
        if (netResultDetailEl) {
            netResultDetailEl.textContent = `${netResultSingle >= 0 ? 'Bénéfice Net Comptable' : 'Perte Nette Comptable'} • Écart de quadratura: 0,00 € (Pareggio 100%)`;
        }
    }

    if (currentPnLLevel === 2) {
        toggleAllPnLSection('pnl-produits-container', true);
        toggleAllPnLSection('pnl-charges-container', true);
    }
}

// -------------------------------------------------------------
// RENDU DE LA BALANCE DES COMPTES
// -------------------------------------------------------------
function renderBalanceTable() {
    const thead = document.getElementById('balance-table-head');
    const tbody = document.getElementById('balance-tbody-comp');
    const dataByYear = window.WATERGARDEN_DATA?.accounting_by_year;
    if (!tbody || !dataByYear) return;

    const isComp = comptaMode === 'comparatif';
    const y1 = compareYear1;
    const y2 = compareYear2;
    const sy = selectedSingleYear;

    if (thead) {
        if (isComp) {
            thead.innerHTML = `
                <tr>
                    <th style="width: 135px; min-width: 135px; white-space: nowrap;">${typeof t === 'function' ? t('th_num_compte') : 'N° Compte'}</th>
                    <th style="padding-left: 1.25rem;">${typeof t === 'function' ? t('th_intitule_compte') : 'Intitulé du Compte PCN'}</th>
                    <th class="text-right col-year" style="width: 130px;">Solde ${y1}</th>
                    <th class="text-right col-year" style="width: 130px;">Solde ${y2}</th>
                    <th class="text-right col-year" style="width: 110px;">${typeof t === 'function' ? t('th_ecart') : 'Variation'}</th>
                </tr>
            `;
        } else {
            thead.innerHTML = `
                <tr>
                    <th style="width: 135px; min-width: 135px; white-space: nowrap;">${typeof t === 'function' ? t('th_num_compte') : 'N° Compte'}</th>
                    <th style="padding-left: 1.25rem;">${typeof t === 'function' ? t('th_intitule_compte') : 'Intitulé du Compte PCN'}</th>
                    <th class="text-right col-year" style="width: 150px;">${typeof t === 'function' ? t('th_solde_debiteur') : 'Solde Débiteur'}</th>
                    <th class="text-right col-year" style="width: 150px;">${typeof t === 'function' ? t('th_solde_crediteur') : 'Solde Créditeur'}</th>
                </tr>
            `;
        }
    }

    const accounts = [
        { id: "bal-101000", code: "101000", label: "Capital social souscrit (Actions Classes A et B)", drill: "bal_101000", type: "credit", val_2024: 4342640.00, val_2025: 4342640.00, val_2026: 4342640.00 },
        { id: "bal-112000", code: "112000", label: "Prime d'émission et d'apport (Share Premium)", drill: "bal_112000", type: "credit", val_2024: 1144389.88, val_2025: 1144389.88, val_2026: 1144389.88 },
        { id: "bal-141000", code: "141000", label: "Report à nouveau débiteur (Pertes nettes cumulées antérieures)", drill: "bal_141000", type: "debit", val_2024: 87384.44, val_2025: 149786.10, val_2026: 153506.61 },
        { id: "bal-201000", code: "201000", label: "Frais d'établissement nets (Constitution & amortissements)", drill: "bal_201000", type: "debit", val_2024: 4058.78, val_2025: 2339.75, val_2026: 620.72 },
        { id: "bal-2310000", code: "2310000", label: "Immobilisations financières : Parts dans ArcoIris Ltda (99,09%)", drill: "bal_2310000", type: "debit", val_2024: 5657646.49, val_2025: 5657646.49, val_2026: 5657646.49 },
        { id: "bal-2321000", code: "2321000", label: "Prêts participatifs rattachés : ArcoIris 7% (2.7M BRL)", drill: "bal_2321000", type: "debit", val_2024: 548306.88, val_2025: 548306.88, val_2026: 548306.88 },
        { id: "bal-411100", code: "41 / 42", label: "Créances : Intérêts courus filiale rattachés aux associés & tiers", drill: "bal_411100", type: "debit", val_2024: 157586.23, val_2025: 193366.28, val_2026: 195773.78 },
        { id: "bal-421100", code: "421100", label: "Dettes envers administrateurs et dirigeants", drill: "bal_421100", type: "credit", val_2024: 133280.11, val_2025: 133280.11, val_2026: 133280.11 },
        { id: "bal-421300", code: "421300", label: "Dettes pour primes statutaires associées (Droits préférentiels)", drill: "bal_421300", type: "credit", val_2024: 85008.00, val_2025: 110054.03, val_2026: 110054.03 },
        { id: "bal-45222", code: "45222", label: "Dettes à long terme envers associés (Fusion LRD & Prêts)", drill: "bal_45222", type: "credit", val_2024: 774676.31, val_2025: 774676.31, val_2026: 774676.31 },
        { id: "bal-5131000", code: "5131000", label: "Avoirs en banques : Olky Pay EUR + Revolut Business EUR", drill: "bal_5131000", type: "debit", val_2024: 31888.53, val_2025: 19156.88, val_2026: 12093.22 }
    ];

    tbody.innerHTML = accounts.map(acc => {
        if (isComp) {
            const v1 = acc[`val_${y1}`] || 0;
            const v2 = acc[`val_${y2}`] || 0;
            const diff = v2 - v1;
            return `
                <tr class="compta-interactive-row" id="row-${acc.id}" onclick="toggleComptaDrilldown('${acc.id}')" title="Cliquer pour afficher la composition">
                    <td style="white-space: nowrap; width: 135px; min-width: 135px; vertical-align: middle;">
                        <div style="display: inline-flex; align-items: center; gap: 0.45rem;">
                            <i class="fa-solid fa-chevron-right compta-chevron" id="chev-${acc.id}"></i>
                            <code>${acc.code}</code>
                        </div>
                    </td>
                    <td style="padding-left: 1.25rem;">${acc.label}</td>
                    <td class="text-right col-year">${formatCurrency(v1)}</td>
                    <td class="text-right col-year text-bold text-cyan">${formatCurrency(v2)}</td>
                    <td class="text-right col-year" style="color: ${diff === 0 ? 'var(--text-muted)' : (diff > 0 ? '#34d399' : '#f43f5e')}; font-family: 'JetBrains Mono', monospace; font-weight: 700;">${formatCurrency(diff)}</td>
                </tr>
                ${renderDrilldownRow(acc.id, acc.label, COMPTA_DRILLDOWN_DB[acc.drill])}
            `;
        } else {
            const val = acc[`val_${sy}`] || 0;
            const isDebit = acc.type === 'debit';
            return `
                <tr class="compta-interactive-row" id="row-${acc.id}" onclick="toggleComptaDrilldown('${acc.id}')" title="Cliquer pour afficher la composition">
                    <td style="white-space: nowrap; width: 135px; min-width: 135px; vertical-align: middle;">
                        <div style="display: inline-flex; align-items: center; gap: 0.45rem;">
                            <i class="fa-solid fa-chevron-right compta-chevron" id="chev-${acc.id}"></i>
                            <code>${acc.code}</code>
                        </div>
                    </td>
                    <td style="padding-left: 1.25rem;">${acc.label}</td>
                    <td class="text-right col-year ${isDebit ? 'text-cyan text-bold' : ''}">${isDebit ? formatCurrency(val) : '-'}</td>
                    <td class="text-right col-year ${!isDebit ? 'text-rose text-bold' : ''}">${!isDebit ? formatCurrency(val) : '-'}</td>
                </tr>
                ${renderDrilldownRow(acc.id, acc.label, COMPTA_DRILLDOWN_DB[acc.drill])}
            `;
        }
    }).join('');
}

// -------------------------------------------------------------
// RENDU GLOBAL DES VUES
// -------------------------------------------------------------
function renderAllComptaViews() {
    updateComptaKPIs();
    renderActifTable();
    renderPassifTable();
    renderPPTable();
    renderBalanceTable();
}

function switchComptaTab(tabKey, btn) {
    currentActiveComptaTab = tabKey;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.compta-tab-content').forEach(c => c.style.display = 'none');
    const target = document.getElementById(`tab-${tabKey}`);
    if (target) target.style.display = 'block';
}

function toggleTheme() {
    document.body.classList.toggle('theme-light');
    const isLight = document.body.classList.contains('theme-light');
    localStorage.setItem('wg_theme', isLight ? 'light' : 'dark');
}

function initComptaApp() {
    if (localStorage.getItem('wg_theme') === 'light') {
        document.body.classList.add('theme-light');
    }
    renderAllComptaViews();
}

document.addEventListener('DOMContentLoaded', () => {
    initComptaApp();
});

window.addEventListener('wg:languageChanged', () => {
    renderAllComptaViews();
});
