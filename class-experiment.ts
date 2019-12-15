export function classExperiment() {
    let defaultInstance = new SayBadThings();
    defaultInstance.say();

    let instanceWithOverridedMethod = new SayBadThings(() => {
        // `this` will be bind to the instance
        // all property and methods will be available and set-able
        console.log(`Setting variable`);
        this.curse = "Holy shirt!";
        console.log(`curse is: ${this.curse}`)
    });
    instanceWithOverridedMethod.say();
}

class SayBadThings {
    private curse:string;

    constructor(say?: (this: SayBadThings) => void) {
        if (say) {
            this.say = say;
        }
    }

    say() {
        console.log("What the fork!");
    }
}