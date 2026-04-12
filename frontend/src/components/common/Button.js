export default function Button({ text, onClick }) {
  return (
    <button className="custom-btn" onClick={onClick}>
      {text}
    </button>
  );
}