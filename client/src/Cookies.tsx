export const getCookies = () => {
    let dataArray: any = [];
    if (document.cookie !== "") {
        let data = document.cookie.split(";");
        data.forEach(element => {
            let [, value] = element.split("=");
            dataArray.push(decodeURIComponent(value).split(",").map(el => {return(el.trim())}));
        });
    }

    return dataArray;
}

export const setCookies = (tags: string) => {
    const d = new Date();
    d.setTime(d.getTime() + 100000);
    let index: number = getCookies().length;
    document.cookie = `${index+1}=${tags};expires=${d.toUTCString()}`;
}

export const cuntCookies = (): Array<string> => {
    let data: any[] = [];
    getCookies().forEach((element: any) => {
        element.forEach((el: any) => {
            data.push(el);
        });
    });

    let tags = new Set(data);
    let cObject: Array<object> = [];
    tags.forEach(el => {
        let tag: any = {};
        tag[el] = data.reduce((total,x) => total+(x===el), 0);
        
        cObject.push(tag);
    });

    for (let i = 0; i < cObject.length; i++) {
        for (let j = 0; j < cObject.length - i - 1; j++) {
            if (Object.values(cObject[j])[0] < Object.values(cObject[j + 1])[0]) {
                var temp = cObject[j]
                cObject[j] = cObject[j + 1]
                cObject[j + 1] = temp
            }
        }
    }
    let ret = cObject.splice(0,4).map(el => Object.keys(el)[0]);


    return ret;
}