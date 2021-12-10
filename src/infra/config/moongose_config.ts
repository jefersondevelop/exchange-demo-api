import mongoose from 'mongoose';


export default async function startDatabaseConnection() {
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || 27017;
  const dbName = process.env.DB_NAME || 'testing';
  console.log(`Connecting..... to database ${dbHost}:${dbPort}/${dbName}`);
  mongoose.set('useFindAndModify', false);
  const connection = await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  connection.connection.on('error', console.error.bind(console, 'connection error:'));
  connection.connection.once('open', function () {
    console.log(`Connected to database ${dbHost}:${dbPort}/${dbName}`);
  });

}
