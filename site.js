// مكيال site: light/dark switch and the app tour. No libraries.
(() => {
  const root = document.documentElement;
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const theme = () => (root.dataset.theme === 'dark' ? 'dark' : 'light');

  // Screenshots exist in both themes: img/<name>-<theme>(@2x).webp
  const setShot = (img, name = img.dataset.shot) => {
    const t = theme();
    img.dataset.shot = name;
    img.srcset = `img/${name}-${t}.webp 1x, img/${name}-${t}@2x.webp 2x`;
    img.src = `img/${name}-${t}.webp`;
  };
  const allShots = () => document.querySelectorAll('img[data-shot]').forEach((i) => setShot(i));

  const toggle = document.querySelector('.theme-btn');
  const metaColor = document.querySelector('meta[name="theme-color"]');
  const syncToggle = () => {
    const dark = theme() === 'dark';
    toggle?.setAttribute('aria-pressed', String(dark));
    metaColor?.setAttribute('content', dark ? '#0e1511' : '#16602b');
  };
  toggle?.addEventListener('click', () => {
    const dark = theme() !== 'dark';
    if (dark) root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
    syncToggle();
    allShots();
  });
  syncToggle();
  if (theme() === 'dark') allShots();

})();
