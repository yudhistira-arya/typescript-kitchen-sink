export function promise() {
    Promise.resolve(123)
        .then((res) => {
            console.log(`promise: Before error ${res}`)
            throw new Error('something bad happened'); // throw a synchronous error
            return 456;
        })
        .then((res) => {
            console.log(`promise: ${res}`); // never called
            return Promise.resolve(789);
        })
        .catch((err) => {
            console.log(`promise: ${err.message}`); // something bad happened
        })
        .finally(() => {
            console.log("promise: last");
        });
    console.log("promise: Will I be run after promise or before promise?");
}

