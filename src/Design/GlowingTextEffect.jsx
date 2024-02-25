const GlowingTextEffect = () => {
  const style = `
  
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
      }

  .text{
    font-size: 50px;
    font-weight: 700;
    color: white;
    text-shadow: 0 0 10px #03bcf4,
    0 0 20px #03bcf4,
    0 0 40px #03bcf4,
    0 0 60px #03bcf4;
  }
    
  `
  return (
    <div className="bg-[#152238]">
      <div
        dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
      ></div>

      <div className="container">
        <div className="text">
          <h1>Glowing Text</h1>
        </div>
      </div>
    </div>
  )
}

export default GlowingTextEffect