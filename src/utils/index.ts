function formataCPF(cpf: string){
    return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6, 9) + "-" + cpf.slice(9);
}

function validaCPF(cpf: string){
    return cpf.length === 11 && /^\d+$/.test(cpf);
}

function validaData(dataStr: string){
    const regexData = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const data = dataStr.split("/");
    const mesesCom31 = [1, 3, 5, 7, 8, 10, 12];
    const mesesCom30 = [4, 6, 9, 11];
    if(data.length !== 3){
        return false;
    }
    if(parseInt(data[1]) > 12){
        return false;
    }
    if(anoBissexto(parseInt(data[2]))){
        if (parseInt(data[1]) === 2 && parseInt(data[0]) > 29){
            return false;
        }
    }
    if(!anoBissexto(parseInt(data[2]))){
        if (parseInt(data[1]) === 2 && parseInt(data[0]) > 28){
            return false;
        }
    }
    if(mesesCom30.includes(parseInt(data[1]))  && parseInt(data[0]) > 30){
        return false;
    }
    if(mesesCom31.includes(parseInt(data[1]))  && parseInt(data[0]) > 31){
        return false;
    }
    if(!regexData.test(dataStr)){
        return false;
    }
    return true;
}

function strPData(dataStr: string){
    const data = dataStr.split("/");
    return new Date(`${data[2]}-${data[1]}-${data[0]}`)
}

function strPDataBanco(dataStr: string){
    const data = dataStr.split("/");
    return `${data[2]}-${data[1]}-${data[0]}`;
}

function anoBissexto(ano: number){
    if(ano % 4 !== 0){
        return false;
    } else if (ano % 400 === 0){
        return true;
    } else if(ano % 100 === 0){
        return false;
    } else if(ano % 4 === 0){
        return true;
    }
}

function calculaNDias(dataInicial, dataFinal){
    return Math.floor((dataFinal-dataInicial)/ 1000 / 60 / 60 / 24);
}

function formataData(data: Date) {
    let dataStr = data.toISOString();
    let dataFormatada = dataStr.slice(8, 10) + "/" + dataStr.slice(5, 7) + "/" + dataStr.slice(0, 4);
    return dataFormatada;
}

function validaHora(hora: string){
    const regexHora = /^(?:[01]?\d|2[0-3])(?::[0-5]\d){1,2}$/;
    if(!regexHora.test(hora)){
        return false;
    }
    let [h, m] = hora.split(":");
    return h.length === 2 && parseInt(h) < 24 && m.length === 2 && parseInt(m) < 60;
}

function calculaNHoras(data1, data2): number {
    const diferencaEmMilissegundos = data2- data1;

    const diferencaEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60);

    return Math.round(diferencaEmHoras);
}

export {formataCPF, validaCPF, validaData, strPData, strPDataBanco, calculaNDias, formataData, validaHora, calculaNHoras}