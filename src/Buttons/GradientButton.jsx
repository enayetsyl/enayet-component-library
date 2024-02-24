
const GradientButton = () => {
  return (
    <button
    style={{
      background: 'linear-gradient(to right, #ffe100 0%, #ff0800 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '55px'
    }}
    >See More</button>
  );
};

export default GradientButton;

