import palavras from "./palavras"
import forca0 from "./image/forca0.png"
import { useState } from "react"

export default function App() {
    const [palavraCoparacao, setPalavraComparacao]=useState("") //palavra formato string
    const [palavraSorteada, setPalavraSorteada] = useState([]) //palavra formato array
    const [palavraRenderizada, setPalavraRenderizada] = useState([]) //palavra escondida "_"
    const [input, setInput] = useState("")
    
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
        "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    function escolherPalavra() {
        const numRandomico = Math.floor(Math.random() * palavras.length);
        let palavra = palavras[numRandomico]
        console.log("funcao",palavra)
        setPalavraComparacao(palavra)
        let arrayPalavraSorteada = palavra.split('')
        setPalavraSorteada(arrayPalavraSorteada)
        let novoArray = arrayPalavraSorteada.map(() => "_")
        setPalavraRenderizada(novoArray)
    }
    
    function compararLetra(letra){
       alert("clicou")
       console.log(letra)
    }

    function chutarPlavra(){
      if(palavraCoparacao===input){
        console.log("igual")
      } else{
        console.log("diferente")
      }
      setInput("")

    }


    return (
        <div className="container">
            <div className="imagem-e-botao">
                <div className="imagem">
                    <img src={forca0} />
                </div>
                <div className="botao-escolher">
                    <div>
                        <button className="escolher-palavra" onClick={escolherPalavra}>Escolher palavra</button>
                    </div>
                    <div>
                        {palavraRenderizada.map(
                            (letra, index) => (<span className="letras">  {letra}  </span>)
                        )}
                    </div>
                </div>
            </div>
            <div className="teclado">
                {alfabeto.map((l) => (<button className="botoes"  onClick={()=>compararLetra(l)} >{l}</button>))}
            </div>
            <div className="chutar-palavra">
                Já sei a palavra!
                <input className="input-chutar" onChange={(e)=>(setInput(e.target.value))} value={input}/>
                <button className="botao-chutar" onClick={chutarPlavra}>chutar</button>
            </div>
        </div>
    )
}