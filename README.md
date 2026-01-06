# Extension Installer

یک اکستنشن VS Code که می‌تواند لیستی از اکستنشن‌ها را به صورت خودکار نصب کند.

## ویژگی‌ها

- نصب خودکار چندین اکستنشن با یک کلیک
- نمایش progress bar هنگام نصب
- بررسی اینکه آیا اکستنشن قبلاً نصب شده است
- نمایش پیام‌های خطا در صورت عدم موفقیت

## نحوه استفاده

1. فایل `src/extension.ts` را باز کنید
2. لیست `EXTENSION_IDS` را با IDهای اکستنشن‌های مورد نظر خود ویرایش کنید
3. اکستنشن را کامپایل کنید: `npm run compile`
4. اکستنشن را در VS Code اجرا کنید (F5)
5. Command Palette را باز کنید (Ctrl+Shift+P)
6. دستور "Install All Extensions" را اجرا کنید

## نحوه پیدا کردن Extension ID

Extension ID معمولاً به صورت `publisher.name` است. می‌توانید آن را از:
- صفحه اکستنشن در VS Code Marketplace
- URL اکستنشن: `https://marketplace.visualstudio.com/items?itemName=PUBLISHER.NAME`
- فایل `package.json` اکستنشن

## مثال Extension ID

```
ms-python.python
esbenp.prettier-vscode
dbaeumer.vscode-eslint
```

## نصب وابستگی‌ها

```bash
npm install
```

## کامپایل

```bash
npm run compile
```

## توسعه

برای توسعه و تست اکستنشن:

```bash
npm run watch
```

سپس در VS Code، F5 را بزنید تا یک پنجره جدید VS Code باز شود و اکستنشن را تست کنید.

