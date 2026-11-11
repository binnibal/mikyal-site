# مكيال: موقع التطبيق

الموقع العام لتطبيق مكيال: https://binnibal.github.io/mikyal-site/

صفحات HTML وCSS عادية بدون build. الـ APK بينزل من ريليسات هالمستودع
(`releases/latest/download/mikyal.apk` و`mikyal-light.apk`).

الصور والخطوط بتنعمل من مستودع التطبيق (`tool/site_assets.py`)، والريليس
بيترفع بـ `tool/release_site.sh`.

الخطوط: Noto Sans Arabic وNoto Sans، رخصة SIL OFL (`fonts/OFL-NotoSans.txt`).

بعد أي تعديل على `style.css` أو `site.js` أو `demo.js`: غيّر رقم `?v=` بروابطهم بالصفحات الثلاث،
عشان المتصفح ياخد الملف الجديد فوراً بدل النسخة المخزّنة.
