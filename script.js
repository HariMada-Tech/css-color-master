document.documentElement.classList.add('js');
const $=id=>document.getElementById(id);const menuBtn=$('menuBtn'),navLinks=$('navLinks');if(menuBtn)menuBtn.onclick=()=>navLinks.classList.toggle('open');
const colors=[['Black','#000000'],['White','#ffffff'],['Red','#ef4444'],['Blue','#2563eb'],['Green','#16a34a'],['Orange','#f97316'],['Purple','#9333ea'],['Pink','#ec4899'],['Yellow','#eab308'],['Cyan','#06b6d4'],['Slate','#334155'],['Emerald','#10b981'],['Rose','#f43f5e'],['Indigo','#4f46e5'],['Amber','#f59e0b'],['Teal','#14b8a6']];
function hexToRgb(hex){hex=hex.replace('#','');if(hex.length===3)hex=hex.split('').map(x=>x+x).join('');let n=parseInt(hex,16);return{r:(n>>16)&255,g:(n>>8)&255,b:n&255}}
function rgbToHex(r,g,b){return'#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}
function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;let max=Math.max(r,g,b),min=Math.min(r,g,b),h,s,l=(max+min)/2;if(max===min){h=s=0}else{let d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4}h/=6}return{h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)}}
function luminance(r,g,b){return(0.299*r+0.587*g+0.114*b)}
function update(hex,name='Couleur personnalisée'){const ids=['bigSwatch','hexCode','rgbCode','rgbaCode','hslCode','cssExamples','textDemo','bgDemo','borderDemo','shadowDemo','colorName','contrastText','colorPicker'];if(!ids.every(id=>$(id)))return;let {r,g,b}=hexToRgb(hex),hsl=rgbToHsl(r,g,b),text=luminance(r,g,b)>150?'#111827':'#ffffff';$('bigSwatch').style.background=hex;$('hexCode').textContent=hex;$('rgbCode').textContent=`rgb(${r}, ${g}, ${b})`;$('rgbaCode').textContent=`rgba(${r}, ${g}, ${b}, 0.75)`;$('hslCode').textContent=`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;$('colorName').textContent=name;$('contrastText').textContent=text==='#ffffff'?'Contraste : texte blanc conseillé':'Contraste : texte noir conseillé';$('cssExamples').textContent=`.titre {\n  color: ${hex};\n}\n\n.bloc {\n  background-color: ${hex};\n}\n\n.carte {\n  border: 3px solid ${hex};\n  box-shadow: 0 15px 35px rgba(${r}, ${g}, ${b}, 0.35);\n}`;$('textDemo').style.color=hex;$('bgDemo').style.background=hex;$('bgDemo').style.color=text;$('borderDemo').style.border=`4px solid ${hex}`;$('shadowDemo').style.boxShadow=`0 18px 45px rgba(${r},${g},${b},.35)`;$('colorPicker').value=hex}
function initPalette(){const p=$('palette');if(!p)return;p.innerHTML='';colors.forEach(([name,hex])=>{let b=document.createElement('button');b.className='swatch';b.style.background=hex;b.style.color=luminance(...Object.values(hexToRgb(hex)))>150?'#111827':'#fff';b.innerHTML=`${name}<br>${hex}`;b.onclick=()=>update(hex,name);p.appendChild(b)})}
if($('colorPicker'))$('colorPicker').oninput=e=>update(e.target.value);if($('randomBtn'))$('randomBtn').onclick=()=>{let c=colors[Math.floor(Math.random()*colors.length)];update(c[1],c[0])};if($('eyeDropperBtn'))$('eyeDropperBtn').onclick=async()=>{if(!window.EyeDropper){alert('Votre navigateur ne supporte pas la pipette. Utilisez le champ couleur.');return}let res=await new EyeDropper().open();update(res.sRGBHex,'Couleur pipette')};if($('searchColor'))$('searchColor').oninput=e=>{let v=e.target.value.trim().toLowerCase();let found=colors.find(c=>c[0].toLowerCase().includes(v)||c[1].toLowerCase()===v);if(found)update(found[1],found[0]);if(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v))update(v.length===4?'#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3]:v,'Couleur recherchée')};document.querySelectorAll('[data-copy]').forEach(btn=>btn.onclick=()=>{navigator.clipboard.writeText($(btn.dataset.copy).textContent);btn.textContent='Copié';setTimeout(()=>btn.textContent='Copier',1200)});initPalette();if($('colorPicker')) update('#2563eb','Royal Blue');

// Animations au défilement
const revealItems=document.querySelectorAll('.reveal,.lesson-block,.example-card,.format-card');
if('IntersectionObserver' in window){
  const obs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}})},{threshold:.12});
  revealItems.forEach(el=>{el.classList.add('reveal');obs.observe(el)});
}else{revealItems.forEach(el=>el.classList.add('visible'))}

// Petit message animé quand on copie
function showToast(message){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1400)}
document.querySelectorAll('[data-copy]').forEach(btn=>{btn.addEventListener('click',()=>showToast('Code copié avec succès ✅'))});

// Fermer la publicité flottante
const closeAd=document.getElementById('closeAd'),floatingAd=document.getElementById('floatingAd');
if(closeAd&&floatingAd){closeAd.onclick=()=>floatingAd.style.display='none'}

// Appliquer la couleur choisie à certaines démos modernes
const root=document.documentElement;
const oldUpdate=typeof update==='function'?update:null;
if(oldUpdate){
  update=function(hex,name='Couleur personnalisée'){
    oldUpdate(hex,name);
    root.style.setProperty('--active-color',hex);
    const hero=document.getElementById('heroPreview');
    if(hero) hero.style.background=`linear-gradient(135deg, ${hex}, #9333ea)`;
  }
}


// =====================================================
// Quiz interactif - page exercices.html
// =====================================================

(function(){
    if(document.querySelector('.quiz-app')) return;
    const quizCards = document.querySelectorAll('.quiz-card');
    if(!quizCards.length) return;

    let good = 0;
    let bad = 0;
    let timerStarted = false;
    let levelFinished = false;
    let suspiciousActions = 0;

    const scoreGood = document.getElementById('scoreGood');
    const scoreBad = document.getElementById('scoreBad');
    const scoreTotal = document.getElementById('scoreTotal');
    const emojiPop = document.getElementById('emojiPop');
    const resetBtn = document.getElementById('resetQuiz');

    function updateScore(){
        if(scoreGood) scoreGood.textContent = good;
        if(scoreBad) scoreBad.textContent = bad;
        if(scoreTotal) scoreTotal.textContent = good + bad;
    }

    function playSound(ok){
        try{
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if(ok){
                osc.frequency.setValueAtTime(660, audioCtx.currentTime);
                osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.12);
                osc.frequency.setValueAtTime(1040, audioCtx.currentTime + 0.24);
            }else{
                osc.frequency.setValueAtTime(220, audioCtx.currentTime);
                osc.frequency.setValueAtTime(150, audioCtx.currentTime + 0.15);
            }

            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.36);
        }catch(e){}
    }

    function showEmoji(ok){
        if(!emojiPop) return;
        emojiPop.textContent = ok ? '🎉👏😎' : '😂🤦‍♂️';
        emojiPop.classList.remove('show');
        void emojiPop.offsetWidth;
        emojiPop.classList.add('show');
    }

    function normalize(value){
        return (value || '')
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g,'');
    }

    function markCard(card, isCorrect, message){
        if(card.dataset.done === 'true') return;

        card.dataset.done = 'true';

        const feedback = card.querySelector('.quiz-feedback');
        if(feedback){
            feedback.className = 'quiz-feedback ' + (isCorrect ? 'good' : 'bad');
            feedback.innerHTML = message;
        }

        if(isCorrect){
            good++;
        }else{
            bad++;
        }

        updateScore();
        showEmoji(isCorrect);
        playSound(isCorrect);
    }

    quizCards.forEach(card => {
        const answers = (card.dataset.answer || '').split('|').map(normalize);
        const type = card.dataset.type;

        if(type === 'choice'){
            const buttons = card.querySelectorAll('.quiz-options button');

            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    if(card.dataset.done === 'true') return;

                    const value = normalize(btn.dataset.value);
                    const isCorrect = answers.includes(value);

                    buttons.forEach(b => {
                        if(answers.includes(normalize(b.dataset.value))){
                            b.classList.add('correct');
                        }
                    });

                    if(!isCorrect) btn.classList.add('wrong');

                    const correctText = answers[0];
                    const msg = isCorrect
                        ? '✅ Bravo ! Bonne réponse. Vous maîtrisez cette notion.'
                        : '❌ Faux 😂 Révisez un peu ! La bonne réponse est : <code>' + correctText + '</code>.';

                    markCard(card, isCorrect, msg);
                });
            });
        }

        if(type === 'text'){
            const input = card.querySelector('input');
            const btn = card.querySelector('.text-answer button');
            const preview = card.querySelector('.live-color-preview');
            if(input && preview){
                input.addEventListener('input', () => {
                    preview.style.background = '';
                    preview.style.color = '';
                    preview.textContent = 'Aperçu après validation';
                });
            }
if(btn && input){
                btn.addEventListener('click', () => {
                    if(card.dataset.done === 'true') return;

                    const value = normalize(input.value);
                    const isCorrect = answers.includes(value);

                    input.style.borderColor = isCorrect ? '#16a34a' : '#dc2626';

                    if(preview){
                        const rawValue = input.value.trim();
                        if(isCorrect){
                            preview.style.background = rawValue;
                            preview.style.color = '#ffffff';
                            preview.textContent = 'Aperçu validé : ' + rawValue;
                        }else{
                            preview.style.background = '#fee2e2';
                            preview.style.color = '#7f1d1d';
                            preview.textContent = 'Aperçu non affiché : réponse fausse';
                        }
                    }

                    const msg = isCorrect
                        ? '✅ Excellent ! Votre réponse est correcte.'
                        : '❌ Faux 😂 La correction est affichée en dessous. Bonne réponse possible : <code>' + answers[0] + '</code>.';

                    markCard(card, isCorrect, msg);
                });

                input.addEventListener('keydown', e => {
                    if(e.key === 'Enter') btn.click();
                });
            }
        }
    });

    if(resetBtn){
        resetBtn.addEventListener('click', () => {
            good = 0;
            bad = 0;
            updateScore();

            quizCards.forEach(card => {
                card.dataset.done = 'false';

                const feedback = card.querySelector('.quiz-feedback');
                if(feedback){
                    feedback.className = 'quiz-feedback';
                    feedback.innerHTML = '';
                }

                card.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('correct','wrong');
                });

                const input = card.querySelector('input');
                if(input){
                    input.value = '';
                    input.style.borderColor = '';
                }

                const preview = card.querySelector('.live-color-preview');
                if(preview){
                    preview.style.background = '';
                    preview.style.color = '';
                    preview.textContent = 'Aperçu après validation';
                }
            });
        });
    }


    const showFinalResult = document.getElementById('showFinalResult');
    const finalResultMessage = document.getElementById('finalResultMessage');

    if(showFinalResult && finalResultMessage){
        showFinalResult.addEventListener('click', () => {
            const totalQuestions = quizCards.length;
            const answered = good + bad;
            const percent = totalQuestions ? Math.round((good / totalQuestions) * 100) : 0;

            finalResultMessage.classList.remove('excellent','medium','low');

            if(answered < totalQuestions){
                finalResultMessage.classList.add('medium');
                finalResultMessage.innerHTML = '⚠️ Vous avez répondu à <strong>' + answered + '</strong> question(s) sur <strong>' + totalQuestions + '</strong>. Terminez toutes les questions pour avoir un vrai résultat.';
                return;
            }

            if(percent >= 80){
                finalResultMessage.classList.add('excellent');
                finalResultMessage.innerHTML = '🎉 Excellent ! Score : <strong>' + good + '/' + totalQuestions + '</strong> (' + percent + '%). Vous maîtrisez bien les couleurs CSS.';
                playSound(true);
                showEmoji(true);
            }else if(percent >= 50){
                finalResultMessage.classList.add('medium');
                finalResultMessage.innerHTML = '🙂 Moyen. Score : <strong>' + good + '/' + totalQuestions + '</strong> (' + percent + '%). Continuez à pratiquer HEX, RGB, RGBA et HSL.';
            }else{
                finalResultMessage.classList.add('low');
                finalResultMessage.innerHTML = '😂 Résultat faible. Score : <strong>' + good + '/' + totalQuestions + '</strong> (' + percent + '%). Il faut revoir le cours complet avant de recommencer.';
                playSound(false);
                showEmoji(false);
            }
        });
    }

    updateScore();
})();


// =====================================================
// Quiz avancé par niveau : timer, localStorage, blocage 50%, WhatsApp, Facebook
// =====================================================

(function(){
    const app = document.querySelector('.quiz-app');
    if(!app) return;

    const levels = ['debutant','intermediaire','avance'];
    const levelNames = {debutant:'Débutant', intermediaire:'Intermédiaire', avance:'Avancé'};
    const levelTime = 180;
    let currentLevel = 'debutant';
    let timer = levelTime;
    let timerInterval = null;
    let good = 0;
    let bad = 0;

    const timerDisplay = document.getElementById('timerDisplay');
    const scoreGood = document.getElementById('scoreGood');
    const scoreBad = document.getElementById('scoreBad');
    const bestScore = document.getElementById('bestScore');
    const currentLevelName = document.getElementById('currentLevelName');
    const emojiPop = document.getElementById('emojiPop');
    const finalResultMessage = document.getElementById('finalResultMessage');
    const facebookShare = document.getElementById('facebookShare');
    const whatsappCertificat = document.getElementById('whatsappCertificat');
    const securityStatus = document.getElementById('securityStatus');

    const saved = JSON.parse(localStorage.getItem('cssColorQuizScores') || '{}');

    function formatTime(sec){
        const m = String(Math.floor(sec / 60)).padStart(2,'0');
        const s = String(sec % 60).padStart(2,'0');
        return `${m}:${s}`;
    }

    function updateTimer(){
        if(timerDisplay) timerDisplay.textContent = formatTime(timer);
    }

    function updateScore(){
        if(scoreGood) scoreGood.textContent = good;
        if(scoreBad) scoreBad.textContent = bad;
        const best = saved[currentLevel]?.percent || 0;
        if(bestScore) bestScore.textContent = best + '%';
        if(currentLevelName) currentLevelName.textContent = levelNames[currentLevel];
    }

    function updateSecurityStatus(type='', message='Sécurité : évitez de changer d’onglet pendant le quiz.'){
        if(!securityStatus) return;
        securityStatus.className = 'security-status ' + type;
        securityStatus.innerHTML = message;
    }

    function markSuspicious(reason){
        if(levelFinished) return;
        suspiciousActions++;
        updateSecurityStatus('warning', '⚠️ Action suspecte détectée : ' + reason + '. Avertissement n°' + suspiciousActions + '.');
        if(suspiciousActions >= 3){
            clearInterval(timerInterval);
            updateSecurityStatus('danger', '🚫 Trop d’actions suspectes. Recommencez ce niveau pour garder un résultat propre.');
            showGlobalMessage('fail', '🚫 Quiz arrêté pour suspicion de triche. Recommencez le niveau.');
        }
    }

    function startTimerOnce(){
        if(timerStarted || levelFinished) return;
        timerStarted = true;
        startTimer();
    }

    function shuffleOptionsIn(panel){
        panel.querySelectorAll('.quiz-options').forEach(group => {
            const buttons = Array.from(group.children);
            buttons.sort(() => Math.random() - 0.5);
            buttons.forEach(btn => group.appendChild(btn));
        });
    }

    function updateCertificateAccess(){
        if(!whatsappCertificat) return;
        const advancedScore = saved.avance?.percent || 0;

        if(advancedScore >= 50){
            const text = encodeURIComponent('Bonjour HariMada Tech, je veux demander un certificat pour le quiz CSS Couleurs. J’ai terminé le niveau Avancé avec un score de ' + advancedScore + '%.');
            whatsappCertificat.href = 'https://wa.me/261322160631?text=' + text;
            whatsappCertificat.textContent = 'Demander certificat sur WhatsApp';
            whatsappCertificat.classList.remove('disabled-certificat');
            whatsappCertificat.removeAttribute('aria-disabled');
            whatsappCertificat.setAttribute('target','_blank');
        }else{
            whatsappCertificat.href = '#';
            whatsappCertificat.textContent = 'Certificat bloqué : terminez le niveau Avancé';
            whatsappCertificat.classList.add('disabled-certificat');
            whatsappCertificat.setAttribute('aria-disabled','true');
            whatsappCertificat.removeAttribute('target');
        }
    }

    function saveScore(level, percent, goodCount, total){
        if(!saved[level] || percent > saved[level].percent){
            saved[level] = {percent, good: goodCount, total, date: new Date().toLocaleString()};
            localStorage.setItem('cssColorQuizScores', JSON.stringify(saved));
        }
    }

    function levelUnlocked(level){
        if(level === 'debutant') return true;
        if(level === 'intermediaire') return (saved.debutant?.percent || 0) >= 50;
        if(level === 'avance') return (saved.intermediaire?.percent || 0) >= 50;
        return false;
    }

    function refreshTabs(){
        document.querySelectorAll('.level-tab').forEach(tab => {
            const level = tab.dataset.levelTarget;
            const unlocked = levelUnlocked(level);
            tab.classList.toggle('locked', !unlocked);
            tab.textContent = levelNames[level] + (unlocked ? '' : ' 🔒');
            tab.classList.toggle('active', level === currentLevel);
        });
    }

    function showLevel(level){
        if(!levelUnlocked(level)){
            showGlobalMessage('fail', '🔒 Niveau bloqué. Vous devez obtenir au moins 50% au niveau précédent pour continuer.');
            return;
        }

        currentLevel = level;
        timer = levelTime;
        good = 0;
        bad = 0;
        timerStarted = false;
        levelFinished = false;
        suspiciousActions = 0;

        document.querySelectorAll('.level-panel').forEach(panel => {
            panel.classList.toggle('active', panel.dataset.level === level);
            panel.classList.toggle('locked-panel', !levelUnlocked(panel.dataset.level));
        });

        resetCurrentLevel(false);
        const activePanel = document.querySelector(`.level-panel[data-level="${level}"]`);
        if(activePanel) shuffleOptionsIn(activePanel);
        refreshTabs();
        updateTimer();
        updateScore();
        showGlobalMessage('', '');
    }

    function startTimer(){
        timerStarted = true;
        clearInterval(timerInterval);
        timer = levelTime;
        updateTimer();

        timerInterval = setInterval(() => {
            timer--;
            updateTimer();

            if(timer <= 0){
                clearInterval(timerInterval);
                finishLevel(currentLevel, true);
            }
        }, 1000);
    }

    function playSound(ok){
        try{
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if(ok){
                osc.frequency.setValueAtTime(660, audioCtx.currentTime);
                osc.frequency.setValueAtTime(880, audioCtx.currentTime + .12);
                osc.frequency.setValueAtTime(1040, audioCtx.currentTime + .24);
            }else{
                osc.frequency.setValueAtTime(220, audioCtx.currentTime);
                osc.frequency.setValueAtTime(140, audioCtx.currentTime + .15);
            }

            gain.gain.setValueAtTime(.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + .35);
            osc.start();
            osc.stop(audioCtx.currentTime + .36);
        }catch(e){}
    }

    function showEmoji(ok){
        if(!emojiPop) return;
        emojiPop.textContent = ok ? '🎉👏😎' : '😂🤦‍♂️';
        emojiPop.classList.remove('show');
        void emojiPop.offsetWidth;
        emojiPop.classList.add('show');
    }

    function normalize(value){
        return (value || '').toString().trim().toLowerCase().replace(/\s+/g,'');
    }

    function activeCards(){
        const panel = document.querySelector(`.level-panel[data-level="${currentLevel}"]`);
        return panel ? Array.from(panel.querySelectorAll('.quiz-card')) : [];
    }

    function answerCard(card, isCorrect, correctText, rawValue){
        if(card.dataset.done === 'true') return;

        card.dataset.done = 'true';
        const feedback = card.querySelector('.quiz-feedback');
        if(feedback){
            feedback.className = 'quiz-feedback ' + (isCorrect ? 'good' : 'bad');
            feedback.innerHTML = isCorrect
                ? '✅ Bravo ! Bonne réponse.'
                : '❌ Faux 😂 La bonne réponse est : <code>' + correctText + '</code>.';
        }

        const preview = card.querySelector('.live-color-preview');
        if(preview){
            if(isCorrect && rawValue){
                preview.style.background = rawValue;
                preview.style.color = '#ffffff';
                preview.textContent = 'Aperçu validé : ' + rawValue;
            }else{
                preview.style.background = '#fee2e2';
                preview.style.color = '#7f1d1d';
                preview.textContent = 'Aperçu non affiché : réponse fausse';
            }
        }

        if(isCorrect) good++;
        else bad++;

        updateScore();
        showEmoji(isCorrect);
        playSound(isCorrect);
    }

    document.querySelectorAll('.quiz-card').forEach(card => {
        const answers = (card.dataset.answer || '').split('|').map(normalize);

        card.querySelectorAll('.quiz-options button').forEach(btn => {
            btn.addEventListener('click', () => {
                if(!card.closest('.level-panel').classList.contains('active')) return;
                if(card.dataset.done === 'true' || levelFinished) return;
                startTimerOnce();

                const value = normalize(btn.dataset.value);
                const isCorrect = answers.includes(value);

                card.querySelectorAll('.quiz-options button').forEach(b => {
                    if(answers.includes(normalize(b.dataset.value))) b.classList.add('correct');
                });
                if(!isCorrect) btn.classList.add('wrong');

                answerCard(card, isCorrect, answers[0], btn.dataset.value);
            });
        });

        const input = card.querySelector('.text-answer input');
        const inputBtn = card.querySelector('.text-answer button');

        if(input && inputBtn){
            input.addEventListener('input', () => {
                const preview = card.querySelector('.live-color-preview');
                if(preview){
                    preview.style.background = '';
                    preview.style.color = '';
                    preview.textContent = 'Aperçu après validation';
                }
            });

            inputBtn.addEventListener('click', () => {
                if(!card.closest('.level-panel').classList.contains('active')) return;
                if(card.dataset.done === 'true' || levelFinished) return;
                startTimerOnce();

                const raw = input.value.trim();
                const value = normalize(raw);
                const isCorrect = answers.includes(value);

                input.style.borderColor = isCorrect ? '#16a34a' : '#dc2626';
                answerCard(card, isCorrect, answers[0], raw);
            });

            input.addEventListener('keydown', e => {
                if(e.key === 'Enter') inputBtn.click();
            });
        }
    });

    function showGlobalMessage(type, message){
        if(!finalResultMessage) return;
        finalResultMessage.className = 'final-result-message ' + type;
        finalResultMessage.innerHTML = message;
    }

    function finishLevel(level, byTimer=false){
        const cards = activeCards();
        const total = cards.length;
        const answered = cards.filter(c => c.dataset.done === 'true').length;
        const percent = total ? Math.round((good / total) * 100) : 0;
        const resultBox = document.querySelector(`.level-panel[data-level="${level}"] .level-result`);

        if(answered < total && !byTimer){
            resultBox.className = 'level-result warning';
            resultBox.innerHTML = '⚠️ Répondez d’abord à toutes les questions avant de voir le résultat.';
            return;
        }

        clearInterval(timerInterval);
        timerStarted = false;
        levelFinished = true;
        saveScore(level, percent, good, total);
        updateScore();
        refreshTabs();
        updateCertificateAccess();

        const nextIndex = levels.indexOf(level) + 1;
        const nextLevel = levels[nextIndex];

        if(percent >= 50){
            resultBox.className = 'level-result success';
            resultBox.innerHTML = `🎉 Bravo ! Résultat ${levelNames[level]} : <strong>${good}/${total}</strong> (${percent}%). Niveau suivant débloqué si disponible.<br><br>
            <a class="btn-small" href="https://www.harimadatech.com/index.html#inscription" target="_blank">Demander le cours complet</a>`;
            showGlobalMessage('success', `✅ Score sauvegardé : <strong>${percent}%</strong>. Vous pouvez demander un certificat ou partager votre résultat.`);
            showEmoji(true);
            playSound(true);
        }else{
            resultBox.className = 'level-result fail';
            resultBox.innerHTML = `😂 Résultat insuffisant : <strong>${good}/${total}</strong> (${percent}%). Vous ne pouvez pas continuer au niveau suivant. Recommencez ce niveau.<br><br>
            <strong>Conseil HariMada Tech :</strong> pour éviter de perdre du temps seul, suivez une formation guidée avec pratique. Vous apprendrez les couleurs CSS, HTML, CSS et JavaScript pas à pas.<br><br>
            <a class="btn-small course-cta" href="https://www.harimadatech.com/index.html#inscription" target="_blank">Je veux suivre le cours complet</a>`;
            showGlobalMessage('fail', '❌ Score inférieur à 50%. Le niveau suivant reste bloqué. Recommencez ou inscrivez-vous au cours complet HariMada Tech.');
            showEmoji(false);
            playSound(false);
        }

        const shareText = encodeURIComponent(`J'ai obtenu ${percent}% au niveau ${levelNames[level]} du quiz CSS Couleurs sur CSS Color Master.`);
        const pageUrl = encodeURIComponent(location.href);
        if(facebookShare) facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${shareText}`;

        updateCertificateAccess();

        if(percent >= 50 && nextLevel){
            setTimeout(() => {
                showGlobalMessage('success', `✅ Vous pouvez continuer vers le niveau ${levelNames[nextLevel]}.`);
            }, 900);
        }
    }

    function resetCurrentLevel(clearResult=true){
        const panel = document.querySelector(`.level-panel[data-level="${currentLevel}"]`);
        if(!panel) return;

        good = 0;
        bad = 0;
        timer = levelTime;
        timerStarted = false;
        levelFinished = false;
        suspiciousActions = 0;
        clearInterval(timerInterval);
        updateSecurityStatus();

        panel.querySelectorAll('.quiz-card').forEach(card => {
            card.dataset.done = 'false';
            const feedback = card.querySelector('.quiz-feedback');
            if(feedback){
                feedback.className = 'quiz-feedback';
                feedback.innerHTML = '';
            }
            card.querySelectorAll('button').forEach(btn => btn.classList.remove('correct','wrong'));
            const input = card.querySelector('input');
            if(input){
                input.value = '';
                input.style.borderColor = '';
            }
            const preview = card.querySelector('.live-color-preview');
            if(preview){
                preview.style.background = '';
                preview.style.color = '';
                preview.textContent = 'Aperçu après validation';
            }
        });

        const resultBox = panel.querySelector('.level-result');
        if(resultBox && clearResult){
            resultBox.className = 'level-result';
            resultBox.innerHTML = '';
        }

        updateTimer();
        updateScore();
    }

    document.querySelectorAll('.level-tab').forEach(tab => {
        tab.addEventListener('click', () => showLevel(tab.dataset.levelTarget));
    });

    document.querySelectorAll('.finish-level').forEach(btn => {
        btn.addEventListener('click', () => finishLevel(btn.dataset.finishLevel));
    });

    if(whatsappCertificat){
        whatsappCertificat.addEventListener('click', e => {
            if(whatsappCertificat.classList.contains('disabled-certificat')){
                e.preventDefault();
                showGlobalMessage('fail', '🔒 Certificat bloqué. Terminez d’abord le niveau Avancé avec au moins 50%.');
            }
        });
    }

    document.addEventListener('contextmenu', e => {
        if(document.querySelector('.quiz-app') && timerStarted && !levelFinished){
            e.preventDefault();
            markSuspicious('clic droit bloqué');
        }
    });

    document.addEventListener('visibilitychange', () => {
        if(document.hidden && timerStarted && !levelFinished){
            markSuspicious('changement d’onglet');
        }
    });

    document.addEventListener('copy', e => {
        if(timerStarted && !levelFinished){
            e.preventDefault();
            markSuspicious('copie pendant le quiz');
        }
    });

    document.addEventListener('keydown', e => {
        if(timerStarted && !levelFinished && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())))){
            e.preventDefault();
            markSuspicious('raccourci développeur');
        }
    });

    const startBtn = document.getElementById('startLevel');
    if(startBtn) startBtn.addEventListener('click', startTimer);

    const resetBtn = document.getElementById('resetQuiz');
    if(resetBtn) resetBtn.addEventListener('click', () => resetCurrentLevel(true));

    const clearSaved = document.getElementById('clearSavedScore');
    if(clearSaved){
        clearSaved.addEventListener('click', () => {
            localStorage.removeItem('cssColorQuizScores');
            location.reload();
        });
    }

    showLevel('debutant');
    updateCertificateAccess();
})();
