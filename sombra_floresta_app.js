/**
 * SPA Sombra Floresta - Social & Media App
 * Watergarden Management Sàrl
 * Gestione proiettore grande schermo (Video orizzontali/verticali, Diaporama foto, PDF)
 * Gestione tendine documenti e doppio clic
 */

// ==========================================================================
// 1. DATA STORE DEI MEDIA PRECARICATI
// ==========================================================================

const DEFAULT_OFFICIAL_VIDEOS = [
    {
        id: 'vid-sombra-01',
        type: 'video',
        orientation: 'horizontal',
        title: 'SPA Sombra 01',
        filename: 'SPA Sombra 01.mp4',
        format: 'MP4 16:9 • Orizzontale',
        duration: '03:40',
        size: '155.4 MB',
        thumb: 'uploads/Loghi/Logo Sombra palma.png',
        src: 'uploads/Documenti/Media/SPA%20Sombra%2001.mp4',
        description: 'Video ufficiale in alta risoluzione SPA Sombra Resort & Centro Benessere.'
    },
    {
        id: 'vid-sombra-reel',
        type: 'video',
        orientation: 'vertical',
        title: 'SPA Sombra Floresta 12.2024',
        filename: 'SPA Sombra Floresta 12.2024.MP4',
        format: 'MP4 9:16 • Verticale Reel',
        duration: '00:18',
        size: '8.2 MB',
        thumb: 'uploads/Loghi/Logo Sombra palma.png',
        src: 'uploads/Documenti/Media/SPA%20Sombra%20Floresta%2012.2024.MP4',
        description: 'Video Reel verticale girato all\'ingresso dello SPA Sombra Floresta a Praia de Pipa.'
    },
    {
        id: 'vid-sombra-floresta',
        type: 'video',
        orientation: 'horizontal',
        title: 'Sombra Floresta Resort',
        filename: 'Sombra Floresta.mp4',
        format: 'MP4 16:9 • Orizzontale',
        duration: '02:15',
        size: '61.5 MB',
        thumb: 'uploads/Loghi/Logo Sombra palma.png',
        src: 'uploads/Documenti/Media/Sombra%20Floresta.mp4',
        description: 'Panoramica video di Sombra Floresta Resort a Praia de Pipa.'
    }
];

const DEFAULT_OFFICIAL_PHOTOS = [
    {
        id: 'pho-spa-0737',
        type: 'photo',
        title: 'Piscina Panoramica & Giardino Tropicale',
        filename: 'DSC_0737.JPG',
        format: 'Foto HD Personale',
        resolution: '6000 × 4000',
        size: '1.9 MB',
        src: 'uploads/Documenti/Media/Foto%20spa/DSC_0737.JPG',
        thumb: 'uploads/Documenti/Media/Foto%20spa/DSC_0737.JPG',
        description: 'Piscina organica a sfioro con mosaici blu immersa nel parco botanico della SPA Sombra Floresta.'
    },
    {
        id: 'pho-spa-0740',
        type: 'photo',
        title: 'Oasi Relax & Gazebo Letto a Baldacchino',
        filename: 'DSC_0740.JPG',
        format: 'Foto HD Personale',
        resolution: '6000 × 4000',
        size: '1.9 MB',
        src: 'uploads/Documenti/Media/Foto%20spa/DSC_0740.JPG',
        thumb: 'uploads/Documenti/Media/Foto%20spa/DSC_0740.JPG',
        description: 'Gazebo bordo piscina con tendaggi in lino bianco e lettini relax nel verde tropicale.'
    },
    {
        id: 'pho-spa-0750',
        type: 'photo',
        title: 'Chiringuito Wet Bar & Laguna Esotica',
        filename: 'DSC_0750.JPG',
        format: 'Foto HD Personale',
        resolution: '6000 × 4000',
        size: '1.9 MB',
        src: 'uploads/Documenti/Media/Foto%20spa/DSC_0750.JPG',
        thumb: 'uploads/Documenti/Media/Foto%20spa/DSC_0750.JPG',
        description: 'Bar acquatico con tetto in paglia di palma e passerella in legno su laguna naturale.'
    },
    {
        id: 'pho-spa-0756',
        type: 'photo',
        title: 'Palme Imperiali & Laguna Idroterapica',
        filename: 'DSC_0756.JPG',
        format: 'Foto HD Personale',
        resolution: '6000 × 4000',
        size: '1.9 MB',
        src: 'uploads/Documenti/Media/Foto%20spa/DSC_0756.JPG',
        thumb: 'uploads/Documenti/Media/Foto%20spa/DSC_0756.JPG',
        description: 'Panoramica della laguna con isolotto botanico, palme da cocco e percorso idroterapico.'
    },
    {
        id: 'pho-spa-0757',
        type: 'photo',
        title: 'Isola Tropicale & Architettura Organica',
        filename: 'DSC_0757.JPG',
        format: 'Foto HD Personale',
        resolution: '6000 × 4000',
        size: '1.9 MB',
        src: 'uploads/Documenti/Media/Foto%20spa/DSC_0757.JPG',
        thumb: 'uploads/Documenti/Media/Foto%20spa/DSC_0757.JPG',
        description: 'Specchio d\'acqua cristallina circondato da vegetazione autoctona della foresta atlantica.'
    },
    {
        id: 'pho-spa-0764',
        type: 'photo',
        title: 'Lounge Ricevimento & Tavoli in Legno Massello',
        filename: 'DSC_0764.JPG',
        format: 'Foto HD Personale',
        resolution: '6000 × 4000',
        size: '1.9 MB',
        src: 'uploads/Documenti/Media/Foto%20spa/DSC_0764.JPG',
        thumb: 'uploads/Documenti/Media/Foto%20spa/DSC_0764.JPG',
        description: 'Area accoglienza ospiti con arredi artigianali in legno naturale, vimini e lampade intrecciate.'
    },
    {
        id: 'pho-spa-0768',
        type: 'photo',
        title: 'Hall SPA & Chaise Longue Artigianali',
        filename: 'DSC_0768.JPG',
        format: 'Foto HD Personale',
        resolution: '6000 × 4000',
        size: '1.9 MB',
        src: 'uploads/Documenti/Media/Foto%20spa/DSC_0768.JPG',
        thumb: 'uploads/Documenti/Media/Foto%20spa/DSC_0768.JPG',
        description: 'Salone relax interno con pavimento in parquet scuro, sculture organiche e poltrone in fibra vegetale.'
    },
    {
        id: 'pho-1',
        type: 'photo',
        title: 'Panoramica Giardino Botanico Burle Marx',
        filename: 'watergarden_burle_marx_horizontal.jpg',
        format: 'JPG HD • Landscape',
        resolution: '1920 × 1080',
        size: '114 KB',
        src: 'watergarden_burle_marx_horizontal.jpg',
        thumb: 'watergarden_burle_marx_horizontal.jpg',
        description: 'Progettazione paesaggistica con specie esotiche e laghetto zen firmata Roberto Burle Marx.'
    },
    {
        id: 'pho-2',
        type: 'photo',
        title: 'Sombra Floresta Master Suite & Giardino Tropicale',
        filename: 'watergarden_burle_marx_v1.jpg',
        format: 'JPG Ultra HD',
        resolution: '2560 × 1440',
        size: '435 KB',
        src: 'watergarden_burle_marx_v1.jpg',
        thumb: 'watergarden_burle_marx_v1.jpg',
        description: 'Bungalow indipendente con terrazza privata immerso nella rigogliosa foresta atlantica protetta.'
    },
    {
        id: 'pho-3',
        type: 'photo',
        title: 'Piscina Infinity & Architettura Organica',
        filename: 'watergarden_burle_marx_v2.jpg',
        format: 'JPG Ultra HD',
        resolution: '2560 × 1440',
        size: '430 KB',
        src: 'watergarden_burle_marx_v2.jpg',
        thumb: 'watergarden_burle_marx_v2.jpg',
        description: 'Piscina panoramica a sfioro con mosaici verdi e vista sull\'oceano incontaminato di Tibau do Sul.'
    },
    {
        id: 'pho-4',
        type: 'photo',
        title: 'Oasi Termale SPA & Percorso Benessere',
        filename: 'watergarden_burle_marx_v3.jpg',
        format: 'JPG Ultra HD',
        resolution: '2560 × 1440',
        size: '411 KB',
        src: 'watergarden_burle_marx_v3.jpg',
        thumb: 'watergarden_burle_marx_v3.jpg',
        description: 'Vasche idromassaggio all\'aperto immerse nella vegetazione endemica, saune e bagni turchi.'
    },
    {
        id: 'pho-7',
        type: 'photo',
        title: 'Logo Ufficiale Sombra Palma - Brand Identity',
        filename: 'Logo Sombra palma.png',
        format: 'PNG Logo Originale',
        resolution: '1024 × 1024',
        size: '26.8 KB',
        src: 'uploads/Loghi/Logo Sombra palma.png',
        thumb: 'uploads/Loghi/Logo Sombra palma.png',
        description: 'Icona originale con la palma tropicale distintiva del resort e della SPA Sombra Floresta.'
    },
    {
        id: 'pho-8',
        type: 'photo',
        title: 'Sombra e Água Fresca - Marchio Registrato Blu',
        filename: 'Sombra blu trasparente.png',
        format: 'PNG Trasparente',
        resolution: '1200 × 800',
        size: '68.4 KB',
        src: 'uploads/Loghi/Sombra blu trasparente.png',
        thumb: 'uploads/Loghi/Sombra blu trasparente.png',
        description: 'Logo esteso registrato per l\'ospitalità alberghiera di lusso a Praia de Pipa.'
    },
    {
        id: 'pho-9',
        type: 'photo',
        title: 'Logo Ufficiale YEU SPA PIPA - Brand Identity',
        filename: 'logo-horizontal-completa.png',
        format: 'PNG HD Logo Originale',
        resolution: '1554 × 484',
        size: '83.7 KB',
        src: 'uploads/Loghi/YEU LOGOS/logo-horizontal-completa.png',
        thumb: 'uploads/Loghi/YEU LOGOS/logo-horizontal-completa.png',
        description: 'Brand identity ufficiale di YEU SPA PIPA: centro benessere, massaggi olistici e rituali rigeneranti.'
    }
];

const SOMBRA_MEDIA_DATA = {
    videos: [...DEFAULT_OFFICIAL_VIDEOS],

    photos: [...DEFAULT_OFFICIAL_PHOTOS],

    presentazioni: [
        {
            id: 'pres-1',
            type: 'pdf',
            orientation: 'horizontal',
            title: 'NEW Présentation Structure Brésil & Sombra SPA',
            filename: 'NEW Présentation structure Brésil.pdf',
            format: 'PDF Slide Deck • Orizzontale',
            pages: '12 Slide',
            size: '176 KB',
            src: 'uploads/Documenti/NEW%20Pr%C3%A9sentation%20structure%20Br%C3%A9sil.pdf',
            thumb: 'uploads/Loghi/Logo Sombra palma.png',
            description: 'Documento ufficiale sulla struttura societaria in Brasile (ArcoIris Ltda) e sull\'attivo alberghiero Sombra SPA Resort.'
        },
        {
            id: 'pres-2',
            type: 'pdf',
            orientation: 'horizontal',
            title: 'Sombra Floresta SPA Resort - Master Presentation 2026',
            filename: 'Sombra_Floresta_Resort_Deck_2026.pdf',
            format: 'PDF Slide Deck • Orizzontale',
            pages: '24 Slide',
            size: '3.4 MB',
            src: 'uploads/Documenti/NEW%20Pr%C3%A9sentation%20structure%20Br%C3%A9sil.pdf',
            thumb: 'uploads/Loghi/Logo Sombra palma.png',
            description: 'Presentazione commerciale con planimetrie delle suite, servizi esclusivi, tariffe e gallery fotografica completa.'
        },
        {
            id: 'pres-3',
            type: 'pdf',
            orientation: 'horizontal',
            title: 'Yeu SPA Pipa - Menu Trattamenti & Benessere Esotico',
            filename: 'Yeu_SPA_Menu_Trattamenti_2026.pdf',
            format: 'PDF Brochure • Orizzontale',
            pages: '8 Slide',
            size: '1.8 MB',
            src: 'uploads/Documenti/NEW%20Pr%C3%A9sentation%20structure%20Br%C3%A9sil.pdf',
            thumb: 'uploads/Loghi/YEU LOGOS/logo-horizontal-completa.png',
            description: 'Catalogo esclusivo dei rituali di rigenerazione fisica e mentale, aromaterapia e massaggi balinesi.'
        }
    ]
};

// ==========================================================================
// 2. STATO DELL'APPLICAZIONE
// ==========================================================================

const SombraState = {
    currentMedia: null,
    activeTendina: 'videos', // 'videos' | 'photos' | 'presentazioni' | null
    diaporama: {
        photos: SOMBRA_MEDIA_DATA.photos,
        currentIndex: 0,
        isPlaying: true,
        intervalMs: 4500,
        timer: null,
        progressTimer: null,
        progressPct: 0
    },
    cinemaLightsOff: false
};

// ==========================================================================
// 2.1 TRACCIAMENTO CANCELLAZIONI PERMANENTI & MINIATURE SICURE
// ==========================================================================

function getDeletedMediaKeys() {
    try {
        const stored = localStorage.getItem('watergarden_sombra_deleted_media');
        return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (e) {
        return new Set();
    }
}

function markMediaAsDeleted(id, filename) {
    const deleted = getDeletedMediaKeys();
    if (id) deleted.add(String(id));
    if (filename) deleted.add(String(filename).toLowerCase().trim());
    try {
        localStorage.setItem('watergarden_sombra_deleted_media', JSON.stringify(Array.from(deleted)));
    } catch (e) {
        console.error("Errore salvataggio watergarden_sombra_deleted_media:", e);
    }
}

function unmarkMediaAsDeleted(id, filename) {
    const deleted = getDeletedMediaKeys();
    let changed = false;
    if (id && deleted.has(String(id))) {
        deleted.delete(String(id));
        changed = true;
    }
    if (filename && deleted.has(String(filename).toLowerCase().trim())) {
        deleted.delete(String(filename).toLowerCase().trim());
        changed = true;
    }
    if (changed) {
        try {
            localStorage.setItem('watergarden_sombra_deleted_media', JSON.stringify(Array.from(deleted)));
        } catch (e) {
            console.error("Errore aggiornamento watergarden_sombra_deleted_media:", e);
        }
    }
}

// Genera una miniatura compressa a bassa risoluzione (max 160px) per evitare QuotaExceededError in localStorage
function createThumbnail(file, maxWidth = 160, maxHeight = 160) {
    return new Promise((resolve) => {
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    let w = img.width;
                    let h = img.height;
                    if (w > h) {
                        if (w > maxWidth) {
                            h = Math.round((h * maxWidth) / w);
                            w = maxWidth;
                        }
                    } else {
                        if (h > maxHeight) {
                            w = Math.round((w * maxHeight) / h);
                            h = maxHeight;
                        }
                    }
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.max(1, w);
                    canvas.height = Math.max(1, h);
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, w, h);
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
                img.onerror = () => resolve('uploads/Loghi/Logo Sombra palma.png');
                img.src = e.target.result;
            };
            reader.onerror = () => resolve('uploads/Loghi/Logo Sombra palma.png');
            reader.readAsDataURL(file);
        } catch (err) {
            resolve('uploads/Loghi/Logo Sombra palma.png');
        }
    });
}

function loadSombraSavedMedia() {
    try {
        const deletedKeys = getDeletedMediaKeys();

        const localKnownPaths = {
            'SPA Sombra 01.mp4': 'uploads/Documenti/Media/SPA%20Sombra%2001.mp4',
            'SPA Sombra Floresta 12.2024.MP4': 'uploads/Documenti/Media/SPA%20Sombra%20Floresta%2012.2024.MP4',
            'Sombra Floresta.mp4': 'uploads/Documenti/Media/Sombra%20Floresta.mp4'
        };

        const saved = localStorage.getItem('watergarden_sombra_media_v1');
        if (saved) {
            const parsed = JSON.parse(saved);

            if (parsed.videos && Array.isArray(parsed.videos)) {
                // Ripara eventuali percorsi con blob scaduti
                parsed.videos.forEach(v => {
                    if (localKnownPaths[v.filename]) {
                        v.src = localKnownPaths[v.filename];
                    } else if (v.src && v.src.startsWith('blob:')) {
                        v.src = `uploads/Documenti/Media/${encodeURIComponent(v.filename)}`;
                    }
                });
                // Filtra eliminando RIGOROSAMENTE qualsiasi video cancellato
                SOMBRA_MEDIA_DATA.videos = parsed.videos.filter(v => 
                    !deletedKeys.has(String(v.id)) && !deletedKeys.has(String(v.filename || '').toLowerCase().trim())
                );
            }

            if (parsed.photos && Array.isArray(parsed.photos)) {
                // Ripara percorsi foto salvate: risolvi percorsi reali e miniature corrette
                parsed.photos.forEach(p => {
                    const fname = p.filename || '';
                    if (fname.toUpperCase().startsWith('DSC_') || fname.toUpperCase().includes('DSC')) {
                        p.src = `uploads/Documenti/Media/Foto%20spa/${encodeURIComponent(fname)}`;
                        if (!p.thumb || p.thumb.startsWith('blob:') || p.thumb.includes('Foto%20spa')) {
                            p.thumb = `uploads/Documenti/Media/Foto%20spa/${encodeURIComponent(fname)}`;
                        }
                    } else if (fname === 'Logo Sombra palma.png' || fname === 'Sombra blu trasparente.png') {
                        p.src = `uploads/Loghi/${encodeURIComponent(fname)}`;
                        p.thumb = `uploads/Loghi/${encodeURIComponent(fname)}`;
                    } else if (p.thumb && p.thumb.startsWith('blob:') && fname) {
                        p.thumb = fname;
                        if (p.src && p.src.startsWith('blob:')) p.src = fname;
                    }
                });
                // Filtra eliminando RIGOROSAMENTE qualsiasi foto cancellata
                SOMBRA_MEDIA_DATA.photos = parsed.photos.filter(p => 
                    !deletedKeys.has(String(p.id)) && !deletedKeys.has(String(p.filename || '').toLowerCase().trim())
                );
            }

            if (parsed.presentazioni && Array.isArray(parsed.presentazioni)) {
                parsed.presentazioni.forEach(p => {
                    if (!p.thumb || p.thumb.includes('marca nova') || p.thumb.includes('trasparente')) {
                        p.thumb = 'uploads/Loghi/Logo Sombra palma.png';
                    }
                    if (!p.orientation) {
                        p.orientation = 'horizontal';
                    }
                });
                // Filtra eliminando RIGOROSAMENTE qualsiasi presentazione cancellata
                SOMBRA_MEDIA_DATA.presentazioni = parsed.presentazioni.filter(p => 
                    !deletedKeys.has(String(p.id)) && !deletedKeys.has(String(p.filename || '').toLowerCase().trim())
                );
            }
        } else {
            // Primo accesso assoluto (nessun dato in localStorage): applica eventuali chiavi cancellate ai dati predefiniti
            SOMBRA_MEDIA_DATA.videos = SOMBRA_MEDIA_DATA.videos.filter(v => 
                !deletedKeys.has(String(v.id)) && !deletedKeys.has(String(v.filename || '').toLowerCase().trim())
            );
            SOMBRA_MEDIA_DATA.photos = SOMBRA_MEDIA_DATA.photos.filter(p => 
                !deletedKeys.has(String(p.id)) && !deletedKeys.has(String(p.filename || '').toLowerCase().trim())
            );
            SOMBRA_MEDIA_DATA.presentazioni = SOMBRA_MEDIA_DATA.presentazioni.filter(p => 
                !deletedKeys.has(String(p.id)) && !deletedKeys.has(String(p.filename || '').toLowerCase().trim())
            );
        }

        // Salva lo stato pulito e sincronizzato
        saveSombraSavedMedia();

    } catch (e) {
        console.error("Errore nel recupero media salvati:", e);
    }
}

function saveSombraSavedMedia() {
    try {
        // Pulisce e sanitizza eventuali foto per evitare che stringhe base64 enormi superino la quota localStorage
        const sanitizedPhotos = (SOMBRA_MEDIA_DATA.photos || []).map(p => {
            const copy = { ...p };
            if (copy.thumb && copy.thumb.startsWith('data:') && copy.thumb.length > 80000) {
                copy.thumb = 'uploads/Loghi/Logo Sombra palma.png';
            }
            if (copy.src && copy.src.startsWith('data:') && copy.src.length > 80000) {
                copy.src = 'uploads/Loghi/Logo Sombra palma.png';
            }
            return copy;
        });

        localStorage.setItem('watergarden_sombra_media_v1', JSON.stringify({
            videos: SOMBRA_MEDIA_DATA.videos,
            photos: sanitizedPhotos,
            presentazioni: SOMBRA_MEDIA_DATA.presentazioni
        }));
    } catch (e) {
        console.error("Errore nel salvataggio media:", e);
    }
}

function resetSombraMediaToDefaults() {
    const lang = (typeof currentLang !== 'undefined' ? currentLang : 'it');
    const msg = (lang === 'it')
        ? "Ripristinare l'elenco originale dei file e media ufficiali di SPA Sombra Floresta?"
        : (lang === 'fr')
        ? "Réinitialiser la liste des fichiers multimédias officiels de SPA Sombra Floresta ?"
        : "Reset official media files of SPA Sombra Floresta to defaults?";

    if (confirm(msg)) {
        try {
            localStorage.removeItem('watergarden_sombra_media_v1');
            localStorage.removeItem('watergarden_sombra_deleted_media');
        } catch (e) {}
        location.reload();
    }
}

// ==========================================================================
// 3. INIZIALIZZAZIONE & EVENT LISTENERS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Carica eventuale ordine o titoli personalizzati salvati
    loadSombraSavedMedia();
    SombraState.diaporama.photos = SOMBRA_MEDIA_DATA.photos;

    // Renderizza le liste nelle tendine
    renderAllTendineLists();

    // Imposta il primo elemento (Video orizzontale di default)
    const initialMedia = SOMBRA_MEDIA_DATA.videos[0] || SOMBRA_MEDIA_DATA.photos[0] || SOMBRA_MEDIA_DATA.presentazioni[0];
    if (initialMedia) projectMedia(initialMedia);

    // Apri la tendina Videos di default
    toggleTendina('videos', true);

    // Setup Drag and Drop caricamento file esterni
    setupMediaDropzone();

    // Setup Scorciatoie da tastiera
    setupKeyboardShortcuts();
});

// ==========================================================================
// 4. PROIEZIONE SU GRANDE SCHERMO & GESTIONE SVUOTA SCHERMO / STANDBY
// ==========================================================================

function clearProjectionScreen() {
    SombraState.currentMedia = null;

    // Elementi UI del Theater
    const wrapper = document.getElementById('sombra-theater-wrapper');
    const badge = document.getElementById('theater-format-badge');
    const titleEl = document.getElementById('theater-file-title');
    const ambientGlow = document.getElementById('sombra-ambient-glow');
    const footerInfo = document.getElementById('theater-footer-info');
    const stageCloseBtn = document.getElementById('btn-stage-clear');

    const videoContainer = document.getElementById('sombra-video-container');
    const videoEl = document.getElementById('sombra-main-video');
    const diaporamaContainer = document.getElementById('sombra-diaporama-container');
    const pdfContainer = document.getElementById('sombra-pdf-container');
    const pdfFrame = document.getElementById('sombra-pdf-iframe');
    const standbyContainer = document.getElementById('sombra-standby-container');

    // Ferma video in modo immediato e definitivo (evita riproduzione audio in background)
    if (videoEl) {
        videoEl.onerror = null;
        videoEl.onplay = null;
        videoEl.pause();
        videoEl.muted = true;
        try {
            videoEl.currentTime = 0;
        } catch (e) {}
        videoEl.removeAttribute('src');
        videoEl.src = '';
        while (videoEl.firstChild) {
            videoEl.removeChild(videoEl.firstChild);
        }
        try {
            videoEl.load();
        } catch (e) {}
    }

    // Ferma diaporama
    stopDiaporamaAutoplay();

    // Svuota PDF iframe
    if (pdfFrame) {
        pdfFrame.src = 'about:blank';
    }

    // Nascondi container attivi e attiva standby
    if (videoContainer) videoContainer.classList.remove('active');
    if (diaporamaContainer) diaporamaContainer.classList.remove('active');
    if (pdfContainer) pdfContainer.classList.remove('active');
    if (standbyContainer) standbyContainer.classList.add('active');

    // Nascondi pulsante floating chiusura sullo stage
    if (stageCloseBtn) stageCloseBtn.style.display = 'none';

    // Se eravamo in schermo intero, esci per consentire la consultazione
    if (document.fullscreenElement || document.webkitFullscreenElement || (wrapper && wrapper.classList.contains('theater-maximized'))) {
        exitTheaterFullscreen();
    }

    // Resetta testi e badge con supporto i18n
    const lang = (typeof currentLang !== 'undefined' ? currentLang : 'fr');
    const dict = (window.translations && window.translations[lang]) ? window.translations[lang] : {};

    if (badge) {
        badge.innerHTML = `<i class="fa-solid fa-tv"></i> ${dict.sombra_standby_badge || 'Écran en Veille'}`;
        badge.style.color = '#94a3b8';
        badge.style.borderColor = 'rgba(148, 163, 184, 0.3)';
    }

    if (titleEl) {
        titleEl.textContent = dict.sombra_standby_title || 'Écran en Veille • Prêt pour la Projection';
    }

    if (footerInfo) {
        footerInfo.innerHTML = `<span style="color: var(--text-muted);"><i class="fa-solid fa-hand-pointer"></i> ${dict.sombra_standby_footer || 'Sélectionnez ou double-cliquez sur un média pour lancer la projection sur grand écran'}</span>`;
    }

    // Resetta ambient backlight
    if (ambientGlow) {
        ambientGlow.style.backgroundImage = 'none';
    }

    // Deseleziona elementi attivi nelle tendine
    document.querySelectorAll('.sombra-doc-row').forEach(row => row.classList.remove('projecting-active'));
}

function projectMedia(mediaItem) {
    if (!mediaItem) return;
    SombraState.currentMedia = mediaItem;

    // Elementi UI del Theater
    const wrapper = document.getElementById('sombra-theater-wrapper');
    const badge = document.getElementById('theater-format-badge');
    const titleEl = document.getElementById('theater-file-title');
    const ambientGlow = document.getElementById('sombra-ambient-glow');
    const footerInfo = document.getElementById('theater-footer-info');
    const stageCloseBtn = document.getElementById('btn-stage-clear');

    const videoContainer = document.getElementById('sombra-video-container');
    const videoEl = document.getElementById('sombra-main-video');
    const diaporamaContainer = document.getElementById('sombra-diaporama-container');
    const pdfContainer = document.getElementById('sombra-pdf-container');
    const pdfFrame = document.getElementById('sombra-pdf-iframe');
    const standbyContainer = document.getElementById('sombra-standby-container');

    // Nascondi standby e mostra pulsante chiudi sullo stage
    if (standbyContainer) standbyContainer.classList.remove('active');
    if (stageCloseBtn) stageCloseBtn.style.display = 'inline-flex';

    // Aggiorna testi barra superiore
    if (titleEl) titleEl.textContent = mediaItem.title;
    if (footerInfo) {
        footerInfo.innerHTML = `<strong>${mediaItem.filename}</strong> &bull; ${mediaItem.size} &bull; Formato: <span style="color: #38bdf8;">${mediaItem.format}</span>`;
    }

    // Aggiorna ambient backlight glow
    if (ambientGlow) {
        const bgImg = mediaItem.thumb || mediaItem.src;
        ambientGlow.style.backgroundImage = `url('${bgImg}')`;
    }

    // Ferma eventuali video o autoplay precedenti
    if (videoEl) {
        videoEl.onerror = null;
        videoEl.pause();
        videoEl.muted = true;
        try { videoEl.currentTime = 0; } catch (e) {}
        videoEl.removeAttribute('src');
        videoEl.src = '';
        while (videoEl.firstChild) {
            videoEl.removeChild(videoEl.firstChild);
        }
        try { videoEl.load(); } catch (e) {}
    }
    stopDiaporamaAutoplay();

    // -------------------------------------------------------------
    // CASO 1: VIDEO (Orizzontale 16:9 o Verticale 9:16 Reel)
    // -------------------------------------------------------------
    if (mediaItem.type === 'video') {
        if (badge) {
            badge.innerHTML = mediaItem.orientation === 'vertical'
                ? '<i class="fa-solid fa-mobile-screen"></i> REEL VERTICALE 9:16'
                : '<i class="fa-solid fa-clapperboard"></i> VIDEO HD 16:9';
            badge.style.color = mediaItem.orientation === 'vertical' ? '#f43f5e' : '#34d399';
            badge.style.borderColor = mediaItem.orientation === 'vertical' ? 'rgba(244, 63, 94, 0.4)' : 'rgba(52, 211, 153, 0.4)';
        }

        // Mostra container video e nascondi gli altri
        videoContainer.classList.add('active');
        diaporamaContainer.classList.remove('active');
        pdfContainer.classList.remove('active');

        // Rileva orientamento (verticale se reel o 12.2024 o esplicitato)
        const isVert = mediaItem.orientation === 'vertical' || 
            (mediaItem.filename && (mediaItem.filename.includes('12.2024') || mediaItem.filename.toLowerCase().includes('reel')));
        mediaItem.orientation = isVert ? 'vertical' : 'horizontal';

        // Configura classe modalità (horizontal vs vertical)
        if (isVert) {
            videoContainer.className = 'sombra-video-container active mode-vertical';
        } else {
            videoContainer.className = 'sombra-video-container active mode-horizontal';
        }

        // Carica sorgente video con fallback robusto
        if (videoEl) {
            videoEl.muted = false;
            videoEl.onerror = () => {
                if (!SombraState.currentMedia || SombraState.currentMedia.type !== 'video') return;
                console.warn('Errore caricamento video su:', videoEl.src);
                const localFallback = `uploads/Documenti/Media/${encodeURIComponent(mediaItem.filename)}`;
                if (!videoEl.src.includes('uploads/Documenti/Media/')) {
                    console.log('Tentativo fallback su file locale:', localFallback);
                    videoEl.src = localFallback;
                    videoEl.load();
                    videoEl.play().catch(() => {});
                }
            };

            videoEl.src = mediaItem.src;
            videoEl.load();
            videoEl.play().catch(err => {
                console.log('Autoplay video bloccato dal browser:', err);
            });
        }
    }

    // -------------------------------------------------------------
    // CASO 2: DIAPORAMA FOTOGRAFICO (Slideshow con Autoplay & Frecce)
    // -------------------------------------------------------------
    else if (mediaItem.type === 'photo') {
        if (badge) {
            badge.innerHTML = '<i class="fa-solid fa-camera-retro"></i> DIAPORAMA FOTOGRAFICO HD';
            badge.style.color = '#fbbf24';
            badge.style.borderColor = 'rgba(251, 191, 36, 0.4)';
        }

        videoContainer.classList.remove('active');
        diaporamaContainer.classList.add('active');
        pdfContainer.classList.remove('active');

        // Trova l'indice della foto nella lista diaporama
        const idx = SombraState.diaporama.photos.findIndex(p => p.id === mediaItem.id || p.src === mediaItem.src);
        SombraState.diaporama.currentIndex = idx >= 0 ? idx : 0;

        showDiaporamaSlide(SombraState.diaporama.currentIndex);

        // Avvia autoplay se abilitato
        if (SombraState.diaporama.isPlaying) {
            startDiaporamaAutoplay();
        }
    }

    // -------------------------------------------------------------
    // CASO 3: PRESENTAZIONI / PDF (Con Riconoscimento Automatico Aspetto Orizzontale/Verticale)
    // -------------------------------------------------------------
    else if (mediaItem.type === 'pdf') {
        // Riconoscimento automatico dell'aspetto:
        // Di default per presentazioni multimediali slide è orizzontale (16:9)
        if (!mediaItem.orientation) {
            const lowerName = (mediaItem.filename || mediaItem.title || '').toLowerCase();
            if (lowerName.includes('balancete') || lowerName.includes('contrat') || lowerName.includes('statut') || lowerName.includes('a4') || lowerName.includes('vert')) {
                mediaItem.orientation = 'vertical';
            } else {
                mediaItem.orientation = 'horizontal';
            }
        }

        applyPdfAspectUI(mediaItem.orientation);

        if (badge) {
            badge.innerHTML = mediaItem.orientation === 'horizontal'
                ? '<i class="fa-solid fa-file-powerpoint"></i> SLIDE DECK ORIZZONTALE'
                : '<i class="fa-solid fa-file-pdf"></i> DOCUMENTO PDF VERTICALE';
            badge.style.color = '#ec4899';
            badge.style.borderColor = 'rgba(236, 72, 153, 0.4)';
        }

        videoContainer.classList.remove('active');
        diaporamaContainer.classList.remove('active');
        pdfContainer.classList.add('active');

        if (pdfFrame) {
            const cleanSrc = (mediaItem.src || '').split('#')[0];
            const param = mediaItem.orientation === 'horizontal' ? '#page=1&view=Fit' : '#view=FitH';
            pdfFrame.src = cleanSrc + param;
        }

        const pdfTitle = document.getElementById('sombra-pdf-title-tag');
        if (pdfTitle) pdfTitle.textContent = `${mediaItem.title} (${mediaItem.pages || 'PDF'})`;

        const cleanUrl = (mediaItem.src || '').split('#')[0];
        const dlBtn = document.getElementById('sombra-pdf-download-btn');
        if (dlBtn) dlBtn.href = cleanUrl;
        const extBtn = document.getElementById('sombra-pdf-ext-btn');
        if (extBtn) extBtn.href = cleanUrl;
    }

    // Evidenzia elemento attualmente proiettato nella lista tendina
    highlightProjectedItem(mediaItem.id);

    // Feedback visivo con smooth scroll se lo schermo è fuori visuale
    const theaterRect = wrapper.getBoundingClientRect();
    if (theaterRect.top < -50 || theaterRect.bottom > window.innerHeight + 100) {
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function setPdfAspect(mode) {
    if (!SombraState.currentMedia || SombraState.currentMedia.type !== 'pdf') return;
    SombraState.currentMedia.orientation = mode;
    applyPdfAspectUI(mode);

    const pdfFrame = document.getElementById('sombra-pdf-iframe');
    const badge = document.getElementById('theater-format-badge');

    if (badge) {
        badge.innerHTML = mode === 'horizontal'
            ? '<i class="fa-solid fa-file-powerpoint"></i> SLIDE DECK ORIZZONTALE'
            : '<i class="fa-solid fa-file-pdf"></i> DOCUMENTO PDF VERTICALE';
    }

    if (pdfFrame && SombraState.currentMedia.src) {
        const cleanSrc = SombraState.currentMedia.src.split('#')[0];
        const param = mode === 'horizontal' ? '#page=1&view=Fit' : '#view=FitH';
        pdfFrame.src = cleanSrc + param;
    }
    saveSombraSavedMedia();
}

function applyPdfAspectUI(mode) {
    const pdfContainer = document.getElementById('sombra-pdf-container');
    const btnHoriz = document.getElementById('btn-pdf-aspect-horiz');
    const btnVert = document.getElementById('btn-pdf-aspect-vert');

    if (pdfContainer) {
        pdfContainer.classList.remove('mode-horizontal', 'mode-vertical');
        pdfContainer.classList.add(mode === 'horizontal' ? 'mode-horizontal' : 'mode-vertical');
    }

    if (btnHoriz && btnVert) {
        btnHoriz.classList.toggle('active', mode === 'horizontal');
        btnVert.classList.toggle('active', mode === 'vertical');
    }
}

// ==========================================================================
// 5. GESTIONE DIAPORAMA FOTO (Autoplay, Frecce Destra/Sinistra, Timer)
// ==========================================================================

function showDiaporamaSlide(index) {
    const photos = SombraState.diaporama.photos;
    if (!photos || photos.length === 0) return;

    if (index >= photos.length) index = 0;
    if (index < 0) index = photos.length - 1;

    SombraState.diaporama.currentIndex = index;
    const currentPhoto = photos[index];

    const imgEl = document.getElementById('sombra-diaporama-img');
    const counterEl = document.getElementById('diaporama-counter');
    const titleEl = document.getElementById('theater-file-title');
    const ambientGlow = document.getElementById('sombra-ambient-glow');

    if (imgEl) {
        imgEl.onerror = () => {
            imgEl.onerror = null;
            const fname = currentPhoto.filename || '';
            if (fname.toUpperCase().startsWith('DSC_') || fname.toLowerCase().includes('dsc')) {
                imgEl.src = `uploads/Documenti/Media/Foto%20spa/${encodeURIComponent(fname)}`;
            } else if (fname) {
                imgEl.src = `uploads/Documenti/Media/${encodeURIComponent(fname)}`;
            }
        };
        imgEl.style.opacity = '0';
        setTimeout(() => {
            imgEl.src = currentPhoto.src;
            imgEl.alt = currentPhoto.title;
            imgEl.style.opacity = '1';
        }, 120);
    }

    if (counterEl) {
        counterEl.textContent = `${index + 1} / ${photos.length}`;
    }

    if (titleEl) {
        titleEl.textContent = currentPhoto.title;
    }

    if (ambientGlow) {
        ambientGlow.style.backgroundImage = `url('${currentPhoto.src}')`;
    }

    highlightProjectedItem(currentPhoto.id);
    resetDiaporamaProgressBar();
}

function nextSlide() {
    showDiaporamaSlide(SombraState.diaporama.currentIndex + 1);
    if (SombraState.diaporama.isPlaying) {
        restartDiaporamaAutoplay();
    }
}

function prevSlide() {
    showDiaporamaSlide(SombraState.diaporama.currentIndex - 1);
    if (SombraState.diaporama.isPlaying) {
        restartDiaporamaAutoplay();
    }
}

function startDiaporamaAutoplay() {
    stopDiaporamaAutoplay();
    SombraState.diaporama.isPlaying = true;

    const btn = document.getElementById('btn-diaporama-autoplay');
    if (btn) {
        btn.classList.remove('paused');
        btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausa';
        btn.title = 'Metti in pausa lo scorrimento automatico';
    }

    startDiaporamaProgressBar();

    SombraState.diaporama.timer = setInterval(() => {
        showDiaporamaSlide(SombraState.diaporama.currentIndex + 1);
    }, SombraState.diaporama.intervalMs);
}

function stopDiaporamaAutoplay() {
    if (SombraState.diaporama.timer) {
        clearInterval(SombraState.diaporama.timer);
        SombraState.diaporama.timer = null;
    }
    if (SombraState.diaporama.progressTimer) {
        clearInterval(SombraState.diaporama.progressTimer);
        SombraState.diaporama.progressTimer = null;
    }
    const bar = document.getElementById('diaporama-progressbar');
    if (bar) bar.style.width = '0%';

    const btn = document.getElementById('btn-diaporama-autoplay');
    if (btn) {
        btn.classList.add('paused');
        btn.innerHTML = '<i class="fa-solid fa-play"></i> Autoplay';
        btn.title = 'Avvia lo scorrimento automatico';
    }
}

function toggleDiaporamaAutoplay() {
    if (SombraState.diaporama.isPlaying) {
        SombraState.diaporama.isPlaying = false;
        stopDiaporamaAutoplay();
    } else {
        SombraState.diaporama.isPlaying = true;
        startDiaporamaAutoplay();
    }
}

function restartDiaporamaAutoplay() {
    stopDiaporamaAutoplay();
    startDiaporamaAutoplay();
}

function setDiaporamaSpeed(seconds) {
    SombraState.diaporama.intervalMs = seconds * 1000;
    if (SombraState.diaporama.isPlaying) {
        restartDiaporamaAutoplay();
    }
}

function startDiaporamaProgressBar() {
    const bar = document.getElementById('diaporama-progressbar');
    if (!bar) return;

    let elapsed = 0;
    const step = 50;
    const total = SombraState.diaporama.intervalMs;

    bar.style.width = '0%';
    if (SombraState.diaporama.progressTimer) clearInterval(SombraState.diaporama.progressTimer);

    SombraState.diaporama.progressTimer = setInterval(() => {
        elapsed += step;
        const pct = Math.min(100, (elapsed / total) * 100);
        bar.style.width = `${pct}%`;
        if (elapsed >= total) {
            elapsed = 0;
            bar.style.width = '0%';
        }
    }, step);
}

function resetDiaporamaProgressBar() {
    if (SombraState.diaporama.isPlaying) {
        startDiaporamaProgressBar();
    } else {
        const bar = document.getElementById('diaporama-progressbar');
        if (bar) bar.style.width = '0%';
    }
}

// ==========================================================================
// 6. GESTIONE TENDINE (ACCORDION) & DOPPIO CLIC SUI DOCUMENTI
// ==========================================================================

function toggleTendina(catName, forceOpen = false) {
    const categories = ['videos', 'photos', 'presentazioni'];

    categories.forEach(cat => {
        const card = document.getElementById(`card-cat-${cat}`);
        const tendina = document.getElementById(`tendina-${cat}`);

        if (cat === catName) {
            const isOpen = tendina.classList.contains('open');
            if (isOpen && !forceOpen) {
                // Chiudi
                tendina.classList.remove('open');
                card.classList.remove('active');
                SombraState.activeTendina = null;
            } else {
                // Apri
                tendina.classList.add('open');
                card.classList.add('active');
                SombraState.activeTendina = cat;
            }
        } else {
            // Chiudi le altre per un'esperienza a fisarmonica pulita
            tendina.classList.remove('open');
            card.classList.remove('active');
        }
    });
}

function handleThumbnailError(imgEl, category, encodedFilename, id) {
    if (!imgEl) return;
    const filename = decodeURIComponent(encodedFilename || '');
    const attempts = parseInt(imgEl.getAttribute('data-attempts') || '0', 10);
    imgEl.setAttribute('data-attempts', attempts + 1);

    if (attempts === 0 && (filename.toUpperCase().startsWith('DSC_') || filename.toLowerCase().includes('dsc'))) {
        imgEl.src = `uploads/Documenti/Media/Foto%20spa/${encodeURIComponent(filename)}`;
    } else if (attempts === 0 || attempts === 1) {
        imgEl.src = `uploads/Documenti/Media/${encodeURIComponent(filename)}`;
    } else if (attempts === 2) {
        imgEl.src = `uploads/Loghi/${encodeURIComponent(filename)}`;
    } else if (attempts === 3) {
        imgEl.src = encodeURIComponent(filename);
    } else {
        imgEl.onerror = null;
        imgEl.style.display = 'none';
        if (imgEl.parentElement) {
            imgEl.parentElement.innerHTML = `<i class="fa-solid fa-camera-retro" style="font-size: 1.25rem; color: #fbbf24;"></i>`;
        }
    }
}

function renderAllTendineLists() {
    renderTendinaList('videos', SOMBRA_MEDIA_DATA.videos);
    renderTendinaList('photos', SOMBRA_MEDIA_DATA.photos);
    renderTendinaList('presentazioni', SOMBRA_MEDIA_DATA.presentazioni);
}

function renderTendinaList(category, items) {
    const container = document.getElementById(`list-${category}`);
    if (!container) return;

    container.innerHTML = '';

    if (!items || items.length === 0) {
        container.innerHTML = `
            <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
                <i class="fa-solid fa-folder-open" style="font-size: 1.8rem; margin-bottom: 0.5rem; display: block; opacity: 0.4;"></i>
                Nessun file presente in questa sezione. Trascina o carica nuovi file per aggiungerli.
            </div>
        `;
        const countBadge = document.getElementById(`count-cat-${category}`);
        if (countBadge) {
            countBadge.textContent = `0 ${category === 'videos' ? 'Video' : category === 'photos' ? 'Foto' : 'PDF'}`;
        }
        return;
    }

    items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'sombra-file-item';
        row.id = `item-row-${item.id}`;
        row.dataset.id = item.id;
        row.dataset.category = category;
        row.setAttribute('draggable', 'true');

        // DOPPIO CLIC per proiettare sul grande schermo come da specifica utente!
        row.ondblclick = (e) => {
            e.preventDefault();
            projectMedia(item);
        };

        // Singolo clic: seleziona visivamente
        row.onclick = (e) => {
            if (!e.target.closest('.sombra-file-actions') && !e.target.closest('.sombra-drag-handle')) {
                document.querySelectorAll('.sombra-file-item').forEach(el => el.style.borderColor = '');
                row.style.borderColor = 'rgba(56, 189, 248, 0.6)';
            }
        };

        // -------------------------------------------------------------
        // DRAG & DROP PER SPOSTARE I FILE IN SU ED IN GIÙ A PIACIMENTO
        // -------------------------------------------------------------
        row.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({ id: item.id, category: category }));
            e.dataTransfer.effectAllowed = 'move';
            row.classList.add('sombra-row-dragging');
        };

        row.ondragend = () => {
            row.classList.remove('sombra-row-dragging');
            document.querySelectorAll('.sombra-file-item').forEach(el => {
                el.classList.remove('sombra-drag-over-top', 'sombra-drag-over-bottom');
            });
        };

        row.ondragover = (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            const rect = row.getBoundingClientRect();
            const mid = rect.top + rect.height / 2;
            if (e.clientY < mid) {
                row.classList.add('sombra-drag-over-top');
                row.classList.remove('sombra-drag-over-bottom');
            } else {
                row.classList.add('sombra-drag-over-bottom');
                row.classList.remove('sombra-drag-over-top');
            }
        };

        row.ondragleave = () => {
            row.classList.remove('sombra-drag-over-top', 'sombra-drag-over-bottom');
        };

        row.ondrop = (e) => {
            e.preventDefault();
            row.classList.remove('sombra-drag-over-top', 'sombra-drag-over-bottom');

            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                if (!data || data.category !== category || data.id === item.id) return;

                const list = SOMBRA_MEDIA_DATA[category];
                const fromIdx = list.findIndex(x => x.id === data.id);
                const toIdx = list.findIndex(x => x.id === item.id);
                if (fromIdx === -1 || toIdx === -1) return;

                const rect = row.getBoundingClientRect();
                const mid = rect.top + rect.height / 2;
                const insertBefore = e.clientY < mid;

                const [draggedItem] = list.splice(fromIdx, 1);
                let targetPos = list.findIndex(x => x.id === item.id);
                if (!insertBefore) targetPos += 1;
                list.splice(targetPos, 0, draggedItem);

                // Salva il nuovo ordine permanente
                saveSombraSavedMedia();

                // Se la categoria è photos, aggiorna la sequenza del diaporama
                if (category === 'photos') {
                    SombraState.diaporama.photos = list;
                }

                // Ridisegna la lista con il nuovo ordine
                renderTendinaList(category, list);
            } catch (err) {
                console.error("Errore drag and drop sombra:", err);
            }
        };

        let badgeTag = '';
        if (item.type === 'video') {
            badgeTag = `<span class="badge" style="background: rgba(2, 132, 199, 0.2); color: #38bdf8; border: 1px solid rgba(2, 132, 199, 0.4);">${item.format}</span>`;
        } else if (item.type === 'photo') {
            badgeTag = `<span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4);">${item.format}</span>`;
        } else if (item.type === 'pdf') {
            badgeTag = `<span class="badge" style="background: rgba(236, 72, 153, 0.2); color: #f472b6; border: 1px solid rgba(236, 72, 153, 0.4);">${item.format}</span>`;
        }

        const thumbHtml = item.thumb 
            ? `<img src="${item.thumb}" alt="${item.title}" onerror="handleThumbnailError(this, '${category}', '${encodeURIComponent(item.filename || '')}', '${item.id}')" loading="lazy">` 
            : `<i class="fa-solid ${item.type === 'video' ? 'fa-video' : item.type === 'photo' ? 'fa-image' : 'fa-file-pdf'}"></i>`;

        row.innerHTML = `
            <div class="sombra-drag-handle" title="Trascina in su o in giù per riordinare la lista">
                <i class="fa-solid fa-grip-vertical"></i>
            </div>
            <div class="sombra-file-thumb">
                ${thumbHtml}
            </div>
            <div class="sombra-file-details">
                <div class="sombra-file-name">
                    <span>${item.title}</span>
                    ${badgeTag}
                </div>
                <div class="sombra-file-subtext">
                    <span><i class="fa-solid fa-file-code"></i> ${item.filename}</span>
                    <span><i class="fa-solid fa-hard-drive"></i> ${item.size}</span>
                    ${item.duration ? `<span><i class="fa-solid fa-clock"></i> ${item.duration}</span>` : ''}
                    ${item.pages ? `<span><i class="fa-solid fa-book-open"></i> ${item.pages}</span>` : ''}
                    <span class="sombra-dblclick-hint" title="Fai doppio clic con il mouse per proiettare subito">
                        <i class="fa-solid fa-hand-pointer"></i> Doppio clic per proiettare
                    </span>
                </div>
            </div>
            <div class="sombra-file-actions">
                <button type="button" class="sombra-btn-project" onclick="projectMediaById('${category}', '${item.id}')" title="Proietta immediatamente sullo schermo">
                    <i class="fa-solid fa-play"></i> Proietta Ora
                </button>
                <button type="button" class="sombra-btn-action-icon sombra-btn-edit" onclick="editMediaTitle('${category}', '${item.id}', event)" title="Modifica titolo del file">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button type="button" class="sombra-btn-action-icon sombra-btn-download" onclick="downloadMediaItem('${category}', '${item.id}', event)" title="Scarica file su PC">
                    <i class="fa-solid fa-download"></i>
                </button>
                <button type="button" class="sombra-btn-action-icon sombra-btn-delete" onclick="deleteMediaItem('${category}', '${item.id}', event)" title="Elimina file dalla lista">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;

        container.appendChild(row);
    });

    // Aggiorna contatore card
    const countBadge = document.getElementById(`count-cat-${category}`);
    if (countBadge) {
        countBadge.textContent = `${items.length} ${category === 'videos' ? 'Video' : category === 'photos' ? 'Foto' : 'PDF'}`;
    }
}

function highlightProjectedItem(id) {
    document.querySelectorAll('.sombra-file-item').forEach(el => {
        el.classList.remove('projected');
    });
    const target = document.getElementById(`item-row-${id}`);
    if (target) {
        target.classList.add('projected');
    }
}

// Download file locale / remoto su PC
function downloadMediaItem(category, id, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const list = SOMBRA_MEDIA_DATA[category];
    const item = list ? list.find(x => x.id === id) : null;
    if (!item) return;

    // Crea un link invisibile per il salvataggio file
    const a = document.createElement('a');
    a.href = item.src;
    a.download = item.filename || `${item.title}.${item.type === 'video' ? 'mp4' : item.type === 'photo' ? 'jpg' : 'pdf'}`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        if (a.parentNode) a.parentNode.removeChild(a);
    }, 250);
}

// Cancellazione definitiva del file dalla lista con icona cestino
function deleteMediaItem(category, id, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const list = SOMBRA_MEDIA_DATA[category];
    if (!list) return;

    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return;

    const item = list[idx];
    const ok = confirm(`Eliminare il file "${item.title}" (${item.filename}) dalla lista?`);
    if (!ok) return;

    // 1. Registra ID e nome file come eliminati permanentemente (non torneranno alla riapertura)
    markMediaAsDeleted(item.id, item.filename);

    // 2. Rimuovi l'elemento dall'array in memoria
    list.splice(idx, 1);

    // 3. Se la categoria è photos, aggiorna la sequenza del diaporama
    if (category === 'photos') {
        SombraState.diaporama.photos = SOMBRA_MEDIA_DATA.photos;
        if (SombraState.diaporama.currentIndex >= SombraState.diaporama.photos.length) {
            SombraState.diaporama.currentIndex = Math.max(0, SombraState.diaporama.photos.length - 1);
        }
        if (SombraState.diaporama.photos.length === 0) {
            stopDiaporamaAutoplay();
        }
    }

    // 4. Salva le modifiche permanenti nel localStorage
    saveSombraSavedMedia();

    // 5. Ridisegna immediatamente la lista nella tendina
    renderTendinaList(category, list);

    // 6. Se il file rimosso è quello attualmente proiettato sul grande schermo, passa al fallback o standby
    if (SombraState.currentMedia && SombraState.currentMedia.id === id) {
        if (list.length > 0) {
            projectMedia(list[0]);
        } else {
            const fallback = (SOMBRA_MEDIA_DATA.videos && SOMBRA_MEDIA_DATA.videos[0]) || 
                             (SOMBRA_MEDIA_DATA.photos && SOMBRA_MEDIA_DATA.photos[0]) || 
                             (SOMBRA_MEDIA_DATA.presentazioni && SOMBRA_MEDIA_DATA.presentazioni[0]);
            if (fallback) {
                projectMedia(fallback);
            } else {
                clearProjectionScreen();
            }
        }
    }
}

// Modifica titolo del file con icona matita
function editMediaTitle(category, id, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const list = SOMBRA_MEDIA_DATA[category];
    const item = list ? list.find(x => x.id === id) : null;
    if (!item) return;

    const newTitle = prompt('Modifica titolo del file multimediale:', item.title);
    if (newTitle === null) return;
    const clean = newTitle.trim();
    if (!clean) {
        alert('Il titolo non può essere vuoto.');
        return;
    }

    item.title = clean;
    saveSombraSavedMedia();

    // Se è il file attualmente proiettato, aggiorna anche il grande schermo
    if (SombraState.currentMedia && SombraState.currentMedia.id === id) {
        SombraState.currentMedia.title = clean;
        const titleEl = document.getElementById('theater-file-title');
        if (titleEl) titleEl.textContent = clean;
    }

    renderTendinaList(category, list);
}

// ==========================================================================
// 7. CARICAMENTO LOCALE & DRAG AND DROP (.mp4, .mpg4, .jpg, .pdf)
// ==========================================================================

function setupMediaDropzone() {
    const dropzone = document.getElementById('sombra-file-dropzone');
    const fileInput = document.getElementById('sombra-file-input');

    if (!dropzone || !fileInput) return;

    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        handleImportedFiles(e.target.files);
    });

    ['dragenter', 'dragover'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.style.borderColor = '#10b981';
            dropzone.style.background = 'rgba(16, 185, 129, 0.15)';
        });
    });

    ['dragleave', 'drop'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.style.borderColor = '';
            dropzone.style.background = '';
        });
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleImportedFiles(files);
    });
}

function handleImportedFiles(files) {
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        const objUrl = URL.createObjectURL(file);
        const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

        let newItem = null;

        // Video MP4 / MPG4
        if (['mp4', 'mpg4', 'webm', 'mov'].includes(ext)) {
            const isReel = file.name.includes('12.2024') || file.name.toLowerCase().includes('reel');
            const localKnown = {
                'SPA Sombra 01.mp4': 'uploads/Documenti/Media/SPA%20Sombra%2001.mp4',
                'SPA Sombra Floresta 12.2024.MP4': 'uploads/Documenti/Media/SPA%20Sombra%20Floresta%2012.2024.MP4',
                'Sombra Floresta.mp4': 'uploads/Documenti/Media/Sombra%20Floresta.mp4'
            };
            const finalSrc = localKnown[file.name] || objUrl;

            newItem = {
                id: 'custom-vid-' + Date.now(),
                type: 'video',
                orientation: isReel ? 'vertical' : 'horizontal',
                title: file.name.replace(/\.[^/.]+$/, ""),
                filename: file.name,
                format: isReel ? 'MP4 9:16 • Verticale Reel' : 'MP4 Video Personale',
                duration: 'Custom',
                size: sizeStr,
                thumb: 'uploads/Loghi/Logo Sombra palma.png',
                src: finalSrc,
                description: 'File video caricato localmente dall\'utente.'
            };
            unmarkMediaAsDeleted(newItem.id, file.name);
            SOMBRA_MEDIA_DATA.videos.unshift(newItem);
            saveSombraSavedMedia();
            renderTendinaList('videos', SOMBRA_MEDIA_DATA.videos);
            toggleTendina('videos', true);
            projectMedia(newItem);
        }
        // Foto JPG / JPEG / PNG
        else if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
            const isSpa = file.name.toUpperCase().startsWith('DSC_') || file.name.toUpperCase().includes('DSC') || file.name.toLowerCase().includes('spa');
            const resolvedSrc = isSpa ? `uploads/Documenti/Media/Foto%20spa/${encodeURIComponent(file.name)}` : objUrl;

            newItem = {
                id: 'custom-pho-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
                type: 'photo',
                title: file.name.replace(/\.[^/.]+$/, ""),
                filename: file.name,
                format: 'Foto HD Personale',
                resolution: 'High Res',
                size: sizeStr,
                thumb: isSpa ? resolvedSrc : 'uploads/Loghi/Logo Sombra palma.png',
                src: resolvedSrc,
                description: 'Fotografia caricata localmente dall\'utente per il diaporama.'
            };

            unmarkMediaAsDeleted(newItem.id, file.name);

            // Se è un file caricato dal computer, genera una miniatura leggera compressa (canvas max 160px)
            // così la foto piccolina rimane visibile dopo il ricaricamento senza sforare la quota del localStorage
            if (!isSpa) {
                createThumbnail(file).then(thumbDataUrl => {
                    newItem.thumb = thumbDataUrl;
                    saveSombraSavedMedia();
                    renderTendinaList('photos', SOMBRA_MEDIA_DATA.photos);
                });
            }

            SOMBRA_MEDIA_DATA.photos.unshift(newItem);
            SombraState.diaporama.photos = SOMBRA_MEDIA_DATA.photos;
            saveSombraSavedMedia();
            renderTendinaList('photos', SOMBRA_MEDIA_DATA.photos);
            toggleTendina('photos', true);
            projectMedia(newItem);
        }
        // PDF Presentazioni
        else if (ext === 'pdf') {
            const isVert = file.name.toLowerCase().includes('balancete') || 
                           file.name.toLowerCase().includes('contrat') || 
                           file.name.toLowerCase().includes('statut') || 
                           file.name.toLowerCase().includes('vert') || 
                           file.name.toLowerCase().includes('a4');
            newItem = {
                id: 'custom-pres-' + Date.now(),
                type: 'pdf',
                orientation: isVert ? 'vertical' : 'horizontal',
                title: file.name.replace(/\.[^/.]+$/, ""),
                filename: file.name,
                format: isVert ? 'Documento PDF Verticale' : 'PDF Slide Deck • Orizzontale',
                pages: 'Presentazione',
                size: sizeStr,
                thumb: 'uploads/Loghi/Logo Sombra palma.png',
                src: objUrl,
                description: 'Presentazione caricata localmente dall\'utente.'
            };
            unmarkMediaAsDeleted(newItem.id, file.name);
            SOMBRA_MEDIA_DATA.presentazioni.unshift(newItem);
            saveSombraSavedMedia();
            renderTendinaList('presentazioni', SOMBRA_MEDIA_DATA.presentazioni);
            toggleTendina('presentazioni', true);
            projectMedia(newItem);
        } else {
            alert(`Formato .${ext} non supportato per la proiezione multimediale. Usare .mp4, .mpg4, .jpg, .png o .pdf`);
        }
    });
}

// ==========================================================================
// 8. CONTROLLI THEATER: LUCI CINEMA & FULLSCREEN
// ==========================================================================

function toggleCinemaLight() {
    SombraState.cinemaLightsOff = !SombraState.cinemaLightsOff;
    const body = document.body;
    const btn = document.getElementById('btn-theater-lights');
    const lbl = document.getElementById('lbl-theater-lights');

    if (SombraState.cinemaLightsOff) {
        body.classList.add('cinema-lights-dimmed');
        if (btn) btn.classList.add('active');
        if (lbl) lbl.textContent = 'Riaccendi Luci';
    } else {
        body.classList.remove('cinema-lights-dimmed');
        if (btn) btn.classList.remove('active');
        if (lbl) lbl.textContent = 'Luci Cinema';
    }
}

// Cliccando sullo sfondo oscurato, riaccendi le luci
document.addEventListener('click', (e) => {
    if (SombraState.cinemaLightsOff) {
        const theater = document.getElementById('sombra-theater-wrapper');
        const btn = document.getElementById('btn-theater-lights');
        if (theater && !theater.contains(e.target) && (!btn || !btn.contains(e.target))) {
            toggleCinemaLight();
        }
    }
});

function toggleTheaterFullscreen() {
    const wrapper = document.getElementById('sombra-theater-wrapper');
    const stage = document.getElementById('sombra-screen-stage');
    if (!stage) return;

    const isNativeFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const isMaximized = wrapper && wrapper.classList.contains('theater-maximized');

    if (isNativeFs || isMaximized) {
        exitTheaterFullscreen();
    } else {
        // Avvia schermo intero nativo del browser
        if (stage.requestFullscreen) {
            stage.requestFullscreen().catch(err => {
                console.warn('Native fullscreen blocked, fallback a modalità teatro ingrandita:', err);
                enterWindowMaximize();
            });
        } else if (stage.webkitRequestFullscreen) {
            stage.webkitRequestFullscreen();
        } else {
            enterWindowMaximize();
        }
    }
}

function enterWindowMaximize() {
    const wrapper = document.getElementById('sombra-theater-wrapper');
    if (wrapper) wrapper.classList.add('theater-maximized');
    updateFullscreenUI(true);
}

function exitTheaterFullscreen() {
    const wrapper = document.getElementById('sombra-theater-wrapper');
    if (wrapper) wrapper.classList.remove('theater-maximized');

    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    updateFullscreenUI(false);
}

function updateFullscreenUI(isFs) {
    const lbl = document.getElementById('lbl-theater-fs');
    const floatingBtn = document.getElementById('btn-floating-exit-fs');
    const fsBtn = document.getElementById('btn-theater-fullscreen');
    const stage = document.getElementById('sombra-screen-stage');
    const wrapper = document.getElementById('sombra-theater-wrapper');

    if (stage) stage.classList.toggle('is-fullscreen', isFs);
    if (wrapper) wrapper.classList.toggle('is-fullscreen', isFs);
    document.body.classList.toggle('sombra-in-fullscreen', isFs);

    if (isFs) {
        if (lbl) lbl.textContent = 'Esci da Schermo Intero';
        if (floatingBtn) floatingBtn.style.display = 'inline-flex';
        if (fsBtn) {
            fsBtn.classList.add('active');
            fsBtn.innerHTML = '<i class="fa-solid fa-compress"></i> <span id="lbl-theater-fs">Esci da Schermo Intero</span>';
        }
    } else {
        if (lbl) lbl.textContent = 'Schermo Intero';
        if (floatingBtn) floatingBtn.style.display = 'none';
        if (fsBtn) {
            fsBtn.classList.remove('active');
            fsBtn.innerHTML = '<i class="fa-solid fa-expand"></i> <span id="lbl-theater-fs">Schermo Intero</span>';
        }
    }
}

// Sincronizza lo stato quando l'utente preme Esc da tastiera o esce nativamente
document.addEventListener('fullscreenchange', () => {
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    updateFullscreenUI(isFs);
});
document.addEventListener('webkitfullscreenchange', () => {
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    updateFullscreenUI(isFs);
});

// ==========================================================================
// 9. SCORCIATOIE DA TASTIERA
// ==========================================================================

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Se si sta digitando in un input, ignora
        if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

        // Frecce per diaporama
        if (SombraState.currentMedia && SombraState.currentMedia.type === 'photo') {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === ' ') {
                e.preventDefault();
                toggleDiaporamaAutoplay();
            }
        }

        // Barra spaziatrice per video
        if (SombraState.currentMedia && SombraState.currentMedia.type === 'video') {
            const videoEl = document.getElementById('sombra-main-video');
            if (e.key === ' ' && videoEl) {
                e.preventDefault();
                if (videoEl.paused) videoEl.play();
                else videoEl.pause();
            }
        }
    });
}

function projectMediaById(category, id) {
    const list = SOMBRA_MEDIA_DATA[category];
    const item = list ? list.find(x => x.id === id) : null;
    if (item) {
        projectMedia(item);
    }
}

// ==========================================================================
// 10. ESPOSIZIONE GLOBALE (WINDOW)
// ==========================================================================

window.projectMedia = projectMedia;
window.projectMediaById = projectMediaById;
window.deleteMediaItem = deleteMediaItem;
window.editMediaTitle = editMediaTitle;
window.downloadMediaItem = downloadMediaItem;
window.toggleTendina = toggleTendina;
window.resetSombraMediaToDefaults = resetSombraMediaToDefaults;
window.clearProjectionScreen = clearProjectionScreen;
window.toggleDiaporamaAutoplay = toggleDiaporamaAutoplay;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.setDiaporamaSpeed = setDiaporamaSpeed;
window.toggleCinemaLight = toggleCinemaLight;
window.toggleTheaterFullscreen = toggleTheaterFullscreen;
window.setPdfAspect = setPdfAspect;

