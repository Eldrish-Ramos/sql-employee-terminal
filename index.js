import inquirer from 'inquirer';
import pg from 'pg';
const { Pool } = pg;

const dbPool = new Pool;


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
        } 
    });
}