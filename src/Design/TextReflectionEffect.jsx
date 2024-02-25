
const TextReflectionEffect = () => {
  const style = `
  
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
      }
  .reflected{
    display:inline-block;
    width: max-content;
    padding: 0 10px;
  }
  .reflected > *{
    font-size: 5rem;
    font-weight: 700;
    color: cyan;
  }
  .reflected >:last-child{
    transform: rotateX(180deg)
    translateY(28px);
    mask-image: linear-gradient(
      transparent 50%,
      white 90%
    );
    -webkit-mask-image: linear-gradient(
      transparent 50%,
      white 90%
    )
  }

  
  `

  return (
    <div className="bg-[#152238]">
    <div
      dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
    ></div>
 
<div className="container">
  <div className="reflected">
    <h1>Reflected Text</h1>
    <h1>Reflected Text</h1>
  </div>
</div>
  </div>
  )
}

export default TextReflectionEffect