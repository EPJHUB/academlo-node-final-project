const request = require("supertest");
const app = require("../app");

const USER_URL = "/users";
let TOKEN;
let userId;

const user = {
  firstName: "Rene",
  lastName: "Rivera",
  email: "rene@gmail.com",
  password: "rene1234",
  phone: "+123456",
};

beforeAll(async () => {
  const user = {
    email: "fernando@gmail.com",
    password: "fernando1234",
  };

  const res = await request(app).post(`${USER_URL}/login`).send(user);

  TOKEN = res.body.token;
});

test("POST -> 'USER_URL', should return status code 201, res.body to be defined res.body.firstName === user.firstName", async () => {
  const res = await request(app)
    .post(USER_URL)
    .send(user);

  userId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName);
});

//Update
test("PUT -> 'USER_URL', should return status code 200, res.body to be defined and res.body.firstName = Erick", async () => {
  const res = await request(app)
    .put(`${USER_URL}/${userId}`)
    .send({ firstName: "Erick" })
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe('Erick');
});

//Login
test("POST -> 'USER_URL/login', should return status code 200, res.body to be defined and res.body.email === user.email and res.body.token to be defined", async () => {
    const userLogin = {
        email: 'rene@gmail.com',
        password: 'rene1234'
    }
    
    const res = await request(app)
      .put(`${USER_URL}/login`)
      .send(userLogin)
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()
  });

//Error
test("POST -> 'USER_URL/login', should return status code 401", async () => {
    const userLogin = {
        email: 'rene@gmail.com',
        password: 'Invalid password'
    }
    
    const res = await request(app)
      .put(`${USER_URL}/login`)
      .send(userLogin)
  
    expect(res.statusCode).toBe(401);
  });

//Delete
test("DELETE -> 'USER_URL/:id', should return status code 204", async () => {    
    const res = await request(app)
      .delete(`${USER_URL}/${userId}`)
      .set("Authorization", `Bearer ${TOKEN}`);
  
    expect(res.statusCode).toBe(204);
  });
