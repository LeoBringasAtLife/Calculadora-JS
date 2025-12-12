(() => {
  const displayEl = document.getElementById('display');
  const historyEl = document.getElementById('history');
  let expr = '';
  let justEvaluated = false;

  function updateDisplay() {
    if (expr === '') {
      displayEl.textContent = '0';
      historyEl.textContent = '';
    } else {
      // show full expression in history and last number/result in main display
      historyEl.textContent = expr;
      displayEl.textContent = expr;
    }
  }

  function isOperator(ch) {
    return ['+', '-', '*', '/'].includes(ch);
  }

  function appendNumber(n) {
    if (justEvaluated) {
      expr = '';
      justEvaluated = false;
    }
    // prevent multiple leading zeros
    if (expr === '0' && n === '0') return;
    // if last token is a number, just append; else append
    expr += n;
    updateDisplay();
  }

  function appendOperator(op) {
    if (!expr && op === '-') {
      // allow negative start
      expr = '-';
      updateDisplay();
      return;
    }
    if (!expr) return;
    const last = expr.slice(-1);
    if (isOperator(last)) {
      // replace last operator
      expr = expr.slice(0, -1) + op;
    } else {
      expr += op;
    }
    justEvaluated = false;
    updateDisplay();
  }

  function clearAll() {
    expr = '';
    justEvaluated = false;
    updateDisplay();
  }

  function backspace() {
    if (!expr) return;
    expr = expr.slice(0, -1);
    updateDisplay();
  }

  function safeEvaluate(s) {
    // only allow digits, operators, parentheses and dots and spaces
    if (!/^[0-9+\-*/(). ]+$/.test(s)) throw new Error('Invalid characters');
    // avoid sequences like '++' in evaluation by replacing accidental repeats
    s = s.replace(/\s+/g, '');
    // eslint-disable-next-line no-new-func
    return Function('return ' + s)();
  }

  function evaluateExpr() {
    if (!expr) return;
    // don't evaluate if ends with operator
    const last = expr.slice(-1);
    if (isOperator(last)) expr = expr.slice(0, -1);
    try {
      const result = safeEvaluate(expr);
      expr = String(result);
      justEvaluated = true;
      updateDisplay();
    } catch (e) {
      displayEl.textContent = 'Error';
      expr = '';
      justEvaluated = false;
    }
  }

  // wire buttons
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-value');
      const action = btn.getAttribute('data-action');
      if (val !== null) {
        if (val === '.') {
          // prevent multiple decimals in current number
          // find last number token
          const parts = expr.split(/[^0-9.]+/);
          const lastNum = parts[parts.length - 1] || '';
          if (lastNum.includes('.')) return;
        }
        appendNumber(val);
      } else if (action) {
        if (action === 'back') backspace();
        else if (action === 'clear') clearAll();
        else if (action === '=') evaluateExpr();
        else if (['+', '-', '*', '/'].includes(action)) appendOperator(action);
      }
    });
  });

  // keyboard support (basic)
  window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      e.preventDefault();
      document.querySelector(`.btn[data-value="${e.key}"]`)?.click();
      return;
    }
    if (['+', '-', '*', '/'].includes(e.key)) {
      e.preventDefault();
      document.querySelector(`.btn[data-action="${e.key}"]`)?.click();
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      document.querySelector('.btn[data-action="back"]').click();
      return;
    }
    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      document.querySelector('.btn[data-action="="]').click();
      return;
    }
    if (e.key.toLowerCase() === 'c') {
      e.preventDefault();
      document.querySelector('.btn[data-action="clear"]').click();
      return;
    }
  });

  // initial display
  updateDisplay();
})();
