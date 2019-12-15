export function generator() {
    let iterator = infiniteSequence();  // will return Generator instance
    for (let i = 0; i < 100; i++) {
        console.log(`generator: ${JSON.stringify(iterator.next())}`);
    }

    let twoWayGenerator = twoWayGeneratorFunction();
    const foo = twoWayGenerator.next();
    console.log(`generator: ${foo.value}`);
    const nextThing = twoWayGenerator.next("bar");
    console.log(`generator: Value ${nextThing.value}`); // undefined
    console.log(`generator: Is done ${nextThing.done}`); // true - because no more yield

    const acceptError = acceptErrorGenerator();
    const value = acceptError.next();
    console.log(`generator: value before error ${JSON.stringify(value)}`);
    let afterException = acceptError.throw(new Error("bar"));
    console.log(`generator: value after error ${afterException.value}`);
    console.log(`generator: is done ${afterException.done}`);
}

function* infiniteSequence() {
    var i = 0;
    while (true) {
        yield i++;
    }
}

function* twoWayGeneratorFunction() {
    const bar = yield 'foo'; // bar may be *any* type
    console.log(`generator: ${bar}`); // bar!
}

function* acceptErrorGenerator() {
    try {
        yield 'foo';
    } catch (err) {
        console.log(`generator: error message ${err.message}`);
    }
}
