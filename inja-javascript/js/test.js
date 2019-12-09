function assert(value, desc) {
    const result = document.getElementById('result') || document.createElement('ul')
    if (!result.id) {
        result.id = 'result'
        document.body.appendChild(result)
    }
    
    const li = document.createElement('li')
    li.innerHTML = desc
    li.style.color = value ? 'green' : 'red'
    result.appendChild(li)
    return li
}

function test(name, fn, results) {
    fn(
        assert(results, true, name).appendChild(document.createElement('ul'))
    )
}