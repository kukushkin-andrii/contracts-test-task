const getUnpaidJobs = async (req, res) => {
    const { jobsService } = req.app.get('services');
    const { profile } = req;
    
    const jobs = await jobsService.getUnpaidJobs({ userId: profile.id });
    res.json(jobs);
}

const jobPayment = async (req, res) => {
    const { jobsService } = req.app.get('services');
    const { profile, params: { jobId } } = req;
    
    try {
        await jobsService.pay({ profile, jobId });
        // jobsService.pay({ profile, jobId: 4 });
        res.status(200).end();
    } catch (err) {
        res.status(422).end();
    }
}

module.exports = {
    getUnpaidJobs,
    jobPayment,
};
