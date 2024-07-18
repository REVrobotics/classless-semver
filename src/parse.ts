import {MAX_LENGTH, MAX_SAFE_INTEGER} from "./constants";
import {re, t} from "./re";
import {ClasslessSemVer} from "./types";
import {debug} from "./debug";

/**
 * Only supports strict parsing
 * @param version
 */
export function parse(version: string): ClasslessSemVer {
    if (version.length > MAX_LENGTH) {
        throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
        )
    }

    debug('SemVer', version)

    const m = version.trim().match(re[t.FULL])

    if (!m) {
        throw new TypeError(`Invalid Version: ${version}`)
    }

    // these are actually numbers
    const major = +m[1]
    const minor = +m[2]
    const patch = +m[3]

    if (major > MAX_SAFE_INTEGER || major < 0) {
        throw new TypeError('Invalid major version')
    }

    if (minor > MAX_SAFE_INTEGER || minor < 0) {
        throw new TypeError('Invalid minor version')
    }

    if (patch > MAX_SAFE_INTEGER || patch < 0) {
        throw new TypeError('Invalid patch version')
    }

    let prerelease: ReadonlyArray<string | number>;
    // numberify any prerelease numeric ids
    if (!m[4]) {
        prerelease = []
    } else {
        prerelease = m[4].split('.').map((id) => {
            if (/^[0-9]+$/.test(id)) {
                const num = +id
                if (num >= 0 && num < MAX_SAFE_INTEGER) {
                    return num
                }
            }
            return id
        })
    }

    const build = m[5] ? m[5].split('.') : []
    let formattedVersion = `${major}.${minor}.${patch}`;
    if (prerelease.length > 0) {
        formattedVersion += `-${prerelease.join(".")}`
    }

    return {
        version: formattedVersion,
        major,
        minor,
        patch,
        build,
        prerelease
    };
}
