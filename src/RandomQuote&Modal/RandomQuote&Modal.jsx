import { useState, useEffect } from "react";

const RandomQuoteAndModal = () => {
    const [quran, setQuran] = useState(null);
    const [ayat, setAyat] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
  
    const getQuran = () => {
      fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-zohurulhoque.min.json')
        .then(res => res.json())
        .then(data => {
          setQuran(data.quran);
          getRandomAyat(data.quran);
        });
    }
  
    const getRandomAyat = (quranData) => {
      if (!quranData) return;
      const randomIndex = Math.floor(Math.random() * quranData.length);
      const randomAyat = quranData[randomIndex];
      setAyat(randomAyat);
      setModalOpen(true); // Open modal
    }
  
    useEffect(() => {
      getQuran();
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        getRandomAyat(quran);
      }, 10000); // Reopen modal every 30 seconds
  
      return () => clearInterval(interval); // Cleanup interval
    }, [quran]);
  
    return (
      <div className="min-h-screen flex flex-col justify-center items-center space-y-5">
        <div className="container">
          <h1 className="text-2xl font-bold">My other work</h1>
          <p></p>
        </div>
        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg">
              <h1 className="text-xl font-bold mb-4">{ayat?.text}</h1>
              <p className="text-gray-700">{`${ayat?.chapter} : ${ayat?.verse}`}</p>
              <button onClick={() => setModalOpen(false)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  
}

export default RandomQuoteAndModal