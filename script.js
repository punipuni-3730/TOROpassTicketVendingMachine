function buy() {
    const params = new URLSearchParams(window.location.search);
    const company = params.get('company');
    const passtype = params.get('passtype');
    const start_sta = params.get('start_sta') || '';
    const end_sta = params.get('end_sta') || '';
    let company_name = '';
    let passtype_name = '';

    switch (company) {
        case '00': company_name = 'しゃけでん'; break;
        case '01': company_name = 'なめ急電鉄'; break;
        case '02': company_name = '新中央高速鉄道(さっぽくエクスプレス)'; break;
        case '03': company_name = '彩都市交通局'; break;
        case '04': company_name = '厠市交通局'; break;
        case '05': company_name = '森林高速'; break;
        case '06': company_name = '東北鉄道'; break;
        case '07': company_name = '小宮鉄道'; break;
        case '08': company_name = '磯崎鉄道'; break;
        case '09': company_name = 'NKRわんがん鉄道'; break;
        case '10': company_name = 'RR'; break;
        case '99': company_name = 'TORO'; break;
    }

    switch(passtype){
        case '1': passtype_name = '全線定期券'; break;
        case '2': passtype_name = '通勤定期券'; break;
        case '3': passtype_name = '通学定期券'; break;
        case '4': passtype_name = '１日乗車券'; break;
    }
    
    document.getElementById('passtype').innerText = '券種：' + passtype_name;
    document.getElementById('company').innerText = '区間：' + company_name + '全線';

    const newHref = `/done.html?company=${company}&passtype=${passtype}`;
    if (document.getElementById('accept')) {
        document.getElementById('accept').setAttribute('href', newHref);
    }

    const balance = 700;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const expiry = `${year}${month}${day}`;

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
