
const ButtonNeumorphismEffect = () => {
  const style = `
  
  .btn{
    height: 60px;
    width: 230px;
    margin: 30px 0;
    font-size: 25px;
    color: #b47ee5;
    border: none;
    border-radius: 50px;
    background: #fff0f5
  }
  .btn-1{
    box-shadow: -6px -6px 10px rgba(255,255,255,0.8), 6px 6px 10px rgba(0,0,0,0.2);
  }
  .btn-1:focus{
    font-size: 24px;
    box-shadow: inset -4px -4px 8px rgba(255,255,255,0.5), inset 6px 6px 12px rgba(0,0,0,0.1);
  }
  .btn-2{
    box-shadow: inset -4px -4px 8px rgba(255,255,255,0.5), inset 6px 6px 12px rgba(0,0,0,0.2);
  }
  .btn-2:focus{
    font-size: 24px;
    box-shadow: -6px -6px 10px rgba(255,255,255,0.8), 6px 6px 10px rgba(0,0,0,0.2);
  }

  
  `
  return (
   <>
    <div className="bg-[#fff0f5]">
      <div
        dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
      ></div>
   
   <button className="btn-1 btn">Click Me</button>
   <button className="btn-2 btn">Click Me</button>
    </div>
    <div className="my-4 bg-violet-500 h-32 flex justify-center items-center">
    <button 
      className="h-16 px-4 py-2 text-2xl text-black rounded-3xl bg-violet-500 "
      style={{
        boxShadow: ' -6px -6px 10px rgba(255,255,255,0.5), 6px 6px 10px rgba(0,0,0,0.2)',
        transition: 'box-shadow 0.3s ease',
      }}
      onFocus={(e) => {
        e.target.style.boxShadow = 'inset -4px -4px 8px rgba(139,92,246,0.4), inset 6px 6px 12px rgba(0,0,0,0.4)';
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = '-6px -6px 10px rgba(255,255,255,0.8), 6px 6px 10px rgba(0,0,0,0.2)';
      }}
    >
      Click Me
    </button>
  </div>
   </>
  )
}

export default ButtonNeumorphismEffect