function Err({ message }) {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-3">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="#b91c1c"
        >
          <path d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 003 21h18a.998.998 0 00.883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z" />
        </svg>
      </div>

      <p className="text-center text-red-700">{message}</p>
    </div>
  );
}

export default Err;
