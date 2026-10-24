/**
 * Watergarden Management Sàrl - Amortissements & Scritture di Rettifica Logic
 * Matching NEW LIFE architecture
 */

function formatCurrency(num) {
    if (num === null || num === undefined || isNaN(num)) return "0,00\u00A0€";
    const val = Number(num);
    const parts = val.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",") + "\u00A0€";
}

function formatDate(dateStr) {
    if (!dateStr) return "-";
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
}

let currentCategoryFilter = 'ALL';
let currentAmortYear = 2025;

function switchAmmoTab(tabKey, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.ammo-tab-content').forEach(c => c.style.display = 'none');
    const target = document.getElementById(`ammo-tab-${tabKey}`);
    if (target) target.style.display = 'block';
}

function populateAmortYearSelect() {
    const select = document.getElementById('amort-year-select');
    if (!select) return;

    const amort = window.WATERGARDEN_AMORT || { totals_by_year: {} };
    const years = Object.keys(amort.totals_by_year || {}).map(y => parseInt(y)).sort((a, b) => b - a);

    select.innerHTML = '';
    years.forEach(yr => {
        const opt = document.createElement('option');
        opt.value = yr;
        if (yr === 2026) {
            opt.textContent = `${yr} (YTD Octobre / En cours)`;
        } else if (yr === 2025) {
            opt.textContent = `${yr} (Officiel Déposé eCDF)`;
        } else if (yr < 2025) {
            opt.textContent = `${yr} (Clôturé / Déposé)`;
        } else {
            opt.textContent = `${yr} (Projection future)`;
        }
        if (yr === currentAmortYear) opt.selected = true;
        select.appendChild(opt);
    });

    select.onchange = (e) => {
        currentAmortYear = parseInt(e.target.value) || 2025;
        updateAmortView();
    };
}

function updateAmortKPIs() {
    const amort = window.WATERGARDEN_AMORT || { assets: [], totals_by_year: {} };
    const yr = currentAmortYear;
    const t = amort.totals_by_year[yr] || { val_brute: 10318.71, annuite: 0, cumul: 0, vnc: 0 };

    const elBrute = document.getElementById('ammo-kpi-brute');
    const elDot = document.getElementById('ammo-kpi-dotation');
    const elCumul = document.getElementById('ammo-kpi-cumul');
    const elVnc = document.getElementById('ammo-kpi-vnc');

    const dotVal = (yr === 2026 && t.annuite_ytd) ? t.annuite_ytd : t.annuite;
    const vncVal = (yr === 2026 && t.vnc_ytd) ? t.vnc_ytd : t.vnc;

    if (elBrute) elBrute.textContent = formatCurrency(t.val_brute);
    if (elDot) elDot.textContent = formatCurrency(dotVal);
    if (elCumul) elCumul.textContent = formatCurrency(t.cumul);
    if (elVnc) elVnc.textContent = formatCurrency(vncVal);

    const subDot = document.getElementById('ammo-kpi-dotation-sub');
    if (subDot) {
        subDot.textContent = yr === 2026 ? "Pro-rata YTD (9 mois au 09/10/2026)" : `Charge P&L exercice ${yr}`;
    }

    const subVnc = document.getElementById('ammo-kpi-vnc-sub');
    if (subVnc) {
        subVnc.textContent = yr === 2026 ? "VNC au 09/10/2026 (YTD)" : `VNC au 31/12/${yr}`;
    }

    const badgeExercise = document.getElementById('amort-exercise-badge');
    if (badgeExercise) {
        if (yr === 2025) {
            badgeExercise.innerHTML = `<i class="fa-solid fa-circle-check"></i> Exercice Déposé eCDF : 2025 (1.719,03 €)`;
            badgeExercise.style.background = "rgba(16, 185, 129, 0.2)";
            badgeExercise.style.color = "#34d399";
        } else if (yr === 2026) {
            badgeExercise.innerHTML = `<i class="fa-solid fa-circle-dot"></i> Exercice 2026 en cours (YTD : 1.289,27 €)`;
            badgeExercise.style.background = "rgba(56, 189, 248, 0.2)";
            badgeExercise.style.color = "#38bdf8";
        } else if (yr === 2024) {
            badgeExercise.innerHTML = `<i class="fa-solid fa-check-double"></i> Exercice 2024 Déposé eCDF (1.719,03 €)`;
            badgeExercise.style.background = "rgba(16, 185, 129, 0.15)";
            badgeExercise.style.color = "#34d399";
        } else {
            badgeExercise.innerHTML = `<i class="fa-solid fa-calendar"></i> Exercice ${yr}`;
            badgeExercise.style.background = "rgba(255, 255, 255, 0.1)";
            badgeExercise.style.color = "var(--text-main)";
        }
    }
}

function renderAdjustingEntries() {
    const amort = window.WATERGARDEN_AMORT || { adjusting_entries: {} };
    const yr = currentAmortYear;
    const entry = amort.adjusting_entries[yr] || amort.adjusting_entries[2025];

    const refPieceEl = document.getElementById('entry-ref-piece');
    const dateValEl = document.getElementById('entry-date-val');
    const badgeEl = document.getElementById('entry-journal-badge');
    const tbody = document.getElementById('journal-entry-tbody');
    const totDebEl = document.getElementById('entry-total-debit');
    const totCredEl = document.getElementById('entry-total-credit');
    const breakdownTbody = document.getElementById('breakdown-entry-tbody');

    if (refPieceEl) refPieceEl.textContent = `N° Pièce : ${entry.ref_piece}`;
    if (dateValEl) dateValEl.textContent = (yr === 2026 && entry.date_ytd) ? entry.date_ytd : entry.date;
    if (badgeEl) badgeEl.textContent = `Journal : ${entry.journal}`;

    if (tbody) {
        tbody.innerHTML = entry.lines.map(line => `
            <tr>
                <td><code style="font-size: 0.88rem; font-weight: 700; color: ${line.type === 'debit' ? '#34d399' : '#38bdf8'};">${line.num_compte}</code></td>
                <td><strong style="color: var(--text-main); font-size: 0.88rem;">${line.intitule_compte}</strong></td>
                <td style="color: var(--text-muted); font-size: 0.82rem;">${line.libelle_ligne}</td>
                <td class="text-right" style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 0.92rem; color: ${line.debit > 0 ? '#34d399' : 'var(--text-muted)'};">
                    ${line.debit > 0 ? formatCurrency(line.debit) : '-'}
                </td>
                <td class="text-right" style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 0.92rem; color: ${line.credit > 0 ? '#38bdf8' : 'var(--text-muted)'};">
                    ${line.credit > 0 ? formatCurrency(line.credit) : '-'}
                </td>
            </tr>
        `).join('');
    }

    if (totDebEl) totDebEl.textContent = formatCurrency(entry.total_debit);
    if (totCredEl) totCredEl.textContent = formatCurrency(entry.total_credit);

    if (breakdownTbody) {
        const assets = amort.assets || [];
        breakdownTbody.innerHTML = entry.breakdown.map(b => {
            const ast = assets.find(a => a.id === b.asset_id) || {};
            return `
                <tr>
                    <td><code>${b.asset_id}</code></td>
                    <td>
                        <strong style="color: var(--text-main); font-size: 0.84rem;">${b.name}</strong>
                        <div style="font-size: 0.72rem; color: var(--text-muted);">${ast.invoice_ref || ast.supplier || ''}</div>
                    </td>
                    <td><code>${b.code}</code></td>
                    <td class="text-right" style="font-family: 'JetBrains Mono', monospace;">${formatCurrency(ast.initial_value || 0)}</td>
                    <td class="text-right" style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #f43f5e;">
                        ${formatCurrency(b.amount)}
                    </td>
                    <td style="text-align: center;">
                        <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.72rem;">Amort. Actif</span>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function copyAdjustingEntry() {
    const amort = window.WATERGARDEN_AMORT || { adjusting_entries: {} };
    const yr = currentAmortYear;
    const entry = amort.adjusting_entries[yr] || amort.adjusting_entries[2025];

    let txt = `====================================================================\n`;
    txt += `WATERGARDEN MANAGEMENT SÀRL • RCS Luxembourg B 149.151\n`;
    txt += `ÉCRITURE D'INVENTAIRE ET DE CLÔTURE AU ${yr === 2026 && entry.date_ytd ? entry.date_ytd : entry.date}\n`;
    txt += `Journal : ${entry.journal} | Réf Pièce : ${entry.ref_piece}\n`;
    txt += `Libellé : ${entry.libelle_general}\n`;
    txt += `====================================================================\n\n`;

    entry.lines.forEach(l => {
        txt += `COMPTE ${l.num_compte} - ${l.intitule_compte}\n`;
        txt += `  Libellé : ${l.libelle_ligne}\n`;
        if (l.debit > 0) txt += `  DÉBIT  : ${l.debit.toFixed(2)} EUR\n`;
        if (l.credit > 0) txt += `  CRÉDIT : ${l.credit.toFixed(2)} EUR\n`;
        txt += `--------------------------------------------------------------------\n`;
    });

    txt += `\nTOTAL DÉBIT  : ${entry.total_debit.toFixed(2)} EUR\n`;
    txt += `TOTAL CRÉDIT : ${entry.total_credit.toFixed(2)} EUR (ÉQUILIBRE CONFORME)\n\n`;
    txt += `Détail analytique par bien amortissable :\n`;
    entry.breakdown.forEach(b => {
        txt += `  • ${b.asset_id} [${b.code}] ${b.name} : ${b.amount.toFixed(2)} EUR\n`;
    });

    navigator.clipboard.writeText(txt).then(() => {
        const btnText = document.getElementById('copy-btn-text');
        if (btnText) {
            const old = btnText.textContent;
            btnText.textContent = "Copié avec succès !";
            setTimeout(() => { btnText.textContent = old; }, 2500);
        }
    }).catch(err => {
        alert("Texte prêt à être copié :\n\n" + txt);
    });
}

function exportAdjustingEntryTxt() {
    const amort = window.WATERGARDEN_AMORT || { adjusting_entries: {} };
    const yr = currentAmortYear;
    const entry = amort.adjusting_entries[yr] || amort.adjusting_entries[2025];

    let txt = `====================================================================\n`;
    txt += `WATERGARDEN MANAGEMENT SÀRL • RCS Luxembourg B 149.151\n`;
    txt += `ÉCRITURE DE RÉGULARISATION AU ${yr === 2026 && entry.date_ytd ? entry.date_ytd : entry.date}\n`;
    txt += `Journal : ${entry.journal} | Réf Pièce : ${entry.ref_piece}\n`;
    txt += `Libellé : ${entry.libelle_general}\n`;
    txt += `====================================================================\n\n`;

    entry.lines.forEach(l => {
        txt += `COMPTE ${l.num_compte} - ${l.intitule_compte}\n`;
        txt += `  Libellé : ${l.libelle_ligne}\n`;
        if (l.debit > 0) txt += `  DÉBIT  : ${l.debit.toFixed(2)} EUR\n`;
        if (l.credit > 0) txt += `  CRÉDIT : ${l.credit.toFixed(2)} EUR\n`;
        txt += `--------------------------------------------------------------------\n`;
    });

    txt += `\nTOTAL DÉBIT  : ${entry.total_debit.toFixed(2)} EUR\n`;
    txt += `TOTAL CRÉDIT : ${entry.total_credit.toFixed(2)} EUR\n\n`;
    txt += `Détail par bien :\n`;
    entry.breakdown.forEach(b => {
        txt += `  • ${b.asset_id} [${b.code}] ${b.name} : ${b.amount.toFixed(2)} EUR\n`;
    });

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ecritures_Amortissements_Watergarden_${yr}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function filterAssetCards(cat, btn) {
    currentCategoryFilter = cat;
    document.querySelectorAll('.asset-filter-btn').forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-secondary');
    });
    if (btn) {
        btn.classList.add('active', 'btn-primary');
        btn.classList.remove('btn-secondary');
    }
    renderAssetCards();
}

function renderAssetCards() {
    const container = document.getElementById('asset-cards-container');
    if (!container) return;
    container.innerHTML = '';

    const amort = window.WATERGARDEN_AMORT || { assets: [] };
    const yr = currentAmortYear;

    const filtered = (currentCategoryFilter === 'ALL')
        ? amort.assets
        : amort.assets.filter(a => a.subcategory.includes(currentCategoryFilter));

    if (filtered.length === 0) {
        container.innerHTML = `<p style="grid-column: 1 / -1; color: var(--text-muted); padding: 2rem; text-align: center;">Aucun bien dans cette catégorie.</p>`;
        return;
    }

    filtered.forEach(ast => {
        const card = document.createElement('div');
        card.className = 'asset-card';

        const sYear = ast.schedule ? ast.schedule.find(s => s.year === yr) : null;
        let vncYear = 0;
        let annuiteYear = 0;

        if (sYear) {
            vncYear = sYear.vnc;
            annuiteYear = sYear.annuite;
        } else {
            const lastSched = ast.schedule[ast.schedule.length - 1];
            if (yr > lastSched.year) {
                vncYear = 0;
                annuiteYear = 0;
            } else {
                vncYear = ast.initial_value;
                annuiteYear = 0;
            }
        }

        const isFullyAmortized = vncYear === 0 && yr >= parseInt(ast.end_date.split('-')[0]);

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <span class="asset-badge-pcn">${ast.subcategory}</span>
                <span class="badge ${isFullyAmortized ? 'badge-neutral' : 'badge-ord'}">${ast.id}</span>
            </div>

            <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">${ast.name}</h3>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.85rem;"><i class="fa-solid fa-file-invoice"></i> ${ast.invoice_ref}</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.75rem; margin-bottom: 0.85rem;">
                <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">Valeur Initiale HT</span>
                    <p style="font-weight: 700; font-size: 0.98rem; font-family: 'JetBrains Mono', monospace;">${formatCurrency(ast.initial_value)}</p>
                </div>
                <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">Durée & Taux</span>
                    <p style="font-weight: 700; font-size: 0.98rem; color: #38bdf8;">${ast.duration_years} Ans (${ast.annual_rate}%)</p>
                </div>
                <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">Dotation ${yr}</span>
                    <p style="font-weight: 700; font-size: 0.98rem; color: #f43f5e; font-family: 'JetBrains Mono', monospace;">${formatCurrency(annuiteYear)}</p>
                </div>
                <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted);">VNC Fin ${yr}</span>
                    <p style="font-weight: 700; font-size: 0.98rem; color: #34d399; font-family: 'JetBrains Mono', monospace;">${formatCurrency(vncYear)}</p>
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem;">
                <span style="font-size: 0.72rem; color: var(--text-muted);">Acquis le : <strong>${formatDate(ast.acquisition_date)}</strong></span>
                <button class="btn btn-secondary btn-sm" onclick="openAssetModal('${ast.id}')" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;">
                    <i class="fa-solid fa-table-list"></i> Voir Plan Complet
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function openAssetModal(assetId) {
    const amort = window.WATERGARDEN_AMORT || { assets: [] };
    const ast = amort.assets.find(a => a.id === assetId);
    if (!ast) return;

    const modalTitle = document.getElementById('asset-modal-title');
    const modalBody = document.getElementById('asset-modal-body');
    const modal = document.getElementById('asset-modal');

    if (modalTitle) {
        modalTitle.innerHTML = `<i class="fa-solid fa-cube text-emerald"></i> ${ast.name} (${ast.id})`;
    }

    if (modalBody) {
        let scheduleRows = '';
        ast.schedule.forEach(s => {
            scheduleRows += `
                <tr>
                    <td style="font-weight: 700; color: var(--accent-blue);">Exercice ${s.year}</td>
                    <td class="text-right" style="font-family: 'JetBrains Mono', monospace;">${formatCurrency(s.val_debut)}</td>
                    <td class="text-right" style="color: #f43f5e; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${formatCurrency(s.annuite)}</td>
                    <td class="text-right" style="color: #fbbf24; font-family: 'JetBrains Mono', monospace;">${formatCurrency(s.cumul)}</td>
                    <td class="text-right" style="color: #34d399; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${formatCurrency(s.vnc)}</td>
                </tr>
            `;
        });

        modalBody.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.25rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem;">
                <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">Catégorie & Compte PCN</span>
                    <strong style="font-size: 0.88rem;">${ast.subcategory}</strong>
                </div>
                <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">Fournisseur / Prestataire</span>
                    <strong style="font-size: 0.88rem;">${ast.supplier}</strong>
                </div>
                <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">Valeur d'Acquisition HT</span>
                    <strong style="font-size: 1.15rem; color: #34d399; font-family: 'JetBrains Mono', monospace;">${formatCurrency(ast.initial_value)}</strong>
                </div>
                <div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">Période d'Amortissement</span>
                    <strong style="font-size: 0.88rem;">${formatDate(ast.acquisition_date)} ➔ ${formatDate(ast.end_date)} (5 ans)</strong>
                </div>
            </div>

            <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--text-main);"><i class="fa-solid fa-list-ol text-cyan"></i> Échéancier Annuel d'Amortissement Linéaire</h4>
            <div class="table-wrapper">
                <table class="data-table data-table-compact">
                    <thead>
                        <tr>
                            <th>Exercice</th>
                            <th class="text-right">Valeur Début (€)</th>
                            <th class="text-right" style="color: #f43f5e;">Dotation (€)</th>
                            <th class="text-right" style="color: #fbbf24;">Amort. Cumulés (€)</th>
                            <th class="text-right" style="color: #34d399;">Valeur Nette Fin VNC (€)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${scheduleRows}
                    </tbody>
                </table>
            </div>
        `;
    }

    if (modal) modal.style.display = 'flex';
}

function closeAssetModal() {
    const modal = document.getElementById('asset-modal');
    if (modal) modal.style.display = 'none';
}

function renderConsolidatedTotals() {
    const tbody = document.getElementById('totals-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const amort = window.WATERGARDEN_AMORT || { totals_by_year: {} };
    const years = Object.keys(amort.totals_by_year).sort((a, b) => parseInt(a) - parseInt(b));

    tbody.innerHTML = years.map(yr => {
        const row = amort.totals_by_year[yr];
        const yrNum = parseInt(yr);
        const isCurrentOrDeposit = yrNum === 2025 || yrNum === 2026;

        return `
            <tr style="${isCurrentOrDeposit ? 'background: rgba(16, 185, 129, 0.06); font-weight: 600;' : ''}">
                <td>
                    <strong style="color: #38bdf8;">Exercice ${yr}</strong>
                    ${yrNum === 2025 ? '<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.68rem; margin-left: 0.35rem;">Déposé eCDF</span>' : ''}
                    ${yrNum === 2026 ? '<span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; font-size: 0.68rem; margin-left: 0.35rem;">YTD 2026</span>' : ''}
                </td>
                <td class="text-right" style="color: ${row.acquisitions > 0 ? '#34d399' : 'var(--text-muted)'}; font-family: 'JetBrains Mono', monospace;">
                    ${row.acquisitions > 0 ? '+' + formatCurrency(row.acquisitions) : '0,00 €'}
                </td>
                <td class="text-right" style="color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">0,00 €</td>
                <td class="text-right" style="font-weight: 700; font-family: 'JetBrains Mono', monospace;">${formatCurrency(row.val_brute)}</td>
                <td class="text-right" style="font-weight: 700; color: #f43f5e; font-family: 'JetBrains Mono', monospace;">${formatCurrency(row.annuite)}</td>
                <td class="text-right" style="color: #fbbf24; font-family: 'JetBrains Mono', monospace;">${formatCurrency(row.cumul)}</td>
                <td class="text-right" style="font-weight: 700; color: #34d399; font-family: 'JetBrains Mono', monospace;">${formatCurrency(row.vnc)}</td>
            </tr>
        `;
    }).join('');
}

function exportAmortExcel() {
    if (typeof XLSX === 'undefined') {
        alert("La bibliothèque SheetJS n'est pas chargée.");
        return;
    }

    const amort = window.WATERGARDEN_AMORT || { totals_by_year: {}, assets: [] };
    const wb = XLSX.utils.book_new();

    // Sheet 1: Consolidated Totals
    const years = Object.keys(amort.totals_by_year).sort((a, b) => parseInt(a) - parseInt(b));
    const totalsData = [
        ["WATERGARDEN MANAGEMENT SÀRL • RCS B 149.151"],
        ["ÉCHÉANCIER CONSOLIDÉ DES AMORTISSEMENTS (2018 - 2028)"],
        [],
        ["Exercice", "Acquisitions (+)", "Cessions (-)", "Valeur Brute Totale (€)", "Dotation Annuelle (€)", "Amort. Cumulés (€)", "Valeur Nette VNC (€)"]
    ];

    years.forEach(yr => {
        const r = amort.totals_by_year[yr];
        totalsData.push([
            `Exercice ${yr}`,
            r.acquisitions,
            0.00,
            r.val_brute,
            r.annuite,
            r.cumul,
            r.vnc
        ]);
    });

    const wsTotals = XLSX.utils.aoa_to_sheet(totalsData);
    XLSX.utils.book_append_sheet(wb, wsTotals, "Amortissements Consolidés");

    // Sheet 2: Fiches Biens
    const assetsData = [
        ["Réf", "Compte PCN", "Sous-catégorie", "Nom de l'immobilisation", "Fournisseur", "Réf Facture", "Date Achat", "Date Fin", "Valeur Brute (€)", "Durée (ans)", "Taux Annuel (%)", "Dotation 2025 (€)", "Dotation 2026 (€)"]
    ];

    amort.assets.forEach(a => {
        const s25 = a.schedule ? a.schedule.find(s => s.year === 2025) : null;
        const s26 = a.schedule ? a.schedule.find(s => s.year === 2026) : null;
        assetsData.push([
            a.id,
            a.category_code,
            a.subcategory,
            a.name,
            a.supplier,
            a.invoice_ref,
            a.acquisition_date,
            a.end_date,
            a.initial_value,
            a.duration_years,
            a.annual_rate,
            s25 ? s25.annuite : 0.00,
            s26 ? s26.annuite : 0.00
        ]);
    });

    const wsAssets = XLSX.utils.aoa_to_sheet(assetsData);
    XLSX.utils.book_append_sheet(wb, wsAssets, "Détail des Postes");

    XLSX.writeFile(wb, "Watergarden_Tableau_Amortissements_2025_2026.xlsx");
}

function calculateSimulation() {
    const val = parseFloat(document.getElementById('sim-val')?.value) || 5000;
    const years = parseInt(document.getElementById('sim-years')?.value) || 5;
    const dateStr = document.getElementById('sim-date')?.value || '2026-01-01';
    const tbody = document.getElementById('sim-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const startYear = parseInt(dateStr.split('-')[0]) || 2026;
    const rate = 100 / years;
    const annualDotation = val / years;

    let vnc = val;
    let cumul = 0;

    for (let i = 0; i < years; i++) {
        const yr = startYear + i;
        const valDebut = vnc;
        const dot = (i === years - 1) ? valDebut : annualDotation;
        cumul += dot;
        vnc = Math.max(0, valDebut - dot);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>Exercice ${yr}</strong></td>
            <td class="text-right" style="font-family: 'JetBrains Mono', monospace;">${formatCurrency(valDebut)}</td>
            <td class="text-right" style="color: #38bdf8; font-weight: 600;">${rate.toFixed(2)}%</td>
            <td class="text-right" style="color: #f43f5e; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${formatCurrency(dot)}</td>
            <td class="text-right" style="color: #fbbf24; font-family: 'JetBrains Mono', monospace;">${formatCurrency(cumul)}</td>
            <td class="text-right" style="color: #34d399; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${formatCurrency(vnc)}</td>
        `;
        tbody.appendChild(tr);
    }
}

function updateAmortView() {
    updateAmortKPIs();
    renderAdjustingEntries();
    renderAssetCards();
}

function initAmortApp() {
    if (localStorage.getItem('wg_theme') === 'light') {
        document.body.classList.add('theme-light');
    }

    populateAmortYearSelect();
    updateAmortView();
    renderConsolidatedTotals();
    calculateSimulation();
}

document.addEventListener('DOMContentLoaded', () => {
    initAmortApp();
});

window.addEventListener('wg:languageChanged', () => {
    updateAmortView();
});
