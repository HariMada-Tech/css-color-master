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
    if(document.querySelector('.quiz-pro')) return;
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
    if(document.querySelector('.quiz-pro')) return;
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

// =====================================================
// Quiz Pro CSS Couleurs : banque 100+ questions générées
// =====================================================
(function(){
const app=document.querySelector('.quiz-pro'); if(!app)return;
const levels=['debutant','intermediaire','avance'], names={debutant:'Débutant',intermediaire:'Intermédiaire',avance:'Avancé'};
let current='debutant', timer=180, interval=null, started=false, finished=false, good=0, bad=0, suspicious=0, last=null;
const saved=JSON.parse(localStorage.getItem('cssColorQuizScoresPro')||'{}');
const $=id=>document.getElementById(id), sg=$('scoreGood'), sb=$('scoreBad'), td=$('timerDisplay'), bs=$('bestScore'), bn=$('badgeName'), cn=$('currentLevelName'), fm=$('finalResultMessage'), ss=$('securityStatus'), pop=$('emojiPop'), cert=$('downloadCertificate'), wa=$('whatsappCertificat'), fb=$('facebookShare'), nm=$('studentName');
const base={
debutant:[
['choice','Quelle propriété change la couleur du texte ?',['color','background-color','padding','margin'],'color','color change la couleur du texte.'],
['choice','Quelle propriété change la couleur de fond ?',['background-color','font-size','display','gap'],'background-color','background-color change le fond.'],
['choice','Quel format commence par # ?',['HEX','RGB','HSL','Nom CSS'],'hex','HEX commence par #.'],
['choice','Quelle propriété colore une bordure ?',['border','width','height','font-weight'],'border','border peut utiliser une couleur.'],
['choice','Quelle instruction est correcte ?',['color: red;','text-color: red;','font-color: red;','couleur: red;'],'color:red;','La propriété correcte est color.']
],
intermediaire:[
['choice','RGB signifie :',['Red Green Blue','Rose Gold Black','Right Grid Border','Radius Gradient Block'],'redgreenblue','RGB = Rouge, Vert, Bleu.'],
['choice','Chaque valeur RGB va de :',['0 à 255','0 à 10','1 à 100','A à F'],'0à255','RGB utilise 0 à 255.'],
['choice','RGBA ajoute une valeur pour :',['transparence','taille','police','largeur'],'transparence','A = alpha.'],
['choice','Alpha 1 signifie :',['totalement visible','invisible','rouge','flou'],'totalementvisible','1 = opaque.'],
['choice','Alpha 0 signifie :',['invisible','visible','bleu','blanc'],'invisible','0 = transparent.']
],
avance:[
['choice','HSL signifie :',['Hue Saturation Lightness','HTML Style Layout','High Shadow Level','Header Section Link'],'huesaturationlightness','HSL = teinte, saturation, luminosité.'],
['choice','Dans hsl(220,90%,60%), 220 représente :',['teinte','saturation','luminosité','alpha'],'teinte','La première valeur est la teinte.'],
['choice','Quelle propriété crée un effet au survol ?',[':hover','@font-face','meta','href'],':hover',':hover agit au passage de souris.'],
['choice','Open Graph sert surtout à :',['améliorer partage Facebook','changer couleur CSS','bloquer triche','créer PDF'],'améliorerpartagefacebook','Open Graph améliore le partage social.'],
['choice','localStorage sert à :',['sauvegarder dans le navigateur','publier sur Google','envoyer email','héberger image'],'sauvegarderdanslenavigateur','localStorage sauvegarde localement.']
]};
const colors=[['rouge','#FF0000','red','rgb(255,0,0)'],['vert','#00FF00','green','rgb(0,255,0)'],['bleu','#0000FF','blue','rgb(0,0,255)'],['noir','#000000','black','rgb(0,0,0)'],['blanc','#FFFFFF','white','rgb(255,255,255)'],['jaune','#FFFF00','yellow','rgb(255,255,0)'],['cyan','#00FFFF','cyan','rgb(0,255,255)'],['magenta','#FF00FF','magenta','rgb(255,0,255)']];
function genBank(){
 colors.forEach(c=>{
  base.debutant.push(['choice',`Quel code HEX représente le ${c[0]} ?`,shuffle([c[1],...colors.filter(x=>x[1]!=c[1]).slice(0,3).map(x=>x[1])]),norm(c[1]),`${c[1]} représente le ${c[0]}.`]);
  base.debutant.push(['text',`Tapez un nom CSS pour obtenir ${c[0]}.`,[],norm(c[2]),`${c[2]} est accepté en CSS.`]);
  base.intermediaire.push(['choice',`Quel RGB représente le ${c[0]} ?`,shuffle([c[3],...colors.filter(x=>x[3]!=c[3]).slice(0,3).map(x=>x[3])]),norm(c[3]),`${c[3]} représente le ${c[0]}.`]);
 });
 const interQuestions=[
  ['choice','Quel format est le plus pratique pour créer une ombre transparente ?',['RGBA','Nom CSS','PX','REM'],'rgba','RGBA permet de gérer la transparence.'],
  ['choice','Dans rgba(255,0,0,0.25), la couleur est surtout :',['rouge transparent','bleu opaque','vert transparent','noir'],'rougetransparent','Rouge avec alpha 0.25.'],
  ['choice','Quel alpha rend une couleur totalement visible ?',['1','0','0.2','transparent'],'1','Alpha 1 = visible.'],
  ['choice','Quel alpha rend une couleur invisible ?',['0','1','0.5','255'],'0','Alpha 0 = invisible.'],
  ['choice','Quel alpha donne environ moitié visible ?',['0.5','1','0','255'],'0.5','0.5 = moitié visible.'],
  ['choice','Quel format est souvent utilisé dans JavaScript pour manipuler les nombres de couleur ?',['RGB','HSL seulement','Nom couleur','Favicon'],'rgb','RGB utilise trois nombres.'],
  ['choice','Dans #2563EB, le groupe rouge est :',['25','63','EB','#2'],'25','Les deux premiers caractères indiquent le rouge.'],
  ['choice','Dans #2563EB, le groupe vert est :',['63','25','EB','#6'],'63','Les deux caractères du milieu indiquent le vert.'],
  ['choice','Dans #2563EB, le groupe bleu est :',['EB','25','63','#E'],'eb','Les deux derniers caractères indiquent le bleu.'],
  ['choice','Quel exemple est correct pour un fond bleu léger ?',['background-color: rgba(37,99,235,.12);','background-color: rgb(37,99,235,.12);','color-alpha: blue;','background: alpha(blue);'],'background-color:rgba(37,99,235,.12);','RGBA permet un fond léger.'],
  ['choice','Quel code HEX court équivaut à #FF0000 ?',['#F00','#00F','#0F0','#FFF'],'#f00','#F00 = #FF0000.'],
  ['choice','Quel code HEX court équivaut à #0000FF ?',['#00F','#F00','#0F0','#000'],'#00f','#00F = #0000FF.'],
  ['choice','Quel format est plus lisible pour les débutants quand il y a transparence ?',['rgba()','#RRGGBBAA','nom couleur','aucun'],'rgba()','rgba() montre clairement la valeur alpha.'],
  ['choice','Quel exemple est invalide en RGB ?',['rgb(300,0,0)','rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)'],'rgb(300,0,0)','300 dépasse 255.'],
  ['choice','Quel exemple est valide en RGB ?',['rgb(128,128,128)','rgb(999,0,0)','rgb(red,0,0)','rgb(#fff)'],'rgb(128,128,128)','128 est entre 0 et 255.'],
  ['choice','Pour un overlay noir sur image, choisissez :',['rgba(0,0,0,.5)','rgb(0,0,0)','color: black','border black'],'rgba(0,0,0,.5)','Alpha crée la transparence.'],
  ['choice','Quelle syntaxe ajoute une bordure transparente bleue ?',['border: 1px solid rgba(37,99,235,.35);','border: rgba(37,99,235);','border-alpha: blue;','solid: blue alpha;'],'border:1pxsolidrgba(37,99,235,.35);','border peut utiliser rgba().'],
  ['choice','Quel format est très utilisé dans Figma ou les maquettes ?',['HEX','DOCX','MP3','SQL'],'hex','Les maquettes donnent souvent des codes HEX.'],
  ['choice','Dans RGB, quelle valeur donne le rouge maximum ?',['255,0,0','0,255,0','0,0,255','0,0,0'],'255,0,0','Rouge maximum = 255.'],
  ['choice','Dans RGB, quelle valeur donne le blanc ?',['255,255,255','0,0,0','255,0,0','0,0,255'],'255,255,255','Toutes les valeurs au maximum donnent blanc.']
 ];
 interQuestions.forEach(q=>base.intermediaire.push(q));

 const avanceQuestions=[
  ['choice','En HSL, pour rendre une couleur plus claire, on augmente :',['Lightness','Hue','border','font-size'],'lightness','Lightness contrôle la luminosité.'],
  ['choice','En HSL, pour rendre une couleur moins vive, on baisse :',['Saturation','Lightness','HTML','width'],'saturation','Saturation contrôle l’intensité.'],
  ['choice','Dans hsl(220,90%,60%), 90% représente :',['Saturation','Hue','Lightness','Alpha'],'saturation','La deuxième valeur est la saturation.'],
  ['choice','Dans hsl(220,90%,60%), 60% représente :',['Lightness','Hue','Saturation','Border'],'lightness','La troisième valeur est la luminosité.'],
  ['choice','Une palette professionnelle contient souvent :',['couleur principale, fond clair, texte foncé','couleurs au hasard','uniquement rouge','aucun contraste'],'couleurprincipalefondclairtextefoncé','Une palette doit être cohérente.'],
  ['choice','Pour un bouton bleu, quelle couleur de texte est souvent meilleure ?',['white','blue','yellow clair','transparent'],'white','Le blanc contraste bien avec le bleu.'],
  ['choice','Quel outil SEO liste les URLs du site ?',['sitemap.xml','style.css','favicon.ico','script.js'],'sitemap.xml','Le sitemap aide Google à découvrir les pages.'],
  ['choice','Pour partage Facebook, quelle balise est utile ?',['Open Graph','border','padding','font-size'],'opengraph','Open Graph améliore l’aperçu social.'],
  ['choice','Pour imprimer proprement un résultat, on utilise :',['@media print','@media color','print-css only','robots.txt'],'@mediaprint','@media print adapte la page à l’impression.'],
  ['choice','Pour sauvegarder un score sans serveur, on utilise :',['localStorage','sitemap','meta description','favicon'],'localstorage','localStorage sauvegarde dans le navigateur.'],
  ['choice','Pour un classement mondial réel, il faut :',['backend et base de données','CSS seulement','HTML uniquement','favicon'],'backendetbasededonnées','Un serveur est nécessaire pour un classement mondial.'],
  ['choice','Quelle couleur inspire souvent confiance en design tech ?',['bleu','rouge danger','jaune fluo','gris invisible'],'bleu','Le bleu est souvent associé à la confiance.'],
  ['choice','Un CTA doit être :',['visible et contrasté','caché','gris clair','minuscule'],'visibleetcontrasté','Un CTA doit attirer le clic.'],
  ['choice','Une variable CSS couleur s’écrit :',['--primary: #2563eb;','primary = blue','color-primary html','meta-color'],'--primary:#2563eb;','Les variables CSS commencent par --.'],
  ['choice','Pour utiliser une variable CSS :',['color: var(--primary);','color: variable(primary);','primary(color)','color: --primary;'],'color:var(--primary);','var() utilise une variable CSS.']
 ];
 avanceQuestions.forEach(q=>base.avance.push(q));
}
function norm(v){return (v||'').toString().trim().toLowerCase().replace(/\s+/g,'')}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function uniqueQuestions(list,count){let seen=new Set();return shuffle(list).filter(q=>{let key=q[1].toLowerCase().trim();if(seen.has(key))return false;seen.add(key);return true}).slice(0,count)}
function badge(p){if(p>=85)return{name:'Or',emoji:'🥇',cls:'badge-gold'};if(p>=70)return{name:'Argent',emoji:'🥈',cls:'badge-silver'};if(p>=50)return{name:'Bronze',emoji:'🥉',cls:'badge-bronze'};return{name:'Aucun',emoji:'😂',cls:''}}
function msg(t,m){if(fm){fm.className='final-result-message '+t;fm.innerHTML=m}}
function sec(t='',m='Sécurité : évitez de changer d’onglet pendant le quiz.'){if(ss){ss.className='security-status '+t;ss.innerHTML=m}}
function upd(){sg.textContent=good;sb.textContent=bad;td.textContent=String(Math.floor(timer/60)).padStart(2,'0')+':'+String(timer%60).padStart(2,'0');cn.textContent=names[current];let best=saved[current]?.percent||0;bs.textContent=best+'%';let b=badge(best);bn.textContent=b.emoji+' '+b.name}
function sound(ok){try{let A=new(window.AudioContext||window.webkitAudioContext)(),o=A.createOscillator(),g=A.createGain();o.connect(g);g.connect(A.destination);o.frequency.value=ok?800:160;g.gain.value=.08;g.gain.exponentialRampToValueAtTime(.001,A.currentTime+.35);o.start();o.stop(A.currentTime+.36)}catch(e){}}
function emoji(ok){if(!pop)return;pop.textContent=ok?'🎉👏😎':'😂🤦‍♂️';pop.classList.remove('show');void pop.offsetWidth;pop.classList.add('show')}
function render(level){let box=$('questions-'+level);box.innerHTML='';uniqueQuestions(base[level],10).forEach((q,i)=>{let [type,question,opts,ans,cor]=q,card=document.createElement('div');card.className='quiz-card';card.dataset.answer=ans;card.dataset.done='false';let h=`<h3>${i+1}. ${question}</h3>`; if(type=='choice'){h+='<div class="quiz-options">'+opts.map(o=>`<button type="button" data-value="${o}">${o}</button>`).join('')+'</div>'}else{h+='<div class="text-answer"><input type="text" placeholder="Tapez votre réponse"><button type="button">Valider</button></div>'}h+=`<div class="quiz-feedback"></div><details><summary>Correction</summary><p>${cor}</p></details>`;card.innerHTML=h;box.appendChild(card)});attach(box)}
function attach(scope){scope.querySelectorAll('.quiz-card').forEach(card=>{let answers=card.dataset.answer.split('|').map(norm);card.querySelectorAll('.quiz-options button').forEach(btn=>btn.onclick=()=>{if(!card.closest('.level-panel').classList.contains('active')||card.dataset.done=='true'||finished)return;startOnce();let ok=answers.includes(norm(btn.dataset.value));card.querySelectorAll('button').forEach(b=>{if(answers.includes(norm(b.dataset.value)))b.classList.add('correct')});if(!ok)btn.classList.add('wrong');mark(card,ok,answers[0])});let inp=card.querySelector('input'), vb=card.querySelector('.text-answer button');if(inp&&vb){vb.onclick=()=>{if(card.dataset.done=='true'||finished)return;startOnce();let ok=answers.includes(norm(inp.value));inp.style.borderColor=ok?'#16a34a':'#dc2626';mark(card,ok,answers[0])};inp.onkeydown=e=>{if(e.key=='Enter')vb.click()}}})}
function mark(card,ok,correct){card.dataset.done='true';let f=card.querySelector('.quiz-feedback');f.className='quiz-feedback '+(ok?'good':'bad');f.innerHTML=ok?'✅ Bravo ! Bonne réponse.':'❌ Faux 😂 Correction : <code>'+correct+'</code>.';ok?good++:bad++;upd();emoji(ok);sound(ok)}
function startOnce(){if(started||finished)return;started=true;clearInterval(interval);timer=180;interval=setInterval(()=>{timer--;upd();if(timer<=0){clearInterval(interval);finish(current,true)}},1000)}
function unlocked(l){return l=='debutant'||(l=='intermediaire'&&(saved.debutant?.percent||0)>=50)||(l=='avance'&&(saved.intermediaire?.percent||0)>=50)}
function tabs(){document.querySelectorAll('.level-tab').forEach(t=>{let l=t.dataset.levelTarget,u=unlocked(l);t.classList.toggle('locked',!u);t.textContent=names[l]+(u?'':' 🔒');t.classList.toggle('active',l==current)})}
function show(l){if(!unlocked(l)){msg('fail','🔒 Niveau bloqué. Obtenez au moins 50% au niveau précédent.');return}current=l;reset(false);document.querySelectorAll('.level-panel').forEach(p=>{p.classList.toggle('active',p.dataset.level==l);p.classList.toggle('locked-panel',!unlocked(p.dataset.level))});tabs();upd();sec()}
function finish(level,byTimer=false){let panel=document.querySelector(`.level-panel[data-level="${level}"]`),cards=[...panel.querySelectorAll('.quiz-card')],total=cards.length,answered=cards.filter(c=>c.dataset.done=='true').length,percent=Math.round(good/total*100),res=panel.querySelector('.level-result'),b=badge(percent),name=(nm.value||'Apprenant').trim()||'Apprenant';if(answered<total&&!byTimer){res.className='level-result warning';res.innerHTML='⚠️ Répondez à toutes les questions.';return}clearInterval(interval);started=false;finished=true;if(!saved[level]||percent>saved[level].percent){saved[level]={percent,good,total,badge:b.name,date:new Date().toLocaleString()};localStorage.setItem('cssColorQuizScoresPro',JSON.stringify(saved))}last={name,level,percent,good,total,badge:b,date:new Date().toLocaleString()};saveTop(last);top();tabs();certAccess();upd(); if(percent>=50){res.className='level-result success';res.innerHTML=`${b.emoji} Bravo ${name} : <strong>${good}/${total}</strong> (${percent}%). Badge <span class="badge-medal ${b.cls}">${b.emoji} ${b.name}</span><br><a class="btn-small" href="https://www.harimadatech.com/index.html#inscription" target="_blank">Demander le cours complet</a>`;msg('success','✅ Score sauvegardé.');emoji(true);sound(true)}else{res.className='level-result fail';res.innerHTML=`😂 Score insuffisant : <strong>${good}/${total}</strong> (${percent}%). Le niveau suivant reste bloqué.<br><a class="btn-small course-cta" href="https://www.harimadatech.com/index.html#inscription" target="_blank">Je veux suivre le cours complet</a>`;msg('fail','❌ Moins de 50%. Recommencez ou suivez la formation HariMada Tech.');emoji(false);sound(false)}share()}
function reset(regen=false){clearInterval(interval);timer=180;good=0;bad=0;started=false;finished=false;suspicious=0;if(regen)render(current);let p=document.querySelector(`.level-panel[data-level="${current}"]`);if(p){p.querySelectorAll('.quiz-card').forEach(c=>{c.dataset.done='false';let f=c.querySelector('.quiz-feedback');f.className='quiz-feedback';f.innerHTML='';c.querySelectorAll('button').forEach(b=>b.classList.remove('correct','wrong'));let i=c.querySelector('input');if(i){i.value='';i.style.borderColor=''}});let r=p.querySelector('.level-result');r.className='level-result';r.innerHTML=''}upd();sec()}
function saveTop(r){let a=JSON.parse(localStorage.getItem('cssColorQuizTop10')||'[]');a.push({name:r.name,level:names[r.level],percent:r.percent,badge:r.badge.emoji+' '+r.badge.name,date:r.date});a.sort((x,y)=>y.percent-x.percent);localStorage.setItem('cssColorQuizTop10',JSON.stringify(a.slice(0,10)))}
function top(){let tb=document.querySelector('#leaderboardTable tbody'),a=JSON.parse(localStorage.getItem('cssColorQuizTop10')||'[]');tb.innerHTML=a.map((r,i)=>`<tr><td>${i+1}</td><td>${r.name}</td><td>${r.level}</td><td>${r.percent}%</td><td>${r.badge}</td><td>${r.date}</td></tr>`).join('')}
function certAccess(){let p=saved.avance?.percent||0;if(p>=50){cert.disabled=false;cert.textContent='Télécharger certificat PDF';cert.classList.remove('disabled-certificat');wa.classList.remove('disabled-certificat');wa.textContent='Demander certificat sur WhatsApp';wa.target='_blank';wa.href='https://wa.me/261322160631?text='+encodeURIComponent('Bonjour HariMada Tech, je veux demander un certificat pour le quiz CSS Couleurs. Score niveau Avancé : '+p+'%.')}else{cert.disabled=true;cert.textContent='Certificat PDF bloqué';cert.classList.add('disabled-certificat');wa.classList.add('disabled-certificat');wa.textContent='Certificat WhatsApp bloqué';wa.href='#';wa.removeAttribute('target')}}
function share(){let p=last?.percent||saved.avance?.percent||0;fb.href='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)+'&quote='+encodeURIComponent("J'ai obtenu "+p+"% au quiz CSS Couleurs de HariMada Tech.")}

function preparePrintResult(){
 let name=(nm?.value||'Apprenant').trim()||'Apprenant';
 let r=last||{level:current,percent:(saved[current]?.percent||0),good:good,total:good+bad,badge:badge(saved[current]?.percent||0),date:new Date().toLocaleString()};
 let levelName=names[r.level]||'-';
 let pct=r.percent||0;
 let b=badge(pct);
 let set=(id,val)=>{let el=$(id);if(el)el.textContent=val};
 set('printName',name);
 set('printLevel',levelName);
 set('printScore',pct+'%');
 set('printBadge',b.emoji+' '+b.name);
 set('printDate',new Date().toLocaleString());
}

function pdf(){
 let p=saved.avance?.percent||0;
 if(p<50){
  msg('fail','🔒 Certificat bloqué. Terminez le niveau Avancé avec au moins 50%.');
  return;
 }
 if(!window.jspdf){
  msg('fail','⚠️ Le générateur PDF n’est pas encore chargé. Réessayez dans quelques secondes.');
  return;
 }
 const {jsPDF}=window.jspdf;
 const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
 const name=(nm?.value||'Apprenant').trim()||'Apprenant';
 const b=badge(p);
 const certNo='HMT-CSS-'+new Date().getFullYear()+'-'+Math.floor(100000+Math.random()*900000);
 const today=new Date().toLocaleDateString();

 doc.setFillColor(248,250,252);
 doc.rect(0,0,297,210,'F');

 doc.setDrawColor(37,99,235);
 doc.setLineWidth(2.2);
 doc.roundedRect(12,12,273,186,4,4);

 doc.setFillColor(37,99,235);
 doc.roundedRect(22,22,52,18,3,3,'F');
 doc.setFont('helvetica','bold');
 doc.setTextColor(255,255,255);
 doc.setFontSize(12);
 doc.text('HariMada Tech',48,34,{align:'center'});

 doc.setTextColor(15,23,42);
 doc.setFontSize(30);
 doc.text('Certificat de réussite',148,55,{align:'center'});

 doc.setFont('helvetica','normal');
 doc.setFontSize(14);
 doc.setTextColor(71,85,105);
 doc.text('Ce certificat atteste que',148,76,{align:'center'});

 doc.setFont('helvetica','bold');
 doc.setFontSize(25);
 doc.setTextColor(29,78,216);
 doc.text(name,148,96,{align:'center'});

 doc.setFont('helvetica','normal');
 doc.setFontSize(14);
 doc.setTextColor(51,65,85);
 doc.text('a terminé avec succès le niveau Avancé du Quiz CSS Couleurs',148,116,{align:'center'});

 doc.setFont('helvetica','bold');
 doc.setFontSize(17);
 doc.setTextColor(15,23,42);
 doc.text('Score : '+p+'%    Badge : '+b.name,148,137,{align:'center'});

 doc.setFont('helvetica','normal');
 doc.setFontSize(12);
 doc.setTextColor(71,85,105);
 doc.text('Certificat N° : '+certNo,148,154,{align:'center'});
 doc.text('Date : '+today,148,166,{align:'center'});

 doc.setFontSize(11);
 doc.text('Délivré par HariMada Tech - Formation Développement Web Full-Stack',148,182,{align:'center'});
 doc.text('Ce certificat est généré automatiquement par CSS Color Master.',148,191,{align:'center'});

 doc.save('certificat-css-color-master-'+name.replace(/\s+/g,'-').toLowerCase()+'.pdf');
}
function suspect(reason){if(!started||finished)return;suspicious++;sec('warning','⚠️ Action suspecte : '+reason+'. Avertissement n°'+suspicious);if(suspicious>=3){clearInterval(interval);finished=true;sec('danger','🚫 Quiz arrêté pour suspicion de triche.');msg('fail','🚫 Quiz arrêté pour suspicion de triche.')}}
document.querySelectorAll('.level-tab').forEach(t=>t.onclick=()=>show(t.dataset.levelTarget));document.querySelectorAll('.finish-level').forEach(b=>b.onclick=()=>finish(b.dataset.finishLevel));$('startLevel').onclick=startOnce;$('resetQuiz').onclick=()=>reset(false);$('generateQuestions').onclick=()=>reset(true);$('clearSavedScore').onclick=()=>{localStorage.removeItem('cssColorQuizScoresPro');localStorage.removeItem('cssColorQuizTop10');location.reload()};$('printResult').onclick=()=>{preparePrintResult();window.print()};cert.onclick=pdf;wa.onclick=e=>{if(wa.classList.contains('disabled-certificat')){e.preventDefault();msg('fail','🔒 Certificat bloqué. Terminez le niveau Avancé.')}};document.addEventListener('contextmenu',e=>{if(started&&!finished){e.preventDefault();suspect('clic droit')}});document.addEventListener('copy',e=>{if(started&&!finished){e.preventDefault();suspect('copie')}});document.addEventListener('visibilitychange',()=>{if(document.hidden&&started&&!finished)suspect('changement d’onglet')});
genBank();levels.forEach(render);top();tabs();show('debutant');certAccess();share();
})();

// =====================================================
// Full Upgrade : mode sombre, impression 1 page, PDF premium, partage, vérification
// =====================================================
(function(){
    // Mode sombre global
    const themeBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('cssColorTheme') || 'light';
    if(savedTheme === 'dark'){
        document.body.classList.add('dark-mode');
        if(themeBtn) themeBtn.textContent = '☀️';
    }
    if(themeBtn){
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('cssColorTheme', isDark ? 'dark' : 'light');
            themeBtn.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // PWA
    if('serviceWorker' in navigator){
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
        });
    }

    // Vérification certificat
    const verifyBtn = document.getElementById('verifyCertificateBtn');
    if(verifyBtn){
        verifyBtn.addEventListener('click', () => {
            const input = document.getElementById('certificateNumberInput');
            const result = document.getElementById('verifyResult');
            const code = (input.value || '').trim().toUpperCase();
            const certs = JSON.parse(localStorage.getItem('cssColorCertificates') || '[]');
            const cert = certs.find(c => c.number === code);
            if(cert){
                result.className = 'final-result-message success';
                result.innerHTML = `✅ Certificat trouvé.<br><strong>Nom :</strong> ${cert.name}<br><strong>Score :</strong> ${cert.score}%<br><strong>Badge :</strong> ${cert.badge}<br><strong>Date :</strong> ${cert.date}`;
            }else{
                result.className = 'final-result-message fail';
                result.innerHTML = '❌ Certificat introuvable dans ce navigateur. Pour une vérification mondiale, il faudrait un serveur avec base de données.';
            }
        });
    }
})();

(function(){
    const app = document.querySelector('.quiz-pro');
    if(!app) return;

    function getCurrentName(){
        const nm = document.getElementById('studentName');
        return ((nm && nm.value) || 'Apprenant').trim() || 'Apprenant';
    }

    function getSaved(){
        return JSON.parse(localStorage.getItem('cssColorQuizScoresPro') || '{}');
    }

    function getTop(){
        return JSON.parse(localStorage.getItem('cssColorQuizTop10') || '[]');
    }

    function getBadge(percent){
        if(percent >= 90) return {name:'Expert Couleurs CSS', emoji:'🏅', cls:'badge-gold'};
        if(percent >= 85) return {name:'Or', emoji:'🥇', cls:'badge-gold'};
        if(percent >= 70) return {name:'Argent', emoji:'🥈', cls:'badge-silver'};
        if(percent >= 50) return {name:'Bronze', emoji:'🥉', cls:'badge-bronze'};
        return {name:'Aucun', emoji:'😂', cls:''};
    }

    function updatePodium(){
        const box = document.getElementById('podiumBox');
        if(!box) return;
        const top = getTop().slice(0,3);
        const classes = ['first','second','third'];
        const medals = ['🥇','🥈','🥉'];
        if(!top.length){
            box.innerHTML = '<div class="podium-card">Aucun score pour le moment.</div>';
            return;
        }
        box.innerHTML = top.map((r,i)=>`
            <div class="podium-card ${classes[i] || ''}">
                <strong>${medals[i] || '🏅'} ${i+1}</strong>
                <div>${r.name}</div>
                <div>${r.percent}% - ${r.badge}</div>
                <small>${r.level}</small>
            </div>
        `).join('');
    }

    function prepareCleanPrint(){
        const saved = getSaved();
        const currentLevelName = document.getElementById('currentLevelName')?.textContent || 'Quiz';
        const scoreText = document.getElementById('bestScore')?.textContent || '0%';
        const pct = parseInt(scoreText,10) || (saved.avance?.percent || saved.intermediaire?.percent || saved.debutant?.percent || 0);
        const badge = getBadge(pct);
        const set = (id, value) => { const el = document.getElementById(id); if(el) el.textContent = value; };
        set('printName', getCurrentName());
        set('printLevel', currentLevelName);
        set('printScore', pct + '%');
        set('printBadge', badge.emoji + ' ' + badge.name);
        set('printDate', new Date().toLocaleString());
    }

    // Remplacer le bouton d'impression par une impression propre 1 page
    const printBtn = document.getElementById('printResult');
    if(printBtn){
        printBtn.onclick = (e) => {
            e.preventDefault();
            prepareCleanPrint();

            const area = document.getElementById('printOnlyResult');
            const html = area ? area.innerHTML : '<h1>Résultat CSS Color Master</h1>';
            const printWindow = window.open('', '_blank', 'width=800,height=900');
            if(!printWindow){
                window.print();
                return;
            }
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="fr">
                <head>
                    <meta charset="UTF-8">
                    <title>Résultat CSS Color Master</title>
                    <style>
                        @page{size:A4 portrait;margin:14mm}
                        body{font-family:Arial,sans-serif;color:#0f172a;margin:0;background:white}
                        .print-box{border:2px solid #2563eb;border-radius:16px;padding:28px;max-width:700px;margin:auto}
                        h1{text-align:center;color:#1d4ed8}
                        p{font-size:16px;line-height:1.7}
                        .print-note{text-align:center;margin-top:30px;color:#475569;font-size:12px}
                    </style>
                </head>
                <body><div class="print-box">${html}</div></body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 300);
        };
    }

    // Remplacer PDF par certificat premium 1 page avec QR visible
    const pdfBtn = document.getElementById('downloadCertificate');
    if(pdfBtn){
        pdfBtn.onclick = (e) => {
            e.preventDefault();
            const saved = getSaved();
            const advancedScore = saved.avance?.percent || 0;
            const message = document.getElementById('finalResultMessage');

            if(advancedScore < 50){
                if(message){
                    message.className = 'final-result-message fail';
                    message.innerHTML = '🔒 Certificat bloqué. Terminez le niveau Avancé avec au moins 50%.';
                }
                return;
            }

            if(!window.jspdf){
                if(message){
                    message.className = 'final-result-message fail';
                    message.innerHTML = '⚠️ Le générateur PDF n’est pas encore chargé. Réessayez.';
                }
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({orientation:'landscape', unit:'mm', format:'a4'});
            const name = getCurrentName();
            const score = advancedScore;
            const badge = getBadge(score);
            const certNo = 'HMT-CSS-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random()*900000);
            const date = new Date().toLocaleDateString();
            const verifyUrl = 'https://harimada-tech.github.io/css-color-master/verifier-certificat.html?cert=' + encodeURIComponent(certNo);

            doc.setFillColor(248,250,252);
            doc.rect(0,0,297,210,'F');

            doc.setFillColor(255,255,255);
            doc.roundedRect(12,12,273,186,6,6,'F');

            doc.setDrawColor(37,99,235);
            doc.setLineWidth(2.2);
            doc.roundedRect(12,12,273,186,6,6);

            doc.setFillColor(37,99,235);
            doc.roundedRect(22,22,58,18,3,3,'F');
            doc.setFont('helvetica','bold');
            doc.setTextColor(255,255,255);
            doc.setFontSize(12);
            doc.text('HariMada Tech',51,34,{align:'center'});

            doc.setTextColor(15,23,42);
            doc.setFontSize(31);
            doc.text('Certificat de réussite',148,54,{align:'center'});

            doc.setFont('helvetica','normal');
            doc.setFontSize(13);
            doc.setTextColor(71,85,105);
            doc.text('Ce certificat atteste la réussite du Quiz CSS Color Master',148,71,{align:'center'});
            doc.text('et confirme que',148,82,{align:'center'});

            doc.setFont('helvetica','bold');
            doc.setFontSize(25);
            doc.setTextColor(29,78,216);
            doc.text(name,148,101,{align:'center'});

            doc.setFont('helvetica','normal');
            doc.setFontSize(14);
            doc.setTextColor(51,65,85);
            doc.text('a terminé avec succès le niveau Avancé du Quiz CSS Couleurs.',148,119,{align:'center'});

            doc.setFont('helvetica','bold');
            doc.setFontSize(17);
            doc.setTextColor(15,23,42);
            doc.text('Score : '+score+'%    Badge : '+badge.name,148,139,{align:'center'});

            doc.setFont('helvetica','normal');
            doc.setFontSize(11);
            doc.text('Certificat N° : '+certNo,148,156,{align:'center'});
            doc.text('Date : '+date,148,168,{align:'center'});

            // QR code dessiné simplement, compatible sans image externe
            const qrX = 238, qrY = 138, qrSize = 34, cell = qrSize / 9;
            doc.setDrawColor(15,23,42);
            doc.setLineWidth(.2);
            doc.rect(qrX, qrY, qrSize, qrSize);
            const pattern = [
                [1,1,1,0,1,0,1,1,1],
                [1,0,1,1,0,1,1,0,1],
                [1,1,1,0,1,0,1,1,1],
                [0,1,0,1,1,0,1,0,0],
                [1,0,1,1,0,1,0,1,1],
                [0,1,1,0,1,0,1,1,0],
                [1,1,1,0,1,1,1,0,1],
                [1,0,1,1,0,0,0,1,0],
                [1,1,1,0,1,1,0,0,1]
            ];
            doc.setFillColor(15,23,42);
            pattern.forEach((row,r)=>row.forEach((v,c)=>{ if(v) doc.rect(qrX+c*cell, qrY+r*cell, cell, cell, 'F'); }));
            doc.setFontSize(8);
            doc.setTextColor(71,85,105);
            doc.text('Vérification', qrX+qrSize/2, qrY+qrSize+5, {align:'center'});
            doc.text(verifyUrl, 148, 184, {align:'center', maxWidth:230});

            doc.setDrawColor(148,163,184);
            doc.line(38,174,92,174);
            doc.setFontSize(10);
            doc.setTextColor(51,65,85);
            doc.text('RAMAROSON Ange Harilanto',65,180,{align:'center'});
            doc.text('Directeur - HariMada Tech',65,185,{align:'center'});

            doc.setFontSize(9);
            doc.setTextColor(100,116,139);
            doc.text('Document généré automatiquement par CSS Color Master.',148,193,{align:'center'});

            const certs = JSON.parse(localStorage.getItem('cssColorCertificates') || '[]');
            certs.push({number:certNo, name, score, badge:badge.emoji+' '+badge.name, date:new Date().toLocaleString()});
            localStorage.setItem('cssColorCertificates', JSON.stringify(certs.slice(-50)));

            doc.save('certificat-css-color-master-'+name.replace(/\s+/g,'-').toLowerCase()+'.pdf');
        };
    }

    // Partage WhatsApp et copie score
    function buildScoreText(){
        const saved = getSaved();
        const best = saved.avance?.percent || saved.intermediaire?.percent || saved.debutant?.percent || 0;
        return `J'ai obtenu ${best}% au Quiz CSS Color Master de HariMada Tech. Essayez aussi : https://harimada-tech.github.io/css-color-master/exercices.html`;
    }

    const waShare = document.getElementById('whatsappShare');
    if(waShare){
        waShare.onclick = () => {
            waShare.href = 'https://wa.me/?text=' + encodeURIComponent(buildScoreText());
        };
    }

    const copyBtn = document.getElementById('copyScore');
    if(copyBtn){
        copyBtn.onclick = async () => {
            try{
                await navigator.clipboard.writeText(buildScoreText());
                const message = document.getElementById('finalResultMessage');
                if(message){
                    message.className = 'final-result-message success';
                    message.innerHTML = '✅ Score copié. Vous pouvez le coller sur Facebook ou WhatsApp.';
                }
            }catch(e){}
        };
    }

    // Actualise podium après résultats
    const observer = new MutationObserver(updatePodium);
    const table = document.querySelector('#leaderboardTable tbody');
    if(table) observer.observe(table,{childList:true});
    updatePodium();
})();

// =====================================================
// Installation PWA + QR réel WhatsApp + sécurité renforcée
// =====================================================
(function(){
 let promptEvent=null;
 function initInstall(){
  const btn=document.getElementById('installAppBtn');
  if(!btn)return;
  const standalone=matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if(standalone){btn.hidden=true;return}
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;btn.hidden=false});
  btn.onclick=async()=>{if(promptEvent){promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;btn.hidden=true}else{alert("Pour installer : ordinateur = icône dans la barre d’adresse. Android = menu ⋮ puis Ajouter à l’écran d’accueil.")}};
  setTimeout(()=>{if(!standalone)btn.hidden=false},2500);
 }
 initInstall();
 if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
})();

(function(){
 const app=document.querySelector('.quiz-pro');
 if(!app)return;

 function rand(){try{let a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296}catch(e){return Math.random()}}
 function shuffle(a){let x=[...a];for(let i=x.length-1;i>0;i--){let j=Math.floor(rand()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x}
 function norm(v){return (v||'').toString().trim().toLowerCase().replace(/\s+/g,'')}
 function msg(t,m){let el=document.getElementById('finalResultMessage');if(el){el.className='final-result-message '+t;el.innerHTML=m}}
 function student(){let n=document.getElementById('studentName');return ((n&&n.value)||'Apprenant').trim()||'Apprenant'}
 function saved(){return JSON.parse(localStorage.getItem('cssColorQuizScoresPro')||'{}')}
 function badge(p){if(p>=90)return'Expert Couleurs CSS';if(p>=85)return'Or';if(p>=70)return'Argent';if(p>=50)return'Bronze';return'Aucun'}

 // Corrections bloquées avant réponse
 document.addEventListener('toggle',e=>{
  let d=e.target;if(d.tagName!=='DETAILS')return;
  let c=d.closest('.quiz-card');
  if(c&&c.dataset.done!=='true'){d.open=false;msg('fail','🔒 Correction bloquée. Répondez d’abord à la question.')}
 },true);

 // Questions bonus variables à chaque chargement pour rendre la mémorisation plus difficile.
 function bonus(){
  if(document.querySelector('.security-hard-note'))return;
  const colors=[['rouge','#FF0000'],['vert','#00FF00'],['bleu','#0000FF'],['jaune','#FFFF00'],['cyan','#00FFFF'],['magenta','#FF00FF'],['noir','#000000'],['blanc','#FFFFFF']];
  function card(question,options,answer,correction){
   let div=document.createElement('div');div.className='quiz-card';div.dataset.answer=norm(answer);div.dataset.done='false';
   div.innerHTML='<h3>'+question+'</h3><div class="quiz-options">'+shuffle(options).map(o=>'<button type="button" data-value="'+o+'">'+o+'</button>').join('')+'</div><div class="quiz-feedback"></div><details><summary>Correction</summary><p>'+correction+'</p></details>';
   div.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(div.dataset.done==='true')return;let ok=norm(b.dataset.value)===div.dataset.answer;div.dataset.done='true';div.querySelectorAll('button').forEach(x=>{if(norm(x.dataset.value)===div.dataset.answer)x.classList.add('correct')});if(!ok)b.classList.add('wrong');let f=div.querySelector('.quiz-feedback');f.className='quiz-feedback '+(ok?'good':'bad');f.innerHTML=ok?'✅ Bravo ! Bonne réponse.':'❌ Faux 😂 Correction : <code>'+answer+'</code>.'});
   return div;
  }
  ['debutant','intermediaire','avance'].forEach(level=>{
   let box=document.getElementById('questions-'+level);if(!box)return;
   let pick=shuffle(colors).slice(0,3);
   pick.forEach((c,i)=>{
    let q;
    if(level==='debutant'){
     q=card('Bonus '+(i+1)+' : quel HEX donne '+c[0]+' ?', [c[1],...shuffle(colors.filter(x=>x[1]!==c[1])).slice(0,3).map(x=>x[1])], c[1], c[1]+' donne '+c[0]+'.');
    }else if(level==='intermediaire'){
     let alpha=[0.15,0.25,0.35,0.5,0.75][Math.floor(rand()*5)];
     q=card('Bonus '+(i+1)+' : dans rgba(0,0,0,'+alpha+'), quelle valeur contrôle la transparence ?', [String(alpha),'255','0','px'], String(alpha), 'La quatrième valeur est alpha.');
    }else{
     let light=[30,40,50,60,70,80][Math.floor(rand()*6)]+'%';
     q=card('Bonus '+(i+1)+' : dans hsl(220,90%,'+light+'), quelle valeur indique la luminosité ?', [light,'220','90%','hsl'], light, light+' est la luminosité.');
    }
    box.appendChild(q);
   });
  });
  let dash=document.querySelector('.quiz-dashboard');
  if(dash){let n=document.createElement('div');n.className='security-hard-note';n.innerHTML='🛡️ Questions bonus variables + corrections bloquées. Sur GitHub Pages, une protection parfaite exige un backend privé.';dash.appendChild(n)}
 }
 setTimeout(bonus,1000);

 // Sécurité supplémentaire anti-copie/sélection/refresh pendant quiz
 document.addEventListener('selectstart',e=>{let t=document.getElementById('timerDisplay');if(t&&t.textContent!=='03:00')e.preventDefault()});
 addEventListener('beforeunload',e=>{let t=document.getElementById('timerDisplay');if(t&&t.textContent!=='03:00'){e.preventDefault();e.returnValue=''}});

 // QR réel WhatsApp dans certificat PDF + numéro envoyé sur WhatsApp
 const pdfBtn=document.getElementById('downloadCertificate');
 if(pdfBtn){
  pdfBtn.onclick=async e=>{
   e.preventDefault();
   let sc=saved().avance?.percent||0;
   if(sc<50){msg('fail','🔒 Certificat bloqué. Terminez le niveau Avancé avec au moins 50%.');return}
   if(!window.jspdf){msg('fail','⚠️ jsPDF n’est pas encore chargé.');return}
   const {jsPDF}=window.jspdf;
   let name=student(), certNo='HMT-CSS-'+new Date().getFullYear()+'-'+Math.floor(100000+rand()*900000);
   let text='Bonjour HariMada Tech, je veux demander un certificat premium pour CSS Color Master. Nom : '+name+'. Numéro certificat : '+certNo+'. Score niveau Avancé : '+sc+'%.';
   let wa='https://wa.me/261322160631?text='+encodeURIComponent(text);
   let qr='';
   let box=document.getElementById('qrPremiumBox');
   if(box&&window.QRCode){box.innerHTML='';new QRCode(box,{text:wa,width:180,height:180,correctLevel:QRCode.CorrectLevel.H});await new Promise(r=>setTimeout(r,500));let canvas=box.querySelector('canvas');let img=box.querySelector('img');qr=canvas?canvas.toDataURL('image/png'):(img?img.src:'')}
   let doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
   doc.setFillColor(248,250,252);doc.rect(0,0,297,210,'F');doc.setFillColor(255,255,255);doc.roundedRect(12,12,273,186,6,6,'F');doc.setDrawColor(37,99,235);doc.setLineWidth(2.2);doc.roundedRect(12,12,273,186,6,6);
   doc.setFillColor(37,99,235);doc.roundedRect(22,22,60,18,3,3,'F');doc.setFont('helvetica','bold');doc.setTextColor(255,255,255);doc.setFontSize(12);doc.text('HariMada Tech',52,34,{align:'center'});
   doc.setTextColor(15,23,42);doc.setFontSize(31);doc.text('Certificat de réussite',148,54,{align:'center'});
   doc.setFont('helvetica','normal');doc.setFontSize(13);doc.setTextColor(71,85,105);doc.text('Ce certificat atteste la réussite du Quiz CSS Color Master',148,71,{align:'center'});doc.text('et confirme que',148,82,{align:'center'});
   doc.setFont('helvetica','bold');doc.setFontSize(25);doc.setTextColor(29,78,216);doc.text(name,148,101,{align:'center'});
   doc.setFont('helvetica','normal');doc.setFontSize(14);doc.setTextColor(51,65,85);doc.text('a terminé avec succès le niveau Avancé du Quiz CSS Couleurs.',148,119,{align:'center'});
   doc.setFont('helvetica','bold');doc.setFontSize(17);doc.setTextColor(15,23,42);doc.text('Score : '+sc+'%    Badge : '+badge(sc),148,139,{align:'center'});
   doc.setFont('helvetica','normal');doc.setFontSize(11);doc.setTextColor(71,85,105);doc.text('Certificat N° : '+certNo,148,156,{align:'center'});doc.text('Date : '+new Date().toLocaleDateString(),148,168,{align:'center'});
   if(qr)doc.addImage(qr,'PNG',238,126,36,36);
   doc.setFontSize(8);doc.text('Scanner pour demander',256,167,{align:'center'});doc.text('certificat premium',256,171,{align:'center'});
   doc.setDrawColor(148,163,184);doc.line(38,174,92,174);doc.setFontSize(10);doc.setTextColor(51,65,85);doc.text('RAMAROSON Ange Harilanto',65,180,{align:'center'});doc.text('Directeur - HariMada Tech',65,185,{align:'center'});
   doc.setFontSize(9);doc.setTextColor(100,116,139);doc.text('Document généré automatiquement par CSS Color Master.',148,191,{align:'center'});
   let certs=JSON.parse(localStorage.getItem('cssColorCertificates')||'[]');certs.push({number:certNo,name,score:sc,badge:badge(sc),date:new Date().toLocaleString(),whatsapp:wa});localStorage.setItem('cssColorCertificates',JSON.stringify(certs.slice(-50)));
   let w=document.getElementById('whatsappCertificat');if(w){w.href=wa;w.textContent='Demander certificat premium sur WhatsApp';w.classList.remove('disabled-certificat');w.target='_blank'}
   doc.save('certificat-css-color-master-'+name.replace(/\s+/g,'-').toLowerCase()+'.pdf');
  };
 }
})();

// =====================================================
// Publicité HariMada Tech : fermer, réduire, rouvrir
// =====================================================
(function(){
    const ad = document.getElementById('globalHmtAd');
    const closeBtn = document.getElementById('closeHmtAd');
    const minBtn = document.getElementById('minimizeHmtAd');
    const bubble = document.getElementById('openHmtAd');

    if(!ad || !bubble) return;

    const state = localStorage.getItem('hmtAdState');

    function showAd(){
        ad.style.display = 'block';
        bubble.style.display = 'none';
        localStorage.setItem('hmtAdState', 'open');
    }

    function minimizeAd(){
        ad.style.display = 'none';
        bubble.style.display = 'block';
        localStorage.setItem('hmtAdState', 'minimized');
    }

    function closeAd(){
        ad.style.display = 'none';
        bubble.style.display = 'none';
        localStorage.setItem('hmtAdState', 'closed');
    }

    if(state === 'minimized'){
        ad.style.display = 'none';
        bubble.style.display = 'block';
    }else if(state === 'closed'){
        ad.style.display = 'none';
        bubble.style.display = 'none';
    }else{
        ad.style.display = 'block';
        bubble.style.display = 'none';
    }

    if(minBtn) minBtn.addEventListener('click', minimizeAd);
    if(closeBtn) closeBtn.addEventListener('click', closeAd);
    bubble.addEventListener('click', showAd);

    // Après fermeture complète, on réaffiche seulement après 24h pour ne pas gêner l'utilisateur.
    const closeTime = localStorage.getItem('hmtAdClosedAt');
    if(state === 'closed' && closeTime){
        const hours = (Date.now() - Number(closeTime)) / 36e5;
        if(hours >= 24){
            localStorage.setItem('hmtAdState', 'minimized');
            bubble.style.display = 'block';
        }
    }

    if(closeBtn){
        closeBtn.addEventListener('click', () => {
            localStorage.setItem('hmtAdClosedAt', String(Date.now()));
        });
    }
})();

// =====================================================
// Bouton visible installation PWA
// =====================================================
(function(){
    let deferredPrompt = null;
    const btn = document.getElementById('installAppBtn');
    if(!btn) return;

    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if(standalone){
        btn.hidden = true;
        return;
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        btn.hidden = false;
    });

    btn.addEventListener('click', async () => {
        if(deferredPrompt){
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            deferredPrompt = null;
            btn.hidden = true;
        }else{
            alert("Pour installer : sur ordinateur cliquez l'icône d'installation dans la barre d'adresse. Sur Android : menu ⋮ puis Ajouter à l'écran d'accueil.");
        }
    });

    setTimeout(() => {
        if(!standalone) btn.hidden = false;
    }, 2500);
})();

// =====================================================
// Publicité HariMada Tech : toutes pages, réduire 30 min, fermer 30 min
// =====================================================
(function(){
    function initHmtAd(){
        const ad = document.getElementById('globalHmtAd');
        const closeBtn = document.getElementById('closeHmtAd');
        const minBtn = document.getElementById('minimizeHmtAd');
        const bubble = document.getElementById('openHmtAd');
        if(!ad || !bubble) return;

        const now = Date.now();
        const state = localStorage.getItem('hmtAdState') || 'open';
        const until = Number(localStorage.getItem('hmtAdUntil') || '0');

        function open(){
            ad.style.display = 'block';
            bubble.style.display = 'none';
            localStorage.setItem('hmtAdState','open');
            localStorage.removeItem('hmtAdUntil');
        }
        function hideTemporarily(){
            ad.style.display = 'none';
            bubble.style.display = 'block';
            localStorage.setItem('hmtAdState','minimized');
            localStorage.setItem('hmtAdUntil', String(Date.now() + 30 * 60 * 1000));
        }
        function closeTemporarily(){
            ad.style.display = 'none';
            bubble.style.display = 'block';
            localStorage.setItem('hmtAdState','closed');
            localStorage.setItem('hmtAdUntil', String(Date.now() + 30 * 60 * 1000));
        }

        if((state === 'minimized' || state === 'closed') && until > now){
            ad.style.display = 'none';
            bubble.style.display = 'block';
        }else{
            open();
        }

        if(minBtn) minBtn.onclick = hideTemporarily;
        if(closeBtn) closeBtn.onclick = closeTemporarily;
        bubble.onclick = open;
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHmtAd);
    else initHmtAd();
})();

// =====================================================
// Bouton visible installation PWA
// =====================================================
(function(){
    let deferredPrompt = null;
    function initInstall(){
        const btn = document.getElementById('installAppBtn');
        if(!btn) return;
        const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        if(standalone){ btn.hidden = true; return; }

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            btn.hidden = false;
        });

        btn.addEventListener('click', async () => {
            if(deferredPrompt){
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
                deferredPrompt = null;
                btn.hidden = true;
            }else{
                alert("Pour installer : ordinateur = icône dans la barre d’adresse. Android = menu ⋮ puis Ajouter à l’écran d’accueil.");
            }
        });

        setTimeout(() => { if(!standalone) btn.hidden = false; }, 2500);
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initInstall);
    else initInstall();

    if('serviceWorker' in navigator){
        window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
    }
})();

// =====================================================
// Questions bonus moins répétitives + sécurité + QR WhatsApp réel
// =====================================================
(function(){
    const app = document.querySelector('.quiz-pro');
    if(!app) return;

    function rand(){
        try{ const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] / 4294967296; }
        catch(e){ return Math.random(); }
    }
    function shuffle(arr){
        const a = [...arr];
        for(let i=a.length-1;i>0;i--){
            const j = Math.floor(rand() * (i+1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    function norm(v){ return (v||'').toString().trim().toLowerCase().replace(/\s+/g,''); }
    function msg(t,m){ const el=document.getElementById('finalResultMessage'); if(el){el.className='final-result-message '+t; el.innerHTML=m;} }
    function student(){ const n=document.getElementById('studentName'); return ((n&&n.value)||'Apprenant').trim()||'Apprenant'; }
    function saved(){ return JSON.parse(localStorage.getItem('cssColorQuizScoresPro')||'{}'); }
    function badge(p){ if(p>=90)return'Expert Couleurs CSS'; if(p>=85)return'Or'; if(p>=70)return'Argent'; if(p>=50)return'Bronze'; return'Aucun'; }

    // Bloquer correction avant réponse
    document.addEventListener('toggle', function(e){
        const d=e.target;
        if(d.tagName !== 'DETAILS') return;
        const c=d.closest('.quiz-card');
        if(c && c.dataset.done !== 'true'){
            d.open=false;
            msg('fail','🔒 Correction bloquée. Répondez d’abord à la question.');
        }
    }, true);

    // Supprimer anciens bonus s'il y en a puis créer des bonus très variés
    function makeCard(question, options, answer, correction){
        const div=document.createElement('div');
        div.className='quiz-card dynamic-extra';
        div.dataset.answer=norm(answer);
        div.dataset.done='false';
        div.innerHTML = '<h3>'+question+'</h3><div class="quiz-options">'+shuffle(options).map(o=>'<button type="button" data-value="'+o+'">'+o+'</button>').join('')+'</div><div class="quiz-feedback"></div><details><summary>Correction</summary><p>'+correction+'</p></details>';
        div.querySelectorAll('button').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                if(div.dataset.done==='true') return;
                const ok = norm(btn.dataset.value) === div.dataset.answer;
                div.dataset.done='true';
                div.querySelectorAll('button').forEach(b=>{ if(norm(b.dataset.value)===div.dataset.answer) b.classList.add('correct'); });
                if(!ok) btn.classList.add('wrong');
                const f=div.querySelector('.quiz-feedback');
                f.className='quiz-feedback '+(ok?'good':'bad');
                f.innerHTML=ok?'✅ Bravo ! Bonne réponse.':'❌ Faux 😂 Correction : <code>'+answer+'</code>.';
                const scoreId = ok ? 'scoreGood' : 'scoreBad';
                const scoreEl = document.getElementById(scoreId);
                if(scoreEl) scoreEl.textContent = String((parseInt(scoreEl.textContent,10)||0)+1);
            });
        });
        return div;
    }

    function buildBonus(){
        document.querySelectorAll('.dynamic-extra').forEach(e=>e.remove());

        const colors=[
            {name:'rouge',hex:'#FF0000',rgb:'rgb(255,0,0)',hsl:'hsl(0,100%,50%)'},
            {name:'vert',hex:'#00FF00',rgb:'rgb(0,255,0)',hsl:'hsl(120,100%,50%)'},
            {name:'bleu',hex:'#0000FF',rgb:'rgb(0,0,255)',hsl:'hsl(240,100%,50%)'},
            {name:'jaune',hex:'#FFFF00',rgb:'rgb(255,255,0)',hsl:'hsl(60,100%,50%)'},
            {name:'cyan',hex:'#00FFFF',rgb:'rgb(0,255,255)',hsl:'hsl(180,100%,50%)'},
            {name:'magenta',hex:'#FF00FF',rgb:'rgb(255,0,255)',hsl:'hsl(300,100%,50%)'},
            {name:'noir',hex:'#000000',rgb:'rgb(0,0,0)',hsl:'hsl(0,0%,0%)'},
            {name:'blanc',hex:'#FFFFFF',rgb:'rgb(255,255,255)',hsl:'hsl(0,0%,100%)'}
        ];
        const interTemplates=[
            c=>['Quel RGB représente '+c.name+' ?', [c.rgb,...shuffle(colors.filter(x=>x.rgb!==c.rgb)).slice(0,3).map(x=>x.rgb)], c.rgb, c.rgb+' représente '+c.name+'.'],
            c=>['Quel HEX court ou long représente '+c.name+' ?', [c.hex,...shuffle(colors.filter(x=>x.hex!==c.hex)).slice(0,3).map(x=>x.hex)], c.hex, c.hex+' représente '+c.name+'.'],
            c=>{const alpha=[0.12,0.25,0.35,0.45,0.6,0.75][Math.floor(rand()*6)]; return ['Dans rgba(0,0,0,'+alpha+'), quelle valeur est alpha ?', [String(alpha),'0','1','255'], String(alpha), 'La valeur '+alpha+' contrôle la transparence.'];},
            c=>{const val=[32,64,96,128,160,192,224][Math.floor(rand()*7)]; return ['Quelle valeur RGB est valide entre 0 et 255 ?', [String(val),'300','-20','FF'], String(val), val+' est une valeur RGB valide.'];}
        ];
        const advTemplates=[
            c=>['Quel HSL représente '+c.name+' ?', [c.hsl,...shuffle(colors.filter(x=>x.hsl!==c.hsl)).slice(0,3).map(x=>x.hsl)], c.hsl, c.hsl+' représente '+c.name+'.'],
            c=>{const light=[25,35,45,55,65,75,85][Math.floor(rand()*7)]+'%'; return ['Dans hsl(220,90%,'+light+'), quelle valeur indique la luminosité ?', [light,'220','90%','hsl'], light, light+' est la luminosité.'];},
            c=>{const sat=[30,45,60,75,90][Math.floor(rand()*5)]+'%'; return ['Dans hsl(220,'+sat+',60%), quelle valeur indique la saturation ?', [sat,'220','60%','alpha'], sat, sat+' est la saturation.'];},
            c=>['Pour une couleur plus claire en HSL, on augmente :', ['Lightness','Hue','border','font-size'], 'Lightness', 'Lightness contrôle la luminosité.']
        ];

        const debutBox=document.getElementById('questions-debutant');
        if(debutBox){
            shuffle(colors).slice(0,3).forEach((c,i)=>{
                const wrong=shuffle(colors.filter(x=>x.hex!==c.hex)).slice(0,3).map(x=>x.hex);
                debutBox.appendChild(makeCard('Bonus '+(i+1)+' : quel HEX représente '+c.name+' ?', [c.hex,...wrong], c.hex, c.hex+' représente '+c.name+'.'));
            });
        }

        const interBox=document.getElementById('questions-intermediaire');
        if(interBox){
            const selected=shuffle(colors).slice(0,3);
            selected.forEach((c,i)=>{
                const tpl=shuffle(interTemplates)[0](c);
                interBox.appendChild(makeCard('Bonus '+(i+1)+' : '+tpl[0], tpl[1], tpl[2], tpl[3]));
            });
        }

        const advBox=document.getElementById('questions-avance');
        if(advBox){
            const selected=shuffle(colors).slice(0,3);
            selected.forEach((c,i)=>{
                const tpl=shuffle(advTemplates)[0](c);
                advBox.appendChild(makeCard('Bonus '+(i+1)+' : '+tpl[0], tpl[1], tpl[2], tpl[3]));
            });
        }

        if(!document.querySelector('.security-hard-note')){
            const dash=document.querySelector('.quiz-dashboard');
            if(dash){
                const note=document.createElement('div');
                note.className='security-hard-note';
                note.innerHTML='🛡️ Questions bonus variables + corrections bloquées. Sur GitHub Pages, une protection parfaite demanderait un backend privé.';
                dash.appendChild(note);
            }
        }
    }

    setTimeout(buildBonus, 900);

    // Si l’utilisateur clique Générer d’autres questions, recréer aussi bonus
    const genBtn=document.getElementById('generateQuestions');
    if(genBtn){
        genBtn.addEventListener('click', ()=>setTimeout(buildBonus, 600));
    }

    // Anti sélection / refresh pendant quiz
    document.addEventListener('selectstart', e=>{
        const t=document.getElementById('timerDisplay');
        if(t && t.textContent !== '03:00') e.preventDefault();
    });
    window.addEventListener('beforeunload', e=>{
        const t=document.getElementById('timerDisplay');
        if(t && t.textContent !== '03:00'){ e.preventDefault(); e.returnValue=''; }
    });

    // QR réel WhatsApp dans certificat + numéro envoyé sur WhatsApp
    const pdfBtn=document.getElementById('downloadCertificate');
    if(pdfBtn){
        pdfBtn.addEventListener('click', async e=>{
            const sc=saved().avance?.percent||0;
            if(sc<50 || !window.jspdf) return;

            setTimeout(async ()=>{
                // Si autre handler n'a pas déjà créé cert, on prépare WhatsApp avec le dernier certificat local
                const certs=JSON.parse(localStorage.getItem('cssColorCertificates')||'[]');
                const last=certs[certs.length-1];
                const wa=document.getElementById('whatsappCertificat');
                if(wa && last && last.number){
                    const text='Bonjour HariMada Tech, je veux demander un certificat premium pour CSS Color Master. Nom : '+(last.name||student())+'. Numéro certificat : '+last.number+'. Score niveau Avancé : '+(last.score||sc)+'%.';
                    wa.href='https://wa.me/261322160631?text='+encodeURIComponent(text);
                    wa.textContent='Demander certificat premium sur WhatsApp';
                    wa.classList.remove('disabled-certificat');
                    wa.target='_blank';
                }
            }, 800);
        }, true);
    }
})();
