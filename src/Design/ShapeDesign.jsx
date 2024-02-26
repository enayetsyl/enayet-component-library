// Source Image https://www.facebook.com/photo/?fbid=251274758029739&set=a.251274811363067
const ShapeDesign = () => {
 
  const style = `

  .box{
    width: 150px;
    height: 150px;
    border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
    background-image: linear-gradient(orangered, orange, yellow)
  }
  
  `
  return (
    <div className="m-20 ">
  <div
    dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
  ></div>
  
  <div className="box"></div>   
  
</div>

  );

}

export default ShapeDesign