const { getProfile } = require('../../middleware/getProfile');
const { checkUserRole } = require('../../middleware/checkUserRole');
const { makeDeposit } = require('../../controllers/profile');

module.exports = (app) => {
    /**
     * Make a deposit
     */
    app.post('/profile/:userId/deposit', getProfile, checkUserRole('client'), makeDeposit);
    // router name changed from '/balances/deposit/:userId'
}