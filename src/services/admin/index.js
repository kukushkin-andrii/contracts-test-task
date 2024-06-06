class AdminService {
    constructor(orm, models) {
        this.orm = orm;
        this.models = models;
    }

    async getBestProfession({
        start: startDate,
        end: endDate,
    }) {
        const { orm, models: { Job, Contract, Profile } } = this;
        const job = await Job.findOne({
            attributes: [[orm.fn('sum', orm.col('price')), 'price_sum']],
            where: orm.and(
                { paid: true },
                { paymentDate: {
                    [orm.constructor.Op.between]: [new Date(startDate), new Date(endDate)],
                }}
            ),
            order: [['price_sum', 'DESC']],
            group: ['Contract.Contractor.profession'],
            include: [{
                model: Contract,
                include: [{
                    model: Profile,
                    as: 'Contractor',
                }],
            }],
        });
    
        return job ? job.Contract.Contractor.profession : '';
    };

    async getBestPaidClients({
        start: startDate,
        end: endDate,
        limit,
    }) {
        const { orm, models: { Job, Contract, Profile } } = this;
        const jobs = await Job.findAll({
            attributes: [[orm.fn('sum', orm.col('price')), 'paid']],
            where: orm.and(
                { paid: true },
                { paymentDate: {
                    [orm.constructor.Op.between]: [new Date(startDate), new Date(endDate)],
                }}
            ),
            order: [['paid', 'DESC']],
            group: ['Contract.Client.id'],
            limit: limit,
            include: [{
                model: Contract,
                include: [{
                    model: Profile,
                    as: 'Client',
                    attributes: ['id', 'firstName', 'lastName'],
                }],
            }],
        });

        const clients = jobs.map((job) => {
            return {
                id: job.Contract.Client.id,
                fullName: `${job.Contract.Client.firstName} ${job.Contract.Client.lastName}`,
                paid: job.get('paid'),
            }
        });
    
        return clients;
    };
}

module.exports = AdminService;
