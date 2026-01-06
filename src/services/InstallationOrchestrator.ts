import { ExtensionListService } from './ExtensionListService';
import { ExtensionInstallerService, InstallationResult } from './ExtensionInstallerService';
import { ProgressReporterService } from './ProgressReporterService';
import { NotificationService } from './NotificationService';

export class InstallationOrchestrator {
    private readonly extensionListService: ExtensionListService;
    private readonly extensionInstallerService: ExtensionInstallerService;
    private readonly progressReporterService: ProgressReporterService;
    private readonly notificationService: NotificationService;

    public constructor(
        extensionListService: ExtensionListService,
        extensionInstallerService: ExtensionInstallerService,
        progressReporterService: ProgressReporterService,
        notificationService: NotificationService
    ) {
        this.extensionListService = extensionListService;
        this.extensionInstallerService = extensionInstallerService;
        this.progressReporterService = progressReporterService;
        this.notificationService = notificationService;
    }

    public async installAllExtensions(): Promise<void> {
        const extensionIds: string[] = this.extensionListService.getExtensionIds();
        const total: number = this.extensionListService.getExtensionCount();

        let installationResult: InstallationResult | null = null;

        await this.progressReporterService.reportProgress(
            {
                title: "Installing Extensions",
                cancellable: false
            },
            async (progress) => {
                progress.report({ increment: 0, message: `Starting installation of ${total} extensions...` });

                const increment: number = 100 / total;

                installationResult = await this.extensionInstallerService.installExtensions(
                    extensionIds,
                    (extensionId: string, index: number, total: number) => {
                        progress.report({
                            increment: increment,
                            message: `Installing ${extensionId}... (${index + 1}/${total})`
                        });
                    }
                );

                progress.report({ increment: 100, message: "Installation complete!" });
            }
        );

        if (installationResult) {
            this.notificationService.showInstallationResult(installationResult);
        }
    }
}

