export default class APIManager {
  static registerUser = data => {
    return fetch(`https://apislamacourt.azurewebsites.net/api/user`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(e => e.json());
  };
  static getUserByEmail = email => {
    return fetch(`https://apislamacourt.azurewebsites.net/api/user?email='${email}'`)
      .then(e => e.json());
  };
  static getAllData = table => {
    return fetch(`https://apislamacourt.azurewebsites.net/api/${table}`)
      .then(e => e.json());
  };
  static getUserById = id => {
    return fetch(`https://apislamacourt.azurewebsites.net/api/user/${id}`)
      .then(e => e.json());
  };
  static getBookedTennisCourtById = id => {
    return fetch(`https://apislamacourt.azurewebsites.net/api/bookedtenniscourt/${id}`)
      .then(e => e.json());
  };
  static getBookedTennisCourtsByTennisCourtId = tcId => {
    return fetch(`https://apislamacourt.azurewebsites.net/api/bookedtenniscourt?tennisCourtId=${tcId}`)
      .then(e => e.json());
  };
  static getBookedTennisCourtsByUserId = uId => {
    return fetch(`https://apislamacourt.azurewebsites.net/api/bookedtenniscourt?userId=${uId}`)
      .then(e => e.json());
  };
  static bookTennisCourt = data => {
    return fetch(`https://apislamacourt.azurewebsites.net/api/bookedtenniscourt`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(e => e.json());
  };
  static addPartners = (id ,data) => {
    return fetch(`https://apislamacourt.azurewebsites.net/api/bookedtenniscourt/${id}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  };
  static deleteBookedTennisCourt = id => {
    return fetch(`https://apislamacourt.azurewebsites.net/api/bookedtenniscourt/${id}`, {
      method: "DELETE"
    });
  };
};