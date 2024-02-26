// video link https://youtu.be/IdcE-XL9t0A
const MovingCarAnimation = () => {
    const style = `
    .container{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .city{
     background-image: url('https://i.imgur.com/Q6bTT2k.png');
      height: 36vh;
      width: 100vh;
      background-repeat: no-repeat;
    }
    .highway{
     background-image: url(https://i.imgur.com/bVXQ8P5.jpg);
     margin-top: -1px;
      height: 6vh;
      width: 400vh;
      background-size: contain;
      background-repeat: repeat;
      animation: highway 5s linear infinite;
    }
    @keyframes highway {
      100%{
        transform: translateX(-900px);
      }
    }
    .car{
      width: 200px;
      margin-top: -90px;
      z-index: 1;
    }
    .car img{
      max-width: 100%;
      max-height: 100%;
      animation: car 1s linear infinite;
    }
    .wheel{
      width: 200px;
      display: flex;
      justify-content: space-between;
      padding: 0 25px 0 18px;
      margin-top: -44px;
    }
    .wheel img{
      width: 35px;
      height: 35px;
      animation: spin 2s linear infinite;
    }
    @keyframes spin{
      100%{
        transform: rotate(360deg)
      }
    }
    @keyframes car{
      0%{
        transform: translateY(-2px);
      }
      50%{
        transform: translateY(0)
      }
      100%{
        transform: translateY(-2px)
      }
    }
    `;
  
    return (
      <div className=" min-h-screen flex justify-center items-center">
        <div
          dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
        ></div>
  
        <div className="container">
          <div className="city"></div>
          <div className="highway"></div>
          <div className="car">
            <img src="https://i.imgur.com/n947rWL.png" alt="" />
          </div>
          <div className="wheel">
            <img src="https://i.imgur.com/uZh01my.png" alt="" />
            <img src="https://i.imgur.com/uZh01my.png" alt="" />
          </div>
        </div>
      </div>
    );
 
  
}

export default MovingCarAnimation