let xhttp, xmlDoc, txt1, txt2, txt3, txt4, txt5, a, b, c, d, i,j, arr1, arr2, arr3,Area,sick,newsick,areaTag;

function setData() {
    let xhr = new XMLHttpRequest();
    let url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson';
    let servicKey = 'RtlIMVwLy5nua54lEe2sVpTzyUT0vutGNDUK%2BVM8w0lZnWG4%2F75vbYlhht4I%2FadVyE3Ij0qv6pUesU59%2BAUNnA%3D%3D';
    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + servicKey;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('3');
    queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20220930');
    queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20220930');
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        let responseData = this.responseXML;
        console.log(responseData);
        // let items = responseData.getElementsByTagName("items")[0];
        // console.log(items);
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            txt1 = '';
            txt2 = '';
            txt3 = '';
            txt4 = '';
            txt5 = '';
            a = xmlDoc.getElementsByTagName('gubun');//시도 이름
            b = xmlDoc.getElementsByTagName('localOccCnt')//도시별 누적확진자
            c = xmlDoc.getElementsByTagName('incDec')//전일대비 증감 확진자
            d = xmlDoc.getElementsByTagName('defCnt')//확진자수??
            console.log(a);
            console.log(b);
            console.log(c);
            console.log(d);
            arr1 = new Array();
            arr2 = new Array();
            arr3 = new Array();
            for (i = 0; i < a.length; i++) {
                arr3[i] = parseInt(c[i].childNodes[0].nodeValue);//전일대비 증감수
                arr1[i] = a[i].childNodes[0].nodeValue//도시이름
                arr2[i] = parseInt(b[i].childNodes[0].nodeValue)//누적확진자
                txt1 = txt1 + a[i].childNodes[0].nodeValue + '<br/>'
                txt2 = txt2 + b[i].childNodes[0].nodeValue + '<br/>'
                txt3 = txt3 + c[i].childNodes[0].nodeValue + '<br/>'
                txt4 = txt4 + d[i].childNodes[0].nodeValue + '<br/>'
                txt5 = txt5 + "'" + a[i].childNodes[0].nodeValue + "'" + ","
                var tdArea = document.createTextNode(arr1[i]);
                var tdsick = document.createTextNode(arr2[i]);
                var tdnewsick = document.createTextNode(arr3[i]-arr2[i]);
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                var tr = document.createElement("tr");

                td1.appendChild(tdArea);
                td2.appendChild(tdsick);
                td3.appendChild(tdnewsick);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);

                var tbody = document.getElementsByTagName('tbody')[0];

                tbody.appendChild(tr);
            }



            console.log(Object.values(arr1));
            console.log(Object.values(arr2));
            console.log(Object.values(arr3));



            paginate.init('.myTable',options);
        }

    };
    xhr.send('');
}
setData();
