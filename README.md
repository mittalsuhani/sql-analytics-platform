# 🚀 SQL Analytics Platform

A full-stack SQL Analytics Platform that enables users to upload CSV datasets, store metadata in PostgreSQL, execute SQL queries, and visualize insights through interactive dashboards.

This project is being built using **FastAPI**, **PostgreSQL**, **React**, **SQLAlchemy**, and **Pandas** with a focus on clean architecture and production-ready backend practices.

---

## 📌 Features

### ✅ Completed
- FastAPI backend setup
- PostgreSQL database integration
- SQLAlchemy ORM configuration
- Dataset model creation
- REST API development
- Database connection testing
- Interactive API documentation using Swagger UI

### 🚧 In Progress
- CSV file upload
- Dataset metadata storage
- Pandas integration
- SQL query execution
- Data visualization dashboard

### 🔮 Planned Features
- User Authentication (JWT)
- Query history
- Saved SQL queries
- Export query results (CSV/Excel)
- AI-powered Natural Language to SQL
- Interactive charts and dashboards
- Role-based access control

---

## 🛠️ Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pandas
- Uvicorn
- Python Dotenv

### Frontend
- React
- Tailwind CSS
- Axios
- Recharts

### Database
- PostgreSQL

### Development Tools
- Git
- GitHub
- pgAdmin 4
- VS Code

---

## 📂 Project Structure

```text
sql-analytics-platform/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── uploads/
│   ├── venv/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│
├── database/
│
├── docs/
│
├── .gitignore
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/<your-username>/sql-analytics-platform.git
cd sql-analytics-platform
```

### Create Virtual Environment

```bash
cd backend

python -m venv venv
```

Activate the environment

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 🗄️ Configure PostgreSQL

Create a PostgreSQL database named

```text
sql_analytics_db
```

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/sql_analytics_db
```

---

## ▶️ Run the Backend

```bash
python -m uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## 📡 Current API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Welcome endpoint |
| POST | `/datasets` | Create a dataset |
| POST | `/upload` | Upload CSV file *(Work in Progress)* |

---

## 📖 Learning Objectives

This project is being developed to gain hands-on experience with:

- Backend Development
- REST APIs
- Database Design
- SQLAlchemy ORM
- PostgreSQL
- FastAPI
- Data Processing with Pandas
- Full-Stack Development
- Clean Project Architecture

---

## 🚀 Future Roadmap

- [ ] CSV Parsing using Pandas
- [ ] Store uploaded datasets
- [ ] Dynamic SQL Query Executor
- [ ] Dashboard Analytics
- [ ] Charts and Visualizations
- [ ] User Authentication
- [ ] Saved Queries
- [ ] Export Results
- [ ] AI-assisted SQL Generation
- [ ] Docker Support
- [ ] CI/CD Pipeline

---

## 📸 Screenshots

Screenshots will be added as development progresses.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.



## 👩‍💻 Author

**Suhani Mittal**

Computer Science (AI) Student | Backend Developer | Machine Learning Enthusiast

