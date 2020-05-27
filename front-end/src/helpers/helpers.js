
export default function normalizarTelefone({ target }) {
    target.value = target.value
        .replace(/\D+/g, "")
        .replace(/(\d{2})(\d{8})/, "($1) $2")
}


