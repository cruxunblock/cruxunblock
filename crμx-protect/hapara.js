setTimeout(function () {
    var μ = new URL(location.href);
    if(!μ.searchParams.has('haparaproof')) {
        μ.searchParams.set('haparaproof','%HaparaProofReplace%');
        var μμ = μ.href;
        μμ = μμ.replace('%25HaparaProofReplace%25', '/kbohafcopfpigkjdimdcdgenlhkmhbnc/popup-message.html')
        history.replaceState(
            null,null,
            μμ
        )
    }
})
