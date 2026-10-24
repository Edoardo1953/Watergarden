/**
 * Watergarden Management Sàrl - Logique Bancaire (Olky Pay & Revolut Business)
 */

let activeBankFilter = 'all';
let bankRecords = [];

function formatCurrency(val) {
    if (val === null || val === undefined || isNaN(val)) return "0,00 €";
    const num = Number(val);
    const parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",") + " €";
}

function getAllRecords() {
    let base = [];
    if (window.WATERGARDEN_DATA && Array.isArray(window.WATERGARDEN_DATA.records)) {
        base = [...window.WATERGARDEN_DATA.records];
    }
    try {
        const custom = localStorage.getItem('wg_custom_records');
        if (custom) {
            const parsed = JSON.parse(custom);
            if (Array.isArray(parsed)) {
                base = base.concat(parsed);
            }
        }
    } catch (e) {
        console.error("Error loading custom records:", e);
    }
    return base;
}

function initBancaApp() {
    bankRecords = getAllRecords();
    populateCategoryFilter();
    updateBankKPIs();
    renderTransactionsTable();
}

function populateCategoryFilter() {
    const catSelect = document.getElementById('bank-category-select');
    if (!catSelect) return;

    const cats = Array.from(new Set(bankRecords.map(r => r.category).filter(Boolean))).sort();
    catSelect.innerHTML = `<option value="">${typeof t === 'function' ? t('filter_all_categories') : 'Toutes les catégories'}</option>`;
    cats.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        catSelect.appendChild(opt);
    });
}

function updateBankKPIs(recordsToSummarize = bankRecords) {
    const olkyBal = 11440.97;
    const revBal = 652.25;
    let totalEntrees = 0;
    let totalSorties = 0;

    recordsToSummarize.forEach(r => {
        const amt = Number(r.amount) || 0;
        if (amt > 0) totalEntrees += amt;
        else totalSorties += Math.abs(amt);
    });

    const olkyEl = document.getElementById('olky-balance-display');
    if (olkyEl) olkyEl.textContent = formatCurrency(olkyBal);

    const revEl = document.getElementById('revolut-balance-display');
    if (revEl) revEl.textContent = formatCurrency(revBal);

    const globEl = document.getElementById('global-treasury-display');
    if (globEl) globEl.textContent = formatCurrency(olkyBal + revBal);

    const inEl = document.getElementById('kpi-entrees-total');
    if (inEl) inEl.textContent = "+" + formatCurrency(totalEntrees);

    const outEl = document.getElementById('kpi-sorties-total');
    if (outEl) outEl.textContent = "-" + formatCurrency(totalSorties);
}

function filterByBankTab(bankKey, btn) {
    activeBankFilter = bankKey;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    applyBankFilters();
}

function applyBankFilters() {
    const searchVal = (document.getElementById('bank-search-input')?.value || '').toLowerCase().trim();
    const yearVal = document.getElementById('bank-year-select')?.value || '';
    const catVal = document.getElementById('bank-category-select')?.value || '';
    const typeVal = document.getElementById('bank-type-select')?.value || '';

    const filtered = bankRecords.filter(r => {
        // Bank tab
        if (activeBankFilter !== 'all' && r.bank !== activeBankFilter) return false;

        // Year filter
        if (yearVal && !r.date.startsWith(yearVal)) return false;

        // Search text
        if (searchVal) {
            const str = `${r.description || ''} ${r.party || ''} ${r.pcn_code || ''} ${r.category || ''} ${r.date || ''}`.toLowerCase();
            if (!str.includes(searchVal)) return false;
        }

        // Category
        if (catVal && r.category !== catVal) return false;

        // Type
        if (typeVal === 'credit' && r.amount < 0) return false;
        if (typeVal === 'debit' && r.amount >= 0) return false;

        return true;
    });

    renderTransactionsTable(filtered);
    updateBankKPIs(filtered);
}

function resetBankFilters() {
    if (document.getElementById('bank-search-input')) document.getElementById('bank-search-input').value = '';
    if (document.getElementById('bank-year-select')) document.getElementById('bank-year-select').value = '';
    if (document.getElementById('bank-category-select')) document.getElementById('bank-category-select').value = '';
    if (document.getElementById('bank-type-select')) document.getElementById('bank-type-select').value = '';
    activeBankFilter = 'all';
    document.querySelectorAll('.tab-btn').forEach((b, i) => {
        if (i === 0) b.classList.add('active');
        else b.classList.remove('active');
    });
    applyBankFilters();
}

function renderTransactionsTable(recordsToRender = bankRecords) {
    const tbody = document.getElementById('bank-records-tbody');
    const badge = document.getElementById('records-count-badge');
    if (!tbody) return;

    if (badge) badge.textContent = `${recordsToRender.length} ${typeof t === 'function' ? t('banca_records_count') : 'opération(s)'}`;

    tbody.innerHTML = '';
    if (recordsToRender.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 2rem;">${typeof t === 'function' ? t('banca_no_records') : 'Aucun mouvement trouvé.'}</td></tr>`;
        return;
    }

    // Sort descending by date
    const sorted = [...recordsToRender].sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach(r => {
        const tr = document.createElement('tr');
        const isCredit = r.amount >= 0;
        const isOlky = r.bank === 'olky';

        tr.innerHTML = `
            <td style="font-size: 0.82rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">${r.date}</td>
            <td>
                <span class="badge" style="background: ${isOlky ? 'rgba(2, 132, 199, 0.2)' : 'rgba(16, 185, 129, 0.2)'}; color: ${isOlky ? '#38bdf8' : '#34d399'}; border: 1px solid ${isOlky ? 'rgba(2, 132, 199, 0.4)' : 'rgba(16, 185, 129, 0.4)'}; font-size: 0.72rem;">
                    ${isOlky ? '<i class="fa-solid fa-credit-card"></i> Olky Pay' : '<i class="fa-solid fa-globe"></i> Revolut'}
                </span>
            </td>
            <td><code style="font-size: 0.78rem; color: #38bdf8;">${r.pcn_code || '-'}</code></td>
            <td style="font-size: 0.82rem;"><span class="badge badge-neutral" style="font-size: 0.72rem;">${r.category || '-'}</span></td>
            <td>
                <strong style="font-size: 0.88rem; color: var(--text-main);">${r.description}</strong>
                ${r.reference ? `<div style="font-size: 0.72rem; color: var(--text-muted);">Réf: ${r.reference}</div>` : ''}
            </td>
            <td style="font-size: 0.85rem; color: var(--text-main);">${r.party || '-'}</td>
            <td class="text-right" style="font-weight: 700; font-size: 0.95rem; color: ${isCredit ? '#10b981' : '#f43f5e'};">
                ${isCredit ? '+' : ''}${formatCurrency(r.amount)}
            </td>
            <td class="text-right" style="font-weight: 600; font-size: 0.88rem; color: #38bdf8; font-family: 'JetBrains Mono', monospace;">
                ${r.balance !== undefined ? formatCurrency(r.balance) : '-'}
            </td>
            <td class="text-center">
                <button onclick="deleteRecord('${r.id}')" style="background: none; border: none; color: var(--text-muted); cursor: pointer;" title="${typeof t === 'function' ? t('btn_delete') : 'Supprimer'}">
                    <i class="fa-solid fa-trash-can" style="font-size: 0.85rem;"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openNewTransactionModal() {
    const modal = document.getElementById('newTransactionModal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('modal-tx-date').value = new Date().toISOString().split('T')[0];
    }
}

function closeNewTransactionModal() {
    const modal = document.getElementById('newTransactionModal');
    if (modal) modal.style.display = 'none';
}

function handleSaveTransaction(e) {
    e.preventDefault();
    const bank = document.getElementById('modal-tx-bank').value;
    const date = document.getElementById('modal-tx-date').value;
    const pcn = document.getElementById('modal-tx-pcn').value;
    const amount = parseFloat(document.getElementById('modal-tx-amount').value);
    const cat = document.getElementById('modal-tx-cat').value;
    const desc = document.getElementById('modal-tx-desc').value;
    const party = document.getElementById('modal-tx-party').value;

    const newRecord = {
        id: 'TX-' + Date.now(),
        date: date,
        bank: bank,
        pcn_code: pcn,
        category: cat,
        description: desc,
        party: party,
        amount: amount,
        type: amount >= 0 ? 'credit' : 'debit',
        reference: 'MANUAL-' + Math.floor(Math.random() * 1000)
    };

    // Save to custom records
    let custom = [];
    try {
        const saved = localStorage.getItem('wg_custom_records');
        if (saved) custom = JSON.parse(saved);
    } catch (err) {}
    custom.push(newRecord);
    localStorage.setItem('wg_custom_records', JSON.stringify(custom));

    closeNewTransactionModal();
    initBancaApp();
}

function deleteRecord(recId) {
    if (!confirm(typeof t === 'function' ? t('banca_confirm_delete') : "Voulez-vous vraiment supprimer cette écriture ?")) return;
    
    // Filter out from memory and localStorage
    bankRecords = bankRecords.filter(r => r.id !== recId);
    try {
        const saved = localStorage.getItem('wg_custom_records');
        if (saved) {
            let custom = JSON.parse(saved);
            custom = custom.filter(r => r.id !== recId);
            localStorage.setItem('wg_custom_records', JSON.stringify(custom));
        }
    } catch (e) {}

    updateBankKPIs();
    applyBankFilters();
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
    initBancaApp();
});

window.addEventListener('wg:languageChanged', () => {
    initBancaApp();
});
