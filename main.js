//base url
const url = 'http://localhost:3000/courses';
let tableData = document.getElementById('table-data');

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
    console.log(id);
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
