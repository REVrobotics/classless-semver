export interface ClasslessSemVer {
    readonly version: string;
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
    // Unlike the standard semver package, these are not typed as ReadonlyArray.
    // This is purely for the purpose of making this type play nicely with immer.js,
    // and you should NOT mutate these arrays.
    readonly build: string[];
    readonly prerelease: (string | number)[];
}
