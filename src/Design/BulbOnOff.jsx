import { useState } from 'react';
import off from './assets/off.png'
import on from './assets/on.png'


const BulbOnOff = () => {
    const [isOn, setIsOn] = useState(false);
    const style = `
    
    .bulb{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px
      width: 200px;
    }
    img{
      height: 200px;
    }
    .switch{
      width: 200px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    button{
      border: none;
      background-color: orangered;
      color: white;
      padding: 7px 15px;
      cursor: pointer;
    }
    button:hover{
      background-color:white;
      color: #333333;
    }
    `
  
    const turnOn = () => {
      setIsOn(true);
    };
  
    const turnOff = () => {
      setIsOn(false);
    };
  
    return (
      <div className='bg-[#333333] min-h-screen'>
    <div
      dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
    ></div>
     <div className="container">
      <div className="bulb">
      <div id="off" style={{ display: isOn ? 'none' : 'block' }}>
              <img src={off} alt="" />
            </div>
            <div id="on" style={{ display: isOn ? 'block' : 'none' }}>
              <img src={on} alt="" />
            </div>
      </div>
      <div className="switch">
      <button onClick={turnOn}>ON</button>
            <button onClick={turnOff}>OFF</button>
      </div>
     </div>
  </div>
  
    );
  }
  
export default BulbOnOff