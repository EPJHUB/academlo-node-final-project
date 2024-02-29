require("../models");
const request = require("supertest");
const app = require("../app");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const supertest = require("supertest");

const LOGIN_URL = '/users/login'
const PURCHASE_URL = '/purchase'
let TOKEN
let userId
let product
let bodyProduct
let bodyCart
let cart

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
      // userId
    };

    // cart = await Cart.create(bodyCart)

    await supertest(app)
      .post('/cart')
      .send(bodyCart)
      .set("Authorization", `Bearer ${TOKEN}`);
  });


//Create
test("POST -> 'PURCHASE_URL should return status code 201, res.body to be defined and res.body.quantity == bodyCart.quantity", async () => {
    const res = await request(app)
      .post(PURCHASE_URL)
      // .send(cart) No necesitamos agregar un body porque en el controlador agrega el body del cart
      .set("Authorization", `Bearer ${TOKEN}`);

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();

    expect(res.body[0].quantity).toBeDefined();
    expect(res.body[0].quantity).toBe(bodyCart.quantity);

    expect(res.body[0].productId).toBeDefined();
    expect(res.body[0].productId).toBe(product.id);

    expect(res.body[0].userId).toBeDefined()
    expect(res.body[0].userId).toBe(userId)

  });

  //Get 
test("POST -> 'PURCHASE_URL should return status code 200, res.body to be defined and res.body.quantity == bodyCart.quantity", async () => {
    const res = await request(app)
      .get(PURCHASE_URL)
      .set("Authorization", `Bearer ${TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();

    expect(res.body[0].quantity).toBeDefined();
    expect(res.body[0].quantity).toBe(bodyCart.quantity);

    expect(res.body[0].productId).toBeDefined();
    expect(res.body[0].productId).toBe(product.id);
    
    expect(res.body[0].userId).toBeDefined()
    expect(res.body[0].userId).toBe(userId)
    
    

    await product.destroy();
  });