const CircleLoadingAnimation = () => {

    const style = `
    .circle1{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      width: 200px;
      border-radius: 50%;
      border: 3px solid #fe444425;
      border-top: 3px solid red;
      animation: ani 3s linear infinite;
    }
    .circle2{
     
      height: 130px;
      width: 130px;
      border-radius: 50%;
      border: 3px solid #fee44425;
      border-top: 3px solid #f9ce24;
      animation: ani 2s linear infinite;
    }
    @keyframes ani {
      0%{
        transform: rotate(0deg)
      }
      100%{
        transform: rotate(360deg)
      }
    }
    `;
  
    return (
      <div className="bg-[#151515] min-h-screen flex justify-center items-center">
        <div
          dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
        ></div>
  
        <div className="container">
          <div className="circle1">
            <div className="circle2"></div>
          </div>
        </div>
      </div>
    );

  
}

export default CircleLoadingAnimation