import cardImage from '../../assets/2.jpg'
import { BsStar } from "react-icons/bs";
const Card = () => {
  return (
    <div className="rounded-xl bg-blue-800 shadow-2xl pt-10">
      <div className="rounded-t-[80px] bg-white  h-[90%]">
        <div className="text-center p-5 space-y-3">
        <h1 className="uppercase text-2xl  font-semibold text-blue-800">Children Shirt</h1>
        <p className="text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, sit.</p>
        </div>
        <div className="w-full h-3/5  px-5 rounded-xl">
          <img src={cardImage} alt="" className='w-full h-full  object-cover rounded-xl' />
        </div>
        <div className='flex justify-between items-center px-5 pt-5'>
          <h1 className='text-2xl font-black text-black'>$125</h1>
          <div className='flex justify-center text-yellow-400 font-black'>
          <BsStar /><BsStar /><BsStar /> {/* if necessary add rating icon here*/}
          </div>
        </div>
      </div>
          <div>
            <button className='w-full text-black bg-yellow-400 rounded-b-xl py-4 uppercase text-xl font-bold'>add to cart</button>
          </div>
    </div>
  );
};

export default Card;

// import your card image
// change the color of the card if you wish
// be careful about changing the height of the card.
// add dynamic rating icon if necessary