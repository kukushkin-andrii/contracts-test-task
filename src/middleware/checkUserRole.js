const checkUserRole = (expectedRole) => {
    return (req, res, next) => {
        // Here should be specific check for admin user role :)
        if (expectedRole === 'admin') return next();
        const { profile } = req;
        if (profile.type !== expectedRole) return res.status(403).end();
        next();
    }
};

module.exports = { checkUserRole };