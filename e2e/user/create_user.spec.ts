// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chai, { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chaiHttp from "chai-http";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mongoose from 'mongoose';
import { afterEach } from "mocha";
import { UserStatus } from '../../src/domain/user/models/user';

chai.use(chaiHttp);
const testEndPoint = "http://localhost:3000";
describe("User", () => {
  describe("POST => /api/v1/auth/register #createUser()", () => {

    afterEach(async () => {
      await mongoose.connection.collection('users').drop();
    })

    it("Should create a new user given correct data", async () => {
      const registerUserRequest = {
        email: "test@gmail.com",
        phoneNumber: "5459136003",
        password: "dummyPassword",
        dni: "1234567896"
      };
      const res = await chai.request(testEndPoint)
        .post('/api/v1/auth/register')
        .send(registerUserRequest);

      expect(res).to.have.status(200);
      expect(res.body.user).to.not.be.undefined;
      expect(res.body.user.id).to.not.be.undefined;
      expect(res.body.user.email).to.be.equal(registerUserRequest.email);
      expect(res.body.user.profile.phoneNumber).to.be.equal(registerUserRequest.phoneNumber);
      expect(res.body.user.profile.dni).to.be.equal(registerUserRequest.dni);
      expect(res.body.user.status).to.be.equal(UserStatus.PENDING_FOR_DOCUMENT);
      expect(res.body.user.password).to.be.undefined;

    })

    it("Should return DuplicatedEmailError given a duplicated Email", async () => {
      const registerUserRequest = {
        email: "test@gmail.com",
        phoneNumber: "5459136003",
        password: "dummyPassword",
        dni: "otherDNI"
      };
      await mongoose.connection.collection('users')
        .insertOne(
          {
            email: "test@gmail.com",
            phoneNumber: "5459136003",
            password: "dummyPassword",
            dni: "1234567896"
          }
        );
      const res = await chai.request(testEndPoint)
        .post('/api/v1/auth/register')
        .send(registerUserRequest);

      expect(res).to.have.status(500);
      expect(res.body.code).to.be.eq("UDI_01");
      expect(res.body.message).to.be.eq("Email Already in use");

    });

    it("Should return DuplicatedDNIError given a duplicated DNI", async () => {
      const registerUserRequest = {
        email: "test2@gmail.com",
        phoneNumber: "123123",
        password: "dummyPassword",
        dni: "1234567896"
      };
      await mongoose.connection.collection('users')
        .insertOne(
          {
            email: "test@gmail.com",
            password: "dummyPassword",
            profile: {
              phoneNumber: "5459136003",
              dni: "1234567896"
            }
          }
        );
      const res = await chai.request(testEndPoint)
        .post('/api/v1/auth/register')
        .send(registerUserRequest);

      expect(res).to.have.status(500);
      expect(res.body.code).to.be.eq("UDI_02");
      expect(res.body.message).to.be.eq("Identification number already in use");
    });

    it("Should return DuplicatedPhoneNumberError given a duplicated Phone Number", async () => {
      const registerUserRequest = {
        email: "tes2t@gmail.com",
        password: "dummyPassword",
        profile: {
          phoneNumber: "5459131323",
          dni: "othesdarDNI"
        }
      };
      await mongoose.connection.collection('users')
        .insertOne(
          {
            email: "test2@gmail.com",
            phoneNumber: "5459131323",
            password: "dummyPassword",
            dni: "1234567896"
          }
        );
      const res = await chai.request(testEndPoint)
        .post('/api/v1/auth/register')
        .send(registerUserRequest);

      expect(res).to.have.status(500);
      expect(res.body.code).to.be.eq("UDI_03");
      expect(res.body.message).to.be.eq("Phone number already in use");
    });

    xit("Should return InvalidEmailFormat given a non valid email", async () => {
      for (const malFormedEmail of ['asdasd.com', '@test@.com']) {
        const registerUserRequest = {
          email: malFormedEmail,
          password: "dummyPassword",
          profile: {
            phoneNumber: "5459131323",
            dni: "otherDNI"
          }
        };

        const res = await chai.request(testEndPoint)
          .post('/api/v1/auth/register')
          .send(registerUserRequest);

        expect(res).to.have.status(500);
        expect(res.body.code).to.be.eq("UDI_04");
        expect(res.body.message).to.be.eq("Invalid email format");
      }
    });
  });

});
