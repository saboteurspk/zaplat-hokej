import { useState } from 'react'
import { QRCodeSVG } from "qrcode.react";

const array = Array.from({ length: 10 }, () => ['Mazánek', 'Merta']).flat();

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | undefined>(undefined);
  
  if (selectedPlayer) {
    return <PaymentDetail name={selectedPlayer} close={() => setSelectedPlayer(undefined)} />
  }

  return (
    <div className="main-grid">
      {array.map((item, index) => (
          <button
              key={index}
              className="grid-item"
              onClick={() => setSelectedPlayer(item)}
          >
            {item}
          </button>
      ))}
    </div>
  )
}

function PaymentDetail({name, close}: {name: string, close: () => void}) {
  return (
      <div className="payment-detail" >
        <div className="title">{name}</div>
        <div className="qr-container">
          <QRCodeSVG
              value="https://example.com/some-data"
              className="qr-code"
          />
        </div>
        <button className="bg-ok color-white" onClick={close}>Zaplaceno</button>
        <button className="bg-warning color-white" onClick={close}>Zaplatil jsem hotově</button>
        <button onClick={close}>Zrušit</button>
      </div>
  );
}


export default App
