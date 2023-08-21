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
