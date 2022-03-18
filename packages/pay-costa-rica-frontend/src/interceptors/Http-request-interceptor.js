/**
 * Interceptor para agregar a la cabecera Authorization de
 * todas las peticiones del backend.
 */

function requestInterceptor(jwt) {
  return (request) => {
    if (jwt) request.headers.Authorization = `Bearer ${jwt}`;
    return request;
  };
}

export default requestInterceptor;
