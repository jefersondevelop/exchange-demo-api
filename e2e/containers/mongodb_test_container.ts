import { GenericContainer, StartedTestContainer, Wait } from "testcontainers";

export class MongoDBTestContainer {
  private static _mongoDBContainer: StartedTestContainer;

  public static async getInstance(): Promise<StartedTestContainer> {
    if (this._mongoDBContainer) {
      return this._mongoDBContainer;
    }
    return this._createContainer();
  }

  private static async _createContainer(): Promise<StartedTestContainer> {
    console.log('Starting mongodb container....')
    const container = await new GenericContainer("mongo:4.0.4")
      .withExposedPorts(27017)
      // .withWaitStrategy(Wait.forLogMessage(/"c":"NETWORK",  "id":23016,   "ctx":"listener","message":"Waiting for connections","attr":{"port":27017,"ssl":"off"}}/))
      .start();
    // const logs = await container.logs();
    // logs
    //   .on("data", line => console.log(line))
    //   .on("err", line => console.error(line))
    //   .on("end", () => console.log("Stream closed"));

    this._mongoDBContainer = container;
    return container;
  }

  static async close() {
    console.log('Stopping mongodb container....')
    await this._mongoDBContainer.stop();
  }
}
