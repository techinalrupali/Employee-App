document.addEventListener("DOMContentLoaded", () => {
    loadEmployees();
});

const employeeForm = document.getElementById("employeeForm");
const employeeList = document.getElementById("employeeList");

employeeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("employeeId").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const department = document.getElementById("department").value;
    const salary = document.getElementById("salary").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const gender = document.getElementById("gender").value;

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (id) {
        // Update existing employee
        const index = employees.findIndex(emp => emp.id == id);
        employees[index] = { id, name, age, address, department, salary, email, phone, gender };
    } else {
        // Create new employee
        const newEmployee = {
            id: Date.now().toString(),
            name,
            age,
            address,
            department,
            salary,
            email,
            phone,
            gender
        };
        employees.push(newEmployee);
    }

    localStorage.setItem("employees", JSON.stringify(employees));
    employeeForm.reset();
    document.getElementById("employeeId").value = "";
    loadEmployees();
});

function loadEmployees() {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employeeList.innerHTML = "";

    employees.forEach(employee => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.address}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.gender}</td>
            <td>
                <button class="btn btn-warning m-1" onclick="editEmployee('${employee.id}')">Edit</button>
                <button class="btn btn-danger m-1" onclick="deleteEmployee('${employee.id}')">Delete</button>
            </td>
        `;

        employeeList.appendChild(row);
    });
}

function editEmployee(id) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employee = employees.find(emp => emp.id == id);

    document.getElementById("employeeId").value = employee.id;
    document.getElementById("name").value = employee.name;
    document.getElementById("age").value = employee.age;
    document.getElementById("address").value = employee.address;
    document.getElementById("department").value = employee.department;
    document.getElementById("salary").value = employee.salary;
    document.getElementById("email").value = employee.email;
    document.getElementById("phone").value = employee.phone;
    document.getElementById("gender").value = employee.gender;
}

function deleteEmployee(id) {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees = employees.filter(emp => emp.id != id);
    localStorage.setItem("employees", JSON.stringify(employees));
    loadEmployees();
}
