# To-Do List with Pro License and GraphQL

This is a Flask-based web application that allows users to manage a to-do list. The application includes features such as user authentication, a Pro license purchase system using Stripe, and a GraphQL API for managing to-dos.

## Features

- **To-Do List Management**: Add, edit, and delete to-do items.
- **Pro License**: Users can purchase a Pro license via Stripe to unlock additional features.
- **GraphQL API**: Provides a GraphQL endpoint for querying and mutating to-do items.
- **Responsive Design**: The UI is built with Bootstrap for a responsive and user-friendly experience.
- **Keycloak Integration**: Authentication is managed via Keycloak.
- **SQLite Database**: Stores to-do items persistently.

## Technologies Used

- **Backend**: Flask, Flask-SQLAlchemy
- **Frontend**: HTML, CSS, Bootstrap
- **GraphQL**: Ariadne
- **Payment Integration**: Stripe
- **Authentication**: Keycloak
- **Database**: SQLite
- **Environment Variables**: Python `dotenv`

## Installation

1. Clone the repository:
   ```bash
   git clone Porjects/Todo Application wite stripe Playment Integration
   cd Todo Application wite stripe Playment Integration

2. Create a virtual environment and activate it:
```
python -m venv venv
venv\Scripts\activate  # On Windows
```

3. Install dependencies:

```
pip install -r requirements.txt
```

4. Create a .env file in the root directory and add the following environment variables:

```
FLASK_SECRET_KEY=your_flask_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
KEYCLOAK_SERVER_URL=your_keycloak_server_url
REALM_NAME=your_realm_name
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=your_redirect_uri
```

5. Initialize the database:

```
python app.py
```

6. Run the application:

```
python app.py
```

7. Open your browser and navigate to http://127.0.0.1:5000.

## Usage
### To-Do List
- Add new to-do items using the form on the homepage.
- Edit or delete existing to-do items.

## Pro License
- Click the "Buy Pro" button to purchase a Pro license via Stripe.
- After a successful payment, you will gain access to Pro features.

## GraphQL API
- Access the GraphQL Playground at /graphql to query or mutate to-do items.

## Authentication
- The application uses Keycloak for user authentication. Ensure your Keycloak server is properly configured.
