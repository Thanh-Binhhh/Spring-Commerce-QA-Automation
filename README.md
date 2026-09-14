Automated testing project for the [Spring-Commerce](https://github.com/Thanh-Binhhh/Spring-Commerce) application using **Playwright**. This project was created to demonstrate practical Automation Tester skills, including:

1. API testing
2. End-to-End testing
3. Git & GitHub
4. CI/CD with GitHub Actions
5. Automated test reporting

# 🧭 Project Roadmap

### 1. API Testing

Automated API testing for the Spring Boot backend using Playwright and TypeScript.

Implemented tasks:

- Configure Playwright API testing environment
- Configure backend `baseURL`
- Create positive test scenarios
- Create negative test scenarios
- Validate HTTP status codes
- Validate JSON response structure
- Validate response data types
- Test query parameters

### 2. E2E Testing

Use Playwright to automate browser interactions.

Implemented tasks:

- Open the Products page
- Verify that products are rendered on the UI
- Validate product name and price
- Run tests using Chromium

### 3. Git & GitHub

Git and GitHub are used to manage the automation project and track source code changes.

Planned tasks:

- Commit test changes
- Push source code to GitHub
- Maintain a clean repository structure
- Configure `.gitignore`

### 4. CI/CD with GitHub Actions

Playwright tests are automatically executed using GitHub Actions.

The CI pipeline automatically:

1. Checks out the automation repository
2. Installs Node.js dependencies
3. Installs Playwright Chromium
4. Checks out the Spring Boot backend
5. Checks out the frontend source code
6. Configures Java 21
7. Starts MySQL using Docker Compose
8. Starts the Spring Boot backend
9. Starts the frontend web server
10. Runs Playwright API and E2E tests
11. Uploads the Playwright HTML report as a GitHub Actions artifact

The workflow is triggered automatically on:

```text
push → main
pull_request → main
workflow_dispatch
```

This allows automated regression testing whenever new changes are pushed to the repository.

### 5. Playwright HTML Report

Playwright HTML reports are generated after test execution.

The report can be used to:

- Review passed and failed test cases
- Check test execution details
- View error messages
- Debug failed tests

# 🛠️ Project Development Guide

### 1. API Testing

The API test suite validates REST APIs provided by the [Spring Boot backend](https://github.com/Thanh-Binhhh/Spring-Commerce).

#### Creating the Playwright Test project

```
mkdir playwright-tests
cd playwright-tests
npm init -y
npm install -D @playwright/test
```

Then create the following structure

```
playwright-tests/
│   ├── tests/api/                  // folder contains all automated API test files
│   │   ├── categories.spec.ts
│   │   └── plants.spec.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── playwright.config.ts
│   └── README.md
```

#### Running API Tests

Before running Playwright tests, make sure the Spring-Commerce backend is running.

Next, navigate to the Playwright test directory and install the required dependencies

```
cd playwright-tests
npm install
```

Run all automated tests:

```
npx playwright test
```

Run a specific test file:

```
npx playwright test tests/api/categories.spec.ts
```

### 2. E2E

The E2E test suite validates the application from the user's point of view using Chromium. It verifies that the frontend can communicate correctly with the backend and display data on the user interface.

The frontend source code is located in the `front-end` branch of the Spring Commerce repository.

#### Adding E2E Tests

Add an `e2e` directory inside the `tests` folder

```
playwright-tests/
│
├── tests/
│   ├── api/
│   └── e2e/
│       └── plants.spec.ts
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

Next, install Chromium

```
npx playwright install chromium
```

#### Run the E2E test

```bash
npx playwright test tests/e2e/plants.spec.ts
```

Run the test in headed mode to see the browser while the test is running:

```
npx playwright test tests/e2e/plants.spec.ts --headed
```

### 3. Git & Github

### 4. Github Workflow

The CI environment automatically creates the complete application test environment. This allows automated regression tests to run without manually starting the application.

### 5. HTML report
lỗi name: Playwright Tests

on:
  push:
    branches: [main]

  pull_request:
    branches: [main]

  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      # 1. Get Playwright automation code
      - name: Checkout Playwright tests
        uses: actions/checkout@v4

      # 2. Install Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      # 3. Install Playwright dependencies
      - name: Install dependencies
        run: npm ci

      - name: Install Chromium
        run: npx playwright install --with-deps chromium

      # 4. Get backend code from main branch
      - name: Checkout backend
        uses: actions/checkout@v4
        with:
          repository: Thanh-Binhhh/Spring-Commerce
          ref: main
          path: backend

      # 5. Get frontend code from frontend branch
      - name: Checkout frontend
        uses: actions/checkout@v4
        with:
          repository: Thanh-Binhhh/Spring-Commerce
          ref: frontend
          path: frontend

      # 6. Setup Java
      - name: Setup Java 21
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 21
          cache: maven

      # 7. Start MySQL
      - name: Start MySQL
        working-directory: backend
        run: docker compose up -d

      - name: Wait for MySQL
        working-directory: backend
        run: |
          for i in {1..30}; do
            if docker compose exec -T mysql mysqladmin ping -h localhost -uroot --silent; then
              echo "MySQL is ready"
              exit 0
            fi

            echo "Waiting for MySQL..."
            sleep 2
          done

          exit 1

      # 8. Start Spring Boot backend
      - name: Start backend
        working-directory: backend
        run: |
          chmod +x mvnw
          nohup ./mvnw spring-boot:run > ../backend.log 2>&1 &

      - name: Wait for backend
        run: |
          for i in {1..60}; do
            if curl -f "http://localhost:8080/plants?currentPage=0"; then
              echo "Backend is ready"
              exit 0
            fi

            echo "Waiting for backend..."
            sleep 2
          done

          cat backend.log
          exit 1

      # 9. Start frontend on port 5500
      - name: Start frontend
        run: |
          nohup python3 -m http.server 5500 --directory frontend > frontend.log 2>&1 &

      - name: Wait for frontend
        run: |
          for i in {1..30}; do
            if curl -f "http://localhost:5500/pages/products.html"; then
              echo "Frontend is ready"
              exit 0
            fi

            sleep 1
          done

          exit 1

      # 10. Run API + E2E tests
      - name: Run Playwright tests
        run: npx playwright test

      # 11. Save HTML report
      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7


Ừ, bố cục như vậy sẽ chuyên nghiệp hơn. Phần đầu README nên dành cho giới thiệu dự án, kỹ năng, roadmap, công nghệ, cấu trúc tổng quan; còn toàn bộ câu lệnh npm, npx playwright, cách cài đặt, chạy test, report… gom xuống một mục lớn Hướng dẫn phát triển dự án.

Bạn có thể chỉnh README thành cấu trúc sau:

# 🌿 Spring Commerce QA Automation

![Playwright](https://img.shields.io/badge/Playwright-TypeScript-2EAD33?logo=playwright)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs)
![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk)

Automation testing project for the **Spring Commerce** application using Playwright.

This project demonstrates practical skills required for an **Automation Tester / QA Automation Engineer**, including API testing, End-to-End testing, Git, CI/CD and automated test reporting.

🔗 **Application Repository:**  
[Spring-Commerce](https://github.com/Thanh-Binhhh/Spring-Commerce)

---

# 🧭 Project Roadmap

## 1. Playwright API Testing ✅

Automated API testing for the Spring Boot backend using Playwright.

### Implemented

- Configure Playwright API testing environment
- Configure backend `baseURL`
- Create positive and negative test cases
- Validate HTTP status codes
- Validate JSON response structure
- Validate response data types
- Validate response values
- Test query parameters
- Test pagination

---

## 2. Playwright E2E Testing ✅

Automated browser testing for the Spring Commerce frontend.

### Implemented

- Open the Products page
- Verify page loading
- Verify products are rendered
- Validate product names
- Validate product prices
- Validate frontend data retrieved from backend APIs
- Execute tests using Chromium

---

## 3. Git & GitHub ✅

Source code and automation tests are managed using Git and GitHub.

### Implemented

- Git version control
- Structured commits
- Push automation code to GitHub
- Maintain a clean repository structure
- Configure `.gitignore`
- Separate source code from generated test files

---

## 4. GitHub Actions CI/CD ✅

The project is integrated with GitHub Actions.

The CI pipeline automatically performs the following workflow:

```text
Checkout QA Automation
        ↓
Install Node.js Dependencies
        ↓
Install Playwright Chromium
        ↓
Checkout Backend
        ↓
Checkout Frontend
        ↓
Setup Java 21
        ↓
Start MySQL
        ↓
Start Spring Boot Backend
        ↓
Start Frontend
        ↓
Run Playwright Tests
        ↓
Upload HTML Report
```

The workflow runs automatically when code is pushed or a pull request is created for the `main` branch.

---

## 5. Playwright HTML Report ✅

Playwright HTML reports are generated after automated test execution.

The report provides information about:

- Passed and failed tests
- Execution duration
- Test steps
- Error messages
- Failure details
- Debugging information

GitHub Actions also uploads the generated Playwright report as an artifact after every CI execution.

---

# 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Playwright | API and E2E automation |
| TypeScript / JavaScript | Test implementation |
| Node.js | Test runtime |
| Spring Boot | Backend application |
| Java 21 | Backend runtime |
| MySQL | Application database |
| Docker Compose | Database environment |
| Git | Version control |
| GitHub | Source code management |
| GitHub Actions | CI/CD |
| Chromium | E2E browser |

---

# 📁 Project Structure

```text
Spring-Commerce-QA-Automation/
│
├── tests/
│   │
│   ├── api/
│   │   ├── categories.spec.ts
│   │   └── plants.spec.ts
│   │
│   └── e2e/
│       └── plants.spec.js
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── package.json
├── package-lock.json
├── playwright.config.ts
├── .gitignore
└── README.md
```

---

# 🌷 API Testing

The API test suite validates REST APIs provided by the Spring Boot backend.

Current API testing focuses on resources such as:

```text
categories
plants
```

The automation verifies the API at multiple levels:

```text
HTTP Status
      ↓
Response Structure
      ↓
Data Types
      ↓
Response Values
      ↓
Query Parameters
      ↓
Negative Scenarios
```

Example API endpoint:

```http
GET /plants?currentPage=0
```

---

# 🎭 E2E Testing

The E2E test suite validates the application from the user's perspective using Chromium.

Frontend source code is located in the:

```text
front-end
```

branch of the Spring Commerce repository.

Typical E2E test flow:

```text
Launch Browser
      ↓
Open Products Page
      ↓
Wait for Product Data
      ↓
Verify Product List
      ↓
Validate Product Name
      ↓
Validate Product Price
```

This helps verify that the frontend, backend and database work together correctly.

---

# 🔄 CI/CD Architecture

The CI environment automatically creates the complete application test environment.

```text
GitHub Actions Runner
        │
        ├── MySQL
        │
        ├── Spring Boot Backend
        │
        ├── Frontend
        │
        └── Playwright
              ├── API Tests
              └── E2E Tests
```

Backend source:

```text
Spring-Commerce
└── main
```

Frontend source:

```text
Spring-Commerce
└── front-end
```

This allows automated regression tests to run without manually starting the application.

---

# 🧩 Hướng dẫn phát triển dự án

Phần này hướng dẫn cách cài đặt môi trường, chạy ứng dụng và phát triển bộ kiểm thử tự động.

## 1. Yêu cầu môi trường

Before running the automation project locally, install:

```text
Git
Node.js
npm
Java 21
Docker
```

---

## 2. Clone Automation Repository

```bash
git clone https://github.com/Thanh-Binhhh/Spring-Commerce-QA-Automation.git
```

Di chuyển vào thư mục project:

```bash
cd Spring-Commerce-QA-Automation
```

---

## 3. Cài đặt dependencies

Cài đặt Node.js dependencies:

```bash
npm install
```

Trong môi trường CI có thể sử dụng:

```bash
npm ci
```

Cài Chromium cho Playwright:

```bash
npx playwright install chromium
```

Nếu cần cài thêm system dependencies:

```bash
npx playwright install --with-deps chromium
```

---

## 4. Chạy toàn bộ test

```bash
npx playwright test
```

---

## 5. Chạy API Test

Chạy toàn bộ API tests:

```bash
npx playwright test tests/api
```

Chạy test Categories:

```bash
npx playwright test tests/api/categories.spec.ts
```

Chạy test Plants:

```bash
npx playwright test tests/api/plants.spec.ts
```

---

## 6. Chạy E2E Test

Chạy toàn bộ E2E tests:

```bash
npx playwright test tests/e2e
```

Chạy riêng Products E2E:

```bash
npx playwright test tests/e2e/plants.spec.js
```

---

## 7. Chạy browser ở Headed Mode

Để quan sát Playwright thao tác trực tiếp trên trình duyệt:

```bash
npx playwright test tests/e2e/plants.spec.js --headed
```

---

## 8. Chạy theo Playwright Project

Nếu `playwright.config.ts` đã cấu hình project `e2e`:

```bash
npx playwright test --project=e2e
```

---

## 9. Generate HTML Report

Chạy test và tạo HTML report:

```bash
npx playwright test --reporter=html
```

Hoặc:

```bash
npx playwright test --project=e2e --reporter=html
```

Mở report:

```bash
npx playwright show-report
```

---

## 10. Quy trình phát triển test mới

Khi phát triển một test case mới, workflow đề xuất là:

```text
Identify Test Scenario
        ↓
Create Test Case
        ↓
Run Test Locally
        ↓
Debug Failed Test
        ↓
Review HTML Report
        ↓
Commit Changes
        ↓
Push to GitHub
        ↓
GitHub Actions
        ↓
Review CI Result
```

---

## 11. Git Workflow

Kiểm tra file đã thay đổi:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Add new Playwright test cases"
```

Push:

```bash
git push
```

Sau khi push lên `main`, GitHub Actions sẽ tự động chạy bộ automation test.

---

## 12. Kiểm tra GitHub Actions Report

Sau khi workflow hoàn tất:

```text
GitHub Repository
      ↓
Actions
      ↓
Playwright Tests
      ↓
Workflow Run
      ↓
Artifacts
      ↓
playwright-report
```

Tải artifact và mở:

```text
playwright-report/index.html
```

để xem kết quả test.

---

# 🎯 Testing Objectives

The purpose of this project is to demonstrate the complete QA Automation workflow:

```text
Test Design
    ↓
Automation
    ↓
Version Control
    ↓
Continuous Integration
    ↓
Test Execution
    ↓
Reporting
    ↓
Debugging
```

The project focuses not only on writing Playwright tests but also on building a maintainable and automated testing workflow.

---

# 🔮 Future Improvements

- Page Object Model
- Reusable fixtures
- Authentication testing
- Shopping cart automation
- Checkout flow automation
- Data-driven testing
- Cross-browser testing
- Firefox and WebKit
- API data setup and cleanup
- Database validation
- Environment configuration
- Screenshot on failure
- Video recording
- Playwright Trace Viewer
- Test tagging
- Smoke test suite
- Regression test suite
- Parallel execution
- GitHub Actions matrix testing
- Dockerized automation environment

---

# 📌 Project Status

| Feature | Status |
|---|---|
| API Automation | ✅ Implemented |
| E2E Automation | ✅ Implemented |
| Git / GitHub | ✅ Implemented |
| GitHub Actions | ✅ Implemented |
| HTML Report | ✅ Implemented |
| Page Object Model | ⏳ Next |
| Advanced E2E Testing | ⏳ Planned |

---

# 👨‍💻 Author

**Thanh-Binhhh**

GitHub: [github.com/Thanh-Binhhh](https://github.com/Thanh-Binhhh)

Như vậy phần trên README sẽ thiên về show năng lực cho nhà tuyển dụng, còn từ # 🧩 Hướng dẫn phát triển dự án trở xuống mới bắt đầu có npm, npx, git, cách chạy test, report và quy trình code. Bố cục này hợp với portfolio hơn nhiều vì HR đọc nửa đầu đã hiểu bạn làm được gì mà chưa phải nhìn một đống command.

Hướng dẫn phát triển dự án    tiếng anh sao? cho cái icon unicode tương ứng luôn đi

Bạn có thể dùng tiêu đề:

# 🛠️ Project Development Guide

Trong đó:

Project Development Guide = Hướng dẫn phát triển dự án
🛠️ = biểu tượng công cụ/phát triển, Unicode: U+1F6E0

Nếu muốn ngắn và tự nhiên hơn trong README kỹ thuật:

# 🛠️ Development Guide

Mình khuyên dùng 🛠️ Project Development Guide vì rõ nghĩa và chuyên nghiệp hơn.

Automated testing project for the [Spring-Commerce](https://github.com/Thanh-Binhhh/Spring-Commerce) application using **Playwright**.

This project was created to demonstrate practical Automation Tester skills, including:

1. API testing

2. End-to-End testing

3. Git & GitHub

4. CI/CD with GitHub Actions

5. Automated test reporting

# 🧭 Project Roadmap

### 1. API Testing

Automated API testing for the Spring Boot backend using Playwright and TypeScript.

Implemented tasks:

- Configure Playwright API testing environment

- Configure backend `baseURL`

- Create positive test scenarios

- Create negative test scenarios

- Validate HTTP status codes

- Validate JSON response structure

- Validate response data types

- Test query parameters

### 2. E2E Testing

Use Playwright to automate browser interactions.

Implemented tasks:

- Open the Products page

- Verify that products are rendered on the UI

- Validate product name and price

- Run tests using Chromium

### 3. Git & GitHub

The automation project is maintained using Git and GitHub.

Planned tasks:

- Commit test changes

- Push source code to GitHub

- Maintain a clean repository structure

- Configure `.gitignore`

### 4. CI/CD with GitHub Actions

Playwright tests are automatically executed using GitHub Actions.

The CI pipeline automatically:

1. Checks out the automation repository

2. Installs Node.js dependencies

3. Installs Playwright Chromium

4. Checks out the Spring Boot backend

5. Checks out the frontend source code

6. Configures Java 21

7. Starts MySQL using Docker Compose

8. Starts the Spring Boot backend

9. Starts the frontend web server

10. Runs Playwright API and E2E tests

11. Uploads the Playwright HTML report as a GitHub Actions artifact

The workflow is triggered automatically on:

```text

push → main

pull_request → main

workflow_dispatch

```

This allows automated regression testing whenever new changes are pushed to the repository.

### 5. Playwright HTML Report

Playwright HTML reports are generated after test execution.

Implemented / planned tasks:

- Generate HTML reports after test execution

- Review passed and failed test cases

- Debug failed tests using report information

# 🛠️ Project Development Guide

### 1. API Testing

The API test suite validates REST APIs provided by the Spring Boot backend.

Backend repository: [Spring-Commerce](https://github.com/Thanh-Binhhh/Spring-Commerce)

#### Creating the Playwright Test Project from scratch

```

mkdir playwright-tests

cd playwright-tests

npm init -y

npm install -D @playwright/test

```

Then create the following structure

```

playwright-tests/

│   ├── tests/api/                  // folder contains all automated API test files

│   │   ├── categories.spec.ts

│   │   └── plants.spec.ts

│   ├── package.json

│   ├── package-lock.json

│   ├── playwright.config.ts

│   └── README.md

```

#### Getting started

Before running Playwright tests, make sure the Spring-Commerce backend is running.

Next, navigate to the Playwright test directory and install the required dependencies

```

cd playwright-tests

npm install

```

Run all automated tests:

```

npx playwright test

```

Run a specific test file:

```

npx playwright test tests/api/categories.spec.ts

```

### 2. E2E

The E2E test suite validates the application from the user's perspective using Chromium. This helps verify that the frontend, backend and database work together correctly.

Frontend source code is located in the `front-end` branch of the Spring Commerce repository.

#### Creating the Playwright Test Project from scratch

Add an `e2e` folder following the structure illustrated below.

```

playwright-tests/

│   ├── tests/

│   │   ├── api/

│   │   └── e2e

│   │   │   └── plants.spec.ts

│   ├── package.json

│   ├── package-lock.json

│   ├── playwright.config.ts

│   └── README.md

```

Next, install the required dependencies

```

npx playwright install chromium

```

#### Getting started

```

npx playwright test tests/e2e/plants.spec.js --headed

```

### 3. Git & Github

### 4. Github Workflow

The CI environment automatically creates the complete application test environment. This allows automated regression tests to run without manually starting the application.

### 5. HTML Report

Playwright provides an HTML report that shows detailed test results.

Run the tests and generate an HTML report:
```
npx playwright test --reporter=html
npx playwright show-report
```