# EventGo

## Description

EventGo is an event management application developed using Django, React, Redux, and MySQL. The application showcases upcoming events, providing users with a comprehensive view of what's happening around them.

## Features

- **Event Showcase**: Displays upcoming events in an organized and user-friendly manner.
- **Real-Time Updates**: Implements real-time features for event management and database updates, ensuring users have the most current information.
- **Categorized Display**: Events are categorized for user convenience, making it easy to find the type of events users are interested in.
- **User Authentication**: Integrated user authentication with login and signup functionalities, ensuring a secure user experience.

## Technologies Used

- Django
- React
- Redux
- MySQL

## Setup and Installation

### Backend

1. Navigate to the event_go project directory.
2. Create a virtual environment: `python3 -m venv env`
3. Activate the virtual environment: `source env/bin/activate` (Unix/MacOS) or `.\env\Scripts\activate` (Windows)
4. Install the required Python packages: `pip install ...`
5. Run migrations: `python manage.py migrate`
6. Start the Django server: `python manage.py runserver`

### Frontend

1. Navigate to the React app directory.
2. Install the required npm packages: `npm install`
3. Start the React app: `npm start`

## Database Setup

1. **Install MySQL**: First, you need to have MySQL installed on your machine. You can download it from the official MySQL website.

2. **Create a new MySQL database**: After installing MySQL, you can create a new database for your project. Open the MySQL command line and enter the following command:

    ```sql
    CREATE DATABASE eventgo;
    ```

3. **Configure Django to use the MySQL database**: In the event_go settings (usually in the `settings.py` file), you need to change the `DATABASES` setting to something like this:

    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'event_go',
            'USER': 'your_mysql_username',
            'PASSWORD': 'your_mysql_password',
            'HOST': 'localhost',   # Or an IP Address that your DB is hosted on
            'PORT': '3306',
        }
    }
    ```

    Replace `your_database_name`, `your_mysql_username`, and `your_mysql_password` with your actual database name, MySQL username, and MySQL password, respectively.

4. **Install MySQL client**: Django needs a MySQL client to interact with the MySQL database. You can install it using pip:

    ```bash
    pip install mysqlclient
    ```

5. **Run migrations**: Finally, you can create the tables in your database by running Django's migrate command:

    ```bash
    python manage.py migrate
    ```

