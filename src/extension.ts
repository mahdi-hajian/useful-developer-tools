import * as vscode from 'vscode';

// لیست IDهای اکستنشن‌هایی که می‌خواهید نصب شوند
const EXTENSION_IDS = [
    'ms-python.python',
    'ms-vscode.vscode-typescript-next',
    'esbenp.prettier-vscode',
    'dbaeumer.vscode-eslint',
    'ms-vscode.vscode-json',
    // می‌توانید IDهای بیشتری اضافه کنید
];

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension Installer is now active!');

    // دستور برای نصب همه اکستنشن‌ها
    let installAllCommand = vscode.commands.registerCommand('extensionInstaller.installAll', async () => {
        const total = EXTENSION_IDS.length;
        let installed = 0;
        let failed = 0;

        // نمایش progress bar
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Installing Extensions",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0, message: `Starting installation of ${total} extensions...` });

            for (let i = 0; i < EXTENSION_IDS.length; i++) {
                const extensionId = EXTENSION_IDS[i];
                const increment = 100 / total;
                
                try {
                    progress.report({ 
                        increment: increment, 
                        message: `Installing ${extensionId}... (${i + 1}/${total})` 
                    });

                    // بررسی اینکه آیا اکستنشن قبلاً نصب شده است
                    const installedExtensions = await vscode.extensions.all.map(ext => ext.id);
                    if (installedExtensions.includes(extensionId)) {
                        vscode.window.showInformationMessage(`Extension ${extensionId} is already installed.`);
                        installed++;
                        continue;
                    }

                    // نصب اکستنشن
                    await vscode.commands.executeCommand('workbench.extensions.installExtension', extensionId);
                    installed++;
                    
                } catch (error: any) {
                    failed++;
                    console.error(`Failed to install ${extensionId}:`, error);
                    vscode.window.showErrorMessage(`Failed to install ${extensionId}: ${error.message}`);
                }
            }

            progress.report({ increment: 100, message: "Installation complete!" });
        });

        // نمایش نتیجه نهایی
        if (failed === 0) {
            vscode.window.showInformationMessage(
                `Successfully installed ${installed} extension(s)!`
            );
        } else {
            vscode.window.showWarningMessage(
                `Installation complete: ${installed} installed, ${failed} failed.`
            );
        }
    });

    context.subscriptions.push(installAllCommand);
}

export function deactivate() {}

