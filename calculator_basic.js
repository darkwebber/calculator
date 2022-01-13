const button = document.querySelectorAll("input");
const feild = document.querySelectorAll("p");
const arops = ["+", "-", "*", "/", "="];
const inside = (ele, arr) => {
    for (let elem of arr) {
        if (ele === elem) {
            return true;
        }
    }
    return false;
};
const numSplit = (eqn) => {
    let arr = [];
    let init = 0;
    eqn += "+";
    for (let i = 0; i < eqn.length; i++) {
        if (inside(eqn[i], arops)) {
            arr.push(eqn.slice(init, i));
            init = i + 1;
            if (i != eqn.length - 1) {
                arr.push(eqn[i]);
            }
        }
    }
    return arr;
};
const render = (x) => {
    const allow = isNaN(parseFloat(x));
    if(!allow)
    {
        return parseFloat(x);
    }
    return x;
};
const dividerge = (arr) => {
    if(arr.length == 1)
    {
        return arr;
    }
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]=="/")
        {
            arr[i-1]/=arr[i+1];
            arr.splice(i,2);
        }
    }
    return arr;
};
const multurge = (arr) => {
    if(arr.length == 1)
    {
        return arr;
    }
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]=="*")
        {
            arr[i-1]*=arr[i+1];
            arr.splice(i,2);
        }
    }
    return arr;
};
const suburge = (arr) => {
    if(arr.length == 1)
    {
        return arr;
    }
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]=="-")
        {
            arr[i-1]-=arr[i+1];
            arr.splice(i,2);
        }
    }
    return arr;
};
const addurge = (arr) => {
    if(arr.length == 1)
    {
        return arr;
    }
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]=="+")
        {
            arr[i-1]+=arr[i+1];
            arr.splice(i,2);
        }
    }
    return arr;
};
const dec_tell = (flt) => {
    for(let i=1;i<9;i++)
    {
        if(Number.isInteger(Math.pow(10,i)*flt))
        {
            return i;
        }
    }
    return 8;
}
let col = "+";
let acc = 0;
for (let i = 0; i < button.length; i++) {
    let val = button[i].value;
    const appending = () => { feild[0].textContent += val };
    const deleting = () => { feild[0].textContent = feild[0].textContent.slice(0, feild[0].textContent.length - 1) };
    const clickEvent = (event) => {
        if (val != "backspace") {
            if (inside(val, arops)) {
                if (inside(feild[0].textContent[feild[0].textContent.length - 1], arops)) {
                    if(feild[0].textContent[feild[0].textContent.length - 1]=="=")
                    {
                        feild[0].textContent=feild[1].textContent+val;
                        feild[1].textContent="";
                    }
                    else
                    {
                        alert("Two operators can't come side by side");
                    }
                   
                }
                else {
                    if (val == "=") {
                        let eqn = feild[0].textContent;
                        let splitEq = numSplit(eqn);
                        splitEq = splitEq.map(render);
                        let ans = suburge(addurge(multurge(dividerge(splitEq))));
                        feild[1].textContent=Number.isInteger(ans[0])?`${ans[0]}`:ans[0].toFixed(dec_tell(ans[0]));
                        console.log(Number.isInteger(ans[0]));
                    }
                    appending();
                }
            }
            else {
                if(feild[0].textContent[feild[0].textContent.length-1]=="=")
                {
                    alert("Enter a new operation!");
                }
                else
                {
                    appending();
                }
            }
        }
        else {
            deleting();
        }

    };
    button[i].addEventListener("click", clickEvent);
}

