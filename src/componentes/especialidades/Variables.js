const Variables = () => {

    let contador = 0;
    const incrementar = () => {
        contador = contador + 1;
        console.log(contador);
    }

    return (
        <div>Hola: {contador}
            <button onClick={incrementar}>Incrementar</button>
        </div>
        
    )
}
export default Variables;