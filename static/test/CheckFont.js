function IsFontExist(t) {
    if (t == "") {return ""};
    var f = "Copyright © 心のsky Group";
    var s = document.createElement("span");
    s.style.fontSize = '72px';
    s.innerHTML = f;
    var b = document.getElementsByTagName("body")[0];
    b.appendChild(s);
    s.style.fontFamily = f;
    var w = s.offsetWidth;
    var h = s.offsetHeight;
    s.style.fontFamily = t + ',' + f;
    var r =((s.offsetWidth != w) || (s.offsetHeight != h));
    b.removeChild(s);
    return r?"存在":"不存在";
}
function IsFontExistBatch(t) {
    var a = t.split("\n");
    var r = new Array();
    for (var i = 0; i < a.length; i++) {
        r[i] = IsFontExist(a[i]);
    }
    return r.join("\r\n");
}