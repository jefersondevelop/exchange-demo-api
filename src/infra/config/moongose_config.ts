import mongoose from 'mongoose';


export default async function startDatabaseConnection() {
  const dbUri = process.env.DB_URI || ""
  mongoose.set('useFindAndModify', false);
  const connection = await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  connection.connection.on('error', console.error.bind(console, 'connection error:'));
  connection.connection.once('open', function () {
    console.log(`Connected to database ${dbUri}`);
  });

}
