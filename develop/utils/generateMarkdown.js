
function generateMarkdown(allAnswers) {
  // allAnswers is an object, of the common answers and the conditional answers (answers from checkboxes) 

  function renderLicenseBadge(liscense, lisceneLinksArray, liscenceInfoArray) {
    let badges = ['BSD', 'MIT', 'GPL'];

    let liscenseLink = ['BSD', '![license](https://img.shields.io/badge/MIT-License-green)', '![license](https://img.shields.io/badge/GPL-License-red)'];

    let liscenseInfoData = ['A permissive license that comes in two variants, the BSD 2-Clause and BSD 3-Clause.', 'A short and simple permissive license with conditions only requiring preservation of copyright and license notices.', 'The GNU GPL is the most widely used free software license and has a strong copyleft requirement.'];

    let linkIndex = 0;

    for (let i = 0; i < liscense.length; i++) {
      liscenceInfoArray.push(liscense[i] + '\n\n' + liscenseInfoData[i] + '\n\n');

      if (badges.includes(liscense[i])) {
        linkIndex = badges.indexOf(liscense[i]);
        lisceneLinksArray.push(liscenseLink[linkIndex]);
      } else {
        lisceneLinksArray.push(liscense[i]);
      }
    }
    return;
  }

  let liscense = allAnswers.originalResponse.liscense;

  let liscenceInfoArray = [];
  let lisceneLinksArray = [];
  let liscenseLinkText = '';
  let liscenseInfo = '';

  renderLicenseBadge(liscense, lisceneLinksArray, liscenceInfoArray);

  for (i = 0; i < lisceneLinksArray.length; i++) {
    liscenseLinkText  = liscenseLinkText  + lisceneLinksArray[i] + '\n\n';
    liscenseInfo = liscenseInfo + liscenceInfoArray[i] + '\n\n';
  }

  let noDetails = 'No details available';
  if (allAnswers.conditionalResponse.installation === undefined) {
    allAnswers.conditionalResponse.installation = noDetails;
  }
  if (allAnswers.conditionalResponse.usage === undefined) {
    allAnswers.conditionalResponse.usage = noDetails;
  }
  if (allAnswers.conditionalResponse.contributions === undefined) {
    allAnswers.conditionalResponse.contributions = noDetails;
  }
  if (allAnswers.conditionalResponse.tests === undefined) {
    allAnswers.conditionalResponse.tests = noDetails;
  }
  if (allAnswers.conditionalResponse.questions === undefined) {
    allAnswers.conditionalResponse.questions = '';
  }

  let gitHubID = '';
  if (allAnswers.originalResponse.gitHubName !== '') {
    gitHubID = `My profile can be viewed on GITHUB, the link is https://github.com/${allAnswers.originalResponse.gitHubName}/`
  }

  let usersEmail = '';
  if (allAnswers.originalResponse.usersEmail !== '') {
    usersEmail = `If you have any queries please contact me via my email address which is ${allAnswers.originalResponse.usersEmail}`
  }

  return (
    `# Title

${liscenseLinkText}

  
${allAnswers.originalResponse.title}

# Description

${allAnswers.originalResponse.description}

# Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Contributions](#Contributions)
4. [Tests](#Tests)
5. [Questions](#Questions)
6. [Liscense](#Liscense)

 
## Installation
${allAnswers.conditionalResponse.installation}

## Usage
${allAnswers.conditionalResponse.usage}

## Contributions
${allAnswers.conditionalResponse.contributions}

## Tests
${allAnswers.conditionalResponse.tests}

## Questions


${gitHubID}

${usersEmail}

${allAnswers.conditionalResponse.questions}

## Liscense

${liscenseInfo}

`)

}

module.exports = generateMarkdown;
