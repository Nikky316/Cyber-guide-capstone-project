/* Basic mobile nav toggle */
function toggleMobileNav(){
    const nav = document.querySelector('.nav');
    if(!nav) return;
    if(nav.style.display === 'flex') nav.style.display = '';
    else nav.style.display = 'flex';
  }
  
  /* QUIZ logic */
  function gradeQuiz(){
    const answers = {
      q1: 'B', // Ignore it
      q2: 'D', // K3m!@2024
      q3: 'B', // second lock
      q4: 'B'  // Use VPN and avoid sensitive logins
    };
    let score = 0;
    const total = Object.keys(answers).length;
    for(const q in answers){
      const els = document.getElementsByName(q);
      let chosen = null;
      for(const el of els){
        if(el.checked) { chosen = el.value; break; }
      }
      if(chosen === answers[q]) score++;
    }
  
    const percent = Math.round((score / total) * 100);
    const resultEl = document.getElementById('quizResult');
    const scoreText = document.getElementById('scoreText');
    const scoreMsg = document.getElementById('scoreMsg');
    const tipsArea = document.getElementById('tipsArea');
    if(!resultEl) return;
    resultEl.hidden = false;
    scoreText.textContent = `${score} / ${total} (${percent}%)`;
  
    let msg = '';
    if(percent === 100) msg = 'Excellent! You know how to spot common scams.';
    else if(percent >= 70) msg = 'Good job! A few tips and you’ll be very secure.';
    else msg = 'Keep learning — check the Learn page for practical tips.';
  
    scoreMsg.textContent = msg;
  
    // Tips: show helpful tips based on wrong answers
    tipsArea.innerHTML = '';
    if(percent < 100){
      const ul = document.createElement('ul');
      ul.innerHTML = `
        <li>Hover links before clicking and validate sender addresses.</li>
        <li>Use strong unique passwords and change them regularly.</li>
        <li>Enable Two-Factor Authentication on important accounts.</li>
        <li>Avoid sensitive actions on public Wi-Fi without VPN.</li>
      `;
      tipsArea.appendChild(ul);
    }
    // Scroll to result
    resultEl.scrollIntoView({behavior: 'smooth'});
  }
  
  function resetQuiz(){
    const form = document.getElementById('quizForm');
    form.reset();
    const resultEl = document.getElementById('quizResult');
    if(resultEl) resultEl.hidden = true;
  }
  
  /* REPORT FORM (demo) */
  function submitReport(){
    const type = document.getElementById('scamType').value;
    const from = document.getElementById('fromField').value.trim();
    const desc = document.getElementById('descField').value.trim();
    if(!from || !desc){
      alert('Please provide where it came from and a short description.');
      return;
    }
    // Demo: store in localStorage (for real site, send to backend or email)
    const reports = JSON.parse(localStorage.getItem('cyber_reports') || '[]');
    reports.push({type, from, desc, date: new Date().toISOString()});
    localStorage.setItem('cyber_reports', JSON.stringify(reports));
    document.getElementById('reportForm').hidden = true;
    document.getElementById('reportResponse').hidden = false;
  }
  