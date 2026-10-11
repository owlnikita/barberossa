
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]+$/;

export function validateEmail(value) {
    const email = value.trim();
    return email.length <= 254 && EMAIL_PATTERN.test(email);
}

export function validatePhone(value) {
    const phone = value.trim();
    if (!PHONE_PATTERN.test(phone)) {
        return false;
    }

    const digitCount = phone.replace(/\D/g, "").length;
    return digitCount >= 10 && digitCount <= 15;
}

export function validateContactFields({ email, phone }) {
    const normalizedEmail = email.trim();
    const normalizedPhone = phone.trim();

    return {
        email: normalizedEmail
            ? (validateEmail(normalizedEmail) ? null : "emailInvalid")
            : "emailRequired",
        phone: normalizedPhone
            ? (validatePhone(normalizedPhone) ? null : "phoneInvalid")
            : "phoneRequired"
    };
}
