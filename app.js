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

  // ----------------------------- Color helpers -----------------------------
  function hexToRgba(hex, alpha) {
    const h = hex.replace('#','');
    const r = parseInt(h.slice(0,2), 16);
    const g = parseInt(h.slice(2,4), 16);
    const b = parseInt(h.slice(4,6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // ----------------------------- SVG icon library -----------------------------
  // Distinct symbols for the four directional roles + clean chakra line art.

  // Computed once: which fields are arrow tips / snake tails,
  // and which pair-color a tip / tail belongs to.
  const ARROW_TIP_COLOR  = {};   // field -> color
  const SNAKE_TAIL_COLOR = {};   // field -> color (first match wins if multiple)
  for (const [from, info] of Object.entries(ARROWS)) {
    ARROW_TIP_COLOR[info.to] = info.color;
  }
  for (const [from, info] of Object.entries(SNAKES)) {
    if (!SNAKE_TAIL_COLOR[info.to]) SNAKE_TAIL_COLOR[info.to] = info.color;
  }
  const ARROW_TIPS  = new Set(Object.keys(ARROW_TIP_COLOR).map(Number));
  const SNAKE_TAILS = new Set(Object.keys(SNAKE_TAIL_COLOR).map(Number));

  // Arrow base — feathered fletching pointing upward (the launch).
  function iconArrowBase() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="role-icon"><path d="M12 20 V6"/><path d="M9 9 L12 6 L15 9"/><path d="M8 17 L12 14 L16 17"/><path d="M8 20 L12 17 L16 20"/></svg>`;
  }
  // Arrow tip — a target / radiating destination.
  function iconArrowTip() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="role-icon"><circle cx="12" cy="12" r="3.5"/><circle cx="12" cy="12" r="7"/><path d="M12 3 V5  M12 19 V21  M3 12 H5  M19 12 H21"/></svg>`;
  }
  // Snake head — serpent profile with eye.
  function iconSnakeHead() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="role-icon"><path d="M5 18 C5 14 9 14 9 10 C9 7 12 6 14 8 C16 10 17 8 19 8"/><circle cx="14.5" cy="8.5" r="0.9" fill="currentColor" stroke="none"/><path d="M19 8 L21 7 M19 8 L21 9"/></svg>`;
  }
  // Snake tail — coiled spiral curl.
  function iconSnakeTail() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="role-icon"><path d="M4 6 C8 6 8 10 5 10 C2 10 2 14 6 14 C10 14 10 18 7 18"/><path d="M14 18 C18 18 20 14 18 12 C16 10 13 11 13 14 C13 16 15 16 16 14"/></svg>`;
  }

  // Chakra — generic petal flower with a configurable center symbol.
  function iconChakra(petals, center) {
    const R_outer = 10, R_center = 4.4;
    const petalArr = [];
    for (let i = 0; i < petals; i++) {
      const angle = (i / petals) * 360;
      // Each petal: small ellipse positioned outward from center.
      petalArr.push(
        `<ellipse cx="12" cy="${12 - (R_outer - 0.4)}" rx="${Math.max(0.7, 2.4 - petals/16)}" ry="${Math.max(1, 3.4 - petals/14)}" transform="rotate(${angle} 12 12)"/>`
      );
    }
    let centerSvg = '';
    switch (center) {
      case 'square':
        centerSvg = `<rect x="${12-R_center/1.4}" y="${12-R_center/1.4}" width="${R_center*1.4}" height="${R_center*1.4}"/><path d="M${12-R_center/1.4} ${12+R_center/1.4} L12 ${12-R_center/1.6} L${12+R_center/1.4} ${12+R_center/1.4} Z"/>`;
        break;
      case 'crescent':
        centerSvg = `<circle cx="12" cy="12" r="${R_center}"/><path d="M10 ${12-R_center/1.4} A ${R_center} ${R_center} 0 1 0 10 ${12+R_center/1.4}" fill="currentColor" opacity="0.55"/>`;
        break;
      case 'triangle':
        centerSvg = `<circle cx="12" cy="12" r="${R_center}"/><path d="M${12-R_center/1.3} ${12-R_center/2} L${12+R_center/1.3} ${12-R_center/2} L12 ${12+R_center/1.1} Z"/>`;
        break;
      case 'hexagram':
        centerSvg = `<circle cx="12" cy="12" r="${R_center}"/><path d="M${12-R_center/1.3} ${12-R_center/2.5} L${12+R_center/1.3} ${12-R_center/2.5} L12 ${12+R_center/1.0} Z"/><path d="M${12-R_center/1.3} ${12+R_center/2.5} L${12+R_center/1.3} ${12+R_center/2.5} L12 ${12-R_center/1.0} Z"/>`;
        break;
      case 'circle':
        centerSvg = `<circle cx="12" cy="12" r="${R_center}"/><circle cx="12" cy="12" r="${R_center*0.45}"/>`;
        break;
      case 'om':
        centerSvg = `<circle cx="12" cy="12" r="${R_center}"/><text x="12" y="14" text-anchor="middle" font-size="6" font-family="serif" fill="currentColor" stroke="none">ॐ</text>`;
        break;
      case 'bindu':
        centerSvg = `<circle cx="12" cy="12" r="${R_center}"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>`;
        break;
      case 'radiant':
        centerSvg = `<circle cx="12" cy="12" r="${R_center}"/><circle cx="12" cy="12" r="${R_center*0.6}"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>`;
        break;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" class="chakra-svg">${petalArr.join('')}${centerSvg}</svg>`;
  }

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

        // Role classes — note that a field can hold multiple roles (e.g. 35
        // is both a snake head and a snake tail).
        const isArrowBase = !!ARROWS[n];
        const isArrowTip  = ARROW_TIPS.has(n);
        const isSnakeHead = !!SNAKES[n];
        const isSnakeTail = SNAKE_TAILS.has(n);
        const chakra      = CHAKRAS[n];

        if (isArrowBase) cell.classList.add('has-arrow-base');
        if (isArrowTip)  cell.classList.add('has-arrow-tip');
        if (isSnakeHead) cell.classList.add('has-snake-head');
        if (isSnakeTail) cell.classList.add('has-snake-tail');
        if (chakra)      cell.classList.add('is-chakra');
        if (sq.goal)     cell.classList.add('is-goal');

        const num = document.createElement('div');
        num.className = 'cell-num';
        num.textContent = n;
        cell.appendChild(num);

        const name = document.createElement('div');
        name.className = 'cell-name';
        // Use a U+2011 non-breaking hyphen so the browser can never wrap
        // at a hyphen — regardless of any CSS quirk in white-space handling.
        name.textContent = sq.sanskrit.toLowerCase().replace(/-/g, '‑');
        cell.appendChild(name);

        // Pick the pair colour for this cell (priority: arrow base > arrow tip
        // > snake head > snake tail). We then tint the entire cell — both
        // endpoints of a given snake/arrow end up looking like the same lane.
        let pairColor = null;
        if (isArrowBase)      pairColor = ARROWS[n].color;
        else if (isArrowTip)  pairColor = ARROW_TIP_COLOR[n];
        else if (isSnakeHead) pairColor = SNAKES[n].color;
        else if (isSnakeTail) pairColor = SNAKE_TAIL_COLOR[n];

        if (pairColor) {
          cell.style.backgroundColor = hexToRgba(pairColor, 0.18);
          cell.style.borderColor = pairColor;
          cell.style.borderWidth = '2px';
        }

        // Role icons. Active end (base / head) sits top-right;
        // passive end (tip / tail) sits bottom-right and is rotated 180°.
        // A cell can show both (e.g. field 35 is both a snake head and
        // the tail of another snake).
        function addRoleIcon(position, svg, color, rotated, title) {
          const r = document.createElement('div');
          r.className = 'role-mark role-mark--' + position + (rotated ? ' role-mark--flipped' : '');
          r.innerHTML = svg;
          r.style.color = color;
          r.title = title;
          cell.appendChild(r);
        }
        if (isArrowBase) {
          addRoleIcon('top', iconArrowBase(), ARROWS[n].color, false,
            `Arrow base — climbs to ${ARROWS[n].to}`);
        } else if (isSnakeHead) {
          addRoleIcon('top', iconSnakeHead(), SNAKES[n].color, false,
            `Snake head — slides down to ${SNAKES[n].to}`);
        }
        if (isArrowTip) {
          addRoleIcon('bottom', iconArrowBase(), ARROW_TIP_COLOR[n], true,
            `Arrow tip — destination`);
        } else if (isSnakeTail) {
          addRoleIcon('bottom', iconSnakeHead(), SNAKE_TAIL_COLOR[n], true,
            `Snake tail — landing point`);
        }

        // Tooltip including chakra name if present
        const chakraLabel = chakra ? ` · ${chakra.name}` : '';
        cell.title = `${n}. ${sq.sanskrit} — ${sq.english}${chakraLabel}`;
        // Hover handlers for the floating tooltip.
        cell.addEventListener('mouseenter', e => showCellTooltip(n, e.currentTarget));
        cell.addEventListener('mouseleave', hideCellTooltip);

        board.appendChild(cell);
        // Observe this cell so its name refits whenever its size changes.
        cellResizeObserver.observe(cell);
      }
    }
    // Fallback: explicitly fit every cell name after the layout settles,
    // in case the ResizeObserver doesn't fire on the initial render.
    requestAnimationFrame(() => {
      $$('.cell').forEach(c => {
        const name = c.querySelector('.cell-name');
        if (name) fitCellName(name, c);
      });
    });
  }

  // Per-cell ResizeObserver: any time the cell's box changes, shrink
  // the inner name's font-size until it fits on one line.
  const cellResizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const name = entry.target.querySelector('.cell-name');
      if (name) fitCellName(name, entry.target);
    }
  });

  function fitCellName(nameEl, cellEl) {
    const MAX = 13, MIN = 6;
    const cellW = cellEl.clientWidth;
    if (cellW === 0) return; // not yet laid out
    // The corner icons (top-right + bottom-right) eat space on the right.
    // The number is in the top-left; vertically-centred name shouldn't
    // collide with it, so left reservation can be minimal.
    const reservedLeft = 6;
    const reservedRight = 26;
    const maxW = Math.max(24, cellW - reservedLeft - reservedRight);
    nameEl.style.maxWidth = maxW + 'px';
    nameEl.style.fontSize = MAX + 'px';
    let size = MAX;
    while (nameEl.scrollWidth > maxW && size > MIN) {
      size -= 0.5;
      nameEl.style.fontSize = size + 'px';
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
  const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  function dieFace(v) { return DICE_FACES[v - 1]; }

  function rollDie() {
    return 1 + Math.floor(Math.random() * 6);
  }

  function animateDie(dieEl, finalValue) {
    return new Promise(resolve => {
      dieEl.classList.add('rolling');
      let ticks = 0;
      const interval = setInterval(() => {
        const v = rollDie();
        dieEl.textContent = dieFace(v);
        dieEl.dataset.face = v;
        ticks++;
        if (ticks >= 9) clearInterval(interval);
      }, 90);
      setTimeout(() => {
        dieEl.classList.remove('rolling');
        dieEl.textContent = dieFace(finalValue);
        dieEl.dataset.face = finalValue;
        resolve();
      }, 950);
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
    $('#die-entering').textContent = dieFace(3);
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

    // Reset the description to collapsed each time the square changes.
    const descEl = $('#square-desc');
    const toggle = $('#square-desc-toggle');
    descEl.classList.remove('expanded');
    toggle.textContent = 'Read more';
    // Hide the toggle if the description fits in the clamp already.
    // We detect overflow by comparing scroll height to client height.
    requestAnimationFrame(() => {
      const overflows = descEl.scrollHeight > descEl.clientHeight + 2;
      toggle.style.display = overflows ? '' : 'none';
    });

    // Re-render the in-play journey list every time the square changes.
    renderJourney();
  }

  // Description fold/unfold
  $('#square-desc-toggle').addEventListener('click', () => {
    const descEl = $('#square-desc');
    const toggle = $('#square-desc-toggle');
    descEl.classList.toggle('expanded');
    toggle.textContent = descEl.classList.contains('expanded') ? 'Show less' : 'Read more';
  });

  // ----------------------------- In-play journey list -----------------------------
  function renderJourney() {
    const list = $('#journey-list');
    if (!list) return;
    list.innerHTML = '';
    if (!state.rolls || state.rolls.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'journey-empty';
      empty.textContent = 'No rolls yet.';
      list.appendChild(empty);
      return;
    }
    state.rolls.forEach((r, i) => {
      const fsq = SQ_BY_N[r.finalSq];
      const li = document.createElement('li');
      li.className = 'journey-item';
      const head = document.createElement('div');
      head.className = 'journey-item-head';
      const rollNum = document.createElement('span');
      rollNum.className = 'journey-item-roll';
      rollNum.textContent = (i === 0 && r.entry) ? 'Entry' : ('R' + (i + 1));
      const sq = document.createElement('span');
      sq.className = 'journey-item-sq';
      sq.textContent = r.finalSq + '. ' + fsq.sanskrit;
      head.appendChild(rollNum);
      head.appendChild(sq);
      li.appendChild(head);
      const eng = document.createElement('div');
      eng.className = 'journey-item-eng';
      let movement = fsq.english;
      if (r.arrow) movement += ' · arrow from ' + r.landedSq;
      else if (r.snake) movement += ' · snake from ' + r.landedSq;
      else if (r.overshoot) movement += ' · overshoot';
      eng.textContent = movement;
      li.appendChild(eng);
      if (r.note && r.note.trim()) {
        const note = document.createElement('p');
        note.className = 'journey-item-note';
        note.textContent = '“' + r.note.trim() + '”';
        li.appendChild(note);
      }
      list.appendChild(li);
    });
    // Scroll to the bottom so the latest roll is visible.
    list.scrollTop = list.scrollHeight;
  }

  // Save note as user types (debounced). Also refresh the in-play
  // journey list so the user sees their note appear immediately.
  let noteSaveTimer = null;
  $('#square-note').addEventListener('input', (e) => {
    clearTimeout(noteSaveTimer);
    noteSaveTimer = setTimeout(() => {
      const last = state.rolls[state.rolls.length - 1];
      if (last) {
        last.note = e.target.value;
        persistSession();
        renderJourney();
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
      roll.arrow = ARROWS[landed].to;
      finalPos = ARROWS[landed].to;
    } else if (SNAKES[landed]) {
      roll.snake = SNAKES[landed].to;
      finalPos = SNAKES[landed].to;
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
    const list = $('#journey-list');
    if (list) list.innerHTML = '';
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

  // ----------------------------- Cell hover tooltip -----------------------------
  const tooltip = $('#cell-tooltip');
  function showCellTooltip(n, cellEl) {
    const sq = SQ_BY_N[n];
    if (!sq || !tooltip) return;
    $('#ct-num').textContent = n;
    $('#ct-name').textContent = sq.sanskrit;
    $('#ct-eng').textContent = sq.english;
    // Brief: first sentence of the description (up to first period+space).
    const firstSentence = (sq.desc.split(/\.\s+/)[0] || sq.desc).trim() + '.';
    $('#ct-desc').textContent = firstSentence;
    // Meta line: arrow / snake / chakra annotations.
    const metaParts = [];
    if (ARROWS[n])         metaParts.push('Arrow → field ' + ARROWS[n].to);
    if (ARROW_TIP_COLOR[n]) metaParts.push('Arrow tip from below');
    if (SNAKES[n])         metaParts.push('Snake → field ' + SNAKES[n].to);
    if (SNAKE_TAIL_COLOR[n]) metaParts.push('Snake tail');
    if (CHAKRAS[n])        metaParts.push(CHAKRAS[n].name + ' chakra');
    if (sq.goal)           metaParts.push('Goal — cosmic consciousness');
    $('#ct-meta').textContent = metaParts.join(' · ');

    // Position: prefer right side of cell, flip to left if no room.
    tooltip.hidden = false;
    const rect = cellEl.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();
    const margin = 10;
    let left = rect.right + margin;
    if (left + tipRect.width > window.innerWidth - 12) {
      left = rect.left - tipRect.width - margin;
    }
    if (left < 12) left = 12;
    let top = rect.top + (rect.height / 2) - (tipRect.height / 2);
    if (top < 12) top = 12;
    if (top + tipRect.height > window.innerHeight - 12) {
      top = window.innerHeight - tipRect.height - 12;
    }
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }
  function hideCellTooltip() {
    if (tooltip) tooltip.hidden = true;
  }

  // ----------------------------- Legend -----------------------------
  function renderLegend() {
    const legend = $('#board-legend');
    if (!legend) return;
    const items = [
      { svg: iconArrowBase(), label: 'Arrow base', cls: 'lg-arrow', flipped: false },
      { svg: iconArrowBase(), label: 'Arrow tip',  cls: 'lg-arrow', flipped: true  },
      { svg: iconSnakeHead(), label: 'Snake head', cls: 'lg-snake', flipped: false },
      { svg: iconSnakeHead(), label: 'Snake tail', cls: 'lg-snake', flipped: true  },
    ];
    const note = `<span class="legend-note">Each pair shares a colour — match the base to its tip, the head to its tail.</span>`;
    legend.innerHTML = items.map(it =>
      `<span class="legend-item"><span class="legend-icon ${it.cls}${it.flipped ? ' lg-flipped' : ''}">${it.svg}</span>${it.label}</span>`
    ).join('') + note;
  }

  // ----------------------------- Init -----------------------------
  renderBoard();
  renderLegend();
  showPhase('question');
})();
