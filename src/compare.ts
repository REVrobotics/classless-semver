import {ClasslessSemVer} from "./types";
import {debug} from "./debug";
import {compareIdentifiers} from "./identifiers";

export function compare(a: ClasslessSemVer, b: ClasslessSemVer): -1 | 0 | 1 {
    debug('SemVer.compare', a, b)
    const compareMainResult = compareMain(a, b);
    if (compareMainResult === 0) {
        return comparePre(a, b);
    } else {
        return compareMainResult;
    }
}

export function compareBuild(a: ClasslessSemVer, b: ClasslessSemVer): -1 | 0 | 1 {
    return compare(a, b) || compareBuildInternal(a, b);
}

export function eq(a: ClasslessSemVer, b: ClasslessSemVer): boolean {
    return compare(a, b) === 0;
}

export function gt(a: ClasslessSemVer, b: ClasslessSemVer): boolean {
    return compare(a, b) > 0;
}

export function gte(a: ClasslessSemVer, b: ClasslessSemVer): boolean {
    return compare(a, b) >= 0;
}

export function lt(a: ClasslessSemVer, b: ClasslessSemVer): boolean {
    return compare(a, b) < 0;
}

export function lte(a: ClasslessSemVer, b: ClasslessSemVer): boolean {
    return compare(a, b) <= 0;
}

export function neq(a: ClasslessSemVer, b: ClasslessSemVer): boolean {
    return compare(a, b) !== 0;
}

export function sort(list: Array<ClasslessSemVer>) {
    return list.sort((a, b) => {
        return compare(a, b) || compareBuild(a, b);
    });
}

function compareMain(a: ClasslessSemVer, b: ClasslessSemVer): -1 | 0 | 1 {
    return (
        compareIdentifiers(a.major, b.major) ||
        compareIdentifiers(a.minor, b.minor) ||
        compareIdentifiers(a.patch, b.patch)
    )
}

function comparePre(a: ClasslessSemVer, b: ClasslessSemVer): -1 | 0 | 1 {
    // NOT having a prerelease is > having one
    if (a.prerelease.length && !b.prerelease.length) {
        return -1
    } else if (!a.prerelease.length && b.prerelease.length) {
        return 1
    } else if (!a.prerelease.length && !b.prerelease.length) {
        return 0
    }

    let i = 0
    do {
        const aSegment = a.prerelease[i]
        const bSegment = b.prerelease[i]
        debug('prerelease compare', i, aSegment, bSegment)
        if (aSegment === undefined && bSegment === undefined) {
            return 0
        } else if (bSegment === undefined) {
            return 1
        } else if (aSegment === undefined) {
            return -1
        } else if (aSegment === bSegment) {
            continue
        } else {
            return compareIdentifiers(aSegment, bSegment)
        }
    } while (++i)
    throw new Error("Internal error");
}

function compareBuildInternal(a: ClasslessSemVer, b: ClasslessSemVer): -1 | 0 | 1 {
    let i = 0
    do {
        const aSegment = a.build[i]
        const bSegment = b.build[i]
        debug('build compare', i, aSegment, bSegment)
        if (aSegment === undefined && bSegment === undefined) {
            return 0
        } else if (bSegment === undefined) {
            return 1
        } else if (aSegment === undefined) {
            return -1
        } else if (aSegment === bSegment) {
            continue
        } else {
            return compareIdentifiers(aSegment, bSegment)
        }
    } while (++i)
    throw new Error("Internal error");
}
