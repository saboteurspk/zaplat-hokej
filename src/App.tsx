import {useState} from 'react'
import {QRCodeSVG} from "qrcode.react";
import {loadPlayers, PaymentStatusEnum, type Player, savePlayers} from "./storage.ts";

function loadOrInitializePlayers(): Player[] {
    return loadPlayers()
        ?? Array.from({length: 20}).map((_, index) => ({
            name: `Mazánek ${index + 1}`,
            number: index + 1,
            status: PaymentStatusEnum.None
        }));
}

function App() {
    const [players, setPlayers] = useState(loadOrInitializePlayers);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(undefined);
  
    function setPayment(payment: PaymentStatusEnum | undefined) {
        if (selectedPlayer && payment) {
            const newArray = players.map(x => x.number === selectedPlayer.number ? {...x, status: payment} : x);
            savePlayers(newArray);
            setPlayers(newArray);
        }
        setSelectedPlayer(undefined);
    }
    
  return (
  <div className="layout">
      {
          selectedPlayer
            ? (
                  <PaymentDetail player={selectedPlayer} close={setPayment} />
              )
              : ( 
                  <div className="main-grid">
                    {players.map((item, index) => (
                          <button
                              key={index}
                              className={`grid-item bg-payment ${item.status}`}
                              onClick={() => setSelectedPlayer(item)}
                          >
                              {item.name}
                          </button>
                      ))}
                    </div>
              )
      }
  </div>
  );
}

function PaymentDetail({player, close}: {player: Player, close: (paymentType: PaymentStatusEnum | undefined) => void}) {
  return (
      <div className="payment-detail">
        <div className="title">{player.name}</div>
        <div className="qr-container">
          <QRCodeSVG
              level="M"
              value="SPD*1.0*ACC:CZ7401000000002480210267*AM:270*CC:CZK*MSG:Hokej, Merta*X-VS:1"
              className="qr-code"
          />
        </div>
        <button className="bg-ok color-white" onClick={() => close(PaymentStatusEnum.PaidByCard)}>Zaplaceno</button>
        <button className="bg-warning color-white" onClick={() => close(PaymentStatusEnum.PaidByCash)}>Zaplatil jsem hotově</button>
        <button onClick={() => close(undefined)}>Zrušit</button>
      </div>
  );
}


export default App
