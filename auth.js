/**
 * Watergarden Management Sàrl
 * Sistema di Autenticazione, Controllo Accessi, Ruoli (Admin / User / Public) & Gestione Password
 */

// Early Sidebar State initialization (avoids layout shift on page load)
(function initEarlySidebarState() {
    try {
        const path = (window.location.pathname || '').toLowerCase();
        const page = (path.split('/').pop() || 'index.html').toLowerCase();
        const isHome = page === '' || page === 'index.html' || page === 'index' || page.indexOf('index.html') !== -1;

        if (isHome) {
            // HOMEPAGE: Sidebar visibile a sinistra con il grande logo in alto
            document.documentElement.classList.add('sidebar-pinned');
            document.documentElement.classList.remove('sidebar-collapsed');
            document.documentElement.classList.remove('sidebar-open');
        } else {
            // ALTRE PAGINE: Sidebar a scomparsa per default, accessibile tramite le tre righe in alto
            document.documentElement.classList.add('sidebar-collapsed');
            document.documentElement.classList.remove('sidebar-pinned');
            document.documentElement.classList.remove('sidebar-open');
        }
    } catch(e) {}
})();

const DEFAULT_AUTH_USERS = [
    {
        id: 'usr_admin',
        name: 'TUBIA EDOARDO',
        username: 'tubia.edoardo@gmail.com',
        aliases: ['admin', 'edoardo', 'tubia'],
        password: 'edo2bia',
        role: 'admin',
        roleLabel: 'Gérant Unique / Super Admin',
        permission: 'read_write', // 'read_write' (Modifica e Lettura) | 'read_only' (Solo Lettura)
        status: 'active', // 'active' | 'blocked'
        pin: 'LuxTrust Mobile',
        created_at: '2026-05-06',
        notes: 'Pieno potere di controllo, gestione credenziali e visibilità'
    },
    {
        id: 'usr_fidu',
        name: 'CABINET FIDUCIAIRE LUXEMBOURG',
        username: 'fidu.compta@luxfiduciaire.lu',
        aliases: ['fidu', 'comptable', 'user'],
        password: 'Fidu*Lux2026#Watergarden',
        role: 'user',
        roleLabel: 'Utente Operativo / Fiduciaire',
        permission: 'read_write', // Modifica e Lettura per default, configurabile
        status: 'active',
        pin: '2FA Token',
        created_at: '2026-05-10',
        notes: 'Gestione contabile e societaria operativa'
    },
    {
        id: 'usr_public',
        name: 'ACCESSO PUBBLICO / AUDIT',
        username: 'public@watergarden.lu',
        aliases: ['public', 'guest', 'ospite', 'pubblico'],
        password: 'WatergardenPublic2026',
        role: 'public',
        roleLabel: 'Consultazione Pubblica / Stakeholder',
        permission: 'read_only', // Rigorosamente Solo Lettura
        status: 'active',
        pin: 'Accesso Diretto',
        created_at: '2026-05-15',
        notes: 'Sola visualizzazione bilanci e cap table per investitori e audit'
    }
];

const DEFAULT_PAGE_PERMISSIONS = {
    'index.html': true,
    'partecipazioni.html': true,
    'sombra_floresta.html': true,
    'contabilita.html': true,
    'banca.html': true,
    'ammortamenti.html': true,
    'aml.html': true,
    'documenti.html': true
};

// ==========================================
// 1. Gestione Utenti, Storage & Modalità Password Standby
// ==========================================

function isPasswordEnforced() {
    const saved = localStorage.getItem('wg_enforce_passwords');
    if (saved !== null) return saved === 'true';
    return false; // Standby predefinito durante la fase di sviluppo su richiesta
}

function togglePasswordEnforcementSwitch() {
    const current = isPasswordEnforced();
    const newState = !current;
    localStorage.setItem('wg_enforce_passwords', newState.toString());
    showVisibilityToast(`Obbligo Password: ${newState ? 'ATTIVATO (Modalità Rigida)' : 'IN STANDBY (Accesso Libero per Sviluppo)'}`, newState);
    const modal = document.getElementById('wg-users-management-modal');
    if (modal && modal.classList.contains('active')) {
        renderUsersManagementContent(modal);
    }
}

function getRegisteredUsers() {
    try {
        const saved = localStorage.getItem('wg_simple_users_pwd');
        if (saved) {
            let parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                // Ripristino e protezione blindata per l'amministratore principale (Tubia Edoardo)
                const adminIdx = parsed.findIndex(u => u.id === 'usr_admin' || (u.username && u.username.toLowerCase().includes('tubia')));
                if (adminIdx >= 0) {
                    parsed[adminIdx].role = 'admin';
                    parsed[adminIdx].roleLabel = 'Gérant Unique / Super Admin';
                    parsed[adminIdx].permission = 'read_write';
                    parsed[adminIdx].status = 'active';
                }
                return parsed;
            }
        }
    } catch (e) {
        console.error('Errore nel caricamento utenti:', e);
    }
    // Salva i default se prima volta
    saveRegisteredUsers(DEFAULT_AUTH_USERS);
    return [...DEFAULT_AUTH_USERS];
}

function saveRegisteredUsers(users) {
    try {
        localStorage.setItem('wg_simple_users_pwd', JSON.stringify(users));
    } catch (e) {
        console.error('Errore nel salvataggio utenti:', e);
    }
}

function getLoggedUser() {
    try {
        const session = sessionStorage.getItem('wg_session') || localStorage.getItem('wg_remembered_session');
        if (session) {
            let user = JSON.parse(session);
            // Se l'account in sessione è l'amministratore principale, garantisci sempre ruolo admin e permessi di scrittura
            if (user && (user.id === 'usr_admin' || (user.username && user.username.toLowerCase().includes('tubia')))) {
                if (user.role !== 'admin' || user.permission !== 'read_write') {
                    user.role = 'admin';
                    user.roleLabel = 'Gérant Unique / Super Admin';
                    user.permission = 'read_write';
                    user.status = 'active';
                    sessionStorage.setItem('wg_session', JSON.stringify(user));
                    localStorage.setItem('wg_remembered_session', JSON.stringify(user));
                }
            }
            return user;
        }
    } catch (e) {
        console.error('Errore controllo sessione:', e);
    }
    return null;
}

function isUserAdmin(user) {
    if (!user) user = getLoggedUser();
    if (!user) return true; // Default session locale per Tubia Edoardo
    const role = (user.role || '').toLowerCase();
    const username = (user.username || '').toLowerCase();
    const id = user.id || '';
    return id === 'usr_admin' || role === 'admin' || role.includes('admin') || role.includes('gérant') || username.includes('tubia');
}

function isUserPublic(user) {
    if (!user) user = getLoggedUser();
    return user && (user.role === 'public' || (user.role || '').toLowerCase().includes('public'));
}

function canUserEdit(user) {
    if (!user) user = getLoggedUser();
    if (!user) return true;
    if (user.status === 'blocked') return false;
    // Solo se ha permission === 'read_write' e non è public
    return user.permission === 'read_write' && !isUserPublic(user);
}

function isUserPreviewMode() {
    return sessionStorage.getItem('wg_user_preview_mode') === 'true';
}

function toggleUserPreviewMode(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const current = isUserPreviewMode();
    sessionStorage.setItem('wg_user_preview_mode', (!current).toString());
    initSidebarVisibility();
    showVisibilityToast(
        !current ? "Modalità Anteprima USER attivata (Le pagine con occhio rosso sono nascoste)" : "Modalità Amministratore ripristinata",
        !current
    );
}

// ==========================================
// 2. Controllo Visibilità Pagine (Occhio Verde/Rosso)
// ==========================================

function getPagePermissions() {
    try {
        const saved = localStorage.getItem('wg_page_permissions');
        if (saved) {
            return { ...DEFAULT_PAGE_PERMISSIONS, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.error('Errore caricamento permessi:', e);
    }
    return { ...DEFAULT_PAGE_PERMISSIONS };
}

function savePagePermissions(perms) {
    try {
        localStorage.setItem('wg_page_permissions', JSON.stringify(perms));
    } catch (e) {
        console.error('Errore salvataggio permessi:', e);
    }
}

function togglePageVisibility(pageKey, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const user = getLoggedUser();
    if (!isUserAdmin(user)) {
        alert("Solo l'amministratore può modificare la visibilità delle pagine per gli utenti.");
        return;
    }

    const perms = getPagePermissions();
    const newState = perms[pageKey] === false ? true : false;
    perms[pageKey] = newState;
    savePagePermissions(perms);

    initSidebarVisibility();
    showVisibilityToast(
        pageKey + (newState ? " : VERDE (Visibile allo USER)" : " : ROSSO (Nascosto allo USER)"),
        newState
    );
}

function showVisibilityToast(message, isPositive) {
    let existing = document.getElementById('wg-active-visibility-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'wg-active-visibility-toast';
    toast.className = `wg-visibility-toast ${isPositive ? 'toast-green' : 'toast-red'}`;
    toast.innerHTML = `
        <i class="fa-solid ${isPositive ? 'fa-eye text-emerald' : 'fa-eye-slash text-rose'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 350);
        }
    }, 2800);
}

// Inizializza sidebar e bottoni occhio
function initSidebarVisibility() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    const user = getLoggedUser();
    const isAdmin = isUserAdmin(user);
    const inPreview = isUserPreviewMode();
    const perms = getPagePermissions();

    // Rimuovi eventuale barra admin in cima al menu
    const existingAdminBar = document.getElementById('wg-admin-visibility-bar');
    if (existingAdminBar) existingAdminBar.remove();

    // Posiziona il tasto 'Simula User' esclusivamente in fondo alla pagina del menu (sidebar-footer) per l'Admin
    const sidebarFooter = document.querySelector('.sidebar-footer');
    let simulaBtn = document.getElementById('btn-sidebar-simula-user');
    if (sidebarFooter && isAdmin) {
        if (!simulaBtn) {
            simulaBtn = document.createElement('button');
            simulaBtn.id = 'btn-sidebar-simula-user';
            simulaBtn.type = 'button';
            simulaBtn.className = 'btn-sidebar-action btn-simula-user';
            simulaBtn.onclick = (e) => toggleUserPreviewMode(e);
            sidebarFooter.insertBefore(simulaBtn, sidebarFooter.firstChild);
        }
        simulaBtn.style.display = 'flex';
        simulaBtn.style.alignItems = 'center';
        simulaBtn.style.justifyContent = 'center';
        simulaBtn.style.gap = '0.5rem';
        simulaBtn.style.marginBottom = '0.75rem';
        simulaBtn.style.width = '100%';
        simulaBtn.style.padding = '0.55rem 0.85rem';
        simulaBtn.style.fontSize = '0.8rem';
        simulaBtn.style.fontWeight = '700';
        simulaBtn.style.borderRadius = '10px';
        simulaBtn.style.cursor = 'pointer';
        simulaBtn.style.transition = 'all 0.2s ease';

        if (inPreview) {
            simulaBtn.style.background = 'rgba(56, 189, 248, 0.2)';
            simulaBtn.style.border = '1px solid #38bdf8';
            simulaBtn.style.color = '#38bdf8';
            simulaBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> <span>Torna ad Admin</span>';
            simulaBtn.title = 'Esci dalla vista simulata e torna alla modalità Amministratore';
        } else {
            simulaBtn.style.background = 'rgba(255, 255, 255, 0.05)';
            simulaBtn.style.border = '1px solid var(--border-color)';
            simulaBtn.style.color = 'var(--text-main)';
            simulaBtn.innerHTML = '<i class="fa-solid fa-user-check text-cyan"></i> <span>Simula User</span>';
            simulaBtn.title = 'Visualizza il menu esattamente come lo vede l\'Utente (nasconde le pagine con occhio rosso)';
        }
    } else if (simulaBtn) {
        simulaBtn.remove();
    }

    // Aggiungi pulsante Gestione Ruoli & Password nella sezione GESTION della sidebar se Admin
    let btnMgmt = document.getElementById('btn-sidebar-users-mgmt');
    if (isAdmin && !inPreview) {
        if (!btnMgmt) {
            btnMgmt = document.createElement('button');
            btnMgmt.id = 'btn-sidebar-users-mgmt';
            btnMgmt.className = 'btn-sidebar-action';
            btnMgmt.style.marginTop = '0.45rem';
            btnMgmt.style.background = 'rgba(168, 85, 247, 0.12)';
            btnMgmt.style.borderColor = 'rgba(168, 85, 247, 0.35)';
            btnMgmt.style.color = '#c084fc';
            btnMgmt.innerHTML = `
                <i class="fa-solid fa-user-lock"></i>
                <span>Ruoli & Password</span>
            `;
            btnMgmt.onclick = () => {
                if (typeof closeSidebar === 'function') closeSidebar();
                openUsersManagementModal();
            };
            navMenu.appendChild(btnMgmt);
        }
    } else if (btnMgmt) {
        btnMgmt.remove();
    }

    // Processa tutti i link di navigazione
    const navLinks = navMenu.querySelectorAll('a.nav-item');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const cleanKey = href.trim().replace(/^(\.\/|\/)/, '');

        let container = link.closest('.nav-item-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'nav-item-container';
            container.dataset.page = cleanKey;
            link.parentNode.insertBefore(container, link);
            container.appendChild(link);
        } else {
            container.dataset.page = cleanKey;
        }

        const isVisible = perms[cleanKey] !== false;

        // USER o Anteprima
        if (!isAdmin || inPreview) {
            if (!isVisible) {
                container.style.display = 'none';
            } else {
                container.style.display = 'flex';
                link.classList.remove('nav-item-disabled');
                const eyeBtn = container.querySelector('.nav-eye-toggle-btn');
                if (eyeBtn) eyeBtn.style.display = 'none';
            }
        } 
        // ADMIN
        else {
            container.style.display = 'flex';
            if (!isVisible) {
                link.classList.add('nav-item-disabled');
            } else {
                link.classList.remove('nav-item-disabled');
            }

            let eyeBtn = container.querySelector('.nav-eye-toggle-btn');
            if (!eyeBtn) {
                eyeBtn = document.createElement('button');
                eyeBtn.type = 'button';
                eyeBtn.className = 'nav-eye-toggle-btn';
                container.appendChild(eyeBtn);
            }
            eyeBtn.style.display = 'inline-flex';
            eyeBtn.dataset.page = cleanKey;
            eyeBtn.onclick = (e) => togglePageVisibility(cleanKey, e);

            if (isVisible) {
                eyeBtn.className = 'nav-eye-toggle-btn nav-eye-active';
                eyeBtn.title = `Visibile allo USER (Verde) - Clicca per nascondere agli utenti`;
                eyeBtn.innerHTML = '<i class="fa-solid fa-eye" style="color: #10b981;"></i>';
            } else {
                eyeBtn.className = 'nav-eye-toggle-btn nav-eye-hidden';
                eyeBtn.title = `Nascosto allo USER (Rosso) - Clicca per rendere visibile agli utenti`;
                eyeBtn.innerHTML = '<i class="fa-solid fa-eye-slash" style="color: #f43f5e;"></i>';
            }
        }
    });

    // Gestione visibilità automatica titoli di sezione se tutti i sottomoduli sono nascosti allo USER
    const sectionTitles = navMenu.querySelectorAll('.nav-section-title');
    sectionTitles.forEach(title => {
        if (title.getAttribute('data-i18n') === 'nav_section_tools') {
            title.style.display = 'block';
            return;
        }
        if (!isAdmin || inPreview) {
            let nextEl = title.nextElementSibling;
            let hasVisibleChild = false;
            while (nextEl && !nextEl.classList.contains('nav-section-title')) {
                if (nextEl.classList.contains('nav-item-container') && nextEl.style.display !== 'none') {
                    hasVisibleChild = true;
                    break;
                }
                nextEl = nextEl.nextElementSibling;
            }
            title.style.display = hasVisibleChild ? 'block' : 'none';
        } else {
            title.style.display = 'block';
        }
    });
}

// ==========================================
// 3. Applicazione Modalità "Solo Lettura"
// ==========================================

function applyReadOnlyEnforcement() {
    const user = getLoggedUser();
    if (!user) return;

    const isWritable = canUserEdit(user);

    if (!isWritable) {
        document.body.classList.add('wg-read-only-mode');

        // Inserisci banner di avviso in cima alla pagina principale se non presente
        const mainContent = document.querySelector('.main-content');
        if (mainContent && !document.getElementById('wg-read-only-banner')) {
            const banner = document.createElement('div');
            banner.id = 'wg-read-only-banner';
            banner.className = 'read-only-notice-banner';
            banner.innerHTML = `
                <i class="fa-solid fa-lock" style="font-size: 1.1rem;"></i>
                <div>
                    <strong>ACCESSO IN SOLA LETTURA</strong> — Profilo: <u>${escapeHtml(user.name)}</u> (${user.role.toUpperCase()}). 
                    Le funzioni di inserimento, modifica, cancellazione e upload sono bloccate.
                </div>
            `;
            // Inserisci subito dopo il primo elemento di intestazione (topbar)
            const topbar = mainContent.querySelector('.topbar');
            if (topbar && topbar.nextSibling) {
                mainContent.insertBefore(banner, topbar.nextSibling);
            } else {
                mainContent.insertBefore(banner, mainContent.firstChild);
            }
        }
    } else {
        document.body.classList.remove('wg-read-only-mode');
        const banner = document.getElementById('wg-read-only-banner');
        if (banner) banner.remove();
    }
}

// Inietta Badge Utente nella Topbar
function initTopbarUserBadge() {
    const topbarActions = document.querySelector('.topbar-actions');
    if (!topbarActions) return;

    let userBadge = document.getElementById('wg-topbar-user-profile');
    if (!userBadge) {
        userBadge = document.createElement('div');
        userBadge.id = 'wg-topbar-user-profile';
        userBadge.className = 'topbar-user-profile';
        // Inserisci prima dell'ultimo bottone (logout)
        topbarActions.insertBefore(userBadge, topbarActions.lastElementChild);
    }

    const user = getLoggedUser() || DEFAULT_AUTH_USERS[0];
    const isAdmin = isUserAdmin(user);
    const isRW = canUserEdit(user);
    const origSession = sessionStorage.getItem('wg_admin_original_session');

    const roleBadgeHtml = user.role === 'admin' 
        ? `<span class="badge badge-role-admin"><i class="fa-solid fa-shield"></i> Admin</span>`
        : user.role === 'user'
            ? `<span class="badge badge-role-user"><i class="fa-solid fa-user"></i> User</span>`
            : `<span class="badge badge-role-public"><i class="fa-solid fa-globe"></i> Public</span>`;

    const permBadgeHtml = isRW
        ? `<span class="badge badge-perm-rw" title="Autorizzato a Modifica e Lettura"><i class="fa-solid fa-pen-to-square"></i> Modifica &amp; Lettura</span>`
        : `<span class="badge badge-perm-ro" title="Autorizzato a Sola Lettura"><i class="fa-solid fa-lock"></i> Solo Lettura</span>`;

    const initials = (user.name || 'WG').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    userBadge.innerHTML = `
        <div class="user-avatar" title="${escapeHtml(user.roleLabel || user.role)}">${initials}</div>
        <div style="display: flex; flex-direction: column; text-align: left; line-height: 1.25;">
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.82rem;">${escapeHtml(user.name)}</div>
            <div style="display: flex; gap: 0.35rem; align-items: center; margin-top: 2px;">
                ${roleBadgeHtml}
                ${permBadgeHtml}
            </div>
        </div>
        ${isAdmin ? `<i class="fa-solid fa-gear" style="color: var(--text-muted); font-size: 0.9rem; margin-left: 0.25rem;" title="Gestione Utenti & Password"></i>` : ''}
        ${origSession ? `
            <button class="btn-sm" onclick="restoreAdminSession(event)" style="margin-left: 0.5rem; background: #a855f7; color: white; border: none; border-radius: 6px; padding: 0.2rem 0.5rem; font-size: 0.72rem; font-weight: 700; cursor: pointer;">
                <i class="fa-solid fa-arrow-rotate-left"></i> Torna ad Admin
            </button>
        ` : ''}
    `;

    if (isAdmin) {
        userBadge.onclick = (e) => {
            if (e.target.closest('button')) return;
            openUsersManagementModal();
        };
    }
}

// ==========================================
// 4. Modale Gestione Utenti, Password & Ruoli (Admin Power)
// ==========================================

function openUsersManagementModal() {
    const user = getLoggedUser();
    if (!isUserAdmin(user)) {
        alert("Accesso riservato all'Amministratore.");
        return;
    }

    let modal = document.getElementById('wg-users-management-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'wg-users-management-modal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    renderUsersManagementContent(modal);
    modal.classList.add('active');
}

function closeUsersManagementModal() {
    const modal = document.getElementById('wg-users-management-modal');
    if (modal) modal.classList.remove('active');
}

function renderUsersManagementContent(modal) {
    const users = getRegisteredUsers();

    modal.innerHTML = `
        <div class="modal-container modal-users-mgmt" style="max-width: 1280px; width: 95vw;">
            <div class="modal-header">
                <div class="modal-title">
                    <i class="fa-solid fa-users-gear text-emerald"></i>
                    <span>Gestione Ruoli, Credenziali &amp; Password</span>
                </div>
                <button type="button" class="modal-close-btn" onclick="closeUsersManagementModal()">&times;</button>
            </div>

            <div class="modal-body">
                <!-- Header Info & Actions -->
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.25rem;">
                    <div>
                        <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);">
                            Controllo Accessi &amp; Autorizzazioni Watergarden
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">
                            L'Admin ha visibilità su tutte le password, può creare nuovi account, modificarli o bloccarli/cancellarli per revocare l'accesso.
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; background: ${isPasswordEnforced() ? 'rgba(168, 85, 247, 0.15)' : 'rgba(16, 185, 129, 0.12)'}; border: 1px solid ${isPasswordEnforced() ? 'rgba(168, 85, 247, 0.35)' : 'rgba(16, 185, 129, 0.35)'}; padding: 0.35rem 0.65rem; border-radius: 8px; font-size: 0.75rem;">
                            <span style="color: ${isPasswordEnforced() ? '#c084fc' : '#34d399'}; font-weight: 700;">
                                <i class="fa-solid ${isPasswordEnforced() ? 'fa-lock' : 'fa-lock-open'}"></i>
                                Password: ${isPasswordEnforced() ? 'ATTIVE' : 'IN STANDBY (Sviluppo)'}
                            </span>
                            <button type="button" onclick="togglePasswordEnforcementSwitch()" style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); color: var(--text-main); padding: 2px 7px; border-radius: 6px; font-size: 0.7rem; cursor: pointer;">
                                ${isPasswordEnforced() ? 'Metti in Standby' : 'Attiva Obbligo'}
                            </button>
                        </div>
                        <button class="btn-primary" onclick="showUserFormDrawer(null)" style="background: linear-gradient(135deg, #10b981, #0284c7); border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 700; font-size: 0.85rem; color: white; cursor: pointer; display: flex; align-items: center; gap: 0.4rem;">
                            <i class="fa-solid fa-user-plus"></i>
                            <span>Nuovo Utente</span>
                        </button>
                    </div>
                </div>

                <!-- Form Drawer (Hidden by default, shown when adding/editing) -->
                <div id="wg-user-form-container" style="display: none; margin-bottom: 1.5rem;"></div>

                <!-- Users Table -->
                <div style="overflow-x: auto; background: rgba(0, 0, 0, 0.15); border-radius: 12px; border: 1px solid var(--border-color);">
                    <table class="users-mgmt-table">
                        <thead>
                            <tr>
                                <th>ID &amp; Utente</th>
                                <th>Username / Login</th>
                                <th>Password (Chiara)</th>
                                <th>Ruolo</th>
                                <th>Autorizzazione</th>
                                <th>Stato Accesso</th>
                                <th style="text-align: right;">Azioni Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${users.map(u => {
                                const isSelf = u.id === 'usr_admin';
                                const isBlocked = u.status === 'blocked';

                                const roleBadge = u.role === 'admin'
                                    ? `<span class="badge badge-role-admin"><i class="fa-solid fa-shield"></i> Admin</span>`
                                    : u.role === 'user'
                                        ? `<span class="badge badge-role-user"><i class="fa-solid fa-user"></i> User</span>`
                                        : `<span class="badge badge-role-public"><i class="fa-solid fa-globe"></i> Public</span>`;

                                const permBadge = u.permission === 'read_write'
                                    ? `<span class="badge badge-perm-rw"><i class="fa-solid fa-pen-to-square"></i> Modifica &amp; Lettura</span>`
                                    : `<span class="badge badge-perm-ro"><i class="fa-solid fa-lock"></i> Solo Lettura</span>`;

                                const statusBadge = isBlocked
                                    ? `<span class="badge badge-status-blocked"><i class="fa-solid fa-ban"></i> Bloccato</span>`
                                    : `<span class="badge badge-status-active"><i class="fa-solid fa-circle-check"></i> Attivo</span>`;

                                return `
                                    <tr style="${isBlocked ? 'opacity: 0.65; background: rgba(244, 63, 94, 0.05);' : ''}">
                                        <td>
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(255, 255, 255, 0.08); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.72rem; color: #38bdf8;">
                                                    ${(u.name || 'U').substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style="font-weight: 700; color: var(--text-main);">${escapeHtml(u.name)}</div>
                                                    <div style="font-size: 0.7rem; color: var(--text-muted); font-family: monospace;">ID: ${escapeHtml(u.id)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span style="font-weight: 600; color: var(--text-main); font-size: 0.8rem;">${escapeHtml(u.username)}</span>
                                            ${u.aliases && u.aliases.length ? `<div style="font-size: 0.68rem; color: var(--text-muted);">alias: ${u.aliases.join(', ')}</div>` : ''}
                                        </td>
                                        <td>
                                            <div class="pwd-display-box" title="Password in chiaro (visibile solo all'Admin)">
                                                <i class="fa-solid fa-key"></i>
                                                <span class="pwd-text" id="pwd-text-${u.id}">${escapeHtml(u.password)}</span>
                                                <button type="button" class="btn-copy-pwd" onclick="copyPasswordToClipboard('${escapeHtml(u.password)}', this)" title="Copia Password">
                                                    <i class="fa-solid fa-copy"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td>${roleBadge}</td>
                                        <td>${permBadge}</td>
                                        <td>${statusBadge}</td>
                                        <td style="text-align: right; white-space: nowrap;">
                                            <button class="btn-icon-action" onclick="impersonateUser('${u.id}')" title="Accedi e visualizza come questo utente">
                                                <i class="fa-solid fa-arrow-right-to-bracket text-cyan"></i>
                                            </button>
                                            <button class="btn-icon-action" onclick="showUserFormDrawer('${u.id}')" title="Modifica credenziali o autorizzazione">
                                                <i class="fa-solid fa-pen-to-square text-emerald"></i>
                                            </button>
                                            ${!isSelf ? `
                                                <button class="btn-icon-action ${isBlocked ? 'success' : 'danger'}" onclick="toggleUserBlockStatus('${u.id}')" title="${isBlocked ? 'Sblocca account' : 'Blocca account per impedire accesso'}">
                                                    <i class="fa-solid ${isBlocked ? 'fa-lock-open text-emerald' : 'fa-lock text-rose'}"></i>
                                                </button>
                                                <button class="btn-icon-action danger" onclick="deleteUserAccount('${u.id}')" title="Elimina definitivamente utente">
                                                    <i class="fa-solid fa-trash-can text-rose"></i>
                                                </button>
                                            ` : `
                                                <span style="font-size: 0.7rem; color: var(--text-muted); font-style: italic; padding: 0.3rem;">(Super Admin)</span>
                                            `}
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Guidance Footer -->
                <div style="margin-top: 1.25rem; padding: 0.85rem; border-radius: 8px; background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.2); font-size: 0.75rem; color: var(--text-muted); display: flex; gap: 0.75rem; align-items: center;">
                    <i class="fa-solid fa-circle-info text-cyan" style="font-size: 1.1rem;"></i>
                    <div>
                        <strong>Riepilogo Ruoli &amp; Autorizzazioni:</strong><br>
                        • <strong>Admin:</strong> Controllo totale, visibilità di tutte le password, modifica/cancellazione utenti e abilitazione moduli menu.<br>
                        • <strong>User:</strong> Utente operativo, può avere <em>Modifica e Lettura</em> o <em>Solo Lettura</em> a discrezione dell'Admin.<br>
                        • <strong>Public:</strong> Accesso ospite rigorosamente in <em>Solo Lettura</em>, senza facoltà di salvataggio o cancellazione.
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn-secondary" onclick="closeUsersManagementModal()" style="padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    Chiudi
                </button>
            </div>
        </div>
    `;
}

function showUserFormDrawer(userId) {
    const container = document.getElementById('wg-user-form-container');
    if (!container) return;

    const users = getRegisteredUsers();
    const existing = userId ? users.find(u => u.id === userId) : null;
    const isEditing = !!existing;

    const newId = isEditing ? existing.id : 'usr_' + Date.now().toString(36);

    container.style.display = 'block';
    container.innerHTML = `
        <div class="user-form-grid" style="position: relative;">
            <div style="grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <h4 style="margin: 0; color: var(--text-main); font-size: 0.95rem;">
                    <i class="fa-solid ${isEditing ? 'fa-user-pen' : 'fa-user-plus'} text-emerald"></i>
                    ${isEditing ? 'Modifica Credenziali Utente: ' + escapeHtml(existing.name) : 'Crea Nuovo Account Utente'}
                </h4>
                <button type="button" class="modal-close-btn" style="font-size: 1rem;" onclick="document.getElementById('wg-user-form-container').style.display='none'">&times;</button>
            </div>

            <input type="hidden" id="form-user-id" value="${newId}">

            <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Nome Completo / Ente</label>
                <input type="text" id="form-user-name" class="login-input" style="font-size: 0.85rem; padding: 0.5rem 0.75rem;" value="${isEditing ? escapeHtml(existing.name) : ''}" placeholder="Es: Mario Rossi..." required>
            </div>

            <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Username / Email di Accesso</label>
                <input type="text" id="form-user-username" class="login-input" style="font-size: 0.85rem; padding: 0.5rem 0.75rem;" value="${isEditing ? escapeHtml(existing.username) : ''}" placeholder="mario.rossi o email..." required>
            </div>

            <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Password (Visibile all'Admin)</label>
                <input type="text" id="form-user-password" class="login-input" style="font-size: 0.85rem; padding: 0.5rem 0.75rem; font-family: 'JetBrains Mono', monospace; font-weight: 700;" value="${isEditing ? escapeHtml(existing.password) : 'Wg*' + Math.random().toString(36).substring(2, 7) + '#2026'}" required>
            </div>

            <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Ruolo di Sistema</label>
                ${isEditing && existing.id === 'usr_admin' ? `
                    <input type="hidden" id="form-user-role" value="admin">
                    <div style="padding: 0.5rem 0.75rem; font-size: 0.85rem; font-weight: 700; background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 8px; color: #c084fc;">
                        <i class="fa-solid fa-shield"></i> Admin (Gérant Unique / Super Admin - Riservato)
                    </div>
                ` : `
                    <select id="form-user-role" class="login-input" style="font-size: 0.85rem; padding: 0.5rem 0.75rem;">
                        <option value="admin" ${isEditing && existing.role === 'admin' ? 'selected' : ''}>Admin (Amministratore Totale)</option>
                        <option value="user" ${!isEditing || existing.role === 'user' ? 'selected' : ''}>User (Utente Operativo)</option>
                        <option value="public" ${isEditing && existing.role === 'public' ? 'selected' : ''}>Public (Ospite / Pubblico)</option>
                    </select>
                `}
            </div>

            <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Autorizzazioni</label>
                ${isEditing && existing.id === 'usr_admin' ? `
                    <input type="hidden" id="form-user-permission" value="read_write">
                    <div style="padding: 0.5rem 0.75rem; font-size: 0.85rem; font-weight: 700; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; color: #34d399;">
                        <i class="fa-solid fa-pen-to-square"></i> Modifica &amp; Lettura (Pieno Controllo)
                    </div>
                ` : `
                    <select id="form-user-permission" class="login-input" style="font-size: 0.85rem; padding: 0.5rem 0.75rem;">
                        <option value="read_write" ${!isEditing || existing.permission === 'read_write' ? 'selected' : ''}>Modifica e Lettura (Read/Write)</option>
                        <option value="read_only" ${isEditing && existing.permission === 'read_only' ? 'selected' : ''}>Solo Lettura (Read-Only)</option>
                    </select>
                `}
            </div>

            <div>
                <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Stato Account</label>
                ${isEditing && existing.id === 'usr_admin' ? `
                    <input type="hidden" id="form-user-status" value="active">
                    <div style="padding: 0.5rem 0.75rem; font-size: 0.85rem; font-weight: 700; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; color: #34d399;">
                        <i class="fa-solid fa-circle-check"></i> Attivo (Sempre Operativo)
                    </div>
                ` : `
                    <select id="form-user-status" class="login-input" style="font-size: 0.85rem; padding: 0.5rem 0.75rem;">
                        <option value="active" ${!isEditing || existing.status === 'active' ? 'selected' : ''}>Attivo (Accesso Consentito)</option>
                        <option value="blocked" ${isEditing && existing.status === 'blocked' ? 'selected' : ''}>Bloccato (Accesso Negato)</option>
                    </select>
                `}
            </div>

            <div style="grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem;">
                <button type="button" class="btn-secondary" style="padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.8rem;" onclick="document.getElementById('wg-user-form-container').style.display='none'">
                    Annulla
                </button>
                <button type="button" class="btn-primary" style="padding: 0.45rem 1rem; border-radius: 8px; font-size: 0.8rem; font-weight: 700; background: #10b981; border: none; color: white;" onclick="saveUserFromForm()">
                    <i class="fa-solid fa-floppy-disk"></i> Salva Utente
                </button>
            </div>
        </div>
    `;
}

function saveUserFromForm() {
    const id = document.getElementById('form-user-id').value.trim();
    const name = document.getElementById('form-user-name').value.trim();
    const username = document.getElementById('form-user-username').value.trim();
    const password = document.getElementById('form-user-password').value.trim();
    const role = document.getElementById('form-user-role').value;
    const permission = document.getElementById('form-user-permission').value;
    const status = document.getElementById('form-user-status').value;

    if (!name || !username || !password) {
        alert("Compila tutti i campi obbligatori (Nome, Username, Password).");
        return;
    }

    let users = getRegisteredUsers();
    const existingIndex = users.findIndex(u => u.id === id);

    const userObj = {
        id: id,
        name: name,
        username: username,
        aliases: [username.toLowerCase()],
        password: password,
        role: role,
        roleLabel: role === 'admin' ? 'Amministratore' : role === 'user' ? 'Utente Operativo' : 'Consultazione Pubblica',
        permission: permission,
        status: status,
        pin: '2FA',
        updated_at: new Date().toISOString()
    };

    if (id === 'usr_admin') {
        userObj.role = 'admin';
        userObj.roleLabel = 'Gérant Unique / Super Admin';
        userObj.permission = 'read_write';
        userObj.status = 'active';
    }

    if (existingIndex >= 0) {
        users[existingIndex] = { ...users[existingIndex], ...userObj };
    } else {
        users.push(userObj);
    }

    saveRegisteredUsers(users);
    showVisibilityToast(`Utente ${name} salvato con successo!`, true);

    const modal = document.getElementById('wg-users-management-modal');
    if (modal) renderUsersManagementContent(modal);

    // Aggiorna anche la sessione corrente se abbiamo modificato noi stessi
    const current = getLoggedUser();
    if (current && current.id === id) {
        sessionStorage.setItem('wg_session', JSON.stringify(userObj));
        initTopbarUserBadge();
        applyReadOnlyEnforcement();
    }
}

function toggleUserBlockStatus(userId) {
    let users = getRegisteredUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (user.id === 'usr_admin') {
        alert("L'amministratore principale non può essere bloccato.");
        return;
    }

    user.status = user.status === 'blocked' ? 'active' : 'blocked';
    saveRegisteredUsers(users);

    const isNowBlocked = user.status === 'blocked';
    showVisibilityToast(`Utente ${user.name}: ${isNowBlocked ? 'BLOCCATO (Accesso revocato)' : 'SBLOCCATO (Accesso ripristinato)'}`, !isNowBlocked);

    const modal = document.getElementById('wg-users-management-modal');
    if (modal) renderUsersManagementContent(modal);
}

function deleteUserAccount(userId) {
    if (userId === 'usr_admin') {
        alert("Impossibile eliminare l'Amministratore principale.");
        return;
    }

    let users = getRegisteredUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (!confirm(`Sei sicuro di voler eliminare definitivamente l'utente "${user.name}" (${user.username})? L'accesso sarà revocato permanentemente.`)) {
        return;
    }

    users = users.filter(u => u.id !== userId);
    saveRegisteredUsers(users);

    showVisibilityToast(`Utente ${user.name} eliminato.`, false);

    const modal = document.getElementById('wg-users-management-modal');
    if (modal) renderUsersManagementContent(modal);
}

function impersonateUser(userId) {
    const users = getRegisteredUsers();
    const target = users.find(u => u.id === userId);
    if (!target) return;

    if (target.status === 'blocked') {
        alert("Questo account è bloccato e non può accedere.");
        return;
    }

    const current = getLoggedUser();
    if (current && isUserAdmin(current) && current.id !== target.id) {
        sessionStorage.setItem('wg_admin_original_session', JSON.stringify(current));
    }

    sessionStorage.setItem('wg_session', JSON.stringify(target));
    sessionStorage.removeItem('wg_user_preview_mode');
    window.location.reload();
}

function restoreAdminSession(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const orig = sessionStorage.getItem('wg_admin_original_session');
    if (orig) {
        sessionStorage.setItem('wg_session', orig);
        sessionStorage.removeItem('wg_admin_original_session');
    } else {
        const adminUser = DEFAULT_AUTH_USERS[0];
        sessionStorage.setItem('wg_session', JSON.stringify(adminUser));
    }
    window.location.reload();
}

function copyPasswordToClipboard(pwd, btn) {
    navigator.clipboard.writeText(pwd).then(() => {
        showVisibilityToast("Password copiata negli appunti!", true);
        if (btn) {
            const origHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check text-emerald"></i>';
            setTimeout(() => { btn.innerHTML = origHtml; }, 1500);
        }
    }).catch(err => {
        alert("Password: " + pwd);
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// ==========================================
// 5. Auth Guard & Inizializzazione Globale
// ==========================================

function checkAuthGuard() {
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (currentPage === 'login.html') return;

    let user = getLoggedUser();
    if (!user) {
        // Auto-login sessione locale di default per Tubia Edoardo
        user = DEFAULT_AUTH_USERS[0];
        sessionStorage.setItem('wg_session', JSON.stringify(user));
    }

    // Se l'utente è stato bloccato dall'admin, revoca sessione immediata
    if (user.status === 'blocked') {
        alert("Il tuo account è stato bloccato dall'amministratore. Accesso negato.");
        logout();
        return;
    }

    const isAdmin = isUserAdmin(user);
    const inPreview = isUserPreviewMode();

    // Se è USER o PUBLIC (o Admin in simulazione), verifica permessi pagina
    if (!isAdmin || inPreview) {
        const perms = getPagePermissions();
        const basePage = currentPage.split('#')[0];

        if (perms[basePage] === false) {
            const allowedPages = Object.keys(perms).filter(p => !p.includes('#') && perms[p] === true);
            const fallback = allowedPages.length > 0 ? allowedPages[0] : 'index.html';
            alert("L'amministratore ha riservato questa pagina. Accesso non consentito per il tuo profilo.");
            if (basePage !== fallback) {
                window.location.href = fallback;
            }
        }
    }
}

function logout() {
    sessionStorage.removeItem('wg_session');
    sessionStorage.removeItem('wg_admin_original_session');
    sessionStorage.removeItem('wg_user_preview_mode');
    localStorage.removeItem('wg_remembered_session');
    window.location.href = 'login.html';
}

// Inizializzazione automatica al caricamento
checkAuthGuard();

// ==========================================================================
// GESTIONE SIDEBAR (HOMEPAGE: Menu Fisso col Logo | ALTRE PAGINE: Menu a Scomparsa 3 Righe)
// ==========================================================================

function isCurrentPageHomepage() {
    try {
        const path = (window.location.pathname || '').toLowerCase();
        const page = (path.split('/').pop() || 'index.html').toLowerCase();
        return page === '' || page === 'index.html' || page === 'index' || page.indexOf('index.html') !== -1;
    } catch(e) {
        return false;
    }
}

function initResponsiveSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const isHome = isCurrentPageHomepage();

    // 1. Assicura lo stato iniziale:
    // HOMEPAGE: Mostra sempre il menu a sinistra con il grande logo in alto
    // ALTRE PAGINE: Nasconde il menu a scomparsa per default, accessibile dalle tre righe in alto
    if (isHome) {
        document.body.classList.add('sidebar-pinned');
        document.body.classList.remove('sidebar-collapsed');
        document.body.classList.remove('sidebar-open');
        document.documentElement.classList.add('sidebar-pinned');
        document.documentElement.classList.remove('sidebar-collapsed');
        document.documentElement.classList.remove('sidebar-open');
    } else {
        document.body.classList.add('sidebar-collapsed');
        document.body.classList.remove('sidebar-pinned');
        document.body.classList.remove('sidebar-open');
        document.documentElement.classList.add('sidebar-collapsed');
        document.documentElement.classList.remove('sidebar-pinned');
        document.documentElement.classList.remove('sidebar-open');
    }

    // 2. Crea Overlay Sfondo (Backdrop) se assente (utilizzato nelle altre pagine quando il drawer è aperto)
    let backdrop = document.getElementById('sidebar-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'sidebar-backdrop';
        backdrop.className = 'sidebar-backdrop';
        backdrop.onclick = () => closeSidebar();
        document.body.appendChild(backdrop);
    }

    // 3. Header Controls nella sidebar:
    // Nelle altre pagine inseriamo il pulsante di chiusura X quando il drawer è aperto.
    // Nella HOMEPAGE nascondiamo i controlli sopra il logo, così il grande logo di Watergarden rimane in cima alla sidebar!
    let headerControls = sidebar.querySelector('.sidebar-header-controls');
    if (!isHome) {
        if (!headerControls) {
            headerControls = document.createElement('div');
            headerControls.className = 'sidebar-header-controls';
            headerControls.innerHTML = `
                <div class="sidebar-mode-indicator">
                    <i class="fa-solid fa-compass text-emerald"></i>
                    <span data-i18n="nav_title_menu">Menu Watergarden</span>
                </div>
                <div class="sidebar-header-actions">
                    <button type="button" class="btn-sidebar-close" id="btn-sidebar-close" data-i18n-title="nav_close_menu" title="Chiudi menu (Esc)">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            `;
            sidebar.insertBefore(headerControls, sidebar.firstChild);

            const btnClose = headerControls.querySelector('#btn-sidebar-close');
            if (btnClose) btnClose.onclick = () => closeSidebar();
        } else {
            headerControls.style.display = 'flex';
        }
    } else if (headerControls) {
        headerControls.style.display = 'none';
    }

    // 4. Inserisci Pulsante "Menu" con le 3 righe (fa-bars) nella Topbar per le altre pagine
    const topbar = document.querySelector('.topbar');
    const titleArea = document.querySelector('.topbar-title-area');
    if (topbar && titleArea) {
        let leftWrap = topbar.querySelector('.topbar-left-wrapper');
        if (!leftWrap) {
            leftWrap = document.createElement('div');
            leftWrap.className = 'topbar-left-wrapper';
            topbar.insertBefore(leftWrap, titleArea);
            leftWrap.appendChild(titleArea);
        }

        let toggleBtn = document.getElementById('btn-topbar-sidebar-toggle');
        if (!toggleBtn) {
            toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.id = 'btn-topbar-sidebar-toggle';
            toggleBtn.className = 'btn-topbar-sidebar-toggle';
            toggleBtn.title = 'Menu Navigazione (Tasto M)';
            toggleBtn.setAttribute('data-i18n-title', 'nav_toggle_menu');
            toggleBtn.innerHTML = `
                <i class="fa-solid fa-bars"></i>
                <span class="btn-toggle-label" data-i18n="nav_toggle_menu">Menu</span>
            `;
            toggleBtn.onclick = (e) => {
                e.stopPropagation();
                toggleSidebar();
            };
            leftWrap.insertBefore(toggleBtn, leftWrap.firstChild);
        }

        // Nella Homepage il menu a sinistra è fisso e visibile: nascondi pulsante topbar
        if (isHome) {
            toggleBtn.style.display = 'none';
        } else {
            toggleBtn.style.display = 'inline-flex';
        }
    }

    // 5. Rimuovi qualsiasi pulsante flottante laterale per non coprire mai la tabella degli azionisti
    let floatBtn = document.getElementById('btn-floating-sidebar-toggle');
    if (floatBtn) {
        floatBtn.remove();
    }

    // 6. Scorciatoie da tastiera (Esc per chiudere drawer, M per commutare nelle altre pagine)
    if (!window._wgSidebarKeyHandlerAttached) {
        window._wgSidebarKeyHandlerAttached = true;
        document.addEventListener('keydown', (e) => {
            const target = e.target;
            const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable);
            if (isInput) return;

            if (e.key === 'Escape') {
                if (document.body.classList.contains('sidebar-open')) {
                    closeSidebar();
                }
            } else if ((e.key === 'm' || e.key === 'M') && !isCurrentPageHomepage()) {
                if (!e.ctrlKey && !e.altKey && !e.metaKey) {
                    toggleSidebar();
                }
            }
        });
    }

    // 7. Chiudi il drawer quando si clicca su pulsanti di azione nella sidebar (nelle altre pagine)
    const actionBtns = sidebar.querySelectorAll('.nav-menu button.btn-sidebar-action');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('nav-eye-toggle-btn')) return;
            if (document.body.classList.contains('sidebar-collapsed')) {
                closeSidebar();
            }
        });
    });

    // 8. Chiudi il drawer quando si seleziona una voce di navigazione
    const navLinks = sidebar.querySelectorAll('.nav-menu a.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('sidebar-collapsed')) {
                closeSidebar();
            }
        });
    });

    updateSidebarPinUI();
}

function openSidebar() {
    if (isCurrentPageHomepage()) return;
    document.body.classList.add('sidebar-open');
    document.documentElement.classList.add('sidebar-open');
}

function closeSidebar() {
    if (isCurrentPageHomepage()) return;
    document.body.classList.remove('sidebar-open');
    document.documentElement.classList.remove('sidebar-open');
}

function toggleSidebar() {
    if (isCurrentPageHomepage()) return;
    if (document.body.classList.contains('sidebar-open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function toggleSidebarPin() {
    if (isCurrentPageHomepage()) return;
    const isPinned = document.body.classList.contains('sidebar-pinned');
    if (isPinned) {
        document.body.classList.remove('sidebar-pinned');
        document.documentElement.classList.remove('sidebar-pinned');
        document.body.classList.add('sidebar-collapsed');
        document.documentElement.classList.add('sidebar-collapsed');
        document.body.classList.add('sidebar-open');
        document.documentElement.classList.add('sidebar-open');
    } else {
        document.body.classList.remove('sidebar-collapsed');
        document.documentElement.classList.remove('sidebar-collapsed');
        document.body.classList.remove('sidebar-open');
        document.documentElement.classList.remove('sidebar-open');
        document.body.classList.add('sidebar-pinned');
        document.documentElement.classList.add('sidebar-pinned');
    }
    updateSidebarPinUI();
}

function updateSidebarPinUI() {
    const isHome = isCurrentPageHomepage();
    const toggleBtn = document.getElementById('btn-topbar-sidebar-toggle');
    if (isHome) {
        if (toggleBtn) toggleBtn.style.display = 'none';
        return;
    }
    if (toggleBtn) {
        toggleBtn.style.display = 'inline-flex';
        const icon = toggleBtn.querySelector('i');
        const label = toggleBtn.querySelector('.btn-toggle-label');
        if (icon) icon.className = 'fa-solid fa-bars';
        if (label) label.textContent = typeof t === 'function' ? t('nav_toggle_menu') : 'Menu';
        toggleBtn.title = 'Menu Navigazione (Tasto M)';
    }
}

function setupWatergardenAuthUI() {
    initResponsiveSidebarToggle();
    initSidebarVisibility();
    initTopbarUserBadge();
    applyReadOnlyEnforcement();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupWatergardenAuthUI);
} else {
    setupWatergardenAuthUI();
}
