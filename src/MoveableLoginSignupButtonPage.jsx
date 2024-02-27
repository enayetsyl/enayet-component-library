import { useState, useRef, useEffect } from "react";

const MoveableLoginSignupButtonPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonPosition, setButtonPosition] = useState('left');
  const buttonRef = useRef(null);
  const [formFilled, setFormFilled] = useState(false);

  const handleMouseMove = (e) => {
    if (!formFilled) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (
        (buttonPosition === 'left' && mouseX > buttonRect.left - 30 && mouseX < buttonRect.right) ||
        (buttonPosition === 'right' && mouseX < buttonRect.right + 30 && mouseX > buttonRect.left)
      ) {
        setButtonPosition((prevPosition) => (prevPosition === 'left' ? 'right' : 'left'));
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [buttonPosition, formFilled]);

  useEffect(() => {
    if(email && password){
      setFormFilled(true)
    }
  },[email, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Form is filled, handle submission logic here
      setFormFilled(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="bg-purple-200 h-[500px] w-[350px] rounded-lg flex flex-col items-center relative">
          <div className="my-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="rounded-lg bg-purple-300 focus:bg-purple-500 py-1 pl-2 text-white focus:outline-none"
            />
          </div>
          <div className="my-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-lg bg-purple-300 focus:bg-purple-500 py-1 pl-2 text-white focus:outline-none"
            />
          </div>
          {
            formFilled ? <button
            className="bg-green-700 p-3"
          >
            Submit
          </button> :
          <button
          ref={buttonRef}
          style={{ position: "absolute", bottom: 10, [buttonPosition]: 0, transition: "left 0.5s, right 0.5s" }}
          className="bg-green-700 p-3"
        >
          Submit
        </button>
          }
        </div>
      </form>
    </div>
  );
};



export default MoveableLoginSignupButtonPage