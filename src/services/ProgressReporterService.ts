import * as vscode from 'vscode';

export interface ProgressOptions {
    title: string;
    cancellable?: boolean;
}

export class ProgressReporterService {
    public async reportProgress<T>(
        options: ProgressOptions,
        task: (progress: vscode.Progress<{ message?: string; increment?: number }>) => Promise<T>
    ): Promise<T> {
        return await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: options.title,
                cancellable: options.cancellable || false
            },
            task
        );
    }

    public updateProgress(
        progress: vscode.Progress<{ message?: string; increment?: number }>,
        increment: number,
        message: string
    ): void {
        progress.report({ increment, message });
    }
}

