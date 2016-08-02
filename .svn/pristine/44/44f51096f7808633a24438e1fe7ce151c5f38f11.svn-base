/**
 * Created by airwen on 16/6/12.
 */
Tailorpus.factory('CommService', CommService);

function CommService () {

    //图片地址
    var imgUrlDomain = "img-stock.cfpu.com";

    return {

        imgProcess:imgProcess  //图片地址处理

    };

    //图片处理
    // "http://stock-cfpu-com.oss-cn-hangzhou.aliyuncs.com/9d8d27f55622417d857e2dfeecfb0e93.jpg"
    //http://img-stock.cfpu.com/fcdf57e3787c4be2894d03ba444ef06c.jpg@200w_100h_90q
    function imgProcess(imgUrl,width,height,quality){
        if(imgUrl){
            return imgUrl.replace("stock-cfpu-com.oss-cn-hangzhou.aliyuncs.com",imgUrlDomain)+"@"+width+"w_"+height+"h_"+quality+"q";
        }else{
            return "";
        }
    }

}
