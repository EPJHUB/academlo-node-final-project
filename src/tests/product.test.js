require('../models')

const request = require("supertest");
const app = require("../app");

const Category = require("../models/Category");

const USER_URL = "/users/login";
const PRODUCTS_URL = "/products";
let TOKEN;
let category;
let product;
let productId

beforeAll(async () => {
  const user = {
    email: "fernando@gmail.com",
    password: "fernando1234",
  };

  const res = await request(app).post(USER_URL).send(user);

  TOKEN = res.body.token;

  //Creacion de los registros de primera instancia
  category = await Category.create({ name: "Tecnologia" });

  product = {
    title: "Pendrive 64GB",
    description: "lerem",
    price: 11.99,
    categoryId: category.id,
  };

});

//Create
test("POST -> 'PRODUCTS_URL', should return status code 201, res.body to be defined, res.body.title = product.title", async () => {
    const res = await request(app)
        .post(PRODUCTS_URL)
        .send(product)
        .set("Authorization", `Bearer ${TOKEN}`);

    productId = res.body.id;
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe(product.title);
  
});

//Get all
test("GET -> 'PRODUCTS_URL', should return status code 200, res.body to be defined, res.body.length = 1", async () => {
    const res = await request(app)
        .get(PRODUCTS_URL)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})

//Get all query category
test("GET -> 'PRODUCTS_URL?category=2, should return status code 200, res.body to be defined, ares.body.length === 1, res.body[0].categoryId === category.id and res.body[0].category.id === category.id", async () => {
    const res = await request(app)
        .get(`${PRODUCTS_URL}?category=${category.id}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].categoryId).toBeDefined()
    expect(res.body[0].categoryId).toBe(category.id)

    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)
})

//Get one
test("GET -> 'PRODUCTS_URL/:id', should return status code 200, res.body to be defined, res.body.title === product.title", async () => {
    const res = await request(app)
        .get(`${PRODUCTS_URL}/${productId}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

    expect(res.body.category.id).toBeDefined()
    expect(res.body.category.id).toBe(category.id)

})

//Update
test("PUT -> 'PRODUCTS_URL', should return status code 200, res.body to be defined, res.body.title == Laptop Asus", async () => {
    const res = await request(app)
        .put(`${PRODUCTS_URL}/${productId}`)
        .send({
            title: "Laptop Asus"
        })
        .set("Authorization", `Bearer ${TOKEN}`);
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe("Laptop Asus")

})

//Delete
test("DELETE -> 'PRODUCTS_URL/:id', should return 204", async () => {
    const res = await request(app)
    .delete(`${PRODUCTS_URL}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`);
    
    expect(res.statusCode).toBe(204)

    await category.destroy();
})


