class ProfileService {
    constructor(orm, models) {
        this.orm = orm;
        this.models = models;
    }

    async getProfile({ userId = 0 }) {
        const { models: { Profile } } = this;

        const profile = Profile.findByPk(userId);
        return profile;
    }

    async makeDeposit({ profile, amount, jobsPrice }) {
        // Client can't deposit more than 25% his total of jobs to pay
        const allowedAmount = 0.25 * jobsPrice;
        if (amount > allowedAmount) throw new Error('Such amount is not allowed');
        profile.balance = profile.balance + amount;
        profile.save();
    }
}

module.exports = ProfileService;
