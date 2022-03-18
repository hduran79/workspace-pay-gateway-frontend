import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';

function ResponseTransaction() {

  let params = useParams();
  const [response, setResponse] = useState({});

  useEffect(() => {
    axios.get(`/executive/get-transaction-response/${params.id}`).then((resp) => {
      resp.data.date = Moment(resp.data.date).format("DD/MM/YYYY");
      setResponse({ ...resp.data });
    });
  }, [params]);

  return (
    <>
      {response.response === "1" ? 
        <div className="Grid Grid--withGap Grid--alignCenter u-spaceTop u-text">
          <svg width="26" height="26" viewBox="0 0 26 26"
            className="Icon Icon--block u-round u-textSize6 u-textWhite u-bgGreen u-pad06">
            <polyline points="2,13 9,20 24,5" stroke-width="4" fill="none"></polyline>
          </svg>
          <div className="Grid-cell u-size1of1 u-padTopNone u-textCenter">
            <p className="u-borderEndsSm u-textBold u-pad06 u-spaceEnds">PAGO EXITOSO</p>
            <p>Hemos recibido tu pago de <strong>₡{response.amount}</strong> de <strong>manera exitosa</strong></p>
            <p>realizado por medio de nuestra plataforma.</p>
            <p>Con la siguiente información:</p>
            <p className="u-borderBottomSm u-inlineBlock u-spaceTop u-textBold">Información de pago</p>
          </div>
          <div className="Grid-cell u-size1of2 u-textRight u-textBold u-textSize01">
            <p>Transaction ID</p>
            <p>Valor</p>
            <p>Fecha</p>
          </div>
          <div className="Grid-cell u-size1of2 u-textLeft u-textSize01">
            <p>{response.transactionId}</p>
            <p>₡{response.amount}</p>
            <p>{response.date}</p>
          </div>
          <div className="Grid-cell u-size1of1 u-textCenter">
            <p className="u-textBold">Te hemos enviado la copia de esta transacción a tu correo electrónico.</p>
            <p>En caso de que necesites hacer consultas, comunícate al 0800 057 1234</p>
          </div>
          <div className="Grid-cell u-size1of1 u-textCenter">
            <p className="u-textBold">Muchas gracias.</p>
          </div>
          <div className="Grid-cell u-size1of1 u-textCenter">
            <button type="submit" className="Button u-spaceRight" onClick={() => window.print()}>Imprimir comprobante</button>
            <button type="submit" className="Button Button--success">Salir</button>
          </div>
        </div>
      :
        <div className="Grid Grid--withGap Grid--alignCenter u-spaceTop u-text">
          <svg width="26" height="26" viewBox="0 0 26 26"
            className="Icon Icon--block u-round u-textSize6 u-textWhite u-bgRed u-pad06">
            <g transform="rotate(45,13,13)">
              <line x1="13" y1="2" x2="13" y2="24" fill="none" stroke-width="4"></line>
              <line x1="2" y1="13" x2="24" y2="13" fill="none" stroke-width="4"></line>
            </g>
          </svg>
          <div className="Grid-cell u-size1of1 u-padTopNone u-textCenter">
            <p className="u-borderEndsSm u-textBold u-pad06 u-spaceEnds">PAGO FUE RECHAZADO</p>
            <p className="u-textBold u-spaceBottom">Hubo un error al procesar tu pago</p>
            <p>No pudimos avanzar con tu pago, si quieres puedes</p>
            <p>intentar con otro medio de pago.</p>
            <p className="u-spaceEnds">En caso de que necesites hacer consultas, comunícate al 0800 057 1234</p>
            <p className="u-textBold">Muchas gracias.</p>
          </div>
          <div className="Grid-cell u-size1of1 u-textCenter">
            <button type="submit" className="Button">Volver a pagar</button>
          </div>
        </div> 
      }
    </>
  );
}

export default ResponseTransaction;
