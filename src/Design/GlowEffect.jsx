// video link https://youtu.be/c7Z9AgHLA8M
const GlowEffect = () => {
 
  const style = `
  ul{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
    display: flex;
  }
  ul li{
    list-style: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: $fff;
    animation: grow 1.6s ease-in-out infinite;
  }  
  @keyframes grow {
    0%, 40%, 100%{
      transform: scale(0.2);
    }
    20%{
      transform: scale(1)
    }
  }
  ul li:nth-child(1){
    animation-delay: -1.4s;
    background-color: yellow;
    box-shadow: 0px 0px 15px yellow;
  }
  ul li:nth-child(2){
    animation-delay: -1.2s;
    background-color: yellowgreen;
    box-shadow: 0px 0px 15px yellowgreen;
  }
  ul li:nth-child(3){
    animation-delay: -1s;
    background-color: palevioletred;
    box-shadow: 0px 0px 15px palevioletred;
  }
  ul li:nth-child(4){
    animation-delay: -0.8s;
    background-color: lightskyblue;
    box-shadow: 0px 0px 15px lightskyblue;
  }
  ul li:nth-child(5){
    animation-delay: -0.6s;
    background-color: violet;
    box-shadow: 0px 0px 15px violet;
  }
  `

  return (
    <div className='bg-[rgba(0,0,0,0.9)] min-h-screen'>
  <div
    dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
  ></div>
  
    <div>
      <ul>
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

export default GlowEffect