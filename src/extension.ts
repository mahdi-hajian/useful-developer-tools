import * as vscode from 'vscode';

const EXTENSION_IDS: string[] = [
    'ms-python.python',
    'ms-vscode.vscode-typescript-next',
    'esbenp.prettier-vscode',
    'dbaeumer.vscode-eslint',
    'ms-vscode.vscode-json',
];

export function activate(context: vscode.ExtensionContext): void {
    console.log('Extension Installer is now active!');

    const installAllCommand: vscode.Disposable = vscode.commands.registerCommand('extensionInstaller.installAll', async (): Promise<void> => {
        const total: number = EXTENSION_IDS.length;
        let installed: number = 0;
        let failed: number = 0;

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Installing Extensions",
            cancellable: false
        }, async (progress: vscode.Progress<{ message?: string; increment?: number }>): Promise<void> => {
            progress.report({ increment: 0, message: `Starting installation of ${total} extensions...` });

            for (let i: number = 0; i < EXTENSION_IDS.length; i++) {
                const extensionId: string = EXTENSION_IDS[i];
                const increment: number = 100 / total;
                
                try {
                    progress.report({ 
                        increment: increment, 
                        message: `Installing ${extensionId}... (${i + 1}/${total})` 
                    });

                    const installedExtensions: string[] = vscode.extensions.all.map((ext: vscode.Extension<any>): string => ext.id);
                    if (installedExtensions.includes(extensionId)) {
                        vscode.window.showInformationMessage(`Extension ${extensionId} is already installed.`);
                        installed++;
                        continue;
                    }

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

export function deactivate(): void {}

