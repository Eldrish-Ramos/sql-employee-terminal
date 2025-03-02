import inquirer from 'inquirer';
import pg from 'pg';
import express from 'express';
const { Pool } = pg;

const app = express();

const dbPool = new Pool 
({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: 'localhost',
    port: 5432,
});

const makeConnection = async () => {
    try {
        await dbPool.connect();
        console.log('Connected to database');
    } catch (err) {
        console.error(err);
    }
}

await makeConnection();

//middleware stuff
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function empTracking () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add Employee',
                'Update Employee Role',
                'Add Role',
                'Add Department',
                'Quit'
            ]
        }
    ])
    .then((answers) => {
        if(answers.prompt === 'View All Departments') {
            dbPool.query('SELECT * FROM department', (err, res) => {
                if(err) throw err;
                console.log(res.rows);
                empTracking();
            });
        } else if (answers.prompt === 'View All Roles') {
            dbPool.query('SELECT * FROM role', (err, res) => {
                if(err) throw err;
                console.log(res.rows);
                empTracking();
            });
        } else if (answers.prompt === 'View All Employees') {
            dbPool.query('SELECT * FROM employee', (err, res) => {
                if(err) throw err;
                console.log(res.rows);
                empTracking();
            });
        } else if (answers.prompt === 'Add Employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the employee\'s first name'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the employee\'s last name'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'Enter the employee\'s role ID'
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'Enter the employee\'s manager ID'
                }
            ])
            .then((answers) => {
                dbPool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, res) => {
                    if(err) throw err;
                    console.log('Employee added');
                    empTracking();
                });
            });
        } else if (answers.prompt === 'Update Employee Role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employee_id',
                    message: 'Enter the employee\'s ID'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'Enter the new role ID'
                }
            ])
            .then((answers) => {
                dbPool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id], (err, res) => {
                    if(err) throw err;
                    console.log('Employee role updated');
                    empTracking();
                });
            });
        } else if (answers.prompt === 'Add Role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the role title'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the role salary'
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: 'Enter the department ID'
                }
            ])
            .then((answers) => {
                dbPool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id], (err, res) => {
                    if(err) throw err;
                    console.log('Role added');
                    empTracking();
                });
            });
        } else if (answers.prompt === 'Add Department') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter the department name'
                }
            ])
            .then((answers) => {
                dbPool.query('INSERT INTO department (name) VALUES ($1)', [answers.name], (err, res) => {
                    if(err) throw err;
                    console.log('Department added');
                    empTracking();
                });
            });
        } else {
            dbPool.end();
            exit();
        }
    });
}

empTracking();