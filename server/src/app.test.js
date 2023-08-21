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

const userReservations = [
  {
    partySize: 4,
    date: "2023-11-17T06:30:00.000Z",
    userId: "mock-user-id",
    restaurantName: "Island Grill",
  },
  {
    partySize: 2,
    date: "2023-12-03T07:00:00.000Z",
    userId: "mock-user-id",
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
        expect(200).toEqual(expectedStatus);
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
        expect(200).toEqual(expectedStatus);
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
        expect(expectedStatus).toEqual(400);
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
        expect(expectedStatus).toEqual(404);
        expect(body).toEqual(expectedBody);
      });
  });
});

describe("POST /reservation/mock-user-id", () => {
  it("should create a new reservation using /reservations/mock-user-id", async () => {
    // arrange
    const expectedBody = {
      partySize: 3,
      date: "2023-12-17T06:30:00.000Z",
      userId: "mock-user-id",
      restaurantName: "Italian Feast",
    };

    const expectedStatus = 201;

    // act
    await request(app)
      .post("/reservation/mock-user-id")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(body).toEqual(expect.objectContaining(expectedBody));
        // expect(body.id).toBeTruthy();
      });
  });

  it("should return a 400 status code when using the endpoint /reservations/mock-user-id, if the request body is invalid", async () => {
    // arrange
    const expectedBody = {};

    const expectedStatus = 400;

    // act
    await request(app)
      .post("/reservation/mock-user-id")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(body).toEqual(expectedBody);
      });
  });

  it("should return a 400 status code when using the endpoint /reservations/mock-user-id, if the partySize is 0 or less", async () => {
    // arrange
    const expectedBody = {
      partySize: 0,
      date: "2023-11-17T06:30:00.000Z",
      userId: "mock-user-id",
      restaurantName: "Italian Feast",
    };

    const expectedStatus = 400;

    // act
    await request(app)
      .post("/reservation/mock-user-id")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(body).toEqual(expectedBody);
      });
  });

  it("should return a 400 status code when using the endpoint /reservations/mock-user-id, if the date a date that is in the past", async () => {
    // arrange
    const expectedBody = {
      partySize: 3,
      date: "2020-11-17T06:30:00.000Z",
      userId: "mock-user-id",
      restaurantName: "Italian Feast",
    };

    const expectedStatus = 400;

    // act
    await request(app)
      .post("/reservation/mock-user-id")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(body).toEqual(expectedBody);
      });
  });
});

describe("GET /reservation/mock-user-id", () => {
  it("should GET all reservations of the user with /reservations/mock-user-id", async () => {
    // arrange
    const expectedBody = userReservations;

    const expectedStatus = 200;

    // act
    await request(app)
      .get("/reservation/mock-user-id")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(200).toEqual(expectedStatus);
        expect(body).toEqual(expectedBody);
      });
  });

  it("should GET a single reservation of the user with /reservations/mock-user-id/:id", async () => {
    // arrange
    const expectedBody = userReservations[0];

    const expectedStatus = 200;

    // act
    await request(app)
      .get("/reservation/mock-user-id/:id")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(200).toEqual(expectedStatus);
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
      .get("/reservation/mock-user-id/invalid-id")
      .send(expectedBody)
      .expect(expectedStatus)
      .expect((response) => {
        const body = response.body;

        // assert
        expect(400).toEqual(expectedStatus);
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
        expect(expectedStatus).toEqual(404);
        expect(body).toEqual(expectedBody);
      });
  });
});
