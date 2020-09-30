$(function() {
    //创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,重置列表数据;
    var mescroll = new MeScroll("mescroll", {
        up: {
            callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
            isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
            clearEmptyId: "allCoupons", //1.下拉刷新时会自动先清空此列表,再加入数据; 2.无任何数据时会在此列表自动提示空
            toTop: { //配置回到顶部按钮
                src: "./static/img/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
                //offset : 1000
            },
            page:{
                size :5
            },
            lazyLoad: {
                use: true // 是否开启懒加载,默认false
            }
        }
    });

    /*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    function getListData(page) {


        //联网加载数据
        getListDataFromNet(page.num, page.size, function(curPageData) {

            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
            console.log("page.num=" + page.num + ", page.size=" + page.size + ", curPageData.length=" + curPageData.length);

            //方法一(推荐): 后台接口有返回列表的总页数 totalPage
            // mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

            //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
            // mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

            //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
            // mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

            //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
            mescroll.endSuccess(curPageData.length);

            //提示:curPageData.length必传的原因:
            // 1.判断是否有下一页的首要依据: 当传的值小于page.size时,则一定会认为无更多数据.
            // 2.比传入的totalPage, totalSize, hasNext具有更高的判断优先级
            // 3.使配置的noMoreSize生效

            //设置列表数据,因为配置了emptyClearId,第一页会清空dataList的数据,所以setListData应该写在最后;
            setListData(curPageData);
        }, function() {
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
        });
    }

    /*设置列表数据*/
    function setListData(curPageData) {
        var listDom = document.getElementById("allCoupons");
        for (var i = 0; i < curPageData.length; i++) {
            var pd = curPageData[i].money;
            var str = '<span class="left"><i>¥</i><i>'+ pd +'</i></span>';
            str += `
                    <span class="mid"> 
                        <p>标准洗车-车险专享</p>
                        <p>深圳全城通用</p>
                        <p>自用户领取10天后生效</p>
                        <p>有效期30天</p>
                    </span>
                    <span class="right clearfix">
                        <span class="giving">赠送</span>
                        <img class="close" src="./static/img/card_del@2x.png" alt="">
                    </span>`;
            var liDom = document.createElement("li");
            liDom.className = 'coupons '
            liDom.innerHTML = str;
            listDom.appendChild(liDom);
        }
    }



    /*联网加载列表数据
     在您的实际项目中,请参考官方写法: http://www.mescroll.com/api.html#tagUpCallback
     请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
     实际项目以您服务器接口返回的数据为准,无需本地处理分页.
     * */
    function getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
        
        setTimeout(function() {
            $.ajax({
                type: 'GET',
                url: './static/json/coupons.json',
                //		                url: '../res/pdlist1.json?num='+pageNum+"&size="+pageSize,
                dataType: 'json',
                success: function(data) {
                    //模拟分页数据
                    var listData = [];
                    for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
                        if (i == data.length) break;
                        listData.push(data[i]);
                    }
                    successCallback(listData);
                },
                error: errorCallback
            });
        }, 1000)
    }    
});