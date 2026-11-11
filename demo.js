// Working copies of the مكيال app for the site's phones: the app's layout
// and colors, made-up shop data, nothing is saved. Each [data-demo] element
// becomes its own app, drawn at the app's 360 px width and scaled by CSS.
// go('sell' | 'debts' | 'cust:ra' | 'product:water' | 'reports' ...) opens a
// screen; onChange(fn) reports the current screen (used by the tour list).
(() => {
  const ic = (id) => `<svg class="ai" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const money = (a) => `<span dir="ltr">₪ ${(Math.abs(a) / 100).toFixed(2)}</span>`;
  const qtyText = (q) => (Number.isInteger(q) ? String(q) : q.toFixed(2).replace(/0$/, ''));
  const norm = (s) => s.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase();
  const avatar = (name, a) => `<span class="av av${a}">${name[0]}</span>`;
  const later = 'هاد بتجرّبه بالتطبيق نفسه';
  const tabs = [
    ['sell', 'بيع', 'pos'],
    ['products', 'المنتجات', 'box'],
    ['debts', 'الديون', 'book'],
    ['reports', 'التقارير', 'chart'],
    ['more', 'المزيد', 'dots'],
  ];
  const week = [16800, 19200, 18100, 20500, 18600, 20400]; // the 6 days before today
  const scanOrder = ['milk', 'water', 'oil', 'bread', 'rice', 'tea'];

  const freshData = () => ({
    products: [
      { id: 'tea', n: 'شاي', p: 1500, c: 1100, s: 24, a: 0, bc: '6251006000061' },
      { id: 'lab', n: 'لبنة', p: 1200, c: 900, s: 18, a: 1, bc: '6251003000030' },
      { id: 'milk', n: 'حليب 1 لتر', p: 700, c: 520, s: 13, a: 2, bc: '6251002000023' },
      { id: 'bread', n: 'خبز عربي', p: 500, c: 350, s: 11, a: 3, bc: '6251001000017' },
      { id: 'cheese', n: 'جبنة نابلسية', p: 4000, c: 3000, s: 4.25, a: 4, kg: true },
      { id: 'rice', n: 'رز 5 كيلو', p: 3500, c: 2800, s: 9, a: 5, bc: '6251004000047' },
      { id: 'oil', n: 'زيت ذرة', p: 2200, c: 1750, s: 12, a: 6, bc: '6251005000054' },
      { id: 'sugar', n: 'سكر 2 كيلو', p: 1200, c: 900, s: 20, a: 0, bc: '6251008000016' },
      { id: 'pasta', n: 'معكرونة 500 غرام', p: 600, c: 420, s: 30, a: 1, bc: '6251009000013' },
      { id: 'tuna', n: 'تونة', p: 800, c: 600, s: 3, a: 2, bc: '6251010000019' },
      { id: 'biscuit', n: 'بسكويت', p: 300, c: 200, s: 40, a: 3, bc: '6251011000016' },
      { id: 'soap', n: 'صابون', p: 500, c: 350, s: 16, a: 6, bc: '6251012000013' },
      { id: 'eggs', n: 'كرتونة بيض', p: 1800, c: 1500, s: 5, a: 5, bc: '6251013000010' },
      { id: 'water', n: 'مياه 1.5 لتر', p: 300, c: 180, s: 84, a: 7, bc: '6251007000078', carton: { size: 6, price: 1600, bc: '6251007000085' } },
    ],
    customers: [
      { id: 'kh', n: 'خالد العمري', ph: '0597654321', d: 29000, last: 41, a: 1,
        log: [['تسديد', -3000, 'كاش', 'قبل 41 يوم'], ['دين سابق', 32000, 'من الدفتر', 'قبل شهرين']] },
      { id: 'ah', n: 'أبو أحمد الخطيب', ph: '0599123456', d: 15500, last: 3, a: 5,
        log: [['فاتورة', 2000, 'جبنة نابلسية 0.75 كيلو، خبز عربي × 2 (دفع 20)', 'اليوم'], ['تسديد', -5000, 'كاش', 'قبل 3 أيام'], ['دين سابق', 18500, 'من الدفتر', 'قبل شهر']] },
      { id: 'ab', n: 'أبو العبد', ph: '0595551234', d: 12000, last: 6, a: 6,
        log: [['فاتورة', 4500, 'رز 5 كيلو، زيت ذرة', 'قبل 6 أيام'], ['تسديد', -2500, 'كاش', 'قبل 6 أيام'], ['دين سابق', 10000, 'من الدفتر', 'قبل شهر']] },
      { id: 'ms', n: 'محمد الشاعر', ph: '0598887766', d: 8800, last: 35, a: 7,
        log: [['فاتورة', 1800, 'كرتونة بيض', 'قبل 35 يوم'], ['دين سابق', 7000, 'من الدفتر', 'قبل شهرين']] },
      { id: 'om', n: 'أم سامر', ph: '0568765432', d: 5250, last: 12, a: 2,
        log: [['تسديد', -2000, 'كاش', 'قبل 12 يوم'], ['دين سابق', 7250, 'من الدفتر', 'قبل شهر']] },
      { id: 'sl', n: 'سلوى', ph: '0567771122', d: 3400, last: 2, a: 4,
        log: [['فاتورة', 3400, 'حليب 1 لتر × 2، لبنة، سكر 2 كيلو', 'قبل يومين']] },
      // Prepaid: a negative balance is money he left with the shop.
      { id: 'ra', n: 'رامي ناصر', ph: '0592223344', d: -18100, last: 0, a: 3,
        log: [['فاتورة', 1900, 'حليب 1 لتر × 2، خبز عربي (من رصيده)', 'اليوم'], ['إيداع', -20000, 'كاش', 'اليوم']] },
    ],
  });

  const mount = (root) => {
    root.innerHTML = `<div class="app-bar"></div><div class="app-body"></div>
      <p class="app-toast" role="status" hidden></p><div class="app-sheet" hidden></div>
      <nav class="app-nav" aria-label="أقسام التطبيق التجريبي">${tabs.map(([id, label, icon]) =>
        `<button class="nav-btn" data-tab="${id}"><span class="pill">${ic(icon)}</span>${label}</button>`).join('')}</nav>`;
    const bar = root.querySelector('.app-bar');
    const body = root.querySelector('.app-body');
    const sheet = root.querySelector('.app-sheet');
    const toastEl = root.querySelector('.app-toast');
    const { products, customers } = freshData();
    const byId = Object.fromEntries(products.map((p) => [p.id, p]));
    const cust = (id) => customers.find((c) => c.id === id);
    const st = {
      tab: 'sell',
      sub: null, // { kind: 'credit' | 'product', id }
      cart: [['tea', 1], ['lab', 1], ['milk', 1], ['bread', 2]],
      sold: null,
      q: '',
      pq: '',
      period: 'today',
      today: { sales: 21800, profit: 5300, count: 4, debt: 3900 },
      scan: 0,
    };
    const listeners = [];
    const cartTotal = () => st.cart.reduce((t, [id, q]) => t + Math.round(byId[id].p * q), 0);
    const unit = (p) => (p.kg ? 'كيلو' : 'قطعة');

    let toastTimer;
    const toast = (text) => {
      toastEl.textContent = text;
      toastEl.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2800);
    };
    const add = (id, q) => {
      const p = byId[id];
      st.sold = null;
      const line = st.cart.find((l) => l[0] === id);
      const step = q ?? (p.kg ? 0.25 : 1);
      if (line) line[1] += step;
      else st.cart.unshift([id, step]);
    };

    // ---------- screens ----------
    const favGrid = () => `<div class="fav-grid">${products.slice(0, 6).map((p) => `
      <button class="fav" data-act="add" data-id="${p.id}">${avatar(p.n, p.a)}<b>${p.n}</b>${money(p.p)}</button>`).join('')}</div>`;

    const sell = () => {
      const results = st.q ? products.filter((p) => norm(p.n).includes(norm(st.q))) : null;
      let list;
      if (results) {
        list = results.length
          ? results.map((p) => `<button class="row row-btn" data-act="pick" data-id="${p.id}">${avatar(p.n, p.a)}<span class="grow"><b>${p.n}</b><small>${money(p.p)} / ${unit(p)}</small></span>${ic('plus')}</button>`).join('')
          : '<p class="empty">ما لقينا منتج بهالاسم. جرّب كلمة ثانية</p>';
      } else if (st.sold) {
        list = `<div class="sold"><span class="sold-check">${ic('check')}</span>
            <b class="sold-total">تم البيع: ${money(st.sold.total)}</b>
            ${st.sold.change ? `<span>الباقي للزبون</span><b class="sold-change">${money(st.sold.change)}</b>` : ''}
            <button class="a-btn a-outline" data-act="later">${ic('share')}فاتورة / PDF واتساب</button></div>
          <p class="hint-line">امسح باركود المنتج أو اختر صنفاً:</p>${favGrid()}`;
      } else if (!st.cart.length) {
        list = `<p class="hint-line">امسح باركود المنتج أو اختر صنفاً:</p>${favGrid()}`;
      } else {
        list = st.cart.map(([id, q]) => {
          const p = byId[id];
          return `<div class="row line">${avatar(p.n, p.a)}
            <span class="grow"><b>${p.n}</b><small>${money(p.p)} / ${unit(p)}</small></span>
            <span class="qty"><button data-act="dec" data-id="${id}" aria-label="أقل من ${p.n}">${ic('minus')}</button><b>${qtyText(q)}</b><button data-act="inc" data-id="${id}" aria-label="أكثر من ${p.n}">${ic('plus')}</button></span>
            <b class="line-total">${money(Math.round(p.p * q))}</b></div>`;
        }).join('');
      }
      const pieces = st.cart.reduce((t, [id, q]) => t + (byId[id].kg ? 1 : q), 0);
      const foot = st.cart.length && !results
        ? `<div class="pay-bar"><small>${st.cart.length} أصناف · ${qtyText(pieces)} قطع</small>
            <div class="pay-row"><button class="a-btn a-outline" data-act="later">خصم</button>
            <button class="a-btn a-main" data-act="pay">${ic('pay')}دفع ${money(cartTotal())}</button></div></div>`
        : '';
      return `<div class="pad"><label class="search">${ic('search')}<input data-keep="q" value="${st.q}" placeholder="ابحث بالاسم أو اكتب الباركود" aria-label="ابحث عن منتج"></label>
        ${st.cart.length && !results && !st.sold ? `<div class="chips"><button class="chip" data-act="later">تعليق</button><button class="chip" data-act="clear">${ic('trash')}تفريغ</button></div>` : ''}</div>
        <div class="list">${list}</div>${foot}`;
    };

    const productsScreen = () => {
      const list = products.filter((p) => !st.pq || norm(p.n).includes(norm(st.pq)));
      return `<div class="pad"><label class="search">${ic('search')}<input data-keep="pq" value="${st.pq}" placeholder="ابحث بالاسم أو الباركود" aria-label="ابحث بالمنتجات"></label></div>
        <div class="list">${list.map((p) => `<button class="row row-btn" data-act="product" data-id="${p.id}">${avatar(p.n, p.a)}
          <span class="grow"><b>${p.n}</b><small class="${p.s <= 5 ? 'warn' : ''}">المخزون: ${qtyText(p.s)} ${unit(p)}</small></span>
          <span class="price">${money(p.p)}<small>/ ${unit(p)}</small></span></button>`).join('') || '<p class="empty">ما لقينا منتج بهالاسم. جرّب كلمة ثانية</p>'}</div>
        <button class="fab" data-act="later">${ic('plus')}إضافة منتج</button>`;
    };

    const product = (p) => `<div class="pad">
        <div class="card"><small>اسم المنتج</small><b class="field">${p.n}</b>
          <small>المخزون: ${qtyText(p.s)} ${unit(p)}</small></div>
        <div class="seg" role="group" aria-label="بيع المنتج">
          <button class="${p.kg ? '' : 'on'}" data-act="unit" data-v="piece" aria-pressed="${!p.kg}">${p.kg ? '' : ic('check')}بالقطعة</button>
          <button class="${p.kg ? 'on' : ''}" data-act="unit" data-v="kg" aria-pressed="${!!p.kg}">${p.kg ? ic('check') : ''}بالكيلو</button>
        </div>
        <div class="card"><small>سعر البيع لكل ${unit(p)}</small><b class="field">${money(p.p)}</b>
          <small class="ours">ربحك ب${p.kg ? 'الكيلو' : 'القطعة'}: ${money(p.p - p.c)}</small></div>
        ${p.carton ? `<div class="card"><b>الكرتونة</b>
          <div class="sheet-row"><span class="muted">عدد القطع</span><b>${p.carton.size} قطع</b></div>
          <div class="sheet-row"><span class="muted">سعر الكرتونة</span><b>${money(p.carton.price)}</b></div>
          <div class="sheet-row"><span class="muted">باركود الكرتونة</span><b dir="ltr">${p.carton.bc}</b></div></div>` : ''}
        ${p.kg ? `<div class="card"><b>الميزان</b><small>بتحط الجبنة على الميزان، بيطبع ملصق، وبتصوّره. الوزن والسعر بينزلوا لحالهم.</small></div>` : ''}
        <button class="a-btn a-main a-wide" data-act="save">${ic('check')}حفظ التعديل</button></div>`;

    const debts = () => {
      const open = customers.filter((c) => c.d > 0);
      const credit = customers.filter((c) => c.d < 0);
      const total = open.reduce((t, c) => t + c.d, 0);
      return `<div class="pad"><div class="card total-card"><span>مجموع الديون</span><b class="big ours">${money(total)}</b><small>على ${open.length} زبون</small></div>
        ${credit.length ? `<div class="chips"><button class="chip" data-act="cust" data-id="${credit[0].id}">لهم رصيد (${credit.length}): ${money(credit.reduce((t, c) => t + c.d, 0))}</button></div>` : ''}</div>
        <div class="list">${open.map((c) => `<div class="row debt"><button class="row-main" data-act="cust" data-id="${c.id}">${avatar(c.n, c.a)}
          <span class="grow"><b>${c.n}</b><small dir="ltr">${c.ph}</small>
          <small class="${c.last > 30 ? 'warn' : ''}">آخر دفعة: ${c.last === 0 ? 'اليوم' : `قبل ${c.last} يوم`}</small></span></button>
          <span class="debt-side"><b class="theirs">${money(c.d)}</b>
          <span class="debt-acts"><button class="a-btn a-small a-outline" data-act="paydebt" data-id="${c.id}">تسديد</button>
          <button class="a-btn a-small a-wa" data-act="remind" data-id="${c.id}">${ic('wa')}واتساب</button></span></span></div>`).join('')
          || '<p class="empty">ما في ديون، الله يعطيك العافية.</p>'}</div>`;
    };

    const creditScreen = (c) => `<div class="pad">
        <div class="card total-card"><span>${c.d < 0 ? 'له عندنا' : c.d > 0 ? 'عليه' : 'حسابه صافي'}</span>
          <b class="big ${c.d < 0 ? 'theirs' : 'ours'}">${money(c.d)}</b><small dir="ltr">${c.ph}</small></div>
        <div class="pay-row">${c.d > 0 ? `<button class="a-btn a-main" data-act="paydebt" data-id="${c.id}">${ic('pay')}تسديد</button>
          <button class="a-btn a-small a-wa" data-act="remind" data-id="${c.id}">${ic('wa')}واتساب</button>`
          : `<button class="a-btn a-main" data-act="deposit" data-id="${c.id}">${ic('wallet')}إيداع مبلغ</button>`}</div>
        <p class="hint-line"><b>كشف الحساب</b></p>
        ${c.log.map(([kind, amt, note, when]) => `<div class="card log"><div class="sheet-row"><b>${kind}</b><b class="${amt < 0 ? 'ours' : 'theirs'}">${amt < 0 ? '−' : '+'} ${money(amt)}</b></div><small>${when} · ${note}</small></div>`).join('')}
      </div>`;

    const periods = {
      today: () => st.today,
      yesterday: () => ({ sales: 20400, profit: 4880, count: 3, debt: 0 }),
      week: () => {
        const s = week.reduce((t, v) => t + v, 0) + st.today.sales;
        return { sales: s, profit: Math.round(s * 0.24), count: 6 * 3 + st.today.count, debt: 6400 };
      },
    };
    const reports = () => {
      const v = periods[st.period]();
      const days = [...week, st.today.sales];
      const max = Math.max(...days);
      const chip = (id, label) => `<button class="chip ${st.period === id ? 'on' : ''}" data-act="period" data-id="${id}" aria-pressed="${st.period === id}">${st.period === id ? ic('check') : ''}${label}</button>`;
      const stat = (icon, label, value) => `<div class="card stat"><span class="stat-h">${ic(icon)}${label}</span><b>${value}</b></div>`;
      return `<div class="pad"><div class="chips">${chip('today', 'اليوم')}${chip('yesterday', 'أمس')}${chip('week', 'الأسبوع')}</div>
        <div class="stats">${stat('pos', 'المبيعات', money(v.sales))}${stat('chart', 'الربح', money(v.profit))}
        ${stat('receipt', 'عدد الفواتير', v.count)}${stat('book', 'الديون الجديدة', money(v.debt))}</div>
        <div class="card"><b>آخر 7 أيام</b><div class="bars">${days.map((d, i) => `<span class="bar ${i === 6 ? 'today' : ''}" style="height:${Math.round((d / max) * 100)}%">${i === 6 ? `<em>${Math.round(d / 100)}</em>` : ''}</span>`).join('')}</div></div></div>`;
    };

    const more = () => {
      const item = (icon, label, sub) => `<button class="row row-btn" data-act="later"><span class="av av0">${ic(icon)}</span><span class="grow"><b>${label}</b><small>${sub}</small></span></button>`;
      return `<div class="pad"><div class="card shop-card"><img src="img/logo.webp" width="48" height="48" alt=""><span class="grow"><b>بقالة النور</b><small class="ok">${ic('sync')} متزامن مع كل الأجهزة</small></span></div></div>
        <div class="list">${item('people', 'الموظفون', 'دعوة، موافقة، إيقاف، والصلاحيات')}${item('tune', 'إعدادات المحل', 'الاسم والشعار والفاتورة')}
        ${item('text', 'حجم الخط', 'عادي، كبير، كبير جداً')}${item('backup', 'النسخ الاحتياطي', 'بياناتك محفوظة')}</div>`;
    };

    const top = {
      sell: ['بيع', sell, `<button class="bar-btn" data-act="later">${ic('receipt')}الفواتير</button><button class="bar-btn" data-act="scan">${ic('cam')}مسح</button>`],
      products: ['المنتجات', productsScreen, ''],
      debts: ['الديون', debts, `<button class="bar-btn" data-act="later">${ic('wa')}تذكير</button>`],
      reports: ['التقارير', reports, ''],
      more: ['المزيد', more, ''],
    };
    const key = () => (st.sub ? `${st.sub.kind}:${st.sub.id}` : st.tab);

    const render = () => {
      // Keep the search box focused while typing (the screen is redrawn).
      const a = document.activeElement;
      const keep = a && root.contains(a) && a.dataset.keep ? [a.dataset.keep, a.selectionStart] : null;
      if (st.sub) {
        const back = `<button class="bar-btn back" data-act="back" aria-label="رجوع">${ic('prev')}</button>`;
        if (st.sub.kind === 'cust') {
          const c = cust(st.sub.id);
          bar.innerHTML = `<span class="bar-title">${back}<b>${c.n}</b></span>`;
          body.innerHTML = creditScreen(c);
        } else {
          bar.innerHTML = `<span class="bar-title">${back}<b>تعديل منتج</b></span>`;
          body.innerHTML = product(byId[st.sub.id]);
        }
      } else {
        const [title, draw, actions] = top[st.tab];
        bar.innerHTML = `<b>${title}</b><span class="bar-acts">${actions}</span>`;
        body.innerHTML = draw();
      }
      root.querySelectorAll('.nav-btn').forEach((b) => {
        const on = b.dataset.tab === st.tab;
        b.classList.toggle('on', on);
        if (on) b.setAttribute('aria-current', 'page');
        else b.removeAttribute('aria-current');
      });
      if (keep) {
        const i = body.querySelector(`[data-keep="${keep[0]}"]`);
        i?.focus();
        i?.setSelectionRange(keep[1], keep[1]);
      }
      listeners.forEach((fn) => fn(key()));
    };

    const open = (tab, sub = null) => {
      st.tab = tab;
      st.sub = sub;
      closeSheet();
      toastEl.hidden = true;
      render();
      body.scrollTop = 0;
    };
    const go = (target) => {
      const [kind, id] = target.split(':');
      if (kind === 'cust') open('debts', { kind, id });
      else if (kind === 'product') open('products', { kind, id });
      else open(kind);
    };

    // ---------- sheets ----------
    const closeSheet = () => { sheet.hidden = true; sheet.innerHTML = ''; sheet.onclick = null; };
    const showSheet = (draw, onClick, focusSel) => {
      sheet.onclick = (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.act === 'close') closeSheet();
        else onClick(b);
      };
      draw();
      sheet.hidden = false;
      sheet.querySelector(focusSel)?.focus();
    };
    const openPay = () => {
      const total = cartTotal();
      const notes = [0, 5000, 10000, 20000].filter((n) => n === 0 || n >= total);
      let given = notes[1] ?? 0;
      const draw = () => {
        sheet.innerHTML = `<b class="sheet-title">الدفع</b>
          <div class="sheet-row"><span>المطلوب</span><b class="big">${money(total)}</b></div>
          <span class="muted">الزبون دفع:</span>
          <div class="chips">${notes.map((n) => `<button class="chip ${n === given ? 'on' : ''}" data-act="note" data-n="${n}" aria-pressed="${n === given}">${n ? money(n) : 'بالزبط'}</button>`).join('')}</div>
          <div class="sheet-row"><span>الباقي للزبون</span><b class="big ours">${money(given ? given - total : 0)}</b></div>
          <button class="a-btn a-main a-wide" data-act="confirm">${ic('check')}دفع كامل</button>
          <button class="a-btn a-text" data-act="close">رجوع</button>`;
      };
      showSheet(draw, (b) => {
        if (b.dataset.act === 'note') { given = Number(b.dataset.n); draw(); }
        if (b.dataset.act === 'confirm') {
          let profit = 0;
          for (const [id, q] of st.cart) {
            const p = byId[id];
            profit += Math.round((p.p - p.c) * q);
            p.s = Math.max(0, Math.round((p.s - q) * 100) / 100);
          }
          st.today = { ...st.today, sales: st.today.sales + total, profit: st.today.profit + profit, count: st.today.count + 1 };
          st.sold = { total, change: given ? given - total : 0 };
          st.cart = [];
          closeSheet();
          render();
        }
      }, '[data-act="confirm"]');
    };
    const openAmount = (c, title, options, label, apply) => {
      let amount = options[0];
      const draw = () => {
        sheet.innerHTML = `<b class="sheet-title">${title}</b>
          <div class="sheet-row"><span>${c.d < 0 ? 'له عندنا' : 'عليه'}</span><b class="big ${c.d < 0 ? 'theirs' : 'theirs'}">${money(c.d)}</b></div>
          <span class="muted">قديش؟</span>
          <div class="chips">${options.map((n) => `<button class="chip ${n === amount ? 'on' : ''}" data-act="amt" data-n="${n}" aria-pressed="${n === amount}">${n === c.d ? 'كل الدين' : money(n)}</button>`).join('')}</div>
          <button class="a-btn a-main a-wide" data-act="ok">${ic('check')}${label} ${money(amount)}</button>
          <button class="a-btn a-text" data-act="close">رجوع</button>`;
      };
      showSheet(draw, (b) => {
        if (b.dataset.act === 'amt') { amount = Number(b.dataset.n); draw(); }
        if (b.dataset.act === 'ok') { apply(amount); closeSheet(); render(); }
      }, '[data-act="ok"]');
    };

    // ---------- events ----------
    root.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || sheet.contains(b)) return;
      if (b.dataset.tab) { open(b.dataset.tab); return; }
      const { act, id } = b.dataset;
      switch (act) {
        case 'inc': add(id); break;
        case 'dec': {
          const line = st.cart.find((l) => l[0] === id);
          line[1] -= byId[id].kg ? 0.25 : 1;
          if (line[1] <= 0) st.cart = st.cart.filter((l) => l !== line);
          break;
        }
        case 'add': add(id); break;
        case 'pick': add(id); st.q = ''; break;
        case 'clear': st.cart = []; toast('انفضّت السلة'); break;
        case 'scan': {
          const pid = scanOrder[st.scan++ % scanOrder.length];
          add(pid, 1);
          toast(`بيب! انضاف: ${byId[pid].n}`);
          break;
        }
        case 'pay': openPay(); return;
        case 'paydebt': {
          const c = cust(id);
          const options = [2000, 5000, 10000].filter((n) => n < c.d).concat(c.d);
          openAmount(c, `تسديد: ${c.n}`, options, 'سجّل التسديد', (n) => {
            c.d -= n;
            c.last = 0;
            c.log.unshift(['تسديد', -n, 'كاش', 'هلأ']);
            toast(`انسجل التسديد: ${(n / 100).toFixed(2)} ₪`);
          });
          return;
        }
        case 'deposit': {
          const c = cust(id);
          openAmount(c, `إيداع: ${c.n}`, [2000, 5000, 10000], 'سجّل الإيداع', (n) => {
            c.d -= n;
            c.log.unshift(['إيداع', -n, 'كاش', 'هلأ']);
            toast(`انضاف لرصيده ${(n / 100).toFixed(2)} ₪`);
          });
          return;
        }
        case 'remind': {
          const c = cust(id);
          toast(`رسالة جاهزة لـ ${c.n}: «مرحبا، عليك ${(c.d / 100).toFixed(2)} ₪ لبقالة النور»`);
          return;
        }
        case 'cust': go(`cust:${id}`); return;
        case 'product': go(`product:${id}`); return;
        case 'unit': byId[st.sub.id].kg = b.dataset.v === 'kg'; break;
        case 'save': toast('انحفظ التعديل ✓'); open('products'); return;
        case 'back': open(st.tab); return;
        case 'period': st.period = id; break;
        case 'later': toast(later); return;
        default: return;
      }
      render();
    });
    root.addEventListener('input', (e) => {
      const k = e.target.dataset.keep;
      if (!k) return;
      st[k] = e.target.value;
      render();
    });
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !sheet.hidden) closeSheet();
    });

    root.classList.add('live');
    render();
    return { go, onChange: (fn) => { listeners.push(fn); fn(key()); } };
  };

  // Build each phone only when it comes near the screen (less work on load).
  const demos = new Map();
  const get = (el) => {
    if (!demos.has(el)) demos.set(el, mount(el));
    return demos.get(el);
  };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const d = get(e.target);
      if (e.target.hasAttribute('data-tour')) wireTour(d);
    }
  }, { rootMargin: '600px' });
  document.querySelectorAll('[data-demo]').forEach((el) => io.observe(el));

  // Tour list: each line opens its screen in the tour phone.
  const tourEl = document.querySelector('[data-demo][data-tour]');
  const items = [...document.querySelectorAll('.tabs [data-go]')];
  if (!tourEl || !items.length) return;
  const capTitle = document.getElementById('tour-title');
  const capText = document.getElementById('tour-text');
  const phone = tourEl.closest('.phone');
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  // Which line a screen belongs to (any product page is the carton/scale line).
  const lineOf = (k) => (k.startsWith('product:') ? 'product:water' : k.startsWith('cust:') && k !== 'cust:ra' ? 'debts' : k);
  let wired = false;
  function wireTour(demo) {
    if (wired) return;
    wired = true;
    demo.onChange((k) => {
      const on = items.find((b) => b.dataset.go === lineOf(k));
      items.forEach((b) => b.setAttribute('aria-pressed', String(b === on)));
      if (on && capTitle) {
        capTitle.textContent = on.querySelector('.tab-title').textContent;
        capText.textContent = on.querySelector('.desc').textContent;
      }
    });
  }
  items.forEach((b) => b.addEventListener('click', () => {
    const demo = get(tourEl);
    wireTour(demo);
    demo.go(b.dataset.go);
    // Phone below the list (narrow screens): bring it into view.
    if (phone.getBoundingClientRect().top > innerHeight - 160) {
      phone.scrollIntoView({ block: 'center', behavior: still.matches ? 'auto' : 'smooth' });
    }
  }));
})();
