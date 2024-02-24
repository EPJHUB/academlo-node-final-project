const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')

const URL_BASE_USER = 'users/login'
const BASE_URL = 'products'
let TOKEN
let category

beforeAll(async () => {
    const user = {
        email: "fernando@gmail.com",
        password: "fernando1234",
      };

    const res = await request(app)
        .post(URL_BASE_USER)
        .send(user)

    TOKEN = res.body.token

    //Creacion de los registros de primera instancia
    category = await Category.create({name: "Tecnologia"})

    product = {
        title: "Pendrive 64GB",
        description: "lerem",
        price: 11.99,
        categoryId: category.id
    }
})

//Create
test("POST -> 'BASE_URL', should return status code 201, res.body to be defined, res.body.title = product.title", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

    await category.destroy()
})