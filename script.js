function buy() {
    const params = new URLSearchParams(window.location.search);
    const company = params.get('company');
    const passtype = params.get('passtype');
    const start_sta = params.get('start_sta') || '';
    const end_sta = params.get('end_sta') || '';
    let company_name = '';
    let passtype_name = '';
    let balance = 700;

    switch (company) {
        case '00': company_name = 'しゃけでん';     balance = 1300; break;
        case '01': company_name = 'なめ急電鉄';     balance = 600; break;
        case '02': company_name = '新中央高速鉄道(さっぽくエクスプレス)'; balance = 800; break;
        case '03': company_name = '彩都市交通局';   balance = 500; break;
        case '04': company_name = '厠市交通局';     balance = 400; break;
        case '05': company_name = '森林高速';   balance = 1500; break;
        case '06': company_name = '東北鉄道';   balance = 900; break;
        case '07': company_name = '小宮鉄道';   balance = 800; break;
        case '08': company_name = '磯崎鉄道';   balance = 500; break;
        case '09': company_name = 'NKRわんがん鉄道';   balance = 700; break;
        case '10': company_name = 'RR';   balance = 900; break;
        case '11': company_name = '氷魚LRT';   balance = 300; break;
        case '12': company_name = '東北県内';   balance = 1200; break;
        case '99': company_name = 'TORO'; balance = 5000; break;
    }

    switch(passtype){
        case '1': passtype_name = '全線定期券'; balance = 10000; break;
        case '2': passtype_name = '通勤定期券'; break;
        case '3': passtype_name = '通学定期券'; break;
        case '4': passtype_name = '１日乗車券'; break;
    }
    
    document.getElementById('passtype').innerText = '券種：' + passtype_name;
    document.getElementById('company').innerText = '区間：' + company_name + '全線';
    document.getElementById('balance').innerText = '料金：' + balance + 'トロポ';

    const newHref = `/done.html?company=${company}&passtype=${passtype}`;
    if (document.getElementById('accept')) {
        document.getElementById('accept').setAttribute('href', newHref);
    }
    let expiry = '';
    let expiryText = '';
    if(passtype == '1'){
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
        const y = oneMonthLater.getFullYear();
        const m = String(oneMonthLater.getMonth() + 1).padStart(2, '0');
        const d = String(oneMonthLater.getDate()).padStart(2, '0');
        expiry = `${y}${m}${d}`;
        expiryText = `有効期限：${y}年${parseInt(m)}月${d}日まで`;
    } else {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        expiry = `${y}${m}${d}`;
        expiryText = `有効期限：${y}年${parseInt(m)}月${d}日まで`;
    }
    if(document.getElementById('expiry')){
        document.getElementById('expiry').innerText = expiryText;
    }

    let command = `/writecard ${passtype}-${company}-${balance}-${expiry}`;
    if (start_sta && end_sta) {
        command += `-${start_sta}-${end_sta}`;
    }

    const checkDigit = generateCheckDigit(`${passtype}${company}${balance}${expiry}${start_sta}${end_sta}`);
    command += `-${checkDigit}`;

    document.getElementById('code').innerText = command;

    if (company == null) {
        window.location.href = 'index.html';
    }
}

function generateCheckDigit(data) {
    let sum = 0;
    for (let char of data) {
        if (!isNaN(char)) sum += parseInt(char, 10);
    }
    return sum % 10;
}
