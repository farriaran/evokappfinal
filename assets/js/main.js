// --- Punto de Entrada Principal ---
document.addEventListener('DOMContentLoaded', () => {
    app.loadDataFromLocalStorage();
    app.loadStaticUI();
    app.navigateTo('home');

    window.addEventListener('click', function(e) {
        const profileButton = document.getElementById('profile-button');
        const profileMenu = document.getElementById('profile-menu');
        if (profileButton && !profileButton.contains(e.target) && profileMenu && !profileMenu.contains(e.target)) {
            profileMenu.classList.add('hidden');
        }
    });
});
