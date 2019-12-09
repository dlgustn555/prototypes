function log() {
    try {
        console.log.apply(console, arguments)
    } catch (error) {
        try {
            opera.postError.apply(opera, arguments)
        } catch(error) {
            alert(Array.prototype.join.call(arguments, ' '))
        }
    }
}