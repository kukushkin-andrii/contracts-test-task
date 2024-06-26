const getProfile = async (req, res, next) => {
    const { profileService } = req.app.get('services');
    const profile = await profileService.getProfile({ userId: req.get('profile_id') });
    if(!profile) return res.status(401).end();
    req.profile = profile;
    next();
}
module.exports = { getProfile };
