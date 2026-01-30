// --- El resto de las funciones (saveCapsule, updateTokenDisplay, etc.) ---

app.saveCapsule = function() {
    if (dailyTokens <= 0 && userData.plan === 'free') return;
    const input = document.getElementById('capsule-input');
    const capsuleText = input.value;
    const privacyToggle = document.getElementById('privacy-toggle');
    const privacy = privacyToggle ? privacyToggle.dataset.privacy : 'private';
    
    if (capsuleText.trim() === '') {
        alert("No hay nada que guardar.");
        return;
    }

    tempCapsuleData.text = capsuleText;
    tempCapsuleData.privacy = privacy;

    if (privacy === 'private') {
        app.openExecutorSelectionModal();
    } else {
        app.finalizeCapsuleSave('Público');
    }
}

app.updateTokenDisplay = function() {
    const tokenCountEl = document.getElementById('token-count');
    const userStatusEl = document.getElementById('user-status');
    const saveButton = document.getElementById('save-button');
    const capsuleInput = document.getElementById('capsule-input');

    if (tokenCountEl && userStatusEl) {
        switch (userData.plan) {
            case 'premium':
                tokenCountEl.innerHTML = '24';
                userStatusEl.textContent = 'PREMIUM';
                break;
            case 'pro':
                tokenCountEl.innerHTML = '&infin;';
                userStatusEl.textContent = 'PRO';
                break;
            default:
                tokenCountEl.textContent = dailyTokens;
                userStatusEl.textContent = 'FREE';
                break;
        }
    }
    
    if (saveButton && userData.plan === 'free') {
        if (dailyTokens <= 0) {
            saveButton.disabled = true;
            saveButton.classList.add('bg-gray-500', 'cursor-not-allowed');
            saveButton.classList.remove('bg-cyan-600', 'hover:bg-cyan-500');
            if(capsuleInput) {
                capsuleInput.placeholder = 'Vuelve mañana para más cápsulas.';
                capsuleInput.disabled = true;
            }
        } else {
             saveButton.disabled = false;
             saveButton.classList.remove('bg-gray-500', 'cursor-not-allowed');
             saveButton.classList.add('bg-cyan-600', 'hover:bg-cyan-500');
             if(capsuleInput) capsuleInput.disabled = false;
        }
    }
}

app.togglePrivacy = function(button) {
    const isPrivate = button.dataset.privacy === 'private';
    if (isPrivate) {
        button.dataset.privacy = 'public';
        button.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l1.414-1.414a1 1 0 011.414 0l1.414 1.414M10 11V3m4 8V3m-6 8h2m6-8h2"></path></svg>
            <span>Pública</span>
        `;
    } else {
        button.dataset.privacy = 'private';
        button.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <span>Privada</span>
        `;
    }
}
