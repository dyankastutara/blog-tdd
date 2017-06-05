var Article = require('../models/article')

module.exports = {
	insert : (req, res)=>{
		Article.create({
			title : req.body.title,
			content : req.body.content,
			user : req.body.user
		})
		.then(result=>{
			res.send(result)
		})
		.catch(err=>{
			res.send(err)
		})
	},
	getAll : (req, res)=>{
		Article.find({}, (err, result)=>{
			if(!err){
				res.send(result)
			}else{
				res.send(err)
			}
		})
	},
	delete : (req, res)=>{
		Article.remove({_id : req.params.id}, (err, result)=>{
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
		Article.findById(req.params.id)
		.then(result=>{
			result.update({
				title : req.body.title || result.title,
				content : req.body.content || result.content,
				user : req.body.user || result.user
			})
			.then(response=>{
				res.send({result : response, msg : "Updated Data"})
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