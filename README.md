Here’s your updated `README.md` with **screenshots properly embedded** (assuming you save them in a `screenshots` folder inside the root directory of the project):

---

````markdown
# MoneyMate

**MoneyMate** is a sleek and intuitive personal finance tracking app designed to help users monitor and manage their income and expenses effortlessly.

## 🚀 Features

- 💰 Track income and expenses
- 📊 Visual analytics and reports
- 🧾 Add categorized transactions
- 🔒 Biometric lock & dark mode support
- 📤 Export reports as CSV or PDF
- 🌐 Built with React + TypeScript

---

## 🖼️ Screenshots

### 💼 Dashboard Overview
Displays current balance, total income, total expenses, and recent transactions.

![Dashboard](./screenshots/Screenshot%202025-05-04%20191709.png)

---

### ➕ New Transaction Form
Add new income or expense entries with category, amount, and optional notes.

![New Transaction](./screenshots/Screenshot%202025-05-04%20191726.png)

---

### 📈 Analytics Page
Provides visual spending insights by category and monthly overview.

![Analytics](./screenshots/Screenshot%202025-05-04%20191817.png)

---

### ⚙️ Settings Page
Customize preferences like dark mode and biometric lock, and export data.

![Settings](./screenshots/Screenshot%202025-05-04%20191836.png)

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Charts**: Chart.js or similar (for analytics)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/niyaz-zz/MoneyMate.git
cd MoneyMate
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the App

```bash
npm start
```

---

## 📂 Project Structure

```plaintext
MoneyMate/
├── app/
├── assets/
├── components/
├── hooks/
├── types/
├── utils/
├── screenshots/
│   ├── Screenshot 2025-05-04 191709.png
│   ├── Screenshot 2025-05-04 191726.png
│   ├── Screenshot 2025-05-04 191817.png
│   └── Screenshot 2025-05-04 191836.png
├── .env
├── package.json
├── README.md
└── ...
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature/yourFeature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/yourFeature`
5. Create a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

