// este é um arquivo de componente react, serve para construir os componentes a serem renderizados na tela pelo virtual DOM
// cada componente é uma função que retorna um elemento JSX
// a diferença de usar o componete react ao inves de usar HTML puro é que o react é possivel criar componentes reutilizaveis e com estado ao inves de criar diversas páginas no HTML.
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // inicializa o estado do componente com o valor armazenado no localStorage
  const [tarefas, setTarefas] = useState(() => {
    try {
      //ele pega o elemento salvo no localStorage
      const saved = localStorage.getItem("tarefas");
      //se o elemento existir, retorna o elemento, caso contrario retorna um array vazio, precisa ser em JSON pois o localStorage só armazena strings
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Erro ao ler localStorage:", err);
      return [];
    }
  });

  const [input, setInput] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
      console.log("LocalStorage salvo:", tarefas);
    } catch (err) {
      console.error("Erro ao salvar localStorage:", err);
    }
  }, [tarefas]);

  //função para adicionar uma nova tarefa
  function adicionarTarefa() {
    if (input.trim()) {
      setTarefas((prev) => [...prev, input.trim()]);
      setInput("");
    }
  }

  //função para remover uma tarefa
  function removerTarefa(index) {
    setTarefas((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1>Minha Lista de Tarefas</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        //ao pressionar a tecla Enter, chama a função adicionarTarefa()
        onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
        placeholder="Nova tarefa"
      />

      <ul>
        {tarefas.map((tarefa, index) => (
          //pega o elemento atual e o índice
          <li key={index}>
            {tarefa}
            <button onClick={() => removerTarefa(index)}>-</button>
          </li>
          //ao clicar no botão, chama a função removerTarefa()
        ))}
      </ul>
    </div>
  );
}

export default App;
