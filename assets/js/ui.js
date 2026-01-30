// --- Funciones de Interacción de UI ---

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

app.calculateAge = function(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
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

app.getDailyQuestions = function() {
    const allQuestions = [
        "¿Qué es lo que más te apasiona en este momento de tu vida?",
        "Si pudieras darle un consejo a tu yo de hace 10 años, ¿cuál sería?",
        "Describe un lugar donde te sientas completamente en paz.",
        "¿Cuál es el mayor riesgo que has tomado?",
        "¿Qué canción te transporta instantáneamente a un recuerdo feliz?",
        "¿Hay algún sueño que dejaste ir y que a veces extrañas?",
        "¿Qué cualidad valoras más en un amigo?",
        "Si tuvieras un día completamente libre, sin obligaciones, ¿qué harías?",
        "¿Cuál es un pequeño placer que te alegra el día?"
    ];
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const startIndex = (dayOfYear * 3) % allQuestions.length;
    
    let questions = [];
    for(let i = 0; i < 3; i++) {
        questions.push(allQuestions[(startIndex + i) % allQuestions.length]);
    }
    return questions;
}

app.saveDialogueAnswers = function() {
    const answers = [
        document.getElementById('q0').value,
        document.getElementById('q1').value,
        document.getElementById('q2').value,
    ];

    if (answers.some(a => a.trim() === '')) {
        alert('Por favor, responde todas las preguntas.');
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    dialogueData.lastAnswered = today;
    dialogueData.answers[today] = answers;
    userData.progress = Math.min(100, (userData.progress || 5) + 2); // Aumentar progreso
    app.saveDataToLocalStorage();
    
    console.log("Respuestas guardadas:", dialogueData.answers[today]);
    app.navigateTo('dialogue');
}

// Placeholder functions for referenced but not implemented functions
app.toggleRecording = function() {
    console.log('toggleRecording not yet implemented');
}

app.addExecutor = function() {
    const name = prompt('Ingrese el nombre del nuevo albacea:');
    if (name && name.trim() !== '') {
        executors.push(name.trim());
        app.saveDataToLocalStorage();
        app.navigateTo('executors');
    }
}

app.removeExecutor = function(button, executorName) {
    if (confirm(`¿Estás seguro de eliminar a ${executorName}?`)) {
        executors = executors.filter(e => e !== executorName);
        app.saveDataToLocalStorage();
        app.navigateTo('executors');
    }
}

app.openExecutorSelectionModal = function() {
    console.log('openExecutorSelectionModal not yet implemented');
    // For now, just finalize the save as a fallback
    app.finalizeCapsuleSave('Albacea no especificado');
}

app.finalizeCapsuleSave = function(recipient) {
    console.log('Capsule saved for:', recipient);
    console.log('Capsule data:', tempCapsuleData);
    
    // Save the capsule
    capsulesData.push({
        text: tempCapsuleData.text,
        privacy: tempCapsuleData.privacy,
        recipient: recipient,
        date: new Date().toISOString()
    });
    
    // Update tokens for free users
    if (userData.plan === 'free') {
        dailyTokens = Math.max(0, dailyTokens - 1);
    }
    
    app.saveDataToLocalStorage();
    
    // Clear the input
    const input = document.getElementById('capsule-input');
    if (input) input.value = '';
    
    // Reset temp data
    tempCapsuleData = {};
    
    // Update UI
    app.updateTokenDisplay();
    
    alert('Cápsula guardada exitosamente!');
}
