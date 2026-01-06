import * as vscode from 'vscode';
import { InstallationResult } from './ExtensionInstallerService';

export class NotificationService {
    public showInfo(message: string): void {
        vscode.window.showInformationMessage(message);
    }

    public showError(message: string): void {
        vscode.window.showErrorMessage(message);
    }

    public showWarning(message: string): void {
        vscode.window.showWarningMessage(message);
    }

    public showExtensionAlreadyInstalled(extensionId: string): void {
        this.showInfo(`Extension ${extensionId} is already installed.`);
    }

    public showInstallationError(extensionId: string, error: Error): void {
        this.showError(`Failed to install ${extensionId}: ${error.message}`);
    }

    public showInstallationResult(result: InstallationResult): void {
        if (result.failed === 0) {
            this.showInfo(`Successfully installed ${result.installed} extension(s)!`);
        } else {
            this.showWarning(
                `Installation complete: ${result.installed} installed, ${result.skipped} skipped, ${result.failed} failed.`
            );
        }
    }
}

