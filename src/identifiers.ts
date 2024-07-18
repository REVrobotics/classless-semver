const numeric = /^[0-9]+$/
export const compareIdentifiers = (a: string | number, b: string | number) => {
    // Implicit conversion from number to string works as-desired here
    const anum = numeric.test(a as string);
    const bnum = numeric.test(b as string);

    if (anum && bnum) {
        a = +a
        b = +b
    }

    return a === b ? 0
        : (anum && !bnum) ? -1
            : (bnum && !anum) ? 1
                : a < b ? -1
                    : 1
}

export const rcompareIdentifiers = (a: string | number, b: string | number) => compareIdentifiers(b, a)
