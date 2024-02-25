
const CardHoverAnimation = () => {
  
    const style = `
    .box{
      width: 1200px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      grid-gap: 15px;
      margin: 0 auto;
    }
    .card{
      position: relative;
      width: 300px;
      height: 350px;
      background: #fff;
      margin: 0 auto;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    .card:before,
    .card:after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background: #fff;
      transition: .5s;
      z-index: -1;
    }
    .card:hover::before{
      transform: rotate(20deg);
      box-shadow: 0 2px 20px rgba(0,0,0,0.2)
    }
    .card:hover::after{
      transform: rotate(10deg);
      box-shadow: 0 2px 20px rgba(0,0,0,0.2)
    }
    .card .imgBx{
      position: absolute;
      top: 10px;
      left: 10px;
      bottom: 10px;
      right: 10px;
      background: #222;
      transition: .5s;
      z-index: 1;
    }
    .card:hover .imgBx{
      bottom: 80px;
    }
    .card .imgBx img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .card .details{
      position: absolute;
      left: 10px;
      right: 10px;
      bottom: 10px;
      height: 60px;
      text-align: center;
    }
    .card .details h2{
      margin: 0;
      padding: 0;
      font-weight: 600;
      font-size: 20px;
      color: #777;
      text-transform: uppercase;
    }
    .card .details h2 span{
      font-weight: 500;
      font-size: 16px;
      color: #f38695;
      display: block;
      margin-top: 5px;
    }
   
    `
  
    return (
      <div >
        <div
          dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
        ></div>
        <div className="box">
          <div className="card">
            <div className="imgBx">
              <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="" />
            </div>
            <div className="details">
              <h2>Someone famous <br /> <span>Director</span></h2>
            </div>
          </div>
          <div className="card">
            <div className="imgBx">
              <img src="https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg" alt="" />
            </div>
            <div className="details">
              <h2>Someone famous <br /> <span>Director</span></h2>
            </div>
          </div>
          <div className="card">
            <div className="imgBx">
              <img src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" alt="" />
            </div>
            <div className="details">
              <h2>Someone famous <br /> <span>Director</span></h2>
            </div>
          </div>
        </div>
       
      </div>
    );
  }
  


export default CardHoverAnimation