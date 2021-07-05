function useState(initialValue) {

    var val = initialValue

    function state() {
        return val
    }

    function setState(newVal) {
        val = newVal
    }

    return [state, setState]
}

// eslint-disable-next-line react-hooks/rules-of-hooks
var [foo, setFoo] = useState(0)

console.log(foo())

setFoo(1)

console.log(foo())