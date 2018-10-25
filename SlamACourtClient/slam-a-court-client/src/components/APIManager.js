export default class APIManager {
    static getAllData = table => {
      return fetch(`https://localhost:5001/api/${table}`)
      .then(e => e.json());
    };
    // static addData = (table, data) => {
    //   return fetch(`http://localhost:5000//${table}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json; charset=utf-8"
    //     },
    //     body: JSON.stringify(data)
    //   }).then(e => e.json());
    // };
    // static deleteGamesByUserId = id => {
    //   return fetch(`http://localhost:5000/${id}`, {
    //     method: "DELETE"
    //   });
    // };
  }