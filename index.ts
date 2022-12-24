#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep =()=>{
    return new Promise((resolve) => {
        setTimeout(resolve,2000);
    })
};
async function wellcome() {
    let text = chalkAnimation.rainbow('Welcome to Meezan Bank ATM !');
    await sleep();
    text.stop();
    
};

async function askQuestion() {
    const userinput:{username:string,pin:string} = await inquirer.prompt([
        {
            type: "input",
            name:"username",
            message: "Enter Your User-ID : ",
        },
        {
            type: "password",
            name: "pin",
            message:"Enter Your Pin-Code : ",
        }
    ])
    // console.log("User-ID",userinput.username);
    // console.log("Pin-Code",userinput.pin);
    const userData ={
        userid : userinput.username,
        userpin : userinput.pin,
        amount : Math.floor(Math.random() * 100000 + 1),
    }
    console.log(userData);
    
    var selectOptions:{option:"Cash-Withdraw"|"Deposit Money"|"Balance Inquiry"|"Show Account Detail"|"Exit"} = await inquirer.prompt([
        {
            type:"list",
            name:"option",
            message:"Select Any Option To perform your Task:\n",
            choices:["Cash-Withdraw","Deposit Money","Balance Inquiry","Show Account Detail","Exit"],
        }
    ])
    if(selectOptions.option == "Cash-Withdraw"){
        console.log(chalk.yellowBright("Your Current Amount :"),userData.amount);
        
        const enteredAmount = await inquirer.prompt([
            {
                type:"number",
                name: "amount",
                message:"Enter Your Amount : ",
                validate: (input)=>{
                    if(input >userData.amount){
                        return chalk.yellowBright("Insufficient Balance!");
                    }else{
                        return true;
                    }
                }
            }
        ])
        userData.amount -= enteredAmount.amount;
        console.log(chalk.yellowBright("Your Amount After Withdrawal : "),userData.amount);
    
    }
    if(selectOptions.option == "Deposit Money"){
        console.log(chalk.yellowBright("Your Current Amount :"),userData.amount);
        const depositAmount = await inquirer.prompt([
            {
                type:"number",
                name:"depositMoney",
                message:"Enter Amount Which you want to Deposit : ",
            }
        ])
        userData.amount += depositAmount.depositMoney;
        console.log(chalk.yellowBright("Your Amount After Deposit : "),userData.amount);
        
    }
    if(selectOptions.option == "Balance Inquiry"){
        console.log(chalk.yellowBright("Your Current Account Balance Status is : "),userData.amount);
        
    }
    if(selectOptions.option == "Show Account Detail"){
        console.log(`Your Name : ${userData.userid}\n Your PinCode : ${userData.userpin}\n Your Balance Remaining : ${userData.amount}`);
        
    }
    
}


async function startagain(){
        
    do {
        await wellcome();
        await askQuestion();
        var again = await inquirer.prompt([
            {
                type: "input",
                name: "Restart",
                message:"Do you Want to Continue ? then press yes or no ",
            }
        ])
    } while (again.Restart == "y" || again.Restart == "yes" || again.Restart == "YES" || again.Restart == "Y");

}
await startagain();
