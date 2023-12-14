let grades = [];



    // Function to add a new grade and subject to the array
function addMark() {

      // Get input elements from html
    const subjectInput = document.getElementById('subject');
    const markInput = document.getElementById('mark');

      // Retrieve values from input elements
    const subject = subjectInput.value.trim();
    const mark = parseInt(markInput.value);

      // Check if the entered values are valid inputs
    if (subject !== '' && !isNaN(mark) && mark >= 0 && mark <= 100) {

        // Add the grade and subject to the array
    grades.push({ subject, mark });

        // Update the displayed grades list and average
    updateGradesList();
    calculateAverage();

        // Check and display a message based on the passed status
    checkPassedStatus(mark);
    showAddGradeMessage(subject, mark);

        // Clear input fields
    subjectInput.value = '';
    markInput.value = '';

    } 
    else {
        // Display an alert if the entered values are not valid
        alert('Please enter a valid subject name and grade between 0 and 100.');
    }

    saveGradesToFile();
}

    // This function is to remove a grade from the array
function removeGrade(index) {
    grades.splice(index, 1);

      // Update the displayed grades list and average
    updateGradesList();
    calculateAverage();
    saveGradesToFile();
}

    // Function to update the displayed grades list
function updateGradesList() {
    const gradesList = document.getElementById('gradesList');
    gradesList.innerHTML = '';

      // Iterate over the grades array and create list items with delete buttons
    grades.forEach((entry, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="entry">${entry.subject}: ${entry.mark}</span>
      <button class="delete-button" onclick="removeGrade(${index})">Delete</button>`;
        gradesList.appendChild(listItem);
    });

    saveGradesToFile();
}

    // Function to calculate and display the average of entered grades
function calculateAverage() {

      // Get the display area for the average
    const averageDisplay = document.getElementById('average');


      // Check if there are any entered grades
    if (grades.length > 0) {

        // Calculate the total sum of grades
    const sum = grades.reduce((acc, val) => acc + val.mark, 0);

        // Calculate the average and display it with two decimal places
    const average = sum / grades.length;

    averageDisplay.textContent = `Average: ${average.toFixed(2)}%`;

  } 
  else {

        // Display 'N/A' if there are no entered grades
    averageDisplay.textContent = 'N/A';
  }

  saveGradesToFile();
}

    // Congratulate the user based on their grade
function checkPassedStatus(grade) {
      
      // Congradulates user on getting a ditinction
    if (grade >= 75) {
        alert('Congratulations! You have passed with distinction!');
    } 
      
      // Congradulates user on passing the module
    else if (grade >= 50) {
        alert('Congratulations! You have passed the module.');
    }

      // Alerts user to do a supplementary exam
    else if (grade >= 40 && grade <= 49){
        alert('You qualify for a supplimentary exam for this module, request for it in time!!!!!')
    }
}

function saveGradesToFile() {
  const jsonString = JSON.stringify(grades, null, 2); // Pretty-print with 2 spaces indentation
  const blob = new Blob([jsonString], { type: 'application/json' });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'grades.json';
  a.textContent = 'Download Grades';

  const downloadContainer = document.getElementById('download-container');
  downloadContainer.innerHTML = '';
  downloadContainer.appendChild(a);
}

// Function to handle the download button click event
function downloadGrades() {
  const downloadContainer = document.getElementById('download-container');
  const downloadButton = downloadContainer.querySelector('a');

  if (downloadButton) {
      downloadButton.click();
  } else {
      alert('No grades to download.');
  }
}

function showAddGradeMessage(subject, mark) {
  const messageContainer = document.getElementById('message-container');
  const message = document.createElement('p');

  if (mark >= 75) {
      message.textContent = `Great job! You scored ${mark} in ${subject} and passed with distinction!`;
      message.style.color = 'green'; // Color-coding for distinction
  } else if (mark >= 50) {
      message.textContent = `Congratulations! You scored ${mark} in ${subject} and passed the module.`;
      message.style.color = 'blue'; // Color-coding for passing
  } else if (mark >= 40 && mark <= 49) {
      message.textContent = `You scored ${mark} in ${subject}. You qualify for a supplementary exam. Please request it in time.`;
      message.style.color = 'orange'; // Color-coding for supplementary exam
  } else {
      message.textContent = `You scored ${mark} in ${subject}. Keep working hard!`;
      message.style.color = 'black'; // Default color
  }

  messageContainer.innerHTML = '';
  messageContainer.appendChild(message);
}
