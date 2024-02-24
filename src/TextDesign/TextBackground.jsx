
const TextBackground = () => {
  return (
    <div
    style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <h1
      style={{
        fontSize: '3rem',
        letterSpacing: '0.3rem',
        color: 'transparent',
        WebkitTextStroke: '1px #ff0000',
        backgroundImage: `url('https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630')`,
        backgroundPosition: '0 0',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        animation: 'animate-text 20s linear infinite'
      }}
    >
      See More
    </h1>
    <style>
    {`
            @keyframes animate-text {
              100% {
                background-position: 200% 0;
              }
            }
          `}
    </style>
  </div>
  )
}

export default TextBackground