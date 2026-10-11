/**
 * Send a verification code and return "sent" when the user can enter it.
 * @param {string} email
 * @returns {Promise<{status: "not-configured" | "sent"}>}
 */
export async function requestEmailCode(email) {
    void email;
    return { status: "not-configured" };
}

/**
 * Return "verified" for a valid code or "invalid" when the code does not match.
 * @param {string} email
 * @param {string} code
 * @returns {Promise<{status: "not-configured" | "invalid" | "verified"}>}
 */
export async function verifyEmailCode(email, code) {
    void email;
    void code;
    return { status: "not-configured" };
}
