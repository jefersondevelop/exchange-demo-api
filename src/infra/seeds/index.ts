import { runExchangeSeed } from './exchanges';
import { runRoleSeed } from './roles';
import { runUserSeed } from './user';

async function runAllSeeds() {
    let result = await runRoleSeed();
    console.log(result);
    result = await runExchangeSeed();
    console.log(result);
    result = await runUserSeed();
    console.log(result);
    process.exit();
}

runAllSeeds();