var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app')
var User = require('../models/user')

chai.use(chaiHttp)

var should = chai.should()


describe('Testing for CRUD Users', function() {

  beforeEach(function(done) {
    // runs before each test in this block
    var insertUser = new User({
    	name : 'User',
    	username : 'user',
    	password : 'user',
    	email : 'user@user.com',
    })
    insertUser.save((err, response)=>{
			done()
		})
  });

  afterEach(function(done) {
    // runs after each test in this block
		User.remove({},(err, response)=>{
			done()
		})
  });


  describe('Insert Users ', function() {
    it('Should  data Users', function(done) {
    	chai.request(server)
		  .post('/api/users')
		  .send({ 
		  	name: 'User Kedua', 
		  	username: 'user2', 
		  	password : 'user', 
		  	email : 'user2@user.com' })
		  .end((err, res)=>{
		  	res.should.have.status(200);
		  	res.body.should.be.a('object');
		  	res.body.name.should.be.equal('User Kedua')
		  	done()
		  })
    });
  });

	describe("GET Users ",()=>{
		it('Should get all data Users',(done)=>{
			chai.request(server)
			.get('/api/users')
			.end((err, res)=>{
				res.should.have.status(200)
				res.body.should.be.a('array')
				res.body.length.should.equal(1)
				done()
			})
		})
	})

	describe("DELETE Users ",()=>{
		it('Should Delete data Users by id',(done)=>{
			var insertUser = new User({
				"name": "Kastutara",
				"username": "dyankastutara",
				"email": "dyankastutara19@gmail.com",
				"password":"dyan19"
			})
			insertUser.save((err, query)=>{
				chai.request(server)
				.delete('/api/users/'+ query._id)
				.end((err,res)=>{
					res.should.have.status(200)
					res.body.should.be.a('object');
					res.body.msg.should.be.a('string');
					res.body.result.should.be.a('object')
					res.body.result.ok.should.equal(1)
					res.body.result.n.should.equal(1)
					done()
				})
			})
		})
	})

	describe("Update Users ",()=>{
		it('Should Update data Users by id',(done)=>{
			var insertUser = new User({
				"name": "Kastutara",
				"username": "dyankastutara",
				"email": "dyankastutara19@gmail.com",
				"password":"dyan19"
			})
			insertUser.save((err, query)=>{
				chai.request(server)
				.put('/api/users/'+ query._id)
				.send({
				"name": "Kastutara",
				"username": "dyankastutara",
				"email": "dyankastutara19@gmail.com",
				"password":"dyan19"
				})
				.end((err,res)=>{
					res.should.have.status(200)
					res.body.should.be.a('object');
					res.body.msg.should.be.a('string');
					done()
				})
			})
		})
	})


});