#! /usr/bin/env node


import inquirer from "inquirer";
import chalk from "chalk";
//THIS is a keyword that is access class property like
//parent class 
class student{
static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;
    constructor(name:string){
        this.id =student.counter++;
        this.name = name;
        this.courses = [];//intialiaz empty array for courses
        this.balance = 100;
    }
    //method to enroll a student in a course
    enroll_course(course:string){
        this.courses.push(course);

    }
    //view balance method
    view_balance(){
      console.log(chalk.bold.yellow.underline`******* Balance for ${this.name} $${this.balance} *******`);
    }
    //
    //method for pay fee of student
    pay_fees(amount : number){
        this.balance -= amount;
        console.log(chalk.bold.green.underline`$${amount} Fees paid Successfully for ${this.name}`);
        console.log(chalk.bold.red.underline`***** Remaining Balance $${this.balance}`);
    }
    //method to display student status
    show_status(){
        console.log(chalk.bold.red.underline`### ID: ${this.id}`);
        console.log(chalk.bold.red.underline`### NAME: ${this.name}`);
        console.log(chalk.bold.red.underline`### COURSES: ${this.courses}`);
        console.log(chalk.bold.red.underline`### BALANCE :  ${this.balance}`);
    }
}
//define a student manager class to manage students
//child class(we use all properties & methos of parent class in child class)
    class Student_manager {
        students : student[]
    constructor(){
            this.students =[];
        }//method to add a new student
    add_student(name:string) {
        let Student =new student(name);
        this.students.push(Student);
        console.log(chalk.bold.green.underline`Student: ${name} added successfully . Student ID: ${Student.id}`)
    }
//method to enroll a student in a course
    enroll_std(Student_id: number, course:string){
        let std_found = this.find_std(Student_id);
        if(std_found){
            std_found.enroll_course(course);
            console.log(chalk.bold.red.underline`${std_found.name} Enrolled in ${course} Successfully`);
        }
    }
    //method to view a student balance
    view_std_balance(Student_id: number){
        let std_found = this.find_std(Student_id);
        if(std_found){
            std_found.view_balance();

        }
        else{
            console.log(chalk.bold.red.underline("Student not found ,Please Enter correct student id"));
        }
    }
    //method to pay student fees
    pay_std_fees(Student_id:number, amount:number){
        let std_found =this.find_std(Student_id);
        if(std_found){
            std_found.pay_fees(amount);
        }
        else {
            console.log("Student not found ,Please Enter correct student id");
        }
    }
    //method to Display student status
    show_std_status(Student_id:number){
        let std_found= this.find_std(Student_id);
        if(std_found){
            std_found.show_status();
        }
    }
    //method to find a student by std_id
    find_std(Student_id: number){
        return this.students.find(std => std.id === Student_id);

    }
}
//main function to run the whole programe
async function main(){
    console.log(chalk.bold.blue.underline("#########  Welcome to 'GIAIC' Students Management System  ########"));
    console.log("-".repeat(50));

    let Std_Manager = new Student_manager();
     
    //use while loop to keep program runing
    while(true){
        let choice =await inquirer.prompt([{
            name: "choice",
            type: "list",
            message: "Select an Option",
            choices:[
            "Add Student",
            "Enroll Student",
            "View Student Balanace",
            "Pay Fees",
            "Show Status",
            "Exit"
        ]
        }
    ]);
    //using switch case to handle use choice
    switch(choice.choice){
        case "Add Student":
        let name_input = await inquirer.prompt([
            {
            name: "name",
            type:"input",
            message: "Enter student's Name",     
            }
    ]);
        Std_Manager.add_student(name_input.name);
    break;
        case "Enroll Student":
        let course_input = await inquirer.prompt([
            {
            name: "Student_id",
            type: "number",
            mesage: "Enter a Student ID",
            },
            {
                name : "course",
                type: " input",
                message : "Enter Student Course",
            }
        ]);
        Std_Manager.enroll_std(course_input.Student_id, course_input.course);
        break;
        case "View Student Balanace":
            let balance_input = await inquirer.prompt([
            {
            name: "Student_id",
            type: "number",
            message : "Enter a student ID",
            }
        ]);
        Std_Manager.view_std_balance(balance_input.Student_id);
        break;
        case "Pay Fees":
            let fees_input = await inquirer.prompt([
                {
                    name: "Student_id",
                    type: "number",
                    message : "Enter a student ID",
                },
                {
                    name: "amount",
                    type:"number",
                    message: "Enter the Amount For Paying Fees",
                }
            ]);
            Std_Manager.pay_std_fees(fees_input.Student_id, fees_input.amount);
            break;
            case "Show Status":
                let status_input =await inquirer.prompt([
                    {
                    name : "Student_id",
                    type: "number",
                    message : "Enter a Student ID",
                    }
                ]);
                Std_Manager.show_std_status(status_input.Student_id);
                break;
                case "Exit":
                    console.log("Exiting ....");
                        process.exit();
                 }
            }
         }
            //calling a main function
                    main();