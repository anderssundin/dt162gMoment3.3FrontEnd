//base url
const url = 'http://localhost:3000/courses';
let tableData = document.getElementById('table-data');
const code = document.getElementById('code');
const courseName = document.getElementById('name');
const progression = document.getElementById('progression');
const term = document.getElementById('term');
const syllabus = document.getElementById('syllabus');
async function fetchData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Något gick fel vid hämtningen av data.');
        }

        const data = await response.json();

        let tableHTML = '';
        data.forEach(course => {
            tableHTML += `
        <tr>
        <td>${course._id}</td>
          <td>${course.code}</td>
          <td>${course.name}</td>
          <td>${course.progression}</td>
          <td>${course.term}</td>
          <td><a href="${course.syllabus}" target="_blank">Kursplan</a></td>
          <td> <button onclick="deleteCourse('${course._id}')">Radera</button>
        </tr>
      `;
        });

        tableData.innerHTML = tableHTML;
    } catch (error) {
        console.error('Ett fel uppstod:', error);
    }
}

async function deleteCourse(id) {
    
    const deleteURL = `http://localhost:3000/courses/${id}`;

    try {
        const response = await fetch(deleteURL, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Uppdatera tabellen efter att kursen har raderats
            fetchData();
        } else {
            throw new Error('Något gick fel vid borttagning av kursen.');
        }
    } catch (error) {
        console.error('Ett fel uppstod:', error);
    }
}

// Anropa funktionen för att hämta data
fetchData();


async function addCourse(e) {
    e.preventDefault();
    let data = {
        code: code.value,
        name: courseName.value,
        progression: progression.value,
        term: term.value,
        syllabus: syllabus.value
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // get all courses
            fetchData();
            // empty inputfields
            code.value = '';
            courseName.value = '';
            progression.value = '';
            term.value = '';
            syllabus.value = '';

        } else {
            throw new Error('Något gick fel då kurs skulle läggas till.');
        }
    } catch (error) {
        console.error('Ett fel uppstod:', error);
    }

}
const addCourseForm = document.getElementById('add-course-form');
addCourseForm.addEventListener('submit', addCourse);