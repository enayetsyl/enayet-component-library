
const MovingSearchIcon = () => {
  // Make sure body bg color is #252525
    const style = `
    
    .container{
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 300px;
      height: 100px;
    }
    .container .search{
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 80px;
      height: 80px;
      background: crimson;
      border-radius: 50%;
      transition: all 1s;
      z-index: 4;
      box-shadow: 0 0 25px 0 rgba(0,0,0,0.4);
    }
    .container .search:hover{
      cursor: pointer;
    }
    .container .search::before{
      content: "";
      position: absolute;
      margin:auto;
      top: 22px;
      right: 0;
      bottom:0;
      left: 22px;
      width: 12px;
      height: 2px;
      background: #fff;
      transform: rotate(45deg);
      transition: all .5s;
    }
    .container .search::after{
      content: "";
      position: absolute;
      margin:auto;
      top: -5px;
      right: 0;
      bottom:0;
      left: -5px;
      width: 25px;
      height: 25px;
      border: 2px solid #fff;
      border-radius: 50%;
      background: #fff;
      transition: all .5s;
    }
    .container input{
      position: absolute;
      margin:auto;
      top: 0;
      right: 0;
      bottom:0;
      left: 0;
      width: 50px;
      height: 50px;
      outline: none;
      border: none;
      background: crimson;
      color: #fff;
      text-shadow: 0 0 10px crimson;
      padding: 0 80px 0 20px;
      border-radius: 30px;
      box-shadow: 0 0 25px 0 crimson, 0 20px 25px 0 rgba(0,0,0,0.2)
      transition: all 1s;
      opacity: 0;
      z-index: 5;
      font-weight: bolder;
      letter-spacing: 0.1em;
    }
    .container input:hover{
      cursor: pointer;
    }
    .container input:focus{
      width: 300px;
      opacity: 1;
      cursor: text;
    }
    .container input:focus ~ .search{
      right: -350px;
      background: #151515;
      z-index:6;
    }
    .container input:focus ~ .search::before{
      top: 0;
      left: 0;
      width: 25px;
    }
    .container input:focus ~ .search::before{
      top: 0;
      left: 0;
      width: 25px;
    }
    .container input:focus ~ .search::after{
      top: 0;
      left: 0;
      width: 25px;
      height: 2px;
      border: none;
      background: #fff;
      border-radius: 0%;
      transform: rotate(-45deg);
    }
    .container input::placeholder{
      color: #fff;
      opacity: 0.5;
      font-weight: bolder;
    }
  
   
    `
  
    return (
      <div className="bg-[#252525]">
        <div
          dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
        ></div>
        <div className="container">
          <input type="text" placeholder="Search..." />
          <div className="search"></div>
        </div>
       
      </div>
    );
  }
  


export default MovingSearchIcon