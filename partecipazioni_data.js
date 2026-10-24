/**
 * Watergarden Management Sàrl - Données Officielles Participation Étrangère
 * Filiale Exclusive : ARCOIRIS ADMINISTRADORA DE BENS E IMÓVEIS LTDA (Brésil)
 * Actif Hôtelier Sous-Jacent : SOMBRA SPA RESORT (Praia de Pipa)
 */

const DEFAULT_PARTECIPAZIONI = [
    {
        id: "PART-ARCOIRIS",
        name: "ARCOIRIS ADMINISTRADORA DE BENS E IMÓVEIS LTDA",
        trade_name: "Sombra SPA & Luxury Resort",
        short_name: "ArcoIris Ltda",
        country: "Brésil",
        country_code: "br",
        flag: "🇧🇷",
        legal_form: "Sociedade Limitada (Ltda)",
        cnpj: "06.036.746/0001-31",
        pcn_account: "2310000 - PARTS DANS ENTREPRISES LIÉES : ARCO IRIS",
        pcn_code: "2310000",
        pcn_loans_code: "2321000",
        pcn_loans_label: "Prêts participatifs rattachés 7% (2.700.000 BRL)",
        sector: "Hospitality, Luxury Resort & Wellness SPA",
        headquarters: "Praia de Pipa - Tibau do Sul (RN) - Brésil",
        address: "Rua das Acácias, S/N, Praia de Pipa, Tibau do Sul/RN - CEP 59178-000",
        rep_name_lux: "WATERGARDEN MANAGEMENT S.à r.l. (représentée par Franco TOSCANO)",
        rep_name_br: "Franco TOSCANO (Administrateur Brésil)",
        
        // Données Comptables Bilans Watergarden 2024 - 2025
        vnc_shares_eur: 5657646.49,
        loans_to_affiliate_eur: 548306.88,
        total_holding_exposure_eur: 6205953.37,
        
        // Structure du Capital Social ArcoIris (R$ 10.984.044,00)
        total_capital_brl: 10984044.00,
        total_quotas: 1098404400,
        quota_nominal_value_brl: 0.01,
        
        pct_ownership: 99.089588,
        ownership_type: "Filiale Contrôlée à 99,09%",
        shares_held: "1.088.404.400 quotas",
        
        partners_table: [
            {
                nr: 1,
                name: "WATERGARDEN MANAGEMENT S.à r.l.",
                role: "Société Mère (Luxembourg - CNPJ 08.037.260/0001-43)",
                quotas: 1088404400,
                val_nominal: "0,01 R$",
                capital_brl: 10884044.00,
                pct: 99.089588,
                bo: "Divers associés proportionnellement"
            },
            {
                nr: 2,
                name: "Franco TOSCANO",
                role: "Associé Minoritaire & Administrateur (CPF 014.486.024-40)",
                quotas: 3340000,
                val_nominal: "0,01 R$",
                capital_brl: 33400.00,
                pct: 0.304077,
                bo: "Franco TOSCANO"
            },
            {
                nr: 3,
                name: "GOYANNA PARTICIPAÇÕES E ASSESSORIA EMPRESARIAL LTDA",
                role: "Associé Minoritaire (CNPJ 29.405.920/0001-71, Natal/RN)",
                quotas: 3330000,
                val_nominal: "0,01 R$",
                capital_brl: 33300.00,
                pct: 0.303167,
                bo: "Ricardo Pimentel Portela de Moraes (CPF 010.236.884-84)"
            },
            {
                nr: 4,
                name: "J. M. EMPREENDIMENTOS IMOBILIÁRIOS E HOTELEIROS LTDA",
                role: "Associé Minoritaire (CNPJ 07.059.083/0001-33, Tibau do Sul/RN)",
                quotas: 3330000,
                val_nominal: "0,01 R$",
                capital_brl: 33300.00,
                pct: 0.303167,
                bo: "Ricardo Pimentel Portela de Moraes (CPF 010.236.884-84)"
            }
        ],

        asset_details: {
            resort_name: "Sombra SPA - Eco Luxury & Wellness Sanctuary",
            category: "Boutique Resort & Spa 5 Étoiles",
            total_land_area_sqm: 14500,
            built_area_sqm: 3850,
            units_count: 22,
            units_breakdown: [
                { type: "Master Chalet avec Piscine Privée", count: 6, size: "95 m²" },
                { type: "Deluxe Ocean View Bungalow", count: 10, size: "70 m²" },
                { type: "Garden Wellness Suite", count: 6, size: "55 m²" }
            ],
            amenities: [
                "Centre SPA Holistique & Massothérapie (8 cabines)",
                "Piscine à débordement chauffée avec vue panoramique",
                "Restaurant Gastronomique Éco-Bio & Lounge Bar",
                "Pavillon de Yoga & Méditation en bois noble",
                "Accès direct plage et sentiers écologiques privatifs"
            ],
            cadastre_matricula: "Cartório Único de Tibau do Sul - Matrícula N° 12.485",
            environmental_license: "Licença de Operação IDEMA N° 2024/098-RN",
            cadastur: "CADASTUR Ministério do Turismo N° 24.089.112/0001-90",
            asset_valuation_eur: 6500000.00,
            asset_valuation_brl: 38220000.00
        },

        financial_kpis: {
            currency: "BRL (R$)",
            fx_rate_eur_brl: 5.88,
            annual_interest_revenue_eur: 35780.05,
            annual_revenue_projected_brl: 4800000.00,
            annual_ebitda_projected_brl: 1850000.00,
            ebitda_margin_pct: 38.5,
            adr_daily_rate_brl: 1250.00,
            occupancy_rate_avg_pct: 71.2
        },
        status: "active",
        status_label: "Actif Opérationnel (Filiale Contrôlée à 99,09%)",
        notes: "Société brésilienne détenant les actifs immobiliers et l'exploitation de l'hôtel-resort Sombra SPA à Praia de Pipa. La holding Watergarden Management Sàrl détient 99,09% des parts et consent des avances en compte courant productives d'intérêts (7%) pour financer les extensions CAPEX."
    }
];
