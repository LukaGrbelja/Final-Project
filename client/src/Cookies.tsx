export const getCookies = () => {
    let indexOfData: number = document.cookie.indexOf("=");
    let parsedData;
    if (indexOfData === -1) {
        parsedData = [];
    }
    else {
        let data = document.cookie.slice(indexOfData + 1);
        parsedData = JSON.parse(data);
    }
    return parsedData;
}

export const setCookies = (genreTags: string[], actorTags: string[] ) => {
    const d = new Date();
    d.setTime(d.getTime() + 100000);
    let dataArray: object[] = getCookies();
    dataArray.push({
        genreTags: genreTags,
        actorTags: actorTags
    });
    let stringData = JSON.stringify(dataArray);
    document.cookie = `data=${stringData};expires=${d.toUTCString()}`;
}

//In developing purposes
export const deleteCookies = () => {
    const d = new Date();
    d.setTime(d.getTime() + 0);
    document.cookie = `data=0;expires=${d.toUTCString()};path=/`;
}