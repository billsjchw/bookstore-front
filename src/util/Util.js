const Util = {
    isValidISBN(isbn) {
        if (!/^\d{12}[\d|X]$/.test(isbn))
            return false;
        if (isbn.slice(0, 3) !== "978")
            return false;
        let code = 0;
        for (let i = 0; i < 9; ++i)
            code += Number(isbn[i + 3]) * (10 - i);
        code = 11 - code % 11;
        if (code === 11)
            return isbn[12] === "0";
        else if (code === 10)
            return isbn[12] === "X";
        else
            return Number(isbn[12]) === code;
    }
};

export default Util;
