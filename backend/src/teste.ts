import bcrypt from "bcrypt";

const senha = "Senha123";
const hash = "$2b$10$prpfQbHNFpYpD7d/hatdm.5cCvQJTpO2MZHJsNU1dTTlBybIXvVmu";

const resultado = await bcrypt.compare(senha, hash);

console.log(resultado);