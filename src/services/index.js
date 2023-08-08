const ContractsService = require('./contracts');
const JobsService = require('./jobs');
const ProfileService = require('./profile');
const AdminService = require('./admin');

module.exports = (orm, models) => {
    const profileService = new ProfileService(orm, models);
    // JobsService depends on ContractsService so lets inilialize it first
    const contractsService = new ContractsService(orm, models);
    const jobsService = new JobsService(orm, models, contractsService);
    const adminService = new AdminService(orm, models);

    return {
        profileService,
        contractsService,
        jobsService,
        adminService,
    }
}
