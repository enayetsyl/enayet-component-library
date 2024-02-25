// CSS Code 

// .container {
//   position:relative;
//     width:300px;
//     height: 300px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background: rgba(0,0,0,0.4);
//     border-radius: 20px;
//     overflow: hidden;
// }

// .container::before{
//   content:"";
//   position:absolute;
//   width: 420px;
//   height: 140%;
//   background: conic-gradient(
//     #fd004c,
//     #fe9000,
//     #fff020,
//     #3edf4b,
//     #3363ff,
//     #b102b7,
//     #fd004c
//   );
//   animation: animate 3s linear infinite;
// }

// .container::after{
//   content:"";
//   position: absolute;
//   inset: 7px;
//   background: #0e1538;
//   border-radius: 20px;
// }
// @keyframes animate {
//   0%{
//     transform: rotate(0deg)
//   }
//   100%{
//     transform: rotate(360deg)
//   }
// }



const AnimatedBorder = () => {
  return (
    <div
    className='container'
    >
      <h1 
      style={{
        fontSize: '5rem',
        color: '#333',
        position:'relative',
        zIndex: '10',
      }}
      >Code</h1>
    </div>
  )
}

export default AnimatedBorder