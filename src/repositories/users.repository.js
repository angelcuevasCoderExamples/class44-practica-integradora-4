class UsersRepository {
    constructor(dao){
        this.dao = dao; 
    }

    async getAll(){
        return await this.dao.getAll();
    }

    async getById(id){
        return await this.dao.getById(id);
    }
    async getBy(options){
        return await this.dao.getBy(options);
    }
    async create(course){
        return await this.dao.saveUser(course);
    }

    async update(id, course){
        return await this.dao.updateUser(id, course)
    }
}

module.exports = UsersRepository;