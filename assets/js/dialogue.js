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
