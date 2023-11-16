const Button = ({ text, bgColor, textColor, icon: Icon }) => {
  return (
    <button 
    className={`rounded-[40px]  px-6 py-4 text-xl font-semibold bg-${bgColor} text-${textColor}  flex justify-center items-center gap-3`}
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
{/* <div><Button text="Button 1" bgColor="red-500" textColor="white" icon={FaBeer} /></div> */}