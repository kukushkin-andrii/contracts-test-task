const { checkUserRole } = require('../../middleware/checkUserRole');
const {
    getBestProfession,
    getBestPaidClients,
} = require('../../controllers/admin');

module.exports = (app) => {
    /**
     * @returns best paid profession
     */
    app.get('/admin/best-profession', checkUserRole('admin'), getBestProfession);
    
    /**
     * @returns clients that paid the most
     */
    app.get('/admin/best-clients', checkUserRole('admin'), getBestPaidClients);
}