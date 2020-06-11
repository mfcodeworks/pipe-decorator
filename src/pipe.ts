export interface PipeTransform {
    transform(...args: any[]): any
}

export declare interface Pipe {
    pure: boolean;
}

export function Pipe(value?: Pipe) {
    return function (target: any) {
        // Get method and options
        const method = target.prototype.transform;
        const pure = value?.pure === false ? false : true;

        // If pure pipe create result cache
        if (pure) target.cache = new Map();

        // Wrap method
        target.prototype.transform = function (value: any) {
            // If pure pipe has processed this value, return cache
            if (pure && target.cache.has(value)) {
                // DEBUG: Log cache called
                console.log(`${target.name} called cache`, target.cache);
                return target.cache.get(value);
            }

            // Run method
            let result = method.apply(this, [value]);

            // If pure pipe cache result
            if (pure) target.cache.set(value, result);

            // Return result
            return result;
        }

        // Return new method
        return target;
    }
}
