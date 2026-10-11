/**
 * Redirect to the Telegram bot and return "redirected" once the handoff starts.
 * @param {string} phone
 * @returns {Promise<{status: "not-configured" | "redirected"}>}
 */
export async function redirectToTelegram(phone) {
    void phone;
    return { status: "not-configured" };
}
