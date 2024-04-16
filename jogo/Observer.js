class Observer {
    update() {
        throw new Error('O método update deve ser implementado pelas subclasses.');
    }
}

export default Observer;
