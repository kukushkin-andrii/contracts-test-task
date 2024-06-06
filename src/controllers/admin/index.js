const getBestProfession = async (req, res) => {
    const { adminService } = req.app.get('services');
    const profession = await adminService.getBestProfession(req.query);
    
    if (!profession) return res.status(404).end();
    res.json(profession);
}

const getBestPaidClients = async (req, res) => {
    const { adminService } = req.app.get('services');
    const clients = await adminService.getBestPaidClients(req.query);
    
    res.json(clients);
}

module.exports = {
    getBestProfession,
    getBestPaidClients,
};