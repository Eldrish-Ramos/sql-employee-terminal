# SQL Employee Terminal

## Description

This project is a command-line application that allows users to manage a company's employee database. 
It uses Node.js, Inquirer, and PostgreSQL to provide an interface for viewing and interacting with the database.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Eldrish-Ramos/sql-employee-terminal.git
    cd sql-employee-terminal
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    - Ensure PostgreSQL is installed and running.
    - Create a `.env` file with your database credentials:
        ```env
        DB_USER=your_db_user
        DB_PASS=your_db_password
        ```

4. Run the database schema and seed files:
    ```sh
    psql -U your_db_user -f db/schema.sql
    psql -U your_db_user -f db/seeds.sql
    ```

## Usage

1. Start the application:
    ```sh
    node index.js
    ```

2. Follow the prompts to view and manage departments, roles, and employees.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.