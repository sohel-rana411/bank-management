// Small feedback banner used by both forms.
export default function Message({ message }) {
  if (!message) return null;
  return (
    <p
      className={`message message--${message.ok ? "success" : "error"}`}
      role={message.ok ? "status" : "alert"}
    >
      {message.text}
    </p>
  );
}
