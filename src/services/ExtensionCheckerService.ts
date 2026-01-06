import * as vscode from 'vscode';

export class ExtensionCheckerService {
    public isExtensionInstalled(extensionId: string): boolean {
        const installedExtensions: string[] = vscode.extensions.all.map((ext: vscode.Extension<any>): string => ext.id);
        return installedExtensions.includes(extensionId);
    }

    public getInstalledExtensionIds(): string[] {
        return vscode.extensions.all.map((ext: vscode.Extension<any>): string => ext.id);
    }
}

