require('../models')

const request = require('supertest')
const app = require('../app')

const USER_URL = '/users'
const CATEGORY_URL = '/categories'
let TOKEN
let categoryId

const category = {
    name: 'Electronica'
}

//Nos logeamos con el usuario que se creo por el archivo user.Create.js
beforeAll(async () => {
    const user = {
      email: "fernando@gmail.com",
      password: "fernando1234",
    };
  
    const res = await request(app)
        .post(`${USER_URL}/login`)
        .send(user);
  
    TOKEN = res.body.token;
  });

//Create
test("POST -> 'CATEGORY_URL', should return status code 201, res.body to be defined res.body.name === category.name", async () => {
    const res = await request(app)
        .post(CATEGORY_URL)
        .send(category)
        .set("Authorization", `Bearer ${TOKEN}`);
    
    categoryId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
  });

  //Get all
  test("GET -> 'CATEGORY_URL', should return status code 200, res.body to be defined, res.body.length = 1", async () => {
    const res = await request(app)
        .get(CATEGORY_URL)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    
  })

  //Delete
  test("DELETE -> 'CATEGORY_URL, should return status code 204", async () => {
    const res = await request(app)
        .delete(`${CATEGORY_URL}/${categoryId}`)
        .set("Authorization", `Bearer ${TOKEN}`);
    
    expect(res.statusCode).toBe(204)
  })