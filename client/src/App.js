import React, { useEffect, useRef, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ReceiptPrintDisplay from "./components/ReceiptPrintNormal";
import rateService from "./services/globalRates";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [globalReceipt, setGlobalReceipt] = useState(null);
  let globalRates = useRef({ sellRate: 0, buyRate: 0 });

  useEffect(() => {
    rateService.getRates()
      .then((data) => {
        globalRates.current = { sellRate: data.sell_rate, buyRate: data.buy_rate };
      })
  }, [])

  return (
    <div>
      {
        !loggedin ? 
          <Login setLoggedin={setLoggedin} /> :
          <>
            <Dashboard globalRates={globalRates} setGlobalReceipt={setGlobalReceipt} />
            {
              globalReceipt && <ReceiptPrintDisplay reprint={globalReceipt.reprint} displayData={globalReceipt.displayData} latestBalance={globalReceipt.latestBalance} />
            }
          </>
      }
    </div>
  );
}

export default App;
