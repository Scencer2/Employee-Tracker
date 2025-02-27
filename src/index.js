import inquirer from 'inquirer';
import * as departmentQueries from './queries/department.js';
import * as roleQueries from './queries/role.js';
import * as employeeQueries from './queries/employee.js';

const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add department',
            'Add role',
            'Add employee',
            'Update employee role',
            'Exit'
        ]
    });

    switch (action) {
        case 'View all departments':
            await viewAllDepartments();
            break;
        case 'View all roles':
            await viewAllRoles();
            break;
        case 'View all employees':
            await viewAllEmployees();
            break;
        case 'Add department':
            await addDepartment();
            break;
        case 'Add role':
            await addRole();
            break;
        case 'Add employee':
            await addEmployee();
            break;
        case 'Update employee role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            process.exit();
    }
};

const viewAllDepartments = async () => {
    const departments = await departmentQueries.getAllDepartments();
    console.table(departments);
    mainMenu();
};

const viewAllRoles = async () => {
    const roles = await roleQueries.getAllRoles();
    console.table(roles);
    mainMenu();
};

const viewAllEmployees = async () => {
    const employees = await employeeQueries.getAllEmployees();
    console.table(employees);
    mainMenu();
};

const addDepartment = async () => {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter department name:'
    });
    await departmentQueries.addDepartment(name);
    console.log('Department added!');
    mainMenu();
};

const addRole = async () => {
    const departments = await departmentQueries.getAllDepartments();
    const { title, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter salary:'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select department for the role:',
            choices: departments.map(department => ({
                name: department.name,
                value: department.id
            }))
        }
    ]);
    await roleQueries.addRole(title, salary, departmentId);
    console.log('Role added!');
    mainMenu();
};

const addEmployee = async () => {
    const roles = await roleQueries.getAllRoles();
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee last name:'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select employee role:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter manager ID (leave blank if none):',
            default: null
        }
    ]);
    await employeeQueries.addEmployee(firstName, lastName, roleId, managerId);
    console.log('Employee added!');
    mainMenu();
};

const updateEmployeeRole = async () => {
    const employees = await employeeQueries.getAllEmployees();
    const roles = await roleQueries.getAllRoles();
    const { employeeId, roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select employee to update:',
            choices: employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }))
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select new role for employee:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);
    await employeeQueries.updateEmployeeRole(employeeId, roleId);
    console.log('Employee role updated!');
    mainMenu();
};

mainMenu();
