import Container from 'typedi';
import OrgRepository from '../../repositories/Organization';

class OrgService {
    constructor() {
        this.OrgRepository = Container.get(OrgRepository);
    }

    async createOrg(Org) {
        return this.OrgRepository.create(Org);
    }

    async deleteOrg(id) {
        return this.OrgRepository.delete(id);
    }

    async updateOrg(id, Org) {
        return this.OrgRepository.update(id, Org);
    }

    async findOrg(Org) {
        return this.OrgRepository.find(Org);
    }
}

export default OrgService;