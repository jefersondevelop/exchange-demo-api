// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chai, { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chaiHttp from "chai-http";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mongoose from 'mongoose';

chai.use(chaiHttp);
const testEndPoint = "http://localhost:3000";
xdescribe("User Profile", () => {
  describe("PUT => /api/v1/users/{userId}/profile #updateSelfProfile()", () => {
    it('Should return new status "PENDING_FOR_VALIDATION" when submit all the required info', async () => {
      const updateProfileRequest = {
        firstName: "test@gmail.com",
        lastName: "5459136003",
        dni: "dummyDni"
      };
      let userId = 'test';
      const res = await chai.request(testEndPoint)
        .post(`/api/v1/users/${userId}/profile`)
        .send(updateProfileRequest);

    })
  });
});
