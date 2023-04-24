var SecurlyBlockedDetector = {
    __url__: function (email, url) {
        return `https://securly.themirrazz.repl.co/crextn/broker?useremail=${encodeURIComponent(email)}&url=${url}&reason=crextn&host=${new URL(url).host}`
    },
    Detec
}