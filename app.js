var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "9one8one3",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            // "Remove Employee",
            "Update Employee Role",
            "Exit",
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View All Employees":
                viewAllEmp();
                break;

            case "View All Departments":
                viewDept();
                break;

            case "View All Roles":
                viewRoles();
                break;

            case "Add Employee":
                addEmp();
                break;

            case "Add Department":
                addDept();
                break;

            case "Add Role":
                addRole();
                break;

            // case "Remove Employee":
            //     removeEmp();
            //     break;

            case "Update Employee Role":
                updateEmpRole();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
};

function viewAllEmp() {
    connection.query(
        `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name department 
        from employee 
        left join role 
        on employee.role_id = role.id
        left join department on role.department_id = department.id`, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewDept() {
    connection.query("SELECT * FROM department", function (err, res) {
        console.table(res)
        start();
    })
};

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        console.table(res)
        start()
    })
};

function addEmp() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the new employee's first name?",
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the new employee's last name?",
        },
        {
            name: "role_ID",
            type: "input",
            message: "What is the new employee's role ID?",
        },
        {
            name: "manager_ID",
            type: "input",
            message: "What is the new employee's managers ID?",
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO employee (first_name, last_name, role_ID, manager_ID) values (?,?,?,?)", [answer.first_name, answer.last_name, answer.role_ID, answer.manager_ID], function (err) {
            console.log("Employee added!")
            start();
        })
    })
};

function addDept() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Would department would you like to add?",
    }).then(function (answer) {
        connection.query("INSERT INTO department (name) values (?)", answer.department, function (err) {
            console.log("Department added!")
            start();
        })
    })

};

function addRole() {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "What role title would you like to add?",
    },
    {
        name: "salary",
        type: "input",
        message: "What role salary would you like to add?",

    },
    {
        name: "department_id",
        type: "input",
        message: "What role department ID would you like to add?",

    }
    ]).then(function (answer) {
        connection.query("INSERT INTO role (title, salary, department_id) values (?,?,?)", [answer.title, answer.salary, answer.department_id], function (err) {
            console.log("Role added!")
            start();
        })
    })
        ;
};

function updateEmpRole() {
    connection.query("Select * FROM employee", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "empChoice",
                type: "rawlist",
                choices: function () {
                    var empArray = [];
                    for (var i = 0; i < results.length; i++) {
                        empArray.push(results[i].first_name);
                    }
                    return empArray;
                },
                message: "Which employee would you like to update?",
            },
        ]).then(function (results) {
        connection.query("Select * FROM role", function (err, results) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "roleChoice",
                    type: "rawlist",
                    choices: function () {
                        var roleArray = [];
                        for (var i = 0; i < results.length; i++) {
                            roleArray.push(results[i].title);
                        }
                        return roleArray;
                    },
                    message: "What is their new role?",
                }
            ]).then(function (answer) {
                connection.query(
                    "UPDATE employee SET employee.role_id = ? WHERE ?", [answer.roleChoice, answer.empChoice], function (err) {
                        if (err) throw err;
                        console.log("Employee role updated!");
                        start();
                    });
            });
        });
    });
})};
