import * as vscode from 'vscode';
import { EXTENSION_IDS } from './config/ExtensionConfig';
import { ExtensionListService } from './services/ExtensionListService';
import { ExtensionCheckerService } from './services/ExtensionCheckerService';
import { ExtensionInstallerService } from './services/ExtensionInstallerService';
import { ProgressReporterService } from './services/ProgressReporterService';
import { NotificationService } from './services/NotificationService';
import { InstallationOrchestrator } from './services/InstallationOrchestrator';

export function activate(context: vscode.ExtensionContext): void {
    console.log('Extension Installer is now active!');

    const extensionListService: ExtensionListService = new ExtensionListService(EXTENSION_IDS);
    const extensionCheckerService: ExtensionCheckerService = new ExtensionCheckerService();
    const extensionInstallerService: ExtensionInstallerService = new ExtensionInstallerService(extensionCheckerService);
    const progressReporterService: ProgressReporterService = new ProgressReporterService();
    const notificationService: NotificationService = new NotificationService();
    const installationOrchestrator: InstallationOrchestrator = new InstallationOrchestrator(
        extensionListService,
        extensionInstallerService,
        progressReporterService,
        notificationService
    );

    const installAllCommand: vscode.Disposable = vscode.commands.registerCommand(
        'extensionInstaller.installAll',
        async (): Promise<void> => {
            await installationOrchestrator.installAllExtensions();
        }
    );

    context.subscriptions.push(installAllCommand);
}

export function deactivate(): void {}

