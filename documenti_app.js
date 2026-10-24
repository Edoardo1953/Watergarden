/**
 * Watergarden Management Sàrl - Document & Archive Management
 * Rubriche: Bilanci, Statuti, Certificati
 * Azioni: Visualizza (occhio), Download (scarica), Modifica (matita), Cancella (cestino)
 */

const DEFAULT_DOCUMENTS = [
    // RUBRICA: BILANCI
    {
        id: "DOC-BIL-01",
        title: "watergarden - DEF 2025.pdf",
        category: "Bilanci",
        description: "Liasse Fiscale eCDF Déposée Complète - Comptes Annuels 2025 (19 pages certifiées)",
        date: "11/05/2026",
        reference: "eCDF-2025-WG-8910",
        file_path: "uploads/Documenti/Bilans Watergarden/2025/watergarden - DEF 2025.pdf",
        file_type: "pdf",
        file_size: "540 KB",
        status: "Déposé RCSL",
        status_color: "emerald"
    },
    {
        id: "DOC-BIL-02",
        title: "Financial statements 2025-12-31 v2026-05-11.pdf",
        category: "Bilanci",
        description: "Bilan, Compte de Pertes & Profits et Annexes au 31 décembre 2025",
        date: "11/05/2026",
        reference: "FS-2025-AUD",
        file_path: "uploads/Documenti/Bilans Watergarden/2025/WATER GARDEN MANAGEMENT S%C3%A0rl - Financial statements 2025-12-31 v2026-05-11.pdf",
        file_type: "pdf",
        file_size: "312 KB",
        status: "Certifié",
        status_color: "emerald"
    },
    {
        id: "DOC-BIL-03",
        title: "watergarden - DEF 2024.pdf",
        category: "Bilanci",
        description: "Liasse Fiscale eCDF Déposée 2024 - Bilan & Pertes et Profits officiels",
        date: "26/05/2025",
        reference: "eCDF-2024-WG-4122",
        file_path: "uploads/Documenti/Bilans Watergarden/2024/watergarden - DEF 2024.pdf",
        file_type: "pdf",
        file_size: "480 KB",
        status: "Déposé RCSL",
        status_color: "emerald"
    },
    {
        id: "DOC-BIL-04",
        title: "watergarden - balance sheet 2024-12-31.pdf",
        category: "Bilanci",
        description: "Bilan Financier Synthétique PCN au 31/12/2024",
        date: "26/05/2025",
        reference: "BS-2024-SYNT",
        file_path: "uploads/Documenti/Bilans Watergarden/2024/watergarden - balance sheet 2024-12-31 v2025-05-26.pdf",
        file_type: "pdf",
        file_size: "220 KB",
        status: "Archivé",
        status_color: "blue"
    },
    {
        id: "DOC-BIL-ARCOIRIS-PDF",
        title: "Balancete 2025 - Arco Iris.pdf",
        category: "Bilanci",
        description: "Balanço Patrimonial & Balancete de Verificação 2025 - Arco Iris Ltda (10 pages certifiées, CNPJ 06.036.746/0001-31)",
        date: "12/05/2026",
        reference: "BAL-2025-ARCOIRIS-PDF",
        file_path: "uploads/Documenti/Bilans Arcoiris R$/2025/Balancete 2025 - Arco Iris.pdf",
        file_type: "pdf",
        file_size: "518 KB",
        status: "Officiel Filiale",
        status_color: "emerald"
    },
    {
        id: "DOC-BIL-ARCOIRIS-XLS",
        title: "Balancete 2025 - Arco Iris.xls",
        category: "Bilanci",
        description: "Grand Livre Analytique & Balancete de Verificação Excel 2025 - Arco Iris Ltda",
        date: "12/05/2026",
        reference: "BAL-2025-ARCOIRIS-XLS",
        file_path: "uploads/Documenti/Bilans Arcoiris R$/2025/Balancete 2025 - Arco Iris.xls",
        file_type: "excel",
        file_size: "234 KB",
        status: "Officiel Filiale",
        status_color: "blue"
    },
    {
        id: "DOC-BIL-AMMORT-XLS",
        title: "watergarden - accounting files 2025.xlsx",
        category: "Bilanci",
        description: "Fichier comptable de travail et tableau d'amortissement détaillé 2025 (Frais d'établissement)",
        date: "11/05/2026",
        reference: "WG-ACC-FILES-2025",
        file_path: "uploads/Documenti/Bilans Watergarden/2025/watergarden - accounting files 2025.xlsx",
        file_type: "excel",
        file_size: "35 KB",
        status: "Travail / Support",
        status_color: "emerald"
    },

    // RUBRICA: STATUTI
    {
        id: "DOC-STAT-2022",
        title: "Watergarden - Statuts Coordonnés au 09.12.2022.pdf",
        category: "Statuti",
        description: "Statuts coordonnés au 09/12/2022 - Résolutions AGE, refonte statutaire et gouvernance Watergarden (RCSL B 149.151)",
        date: "09/12/2022",
        reference: "STAT-COORD-2022-12",
        file_path: "uploads/Statuti/Watergarden - Statuts Coordonnés au 09.12.2022.pdf",
        file_type: "pdf",
        file_size: "121 KB",
        status: "Statuts 2022",
        status_color: "emerald",
        entity: "watergarden"
    },
    {
        id: "DOC-STAT-2018",
        title: "Watergarden - Statuts Coordonnés au 06.07.2018.pdf",
        category: "Statuti",
        description: "Statuts coordonnés au 06/07/2018 - Augmentation de capital et restructuration des parts sociales (RCS B 149.151)",
        date: "06/07/2018",
        reference: "STAT-COORD-2018-07",
        file_path: "uploads/Statuti/Watergarden - Statuts Coordonnés au 06.07.2018.pdf",
        file_type: "pdf",
        file_size: "135 KB",
        status: "Statuts 2018",
        status_color: "blue",
        entity: "watergarden"
    },
    {
        id: "DOC-STAT-01",
        title: "NEW Shareholders Watergarden-Arcoiris 05.2026.xlsx",
        category: "Statuti",
        description: "Registre Général des Actionnaires (Classes A & B) et Quotas ArcoIris Ltda Brésil",
        date: "12/05/2026",
        reference: "REG-ACT-2026-05",
        file_path: "uploads/NEW Shareholders Watergarden-Arcoiris 05.2026.xlsx",
        file_type: "excel",
        file_size: "185 KB",
        status: "Officiel / À jour",
        status_color: "emerald",
        entity: "watergarden"
    },
    {
        id: "DOC-STAT-02",
        title: "Statuts Coordonnés Watergarden Management Sàrl.pdf",
        category: "Statuti",
        description: "Statuts coordonnés de la société suite aux augmentations de capital (Classes A & B)",
        date: "15/03/2020",
        reference: "STAT-COORD-B149151",
        file_path: "uploads/Statuti/Watergarden - Statuts Coordonnés au 09.12.2022.pdf",
        file_type: "pdf",
        file_size: "121 KB",
        status: "Publié RESA",
        status_color: "blue",
        entity: "watergarden"
    },
    {
        id: "DOC-STAT-03",
        title: "Acte Notarié de Constitution - Mémorial C N° 2430",
        category: "Statuti",
        description: "Acte notarié constitutif initial de la société sous forme de Sàrl (RCS B 149.151)",
        date: "24/11/2009",
        reference: "MEM-C-2009-2430",
        file_path: "uploads/Documenti/RCS - RBE/RCS - Watergarden 05.2026.pdf",
        file_type: "pdf",
        file_size: "640 KB",
        status: "Historique",
        status_color: "neutral",
        entity: "watergarden"
    },

    // RUBRICA: CERTIFICATI
    {
        id: "DOC-CERT-01",
        title: "RCS - Watergarden 05.2026.pdf",
        category: "Certificati",
        description: "Extrait Officiel d'Immatriculation RCS Luxembourg (RCSL B 149.151, Siège 26, Bd Royal)",
        date: "06/05/2026",
        reference: "RCS-LUX-2026-05-B149151",
        file_path: "uploads/Documenti/RCS - RBE/RCS - Watergarden 05.2026.pdf",
        file_type: "pdf",
        file_size: "640 KB",
        status: "Certifié RCSL",
        status_color: "emerald"
    },
    {
        id: "DOC-CERT-02",
        title: "RBE - Watergarden 05.2026.pdf",
        category: "Certificati",
        description: "Déclaration Officielle Registre des Bénéficiaires Effectifs (RBE Luxembourg)",
        date: "06/05/2026",
        reference: "RBE-LUX-2026-05-984",
        file_path: "uploads/Documenti/RCS - RBE/RBE - Watergarden 05.2026.pdf",
        file_type: "pdf",
        file_size: "280 KB",
        status: "Conforme LBR",
        status_color: "emerald"
    },
    {
        id: "DOC-CERT-03",
        title: "Certidão Imobiliária Matrícula 12.485 Sombra SPA",
        category: "Certificati",
        description: "Pleine propriété foncière 14.500 m² (Cartório de Registro de Imóveis de Tibau do Sul - RN)",
        date: "14/01/2025",
        reference: "MATR-12485-RN",
        file_path: "uploads/NEW Shareholders Watergarden-Arcoiris 05.2026.xlsx",
        file_type: "pdf",
        file_size: "185 KB",
        status: "Titre Définitif",
        status_color: "emerald"
    },
    {
        id: "DOC-CERT-04",
        title: "Licença Ambiental de Operação IDEMA N° 2024/098-RN",
        category: "Certificati",
        description: "Autorisation environnementale d'exploitation hôtelière de luxe Sombra SPA",
        date: "12/04/2024",
        reference: "IDEMA-LO-2024-098",
        file_path: "uploads/Documenti/RCS - RBE/RCS - Watergarden 05.2026.pdf",
        file_type: "pdf",
        file_size: "640 KB",
        status: "Valide",
        status_color: "emerald"
    },
    {
        id: "DOC-CERT-05",
        title: "Déclaration Bacen RDE-IED N° 2026/BR-984210",
        category: "Certificati",
        description: "Registro Declaratório Eletrônico de Investimento Estrangeiro Direto (Banco Central do Brasil)",
        date: "28/02/2026",
        reference: "BACEN-RDE-984210",
        file_path: "uploads/NEW Shareholders Watergarden-Arcoiris 05.2026.xlsx",
        file_type: "pdf",
        file_size: "185 KB",
        status: "Enregistré",
        status_color: "blue"
    },
    // RUBRICA: ESTRATTI BANCARI (2025 - 2026 & EXCEL)
    {
        id: "DOC-BNK-XLS",
        title: "Estratti bancari.xlsx",
        category: "Estratti Bancari",
        description: "Grand Livre Général Bancaire Olky Pay & Revolut (2021 à 2026 - 195 écritures)",
        date: "17/10/2026",
        reference: "GL-BNK-2021-2026",
        file_path: "uploads/Documenti/Estratti Banche/Estratti bancari.xlsx",
        file_type: "excel",
        file_size: "27 KB",
        status: "Complet 100%",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-01",
        title: "02000003393_2025-01-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Janvier 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/01/2025",
        reference: "OLK-2025-01",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-01-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-02",
        title: "02000003393_2025-02-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Février 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/02/2025",
        reference: "OLK-2025-02",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-02-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-03",
        title: "02000003393_2025-03-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Mars 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/03/2025",
        reference: "OLK-2025-03",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-03-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-04",
        title: "02000003393_2025-04-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Avril 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/04/2025",
        reference: "OLK-2025-04",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-04-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-05",
        title: "02000003393_2025-05-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Mai 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/05/2025",
        reference: "OLK-2025-05",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-05-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-06",
        title: "02000003393_2025-06-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Juin 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/06/2025",
        reference: "OLK-2025-06",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-06-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-07",
        title: "02000003393_2025-07-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Juillet 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/07/2025",
        reference: "OLK-2025-07",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-07-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-08",
        title: "02000003393_2025-08-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Août 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/08/2025",
        reference: "OLK-2025-08",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-08-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-09",
        title: "02000003393_2025-09-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Septembre 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/09/2025",
        reference: "OLK-2025-09",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-09-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-10",
        title: "02000003393_2025-10-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Octobre 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/10/2025",
        reference: "OLK-2025-10",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-10-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-11",
        title: "02000003393_2025-11-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Novembre 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/11/2025",
        reference: "OLK-2025-11",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-11-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK25-12",
        title: "02000003393_2025-12-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Décembre 2025 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/12/2025",
        reference: "OLK-2025-12",
        file_path: "uploads/Documenti/Estratti Banche/2025 OlkyPay/02000003393_2025-12-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK26-01",
        title: "02000003393_2026-01-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Janvier 2026 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/01/2026",
        reference: "OLK-2026-01",
        file_path: "uploads/Documenti/Estratti Banche/2026 OlkyPay/02000003393_2026-01-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK26-02",
        title: "02000003393_2026-02-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Février 2026 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/02/2026",
        reference: "OLK-2026-02",
        file_path: "uploads/Documenti/Estratti Banche/2026 OlkyPay/02000003393_2026-02-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK26-03",
        title: "02000003393_2026-03-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Mars 2026 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/03/2026",
        reference: "OLK-2026-03",
        file_path: "uploads/Documenti/Estratti Banche/2026 OlkyPay/02000003393_2026-03-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK26-04",
        title: "02000003393_2026-04-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Avril 2026 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/04/2026",
        reference: "OLK-2026-04",
        file_path: "uploads/Documenti/Estratti Banche/2026 OlkyPay/02000003393_2026-04-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK26-05",
        title: "02000003393_2026-05-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Mai 2026 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/05/2026",
        reference: "OLK-2026-05",
        file_path: "uploads/Documenti/Estratti Banche/2026 OlkyPay/02000003393_2026-05-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK26-06",
        title: "02000003393_2026-06-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Juin 2026 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/06/2026",
        reference: "OLK-2026-06",
        file_path: "uploads/Documenti/Estratti Banche/2026 OlkyPay/02000003393_2026-06-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK26-07",
        title: "02000003393_2026-07-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Juillet 2026 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/07/2026",
        reference: "OLK-2026-07",
        file_path: "uploads/Documenti/Estratti Banche/2026 OlkyPay/02000003393_2026-07-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK26-08",
        title: "02000003393_2026-08-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Août 2026 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/08/2026",
        reference: "OLK-2026-08",
        file_path: "uploads/Documenti/Estratti Banche/2026 OlkyPay/02000003393_2026-08-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-OLK26-09",
        title: "02000003393_2026-09-01_120000.pdf",
        category: "Estratti Bancari",
        description: "Extrait de compte Olky Pay - Septembre 2026 (IBAN LU54 6060 0020 0000 3393)",
        date: "01/09/2026",
        reference: "OLK-2026-09",
        file_path: "uploads/Documenti/Estratti Banche/2026 OlkyPay/02000003393_2026-09-01_120000.pdf",
        file_type: "pdf",
        file_size: "47 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-REV26-REV-2026-04",
        title: "04 account-statement_01-Apr-2026_30-Apr-2026.pdf",
        category: "Estratti Bancari",
        description: "Extrait Revolut Business - Avril 2026 (Compte EUR & Multidevise)",
        date: "01/04/2026",
        reference: "REV-2026-04",
        file_path: "uploads/Documenti/Estratti Banche/2026 Revolut/04 account-statement_01-Apr-2026_30-Apr-2026.pdf",
        file_type: "pdf",
        file_size: "72 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-REV26-REV-2026-05",
        title: "05 account-statement_01-May-2026_31-May-2026.pdf",
        category: "Estratti Bancari",
        description: "Extrait Revolut Business - Mai 2026 (Compte EUR & Multidevise)",
        date: "01/05/2026",
        reference: "REV-2026-05",
        file_path: "uploads/Documenti/Estratti Banche/2026 Revolut/05 account-statement_01-May-2026_31-May-2026.pdf",
        file_type: "pdf",
        file_size: "72 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-REV26-REV-2026-06",
        title: "06 account-statement_01-Jun-2026_30-Jun-2026.pdf",
        category: "Estratti Bancari",
        description: "Extrait Revolut Business - Juin 2026 (Compte EUR & Multidevise)",
        date: "01/06/2026",
        reference: "REV-2026-06",
        file_path: "uploads/Documenti/Estratti Banche/2026 Revolut/06 account-statement_01-Jun-2026_30-Jun-2026.pdf",
        file_type: "pdf",
        file_size: "72 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-REV26-REV-2026-07",
        title: "07 account-statement_01-Jul-2026_31-Jul-2026.pdf",
        category: "Estratti Bancari",
        description: "Extrait Revolut Business - Juillet 2026 (Compte EUR & Multidevise)",
        date: "01/07/2026",
        reference: "REV-2026-07",
        file_path: "uploads/Documenti/Estratti Banche/2026 Revolut/07 account-statement_01-Jul-2026_31-Jul-2026.pdf",
        file_type: "pdf",
        file_size: "72 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-REV26-REV-2026-08",
        title: "08 account-statement_01-Aug-2026_31-Aug-2026.pdf",
        category: "Estratti Bancari",
        description: "Extrait Revolut Business - Août 2026 (Compte EUR & Multidevise)",
        date: "01/08/2026",
        reference: "REV-2026-08",
        file_path: "uploads/Documenti/Estratti Banche/2026 Revolut/08 account-statement_01-Aug-2026_31-Aug-2026.pdf",
        file_type: "pdf",
        file_size: "72 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-REV26-REV-2026-09",
        title: "09 account-statement_01-Sep-2026_30-Sep-2026.pdf",
        category: "Estratti Bancari",
        description: "Extrait Revolut Business - Septembre 2026 (Compte EUR & Multidevise)",
        date: "01/09/2026",
        reference: "REV-2026-09",
        file_path: "uploads/Documenti/Estratti Banche/2026 Revolut/09 account-statement_01-Sep-2026_30-Sep-2026.pdf",
        file_type: "pdf",
        file_size: "72 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },
    {
        id: "DOC-BNK-REV26-REV-2026-Q1Q2",
        title: "account-statement_09-Mar-2026_30-Jun-2026.pdf",
        category: "Estratti Bancari",
        description: "Extrait Revolut Business consolidé - Mars à Juin 2026 (LT92 3250 0340 9644 5618)",
        date: "30/06/2026",
        reference: "REV-2026-Q1Q2",
        file_path: "uploads/Documenti/Estratti Banche/2026 Revolut/account-statement_09-Mar-2026_30-Jun-2026.pdf",
        file_type: "pdf",
        file_size: "72 KB",
        status: "Relevé Mensuel",
        status_color: "emerald"
    },

    // RUBRICA: LOGHI & IDENTITÉ VISUELLE
    {
        id: "DOC-LOGO-SOMBRA-PALMA",
        title: "Logo Sombra palma.png",
        category: "Loghi",
        description: "Logo iconique avec palmier de l'Hôtel & SPA Sombra e Água Fresca (Praia de Pipa)",
        date: "21/06/2024",
        reference: "BRAND-SOMBRA-01",
        file_path: "uploads/Loghi/Logo Sombra palma.png",
        file_type: "png",
        file_size: "26.8 KB",
        status: "Logo Officiel",
        status_color: "amber"
    },
    {
        id: "DOC-LOGO-SOMBRA-MARCA",
        title: "Sombra marca nova.png",
        category: "Loghi",
        description: "Marque et emblème Sombra e Água Fresca haute résolution (1000x1000 fond transparent)",
        date: "21/06/2024",
        reference: "BRAND-SOMBRA-02",
        file_path: "uploads/Loghi/Sombra marca nova.png",
        file_type: "png",
        file_size: "59.9 KB",
        status: "Logo Officiel",
        status_color: "amber"
    },
    {
        id: "DOC-LOGO-SOMBRA-BLU",
        title: "Sombra blu trasparente.png",
        category: "Loghi",
        description: "Logo institutionnel Sombra bleu sur fond transparent (1080x1080 RGBA)",
        date: "21/06/2024",
        reference: "BRAND-SOMBRA-03",
        file_path: "uploads/Loghi/Sombra blu trasparente.png",
        file_type: "png",
        file_size: "68.4 KB",
        status: "Logo Officiel",
        status_color: "cyan"
    },
    {
        id: "DOC-LOGO-SOMBRA-PALMA-TRASP",
        title: "Sombra palma trasparente.png",
        category: "Loghi",
        description: "Logo de la palme Sombra bleu officiel sur fond 100% transparent (Mode Clair)",
        date: "17/10/2026",
        reference: "BRAND-SOMBRA-04",
        file_path: "uploads/Loghi/Sombra palma trasparente.png",
        file_type: "png",
        file_size: "18.8 KB",
        status: "Logo Officiel",
        status_color: "cyan"
    },
    {
        id: "DOC-LOGO-SOMBRA-PALMA-BLANC",
        title: "Sombra palma bianca trasparente.png",
        category: "Loghi",
        description: "Logo de la palme Sombra blanc pur sur fond 100% transparent (Mode Sombre)",
        date: "17/10/2026",
        reference: "BRAND-SOMBRA-05",
        file_path: "uploads/Loghi/Sombra palma bianca trasparente.png",
        file_type: "png",
        file_size: "18.6 KB",
        status: "Logo Officiel",
        status_color: "emerald"
    },
    {
        id: "DOC-LOGO-WG-SVG",
        title: "Watergarden_logo.svg",
        category: "Loghi",
        description: "Logo vectoriel officiel de la société holding Watergarden Management Sàrl",
        date: "17/10/2026",
        reference: "BRAND-WG-01",
        file_path: "uploads/Loghi/Watergarden_logo.svg",
        file_type: "svg",
        file_size: "2.0 KB",
        status: "Logo Officiel",
        status_color: "emerald"
    }
];

let currentEntity = 'all'; // 'all', 'watergarden', 'arcoiris'
let currentRubrica = 'all';
let currentSearch = '';

function isArcoIrisDoc(doc) {
    if (!doc) return false;
    if (doc.entity === 'arcoiris') return true;
    const id = doc.id || '';
    const title = doc.title || '';
    const desc = doc.description || '';
    return id.includes('ARCOIRIS') || id.includes('SOMBRA') ||
           id === 'DOC-STAT-01' || id === 'DOC-CERT-03' || id === 'DOC-CERT-04' || id === 'DOC-CERT-05' ||
           title.includes('Arco') || title.includes('Sombra') ||
           desc.includes('Arco') || desc.includes('Sombra') || desc.includes('Tibau do Sul') ||
           desc.includes('Brésil') || desc.includes('Brasil');
}

function getDeletedDocIds() {
    try {
        const stored = localStorage.getItem('watergarden_deleted_docs');
        return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (e) {
        return new Set();
    }
}

function markDocAsDeleted(docId) {
    const deleted = getDeletedDocIds();
    deleted.add(docId);
    try {
        localStorage.setItem('watergarden_deleted_docs', JSON.stringify(Array.from(deleted)));
    } catch (e) {
        console.error("Erreur sauvegarde watergarden_deleted_docs:", e);
    }
}

function unmarkDocAsDeleted(docId) {
    const deleted = getDeletedDocIds();
    if (deleted.has(docId)) {
        deleted.delete(docId);
        try {
            localStorage.setItem('watergarden_deleted_docs', JSON.stringify(Array.from(deleted)));
        } catch (e) {
            console.error("Erreur mise à jour watergarden_deleted_docs:", e);
        }
    }
}

function getDocuments() {
    const deletedIds = getDeletedDocIds();
    try {
        const stored = localStorage.getItem('watergarden_documents');
        if (stored) {
            let parsed = JSON.parse(stored);
            if (deletedIds.size > 0) {
                parsed = parsed.filter(d => !deletedIds.has(d.id));
            }
            const existingMap = new Map(parsed.map(d => [d.id, d]));
            let hasChanges = false;

            // Merge any missing default documents, IGNORING explicitly deleted ones
            DEFAULT_DOCUMENTS.forEach(defDoc => {
                if (deletedIds.has(defDoc.id)) {
                    return; // Intentionally deleted by user, do NOT resurrect!
                }
                if (!existingMap.has(defDoc.id)) {
                    parsed.push(defDoc);
                    existingMap.set(defDoc.id, defDoc);
                    hasChanges = true;
                } else {
                    const existing = existingMap.get(defDoc.id);
                    if (defDoc.file_path && (!existing.file_path || existing.file_path !== defDoc.file_path)) {
                        existing.file_path = defDoc.file_path;
                        hasChanges = true;
                    }
                    if (defDoc.entity && (!existing.entity || existing.entity !== defDoc.entity)) {
                        existing.entity = defDoc.entity;
                        hasChanges = true;
                    }
                }
            });

            if (hasChanges) {
                localStorage.setItem('watergarden_documents', JSON.stringify(parsed));
            }
            return parsed;
        }
    } catch (e) {
        console.error("Error loading stored documents:", e);
    }
    return DEFAULT_DOCUMENTS.filter(d => !deletedIds.has(d.id));
}

function saveDocuments(docs) {
    try {
        localStorage.setItem('watergarden_documents', JSON.stringify(docs));
    } catch (e) {
        console.error("Erreur sauvegarde documents localStorage:", e);
    }
}

function renderDocumentsApp() {
    const docs = getDocuments();
    updateRubricheCounts(docs);
    renderDocumentsList(docs);
}

function updateRubricheCounts(docs) {
    const totalEl = document.getElementById('count-all');
    const bilanciEl = document.getElementById('count-bilanci');
    const statutiEl = document.getElementById('count-statuti');
    const certificatiEl = document.getElementById('count-certificati');
    const bancheEl = document.getElementById('count-banche');
    const loghiEl = document.getElementById('count-loghi');
    const arcoirisEl = document.getElementById('count-arcoiris');
    const wgBadge = document.getElementById('badge-count-wg');
    const arcoBadge = document.getElementById('badge-count-arcoiris');

    const arcoDocs = docs.filter(d => isArcoIrisDoc(d));
    const wgDocs = docs.filter(d => !isArcoIrisDoc(d));

    if (wgBadge) wgBadge.textContent = wgDocs.length;
    if (arcoBadge) arcoBadge.textContent = arcoDocs.length;
    if (arcoirisEl) arcoirisEl.textContent = arcoDocs.length;

    let scopedDocs = docs;
    if (currentEntity === 'arcoiris') {
        scopedDocs = arcoDocs;
    } else if (currentEntity === 'watergarden') {
        scopedDocs = wgDocs;
    }

    if (totalEl) totalEl.textContent = scopedDocs.length;
    if (bilanciEl) bilanciEl.textContent = scopedDocs.filter(d => d.category === 'Bilanci').length;
    if (statutiEl) statutiEl.textContent = scopedDocs.filter(d => d.category === 'Statuti').length;
    if (certificatiEl) certificatiEl.textContent = scopedDocs.filter(d => d.category === 'Certificati').length;
    if (bancheEl) bancheEl.textContent = scopedDocs.filter(d => d.category === 'Estratti Bancari').length;
    if (loghiEl) loghiEl.textContent = scopedDocs.filter(d => d.category === 'Loghi').length;
}

function setDocEntity(entity, btn) {
    currentEntity = entity;
    document.querySelectorAll('.entity-toggle-btn').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    } else {
        const targetBtn = document.getElementById(`btn-entity-${entity}`);
        if (targetBtn) targetBtn.classList.add('active');
    }

    const banner = document.getElementById('arcoiris-dedicated-banner');
    if (banner) {
        banner.style.display = entity === 'arcoiris' ? 'block' : 'none';
    }

    const badge = document.getElementById('entity-status-badge');
    if (badge) {
        badge.style.background = '';
        badge.style.color = '';
        badge.className = 'badge ' + (entity === 'arcoiris' ? 'badge-status-arco' : (entity === 'watergarden' ? 'badge-status-wg' : 'badge-status-all'));
        if (entity === 'arcoiris') {
            badge.innerHTML = '<i class="fa-solid fa-flag"></i> ' + (typeof t === 'function' ? t('doc_entity_arcoiris') : 'Controllata Arco-Íris Ltda (Brésil)');
        } else if (entity === 'watergarden') {
            badge.innerHTML = '<i class="fa-solid fa-building-columns"></i> ' + (typeof t === 'function' ? t('doc_entity_wg') : 'Watergarden Sàrl (Holding Luxembourg)');
        } else {
            badge.innerHTML = '<i class="fa-solid fa-layer-group"></i> ' + (typeof t === 'function' ? t('doc_entity_all') : 'Consolidé (Tous)');
        }
    }

    // Reset rubrica if necessary
    if (entity !== 'arcoiris' && currentRubrica === 'Arcoiris') {
        currentRubrica = 'all';
        const allRubBtn = document.querySelector('.doc-rubrica-btn');
        if (allRubBtn) {
            document.querySelectorAll('.doc-rubrica-btn').forEach(b => b.classList.remove('active'));
            allRubBtn.classList.add('active');
        }
    }

    renderDocumentsApp();
}

function setDocRubrica(rubrica, btn) {
    if (rubrica === 'Arcoiris') {
        currentRubrica = 'all';
        setDocEntity('arcoiris', document.getElementById('btn-entity-arcoiris'));
        document.querySelectorAll('.doc-rubrica-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        return;
    }

    currentRubrica = rubrica;
    document.querySelectorAll('.doc-rubrica-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderDocumentsList(getDocuments());
}

function filterDocsBySearch(val) {
    currentSearch = (val || '').toLowerCase().trim();
    renderDocumentsList(getDocuments());
}

function renderDocumentsList(allDocs) {
    const tbody = document.getElementById('docs-tbody');
    if (!tbody) return;

    let filtered = allDocs;

    // 1. Entity Filter
    if (currentEntity === 'arcoiris') {
        filtered = filtered.filter(d => isArcoIrisDoc(d));
    } else if (currentEntity === 'watergarden') {
        filtered = filtered.filter(d => !isArcoIrisDoc(d));
    }

    // 2. Rubrica Filter
    if (currentRubrica !== 'all' && currentRubrica !== 'Arcoiris') {
        filtered = filtered.filter(d => d.category === currentRubrica);
    }

    // 3. Search Filter
    if (currentSearch) {
        filtered = filtered.filter(d => 
            (d.title || '').toLowerCase().includes(currentSearch) ||
            (d.description || '').toLowerCase().includes(currentSearch) ||
            (d.reference || '').toLowerCase().includes(currentSearch) ||
            (d.category || '').toLowerCase().includes(currentSearch)
        );
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; opacity: 0.4; margin-bottom: 0.75rem; display: block;"></i>
                    ${typeof t === 'function' ? t('doc_no_records') : 'Aucun document trouvé pour ce critère.'}
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(doc => {
        const iconClass = doc.file_type === 'excel' ? 'fa-file-excel text-emerald' : (doc.file_type === 'png' || doc.file_type === 'svg' ? 'fa-image text-rose' : 'fa-file-pdf text-rose');
        const catBadgeClass = doc.category === 'Bilanci' ? 'badge-entree' : (doc.category === 'Statuti' ? 'badge-ord' : (doc.category === 'Estratti Bancari' ? 'badge-info' : 'badge-ext'));
        const badgeColor = doc.status_color === 'emerald' ? 'badge-success' : (doc.status_color === 'rose' ? 'badge-danger' : (doc.status_color === 'blue' || doc.status_color === 'cyan' ? 'badge-info' : 'badge-neutral'));
        const isArco = isArcoIrisDoc(doc);
        const entityPill = isArco ? 
            `<span class="badge badge-doc-arco"><span style="font-size: 0.75rem;">🇧🇷</span> Arco-Íris Ltda</span>` :
            `<span class="badge badge-doc-wg"><i class="fa-solid fa-landmark"></i> Watergarden Sàrl</span>`;

        return `
            <tr id="doc-row-${doc.id}" data-id="${doc.id}" draggable="true" ondragstart="handleDocDragStart(event, '${doc.id}')" ondragend="handleDocDragEnd(this)" ondragover="handleDocDragOver(event, this)" ondragleave="handleDocDragLeave(this)" ondrop="handleDocDrop(event, '${doc.id}')">
                <td style="width: 38px; text-align: center;">
                    <div class="doc-drag-handle" title="Trascina in su o in giù per riordinare la lista dei documenti">
                        <i class="fa-solid fa-grip-vertical"></i>
                    </div>
                </td>
                <td style="width: 40px; text-align: center;">
                    <i class="fa-solid ${iconClass}" style="font-size: 1.25rem;"></i>
                </td>
                <td>
                    <div style="font-weight: 700; color: var(--text-main); font-size: 0.88rem;">${escapeHtml(doc.title)}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">${escapeHtml(doc.description)}</div>
                    <div>${entityPill}</div>
                </td>
                <td>
                    <span class="badge ${catBadgeClass}">${escapeHtml(doc.category)}</span>
                </td>
                <td style="font-family: monospace; font-size: 0.78rem;">
                    <div>${escapeHtml(doc.reference || '-')}</div>
                    <div style="font-size: 0.72rem; color: var(--text-muted);">${doc.file_size || ''}</div>
                </td>
                <td style="font-size: 0.8rem; white-space: nowrap;">
                    <div><i class="fa-regular fa-calendar-days text-muted" style="margin-right: 0.3rem;"></i>${doc.date}</div>
                    <span class="badge ${badgeColor}" style="margin-top: 0.2rem; font-size: 0.7rem;">${doc.status}</span>
                </td>
                <td class="text-right">
                    <div class="doc-actions-cell">
                        <!-- 1. OCCHIO: Visualizza -->
                        <button class="doc-icon-btn btn-view" title="${typeof t === 'function' ? t('btn_view') : 'Visualizza'}" onclick="viewDocument('${doc.id}')">
                            <i class="fa-solid fa-eye"></i>
                        </button>

                        <!-- 2. SCARICA: Download -->
                        <button class="doc-icon-btn btn-download" title="${typeof t === 'function' ? t('btn_download') : 'Scarica'}" onclick="downloadDocument('${doc.id}')">
                            <i class="fa-solid fa-download"></i>
                        </button>

                        <!-- 3. MATITA: Modifica -->
                        <button class="doc-icon-btn btn-edit" title="${typeof t === 'function' ? t('btn_edit') : 'Modifica'}" onclick="openEditDocModal('${doc.id}')">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>

                        <!-- 4. CESTINO: Cancella -->
                        <button class="doc-icon-btn btn-delete" title="${typeof t === 'function' ? t('btn_delete') : 'Elimina'}" onclick="deleteDocument('${doc.id}')">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ==========================================================================
// DRAG & DROP PER SPOSTARE I DOCUMENTI IN SU ED IN GIÙ (documenti.html)
// ==========================================================================

let draggedDocId = null;

function handleDocDragStart(e, docId) {
    draggedDocId = docId;
    e.dataTransfer.setData('text/plain', docId);
    e.dataTransfer.effectAllowed = 'move';
    const tr = e.target.closest('tr');
    if (tr) tr.classList.add('doc-row-dragging');
}

function handleDocDragEnd(tr) {
    if (tr) tr.classList.remove('doc-row-dragging');
    document.querySelectorAll('#docs-tbody tr').forEach(r => {
        r.classList.remove('doc-drag-over-top', 'doc-drag-over-bottom');
    });
    draggedDocId = null;
}

function handleDocDragOver(e, tr) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const rect = tr.getBoundingClientRect();
    const mid = rect.top + rect.height / 2;
    if (e.clientY < mid) {
        tr.classList.add('doc-drag-over-top');
        tr.classList.remove('doc-drag-over-bottom');
    } else {
        tr.classList.add('doc-drag-over-bottom');
        tr.classList.remove('doc-drag-over-top');
    }
}

function handleDocDragLeave(tr) {
    tr.classList.remove('doc-drag-over-top', 'doc-drag-over-bottom');
}

function handleDocDrop(e, targetDocId) {
    e.preventDefault();
    const tr = e.target.closest('tr');
    if (tr) tr.classList.remove('doc-drag-over-top', 'doc-drag-over-bottom');

    const sourceId = e.dataTransfer.getData('text/plain') || draggedDocId;
    if (!sourceId || sourceId === targetDocId) return;

    const allDocs = getDocuments();
    const sourceIdx = allDocs.findIndex(d => d.id === sourceId);
    const targetIdx = allDocs.findIndex(d => d.id === targetDocId);

    if (sourceIdx === -1 || targetIdx === -1) return;

    const rect = tr ? tr.getBoundingClientRect() : null;
    const insertBefore = rect ? (e.clientY < (rect.top + rect.height / 2)) : true;

    // Rimuovi documento trascinato e reinserisci nella nuova posizione
    const [draggedDoc] = allDocs.splice(sourceIdx, 1);
    let newTargetIdx = allDocs.findIndex(d => d.id === targetDocId);
    if (!insertBefore) newTargetIdx += 1;
    allDocs.splice(newTargetIdx, 0, draggedDoc);

    // Salva l'ordine permanente nel localStorage
    saveDocuments(allDocs);

    // Ridisegna la tabella dei documenti
    renderDocumentsApp();
}

let pendingAddFile = null;
let pendingEditFile = null;
let currentViewingDocId = null;

function handleNewDocFileSelected(input) {
    if (!input.files || input.files.length === 0) return;
    pendingAddFile = input.files[0];
    const infoEl = document.getElementById('add-doc-file-info');
    const labelEl = document.getElementById('add-doc-file-label');
    const titleInput = document.getElementById('add-doc-title');
    
    if (infoEl) {
        infoEl.style.display = 'block';
        infoEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${escapeHtml(pendingAddFile.name)} (${(pendingAddFile.size / 1024).toFixed(1)} KB) - Prêt pour IndexedDB`;
    }
    if (labelEl) {
        labelEl.textContent = 'Fichier sélectionné :';
    }
    if (titleInput && (!titleInput.value || titleInput.value.trim() === '')) {
        titleInput.value = pendingAddFile.name;
    }
}

function handleEditDocFileSelected(input) {
    if (!input.files || input.files.length === 0) return;
    pendingEditFile = input.files[0];
    const infoEl = document.getElementById('edit-doc-file-info');
    const labelEl = document.getElementById('edit-doc-file-label');
    if (infoEl) {
        infoEl.style.display = 'block';
        infoEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Nouveau fichier : ${escapeHtml(pendingEditFile.name)} (${(pendingEditFile.size / 1024).toFixed(1)} KB)`;
    }
    if (labelEl) {
        labelEl.textContent = 'Fichier à associer :';
    }
}

// 1. VISUALIZZA DOCUMENTO (avec support Blob URL IndexedDB)
// 1. VISUALIZZA DOCUMENTO
let currentExcelWorkbook = null;

async function viewDocument(docId) {
    const doc = getDocuments().find(d => d.id === docId);
    if (!doc) return;
    currentViewingDocId = docId;

    const modal = document.getElementById('view-doc-modal');
    const titleEl = document.getElementById('view-doc-title');
    const frameEl = document.getElementById('view-doc-iframe');
    const excelContainer = document.getElementById('view-doc-excel-container');
    const fallbackLink = document.getElementById('view-doc-fallback-link');
    const downloadBtn = document.getElementById('view-doc-download-btn');
    const storageBadge = document.getElementById('view-doc-storage-badge');
    const sourceLabel = document.getElementById('view-doc-source-label');

    if (titleEl) titleEl.textContent = doc.title;

    let fileUrl = null;
    let isFromIndexedDB = false;
    let fileBlob = null;

    if (window.DocStorage) {
        const item = await window.DocStorage.getFile(docId);
        if (item && item.blob) {
            try {
                fileBlob = item.blob;
                fileUrl = URL.createObjectURL(item.blob);
                isFromIndexedDB = true;
            } catch (e) {}
        } else if (item && item.dataUrl) {
            fileUrl = item.dataUrl;
            isFromIndexedDB = true;
        }
    }

    if (!fileUrl && doc.file_path) {
        fileUrl = encodeURI(doc.file_path);
    }

    if (storageBadge) {
        storageBadge.style.display = isFromIndexedDB ? 'inline-flex' : 'none';
    }
    if (sourceLabel) {
        sourceLabel.textContent = isFromIndexedDB ? 'IndexedDB Blob Store (Local)' : 'Fichier Serveur / uploads';
        sourceLabel.className = isFromIndexedDB ? 'badge badge-success' : 'badge badge-info';
    }

    if (fallbackLink) {
        fallbackLink.href = fileUrl || '#';
    }
    if (downloadBtn) {
        downloadBtn.href = fileUrl || '#';
        downloadBtn.setAttribute('download', doc.title || 'document.pdf');
    }

    const isExcel = doc.file_type === 'excel' || 
        (doc.file_path && (doc.file_path.toLowerCase().endsWith('.xlsx') || doc.file_path.toLowerCase().endsWith('.xls'))) ||
        (doc.title && (doc.title.toLowerCase().endsWith('.xlsx') || doc.title.toLowerCase().endsWith('.xls')));

    if (isExcel) {
        // HIDE iframe so browser NEVER triggers an unwanted download
        if (frameEl) {
            frameEl.style.display = 'none';
            frameEl.src = 'about:blank';
        }
        if (excelContainer) {
            excelContainer.style.display = 'flex';
        }

        // Parse and render Excel tables with SheetJS
        await loadAndRenderExcel(doc, fileUrl, fileBlob);
    } else {
        // Standard PDF / Image view in iframe
        if (excelContainer) {
            excelContainer.style.display = 'none';
        }
        if (frameEl) {
            frameEl.style.display = 'block';
            frameEl.src = fileUrl || 'about:blank';
        }
    }

    if (modal) modal.classList.add('active');
}

async function loadAndRenderExcel(doc, fileUrl, fileBlob) {
    const outputEl = document.getElementById('excel-table-output');
    const tabsEl = document.getElementById('excel-sheet-tabs');
    const infoEl = document.getElementById('excel-sheet-info');

    if (outputEl) {
        outputEl.innerHTML = `
            <div style="padding: 3rem; text-align: center; color: var(--text-muted);">
                <i class="fa-solid fa-spinner fa-spin text-cyan" style="font-size: 2rem; margin-bottom: 0.8rem; display: block;"></i>
                Lecture et analyse du classeur Excel en cours...
            </div>
        `;
    }
    if (tabsEl) tabsEl.innerHTML = '';
    if (infoEl) infoEl.textContent = '';

    try {
        let arrayBuffer = null;
        if (fileBlob) {
            arrayBuffer = await fileBlob.arrayBuffer();
        } else if (fileUrl) {
            const resp = await fetch(fileUrl);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            arrayBuffer = await resp.arrayBuffer();
        }

        if (!arrayBuffer) {
            throw new Error("Impossible de lire les données du fichier.");
        }

        if (typeof XLSX === 'undefined') {
            throw new Error("Moteur SheetJS (XLSX) indisponible.");
        }

        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        currentExcelWorkbook = workbook;

        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
            if (outputEl) outputEl.innerHTML = '<div style="padding: 2rem; text-align: center;">Ce classeur Excel ne contient aucune feuille de données.</div>';
            return;
        }

        // Render sheet tabs
        if (tabsEl) {
            tabsEl.innerHTML = workbook.SheetNames.map((name, idx) => `
                <button type="button" class="excel-sheet-tab-btn ${idx === 0 ? 'active' : ''}" onclick="switchExcelSheet('${escapeHtml(name)}')">
                    <i class="fa-solid fa-table"></i> ${escapeHtml(name)}
                </button>
            `).join('');
        }

        // Render first sheet by default
        renderActiveExcelSheet(workbook.SheetNames[0]);

    } catch (err) {
        console.error("Erreur de chargement Excel:", err);
        if (outputEl) {
            outputEl.innerHTML = `
                <div style="padding: 2.5rem; text-align: center; color: #f43f5e;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.2rem; margin-bottom: 0.8rem; display: block;"></i>
                    <strong style="font-size: 0.95rem; display: block; margin-bottom: 0.4rem;">Aperçu direct indisponible pour ce fichier Excel</strong>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(err.message || err)}</span>
                    <div style="margin-top: 1.2rem;">
                        <a href="${fileUrl || '#'}" download="${escapeHtml(doc.title)}" class="btn btn-primary btn-sm">
                            <i class="fa-solid fa-download"></i> Télécharger le fichier Excel
                        </a>
                    </div>
                </div>
            `;
        }
    }
}

function switchExcelSheet(sheetName) {
    if (!currentExcelWorkbook) return;
    document.querySelectorAll('.excel-sheet-tab-btn').forEach(btn => {
        if (btn.textContent.trim().endsWith(sheetName) || btn.textContent.includes(sheetName)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    renderActiveExcelSheet(sheetName);
}

function renderActiveExcelSheet(sheetName) {
    if (!currentExcelWorkbook) return;
    const sheet = currentExcelWorkbook.Sheets[sheetName];
    const outputEl = document.getElementById('excel-table-output');
    const infoEl = document.getElementById('excel-sheet-info');
    if (!outputEl) return;

    if (!sheet) {
        outputEl.innerHTML = '<div style="padding: 2rem; text-align: center;">Feuille introuvable.</div>';
        return;
    }

    const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    if (!data || data.length === 0) {
        outputEl.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">Cette feuille est vide.</div>';
        if (infoEl) infoEl.textContent = '0 ligne';
        return;
    }

    let maxCols = 0;
    for (let i = 0; i < Math.min(data.length, 50); i++) {
        if (data[i] && data[i].length > maxCols) maxCols = data[i].length;
    }
    if (maxCols === 0) maxCols = 1;

    if (infoEl) {
        infoEl.innerHTML = `<i class="fa-solid fa-table-cells text-cyan"></i> <strong>${data.length}</strong> lignes × <strong>${maxCols}</strong> colonnes`;
    }

    let html = '<table class="excel-table"><thead><tr><th style="width: 40px; text-align: center;">#</th>';
    for (let c = 0; c < maxCols; c++) {
        let letter = '';
        let temp = c;
        while (temp >= 0) {
            letter = String.fromCharCode((temp % 26) + 65) + letter;
            temp = Math.floor(temp / 26) - 1;
        }
        html += `<th>${letter}</th>`;
    }
    html += '</tr></thead><tbody>';

    const maxRows = Math.min(data.length, 600);
    for (let r = 0; r < maxRows; r++) {
        const row = data[r] || [];
        html += `<tr><td style="text-align: center; color: var(--text-muted); font-size: 0.7rem; background: rgba(255,255,255,0.02);">${r + 1}</td>`;
        for (let c = 0; c < maxCols; c++) {
            const val = row[c] !== undefined && row[c] !== null ? String(row[c]).trim() : '';
            const isNum = val !== '' && !isNaN(Number(val.replace(/\s/g, '').replace(',', '.')));
            html += `<td class="${isNum ? 'num' : ''}">${escapeHtml(val)}</td>`;
        }
        html += '</tr>';
    }
    html += '</tbody></table>';

    if (data.length > 600) {
        html += `<div style="padding: 0.6rem; text-align: center; color: var(--text-muted); font-size: 0.75rem;">Affichage des 600 premières lignes sur un total de ${data.length}. Téléchargez le fichier pour les données complètes.</div>`;
    }

    outputEl.innerHTML = html;
}

function closeViewDocModal() {
    const modal = document.getElementById('view-doc-modal');
    const frameEl = document.getElementById('view-doc-iframe');
    const excelContainer = document.getElementById('view-doc-excel-container');
    const outputEl = document.getElementById('excel-table-output');
    if (frameEl) {
        frameEl.src = 'about:blank';
        frameEl.style.display = 'block';
    }
    if (excelContainer) {
        excelContainer.style.display = 'none';
    }
    if (outputEl) {
        outputEl.innerHTML = '';
    }
    currentExcelWorkbook = null;
    if (modal) modal.classList.remove('active');
    currentViewingDocId = null;
}

// 2. SCARICA DOCUMENTO
async function downloadDocument(docId) {
    const doc = getDocuments().find(d => d.id === docId);
    if (!doc) return;

    let fileUrl = null;
    if (window.DocStorage) {
        const item = await window.DocStorage.getFile(docId);
        if (item && item.blob) {
            try {
                fileUrl = URL.createObjectURL(item.blob);
            } catch (e) {}
        } else if (item && item.dataUrl) {
            fileUrl = item.dataUrl;
        }
    }

    if (!fileUrl && doc.file_path) {
        fileUrl = encodeURI(doc.file_path);
    }

    if (!fileUrl) {
        await viewDocument(docId);
        return;
    }

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = doc.title || 'document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// 3. MODIFICA METADATI DOCUMENTO (Matita)
function openEditDocModal(docId) {
    const doc = getDocuments().find(d => d.id === docId);
    if (!doc) return;

    pendingEditFile = null;
    const editFileInfo = document.getElementById('edit-doc-file-info');
    if (editFileInfo) {
        editFileInfo.style.display = 'none';
        editFileInfo.innerHTML = '';
    }
    const editFileLabel = document.getElementById('edit-doc-file-label');
    if (editFileLabel) {
        editFileLabel.textContent = 'Remplacer ou associer un fichier physique (IndexedDB)';
    }

    document.getElementById('edit-doc-id').value = doc.id;
    document.getElementById('edit-doc-title').value = doc.title;
    document.getElementById('edit-doc-category').value = doc.category;
    document.getElementById('edit-doc-date').value = doc.date;
    document.getElementById('edit-doc-ref').value = doc.reference || '';
    document.getElementById('edit-doc-desc').value = doc.description || '';
    document.getElementById('edit-doc-status').value = doc.status || 'Conforme';

    const modal = document.getElementById('edit-doc-modal');
    if (modal) modal.classList.add('active');
}

function closeEditDocModal() {
    pendingEditFile = null;
    const modal = document.getElementById('edit-doc-modal');
    if (modal) modal.classList.remove('active');
}

async function saveEditDocForm(e) {
    if (e) e.preventDefault();
    const id = document.getElementById('edit-doc-id').value;
    const docs = getDocuments();
    const doc = docs.find(d => d.id === id);
    if (!doc) return;

    doc.title = document.getElementById('edit-doc-title').value.trim();
    doc.category = document.getElementById('edit-doc-category').value;
    doc.date = document.getElementById('edit-doc-date').value.trim();
    doc.reference = document.getElementById('edit-doc-ref').value.trim();
    doc.description = document.getElementById('edit-doc-desc').value.trim();
    doc.status = document.getElementById('edit-doc-status').value.trim();

    if (pendingEditFile && window.DocStorage) {
        await window.DocStorage.saveFile(doc.id, pendingEditFile, pendingEditFile.name, pendingEditFile.type);
        doc.file_size = pendingEditFile.size < 1024 * 1024 ? 
            `${Math.round(pendingEditFile.size / 1024)} KB` : 
            `${(pendingEditFile.size / (1024 * 1024)).toFixed(2)} MB`;
        doc.file_type = pendingEditFile.name.endsWith('.xlsx') || pendingEditFile.name.endsWith('.xls') ? "excel" : (pendingEditFile.name.endsWith('.png') || pendingEditFile.name.endsWith('.jpg') ? "image" : "pdf");
        pendingEditFile = null;
        updateIndexedDBStatus();
    }

    saveDocuments(docs);
    closeEditDocModal();
    renderDocumentsApp();
    showToast("Document mis à jour avec succès !");
}

// 4. CANCELLA DOCUMENTO (Cestino)
let pendingDeleteDocId = null;

function promptDeleteDocument(docId) {
    const docs = getDocuments();
    const doc = docs.find(d => d.id === docId);
    if (!doc) return;

    pendingDeleteDocId = docId;

    const modal = document.getElementById('delete-doc-modal');
    if (modal) {
        const titleEl = document.getElementById('delete-doc-title');
        const refEl = document.getElementById('delete-doc-ref');
        const catEl = document.getElementById('delete-doc-category');
        const entityEl = document.getElementById('delete-doc-entity');
        
        if (titleEl) titleEl.textContent = doc.title || 'Document';
        if (refEl) refEl.textContent = doc.reference || doc.id;
        if (catEl) catEl.textContent = doc.category || 'Général';
        if (entityEl) {
            const isArco = isArcoIrisDoc(doc);
            entityEl.innerHTML = isArco 
                ? '<i class="fa-solid fa-umbrella-beach text-cyan"></i> Arcoiris Ltda' 
                : '<i class="fa-solid fa-building-columns text-cyan"></i> Watergarden Sàrl';
        }
        modal.classList.add('active');
    } else {
        // Fallback in case modal element is missing
        if (confirm(`Sei sicuro di voler eliminare dall'archivio il documento "${doc.title}"?`)) {
            executeConfirmedDelete(docId);
        }
    }
}

function closeDeleteDocModal() {
    pendingDeleteDocId = null;
    const modal = document.getElementById('delete-doc-modal');
    if (modal) modal.classList.remove('active');
}

async function executeConfirmedDelete(explicitId) {
    const docId = explicitId || pendingDeleteDocId;
    if (!docId) return;

    const docs = getDocuments();
    const doc = docs.find(d => d.id === docId);
    const docTitle = doc ? doc.title : docId;

    // 1. Mark as permanently deleted in tracking set so it won't be resurrected
    markDocAsDeleted(docId);

    // 2. Remove physical file from IndexedDB cache if present
    if (window.DocStorage) {
        try {
            await window.DocStorage.deleteFile(docId);
        } catch (err) {
            console.warn("DocStorage delete error:", err);
        }
    }

    // 3. Update active documents list in localStorage
    const updated = docs.filter(d => d.id !== docId);
    saveDocuments(updated);

    // 4. Close modal
    closeDeleteDocModal();

    // 5. Re-render UI & counters
    renderDocumentsApp();
    updateIndexedDBStatus();

    // 6. Show toast confirmation
    showToast(`Document "${docTitle}" supprimé avec succès de l'archive.`);
}

async function deleteDocument(docId) {
    promptDeleteDocument(docId);
}

// 5. AGGIUNGI NUOVO DOCUMENTO
function openAddDocModal() {
    pendingAddFile = null;
    const addFileInfo = document.getElementById('add-doc-file-info');
    if (addFileInfo) {
        addFileInfo.style.display = 'none';
        addFileInfo.innerHTML = '';
    }
    const addFileLabel = document.getElementById('add-doc-file-label');
    if (addFileLabel) {
        addFileLabel.textContent = 'Glissez-déposez ou cliquez pour charger un fichier (Stockage IndexedDB sans limite)';
    }

    document.getElementById('add-doc-title').value = '';
    document.getElementById('add-doc-category').value = currentRubrica !== 'all' && currentRubrica !== 'Arcoiris' ? currentRubrica : 'Bilanci';
    document.getElementById('add-doc-date').value = new Date().toLocaleDateString('fr-FR');
    document.getElementById('add-doc-ref').value = '';
    document.getElementById('add-doc-desc').value = '';
    
    const modal = document.getElementById('add-doc-modal');
    if (modal) modal.classList.add('active');
}

function closeAddDocModal() {
    pendingAddFile = null;
    const modal = document.getElementById('add-doc-modal');
    if (modal) modal.classList.remove('active');
}

async function saveNewDocForm(e) {
    if (e) e.preventDefault();
    const title = document.getElementById('add-doc-title').value.trim();
    if (!title) {
        alert("Veuillez indiquer un titre pour le document.");
        return;
    }

    const newId = "DOC-" + Date.now().toString(36).toUpperCase();
    let fileSize = "350 KB";
    let fileType = title.endsWith('.xlsx') || title.endsWith('.xls') ? "excel" : (title.endsWith('.png') || title.endsWith('.jpg') ? "image" : "pdf");
    let filePath = "";

    if (pendingAddFile) {
        fileSize = pendingAddFile.size < 1024 * 1024 ? 
            `${Math.round(pendingAddFile.size / 1024)} KB` : 
            `${(pendingAddFile.size / (1024 * 1024)).toFixed(2)} MB`;
        fileType = pendingAddFile.name.endsWith('.xlsx') || pendingAddFile.name.endsWith('.xls') ? "excel" : (pendingAddFile.name.endsWith('.png') || pendingAddFile.name.endsWith('.jpg') ? "image" : "pdf");
        filePath = `uploads/Documenti/${pendingAddFile.name}`;

        if (window.DocStorage) {
            await window.DocStorage.saveFile(newId, pendingAddFile, pendingAddFile.name, pendingAddFile.type);
            updateIndexedDBStatus();
        }
        pendingAddFile = null;
    }

    const category = document.getElementById('add-doc-category').value;
    const docs = getDocuments();
    const newDoc = {
        id: newId,
        title: title,
        category: category,
        description: document.getElementById('add-doc-desc').value.trim() || "Document archivé dans Watergarden",
        date: document.getElementById('add-doc-date').value.trim() || new Date().toLocaleDateString('fr-FR'),
        reference: document.getElementById('add-doc-ref').value.trim() || "DOC-INDEXED",
        file_path: filePath || "uploads/Statuti/Watergarden - Statuts Coordonnés au 09.12.2022.pdf",
        file_type: fileType,
        file_size: fileSize,
        status: "Archivé",
        status_color: "emerald",
        entity: currentEntity === 'arcoiris' ? 'arcoiris' : 'watergarden'
    };

    docs.unshift(newDoc);
    saveDocuments(docs);
    closeAddDocModal();
    renderDocumentsApp();
    showToast(`Document "${newDoc.title}" ajouté à l'archive (stocké dans IndexedDB) !`);
}

function resetDefaultDocuments() {
    if (confirm("Réinitialiser l'archive des documents aux valeurs officielles par défaut ?")) {
        localStorage.removeItem('watergarden_documents');
        localStorage.removeItem('watergarden_deleted_docs');
        renderDocumentsApp();
        if (window.DocStorage) {
            initIndexedDBStorage();
        }
        showToast("Archive réinitialisée avec succès.");
    }
}

// 6. GESTIONE INDEXEDDB: PRE-CACHE & STATISTICHE
async function initIndexedDBStorage() {
    if (!window.DocStorage) return;
    try {
        const docsToCache = [
            { id: "DOC-STAT-2022", path: "uploads/Statuti/Watergarden - Statuts Coordonnés au 09.12.2022.pdf", name: "Watergarden - Statuts Coordonnés au 09.12.2022.pdf" },
            { id: "DOC-STAT-2018", path: "uploads/Statuti/Watergarden - Statuts Coordonnés au 06.07.2018.pdf", name: "Watergarden - Statuts Coordonnés au 06.07.2018.pdf" },
            { id: "DOC-BIL-01", path: "uploads/Documenti/Bilans Watergarden/2025/watergarden - DEF 2025.pdf", name: "watergarden - DEF 2025.pdf" },
            { id: "DOC-BIL-ARCOIRIS-PDF", path: "uploads/Documenti/Bilans Arcoiris R$/2025/Balancete 2025 - Arco Iris.pdf", name: "Balancete 2025 - Arco Iris.pdf" },
            { id: "DOC-CERT-01", path: "uploads/Documenti/RCS - RBE/RCS - Watergarden 05.2026.pdf", name: "RCS - Watergarden 05.2026.pdf" },
            { id: "DOC-CERT-02", path: "uploads/Documenti/RCS - RBE/RBE - Watergarden 05.2026.pdf", name: "RBE - Watergarden 05.2026.pdf" }
        ];

        for (const item of docsToCache) {
            const has = await DocStorage.hasFile(item.id);
            if (!has) {
                await DocStorage.cacheRemoteFile(item.id, encodeURI(item.path), item.name);
            }
        }
        updateIndexedDBStatus();
    } catch (e) {
        console.warn("IndexedDB background sync warning:", e);
    }
}

async function updateIndexedDBStatus() {
    if (!window.DocStorage) return;
    try {
        const stats = await DocStorage.getStats();
        const pill = document.getElementById('indexeddb-pill');
        const text = document.getElementById('indexeddb-status-text');
        if (pill && text) {
            const sizeMb = (stats.totalBytes / (1024 * 1024)).toFixed(2);
            text.innerHTML = `IndexedDB: <strong>${stats.count}</strong> doc (${sizeMb} MB)`;
            pill.title = `WatergardenDocsDB: ${stats.count} documenti memorizzati nel database IndexedDB locale (${stats.totalBytes} bytes). Nessun limite memoria localStorage.`;
        }
    } catch (e) {
        console.warn("Error updating IndexedDB status:", e);
    }
}

function showToast(msg) {
    let toast = document.getElementById('compta-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'compta-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: rgba(16, 185, 129, 0.95);
            color: #ffffff;
            padding: 0.85rem 1.4rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 600;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            z-index: 9999;
            transition: opacity 0.3s ease, transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        `;
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${escapeHtml(msg)}</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
    }, 3200);
}

function escapeHtml(text) {
    if (!text) return '';
    return String(text).replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

function handleLocationHash() {
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (hash === '#arcoiris' || search.includes('entity=arcoiris')) {
        setDocEntity('arcoiris', document.getElementById('btn-entity-arcoiris'));
    } else if (hash === '#watergarden' || search.includes('entity=watergarden')) {
        setDocEntity('watergarden', document.getElementById('btn-entity-watergarden'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    handleLocationHash();
    renderDocumentsApp();
    if (window.DocStorage) {
        initIndexedDBStorage();
    }

    // Dismiss modals on backdrop click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                if (overlay.id === 'view-doc-modal') closeViewDocModal();
                if (overlay.id === 'delete-doc-modal') closeDeleteDocModal();
                if (overlay.id === 'edit-doc-modal') closeEditDocModal();
                if (overlay.id === 'add-doc-modal') closeAddDocModal();
            }
        });
    });

    // Dismiss modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeViewDocModal();
            closeDeleteDocModal();
            closeEditDocModal();
            closeAddDocModal();
        }
    });
});

window.addEventListener('hashchange', () => {
    handleLocationHash();
});

window.addEventListener('wg:languageChanged', () => {
    renderDocumentsApp();
});

// Explicit window bindings
window.getDocuments = getDocuments;
window.saveDocuments = saveDocuments;
window.promptDeleteDocument = promptDeleteDocument;
window.closeDeleteDocModal = closeDeleteDocModal;
window.executeConfirmedDelete = executeConfirmedDelete;
window.deleteDocument = deleteDocument;
window.resetDefaultDocuments = resetDefaultDocuments;
window.openAddDocModal = openAddDocModal;
window.closeAddDocModal = closeAddDocModal;
window.openEditDocModal = openEditDocModal;
window.closeEditDocModal = closeEditDocModal;
window.viewDocument = viewDocument;
window.closeViewDocModal = closeViewDocModal;
window.downloadDocument = downloadDocument;
window.switchExcelSheet = switchExcelSheet;


