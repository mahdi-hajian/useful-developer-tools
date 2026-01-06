export class ExtensionListService {
    private readonly extensionIds: string[];

    public constructor(extensionIds: string[]) {
        this.extensionIds = extensionIds;
    }

    public getExtensionIds(): string[] {
        return [...this.extensionIds];
    }

    public getExtensionCount(): number {
        return this.extensionIds.length;
    }
}

