
const fs = require('fs')
const filePath = __dirname +'/files/user.json'

class Users {
    static id = 0; 
    constructor(){
        //console.log('new intance')
    }
    async getAll(){

        if(fs.existsSync(filePath)){
            let data = await fs.promises.readFile(filePath,'utf-8')
            return JSON.parse(data); 
        }else{
            return []; 
        }
    }
    async saveUser(user){
        user._id = ++Users.id; 
        let users = await  this.getAll();

        users.push(user)
        await fs.promises.writeFile(filePath,JSON.stringify(users,null, '\t'))
    }
}

module.exports = Users;