# Expense Tracker
![image](/public/images/S3_A2_02.png)
![image](/public/images/S3_A2_01.png)

## Features
- Register via email, Facebook, or Google account
- Reset password via email if user forgot password
- Login to see user's own expense records
- Select records by category, year, and month
- CRUD features for records

## Getting Start

1. Clone the project

```
git clone https://github.com/flowerhahaha/expense-tracker.git
```

2. Install the required dependencies

```
npm install
```

3. Install nodemon 

```
npm i nodemon
```

4. Set environment variables in .env file according to .env.example

```
touch .env
```

5. Seed your database 

```
npm run seed
```

6. Start the server

```
npm run dev
```

7. Execute successfully if seeing following message

```
App is running on http://localhost:3000
mongoDB connected!
```

## Built With
-  Runtime: node @ 16.14.2
-  Framework: express @ 4.17.1
-  Database: mongoose @ 6.3.8
-  View Engine: express-handlebars @ 4.0.2
-  Check package.json for other dependencies
