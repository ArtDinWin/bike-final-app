### Специализация «Frontend-разработчик» 2023 год
# Финальный проект
## Сервис проката: «Поиск пропавших велосипедов»

![Preview](https://raw.githubusercontent.com/ArtDinWin/bike-final-app/1587d09707c6b9df42f6d21361ab377f90040c90/preview.jpg)

### ПОСТАНОВКА ЗАДАЧИ
Известная компания, занимающаяся прокатом велосипедов в крупных городах России, испытывает проблемы с частой кражей их имущества (велосипедов). Как возможное решение проблемы, компания хочет вести учёт этих случаев и отслеживать прогресс. Их собственные разработчики уже подготовили серверную часть приложения, вам же требуется реализовать клиентскую часть.

Клиентская часть предназначена как для сотрудников компании, так и для обычных пользователей. Обычному пользователю доступна только ограниченная часть функционала: главная страница и страница с возможностью сообщить о новом случае кражи.

### Что реализовано?
1. Взаимодействие фронтенда SPA на React.js v18 и Redux c готовым API
2. Для авторизованных запросов используется Bearer Token 
3. Запросы к бекенд-серверу через запросы axios
4. Страницы доступные всем пользователям без авторизации:
- Главная / Сообщить о краже (сохранение обращения на стороне сервера) / Регистрация / Вход (Авторизация)
5. Страницы доступные только авторизованным пользователям:
- Кражи / Сотрудники / Детальное описание по каждой краже / Детальное описание по каждому сотруднику с возможностью редактировать данные / Добавление и удаление нового сотрудника / Добавление и удаление нового сообщения о краже
6. Дополнительно реализован быстрый поиск по кражам и сотрудникам по условию
7. Наличие кнопки Выйти из аккаунта
8. Использование функциональных компонентов, встроенных хуков, внутреннего state и Redux toolkit Store

### Технологии:
- HTML5, CSS3, SCSS
- JavaScript
- React18/Redux

#### Посмотреть можно здесь - https://artdinwin.github.io/bike-final-app/

Можно воспользоваться тестовой регистрацией для входа на сайт, используя следующие данные:
- email: **test@testmail1.ru**
- пароль: **1234qwer**


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
