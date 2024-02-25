
const TextAnimation = () => {
  const style = `
  
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
      }

  span{
    font-size: 5rem;
    color: white;
  }

  .container span:nth-child(1){
    animation: animate 1s linear;
    animation-delay: 1s;
  }
  .container span:nth-child(2){
    animation: animate 1s linear;
    animation-delay: 1.1s;
  }
  .container span:nth-child(3){
    animation: animate 1s linear;
    animation-delay: 1.2s;
  }
  .container span:nth-child(4){
    animation: animate 1s linear;
    animation-delay: 1.3s;
  }
  .container span:nth-child(5){
    animation: animate 1s linear;
    animation-delay: 1.4s;
  }
  .container span:nth-child(6){
    animation: animate 1s linear;
    animation-delay: 1.5s;
  }
  .container span:nth-child(7){
    animation: animate 1s linear;
    animation-delay: 1.6s;
  }
  .container span:nth-child(8){
    animation: animate 1s linear;
    animation-delay: 1.7s;
  }
  .container span:nth-child(9){
    animation: animate 1s linear;
    animation-delay: 1.8s;
  }
  .container span:nth-child(10){
    animation: animate 1s linear;
    animation-delay: 1.9s;
  }
  .container span:nth-child(11){
    animation: animate 1s linear;
    animation-delay: 2s;
  }
  .container span:nth-child(12){
    animation: animate 1s linear;
    animation-delay: 2.1s;
  }
  .container span:nth-child(13){
    animation: animate 1s linear;
    animation-delay: 2.2s;
  }
@keyframes animate{
  0%{
    transform: translateX(300px);
    opacity: 0;
    scale: 8;
  }
  100%{
    opacity: 1;
    scale:1;
  }
}    
  `

  return (
    <div className="bg-[#242124]">
    <div
      dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
    ></div>

    <div className="container">
      <span>T</span>
      <span>E</span>
      <span>X</span>
      <span>T</span>
      <span>A</span>
      <span>N</span>
      <span>I</span>
      <span>M</span>
      <span>A</span>
      <span>T</span>
      <span>I</span>
      <span>O</span>
      <span>N</span>
    </div>
  </div>
  )
}

export default TextAnimation