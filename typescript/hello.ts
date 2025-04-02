// basic types 

let age:number = 100;
let message:string ;
let isold:boolean;

//special types 
let a:any
a= 10;

a= true;

let b : unknown;

b= 100;
b = true;

let marks:number[] = [10,20,40,60,30, 14];
// marks.push(true)
// tuple 
let info: [number, string, boolean, number] = [1, 'karongi', true, 10];

// object 


let student:{
    name: string;
    age: number;
    isStudent: boolean
} = {
    name: 'John',
    age: 20,
    isStudent: true
}

// enums 
enum DAYS{
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}

let today:DAYS;
today=  DAYS.WEDNESDAY;
enum GENDER{
    MALE,
    FEMALE
}

let mygender:GENDER =GENDER.MALE; 




if(age> 18){
    message ='adult'
} else{
    message = 'child'
}
//ALIAS TYPES & INTERFACES

type StudentInfo = {
    name: string;
    age:number;
    level: number;
    email?:string;
}

let std1:StudentInfo = {
    name: 'std 1',
    age: 18,
    level: 5,
    email: 'std1@gmail.com'
    
};

let students:StudentInfo[] = [
    {
        name: 'Student',
        age: 20,
        level: 4
    }, {
        name: 'Student',
        age: 12,
        level: 3
    }
];

interface Rectangle{
height: number;
width: number
}

const rectangle:Rectangle = {
    height: 5,
    width: 10,
    // radius: 10
}

// union type

let ageOrName: number | string;

ageOrName = 10;
ageOrName = 'John';

// functions 


function add (a :number, b: number, c?: number):number{
    c= 100;
    return a + b;
}

add(a, 10);

// typecasting   : as


let x : unknown = 'hello world';
console.log(x as string);
console.log('4' as string);
// <>
console.log(<string> x);


