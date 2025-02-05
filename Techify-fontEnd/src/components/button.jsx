const Button = ({ text, onClick, type = "button" }) => (
  <button className="btn btn-primary w-full" type={type} onClick={onClick}>
    {text}
  </button>
);

export default Button;
