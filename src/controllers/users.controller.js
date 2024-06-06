const { usersService, coursesService } = require('../repositories/services');
const MailingService = require('../services/mailing.service');
const mailingService = new MailingService();

class UsersController {
    static async getAll(req, res){
        const users  = await usersService.getAll()
        res.send({status:'success', payload: users})
    }
    static async create(req, res){

        if(!req.body.first_name){
            return res.status(400).send({status:'error', error:'Incomplete data'})
        }
    
        let result = await usersService.create(req.body)
        res.send({status:'success', payload: result})
    }

    static async addToCourse(req, res){
        const {uid, cid} = req.params; 
    
        //user exists?
        const user = await usersService.getById(uid);
        if(!user) return res.status(400).send({status:'error', error:'User not found'})
    
        //course exists?
        const course = await coursesService.getById(cid);
        if(!course) return  res.status(400).send({status:'error', error:'Course not found'})
    
        //user already on course? 
        if(user.courses.some(c=>c._id.toString() === cid)){
            return res.status(400).send({status:'error', error:'User is already on that course.'})
        }
    
        user.courses.push(course._id);
        course.students.push(user._id);
    
        await usersService.update(uid, user);
        await coursesService.update(cid, course);

        await mailingService.sendSimpleMail({
            from:'Codertest',
            to: req.user.email, 
            subject: 'you have successfully registed in a new course',
            html: `<div>you have successfully registed in a new course</div>`
        })
    
        res.send({status:'success', message:'user added to course successfuly'})
    }
  
}

module.exports = UsersController; 