import cardImage from '../../assets/2.jpg'
const Card = () => {
  return (
    <div className="bg-white rounded-t-full rounded-b-xl shadow-xl">
      <div className=" w-full rounded-t-full">
        <img src={cardImage} alt="" className='rounded-t-full h-full  w-full' />
      </div>
     <div className='pt-6'>
     <h1 className='text-center text-3xl font-black text-yellow-700 '>Product Name</h1>
     <div className='w-full h-[2px] mt-6 bg-yellow-700 relative'></div>
     <div className='flex justify-center items-center'>
      <button className='bg-black text-white py-1 px-3 font-bold absolute rounded-3xl'>$41.00 TK</button>
     </div>
    <p className='p-5 text-center text-gray-400 text-base font-medium'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque ipsa ipsam omnis temporibus. architecto quis deleniti. Officiis, architecto cumque illum totam repellendus dicta voluptate ratione eum.</p>
     </div>
    </div>
  );
};

export default Card;


// import your card image
// change the color of the card if you wish
// be careful about changing the height of the card.