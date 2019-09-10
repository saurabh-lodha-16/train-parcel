
export async function getISTTime(weird_time) {
    let y = weird_time.toUTCString();
    let myDate = new Date(y);
    let x = myDate.toLocaleString();
    return x;
}

