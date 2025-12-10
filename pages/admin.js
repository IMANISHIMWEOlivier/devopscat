// Admin Panel JavaScript

// Sample student data
let students = JSON.parse(localStorage.getItem('students') || '[]');

// Initialize with sample student if empty
if (students.length === 0) {
    students = [
        {
            id: 1,
            name: 'Ganza Oivier',
            email: 'Olivier@gmail.com',
            reg: '25RP0872'
        }
    ];
    localStorage.setItem('students', JSON.stringify(students));
}

let editingId = null;

// Display students in table
function displayStudents() {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.reg}</td>
            <td>
                <button class="btn btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                <button class="btn btn-edit" onclick="editStudent(${student.id})">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Show add student form
function showAddForm() {
    const form = document.getElementById('addStudentForm');
    form.style.display = 'block';
    editingId = null;
    document.getElementById('studentForm').reset();
    document.querySelector('#addStudentForm h2').textContent = 'Add New Student';
    document.querySelector('#addStudentForm button[type="submit"]').textContent = 'Add student';
}

// Hide add student form
function hideAddForm() {
    document.getElementById('addStudentForm').style.display = 'none';
    editingId = null;
}

// Add or update student
document.addEventListener('DOMContentLoaded', function() {
    displayStudents();
    
    const studentForm = document.getElementById('studentForm');
    
    if (studentForm) {
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('studentName').value;
            const email = document.getElementById('studentEmail').value;
            const reg = document.getElementById('studentReg').value;
            
            if (editingId !== null) {
                // Update existing student
                const index = students.findIndex(s => s.id === editingId);
                if (index !== -1) {
                    students[index] = {
                        id: editingId,
                        name: name,
                        email: email,
                        reg: reg
                    };
                }
            } else {
                // Add new student
                const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
                students.push({
                    id: newId,
                    name: name,
                    email: email,
                    reg: reg
                });
            }
            
            localStorage.setItem('students', JSON.stringify(students));
            displayStudents();
            hideAddForm();
        });
    }
});

// Delete student
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    }
}

// Edit student
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        editingId = id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentReg').value = student.reg;
        
        document.getElementById('addStudentForm').style.display = 'block';
        document.querySelector('#addStudentForm h2').textContent = 'Edit Student';
        document.querySelector('#addStudentForm button[type="submit"]').textContent = 'Update student';
        
        // Scroll to form
        document.getElementById('addStudentForm').scrollIntoView({ behavior: 'smooth' });
    }
}

