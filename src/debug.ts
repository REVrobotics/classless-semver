export const debug = (
    true ||
    typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG ?? "")
) ? (message?: any, ...optionalParams: any[]) => console.error('SEMVER', message, ...optionalParams)
    : () => {}
