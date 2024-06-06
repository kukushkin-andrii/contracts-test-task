const { getProfile } = require('../../middleware/getProfile');
const { checkUserRole } = require('../../middleware/checkUserRole');
const { getUnpaidJobs, jobPayment } = require('../../controllers/jobs');

module.exports = (app) => {
    /**
     * @returns unpaid jobs
     */
    app.get('/jobs/unpaid', getProfile, getUnpaidJobs);
    
    /**
     * Make payment for a job
     * Should be available for client only
     */
    app.post('/jobs/:jobId/pay', getProfile, checkUserRole('client'), jobPayment);
}
