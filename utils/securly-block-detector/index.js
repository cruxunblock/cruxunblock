var SecurlyBlockedDetector = async function (email, url) {
    var rqu = `https://securly.themirrazz.repl.co/crextn/broker?useremail=${encodeURIComponent(email)}&url=${url}&reason=crextn&host=${new URL(url).host}`;
    var fetc = await fetch(rqu);
    var text = await fetc.text();
    var data = text.split(":");
    var blockOrDeny = data[0];
    var policyId = data[1];
    var categories = data[2];
    // list of reasons it is blocked
    var CATLIST = [
        'safe search',
        'safe YouTube',
        'safe URL',
        'porn',
        'drugs',
        'gambling',
        'adult content',
        'social media',
        'proxy/VPN',
        'online messaging',
        'e-mail',
        'hate',
        'search engines (without safe search)',
        'social networking',
        'ad networks',
        'games',
        'health',
        'educational youtube'
    ];
    if(blockOrDeny === '\nALLOW') {
        return {
            status: 'allow',
            category: null,
            policyId: null,
            reason: null,
            userFriendly: {
                reason: "This website is allowed by Securly and your administrator."
            }
        }
    } else {
        if(categories == 'BL') {
            return {
                status: 'deny',
                category: null,
                policyId: policyId == 'G' ? 'global' : policyId,
                reason: 'website-blacklist',
                userFriendly: {
                    reason: (
                        policyId == 'G' ?
                        "This website is in the Securly global blocklist. It can't be unblocked by your school.":
                        "This website is in your school's blocklist. You can ask an administrator to remove it, but they might not listen."
                    )
                }
            }
        } else {
            var CatMapRes = [];
            var binaryData = Number(categories).toString(2);
            var xM = 1;
            for(var xx = 0; xx < binaryData.length; xx++) {
                if(binaryData[xx] == '1') {
                    if(CatMapRes[xM]) {
                        CatMapRes.push(CATLIST[xM])
                    }
                }
                xM *= 2
            }
            return {
                status: 'deny',
                category: categories,
                policyId: policyId == 'G' ? 'global': policyId,
                reason: 'website-category',
                userFriendly: {
                    reason: "This website is blocked because it was categorized as a type of website that is blocked. You can ask an administrator to recategorize it or unblock that category, but they might not listen.",
                    categories: (
                        CatMapRes.length == 1 ?
                        'Category: '+CatMapRes[0] : (
                            CatMapRes.length == 2 ?
                            'Categories: '+CatMapRes[0]+' and '+CatMapRes[1]
                            :
                            (
                                "Categories: " + (
                                    (CatMapRes.slice(0,CatMapRes.length-1))
                                    .join(', ')
                                ) + " and "+CatMapRes[
                                    CatMapRes.length-1
                                ]
                            )
                        )
                    )
                }
            }
        }
    }
}