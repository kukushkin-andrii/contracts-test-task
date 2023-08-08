const getContracts = async (req, res) => {
    const { contractsService } = req.app.get('services');
    const { profile } = req;
    const contracts = await contractsService.getContractsByStatus({
        statuses: [contractsService.constructor.statuses.NEW, contractsService.constructor.statuses.IN_PROGRESS],
        userId: profile.id
    });
    
    res.json(contracts);
}

const getContractById = async (req, res) => {
    const { contractsService } = req.app.get('services');
    const { id } = req.params;
    const { profile } = req;

    const contract = await contractsService.getContractById({ contractId: id, userId: profile.id });
    
    if(!contract) return res.status(404).end();
    res.json(contract);
}

module.exports = {
    getContracts,
    getContractById,
};
