import cardImage from '../../assets/1.jpg'
import { BsCart3 } from "react-icons/bs";
const Card = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-5 space-y-5">
      <div className='w-full'>
      <img src={cardImage} alt="" className='w-full object-cover rounded-xl'/>
      </div>
      <div className='space-y-2'>
      <h1 className='text-xl font-semibold text-black'>Paitala Panjabi</h1>
      <h1 className='text-3xl font-bold text-black'>$449</h1>
      </div>
      <div>
        <button className='bg-black text-white w-full py-3 rounded-xl cursor-pointer flex justify-center items-center gap-3 text-xl'>
         <BsCart3></BsCart3> <span>Add To Cart</span></button>
      </div>
    </div>
  );
};

export default Card;

// install react icon
// import image for card and if you change name in the import then change it also in src of img tag