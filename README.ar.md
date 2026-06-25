<p align="center">
  <a href="https://telecode.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="شعار TeleCode">
    </picture>
  </a>
</p>
<p align="center">وكيل برمجة بالذكاء الاصطناعي مفتوح المصدر.</p>
<p align="center">
  <a href="https://telecode.ai/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/telecode-ai"><img alt="npm" src="https://img.shields.io/npm/v/telecode-ai?style=flat-square" /></a>
  <a href="https://github.com/anomalyco/telecode/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/anomalyco/telecode/publish.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![TeleCode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://telecode.ai)

---

### التثبيت

```bash
# YOLO
curl -fsSL https://telecode.ai/install | bash

# مديري الحزم
npm i -g telecode-ai@latest        # او bun/pnpm/yarn
scoop install telecode             # Windows
choco install telecode             # Windows
brew install anomalyco/tap/telecode # macOS و Linux (موصى به، دائما محدث)
brew install telecode              # macOS و Linux (صيغة brew الرسمية، تحديث اقل)
sudo pacman -S telecode            # Arch Linux (Stable)
paru -S telecode-bin               # Arch Linux (Latest from AUR)
mise use -g telecode               # اي نظام
nix run nixpkgs#telecode           # او github:anomalyco/telecode لاحدث فرع dev
```

> [!TIP]
> احذف الاصدارات الاقدم من 0.1.x قبل التثبيت.

### تطبيق سطح المكتب (BETA)

يتوفر TeleCode ايضا كتطبيق سطح مكتب. قم بالتنزيل مباشرة من [صفحة الاصدارات](https://github.com/anomalyco/telecode/releases) او من [telecode.ai/download](https://telecode.ai/download).

| المنصة                | التنزيل                            |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `telecode-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `telecode-desktop-mac-x64.dmg`     |
| Windows               | `telecode-desktop-windows-x64.exe` |
| Linux                 | `.deb` او `.rpm` او AppImage       |

```bash
# macOS (Homebrew)
brew install --cask telecode-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/telecode-desktop
```

#### مجلد التثبيت

يحترم سكربت التثبيت ترتيب الاولوية التالي لمسار التثبيت:

1. `$TELECODE_INSTALL_DIR` - مجلد تثبيت مخصص
2. `$XDG_BIN_DIR` - مسار متوافق مع مواصفات XDG Base Directory
3. `$HOME/bin` - مجلد الثنائيات القياسي للمستخدم (ان وجد او امكن انشاؤه)
4. `$HOME/.telecode/bin` - المسار الافتراضي الاحتياطي

```bash
# امثلة
TELECODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://telecode.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://telecode.ai/install | bash
```

### Agents

يتضمن TeleCode وكيليْن (Agents) مدمجين يمكنك التبديل بينهما باستخدام زر `Tab`.

- **build** - الافتراضي، وكيل بصلاحيات كاملة لاعمال التطوير
- **plan** - وكيل للقراءة فقط للتحليل واستكشاف الكود
  - يرفض تعديل الملفات افتراضيا
  - يطلب الاذن قبل تشغيل اوامر bash
  - مثالي لاستكشاف قواعد كود غير مألوفة او لتخطيط التغييرات

بالاضافة الى ذلك يوجد وكيل فرعي **general** للبحث المعقد والمهام متعددة الخطوات.
يستخدم داخليا ويمكن استدعاؤه بكتابة `@general` في الرسائل.

تعرف على المزيد حول [agents](https://telecode.ai/docs/agents).

### التوثيق

لمزيد من المعلومات حول كيفية ضبط TeleCode، [**راجع التوثيق**](https://telecode.ai/docs).

### المساهمة

اذا كنت مهتما بالمساهمة في TeleCode، يرجى قراءة [contributing docs](./CONTRIBUTING.md) قبل ارسال pull request.

### البناء فوق TeleCode

اذا كنت تعمل على مشروع مرتبط بـ TeleCode ويستخدم "telecode" كجزء من اسمه (مثل "telecode-dashboard" او "telecode-mobile")، يرجى اضافة ملاحظة في README توضح انه ليس مبنيا بواسطة فريق TeleCode ولا يرتبط بنا بأي شكل.

---

**انضم الى مجتمعنا** [Discord](https://discord.gg/telecode) | [X.com](https://x.com/telecode)
