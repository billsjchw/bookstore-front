const Util = {
    isValidISBN(isbn) {
        if (!/^\d{13}$/.test(isbn))
            return false;
        if (isbn.slice(0, 3) !== "978")
            return false;
        let code = 0;
        for (let i = 0; i < 12; ++i)
            code += Number(isbn[i]) * (i % 2 ? 3 : 1);
        code = 10 - code % 10;
        if (code === 10)
            return isbn[12] === "0";
        else
            return Number(isbn[12]) === code;
    }
};

export default Util;
