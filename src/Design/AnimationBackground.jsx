
const AnimationBackground = () => {

    const style = `
    
    .banner-text{
      width: 100%;
      position: absolute;
      z-index: 1;
    }
  
    .banner-text h2{
      text-align: center;
      color: rgb(255,255,255);
      font-size: 50px;
      margin-top: 40%;
      z-index: 1;
    }
    .animation-area{
      background: linear-gradient(to left, #fa2f2f, #a29735);
      width: 100%;
      height: 100vh;
    }
    .box-area{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .box-area li{
      position: absolute;
      display: block;
      list-style: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 5px solid rgb(238, 255, 0);
      animation: animate 20s linear infinite;
      bottom: -150px;
    }
    .box-area li:nth-child(1){
      left: 86%;
      width: 80px;
      height: 80px;
      animation-delay: 0s;
      
    }
    .box-area li:nth-child(2){
      left: 8%;
      width: 30px;
      height: 30px;
      animation-delay: 1.5s;
      
    }
    .box-area li:nth-child(3){
      left: 70%;
      width: 100px;
      height: 100px;
      animation-delay: 5.5s;
      
    }
    .box-area li:nth-child(4){
      left: 42%;
      width: 150px;
      height: 150px;
      animation-delay: 0s;
      animation-duration: 15s;
      
    }
    .box-area li:nth-child(5){
      left: 65%;
      width: 40px;
      height: 40px;
      animation-delay: 0s;
      
    }
    .box-area li:nth-child(6){
      left: 15%;
      width: 110px;
      height: 110px;
      animation-delay: 3.5s;
      
    }
  
    @keyframes animate{
      0%{
        transform: translateY(0)
      }
      50%{
        transform: translateY(-900px)
      }
      100%{
        transform: translateY(0)
      }
    }
    
    `
  
    return (
      <div >
        <div
          dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
        ></div>
        <div className="banner-text">
          <h2>Welcome to my website</h2>
        </div>
        <div className="animation-area">
          <ul className="box-area">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
       
      </div>
    );
  }
  


export default AnimationBackground