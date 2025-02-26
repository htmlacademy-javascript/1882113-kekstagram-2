const BASE_URL = 'https://32.javascript.htmlacademy.pro';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const Route = {
  GET: '/kekstagram/data',
  POST: '/kekstagram/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if(!response.ok) {
        throw new Error (errorText);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });


const getData = () => load(Route.GET, ErrorText.GET_DATA);

const sendData = (body) => load(Route.POST, ErrorText.SEND_DATA, Method.POST, body);


export {
  getData,
  sendData,
};
