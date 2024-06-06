class JobsService {
    constructor(orm, models, contractsService) {
        this.orm = orm;
        this.models = models;
        this.contractsService = contractsService;
    }

    async getUnpaidJobs({ userId }) {
        const { models: { Job }, orm, contractsService } = this;

        const contracts = await contractsService.getContractsByStatus({
            statuses: [contractsService.constructor.statuses.IN_PROGRESS],
            userId
        });
        const unpaidJobs = await Job.findAll(
            {
                where: orm.and(
                    { paid: { [orm.constructor.Op.not]: true }},
                    { ContractId: contracts.map((contract) => contract.id) }
                )
            }
        )

        return unpaidJobs;
    }

    async pay({ profile, jobId }) {
        const { models: { Job, Contract, Profile }, orm, contractsService } = this;
        const { id } = profile;
        // Create managed transaction (auto commit and rollback)
        await orm.transaction({
            isolationLevel: orm.constructor.Transaction.ISOLATION_LEVELS.SERIALIZABLE
        }, async (transaction) => {
            // Find required job
            const job = await Job.findOne({
                where: orm.and(
                    { id: jobId },
                    { paid: { [orm.constructor.Op.not]: true }},
                    { '$Contract.ClientId$': id },
                    { '$Contract.status$': contractsService.constructor.statuses.IN_PROGRESS },
                ),
                include: Contract,
            });
            if (!job) throw new Error('Job not found');

            const client = await Profile.findByPk(id);
            const balance = client.balance;

            if (balance < job.price) throw new Error('Inpossible to pay. Please top up your balance');
            // Find contractor
            const contractor = await Profile.findByPk(job.Contract.ContractorId);
         
            const updatedBalance = balance - job.price;
            client.set({
                balance: updatedBalance
            });
            await client.save({ transaction })

            contractor.set({
                balance: contractor.balance + job.price,
            });
            await contractor.save({ transaction });

            job.set({
                paid: true,
                paymentDate: Date.now(),
            });
            await job.save({ transaction });
        });
    }
}

module.exports = JobsService;
