import { Typography } from 'antd';
import React from 'react'

const { Title } = Typography;

export const Calculs = () => {

  function calcul() {

    var a = document.getElementById('entry').value;
    var b = document.getElementById('qtt').value;
    var c = document.getElementById('exit').value;
  
    var d = (b * c) - (a * b);
    var entry = (a * b);
    var exit = (b * c);
    var percentage = ((exit - entry) / entry) * 100;
    document.getElementById('proj').setAttribute('value', d);
    document.getElementById('percentage').setAttribute('value', percentage + '%');
    console.log(a, b, c, d, entry, exit, percentage);
  }

  return (
    <div>
      <Title>Calculs de PnL</Title>
      <label>Prix d'entrée :</label> <br />
      <input type='number' id='entry'></input> <br />

      <label>Quantité :</label> <br />
      <input type='number' id='qtt'></input> <br />

      <label>Prix de sortie :</label> <br />
      <input type='number' id='exit'></input> <br /><br /><br />

      <label>Projection :</label> <br />
      <input type='number' id='proj' disabled></input> <br />

      <label>Fluctuation (%) :</label> <br />
      <input id='percentage' disabled></input> <br /><br />

      <button type='submit' onClick={() => {calcul()}}>Calculer</button>
      <br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br />
    </div>
  )
}

export default Calculs;