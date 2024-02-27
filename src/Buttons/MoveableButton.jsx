import { useState } from "react";

const MoveableButton = () => {

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    const newX = Math.random() * (window.innerWidth - 100); // Subtract button width
    const newY = Math.random() * (window.innerHeight - 100); // Subtract button height
    setPosition({ x: newX, y: newY });
  };
  

  const handleMouseMove = (event) => {
    const threshold = 200; // Adjust the threshold as needed
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const isNearButton =
      mouseX > position.x - threshold &&
      mouseX < position.x + threshold &&
      mouseY > position.y - threshold &&
      mouseY < position.y + threshold;

    if (isNearButton) {
      moveButton();
    }
  };
  return (
    <div>
         <button
      style={{ position: 'absolute', top: position.y, left: position.x }}
      onMouseMove={handleMouseMove}
      className='bg-green-700 p-3 '
    >
      Catch Me If You Can
    </button>
    
    </div>
  );



}

export default MoveableButton