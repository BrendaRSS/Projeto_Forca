import palavras from "./palavras"
import forca0 from "./image/forca0.png"
import forca1 from "./image/forca1.png"
import forca2 from "./image/forca2.png"
import forca3 from "./image/forca3.png"
import forca4 from "./image/forca4.png"
import forca5 from "./image/forca5.png"
import forca6 from "./image/forca6.png"
import { useState } from "react"

export default function App() {
    const [ganhouPerdeu, setGanhouPerdeu] = useState("verde")
    const [letrasClicadas, setLetrasClicadas] = useState([])
    const [imagem, setImagem] = useState(forca0)
    const [contador, setContador] = useState(0)
    const [desabilitado, setDesabilitado] = useState(true)
    const [palavraCoparacao, setPalavraComparacao] = useState("") //palavra formato string
    const [palavraSorteada, setPalavraSorteada] = useState([]) //palavra formato array
    const [palavraRenderizada, setPalavraRenderizada] = useState([]) //palavra escondida "_"
    const [input, setInput] = useState("")
    let arrayImagens = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
    let palavraSendoPreenchida = [...palavraRenderizada]
    const desabilitandoLetrasAlfabeto = true

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
        "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    function escolherPalavra() {
        setDesabilitado(false)
        const numRandomico = Math.floor(Math.random() * palavras.length);
        let palavra = palavras[numRandomico]
        console.log("funcao", palavra)
        setPalavraComparacao(palavra)
        let palavraSorteadaSemACento= palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let arrayPalavraSorteada = palavraSorteadaSemACento.split('')
        setPalavraSorteada(arrayPalavraSorteada)
        let novoArray = arrayPalavraSorteada.map(() => "_")
        setPalavraRenderizada(novoArray)
        let arrayVazio = []
        setLetrasClicadas(arrayVazio)
        setImagem(forca0)
        setContador(0)
        setGanhouPerdeu("")
    }

    function compararLetra(letra) {
        let arrayLetras = [...letrasClicadas, letra]
        setLetrasClicadas(arrayLetras)
        if (palavraSorteada.includes(letra)) {
            for (let i = 0; i < palavraSorteada.length; i++) {
                if (palavraSorteada[i] === letra) {
                    palavraSendoPreenchida[i] = letra
                    console.log(palavraSendoPreenchida)
                    console.log(palavraRenderizada)
                    if (palavraSendoPreenchida.includes("_") === false) {
                        setDesabilitado(true)
                        setGanhouPerdeu("verde")
                    }
                }
            }
            setPalavraRenderizada(palavraSendoPreenchida)
        } else {
            let contagemErro = contador + 1
            setContador(contagemErro)
            console.log(contador)
            console.log(contagemErro)
            let imagemATual = arrayImagens[contagemErro]
            setImagem(imagemATual)
            if (contagemErro === 6) {
                setDesabilitado(true)
                setPalavraRenderizada(palavraSorteada)
                setGanhouPerdeu("vermelho")
            }
        }
    }
    console.log(letrasClicadas)

    function chutarPlavra() {
        if (palavraCoparacao === input) {
            setPalavraRenderizada(palavraSorteada)
            setDesabilitado(true)
            setGanhouPerdeu("verde")
        } else {
            setPalavraRenderizada(palavraSorteada)
            setDesabilitado(true)
            setImagem(forca6)
            setGanhouPerdeu("vermelho")
        }
        setInput("")

    }


    return (
        <div className="container">
            <div className="imagem-e-botao">
                <div data-identifier="game-image" className="imagem">
                    <img alt="Imagem da forca" src={imagem} />
                </div>
                <div className="botao-escolher">
                    <div>
                        <button data-identifier="choose-word" className="escolher-palavra" onClick={escolherPalavra}>Escolher palavra</button>
                    </div>
                    <div data-identifier="word">
                        {palavraRenderizada.map(
                            (letra, index) => (<span key={index} className={`letras ${palavraRenderizada===palavraSorteada ? ganhouPerdeu:""} ${palavraSendoPreenchida.includes("_") === false ? ganhouPerdeu:""}`} >  {letra}  </span>)
                        )}
                    </div>
                </div>
            </div>
            <div className="teclado">
                {alfabeto.map((l, index) => (
                    <button
                        key={index}
                        data-identifier="letter"
                        className="botoes"
                        disabled={(letrasClicadas.includes(l) ? desabilitandoLetrasAlfabeto : desabilitado)}
                        onClick={
                            () => compararLetra(l)} >{l.toUpperCase()}</button>))}
            </div>
            <div className="chutar-palavra">
                Já sei a palavra!
                <input
                    data-identifier="type-guess"
                    className="input-chutar"
                    disabled={desabilitado}
                    onChange={(e) => (setInput(e.target.value))}
                    value={input} />
                <button
                    data-identifier="guess-button"
                    className="botao-chutar"
                    disabled={desabilitado}
                    onClick={chutarPlavra}>chutar</button>
            </div>
        </div>
    )
}