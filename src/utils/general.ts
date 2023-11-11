// Mask all the letters except for the 1st letter and letters after @
export const maskEmail = (email: string | null): string => {
    if (!email) return "";
    return email.replace(
        /^(.)(.*)(@.*)$/,
        (_, a1, a2, a3) => a1 + a2.replace(/./g, "*") + a3
    );
};