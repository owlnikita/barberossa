// middleware/adminAuth.js
function requireAdminKey(req, res, next) {
    const key = req.headers['x-admin-key'];
    if (key !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({ error: 'Unauthorized', success: false });
    }
    next();
}

module.exports = { requireAdminKey }
