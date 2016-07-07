function test1(){
    var longName = "I am text";
    console.log("I am test1, %s",longName);
}


(function (num){

    if(num ==1)
    {
        return num;
    }

    return num * fact(num-1);
})(8);