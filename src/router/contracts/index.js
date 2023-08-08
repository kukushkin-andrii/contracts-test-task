const { getProfile } = require('../../middleware/getProfile');
const {
    getContractById,
    getContracts,
} = require('../../controllers/contracts');

module.exports = (app) => {
    /**
     * @returns contract by id
     */
    app.get('/contracts/:id', getProfile, getContractById);
    
    /**
     * @returns not terminated contracts belonging to a user
     */
    app.get('/contracts', getProfile, getContracts);
}