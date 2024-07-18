export interface ClasslessSemVer {
    readonly version: string;
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
    readonly build: ReadonlyArray<string>;
    readonly prerelease: ReadonlyArray<string | number>;
}
