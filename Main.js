let isPrime = (number1)=>{
    if(typeof number1 == "number"){
        if (number1==1){
            return "is not prime number"
        }
        if (number1==2){
            return "is prime number"
        }
        for (let index = 2; index < number1; index++) {

            if (number1%index==0){
                return "is not prime number"
            }
            return "is prime number"
            
        }
    }
    return "Invalid Input"
}

let printFibonaciSeries = (number1)=>{
    if(typeof number1 == "number"){
        default_number1=0
        default_number2=1
        FibonaciArray = [0,1]
        for (let index = 0; index < number1; index++) {
            sum = default_number1 + default_number2
            default_number1 = default_number2
            default_number2 = sum
            FibonaciArray.push(sum)
            
        }
        return FibonaciArray
    }
    return "Invalid Input"
}

let typeCount = (NumberArray) =>{
    var evenCount=0
    var oddCount =0
    var zeroCount=0
    for (let index = 0; index < NumberArray.length; index++) {
        if(NumberArray[index]==0){
            evenCount++
        }
        else if(NumberArray[index]%2==0){
            zeroCount++
        }
        else{
            oddCount++
        }
        
    }
    returnArray = [zeroCount,evenCount,oddCount]
    return returnArray
}

let functionGenrator = (functionName)=>{
    switch(functionName){
        case "checkPrime" : return["Given number",isPrime]
        case "fibonaci" : return["Fibonaci series is ",printFibonaciSeries]
        case "count" : return["Count is ",typeCount]
        default : return ["Invalid",null]
    }
}


var number1 = 10
// console.log(typeof number1);
// let [m,check] = functionGenrator("checkPrime")
// console.log(m,check(number1));

// let [m,check] = functionGenrator("fibonaci")
// console.log(m,check(number1));
// arr = check(number1)
// for (let index = 0; index < arr.length; index++) {
//     console.log(arr[index]); 
// }

let numArray = [0,0,2,6,8,90,3,1,7,5,23,0,0,0,0]
let [m,check] = functionGenrator("count")
// console.log(m,check(numArray));
let tempArray = check(numArray)
console.log("Even count is ",tempArray[0]);
console.log("Zero count is ",tempArray[1]);
console.log("Odd count is ",tempArray[2]);