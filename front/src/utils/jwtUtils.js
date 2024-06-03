// import axios from 'axios';

// // Configura axios para incluir cookies en cada solicitud
// axios.defaults.withCredentials = true;

// export const api = axios.create({
//   baseURL: 'http://localhost:4002'
// });

// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 401) {
//       // Token ha expirado o es inválido
//       window.location.href = '/login'; // Redirige al usuario a la página de login
//     }
//     return Promise.reject(error);
//   }
// );
