var cosmo_style = document.createElement('style');
var style =
".cosmobots-iframe-chat{\n" +
    "visibility: visible; width: 270pt; height: 85%; max-height: 650px; position: fixed; background: #FFF\n" +
"}\n" +
".cosmobots-iframe-chat-outer{\n" +
    "vertical-align: bottom; overflow: hidden !important; border-radius: 5pt; width: 270pt; min-height: 250pt; height: 85%; max-height: 650px; bottom: 65pt; position: fixed; right: 30pt; z-index: 999; box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16) !important;\n" +
"}\n" +
".cosmobots-pop{\n" +
    "background: none; border-radius: 50%; bottom: 6pt; display: inline; height: 90px; padding: 0px; position: fixed; right: 20pt; top: auto; width: 90px; z-index: 991;\n" +
    "visibility: visible;\n" +
"}\n" +
".cosmobots-pop-bar{\n" +
    "background: none; border-radius: 50%; bottom: 0pt; display: inline; height: 60px; padding: 0px; position: fixed; right: 8pt; top: auto; width: 380px; max-width: 390px; z-index: 991;\n" +
    "visibility: visible;\n" +
"}\n" +
".cosmobots-pop-iframe{\n" +
    "border: none;\n" +
"}\n" +
".cosmobots-chat{\n" +
    "display: none;\n" +
"}\n" +
"@media (max-width: 766px){\n" +
    ".cosmobots-iframe-chat-outer{\n" +
        "width: 100%;height: 100%;max-height: 100%;bottom: 0;right: 0;border-radius: 0px;\n" +
    "}\n" +
    ".cosmobots-iframe-chat{\n" +
        "width: 100%; height: 100%; max-height: 100%;position: fixed; \n" +
    "}\n" +
    ".cosmobots-pop{\n" +
        "visibility: hidden;\n" +
    "}\n" +
    ".cosmobots-pop-bar{\n" +
        "visibility: hidden;\n" +
    "}\n" +
    ".cosmobots-chat{\n" +
        "border-radius: 0px;\n" +
    "}\n" +
"}\n" +
"@media (min-width: 767px){\n" +
    ".cosmobots-chat{\n" +
        "border-radius: 8px; \n" +
    "}\n" +
"}";

cosmo_style.innerHTML = style;
document.head.appendChild(cosmo_style);

function receiveMessage(event){
    //console.log('event', event)
    if (!event.data) return;
    //var bot_id = event.data.bot_id;
    var action = event.data.action;
    var chat = null, pop = null;
    if (action === "remove"){
        chat = document.getElementsByClassName('cosmobots-chat')[0];
        pop = document.getElementsByClassName('cosmobots-pop')[0] || document.getElementsByClassName('cosmobots-pop-bar')[0];
        pop.style.visibility = 'visible';
        chat.setAttribute("style", "display : none");
    }
    else if (action === "change"){
        chat = document.getElementsByClassName('cosmobots-chat')[0];
        pop = document.getElementsByClassName('cosmobots-pop')[0] || document.getElementsByClassName('cosmobots-pop-bar')[0];
        if (chat.style.display === '') chat.style.display = 'none';
        if (!chat.style.display || chat.style.display === 'block'){
            chat.setAttribute("style", "display : none");
            if (window.innerWidth <= 767) pop.style.visibility = 'visible';
        }
        else {
            chat.setAttribute("style", "display : block");
            if (window.innerWidth <= 767) pop.style.visibility = 'hidden';
        }
    }
    else if (action === "conv_hist"){
        var uid = event.data.uid;
        var bid = event.data.bid;
        var oid = event.data.oid;
        var ctx_oid = event.data.ctx_oid;
        if (uid && bid && oid){
            //window.open('/platform/data/' + bid + '/obj/' + oid + '/web-user-' + uid, '_blank');
            window.open('/platform/data/objects/' + bid + '/' + ctx_oid + '/conv/web-context-' + uid, '_blank');
        }

    }
    else if (action === "conv_clear"){
        var uid = event.data.uid;
        var bid = event.data.bid;
        var oid = event.data.oid;
        var ctx_oid = event.data.ctx_oid;
        //console.log("conv_clear", uid, bid, oid, ctx_oid)
        if (uid && bid && oid){
            //window.open('/platform/data/' + bid + '/obj/' + oid + '/web-user-' + uid, '_blank');
            //window.open('/platform/data/objects/' + bid + '/' + ctx_oid + '/conv/web-context-' + uid, '_blank');
        }

    }
    else if (action === "bot_landing"){
        var uid = event.data.uid;
        var bid = event.data.bid;
        var oid = event.data.oid;
        var ctx_oid = event.data.ctx_oid;
        if (bid){
            //window.open('/platform/data/' + bid + '/obj/' + oid + '/web-user-' + uid, '_blank');
            window.open('/' + bid, '_blank');
        }

    }
}
window.onload = function(event) {

    var pop = document.getElementsByClassName('cosmobots-pop')[0] || document.getElementsByClassName('cosmobots-pop-bar')[0];;
    var chat = document.getElementsByClassName('cosmobots-chat')[0];
    if (!pop || !chat) return;

    if (pop.style.display === 'none' && chat.style.display === 'none') {
        pop.style.display = 'block';
    }
    //if (pop.getAttribute("popup-type") === 'bar'){    }

    if (event.currentTarget.innerWidth <= 767 && (chat.style.display === 'block' || !chat.style.display)){
        pop.style.visibility = 'hidden';
    }
    else {
        pop.style.visibility = 'visible';
    }
}
window.onresize = function(event) {
    var pop = document.getElementsByClassName('cosmobots-pop')[0] || document.getElementsByClassName('cosmobots-pop-bar')[0];;
    var chat = document.getElementsByClassName('cosmobots-chat')[0];
    if (!pop || !chat) return;
    if (event.target.innerWidth <= 767 && (chat.style.display === 'block' || !chat.style.display)){
        pop.style.visibility = 'hidden';
    }
    else {
        pop.style.visibility = 'visible';
    }
};
window.addEventListener("message", receiveMessage, false);
