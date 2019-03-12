(function (window, document) {
    var size = 6; //设置验证码长度
    function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
        this.options = { //默认options参数值
            id: "", //容器Id
            canvasId: "verifyCanvas", //canvas的ID
            width: "100", //默认canvas宽度
            height: "30", //默认canvas高度
            type: "blend", //图形验证码默认类型 blend:数字字母混合类型、number:纯数字、varter:纯字母
            code: "",
            numArr : "0,1,2,3,4,5,6,7,8,9".split(","),
            varterArr :
            "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",")
        }
        if (Object.prototype.toString.call(options) == "[object Object]") { 
            //判断传入参数类型，万物皆对象 options = v_container 
            for (var i in options) { //根据传入的参数，修改默认参数值
                this.options[i] = options[i];    
            }
            console.log(this.options)
        } else {
            this.options.id = options;
        }
        this._init();
        this.refresh();
    }

    GVerify.prototype = {//原型
        /**版本号**/
        version: '1.0.0',
        /**初始化方法**/
        _init: function () {
            var con = document.getElementById(this.options.id);
            var canvas = document.createElement("canvas");
            this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
            this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
            canvas.id = this.options.canvasId;
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            canvas.style.cursor = "pointer";
            canvas.innerHTML = "您的浏览器版本不支持canvas";
            con.appendChild(canvas);
            var parent = this;
            canvas.onclick = function () {//单击canvas更新验证码
                parent.refresh();
            }
        },

        /**生成验证码**/
        refresh: function () {
            this.options.code = "";
            var canvas = document.getElementById(this.options.canvasId);
            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');
            } else {
                return;
            }

            ctx.textBaseline = "middle";//设置基线位置 水平

            ctx.fillStyle = randomColor(180, 240);//颜色
            ctx.fillRect(0, 0, this.options.width, this.options.height);//矩形

            if (this.options.type == "blend") { //判断验证码类型显示不同的数组
                var txtArr = [...this.options.numArr,...this.options.varterArr]
            } else if (this.options.type == "number") {
                var txtArr = [...this.options.numArr]
            } else {
                var txtArr = [...this.options.varterArr]
            }

            for (var i = 1; i <= size; i++) {
                /**随机数**/
                var txt = txtArr[randomNum(0, txtArr.length)];//随机生成验证码
                this.options.code += txt;
                ctx.font = randomNum(this.options.height / 2, this.options.height) + 'px STKaiti'; //随机生成字体大小,固定字体
                ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色        
                ctx.shadowOffsetX = randomNum(-3, 3);//阴影距形状的水平距离
                ctx.shadowOffsetY = randomNum(-3, 3);//阴影距形状的垂直距离
                ctx.shadowBlur = randomNum(-3, 3);//阴影
                ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                var x = this.options.width / (size + 1) * i;//距离X轴的位置
                var y = this.options.height / 2;//距离Y轴的位置
                var deg = randomNum(-30, 30);//角度
                    /**设置旋转角度和坐标原点**/
                ctx.translate(x, y);//放大缩小
                ctx.rotate(deg * Math.PI / 180);//旋转
                ctx.fillText(txt, 0, 0);//绘制验证码
                    /**恢复旋转角度和坐标原点**/
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);  
            }
            /**绘制干扰线**/
            for (var i = 0; i < 5; i++) {
                ctx.strokeStyle = randomColor(40, 180);//线条颜色
                ctx.beginPath();//开始
                ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));//开始点
                ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));//新增点
                ctx.stroke();//绘制
            }
            /**绘制干扰点**/
            for (var i = 0; i < this.options.width / 4; i++) {
                ctx.fillStyle = randomColor(0, 255);//填充颜色
                ctx.beginPath();
                ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 *
                    Math.PI);//圆
                ctx.fill();//填充
            }
        },

        /**验证验证码**/
        validate: function (code) {//转化小写在判断
            var code = code.toLowerCase();
            var v_code = this.options.code.toLowerCase();
            if (code == v_code) {
                return true;
            } else {
                this.refresh();
                return false;
            }
        }
    }
    /**生成一个随机数**/
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**生成一个随机色**/
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    window.GVerify = GVerify;
})(window, document);