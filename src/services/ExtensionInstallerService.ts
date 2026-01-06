import * as vscode from 'vscode';
import { ExtensionCheckerService } from './ExtensionCheckerService';

export interface InstallationResult {
    installed: number;
    failed: number;
    skipped: number;
}

export class ExtensionInstallerService {
    private readonly extensionChecker: ExtensionCheckerService;

    public constructor(extensionChecker: ExtensionCheckerService) {
        this.extensionChecker = extensionChecker;
    }

    public async installExtension(extensionId: string): Promise<boolean> {
        try {
            if (this.extensionChecker.isExtensionInstalled(extensionId)) {
                return false;
            }

            await vscode.commands.executeCommand('workbench.extensions.installExtension', extensionId);
            return true;
        } catch (error: any) {
            console.error(`Failed to install ${extensionId}:`, error);
            throw error;
        }
    }

    public async installExtensions(
        extensionIds: string[],
        onProgress?: (extensionId: string, index: number, total: number) => void
    ): Promise<InstallationResult> {
        const result: InstallationResult = {
            installed: 0,
            failed: 0,
            skipped: 0
        };

        for (let i: number = 0; i < extensionIds.length; i++) {
            const extensionId: string = extensionIds[i];
            
            if (onProgress) {
                onProgress(extensionId, i, extensionIds.length);
            }

            try {
                if (this.extensionChecker.isExtensionInstalled(extensionId)) {
                    result.skipped++;
                    continue;
                }

                await this.installExtension(extensionId);
                result.installed++;
            } catch (error: any) {
                result.failed++;
            }
        }

        return result;
    }
}

