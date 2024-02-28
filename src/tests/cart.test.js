require("../models");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");

const LOGIN_URL = "/users/login";
const CART_URL = "/cart";

let TOKEN;
let bodyCart;
let bodyProduct;
let product;
let userId;
let cartId

beforeAll(async () => {
  const user = {
    email: "fernando@gmail.com",
    password: "fernando1234",
  };

  const res = await request(app).post(LOGIN_URL).send(user);
  TOKEN = res.body.token;
  userId = res.body.user.id;

  bodyProduct = {
    title: "franela",
    description: "lorem21",
    price: 45.45,
  };

  product = await Product.create(bodyProduct);

  bodyCart = {
    quantity: 1,
    productId: product.id,
  };
});

//Create
test("POST -> 'CART_URL should return status code 201, res.body to be defined and res.body.quantity == bodyCart.quantity", async () => {
  const res = await request(app)
    .post(CART_URL)
    .send(bodyCart)
    .set("Authorization", `Bearer ${TOKEN}`);

  cartId = res.body.id

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(bodyCart.quantity);
  expect(res.body.productId).toBe(product.id);
  expect(res.body.userId).toBe(userId)
  //   await product.destroy();
});

//Get All
test("GET -> 'CART_URL should return status code 200, res.body to be defined and res.body.length === 1", async () => {
  const res = await request(app)
    .get(CART_URL)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);

  expect(res.body[0].userId).toBeDefined()
  expect(res.body[0].userId).toBe(userId)

  expect(res.body[0].productId).toBeDefined()
  expect(res.body[0].productId).toBe(product.id)

});

//Get One
test("GET -> 'CART_URL/:id should return status code 200, res.body to be defined and res.body.length === 1", async () => {
  const res = await request(app)
  .get(`${CART_URL}/${cartId}`)
  .set("Authorization", `Bearer ${TOKEN}`);

  // console.log(res.body)
  
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(bodyCart.quantity)

  expect(res.body.userId).toBeDefined()
  expect(res.body.userId).toBe(userId)

  expect(res.body.productId).toBeDefined()
  expect(res.body.productId).toBe(product.id)

});

test("PUT -> 'CART_URL/:id should return status code 200, res.body to be defined and res.body.length === 1", async () => {

  newData = {
    quantity: 2
  }

  const res = await request(app)
    .put(`${CART_URL}/${cartId}`)
    .send(newData)
    .set("Authorization", `Bearer ${TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.quantity).toBe(newData.quantity)
  
    expect(res.body.userId).toBeDefined()
    expect(res.body.userId).toBe(userId)
  
    expect(res.body.productId).toBeDefined()
    expect(res.body.productId).toBe(product.id)

});


test("DELETE -> 'CART_URL/:id should return status code 204", async () => {
  const res = await request(app)
    .delete(`${CART_URL}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

    expect(res.statusCode).toBe(204);
  
    await product.destroy();

});