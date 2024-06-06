const contracts = require('./contracts');
const jobs = require('./jobs');
const profile = require('./profile');
const admin = require('./admin');

module.exports = (app) => {
    contracts(app);
    jobs(app);
    profile(app);
    admin(app);
}