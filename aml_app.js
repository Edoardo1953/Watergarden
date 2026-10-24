/**
 * Watergarden Management Sàrl - Logique AML / LBC-FT & Simulateur de Risque
 */

function formatCurrency(val) {
    if (val === null || val === undefined || isNaN(val)) return "0,00 €";
    const num = Number(val);
    const parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",") + " €";
}

function initAmlApp() {
    if (!window.WATERGARDEN_AML) return;
    renderAmlInvestorsTable(window.WATERGARDEN_AML.investor_kyc_registry);
}

function renderAmlInvestorsTable(investors) {
    const tbody = document.getElementById('aml-investors-tbody');
    if (!tbody || !investors) return;

    tbody.innerHTML = '';
    investors.forEach(inv => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = () => openKycModal(inv);

        tr.innerHTML = `
            <td>
                <strong>${inv.name}</strong>
            </td>
            <td><span class="badge badge-neutral" style="font-size: 0.72rem;">${inv.role} (${inv.detention})</span></td>
            <td class="text-right text-bold">${formatCurrency(inv.capital)}</td>
            <td>${inv.residence}</td>
            <td style="font-size: 0.8rem; color: var(--text-muted);">${inv.funds_origin}</td>
            <td class="text-center">
                <span class="badge badge-success" style="font-size: 0.75rem; font-weight: 700;">${typeof t === 'function' ? t('aml_score_lbl') : 'Score :'} ${inv.risk_score}</span>
            </td>
            <td class="text-center">
                <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.72rem;">${typeof t === 'function' ? t('aml_clean_badge') : 'Conforme / Non-PEP'}</span>
            </td>
            <td class="text-center">
                <button class="btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="event.stopPropagation(); openKycModal(${JSON.stringify(inv).replace(/"/g, '&quot;')})">
                    <i class="fa-solid fa-folder-open"></i> ${typeof t === 'function' ? t('aml_btn_dossier') : 'Dossier'}
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openKycModal(inv) {
    const modal = document.getElementById('kycModal');
    const nameEl = document.getElementById('kyc-modal-name');
    const contentEl = document.getElementById('kyc-modal-content');
    if (!modal || !contentEl) return;

    nameEl.innerHTML = `<i class="fa-solid fa-shield-halved text-emerald"></i> ${typeof t === 'function' ? t('aml_modal_kyc_prefix') : 'Dossier KYC :'} ${inv.name}`;

    contentEl.innerHTML = `
        <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <span style="color: var(--text-muted);">${typeof t === 'function' ? t('aml_lbl_role') : 'Qualité :'}</span>
                <strong>${inv.role}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <span style="color: var(--text-muted);">${typeof t === 'function' ? t('aml_lbl_participation') : 'Participation :'}</span>
                <strong style="color: #34d399;">${inv.detention} (${formatCurrency(inv.capital)})</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <span style="color: var(--text-muted);">${typeof t === 'function' ? t('aml_lbl_residence') : 'Résidence fiscale :'}</span>
                <span>${inv.residence}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">${typeof t === 'function' ? t('aml_lbl_source_funds') : 'Source déclarée des fonds :'}</span>
                <span>${inv.funds_origin}</span>
            </div>
        </div>

        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-top: 0.5rem;">
            <i class="fa-solid fa-file-shield text-emerald"></i> ${typeof t === 'function' ? t('aml_lbl_verified_docs') : 'Pièces Justificatives Vérifiées'}
        </h4>

        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 0.5rem 0.75rem; border-radius: 6px;">
                <span>${typeof t === 'function' ? t('aml_doc_id') : "Pièce d'Identité Officielle (Passeport/CNI) :"}</span>
                <span class="badge badge-success"><i class="fa-solid fa-check"></i> ${inv.docs_status.id_card}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 0.5rem 0.75rem; border-radius: 6px;">
                <span>${typeof t === 'function' ? t('aml_doc_address') : 'Justificatif de Domicile Récent :'}</span>
                <span class="badge badge-success"><i class="fa-solid fa-check"></i> ${inv.docs_status.proof_address}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 0.5rem 0.75rem; border-radius: 6px;">
                <span>${typeof t === 'function' ? t('aml_doc_origin') : "Attestation d'Origine des Fonds :"}</span>
                <span class="badge badge-success"><i class="fa-solid fa-check"></i> ${inv.docs_status.source_of_funds}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 0.5rem 0.75rem; border-radius: 6px;">
                <span>${typeof t === 'function' ? t('aml_doc_rbe') : 'Déclaration RBE (Bénéficiaire Effectif) :'}</span>
                <span class="badge badge-success"><i class="fa-solid fa-check"></i> ${inv.docs_status.rbe_declaration}</span>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeKycModal() {
    const modal = document.getElementById('kycModal');
    if (modal) modal.style.display = 'none';
}

function calculateAmlRisk(e) {
    e.preventDefault();
    const pType = parseInt(document.getElementById('sim-person-type').value, 10);
    const pep = parseInt(document.getElementById('sim-pep').value, 10);
    const amt = parseInt(document.getElementById('sim-amount').value, 10);
    const geo = parseInt(document.getElementById('sim-funds-geo').value, 10);

    const totalScore = Math.min(100, pType + pep + amt + geo);

    const scoreNum = document.getElementById('sim-score-num');
    const scoreCircle = document.getElementById('sim-score-circle');
    const levelTitle = document.getElementById('sim-level-title');
    const levelDesc = document.getElementById('sim-level-desc');

    if (scoreNum) scoreNum.textContent = totalScore;

    if (totalScore <= 30) {
        scoreCircle.style.borderColor = '#10b981';
        scoreCircle.style.background = 'rgba(16, 185, 129, 0.1)';
        scoreNum.style.color = '#10b981';
        levelTitle.textContent = typeof t === 'function' ? t('aml_risk_low_title') : "RISQUE FAIBLE (Low Risk)";
        levelTitle.style.color = '#10b981';
        levelDesc.textContent = typeof t === 'function' ? t('aml_risk_low_desc') : "Mesures de vigilance normale / standard : pièce d'identité certifiée en cours de validité, justificatif d'adresse et vérification sur listes sanctions.";
    } else if (totalScore <= 60) {
        scoreCircle.style.borderColor = '#f59e0b';
        scoreCircle.style.background = 'rgba(245, 158, 11, 0.1)';
        scoreNum.style.color = '#f59e0b';
        levelTitle.textContent = typeof t === 'function' ? t('aml_risk_med_title') : "RISQUE MODÉRÉ (Medium Risk)";
        levelTitle.style.color = '#f59e0b';
        levelDesc.textContent = typeof t === 'function' ? t('aml_risk_med_desc') : "Mesures de vigilance standard renforcée : attestation bancaire détaillée sur l'origine du patrimoine et mise à jour annuelle du dossier KYC.";
    } else {
        scoreCircle.style.borderColor = '#f43f5e';
        scoreCircle.style.background = 'rgba(244, 63, 94, 0.1)';
        scoreNum.style.color = '#f43f5e';
        levelTitle.textContent = typeof t === 'function' ? t('aml_risk_high_title') : "RISQUE ÉLEVÉ (High Risk / EDD)";
        levelTitle.style.color = '#f43f5e';
        levelDesc.textContent = typeof t === 'function' ? t('aml_risk_high_desc') : "Due Diligence Approfondie (EDD) obligatoire : approbation formelle de la Gérance, traçabilité complète de la chaîne de propriété et déclaration préalable si nécessaire.";
    }
}

function switchAmlTab(tabKey, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.aml-tab-content').forEach(c => c.style.display = 'none');
    const target = document.getElementById(`aml-tab-${tabKey}`);
    if (target) target.style.display = 'block';
}

function toggleTheme() {
    document.body.classList.toggle('theme-light');
    const isLight = document.body.classList.contains('theme-light');
    localStorage.setItem('wg_theme', isLight ? 'light' : 'dark');
}

function refreshAppGlobalData(btn) {
    if (btn) {
        btn.querySelector('i')?.classList.add('fa-spin');
        setTimeout(() => {
            btn.querySelector('i')?.classList.remove('fa-spin');
            window.location.reload();
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('wg_theme') === 'light') {
        document.body.classList.add('theme-light');
    }
    initAmlApp();
});

window.addEventListener('wg:languageChanged', () => {
    initAmlApp();
    // Also re-trigger risk sim texts if sim has run
    const simForm = document.getElementById('aml-risk-form');
    if (simForm) {
        const dummyEvt = { preventDefault: () => {} };
        calculateAmlRisk(dummyEvt);
    }
});

