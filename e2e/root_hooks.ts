import {MongoDBTestContainer} from "./containers/mongodb_test_container";
import {start,stop} from '../src/server';

before(async () => {
  const mysqlContainer = await MongoDBTestContainer.getInstance();
  process.env.DB_PORT = mysqlContainer.getMappedPort(27017).toString();
  process.env.DB_HOST = mysqlContainer.getHost();
  await start();
});
after(async () => {
  await stop();
  await MongoDBTestContainer.close();
})
// export const before = () => {
//   console.log('testing')
// }
// export const rootHooks = () => ({
//   beforeAll: async () => {
//     const mysqlContainer = await MongoDBTestContainer.getInstance();
//     process.env.DB_PORT = mysqlContainer.getMappedPort(3306) + "";
//     process.env.DB_HOST = mysqlContainer.getHost();
//   }, // after all suites
//   afterAll: async () => {
//     await MongoDBTestContainer.close();
//   } // after each test
// });
