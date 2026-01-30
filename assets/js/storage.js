// --- Lógica de Almacenamiento Local ---
app.saveDataToLocalStorage = function() {
    localStorage.setItem('evokaUserData', JSON.stringify(userData));
    localStorage.setItem('evokaCapsules', JSON.stringify(capsulesData));
    localStorage.setItem('evokaExecutors', JSON.stringify(executors));
    localStorage.setItem('evokaTokens', dailyTokens);
    localStorage.setItem('evokaDialogue', JSON.stringify(dialogueData));
}

app.loadDataFromLocalStorage = function() {
    const savedUser = localStorage.getItem('evokaUserData');
    const savedCapsules = localStorage.getItem('evokaCapsules');
    const savedExecutors = localStorage.getItem('evokaExecutors');
    const savedTokens = localStorage.getItem('evokaTokens');
    const savedDialogue = localStorage.getItem('evokaDialogue');

    userData = savedUser ? JSON.parse(savedUser) : { fullName: "Felipe Arriarán", username: "@felipe", email: "felipe.a@email.com", phone: "+56912345678", birthDate: "1985-10-20", plan: 'free', aiSettings: { type: 'emotive', customPrompt: '' }, progress: 5 };
    capsulesData = savedCapsules ? JSON.parse(savedCapsules) : [];
    executors = savedExecutors ? JSON.parse(savedExecutors) : ['Gisselle', 'Agustín'];
    dailyTokens = savedTokens !== null ? parseInt(savedTokens, 10) : 1;
    dialogueData = savedDialogue ? JSON.parse(savedDialogue) : { lastAnswered: null, answers: {} };
}
