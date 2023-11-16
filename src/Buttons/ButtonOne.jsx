
const Button = ({ text, bgColor, textColor }) => {
  return (
    <button className={`px-6 py-5 text-xl font-semibold rounded-md bg-${bgColor} text-${textColor}`}>{text}</button>
  );
};

export default Button;


// Props can be sent in following way
{/* <Button text="Button 1" bgColor="green-500" textColor="white"></Button> */}