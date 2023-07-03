const formatDate = (stringDate) => {
  const date = new Date(stringDate);
  const options = {
    weekday: "short",
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  };
  return date.toLocaleDateString("ru-RU", options);
};

function checkNotValidEmail(inputData_email) {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  let messageError = "";
  if (inputData_email.trim().length === 0) {
    messageError = `Введите ваш email`;
  } else if (inputData_email.trim().length < 6) {
    messageError = `Поле содержит меньше 6-х символов `;
  } else if (!pattern.test(inputData_email.trim())) {
    messageError = `Некорректный email`;
  }
  return messageError;
}

function checkNotValidPassword(inputData_password) {
  let messageError = "";
  if (inputData_password.trim().length === 0) {
    messageError = `Введите ваш password`;
  } else if (inputData_password.trim().length < 3) {
    messageError = `Пароль содержит меньше 3-х символов `;
  } else if (inputData_password.trim().length > 12) {
    messageError = `Пароль слишком большой, более 12 символов `;
  }
  return messageError;
}

export { formatDate, checkNotValidEmail, checkNotValidPassword };
