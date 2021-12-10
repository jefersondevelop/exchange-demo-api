// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chai, { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chaiHttp from "chai-http";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mongoose from 'mongoose';
import { BcryptPasswordService } from "../../src/infra/adapters/user/bcrypt_password_service";

chai.use(chaiHttp);
const testEndPoint = "http://localhost:3000";

describe("User", async () => {
  describe("POST => /api/v1/auth/login #login()", () => {
    before(async () => {
      await mongoose.connection.collection('users')
        .insertOne(
          {
            email: "test@test.com",
            phoneNumber: "5459136003",
            password: await new BcryptPasswordService().encodePassword("dummyPassword"),
            dni: "1234567896"
          }
        );
    });

    it("Should return valid JWT given correct username/password", async () => {

      const res = await chai.request(testEndPoint)
        .post('/api/v1/auth/login')
        .send({
          username: "test@test.com",
          password: "dummyPassword"
        });

      expect(res).to.have.status(200);
      expect(res.body.token).to.not.be.undefined;
    });

    it("Should return InvalidCredentialsError given wrong username", async () => {

      const res = await chai.request(testEndPoint)
        .post('/api/v1/auth/login')
        .send({
          username: "t2est2@test.com",
          password: "dummyPassword"
        });

      expect(res).to.have.status(500);
      expect(res.body.message).to.be.equal('Invalid username or password');
    });

    it("Should return InvalidCredentialsError given wrong password", async () => {
      const res = await chai.request(testEndPoint)
        .post('/api/v1/auth/login')
        .send({
          username: "test@test.com",
          password: "dummy2Pass32word"
        });

      expect(res).to.have.status(500);
      expect(res.body.message).to.be.equal('Invalid username or password');

    });
  });
});
