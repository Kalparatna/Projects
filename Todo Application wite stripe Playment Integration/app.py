from flask import Flask, redirect, url_for, session, request, render_template, jsonify
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from ariadne import QueryType, MutationType, graphql_sync, make_executable_schema

import os
import stripe
import logging

# Load environment variables
load_dotenv()

# Stripe configuration
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')
STRIPE_PUBLIC_KEY = os.getenv('STRIPE_PUBLIC_KEY')
stripe.api_key = STRIPE_SECRET_KEY

# Flask app setup
app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Database setup
db = SQLAlchemy(app)
logging.basicConfig(level=logging.DEBUG)

# Keycloak configuration
keycloak_server_url = os.getenv('KEYCLOAK_SERVER_URL')
realm_name = os.getenv('REALM_NAME')
client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
redirect_uri = os.getenv('REDIRECT_URI')

# Database model
class ToDo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)

# GraphQL schema definitions
type_defs = """
    type Query {
        todos: [ToDo!]!
    }

    type ToDo {
        id: ID!
        title: String!
        completed: Boolean!
    }

    type Mutation {
        createToDo(title: String!): ToDo!
        toggleToDoCompletion(id: ID!): ToDo!
    }
"""

# GraphQL resolvers
query = QueryType()
mutation = MutationType()

@query.field("todos")
def resolve_todos(_, info):
    todos = ToDo.query.all()
    return [{"id": todo.id, "title": todo.title, "completed": todo.completed} for todo in todos]

@mutation.field("createToDo")
def resolve_create_todo(_, info, title):
    new_todo = ToDo(title=title)
    db.session.add(new_todo)
    db.session.commit()
    return {"id": new_todo.id, "title": new_todo.title, "completed": new_todo.completed}

@mutation.field("toggleToDoCompletion")
def resolve_toggle_todo_completion(_, info, id):
    todo = ToDo.query.get(id)
    if todo:
        todo.completed = not todo.completed
        db.session.commit()
        return {"id": todo.id, "title": todo.title, "completed": todo.completed}
    return None

schema = make_executable_schema(type_defs, query, mutation)

# Routes
@app.route('/')
def home():
    is_pro = session.get('is_pro', False)
    return render_template('home.html', is_pro=is_pro)

@app.route('/buy_pro')
def buy_pro():
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price_data': {
                'currency': 'usd',
                'product_data': {'name': 'Pro License'},
                'unit_amount': 2000,
            },
            'quantity': 1,
        }],
        mode='payment',
        success_url=url_for('payment_success', _external=True),
        cancel_url=url_for('payment_cancel', _external=True),
    )
    # Redirect the user to the Stripe Checkout page
    return redirect(session.url)
    return jsonify({'checkout_url': session.url})

@app.route('/payment_success')
def payment_success():
    session['is_pro'] = True
    return render_template('payment_success.html', message="Your payment was successful!")

@app.route('/payment_cancel')
def payment_cancel():
    return render_template('payment_cancel.html', message="Your payment was canceled.")

@app.route('/graphql', methods=['GET'])
def graphql_playground():
    # Serve GraphQL Playground HTML
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset=utf-8/>
        <title>GraphQL Playground</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/css/index.css" />
        <link rel="shortcut icon" href="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/favicon.png" />
        <script src="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/js/middleware.js"></script>
    </head>
    <body>
        <div id="root"></div>
        <script>window.addEventListener('load', function (event) { GraphQLPlayground.init(document.getElementById('root'), { endpoint: '/graphql' }) })</script>
    </body>
    </html>
    """, 200

@app.route('/graphql', methods=['POST'])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(schema, data, context_value=request, debug=app.debug)
    status_code = 200 if success else 400
    return jsonify(result), status_code

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True)