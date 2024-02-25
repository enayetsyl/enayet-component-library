
const FoldedCorner = () => {
 
    const style = `
    
    header, hgroup{
      display: block;
    }
    .container{
      width: 450px;
      padding: 0 0 10px;
      margin: 0 auto 30px;
    }
    .header {
      border-bottom: 1px solid #ddd;
    }
    h1{
      margin: 1em 0 0;
      font-size: 2.5em;
      font-weight: normal;
      line-height: 1.2;
      text-align: center;
    }
    h2{
      margin: 0.5em 0 1.5em;
      font-size: 1.25em;
      font-weight: normal;
      font-style: italic;
      text-align: center;
    }
    p{
      margin: 1em 0;
      line-height: 1.4em;
    }
    .note{
      position: relative;
      width: 400px;
      padding: 1em 1.5em;
      margin: 2em auto;
      color: #fff;
      background: #006ae2;
      overflow: hidden;
    }
    .note:before{
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      border-width: 0 16px 16px 0;
      border-style: solid;
      border-color: #fff #fff #003877 #003877;
      background: #003877;
      display: block;
      -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3 ), -1px 1px 1px rgba(0, 0, 0, 0.2);
      -moz-box-shadow:  0 1px 1px rgba(0, 0, 0, 0.3 ), -1px 1px 1px rgba(0, 0, 0, 0.2);
      box-shadow:  0 1px 1px rgba(0, 0, 0, 0.3 ), -1px 1px 1px rgba(0, 0, 0, 0.2);
    }
    .note.taupe:before{
      border-color: #fff #fff #bdbb8b #bdbb8b;
      background: #bdbb8b;
    }
    .note.rounded {
      -webkit-border-radius: 5px 0 5px 5px;
      -moz-border-radius: 5px 0 5px 5px;
      border-radius: 5px 0 5px 5px;
    }
    .note.rounded:before{
      border-width: 8px;
      border-color: #fff #fff transparent transparent;
      -webkit-border-bottom-left-radius: 5px;
      -moz-border-radius: 0 0 0 5px;
      border-radius: 0 0 0 5px;
    }
    .note p{
      margin: 0;
    }
    .note p+p{
      margin: 1.5em 0 0;
    }
    
    `
  
    return (
      <div >
    <div
      dangerouslySetInnerHTML={{ __html: `<style>${style}</style>` }}
    ></div>
  
      <div className="container header">
        <header>
          <hgroup>
            <h1>CSS Folded-Corner Effect</h1>
          </hgroup>
        </header>
      </div>
      <div className="note">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente aliquid labore, in, rerum vel voluptatibus eligendi quis tempora atque suscipit animi exercitationem nesciunt ducimus reprehenderit distinctio nam ad ipsum, soluta officiis commodi sint. Ipsa error ipsam, debitis, repudiandae impedit amet, natus libero voluptas quidem maxime ducimus voluptatibus iste maiores quaerat!</p>
      </div>
     
  </div>
  
    );
  }
  
 

export default FoldedCorner