const Button = ({ text, bgColor, textColor, icon: Icon }) => {
  return (
    <button 
    style={{ boxShadow: '0px 2px 24px 0px rgba(0, 0, 0, 0.10)' }}
    className={`px-12 py-6 text-xl font-semibold bg-${bgColor} text-${textColor} drop-shadow-2xl flex justify-center items-center gap-3`}
  >
    <span>{text}</span> {Icon && <Icon />}
  </button>
  );
};

export default Button;

// install react icon using following 
// npm install react-icons --save
// at the component where the button is called you have to import icon name like following
// import { FaBeer, FaCoffee, FaWineBottle } from 'react-icons/fa';
// at the component where the button is called you have to write prop as follows
{/* <Button text="Button 1" bgColor="black" textColor="white" icon={FaBeer} /> */}
