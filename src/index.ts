import optparse from "optparse";

import { Runner, RunnerOption } from "./Runner";
import { DynamicCommandLineParser } from "@microsoft/ts-command-line";


// parse option here
const option = new RunnerOption();
const parser = new DynamicCommandLineParser({
    toolFilename: "hogehoge",
    toolDescription: "fugafuga"
});

(async() => {
    // if (await parser.execute(process.argv)) {
        const runner = new Runner(option);
        process.on('exit', runner.requestProcessShouldExit);
        await runner.run();
        process.removeListener('exit', runner.requestProcessShouldExit);
    // }
})();
