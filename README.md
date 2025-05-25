# Project Name

Multivendors Ecommerce Solution

## Technologies Used

- PHP / Laravel 
- MySQL
- Vue

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Git
- PHP >= 8.x
- Composer
- Node.js and NPM (if using Laravel Mix or similar)
- MySQL or any supported database

### Installation

1. **Clone the repository**
```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/devbik069/multivendors-ecommerce-laravel-vue.git)
   cd multivendors-ecommerce-laravel-vue
```
2. **For Backend server
   
```bash
   
   cd Backend-server
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
```
> php server is started on this url [http://localhost:8800/](http://127.0.0.1:8000/)

3. **For frontend
```bash
   cd frontend
   npm install
   npm run dev
```
> Run frontend on this url [http://localhost:5173/](http://localhost:5173/)


   
