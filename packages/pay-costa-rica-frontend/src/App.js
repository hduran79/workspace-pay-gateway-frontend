import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { GeneralError, NotAuth } from "pay-gateway-utility";
import history from "./history";
import Pay from "./components/Pay";
import ResponseTransaction from "./components/responseTransaction/responseTransaction";

function App() {
  return (
    <div className="Grid Grid--alignCenter">
      <div className="Grid-cell u-padSides u-sm-sizeFull u-lg-size8of12">
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<Pay />} />
            <Route path="response/:id" element={<ResponseTransaction />} />
            <Route path="403" element={<GeneralError />} />
            <Route path="401" element={<NotAuth />} />
          </Routes>
        </HistoryRouter>
      </div>
    </div>
  );
}

export default App;
