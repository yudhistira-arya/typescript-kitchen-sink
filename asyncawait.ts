export function asyncAwait() {
    console.log("async-await: before async method");
    let result = asyncFunction();
    console.log("async-await: after async method");
    Promise.all([result]).finally(() => {
        console.log("generator-async: before generator method");
        let promise = runner(asyncFunctionSimulation);
        console.log("generator-async: after generator method");
    });
}

function delay(millisecond: number, count: number) {
    return new Promise<number>(resolve => {
        setTimeout(() => resolve(count), millisecond);
    })
}

// @ts-ignore
async function asyncFunction() {
    console.log("async-await: before first await");
    const res1 = await delay(100, 10);
    console.log(`async-await: ${res1}`);

    const res2 = await delay(200, 11);
    console.log(`async-await: ${res2}`);

    const res3 = await delay(1000, 12);
    console.log(`async-await: ${res3}`);
    return res3;
}

// imagine this is the wrapper that return promise
function runner(generatorFn): Promise<any> {
    // iterator returned after the first yield
    const itr = generatorFn();

    // this function is called recursively once the current promise is resolved
    function run(arg?) {
        const result = itr.next(arg);
        if (result.done) {
            // return current value once all yield (await) finished
            return result.value;
        } else {
            // execute next one once the first yielded promise resolved
            return Promise.resolve(result.value).then(run);
        }
    }

    return run();
}

function* asyncFunctionSimulation() {
    console.log("generator-async: before first yield");
    const res1 = yield delay(100, 10); // it will still sync tilll this point where await will yield to the caller
    console.log(`generator-async: ${res1}`);

    const res2 = yield delay(200, 11);
    console.log(`generator-async: ${res2}`);

    const res3 = yield delay(1000, 12);
    console.log(`generator-async: ${res3}`);
    return res3;
}

