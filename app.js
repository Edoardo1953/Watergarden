/**
 * Watergarden Management Sàrl - Dashboard & Cap Table Logic (Style Green Enerbras)
 * Basé sur le Registre Officiel des Associés (Feuille 'Registre' 06/05/2026)
 * Total Actions : 2.171.320 actions à 2,00 € = 4.342.640,00 € (100,0000%)
 */

let capTableChartInstance = null;

function formatCurrency(val) {
    if (val === null || val === undefined || isNaN(val)) return "0,00 €";
    const num = Number(val);
    const parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",") + " €";
}

function formatNumber(num, decimals = 0) {
    if (num === null || num === undefined || isNaN(num)) return "0";
    const val = Number(num);
    const parts = val.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimals > 0 ? parts.join(",") : parts[0];
}

function initDashboard() {
    if (!window.WATERGARDEN_DATA) return;
    const data = window.WATERGARDEN_DATA;

    // Render Cap Table
    renderCapTable(data.partners);

    // Render Donut Charts (Classe A and Classe B)
    renderCapTableCharts(data.partners);

    // Update date
    const dateEl = document.getElementById('sidebar-updated-at');
    if (dateEl && data.company?.updated_at) {
        dateEl.textContent = data.company.updated_at.split(' ')[0];
    }
}

function renderCapTable(partners) {
    const tbody = document.getElementById('partners-table-body');
    if (!tbody || !partners) return;

    tbody.innerHTML = '';
    let totalDet = 0;
    let totalShares = 0;
    let totalVal = 0;

    let subA_shares = 0;
    let subA_det = 0;
    let subA_val = 0;

    let subB_shares = 0;
    let subB_det = 0;
    let subB_val = 0;

    let classAShown = false;
    let classBShown = false;

    partners.forEach((p, idx) => {
        totalDet += p.detention || 0;
        totalShares += p.shares || 0;
        totalVal += p.par_value || 0;

        if (p.class === 'A') {
            subA_shares += p.shares || 0;
            subA_det += p.detention || 0;
            subA_val += p.par_value || 0;
        } else if (p.class === 'B') {
            subB_shares += p.shares || 0;
            subB_det += p.detention || 0;
            subB_val += p.par_value || 0;
        }

        // Before first Class B, insert Subtotal Class A row
        if (p.class === 'B' && !classAShown) {
            classAShown = true;
            const trSubA = document.createElement('tr');
            trSubA.style.background = 'rgba(16, 185, 129, 0.12)';
            trSubA.style.fontWeight = '700';
            trSubA.innerHTML = `
                <td colspan="3" style="text-align: right; color: #34d399; padding: 0.55rem 0.65rem;">
                    <i class="fa-solid fa-layer-group"></i> ${typeof t === 'function' ? t('cap_subtotal_a') : 'SOUS-TOTAL CLASSE A :'}
                </td>
                <td class="text-right text-bold text-cyan col-actions">${formatNumber(subA_shares)}</td>
                <td class="text-right text-bold text-emerald col-det">${subA_det.toFixed(4)} %</td>
                <td class="text-right text-bold col-val">${formatCurrency(subA_val)}</td>
                <td class="text-center col-vote">76.57 %</td>
                <td class="text-center col-kyc"><span class="badge badge-success">76,57%</span></td>
            `;
            tbody.appendChild(trSubA);
        }

        const tr = document.createElement('tr');
        const initials = p.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const isCorp = p.name.includes('SA') || p.name.includes('SARL');

        const classBadge = p.class === 'A' 
            ? '<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); font-size: 0.72rem; padding: 0.2rem 0.5rem;">Classe A</span>'
            : '<span class="badge" style="background: rgba(2, 132, 199, 0.2); color: #38bdf8; border: 1px solid rgba(2, 132, 199, 0.4); font-size: 0.72rem; padding: 0.2rem 0.5rem;">Classe B</span>';

        tr.innerHTML = `
            <td style="color: var(--text-muted); font-size: 0.8rem; text-align: center;">${p.nr || (idx + 1)}</td>
            <td class="col-partner">
                <div style="display: flex; align-items: center; gap: 0.65rem;">
                    <div style="width: 32px; height: 32px; min-width: 32px; border-radius: 50%; background: ${isCorp ? '#0284c7' : 'rgba(16, 185, 129, 0.2)'}; color: ${isCorp ? '#fff' : '#34d399'}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; border: 1px solid ${isCorp ? '#38bdf8' : 'rgba(16, 185, 129, 0.4)'};">
                        ${initials}
                    </div>
                    <div style="min-width: 0; line-height: 1.25;">
                        <strong style="color: var(--text-main); font-size: 0.88rem; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${p.name}">${p.name}</strong>
                        ${p.bo ? `<div style="font-size: 0.72rem; color: #38bdf8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="B.E.: ${p.bo}">B.E.: ${p.bo}</div>` : ''}
                        <div style="font-size: 0.72rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.residence}</div>
                    </div>
                </div>
            </td>
            <td class="col-classe" style="text-align: center;">${classBadge}</td>
            <td class="text-right text-bold col-actions" style="color: #38bdf8;">${formatNumber(p.shares)}</td>
            <td class="text-right text-bold text-emerald col-det">${(p.detention || 0).toFixed(4)} %</td>
            <td class="text-right col-val">${formatCurrency(p.par_value)}</td>
            <td class="text-center col-vote">${(p.voting_pct || p.detention || 0).toFixed(2)} %</td>
            <td class="text-center col-kyc">
                <span class="badge badge-success" style="font-size: 0.72rem; padding: 0.2rem 0.5rem;"><i class="fa-solid fa-check"></i> ${typeof t === 'function' ? t('cap_compliant') : '100% Conforme'}</span>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Subtotal Class B row
    const trSubB = document.createElement('tr');
    trSubB.style.background = 'rgba(2, 132, 199, 0.12)';
    trSubB.style.fontWeight = '700';
    trSubB.innerHTML = `
        <td colspan="3" style="text-align: right; color: #38bdf8; padding: 0.55rem 0.65rem;">
            <i class="fa-solid fa-layer-group"></i> ${typeof t === 'function' ? t('cap_subtotal_b') : 'SOUS-TOTAL CLASSE B :'}
        </td>
        <td class="text-right text-bold text-cyan col-actions">${formatNumber(subB_shares)}</td>
        <td class="text-right text-bold text-emerald col-det">${subB_det.toFixed(4)} %</td>
        <td class="text-right text-bold col-val">${formatCurrency(subB_val)}</td>
        <td class="text-center col-vote">23.43 %</td>
        <td class="text-center col-kyc"><span class="badge badge-success">23,43%</span></td>
    `;
    tbody.appendChild(trSubB);

    // Update footers
    const footDet = document.getElementById('foot-total-det');
    if (footDet) footDet.textContent = totalDet.toFixed(4) + " %";

    const footShares = document.getElementById('foot-total-shares');
    if (footShares) footShares.textContent = formatNumber(totalShares);

    const footVal = document.getElementById('foot-total-val');
    if (footVal) footVal.textContent = formatCurrency(totalVal);
}

let chartAInstance = null;
let chartBInstance = null;

function renderCapTableCharts(partners) {
    if (!partners) return;

    const classA = partners.filter(p => p.class === 'A');
    const classB = partners.filter(p => p.class === 'B');

    const totalSharesA = classA.reduce((sum, p) => sum + (p.shares || 0), 0); // 1.662.541
    const totalSharesB = classB.reduce((sum, p) => sum + (p.shares || 0), 0); // 508.779
    const totalDetA = classA.reduce((sum, p) => sum + (p.detention || 0), 0); // 76.5682%
    const totalDetB = classB.reduce((sum, p) => sum + (p.detention || 0), 0); // 23.4318%

    // Palette Classe A (Emerald, Teal, Mint, Jade, Seafoam)
    const paletteA = [
        '#10b981', '#059669', '#34d399', '#0d9488',
        '#14b8a6', '#2dd4bf', '#0ea5e9', '#38bdf8',
        '#047857', '#065f46', '#0f766e', '#115e59'
    ];

    // Palette Classe B (Cyan, Sky, Amber, Gold, Slate)
    const paletteB = [
        '#0284c7', '#0ea5e9', '#38bdf8', '#f59e0b',
        '#d97706', '#b45309', '#64748b'
    ];

    // 1. RENDER CHART CLASSE A
    const canvasA = document.getElementById('chartClasseA');
    if (canvasA) {
        if (chartAInstance) chartAInstance.destroy();

        const labelsA = classA.map(p => p.name);
        const dataA = classA.map(p => (p.shares / totalSharesA) * 100);

        const ctxA = canvasA.getContext('2d');
        chartAInstance = new Chart(ctxA, {
            type: 'doughnut',
            data: {
                labels: labelsA,
                datasets: [{
                    data: dataA,
                    backgroundColor: paletteA.slice(0, classA.length),
                    borderColor: '#0b132b',
                    borderWidth: 2,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const p = classA[context.dataIndex];
                                const relPct = context.raw || 0;
                                return ` ${p.name}: ${relPct.toFixed(4)}% de la Cl. A (${(p.detention || 0).toFixed(4)}% tot) [${formatNumber(p.shares)} act.]`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });

        // Legend A - All Classe A shareholders
        const legendA = document.getElementById('chart-legend-classe-a');
        if (legendA) {
            legendA.innerHTML = classA.map((p, i) => {
                const relPct = (p.shares / totalSharesA) * 100;
                return `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.18rem 0;">
                        <div style="display: flex; align-items: center; gap: 0.45rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 58%;">
                            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; background: ${paletteA[i % paletteA.length]};"></span>
                            <span style="color: var(--text-muted); font-size: 0.77rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${p.name}">${p.name}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1.25rem; flex-shrink: 0;">
                            <span style="font-size: 0.71rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; min-width: 62px; text-align: right;">${(p.detention || 0).toFixed(2)}% tot</span>
                            <strong style="color: #34d399; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; min-width: 72px; text-align: right;">${relPct.toFixed(4)}%</strong>
                        </div>
                    </div>
                `;
            }).join('') + `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.45rem; border-top: 1px solid var(--border-color); padding-top: 0.45rem; font-weight: 800;">
                    <span style="color: #34d399; font-size: 0.76rem; display: flex; align-items: center; gap: 0.35rem; white-space: nowrap;">
                        <i class="fa-solid fa-check-circle"></i> TOTAL ACTIONS CLASSE A :
                    </span>
                    <div style="display: flex; align-items: center; gap: 1.25rem; flex-shrink: 0;">
                        <span style="font-size: 0.72rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; min-width: 62px; text-align: right; font-weight: 700;">${totalDetA.toFixed(2)}% tot</span>
                        <strong style="color: #34d399; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; min-width: 72px; text-align: right;">100,0000 %</strong>
                    </div>
                </div>
            `;
        }
    }

    // 2. RENDER CHART CLASSE B
    const canvasB = document.getElementById('chartClasseB');
    if (canvasB) {
        if (chartBInstance) chartBInstance.destroy();

        const labelsB = classB.map(p => p.name);
        const dataB = classB.map(p => (p.shares / totalSharesB) * 100);

        const ctxB = canvasB.getContext('2d');
        chartBInstance = new Chart(ctxB, {
            type: 'doughnut',
            data: {
                labels: labelsB,
                datasets: [{
                    data: dataB,
                    backgroundColor: paletteB.slice(0, classB.length),
                    borderColor: '#0b132b',
                    borderWidth: 2,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const p = classB[context.dataIndex];
                                const relPct = context.raw || 0;
                                return ` ${p.name}: ${relPct.toFixed(4)}% de la Cl. B (${(p.detention || 0).toFixed(4)}% tot) [${formatNumber(p.shares)} act.]`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });

        // Legend B
        const legendB = document.getElementById('chart-legend-classe-b');
        if (legendB) {
            legendB.innerHTML = classB.map((p, i) => {
                const relPct = (p.shares / totalSharesB) * 100;
                return `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.18rem 0;">
                        <div style="display: flex; align-items: center; gap: 0.45rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 58%;">
                            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; background: ${paletteB[i % paletteB.length]};"></span>
                            <span style="color: var(--text-muted); font-size: 0.77rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${p.name}">${p.name}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1.25rem; flex-shrink: 0;">
                            <span style="font-size: 0.71rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; min-width: 62px; text-align: right;">${(p.detention || 0).toFixed(2)}% tot</span>
                            <strong style="color: #38bdf8; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; min-width: 72px; text-align: right;">${relPct.toFixed(4)}%</strong>
                        </div>
                    </div>
                `;
            }).join('') + `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.45rem; border-top: 1px solid var(--border-color); padding-top: 0.45rem; font-weight: 800;">
                    <span style="color: #38bdf8; font-size: 0.76rem; display: flex; align-items: center; gap: 0.35rem; white-space: nowrap;">
                        <i class="fa-solid fa-check-circle"></i> TOTAL ACTIONS CLASSE B :
                    </span>
                    <div style="display: flex; align-items: center; gap: 1.25rem; flex-shrink: 0;">
                        <span style="font-size: 0.72rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; min-width: 62px; text-align: right; font-weight: 700;">${totalDetB.toFixed(2)}% tot</span>
                        <strong style="color: #38bdf8; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; min-width: 72px; text-align: right;">100,0000 %</strong>
                    </div>
                </div>
            `;
        }
    }
}

function openSchemaSocietarioModal() {
    const modal = document.getElementById('schemaSocietarioModal');
    if (modal) modal.style.display = 'flex';
}

function closeSchemaSocietarioModal() {
    const modal = document.getElementById('schemaSocietarioModal');
    if (modal) modal.style.display = 'none';
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
    initDashboard();
});

window.addEventListener('wg:languageChanged', () => {
    initDashboard();
});
