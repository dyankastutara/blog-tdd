const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = {
	insert : (req, res)=>{
		User.create({
			name : req.body.name,
			username : req.body.username,
			password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
			email : req.body.email
		})
		.then(result=>{
			res.send(result)
		})
		.catch(err=>{
			res.send(err)
		})
	},
	getAll : (req, res)=>{
		User.find({}, (err, result)=>{
			if(!err){
				res.send(result)
			}else{
				res.send(err)
			}
		})
	},
	delete : (req, res)=>{
		User.remove({_id : req.params.id}, (err, result)=>{
			if(!err){
				res.send({
					msg : "Delete Data",
					result : result
				})
			}else{
				res.send(err)
			}
		})
	},
	update : (req, res)=>{
		User.findById(req.params.id)
		.then(result=>{
			result.update({
				name : req.body.name || result.name,
				email : req.body.email || result.email,
				username : req.body.username || result.username,
				password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) || result.password
			})
			.then(response=>{
				res.send({result : response, msg : "Data Updated"})
			})
			.catch(error=>{
				res.send(error)
			})
		})
		.catch(err=>{
			res.send(err)
		})
	}
}