import { Pipe, PipeTransform } from './pipe';

// Class without result caching
@Pipe({
    pure: false
})
class DoubleIt implements PipeTransform {
    transform(n: number): number {
        return n*2;
    }
}

// Standard Pipe class
@Pipe()
class HalveIt implements PipeTransform {
    transform(n: number): number {
        return n/2;
    }
}

// Instantiate pipe classes
const doubleIt = new DoubleIt();
const halveIt = new HalveIt();

console.log(doubleIt.transform(2));
console.log(halveIt.transform(2));
console.log(doubleIt.transform(2));
console.log(halveIt.transform(2));

// Instantiate second pipe class to test result caching
const h = new HalveIt();
console.log(h.transform(2));
