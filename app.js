// Leela — game logic + state.
// Phases: question → entering → playing → won | failed.

(function() {
  'use strict';

  const SQUARES = window.LEELA_SQUARES;
  const ARROWS  = window.LEELA_ARROWS;
  const SNAKES  = window.LEELA_SNAKES;
  const CHAKRAS = window.LEELA_CHAKRAS;

  const SQ_BY_N = Object.fromEntries(SQUARES.map(s => [s.n, s]));

  const STORAGE_KEY = 'leela.sessions.v1';

  // ----------------------------- State -----------------------------
  let state = {
    phase: 'question',     // question | entering | playing | won | failed
    sessionId: null,
    question: '',
    startedAt: null,
    entryRolls: [],        // array of dice values during entry phase
    position: null,        // 1..72 once entered
    rolls: [],             // [{ n, value, fromSq, landedSq, finalSq, snake, arrow, note, ts }]
    won: false,
  };

  // ----------------------------- DOM -----------------------------
  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);

  const phaseEls = {
    question: $('.phase-question'),
    entering: $('.phase-entering'),
    playing:  $('.phase-playing'),
    won:      $('.phase-won'),
    failed:   $('.phase-failed'),
  };

  const board = $('#board');

  // ----------------------------- Board render -----------------------------
  // Boustrophedon numbering: row 1 (bottom) goes 1→9 left-to-right,
  // row 2 goes 18→10 right-to-left, etc.
  function renderBoard() {
    board.innerHTML = '';
    // Grid rows from top (row 8 of board = row index 0) to bottom.
    // Row 8 (top, fields 64–72 going right→left: 72,71,70,69,68,67,66,65,64)
    // Row 7: 55,56,...,63
    // ...
    for (let displayRow = 0; displayRow < 8; displayRow++) {
      const rowFromBottom = 7 - displayRow; // 0..7, 0 = bottom row (fields 1–9)
      for (let col = 0; col < 9; col++) {
        let n;
        if (rowFromBottom % 2 === 0) {
          // left to right
          n = rowFromBottom * 9 + col + 1;
        } else {
          // right to left
          n = rowFromBottom * 9 + (9 - col);
        }
        const sq = SQ_BY_N[n];
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.n = n;
        if (ARROWS[n]) cell.classList.add('has-arrow');
        if (SNAKES[n]) cell.classList.add('has-snake');
        if (CHAKRAS.includes(n)) cell.classList.add('is-chakra');
        if (sq.goal) cell.classList.add('is-goal');

        const num = document.createElement('div');
        num.className = 'cell-num';
        num.textContent = n;
        cell.appendChild(num);

        const name = document.createElement('div');
        name.className = 'cell-name';
        name.textContent = sq.sanskrit.toLowerCase();
        cell.appendChild(name);

        cell.title = `${n}. ${sq.sanskrit} — ${sq.english}`;
        board.appendChild(cell);
      }
    }
  }

  function updateBoardHighlight() {
    $$('.cell').forEach(c => c.classList.remove('is-current'));
    if (state.position) {
      const cell = board.querySelector(`.cell[data-n="${state.position}"]`);
      if (cell) cell.classList.add('is-current');
    }
    // Mark visited cells (from finalSq of past rolls)
    const visited = new Set();
    state.rolls.forEach(r => { if (r.finalSq) visited.add(r.finalSq); });
    $$('.cell').forEach(c => {
      const n = +c.dataset.n;
      if (visited.has(n) && n !== state.position) c.classList.add('is-visited');
      else c.classList.remove('is-visited');
    });
  }

  // ----------------------------- Phase show/hide -----------------------------
  function showPhase(phase) {
    state.phase = phase;
    Object.entries(phaseEls).forEach(([k, el]) => {
      if (k === phase) el.removeAttribute('hidden');
      else el.setAttribute('hidden', '');
    });
  }

  // ----------------------------- Dice -----------------------------
  function rollDie() {
    return 1 + Math.floor(Math.random() * 6);
  }

  function animateDie(dieEl, finalValue) {
    return new Promise(resolve => {
      dieEl.classList.add('rolling');
      // Flicker through values during animation
      let ticks = 0;
      const interval = setInterval(() => {
        const v = rollDie();
        dieEl.textContent = v;
        dieEl.dataset.face = v;
        ticks++;
        if (ticks >= 5) {
          clearInterval(interval);
        }
      }, 70);
      setTimeout(() => {
        dieEl.classList.remove('rolling');
        dieEl.textContent = finalValue;
        dieEl.dataset.face = finalValue;
        resolve();
      }, 550);
    });
  }

  // ----------------------------- Phase 1 — question -----------------------------
  $('#begin-btn').addEventListener('click', () => {
    const q = $('#question-input').value.trim();
    if (!q) {
      $('#question-input').focus();
      $('#question-input').style.borderColor = 'var(--oxblood)';
      return;
    }
    state.sessionId = 'sess-' + Date.now();
    state.question = q;
    state.startedAt = new Date().toISOString();
    state.entryRolls = [];
    state.position = null;
    state.rolls = [];
    state.won = false;
    $('#question-echo-entering').textContent = '“' + q + '”';
    $('#session-meta').textContent = 'Session — ' + new Date().toLocaleString();
    renderEntryDots();
    $('#entry-count').textContent = '0 / 6';
    $('#entry-log').textContent = '';
    $('#die-entering').textContent = '?';
    $('#die-entering').dataset.face = '?';
    showPhase('entering');
  });

  // ----------------------------- Phase 2 — entry rolls -----------------------------
  function renderEntryDots() {
    const wrap = $('#entry-dots');
    wrap.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const d = document.createElement('span');
      d.className = 'entry-dot';
      if (i < state.entryRolls.length) {
        d.classList.add('used');
        if (state.entryRolls[i] === 6) d.classList.add('win');
      }
      wrap.appendChild(d);
    }
  }

  $('#roll-entry-btn').addEventListener('click', async () => {
    if (state.entryRolls.length >= 6) return;
    const btn = $('#roll-entry-btn');
    btn.disabled = true;
    const v = rollDie();
    await animateDie($('#die-entering'), v);
    state.entryRolls.push(v);
    renderEntryDots();
    $('#entry-count').textContent = state.entryRolls.length + ' / 6';
    $('#entry-log').textContent = 'You rolled ' + v + '.';
    btn.disabled = false;

    if (v === 6) {
      // Enter the board.
      setTimeout(() => enterBoard(), 700);
    } else if (state.entryRolls.length >= 6) {
      setTimeout(() => showPhase('failed'), 700);
    }
  });

  function enterBoard() {
    // The roll of 6 places the player on square 6.
    state.position = 6;
    const sq = SQ_BY_N[6];
    state.rolls.push({
      n: 1,
      value: 6,
      fromSq: null,
      landedSq: 6,
      finalSq: 6,
      arrow: null,
      snake: null,
      note: '',
      ts: new Date().toISOString(),
      entry: true,
    });
    persistSession();
    showPhase('playing');
    renderSquare(true);
    updateBoardHighlight();
  }

  // ----------------------------- Phase 3 — playing -----------------------------

  function renderSquare(isEntry) {
    const n = state.position;
    const sq = SQ_BY_N[n];
    $('#square-num').textContent = n;
    $('#square-sanskrit').textContent = sq.sanskrit;
    $('#square-english').textContent = sq.english;
    $('#square-desc').textContent = sq.desc;
    $('#rolls-count').textContent = state.rolls.length + ' roll' + (state.rolls.length === 1 ? '' : 's');
    $('#playing-label').textContent = isEntry
      ? '03 — Entered at six'
      : ('03 — On the board · ' + sq.english);

    // Show movement narration for the most recent roll
    const last = state.rolls[state.rolls.length - 1];
    const moveEl = $('#square-move');
    moveEl.className = 'square-move';
    if (last) {
      if (last.entry) {
        moveEl.textContent = 'You rolled a six and entered the board at field six — moha, delusion.';
      } else if (last.arrow) {
        moveEl.classList.add('arrow');
        moveEl.textContent = 'Rolled ' + last.value + ' → ' + last.landedSq + ' (' + SQ_BY_N[last.landedSq].english + '). An arrow lifts you to ' + last.finalSq + '.';
      } else if (last.snake) {
        moveEl.classList.add('snake');
        moveEl.textContent = 'Rolled ' + last.value + ' → ' + last.landedSq + ' (' + SQ_BY_N[last.landedSq].english + '). A serpent draws you down to ' + last.finalSq + '.';
      } else if (last.overshoot) {
        moveEl.textContent = 'Rolled ' + last.value + '. Would overshoot 68 — you remain at ' + last.finalSq + '.';
      } else {
        moveEl.textContent = 'Rolled ' + last.value + ' → moved to ' + last.finalSq + '.';
      }
    }

    // Load any existing note for the most recent roll into the note box
    $('#square-note').value = (last && last.note) || '';
  }

  // Save note as user types (debounced).
  let noteSaveTimer = null;
  $('#square-note').addEventListener('input', (e) => {
    clearTimeout(noteSaveTimer);
    noteSaveTimer = setTimeout(() => {
      const last = state.rolls[state.rolls.length - 1];
      if (last) {
        last.note = e.target.value;
        persistSession();
      }
    }, 250);
  });

  $('#roll-play-btn').addEventListener('click', async () => {
    if (state.phase !== 'playing') return;
    const btn = $('#roll-play-btn');
    btn.disabled = true;
    const v = rollDie();
    await animateDie($('#die-playing'), v);

    // Snapshot the prior roll's note before moving.
    const last = state.rolls[state.rolls.length - 1];
    if (last) last.note = $('#square-note').value;

    const from = state.position;
    let landed = from + v;
    const roll = {
      n: state.rolls.length + 1,
      value: v,
      fromSq: from,
      landedSq: null,
      finalSq: null,
      arrow: null,
      snake: null,
      note: '',
      ts: new Date().toISOString(),
      overshoot: false,
    };

    // Overshoot rules (canonical Johari):
    //   - If the player is below 68 and the roll would carry them past 68,
    //     they stay in place (exact-roll-to-68 requirement).
    //   - If the player is at 69+ (only reachable via the 17→69 arrow),
    //     normal forward movement applies up to 72; beyond 72 is impossible
    //     and the roll is forfeited.
    const overshootsFromBelow = (from < 68 && landed > 68);
    const offBoard = (landed > 72);
    if (overshootsFromBelow || offBoard) {
      roll.landedSq = from;
      roll.finalSq = from;
      roll.overshoot = true;
      state.rolls.push(roll);
      persistSession();
      renderSquare(false);
      updateBoardHighlight();
      btn.disabled = false;
      return;
    }

    roll.landedSq = landed;
    let finalPos = landed;

    if (ARROWS[landed]) {
      roll.arrow = ARROWS[landed];
      finalPos = ARROWS[landed];
    } else if (SNAKES[landed]) {
      roll.snake = SNAKES[landed];
      finalPos = SNAKES[landed];
    }

    roll.finalSq = finalPos;
    state.position = finalPos;
    state.rolls.push(roll);

    if (finalPos === 68) {
      state.won = true;
      persistSession();
      renderSquare(false);
      updateBoardHighlight();
      setTimeout(() => showPhase('won'), 900);
      btn.disabled = false;
      return;
    }

    persistSession();
    renderSquare(false);
    updateBoardHighlight();
    btn.disabled = false;
  });

  $('#end-session-btn').addEventListener('click', () => {
    // Save the latest note then return to question phase.
    const last = state.rolls[state.rolls.length - 1];
    if (last) last.note = $('#square-note').value;
    persistSession();
    resetForNewQuestion();
  });

  // ----------------------------- Phase failed -----------------------------
  $('#restart-btn').addEventListener('click', () => {
    resetForNewQuestion();
  });

  // ----------------------------- Phase won -----------------------------
  $('#new-game-btn').addEventListener('click', () => {
    resetForNewQuestion();
  });
  $('#view-summary-btn').addEventListener('click', () => openSummary(state));

  function resetForNewQuestion() {
    state = {
      phase: 'question',
      sessionId: null,
      question: '',
      startedAt: null,
      entryRolls: [],
      position: null,
      rolls: [],
      won: false,
    };
    $('#question-input').value = '';
    $('#question-input').style.borderColor = '';
    $('#session-meta').textContent = 'Session — new';
    showPhase('question');
    updateBoardHighlight();
  }

  // ----------------------------- Persistence -----------------------------
  function persistSession() {
    if (!state.sessionId) return;
    let all;
    try {
      all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      all = [];
    }
    // Remove any prior version of this session
    all = all.filter(s => s.sessionId !== state.sessionId);
    all.push({
      sessionId: state.sessionId,
      question: state.question,
      startedAt: state.startedAt,
      entryRolls: state.entryRolls,
      rolls: state.rolls,
      position: state.position,
      won: state.won,
      updatedAt: new Date().toISOString(),
    });
    // Keep newest 50.
    all.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
    all = all.slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  function loadSessions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  // ----------------------------- History drawer -----------------------------
  $('#open-history').addEventListener('click', () => {
    const drawer = $('#history-drawer');
    const list = $('#history-list');
    const sessions = loadSessions();
    list.innerHTML = '';
    if (sessions.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'history-empty';
      empty.textContent = 'No sessions yet.';
      list.appendChild(empty);
    } else {
      sessions.forEach(s => {
        const item = document.createElement('div');
        item.className = 'history-entry';
        const q = document.createElement('div');
        q.className = 'history-q';
        q.textContent = '“' + s.question + '”';
        const meta = document.createElement('div');
        meta.className = 'history-meta';
        const date = s.updatedAt ? new Date(s.updatedAt).toLocaleString() : '';
        const rolls = (s.rolls || []).length;
        const status = s.won ? 'Reached 68' : (s.position ? 'Ended at ' + s.position : 'No entry');
        meta.textContent = date + '  ·  ' + rolls + ' rolls  ·  ' + status;
        item.appendChild(q);
        item.appendChild(meta);
        item.addEventListener('click', () => openSummary(s));
        list.appendChild(item);
      });
    }
    drawer.removeAttribute('hidden');
  });
  $('#close-history').addEventListener('click', () => {
    $('#history-drawer').setAttribute('hidden', '');
  });

  // ----------------------------- Summary drawer -----------------------------
  function openSummary(session) {
    $('#history-drawer').setAttribute('hidden', '');
    const drawer = $('#summary-drawer');
    const body = $('#summary-body');
    body.innerHTML = '';

    const q = document.createElement('div');
    q.className = 'summary-q';
    q.textContent = '“' + session.question + '”';
    body.appendChild(q);

    const meta = document.createElement('div');
    meta.className = 'summary-meta';
    const date = session.updatedAt ? new Date(session.updatedAt).toLocaleString()
      : new Date().toLocaleString();
    const status = session.won ? 'Reached field 68 (Vaikuṇṭha-loka)'
      : (session.position ? 'Ended at field ' + session.position : 'Did not enter the board');
    meta.textContent = date + '  ·  ' + (session.rolls || []).length + ' rolls  ·  ' + status;
    body.appendChild(meta);

    (session.rolls || []).forEach((r, i) => {
      const block = document.createElement('div');
      block.className = 'summary-roll';
      const head = document.createElement('div');
      head.className = 'summary-roll-head';
      const ln = document.createElement('span');
      ln.className = 'summary-roll-n';
      ln.textContent = (i === 0 && r.entry) ? 'Entry' : ('Roll ' + (i + 1));
      const sq = document.createElement('span');
      sq.className = 'summary-roll-sq';
      const finalSq = SQ_BY_N[r.finalSq];
      sq.textContent = r.finalSq + '. ' + finalSq.sanskrit + ' — ' + finalSq.english;
      head.appendChild(ln);
      head.appendChild(sq);
      block.appendChild(head);

      const meta2 = document.createElement('div');
      meta2.className = 'summary-roll-meta';
      let movement = '';
      if (r.entry) {
        movement = 'Entered by rolling a six.';
      } else if (r.overshoot) {
        movement = 'Rolled ' + r.value + ' — overshoots 68, remains at ' + r.finalSq + '.';
      } else if (r.arrow) {
        movement = 'Rolled ' + r.value + ', landed on ' + r.landedSq + ' (' + SQ_BY_N[r.landedSq].english + '), arrow → ' + r.finalSq + '.';
      } else if (r.snake) {
        movement = 'Rolled ' + r.value + ', landed on ' + r.landedSq + ' (' + SQ_BY_N[r.landedSq].english + '), serpent → ' + r.finalSq + '.';
      } else {
        movement = 'Rolled ' + r.value + ' from ' + (r.fromSq || '—') + ' to ' + r.finalSq + '.';
      }
      meta2.textContent = movement;
      block.appendChild(meta2);

      if (r.note && r.note.trim()) {
        const note = document.createElement('p');
        note.className = 'summary-roll-note';
        note.textContent = r.note;
        block.appendChild(note);
      }
      body.appendChild(block);
    });

    // Stash for copy
    drawer._session = session;
    drawer.removeAttribute('hidden');
  }

  $('#close-summary').addEventListener('click', () => {
    $('#summary-drawer').setAttribute('hidden', '');
  });

  $('#copy-summary').addEventListener('click', async () => {
    const session = $('#summary-drawer')._session;
    if (!session) return;
    const lines = [];
    lines.push('LEELA — Session reading');
    lines.push('Question: ' + session.question);
    lines.push('Date: ' + (session.updatedAt ? new Date(session.updatedAt).toLocaleString() : ''));
    lines.push('');
    (session.rolls || []).forEach((r, i) => {
      const fsq = SQ_BY_N[r.finalSq];
      lines.push((i === 0 && r.entry) ? '— Entry —' : ('— Roll ' + (i + 1) + ' —'));
      lines.push('Field ' + r.finalSq + ': ' + fsq.sanskrit + ' (' + fsq.english + ')');
      if (r.entry) lines.push('Entered the board with a six.');
      else if (r.overshoot) lines.push('Rolled ' + r.value + ' (overshoot — remained in place).');
      else if (r.arrow) lines.push('Rolled ' + r.value + ' → ' + r.landedSq + ', arrow to ' + r.finalSq + '.');
      else if (r.snake) lines.push('Rolled ' + r.value + ' → ' + r.landedSq + ', serpent to ' + r.finalSq + '.');
      else lines.push('Rolled ' + r.value + '.');
      if (r.note) lines.push('Note: ' + r.note);
      lines.push('');
    });
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      $('#copy-summary').textContent = 'Copied ✓';
      setTimeout(() => { $('#copy-summary').textContent = 'Copy as text'; }, 1600);
    } catch (e) {
      alert('Could not copy. Select and copy manually.');
    }
  });

  // ----------------------------- Init -----------------------------
  renderBoard();
  showPhase('question');
})();
