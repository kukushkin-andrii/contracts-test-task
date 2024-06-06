const makeDeposit = async (req, res) => {
    const { profileService, jobsService } = req.app.get('services');
    const { profile, params: { userId }, body: { amount } } = req;
    if (parseInt(userId) !== profile.id || !amount) return res.status(400).end();
    let jobsPrice = 0;

    try {
        const jobs = await jobsService.getUnpaidJobs({ userId: profile.id });
        jobsPrice = jobs.reduce((price, job) => {
            return price + job.price;
        }, 0)
    } catch (err) {
        res.status(500).end();
    }
    
    try {
        await profileService.makeDeposit({ profile, amount, jobsPrice });
        res.status(200).end();
    } catch (err) {
        res.status(422).end();
    }
}

module.exports = {
    makeDeposit,
};
