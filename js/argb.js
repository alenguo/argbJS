!function(){
    var JH = {
        gId: function(id){
            return document.getElementById(id);
        },
        setArgb: function(val) {

            var valArr = val.split("(")[1].split(")")[0].split(","),
                red   = JH.toHex(valArr[0]),
                green = JH.toHex(valArr[1]),
                blue  = JH.toHex(valArr[2]),
                alpha = JH.toHex(valArr[3] * 255);

            JH.gId('argb').value = "#" + alpha + red + green + blue;
        },
        setHex: function(val) {

            var value = val.substring(1, 9),
                red   = parseInt(value.substring(2, 4), 16),
                green = parseInt(value.substring(4, 6), 16),
                blue  = parseInt(value.substring(6, 8), 16),
                alpha = Math.round((parseInt(value.substring(0, 2), 16) / 255) * 10) / 10;

            JH.gId('rgba').value = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
        },
        toHex: function(val) {
            val = parseInt(val);
            val = Math.max(0, val);
            val = Math.min(val, 255);
            val = Math.round(val);

            return "0123456789ABCDEF".charAt((val - val % 16) / 16) + "0123456789ABCDEF".charAt(val % 16);
        },
        on: function(obj, evType, fn, capture){

            /*
             * obj:          绑定对象
             * evType:       表示所监听事件的类型的一个字符串。
             * fn:           function
             * capture       是否发起捕获
             * */
            if(obj.addEventListener){
                obj.addEventListener(evType, fn, capture);
                return true;
            }else if(obj.attachEvent){
                var r = obj.attachEvent("on" + evType, fn);
                return r;
            }else{
                obj["on" + evType] = fn;
            }
        }
    };

    JH.on(document, 'keyup', function(ev){
        var target = ev.target || event.target;


        if(target.id == 'rgba'){
            JH.setArgb(JH.gId(target.id).value);
            return false;
        };
        if(target.id == 'argb'){
            JH.setHex(JH.gId(target.id).value);
            return false;
        };
    }, true);
    
}();
