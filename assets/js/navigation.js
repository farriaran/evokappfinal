// --- Funciones de Navegación y Vistas ---
app.toggleProfileMenu = function() {
    document.getElementById('profile-menu').classList.toggle('hidden');
}

app.navigateTo = function(page) {
    const mainContent = document.getElementById('main-content');
    const actionBar = document.getElementById('action-bar');
    const navLinks = document.querySelectorAll('#side-nav a');

    navLinks.forEach(link => {
        link.classList.toggle('bg-gray-700', link.getAttribute('data-page') === page);
    });

    if (page === 'home') {
        mainContent.innerHTML = app.getHomeViewHTML();
        actionBar.innerHTML = app.getHomeActionBarHTML();
        app.updateTokenDisplay();
    } else if (page === 'dialogue') {
        mainContent.innerHTML = app.getDialogueViewHTML();
        actionBar.innerHTML = '';
    } else if (page === 'executors') {
        mainContent.innerHTML = app.getExecutorsViewHTML();
        actionBar.innerHTML = '';
    } else if (page === 'plans') {
        mainContent.innerHTML = app.getPlansViewHTML();
        actionBar.innerHTML = '';
    } else if (page === 'memories') {
        mainContent.innerHTML = app.getMemoriesViewHTML();
        actionBar.innerHTML = '';
    } else {
        mainContent.innerHTML = `<div class="flex-grow flex items-center justify-center text-center p-4"><h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Página de ${page} en construcción.</h1></div>`;
        actionBar.innerHTML = '';
    }
}

app.loadStaticUI = function() {
    const sideNav = document.getElementById('side-nav');
    sideNav.innerHTML = `
        <a href="#" onclick="window.app.navigateTo('home')" data-page="home" class="flex items-center p-3 rounded-lg hover:bg-gray-700 text-white">
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            <span class="nav-text">Inicio</span>
        </a>
        <a href="#" onclick="window.app.navigateTo('dialogue')" data-page="dialogue" class="flex items-center p-3 rounded-lg hover:bg-gray-700 text-white">
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <span class="nav-text">Entrenamiento IA</span>
        </a>
        <a href="#" onclick="window.app.navigateTo('memories')" data-page="memories" class="flex items-center p-3 rounded-lg hover:bg-gray-700 text-white">
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span class="nav-text">Memorias</span>
        </a>
        <a href="#" onclick="window.app.navigateTo('executors')" data-page="executors" class="flex items-center p-3 rounded-lg hover:bg-gray-700 text-white">
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <span class="nav-text">Albaceas</span>
        </a>
    `;
    app.updateTokenDisplay();
}
