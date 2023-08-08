class ContractsService {
    constructor(orm, models) {
        this.orm = orm;
        this.models = models;
    }

    static statuses = {
        NEW: 'new',
        IN_PROGRESS: 'in_progress',
        TERMINATED: 'terminated',
    };

    async getContractById({ contractId, userId }) {
        const { orm, models: { Contract } } = this;
        const contract = await Contract.findOne(
            {
                where: orm.and(
                    { id: contractId },
                    orm.or(
                        { ClientId: userId },
                        { ContractorId: userId },
                    )
                )
            }
        );
    
        return contract;
    };
    
    async getContractsByStatus({ statuses = [ContractsService.statuses.IN_PROGRESS], userId }) {
        const { orm, models: { Contract } } = this;
        const contracts = await Contract.findAll(
            {
                where: orm.and(
                    { status: statuses },
                    orm.or(
                        { ClientId: userId },
                        { ContractorId: userId },
                    )
                )
            }
        );
    
        return contracts;
    };
}

module.exports = ContractsService;
