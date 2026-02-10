// ============================================
// Creative Page JavaScript - Milad Farazian
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Track Configuration - Add new songs here!
    // Format: { id: 'SPOTIFY_TRACK_ID', title: 'Song Name', year: 'YYYY' }
    // ============================================
    const TRACKS = [
        { id: '0iSrcDcY882UgJSmGnRApi', title: 'Delusional', year: '2025' },
        { id: '2DdEKBzVfRQJQAsD2D7qca', title: 'Lost', year: '2025' },
        { id: '71dtvPVYYGGZMYr776Y0PT', title: 'Hide', year: '2025' },
        { id: '3ZSlaN8xtApJwarjJaLIG2', title: 'Hide (Archimedes Remix)', year: '2025' },
        { id: '3Q7tJHgmJUaW2SVjiebKIU', title: 'My Name', year: '2025' },
        { id: '6evAfeFgL5KczotlIqASpt', title: 'Dast e To', year: '2024' },
        { id: '5E3WPnmXZE9olUmneVStvd', title: 'Romancin', year: '2024' },
        { id: '6v2CI8TAZMbclIiIe7A9gf', title: 'Ngoma', year: '2024' },
        { id: '5SWsubuzWCAWYUCmCPcLYQ', title: 'Just a Fantasy', year: '2024' },
        { id: '6BaP7GEisorZXQbbXbXHPC', title: 'TV Screen', year: '2024' }
    ];

    const ARTIST_ID = '5sIJlYqfHM3gpYwYU17HOB';

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const closeMenu = document.getElementById('close-menu');

    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', () => {
            dropdownMenu.classList.add('show');
        });

        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                dropdownMenu.classList.remove('show');
            });
        }

        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                dropdownMenu.classList.remove('show');
            });
        });
    }

    // ============================================
    // Dynamic Vinyl Grid Generation
    // ============================================
    const vinylGrid = document.getElementById('vinyl-grid');
    const loadingSpinner = document.getElementById('loading-spinner');
    const spotifyPlayer = document.getElementById('spotify-player');
    const visualizerBars = document.querySelectorAll('.audio-visualizer .bar');

    // Fetch album art from Spotify oEmbed API
    async function getTrackInfo(trackId) {
        try {
            const response = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`);
            if (response.ok) {
                const data = await response.json();
                return { albumArt: data.thumbnail_url };
            }
        } catch (e) {
            console.warn(`Could not fetch track info for ${trackId}`);
        }
        return { albumArt: 'https://i.scdn.co/image/ab67616d00001e02' };
    }

    // Update the Spotify embed player with a new track
    function updatePlayer(trackId) {
        const player = document.getElementById('spotify-player');
        if (player) {
            player.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
        }
    }

    // Fetch album art from Spotify oEmbed API
    async function getAlbumArt(trackId) {
        const info = await getTrackInfo(trackId);
        return info.albumArt;
    }

    // Generate vinyl card HTML
    function createVinylCard(track, index, albumArt) {
        const card = document.createElement('div');
        card.className = 'vinyl-card';
        card.setAttribute('data-track-id', track.id);
        if (index === 0) card.classList.add('active');

        card.innerHTML = `
            <div class="vinyl-wrapper">
                <div class="vinyl">
                    <img class="album-art" src="${albumArt}" alt="${track.title} Album Art" onerror="this.src='https://i.scdn.co/image/ab67616d00001e02'">
                    <div class="vinyl-grooves"></div>
                    <div class="vinyl-center"></div>
                </div>
            </div>
            <div class="vinyl-info">
                <h3 class="vinyl-title">${track.title}</h3>
                <span class="vinyl-year">${track.year}</span>
            </div>
            <div class="vinyl-play-btn">
                <i class="fas fa-play"></i>
            </div>
        `;

        return card;
    }

    // Load all tracks
    async function loadTracks() {
        if (!vinylGrid) return;

        // Fetch all album art in parallel
        const albumArtPromises = TRACKS.map(track => getAlbumArt(track.id));
        const albumArts = await Promise.all(albumArtPromises);

        // Hide loading spinner
        if (loadingSpinner) loadingSpinner.style.display = 'none';

        // Create vinyl cards
        TRACKS.forEach((track, index) => {
            const card = createVinylCard(track, index, albumArts[index]);
            vinylGrid.appendChild(card);

            // Add click handler
            card.addEventListener('click', () => {
                // Remove active class from all cards
                document.querySelectorAll('.vinyl-card').forEach(c => c.classList.remove('active'));

                // Add active class to clicked card
                card.classList.add('active');

                // Update the Spotify player with the selected track
                updatePlayer(track.id);

                // Start visualizer animation
                visualizerBars.forEach(bar => {
                    bar.style.animationPlayState = 'running';
                });

                // Scroll to player on mobile
                const playerContainer = document.querySelector('.spotify-player-container');
                if (playerContainer && window.innerWidth < 768) {
                    playerContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });

            // Trigger visibility animation with stagger
            setTimeout(() => {
                card.classList.add('visible');
            }, 100 + (index * 100));
        });

        // Set initial player to first track
        if (spotifyPlayer && TRACKS.length > 0) {
            spotifyPlayer.src = `https://open.spotify.com/embed/track/${TRACKS[0].id}?utm_source=generator&theme=0`;
        }
    }

    // Initialize tracks
    loadTracks();

    // ============================================
    // Smooth Scroll for Navigation
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe film cards and section headers
    document.querySelectorAll('.film-card, .section-header').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // Film Card Tilt Effect
    // ============================================
    const filmCards = document.querySelectorAll('.film-card');

    filmCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // ============================================
    // Audio Visualizer Animation Control
    // ============================================
    visualizerBars.forEach(bar => {
        bar.style.animationPlayState = 'running';
    });

    // ============================================
    // Console Easter Egg
    // ============================================
    console.log('%c🎵 Welcome to Milad\'s Creative Space! 🎬',
        'color: #1db954; font-size: 20px; font-weight: bold;');
    console.log('%cClick on any vinyl to play that track!',
        'color: #f5c518; font-size: 14px;');
    console.log('%cTo add new songs, edit the TRACKS array in js/creative.js',
        'color: #888; font-size: 12px;');
});
