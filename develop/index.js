// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const writeFile = require('fs');
const path = require('path');
const generateMarkdown = require('./utils/generateMarkdown');

const checkNullInput = (value) => {
    if (value != '') {
        return true;
    } else {
        console.log('Please enter some text this item');
        return false;
    }
}


const conditionalQuestions = [
    {
        type: 'input',
        message: 'Enter installation details',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Enter Usage details',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'Enter Contributions from other sources',
        name: 'contributions',
    },
    {
        type: 'input',
        message: 'Enter Tests that have been conducted',
        name: 'tests',
    },
    {
        type: 'input',
        message: 'Enter Questions that have been asked',
        name: 'questions',
    }
];


inquirer
    .prompt([
        {
            type: 'input',
            message: 'Enter a Title for your Repository',
            name: 'title',
            validate: checkNullInput,
        },
        {
            type: 'input',
            message: 'The description for your repository should describe the purpose of the repository.\nEnter a Description for Repository',
            name: 'description',
            validate: checkNullInput,
        },
        {
            type: 'input',
            message: 'Enter your GITHUB name',
            name: 'gitHubName',
        },
        {
            type: 'input',
            message: 'Enter your Email address',
            name: 'usersEmail',
        },
        {
            type: 'checkbox',
            message: 'Select the applicable Liscense(s) for your projects',
            name: 'liscense',
            choices:['BSD', 'MIT', 'GPL']
        },
        {
            type:'checkbox',
            message: 'Select any or all of the sections below to include in your Table of Contents',
            name: 'conditionalQuestions',
            choices: conditionalQuestions.map(qs => qs.name)
        }
    ])
    .then((mainAnswers) => {
      //  console.log(mainAnswers);

        const filteredConditanals = conditionalQuestions.filter((qs) => {
            return mainAnswers.conditionalQuestions.includes(qs.name);
        })

        return inquirer.prompt(filteredConditanals)
            .then((conditionalResponse) => {
                return {
                    originalResponse: mainAnswers,
                    conditionalResponse: conditionalResponse,
                }
            })
    })
    .then((finalAnswers) => {
         const markdown = generateMarkdown(finalAnswers);

         writeFile.writeFileSync(path.join(__dirname, 'output', 'readme.md'), markdown, 'utf-8');
    })


