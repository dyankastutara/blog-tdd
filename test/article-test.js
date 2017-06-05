var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app')
var Article = require('../models/article')

chai.use(chaiHttp)

var should = chai.should()


describe('Testing for CRUD Articles', function() {

  beforeEach(function(done) {
    // runs before each test in this block
    var insertArticle = new Article({
    	title : 'title',
    	content : 'content',
    	user : 'user',
    })
    insertArticle.save((err, response)=>{
			done()
		})
  });

  afterEach(function(done) {
    // runs after each test in this block
		Article.remove({},(err, response)=>{
			done()
		})
  });


  describe('Insert Articles ', function() {
    it('Should  data Articles', function(done) {
    	chai.request(server)
		  .post('/api/articles')
		  .send({ 
	    	title : 'Title',
	    	content : 'Content',
	    	user : 'user'
		  })
		  .end((err, res)=>{
		  	res.should.have.status(200);
		  	res.body.should.be.a('object');
		  	res.body.title.should.be.equal('Title')
		  	done()
		  })
    });
  });

	describe("GET Articles ",()=>{
		it('Should get all data Articles',(done)=>{
			chai.request(server)
			.get('/api/articles')
			.end((err, res)=>{
				res.should.have.status(200)
				res.body.should.be.a('array')
				res.body.length.should.equal(1)
				res.body[0].content.should.equal('content')
				done()
			})
		})
	})

	describe("DELETE Articles ",()=>{
		it('Should Delete data Articles by id',(done)=>{
			var insertArticle = new Article({
	    	title : 'Title',
	    	content : 'Content',
	    	user : 'user'
			})
			insertArticle.save((err, query)=>{
				chai.request(server)
				.delete('/api/articles/'+ query._id)
				.end((err,res)=>{
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

	describe("Update Articles ",()=>{
		it('Should Update data Articles by id',(done)=>{
			var insertArticle = new Article({
	    	title : 'Title',
	    	content : 'Content',
	    	user : 'user'
			})
			insertArticle.save((err, query)=>{
				chai.request(server)
				.put('/api/articles/'+ query._id)
				.send({
		    	title : 'Title 22',
		    	content : 'Content 22',
		    	user : 'user'
				})
				.end((err,res)=>{
					console.log(res.body)
					res.should.have.status(200)
					res.body.should.be.a('object');
					res.body.msg.should.be.a('string');
					done()
				})
			})
		})
	})


});