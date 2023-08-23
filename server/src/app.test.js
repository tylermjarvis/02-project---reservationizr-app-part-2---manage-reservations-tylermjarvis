const request = require("supertest");
const app = require("./app");

const restaurantData = [
  {
    id: "616005cae3c8e880c13dc0b9",
    name: "Curry Place",
    description:
      "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
    image: "https://i.ibb.co/yftcRcF/indian.jpg",
  },
  {
    id: "616005e26d59890f8f1e619b",
    name: "Thai Isaan",
    description:
      "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
    image: "https://i.ibb.co/HPjd2jR/thai.jpg",
  },
  {
    id: "616bd284bae351bc447ace5b",
    name: "Italian Feast",
    description:
      "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
    image: "https://i.ibb.co/0r7ywJg/italian.jpg",
  },
];

const reservationsData = [
  {
    id: "507f1f77bcf86cd799439011",
    partySize: 4,
    date: "2023-11-17T06:30:00.000Z",
    userId: "mock-user-id",
    restaurantName: "Island Grill",
  },
  {
    id: "614abf0a93e8e80ace792ac6",
    partySize: 2,
    date: "2023-12-03T07:00:00.000Z",
    userId: "mock-user-id",
    restaurantName: "Green Curry",
  },
  {
    id: "61679189b54f48aa6599a7fd",
    date: "2023-12-03T07:00:00.000Z",
    partySize: 2,
    userId: "another-user-id",
    restaurantName: "Green Curry",
  },
];

describe("GET /restaurants", () => {
  it("should GET all restaurants with /restaurants", async () => {
    // arrange
    const expectedBody = restaurantData;

    const expectedStatus = 200;
    // act
    await request(app)
      .get("/restaurants")
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(response.status).toEqual(expectedStatus);
        expect(body).toEqual(expectedBody);
      });
  });

  it("should GET one restaurants with /restaurants/:id", async () => {
    // arrange
    const expectedBody = restaurantData[0];

    const expectedStatus = 200;
    // act
    await request(app)
      .get("/restaurants/616005cae3c8e880c13dc0b9")
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(response.status).toEqual(expectedStatus);
        expect(body).toEqual(expectedBody);
      });
  });

  it("should return an invalid message, if the restaurant id is not in the correct id format", async () => {
    // arrange
    const expectedBody = {
      message: "This id provided is not a valid id.",
    };

    const expectedStatus = 400;

    // act
    await request(app)
      .get("/restaurants/invalid-id")
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(response.status).toEqual(expectedStatus);
        expect(body).toEqual(expectedBody);
      });
  });

  it("should return an not found message, if the id within restaurants is not found in the database", async () => {
    // arrange
    const expectedBody = {
      message: "This id cannot be found in the database.",
    };

    const expectedStatus = 404;

    // act
    await request(app)
      .get("/restaurants/716005cae3c8e880c13dc0b2")
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(response.status).toEqual(expectedStatus);
        expect(body).toEqual(expectedBody);
      });
  });
});

describe("POST /reservations", () => {
  it("should create a new reservation using /reservations", async () => {
    // arrange
    const expectedBody = {
      partySize: 3,
      date: "2023-11-17T06:30:00.000Z",
      restaurantName: "Island Grill",
    };

    const expectedStatus = 201;

    // act
    await request(app)
      .post("/reservations")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;
        // assert
        expect(body).toEqual(expect.objectContaining(expectedBody));
        expect(response.status).toEqual(expectedStatus);
        expect(body.id).toBeDefined();
      });
  });

  it("should return a 400 status code when using the endpoint /reservations, if the request body is invalid", async () => {
    // arrange
    const expectedBody = {};

    const expectedStatus = 400;

    // act
    await request(app)
      .post("/reservations")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(body).toEqual(expect.objectContaining(expectedBody));
        expect(response.status).toEqual(expectedStatus);
      });
  });

  it("should return a 400 status code when using the endpoint /reservations, if the partySize is 0 or less", async () => {
    // arrange
    const expectedBody = {
      message: "Validation failed",
    };

    const expectedStatus = 400;

    // act
    await request(app)
      .post("/reservations")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(body).toEqual(expect.objectContaining(expectedBody));
        expect(response.status).toEqual(expectedStatus);
      });
  });

  it("should return a 400 status code when using the endpoint /reservations, if the date a date that is in the past", async () => {
    // arrange
    const expectedBody = {
      partySize: 4,
      date: "2020-11-17T06:30:00.000Z",
      restaurantName: "Island Grill",
    };

    const expectedStatus = 400;

    // act
    await request(app)
      .post("/reservations")
      .send(expectedBody)
      .expect(expectedStatus);
    // .expect((response) => {
    //   // const body = response.body;

    //   // assert
    //   // expect(body).toEqual(expect.objectContaining(expectedBody));
    //   expect(response.status).toEqual(expectedStatus);
    // });
  });
});

describe("GET /reservations", () => {
  it("should GET all reservations of the user with /reservations", async () => {
    // arrange
    const expectedBody = reservationsData;

    const expectedStatus = 200;

    // act
    await request(app)
      .get("/reservations")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(response.status).toEqual(expectedStatus);
        expect(body).toEqual(expectedBody);
      });
  });

  it("should GET a single reservation with /reservations/:id", async () => {
    // arrange
    const expectedBody = reservationsData[0];

    const expectedStatus = 200;

    // act
    await request(app)
      .get("/reservations/507f1f77bcf86cd799439011")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(response.status).toEqual(expectedStatus);
        expect(body).toEqual(expectedBody);
      });
  });

  it("should return an invalid message, if the reservation id is not in the correct id format", async () => {
    // arrange
    const expectedBody = {
      message: "This id provided is not a valid id.",
    };

    const expectedStatus = 400;

    // act
    await request(app)
      .get("/reservations/invalid-id")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(response.status).toEqual(expectedStatus);
        expect(body).toEqual(expectedBody);
      });
  });

  it("should return an not found message, if the id within reservations is not found in the database", async () => {
    // arrange
    const expectedBody = {
      message: "This id cannot be found in the database.",
    };

    const expectedStatus = 404;

    // act
    await request(app)
      .get("/reservations/907f1f77bcf86cd799439015")
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(response.status).toEqual(expectedStatus);
        expect(body).toEqual(expectedBody);
      });
  });
});
