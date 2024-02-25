
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
    <div className="bg-[#fff0f5]">
      <div
        dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
      ></div>
   
   <button className="btn-1 btn">Click Me</button>
   <button className="btn-2 btn">Click Me</button>
    </div>
  )
}

export default ButtonNeumorphismEffect