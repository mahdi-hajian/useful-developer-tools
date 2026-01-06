# Extension Installer

یک اکستنشن VS Code که می‌تواند لیستی از اکستنشن‌ها را به صورت خودکار نصب کند.

## ویژگی‌ها

- نصب خودکار چندین اکستنشن با یک کلیک
- نمایش progress bar هنگام نصب
- بررسی اینکه آیا اکستنشن قبلاً نصب شده است
- نمایش پیام‌های خطا در صورت عدم موفقیت
- نمایش نتیجه نهایی نصب (موفق، رد شده، قبلاً نصب شده)

## نصب اکستنشن

1. فایل `.vsix` را از Releases دانلود کنید
2. در VS Code، به Extensions بروید (Ctrl+Shift+X)
3. روی سه نقطه (⋯) کلیک کنید و "Install from VSIX..." را انتخاب کنید
4. فایل `.vsix` را انتخاب کنید

## نحوه استفاده

1. Command Palette را باز کنید (Ctrl+Shift+P یا F1)
2. دستور **"Install All Extensions"** را تایپ کنید و Enter بزنید
3. اکستنشن شروع به نصب لیست اکستنشن‌ها می‌کند
4. progress bar پیشرفت نصب را نشان می‌دهد
5. در پایان، پیام نتیجه نصب نمایش داده می‌شود

## ویرایش لیست اکستنشن‌ها

برای تغییر لیست اکستنشن‌هایی که باید نصب شوند:

1. فایل `src/config/ExtensionConfig.ts` را باز کنید
2. آرایه `EXTENSION_IDS` را ویرایش کنید
3. IDهای اکستنشن‌های مورد نظر خود را اضافه یا حذف کنید
4. اکستنشن را دوباره کامپایل و نصب کنید

### مثال:

```typescript
export const EXTENSION_IDS: string[] = [
    'ms-python.python',
    'esbenp.prettier-vscode',
    'dbaeumer.vscode-eslint',
    'ms-vscode.vscode-json'
];
```

## نحوه پیدا کردن Extension ID

Extension ID معمولاً به صورت `publisher.name` است. می‌توانید آن را از:

- **صفحه اکستنشن در VS Code Marketplace**: در URL یا اطلاعات اکستنشن
- **URL اکستنشن**: `https://marketplace.visualstudio.com/items?itemName=PUBLISHER.NAME`
  - مثال: `https://marketplace.visualstudio.com/items?itemName=ms-python.python`
  - Extension ID: `ms-python.python`

## مثال Extension ID

```
ms-python.python
esbenp.prettier-vscode
dbaeumer.vscode-eslint
ms-vscode.vscode-json
```

## مشکلات رایج

### اکستنشن نصب نمی‌شود
- مطمئن شوید Extension ID صحیح است (فرمت: `publisher.name`)
- اتصال اینترنت خود را بررسی کنید
- VS Code را restart کنید

### پیام "Extension already installed"
- این پیام طبیعی است و به معنای این است که اکستنشن قبلاً نصب شده
- اکستنشن از لیست رد می‌شود و به بقیه ادامه می‌دهد

### خطای نصب
- در صورت خطا، پیام خطا نمایش داده می‌شود
- می‌توانید اکستنشن را به صورت دستی از Marketplace نصب کنید

