import history from "../history";

/**
 * Se interceptor de errores para poder redireccionar
 * a la pantalla de error, cada que no se tenga permisos
 * para realizar alguna acción.
 *
 * request interceptor.
 */
function responseInterceptor() {
  return (error) => {
    if (!error.response) {
      history.push("403");
      return Promise.reject(error);
    }

    const {
      response: { status },
    } = error;
    if (status === 401) {
      history.push("401");
    } else if (status === 403) {
      history.push("403");
    }

    return Promise.reject(error);
  };
}

export default responseInterceptor;
