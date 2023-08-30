const isEmailValid = (req:any, res:any, next:any) => {
    if (req.query.type === "email") {
        const email: string = req.body.email;
        if (!email) {
            return res.status(400).json({ message: "Email missing" });
        }
    }
    next();
};

const isNumberValid = (req:any, res:any, next:any) => {
    if (req.query.type === "number") {
        const number: string = req.body.number;
        if (!number) {
            return res.status(400).json({ message: "Number missing" });
        } else if (number.length > 10 || number.length < 10) {
            return res.status(400).json({ message: "Invalid number" });
        }
    }
    next();
};

export  {isEmailValid, isNumberValid };