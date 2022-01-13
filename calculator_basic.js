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
            i=0;
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
            i=0;
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
            i=0;
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
            i=0;
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
};
const point_check = (str) => {
    let p_check=false;
    let op_check=false;
    for(let i=str.length-1;i>=0;i--)
    {
        if(str[i]==".")
        {
            p_check=true;
            if(!op_check)
            {
                return p_check;
            }
        }
        if(inside(str[i],arops))
        {
            op_check=true;
            if(!p_check)
            {
                return p_check;
            }
        }
    }
    return p_check;
};
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
                else if(feild[0].textContent[feild[0].textContent.length - 1]==".")
                        {
                            alert("Complete the decimal places.");
                        }
                else {
                    let eqn = feild[0].textContent;
                    if (val == "=") {
                        let splitEq = numSplit(eqn);
                        splitEq = splitEq.map(render);
                        let ans = suburge(addurge(multurge(dividerge(splitEq))));
                        console.log(ans);
                        ans=ans[0];
                        feild[1].textContent=Number.isInteger(ans)?`${ans}`:ans.toFixed(dec_tell(ans));
                    }
                    appending();
                }
            }
            else {
                let eqn = feild[0].textContent;
                if(feild[0].textContent[feild[0].textContent.length-1]=="=")
                {
                    alert("Enter a new operation!");
                }
                else
                {
                    if (val == ".")
                    {
                        console.log(`p_check=${point_check(eqn)}`);
                        if(point_check(eqn))
                        {
                            alert("Two decimals can't be in a single number.");
                        }
                        else if(inside(feild[0].textContent[feild[0].textContent.length-1],arops))
                        {
                            alert("Can't place a decimal after operator");
                        }
                        else if(feild[0].textContent.length==0)
                        {
                            alert("Can't place decimal without integer part.");
                        }
                        else
                        {
                            appending();
                        }
                    }
                    else
                    {
                        appending();
                    }
                }
            }
        }
        else {
            deleting();
        }

    };
    button[i].addEventListener("click", clickEvent);
}

