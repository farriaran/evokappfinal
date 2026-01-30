app.getHomeViewHTML = function() {
    return `
    <div class="flex-grow flex items-center justify-center text-center">
        <div>
            <h1 class="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Hola Felipe
            </h1>
            <p class="text-gray-400 mt-2">¿Qué recuerdo quieres evocar hoy?</p>
        </div>
    </div>
    `;
}

app.getHomeActionBarHTML = function() {
     return `
        <div class="bg-[#1e1f20] rounded-2xl p-3 shadow-lg">
            <div class="flex items-center justify-between px-3 pb-2">
                 <button id="privacy-toggle" onclick="window.app.togglePrivacy(this)" data-privacy="private" class="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span>Privada</span>
                 </button>
            </div>
            <div class="relative">
                <textarea id="capsule-input" class="w-full h-14 bg-transparent text-gray-200 rounded-lg p-3 pr-24 border-none focus:ring-0 resize-none" placeholder="Escribe tu cápsula aquí..."></textarea>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                     <button onclick="window.app.toggleRecording()" id="record-button" class="p-2 hover:bg-gray-700 rounded-full" title="Grabar audio"><svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg></button>
                     <button id="save-button" onclick="window.app.saveCapsule()" class="p-2 bg-cyan-600 hover:bg-cyan-500 rounded-full" title="Publicar Cápsula"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg></button>
                </div>
            </div>
        </div>
     `;
}

app.getExecutorsViewHTML = function() {
    let executorsListHTML = executors.map(e => `
        <li class="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
            <span class="text-gray-200">${e}</span>
            <button class="text-red-400 hover:text-red-300" onclick="window.app.removeExecutor(this, '${e}')">&times;</button>
        </li>`).join('');

    return `
    <section class="fade-in">
        <h2 class="text-3xl font-bold mb-6 text-white flex items-center gap-3"><svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>Tus Albaceas Digitales</h2>
        <div class="bg-[#1e1f20] rounded-xl p-6 space-y-6">
            <div class="bg-gray-800/50 border border-cyan-500/30 text-cyan-200 p-4 rounded-lg">
                <h3 class="font-bold">¿Qué es un Albacea Digital?</h3>
                <p class="text-sm mt-1 text-gray-300">Es una persona de tu confianza a quien le darás acceso a tus cápsulas privadas. Serán los guardianes de tu legado.</p>
            </div>
            <div>
                <h3 class="font-semibold text-lg text-gray-300 mb-3">Lista de Albaceas</h3>
                <ul id="executor-list" class="space-y-3">${executorsListHTML}</ul>
                <button onclick="window.app.addExecutor()" class="mt-6 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-4 rounded-lg transition">+ Añadir Nuevo Albacea</button>
            </div>
        </div>
    </section>
    `;
}

app.getPlansViewHTML = function() {
    return `
    <section class="fade-in text-center">
        <h2 class="text-3xl font-bold mb-2 text-white">Elige tu Plan EVOKA</h2>
        <p class="text-gray-400 mb-8">Desbloquea todo el potencial de tu legado.</p>
        <div class="space-y-6">
            <!-- Plan Gratis -->
            <div class="bg-[#1e1f20] rounded-xl p-6 border-2 border-cyan-500">
                <h3 class="text-2xl font-bold text-white">GRATIS</h3>
                <p class="text-xl font-semibold my-2 text-gray-300">$0 USD</p>
                <ul class="text-gray-400 space-y-2 my-4 text-left">
                    <li><span class="text-cyan-400">✓</span> 1 cápsula por día</li>
                    <li><span class="text-cyan-400">✓</span> 1 albacea digital</li>
                    <li><span class="text-cyan-400">✓</span> Acceso a memorias</li>
                </ul>
                <button class="w-full bg-gray-600 text-gray-400 font-bold py-2 px-4 rounded-lg cursor-default">Plan Actual</button>
            </div>
            <!-- Plan Premium -->
            <div class="bg-[#1e1f20] rounded-xl p-6 border border-gray-700">
                <h3 class="text-2xl font-bold text-cyan-400">PREMIUM</h3>
                <p class="text-xl font-semibold my-2 text-white">$7 USD / mes</p>
                <ul class="text-gray-400 space-y-2 my-4 text-left">
                    <li><span class="text-cyan-400">✓</span> 20 cápsulas mensuales</li>
                    <li><span class="text-cyan-400">✓</span> 5 albaceas digitales</li>
                    <li><span class="text-cyan-400">✓</span> Creación versión "mi yo PRIME"</li>
                    <li><span class="text-cyan-400">✓</span> Cápsulas para eventos especiales</li>
                </ul>
                <button class="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition">Seleccionar Plan</button>
            </div>
            <!-- Plan Premium Pro -->
            <div class="bg-[#1e1f20] rounded-xl p-6 border border-gray-700">
                <h3 class="text-2xl font-bold text-white">PREMIUM PRO</h3>
                <p class="text-xl font-semibold my-2 text-white">$15 USD / mes</p>
                <ul class="text-gray-400 space-y-2 my-4 text-left">
                    <li><span class="text-cyan-400">✓</span> Cápsulas ilimitadas</li>
                    <li><span class="text-cyan-400">✓</span> Albaceas digitales ilimitados</li>
                    <li><span class="text-cyan-400">✓</span> Acceso y modificación de memorias</li>
                    <li><span class="text-cyan-400">✓</span> Creación versión "mi yo PRIME PRO"</li>
                    <li><span class="text-cyan-400">✓</span> Cápsulas ilimitadas para eventos especiales</li>
                    <li><span class="text-cyan-400">✓</span> Creación cronología oficial de tu vida</li>
                    <li><span class="text-cyan-400">✓</span> Aporte a la memoria humana (Personajes públicos)</li>
                    <li><span class="text-cyan-400">✓</span> Creación "Mi mente paralela" (Tu continuidad)</li>
                </ul>
                <button class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition">Seleccionar Plan</button>
            </div>
        </div>
    </section>
    `;
}

app.getDialogueViewHTML = function() {
    const today = new Date().toISOString().split('T')[0];
    const hasAnsweredToday = dialogueData.lastAnswered === today;
    const progress = userData.progress || 5;
    let progressLevel = "Conocimiento Básico";
    if (progress > 30) progressLevel = "Entendimiento Emocional";
    if (progress > 70) progressLevel = "Sincronización Profunda";

    let contentHTML;

    if (hasAnsweredToday) {
        contentHTML = `
        <div class="bg-[#1e1f20] rounded-xl p-6 text-center">
            <p class="text-gray-300">¡Gracias por tus respuestas! Has completado el entrenamiento de hoy.</p>
            <p class="text-gray-400 text-sm mt-2">Vuelve mañana para nuevas preguntas y seguir construyendo tu mente paralela.</p>
        </div>
        `;
    } else {
        const dailyQuestions = app.getDailyQuestions();
        const questionsHTML = dailyQuestions.map((q, index) => `
            <div class="bg-[#2c2d2f] rounded-xl shadow p-4">
                <label for="q${index}" class="font-semibold text-gray-300">${q}</label>
                <textarea id="q${index}" class="mt-2 w-full h-20 bg-gray-800 text-gray-200 rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" placeholder="Tu respuesta..."></textarea>
            </div>
        `).join('');

        contentHTML = `
        <div class="space-y-4">
            ${questionsHTML}
        </div>
        <button onclick="window.app.saveDialogueAnswers()" class="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition">Enviar Respuestas</button>
        `;
    }

    return `
    <section class="fade-in">
        <h2 class="text-3xl font-bold mb-2 text-white">Entrenamiento IA</h2>
        <p class="text-gray-400 mb-6">Ayuda a tu mente paralela a conocerte mejor.</p>
        
        <div class="bg-[#1e1f20] rounded-xl p-6 space-y-4 mb-6">
            <div class="flex justify-between items-center text-sm">
                <span class="font-bold text-gray-300">Grado de Sincronización</span>
                <span class="font-bold text-cyan-400">${progress}%</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2.5">
                <div class="bg-cyan-500 h-2.5 rounded-full" style="width: ${progress}%"></div>
            </div>
            <p class="text-center text-xs text-gray-400">${progressLevel}</p>
        </div>

        ${contentHTML}
    </section>
    `;
}
