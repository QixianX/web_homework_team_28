const {
    app
  } = require('../src/app');
  const {
    asyncReadFile,
    asyncWriteFile
  } = require('../src/dao')
  const request = require('supertest');
  
  describe("app", () => {
    describe("get request", () => {
      it("should get all tasks when request url pattern is '/api/getAll'", (done) => {
        app.locals.dataFilePath = "./test/fixture.json"
        request(app).get('/api/getAll').expect(200).expect([
          {"id":1,"task":"看论文"},
          {"id":2,"task":"敲代码"}
      ]).end((err, res) => {
          if (err) throw err;
          done()
        })
      })
    })
  
    describe("post request", () => {
      afterEach(async function () {
        await asyncWriteFile(JSON.stringify([
          {"id":1,"task":"看论文"},
          {"id":2,"task":"敲代码"}
      ]), "./test/fixture.json")
      })
  
      it("should create a task ", (done) => {
        request(app).post('/api/add').send({
          "id":3,"task":"wzry"
        }).expect(201).expect([
          {"id":1,"task":"看论文"},
		  {"id":2,"task":"敲代码"},
          {"id":3,"task":"wzry"}
        ]).end((err, res) => {
          if (err) throw err;
          done()
        })
      })

    })

    describe("delete request", () => {
      it("should return 204", (done) => {
        request(app).delete('/api/delete/1').expect(204).end((err, res) => {
          if (err) throw err;
          done()
        })
      })
      it("should delete task ", (done) => {
        app.locals.dataFilePath = "./test/fixture.json"
        request(app).get('/api/getAll').expect(200).expect([
          {"id":1,"task":"看论文"}
      ]).end((err, res) => {
          if (err) throw err;
          done()
        })
      })     
  })

  describe("change request", () => {

    it("should return 204", (done) => {
      request(app).post('/api/update/1').send({
      "task":"写论文"
      }).expect(204).end((err, res) => {
        if (err) throw err;
        done()
      })
    })
    it("should change task ", (done) => {
      app.locals.dataFilePath = "./test/fixture.json"
      request(app).get('/api/getAll').expect(200).expect([
        {"id":1,"task":"写论文"}
    ]).end((err, res) => {
        if (err) throw err;
        done()
      })
    })

})
}) 

describe("reset request", () => {
  afterEach(async function () {
    await asyncWriteFile(JSON.stringify([
      {"id":1,"task":"看论文"},
      {"id":2,"task":"敲代码"}
  ]), "./test/fixture.json")
  })

  it("should reset tasks when ", (done) => {
    
    request(app).get('/api/getAll').expect(200).expect([
      {"id":1,"task":"wzry"}
  ]).end((err, res) => {
      if (err) throw err;
      done()
    })
  })
})

